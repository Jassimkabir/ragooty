import { generateBlurhash, isValidImageFile } from '@/lib/image-utils';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export type Category = {
  id: string;
  name: string;
};

export type ImageCategory = {
  category: Category;
};

export type Image = {
  id: string;
  url: string;
  blurhash: string;
  image_categories: ImageCategory[];
};

export async function uploadImage(file: File, categoryIds: string[]) {
  if (!isValidImageFile(file)) {
    throw new Error('Invalid file type or file too large');
  }

  // 2. Generate blurhash for UI placeholder
  const blurhash = await generateBlurhash(file);

  // 3. Generate a unique file name
  const fileName = `${Date.now()}-${file.name}`;

  // 4. Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // 5. Get public URL
  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  const publicUrl = urlData?.publicUrl;
  if (!publicUrl) throw new Error('Failed to get public URL');

  // 6. Insert into `images` table with blurhash
  const { data: imageData, error: imageError } = await supabase
    .from('images')
    .insert({ url: publicUrl, blurhash })
    .select()
    .single();

  if (imageError || !imageData) throw imageError;

  // 7. Link categories
  const links = categoryIds.map((catId) => ({
    image_id: imageData.id,
    category_id: catId,
  }));

  const { error: linkError } = await supabase
    .from('image_categories')
    .insert(links);

  if (linkError) throw linkError;

  return imageData;
}

export async function listImagesWithCategories() {
  const { data, error } = await supabase.from('images').select(`
        id,
        url,
        image_categories (
          category:category_id (
            id,
            name
          )
        )
      `);

  if (error) throw error;

  return data;
}

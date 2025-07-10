import {
  generateBlurhash,
  getImageDimensions,
  isValidImageFile,
} from '@/lib/image-utils';
import { createClient } from '@/lib/supabase/client';
import { Category } from './categories';

const supabase = createClient();

export type ImageCategory = {
  category: Category;
};

export type Image = {
  id: string;
  url: string;
  blurhash: string;
  width: number;
  height: number;
  image_categories: ImageCategory[];
};

export async function uploadImage(file: File, categoryIds: string[]) {
  if (!isValidImageFile(file)) {
    throw new Error('Invalid file type or file too large');
  }

  const blurhash = await generateBlurhash(file);
  const { width, height } = await getImageDimensions(file);
  const fileName = `${Date.now()}-${file.name}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  const publicUrl = urlData?.publicUrl;
  if (!publicUrl) throw new Error('Failed to get public URL');

  // Insert into `images` table with blurhash
  const { data: imageData, error: imageError } = await supabase
    .from('images')
    .insert({ url: publicUrl, blurhash, width, height })
    .select()
    .single();

  if (imageError || !imageData) throw imageError;

  // Link categories
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
        blurhash,
        width,
        height,
        image_categories (
          category:category_id (
            id,
            name,
            is_active
          )
        )
      `);

  if (error) throw error;

  return data;
}

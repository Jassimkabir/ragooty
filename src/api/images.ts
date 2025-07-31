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
  path: string;
};

export type ImageWithCategory = {
  id: string;
  url: string;
  blurhash: string;
  width: number;
  height: number;
  path: string;
  image_categories: ImageCategory[];
};

export async function uploadImage(file: File, categoryIds: string[]) {
  if (!isValidImageFile(file)) {
    throw new Error('Invalid file type or file too large');
  }

  const blurhash = await generateBlurhash(file);
  const { width, height } = await getImageDimensions(file);
  const fileName = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  const publicUrl = urlData?.publicUrl;
  if (!publicUrl) throw new Error('Failed to get public URL');

  const { data: imageData, error: imageError } = await supabase
    .from('images')
    .insert({ url: publicUrl, blurhash, width, height, path: fileName })
    .select()
    .single();

  if (imageError || !imageData) throw imageError;

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
        path,
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

export async function deleteImage(imageId: string, filePath: string) {
  const { error: storageError } = await supabase.storage
    .from('images')
    .remove([filePath]);

  if (storageError)
    throw new Error(`Failed to delete file: ${storageError.message}`);

  const { error: dbError } = await supabase
    .from('images')
    .delete()
    .eq('id', imageId);

  if (dbError)
    throw new Error(`Failed to delete image record: ${dbError.message}`);

  return true;
}

export async function updateImageCategories(
  imageId: string,
  newCategoryIds: string[]
) {
  const { error: deleteError } = await supabase
    .from('image_categories')
    .delete()
    .eq('image_id', imageId);

  if (deleteError) throw deleteError;

  const newLinks = newCategoryIds.map((catId) => ({
    image_id: imageId,
    category_id: catId,
  }));

  const { error: insertError } = await supabase
    .from('image_categories')
    .insert(newLinks);

  if (insertError) throw insertError;
}

export async function getImagesByCategory(
  categoryId: string
): Promise<Image[]> {
  const { data, error } = await supabase
    .from('image_categories')
    .select('image:images(*)')
    .eq('category_id', categoryId);

  if (error) {
    console.error('Error fetching images by category:', error.message);
    throw error;
  }

  return (data ?? [])
    .flatMap((entry) =>
      Array.isArray(entry.image) ? entry.image : [entry.image]
    )
    .filter((img): img is Image => !!img?.id);
}

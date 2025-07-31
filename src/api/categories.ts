import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export type Category = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
};

export async function addCategory(name: string, isActive = true) {
  const { data, error } = await supabase
    .from('categories')
    .insert([{ name, is_active: isActive }])
    .select()
    .single();

  if (error) {
    console.error('Error adding category:', error.message);
    throw error;
  }
  return data;
}

export async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error.message);
    throw error;
  }

  return data;
}

export async function deleteCategoryById(categoryId: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) {
    console.error('Error deleting category:', error.message);
    throw error;
  }

  return true;
}

export async function updateCategory(
  id: string,
  name: string,
  isActive: boolean
) {
  const { data, error } = await supabase
    .from('categories')
    .update({ name, is_active: isActive })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating category:', error.message);
    throw error;
  }
  return data;
}

export async function getActiveCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching active categories:', error.message);
    throw error;
  }

  return data;
}

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
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    console.error('Error fetching categories:', error.message);
    throw error;
  }

  return data;
}

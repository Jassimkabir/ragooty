'use client';

import {
  Category,
  deleteCategoryById,
  getAllCategories,
  updateCategory,
} from '@/api/categories';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CategoryDialog } from './category-dialog';
import { BlurFade } from './magicui/blur-fade';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

type ListCategoriesProps = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const ListCategories = ({ categories, setCategories }: ListCategoriesProps) => {
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategoryById(categoryId);
      await getAllCategories().then((data) => {
        setCategories(data);
        setLoading(false);
      });
      toast({
        title: 'Category Deleted',
        description: 'The category has been removed successfully.',
        variant: 'destructive',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditOpen(true);
  };

  const handleEditSubmit = async (name: string, isActive: boolean) => {
    if (!selectedCategory) return;
    try {
      await updateCategory(selectedCategory.id, name, isActive);
      toast({
        title: 'Category Updated',
        description: 'The category has been updated successfully.',
      });
      await getAllCategories().then((data) => {
        setCategories(data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEditOpen(false);
      setSelectedCategory(null);
    }
  };

  // if (loading) {
  //   return (
  //     <div className='grid gap-4'>
  //       {[...Array(4)].map((_, idx) => (
  //         <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
  //           <Card key={idx} className='py-0 w-full'>
  //             <CardContent className='p-4'>
  //               <div className='flex items-center justify-between'>
  //                 <div className='flex items-center gap-3'>
  //                   <Skeleton className='w-4 h-4 rounded-full' />
  //                   <Skeleton className='h-4 w-24' />
  //                 </div>
  //                 <div className='flex gap-2'>
  //                   <Skeleton className='h-8 w-8 rounded-md' />
  //                   <Skeleton className='h-8 w-8 rounded-md' />
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         </BlurFade>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <>
      <div className='grid gap-4'>
        {categories.map((category, idx) => (
          <BlurFade key={category.id} delay={0.25 + idx * 0.05} inView>
            <Card key={category.id} className='py-0 w-full'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={cn(
                        category.is_active === true
                          ? 'bg-green-500 dark:bg-green-600'
                          : 'bg-red-500 dark:bg-red-600',
                        'w-4 h-4 rounded-full'
                      )}
                    />
                    <span className='font-medium'>{category.name}</span>
                  </div>
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => handleEditClick(category)}
                    >
                      <Edit className='h-4 w-4' />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size='sm' variant='ghost'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this category and remove it from your list.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
      <CategoryDialog
        open={editOpen}
        setOpen={setEditOpen}
        initialData={
          selectedCategory
            ? {
                name: selectedCategory.name,
                is_active: selectedCategory.is_active,
              }
            : undefined
        }
        onSubmit={handleEditSubmit}
        title='Edit Category'
        actionText='Save'
      />
    </>
  );
};

export default ListCategories;

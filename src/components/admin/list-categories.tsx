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
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CategoryDialog } from './category-dialog';
import { BlurFade } from '../magicui/blur-fade';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type ListCategoriesProps = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const ListCategories = ({ categories, setCategories }: ListCategoriesProps) => {
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const getCategories = async () => {
    await getAllCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategoryById(categoryId);
      await getCategories();
      toast({
        title: 'Category Deleted',
        description: 'The category has been removed successfully.',
        variant: 'destructive',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (name: string, isActive: boolean) => {
    if (!selectedCategory) return;
    try {
      await updateCategory(selectedCategory.id, name, isActive);
      toast({
        title: 'Category Updated',
        description: 'The category has been updated successfully.',
      });
      await getCategories();
    } catch (error) {
      console.log(error);
    } finally {
      setEditOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditOpen(true);
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <span className='sr-only'>Open menu</span>
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => handleEditClick(category)}
                          >
                            Edit
                            <DropdownMenuShortcut>
                              <Edit className='h-4 w-4' />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setCategoryToDelete(category)}
                          >
                            Delete
                            <DropdownMenuShortcut>
                              <Trash2 className='h-4 w-4' />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => {
          if (!open) setCategoryToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              category and remove it from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (categoryToDelete) handleDeleteCategory(categoryToDelete.id);
                setCategoryToDelete(null);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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

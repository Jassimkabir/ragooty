'use client';

import { Category, getAllCategories } from '@/api/categories';
import { cn } from '@/lib/utils';
import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';

const ListCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className='grid gap-4'>
        {[...Array(2)].map((_, i) => (
          <Card key={i} className='py-0 w-full'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='w-4 h-4 rounded-full' />
                  <Skeleton className='h-4 w-24' />
                </div>
                <div className='flex gap-2'>
                  <Skeleton className='h-8 w-8 rounded-md' />
                  <Skeleton className='h-8 w-8 rounded-md' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className='grid gap-4'>
      {categories.map((category) => (
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
                <Button size='sm' variant='ghost'>
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  // onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListCategories;

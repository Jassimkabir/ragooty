'use client';

import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const mockCategories = [
  { id: '1', name: 'Nature', isActive: true },
  { id: '2', name: 'Architecture', isActive: false },
  { id: '3', name: 'Technology', isActive: true },
  { id: '4', name: 'People', isActive: false },
];

const ListCategories = () => {
  const [categories, setCategories] = useState(mockCategories);

  return (
    <div className='grid gap-4'>
      {categories.map((category) => (
        <Card key={category.id} className='py-0'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <span className='font-medium'>{category.name}</span>
                <Badge
                  variant={
                    category.isActive === true ? 'secondary' : 'destructive'
                  }
                  className={
                    category.isActive === true
                      ? 'bg-green-500 text-white dark:bg-green-600'
                      : ''
                  }
                >
                  {category.isActive === true ? 'Active' : 'In Active'}
                </Badge>
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

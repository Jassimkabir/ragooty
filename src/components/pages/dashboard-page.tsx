'use client';

import { addCategory, Category, getAllCategories } from '@/api/categories';
import { ImageWithCategory } from '@/api/images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AlignLeft, Image as ImageIcon, Plus } from 'lucide-react';
import { Libre_Baskerville } from 'next/font/google';
import { useState } from 'react';
import { CategoryDialog } from '../admin/category-dialog';
import { UploadDialog } from '../admin/upload-dialog';
import ListCategories from '../admin/list-categories';
import ListImages from '../admin/list-images';
import { LogoutButton } from '../admin/logout-button';
import { ThemeToggle } from '../admin/theme-toggle';
import { Button } from '../ui/button';

const Libre = Libre_Baskerville({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<ImageWithCategory[]>([]);
  const [addOpen, setAddOpen] = useState(false);

  const handleAddSubmit = async (name: string, isActive: boolean) => {
    try {
      await addCategory(name, isActive);
      toast({
        title: 'Category Created',
        description: 'The new category has been added and is now available.',
      });
      await getAllCategories().then((data) => {
        setCategories(data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAddOpen(false);
    }
  };

  return (
    <div className='container mx-auto mt-24'>
      <div className='flex flex-col gap-4 py-4 px-4 md:px-0'>
        <div>
          <div className='flex justify-between gap-4'>
            <p
              className={cn(
                Libre.className,
                'text-2xl sm:text-3xl md:text-4xl font-bold'
              )}
            >
              Welcome, <br />
              Ragooty Sasidharan
            </p>
            <div className='flex gap-2 items-start'>
              <ThemeToggle />
              <LogoutButton />
            </div>
          </div>
          <p className='mt-2 text-base text-muted-foreground max-w-md mx-auto md:mx-0'>
            Manage your categories and images with ease.
          </p>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-full gap-4'
        >
          <TabsList className='w-full'>
            <TabsTrigger value='categories' className='flex items-center gap-2'>
              <AlignLeft className='h-4 w-4' />
              Categories
            </TabsTrigger>
            <TabsTrigger value='images' className='flex items-center gap-2'>
              <ImageIcon className='h-4 w-4' />
              Images
            </TabsTrigger>
          </TabsList>
          <TabsContent value='categories'>
            <Card>
              <CardHeader className='flex justify-between md:items-center gap-2'>
                <div className='flex flex-col gap-1'>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>
                    View, add and delete categories
                  </CardDescription>
                </div>
                <CategoryDialog
                  open={addOpen}
                  setOpen={setAddOpen}
                  onSubmit={handleAddSubmit}
                  title='Add Category'
                  actionText='Add'
                  trigger={
                    <Button variant='outline'>
                      <Plus className='w-4 h-4' />
                      <span className='hidden sm:block'>Add Category</span>
                    </Button>
                  }
                />
              </CardHeader>
              <CardContent>
                <ListCategories
                  categories={categories}
                  setCategories={setCategories}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='images'>
            <Card>
              <CardHeader className='flex justify-between md:items-center gap-2'>
                <div className='flex flex-col gap-1'>
                  <CardTitle>Images</CardTitle>
                  <CardDescription>View, add and delete images</CardDescription>
                </div>
                <UploadDialog setImages={setImages} categories={categories} />
              </CardHeader>
              <CardContent>
                <ListImages images={images} setImages={setImages} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

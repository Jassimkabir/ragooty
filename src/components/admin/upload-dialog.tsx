'use client';

import { Category, getAllCategories } from '@/api/categories';
import { Image, listImagesWithCategories, uploadImage } from '@/api/images';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MultiSelect } from '../ui/multi-select';

type UploadDialogProps = {
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  categories: Category[];
};

export function UploadDialog({ setImages, categories }: UploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    return () => {
      setPreviewUrl(null);
    };
  }, [file]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file)
      return toast({
        title: 'No file selected',
        description: 'Please select an image file to upload.',
        variant: 'destructive',
      });

    if (selected.length === 0)
      return toast({
        title: 'No categories selected',
        description: 'Please select at least one category for the image.',
        variant: 'destructive',
      });

    setLoading(true);

    try {
      const image = await uploadImage(file, selected);
      toast({
        title: 'Image uploaded successfully!',
        description: `Image has been uploaded and categorized.`,
      });
      setFile(null);
      setPreviewUrl(null);
      setSelected([]);
      listImagesWithCategories().then((data) => {
        const fixedData = data.map((img: any) => ({
          ...img,
          image_categories: img.image_categories.map((ic: any) => ({
            category: Array.isArray(ic.category) ? ic.category[0] : ic.category,
          })),
        }));
        setImages(fixedData);
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Upload failed',
        description:
          'There was an error uploading your image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFile = droppedFiles.find((file) =>
      file.type.startsWith('image/')
    );

    if (imageFile) {
      setFile(imageFile);
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Please drop an image file.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleUpload}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Upload className='w-4 h-4' />
            <span className='hidden sm:block'>Upload Image</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Enter the category details and add an image below, then click
              'Add' to create a new image.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div
              className={cn(
                'border-2 border-dashed rounded-lg p-4 text-center transition-colors',
                isDragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Input
                id='file'
                type='file'
                accept='image/*'
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className='hidden'
              />
              <Label
                htmlFor='file'
                className='cursor-pointer flex items-center gap-2'
              >
                <Upload className='h-4 w-4 text-muted-foreground' />
                <p className='text-xs text-muted-foreground'>
                  {isDragOver
                    ? 'Drop image here'
                    : 'Click or drop image to upload'}
                </p>
              </Label>
            </div>
            {previewUrl && (
              <div className='relative w-28 h-auto'>
                <button
                  type='button'
                  className='bg-black dark:bg-white w-4 h-4 aspect-square absolute -top-2 -right-2 rounded-full flex justify-center items-center cursor-pointer'
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  <X className='w-3 h-3 text-white dark:text-black' />
                </button>
                <div className='w-full h-full rounded-lg overflow-hidden'>
                  <img
                    src={previewUrl}
                    alt='Selected preview'
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>
            )}
            <div>
              <MultiSelect
                options={categories?.map((category) => ({
                  value: category.id,
                  label: category.name,
                  icon: (
                    <div
                      className={cn(
                        category.is_active === true
                          ? 'bg-green-500 dark:bg-green-600'
                          : 'bg-red-500 dark:bg-red-600',
                        'w-2.5 h-2.5 rounded-full mr-1'
                      )}
                    />
                  ),
                }))}
                onValueChange={setSelected}
                defaultValue={selected}
                placeholder='Select Categories'
                variant='default'
                maxCount={1}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' disabled={loading} onClick={handleUpload}>
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

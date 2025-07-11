import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Image } from '@/api/images';
import { Button } from './ui/button';
import { MultiSelect } from './ui/multi-select';
import { Category, getAllCategories } from '@/api/categories';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { updateImageCategories } from '@/api/images';
import { toast } from '@/hooks/use-toast';

type UpdateImageProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: Image;
  onUpdated?: () => void;
  categories: Category[];
};

const UpdateImage = ({
  open,
  onOpenChange,
  image,
  onUpdated,
  categories,
}: UpdateImageProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (image?.image_categories && image.image_categories.length > 0) {
      setSelected(image.image_categories.map((ic) => ic.category.id));
    } else {
      setSelected([]);
    }
  }, [image]);

  const handleUpdateImageCategory = async () => {
    if (selected.length === 0) {
      toast({
        title: 'No categories selected',
        description: 'Please select at least one category for the image.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await updateImageCategories(image.id, selected);
      toast({
        title: 'Image Updated',
        description: 'The image categories have been updated successfully.',
      });
      onUpdated?.();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update image categories:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>
            Update the details for this image below.
          </DialogDescription>
        </DialogHeader>
        <div>
          <img
            src={image.url}
            alt=''
            className='mb-4 size-full rounded-lg object-cover'
          />
        </div>
        <div>
          <MultiSelect
            options={categories.map((category) => ({
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
            placeholder='Select Category'
            variant='default'
            maxCount={1}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='button' onClick={handleUpdateImageCategory}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateImage;

'use client';

import { Category } from '@/api/categories';
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
import { useEffect, useState } from 'react';
import { Switch } from '../ui/switch';

type AddCategoryProps = {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

type CategoryDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (name: string, isActive: boolean) => Promise<void>;
  initialData?: { name: string; is_active: boolean };
  title: string;
  actionText: string;
  trigger?: React.ReactNode;
};

export function CategoryDialog({
  open,
  setOpen,
  onSubmit,
  initialData,
  title,
  actionText,
  trigger,
}: CategoryDialogProps) {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIsActive(initialData.is_active);
    } else {
      setName('');
      setIsActive(false);
    }
  }, [initialData, open]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: 'Category name required',
        description: 'Please enter a category name before saving.',
        variant: 'destructive',
      });
      return;
    }
    await onSubmit(name, isActive);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Enter the category details below.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex gap-3 items-center justify-between'>
              <Label htmlFor='active'>Active</Label>
              <Switch
                id='active'
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' onClick={handleSubmit}>
              {actionText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

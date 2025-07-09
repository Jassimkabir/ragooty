'use client';

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
import { Plus } from 'lucide-react';
import { Switch } from './ui/switch';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { addCategory } from '@/api/categories';
import { toast } from '@/hooks/use-toast';

export function AddCategory() {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addCategory(name, isActive);
      toast({
        title: 'Category Created',
        description: 'The new category has been added and is now available.',
      });
      setName('');
      setIsActive(false);
      setOpen(false); // Close dialog on success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Plus className='w-4 h-4' />
            <span className='hidden sm:block'>Add Category</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add category</DialogTitle>
            <DialogDescription>
              Enter the category details below. Click "Add" to add the new
              category.
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
            <div className='grid gap-3'>
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
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

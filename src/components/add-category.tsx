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

export function AddCategory() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Plus className='w-4 h-4' />
            Add Category
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
              <Label htmlFor='name-1'>Name</Label>
              <Input id='name-1' name='name' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='active'>Active</Label>
              <Switch id='active' />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

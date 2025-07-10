'use client';

import { getAllCategories } from '@/api/categories';
import { uploadImage } from '@/api/images';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
}

export function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast({ title: 'No file selected' });
    if (selected.length === 0)
      return toast({ title: 'No categories selected' });

    setLoading(true);
    try {
      const image = await uploadImage(file, selected);
      toast({ title: 'Image uploaded successfully!' });
      console.log('Uploaded:', image);
      setFile(null);
      setSelected([]);
    } catch (error) {
      console.error(error);
      toast({ title: 'Upload failed', description: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
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
              Choose a file and categories to upload your image.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div>
              <Label htmlFor='file'>Select Image</Label>
              <Input
                id='file'
                type='file'
                accept='image/*'
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <Label>Select Categories</Label>
              <div className='grid grid-cols-2 gap-2 mt-2'>
                {categories.map((cat) => (
                  <label key={cat.id} className='flex items-center space-x-2'>
                    <Checkbox
                      checked={selected.includes(cat.id)}
                      onCheckedChange={(checked: any) => {
                        setSelected((prev) =>
                          checked
                            ? [...prev, cat.id]
                            : prev.filter((id) => id !== cat.id)
                        );
                      }}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
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

import { Image } from '@/api/images';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import UpdateImage from './update-image-dialog';
import { Category } from '@/api/categories';

type ImageCardProps = {
  image: Image;
  onClick: () => void;
  onDelete: () => void;
  onUpdated?: () => void;
  categories: Category[];
};

const ImageCard = ({
  image,
  onClick,
  onDelete,
  onUpdated,
  categories,
}: ImageCardProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className='absolute right-0 top-0 sm:right-2 sm:top-2 cursor-pointer'
            variant='ghost'
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
              Edit
              <DropdownMenuShortcut>
                <Edit className='h-4 w-4' />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
              Delete
              <DropdownMenuShortcut>
                <Trash2 className='h-4 w-4' />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              image and remove it from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <UpdateImage
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        image={image}
        onUpdated={onUpdated}
        categories={categories}
      />
      <img
        src={image?.url}
        alt=''
        className='mb-4 size-full rounded-lg object-contain'
        onClick={onClick}
      />
    </div>
  );
};

export default ImageCard;

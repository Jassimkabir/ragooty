import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { ImageWithCategory } from '@/api/images';

interface ImageViewerProps {
  images: ImageWithCategory[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewer({
  images,
  currentIndex,
  isOpen,
  onClose,
}: ImageViewerProps) {
  const [imageIndex, setImageIndex] = useState(currentIndex);

  useEffect(() => {
    setImageIndex(currentIndex);
  }, [currentIndex, isOpen]);

  const goToNext = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[imageIndex];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogTitle></DialogTitle>
      <DialogContent className='p-0 overflow-hidden'>
        <Button
          variant='ghost'
          size='icon'
          onClick={goToPrevious}
          className='absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full shadow'
        >
          <ChevronLeft className='h-8 w-8' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          onClick={goToNext}
          className='absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full shadow'
        >
          <ChevronRight className='h-8 w-8' />
        </Button>
        <img
          src={currentImage?.url}
          alt=''
          className='w-full h-full object-contain max-h-[80vh]'
        />
        <div className='absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-black/80 to-transparent z-10' />
        <div className='absolute bottom-4 left-4 right-4 text-white z-20 flex flex-wrap gap-2'>
          {currentImage?.image_categories?.map((ic) => (
            <Badge key={ic.category.id} variant='secondary'>
              {ic.category.name}
            </Badge>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

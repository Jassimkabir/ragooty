'use client';

import { deleteImage, Image, listImagesWithCategories } from '@/api/images';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import ImageCard from './image-card';
import { ImageViewer } from './image-viewer';
import { BlurFade } from './magicui/blur-fade';

type ListImagesProps = {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
};

const ListImages = ({ images, setImages }: ListImagesProps) => {
  const [loading, setLoading] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDeleteImage = async (id: string, path: string) => {
    try {
      await deleteImage(id, path);
      toast({
        title: 'Image Deleted',
        description: 'The image has been removed successfully.',
        variant: 'destructive',
      });
    } catch (err) {
      toast({ title: 'Delete failed', description: String(err) });
    }
  };

  useEffect(() => {
    listImagesWithCategories().then((data) => {
      const fixedData = data.map((img: any) => ({
        ...img,
        image_categories: img.image_categories.map((ic: any) => ({
          category: Array.isArray(ic.category) ? ic.category[0] : ic.category,
        })),
      }));
      setImages(fixedData);
      setLoading(false);
    });
  }, [handleDeleteImage]);

  const openViewer = (index: number) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  // if (loading) {
  //   return (
  //     <div className='columns-2 gap-4 sm:columns-3'>
  //       {[...Array(4)].map((_, idx) => (
  //         <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
  //           <Skeleton key={idx} className='mb-4 h-48 w-full rounded-lg' />
  //         </BlurFade>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className='columns-2 gap-4 sm:columns-3'>
      {images.map((image, idx) => (
        <BlurFade key={image.url} delay={0.25 + idx * 0.05} inView>
          <ImageCard
            image={image}
            onClick={() => openViewer(idx)}
            onDelete={() => handleDeleteImage(image.id, image.path)}
          />
        </BlurFade>
      ))}
      <ImageViewer
        images={images}
        currentIndex={currentImageIndex}
        isOpen={viewerOpen}
        onClose={() => {
          setViewerOpen(false);
          setCurrentImageIndex(0);
        }}
      />
    </div>
  );
};

export default ListImages;

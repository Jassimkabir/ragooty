'use client';

import {
  deleteImage,
  ImageWithCategory,
  listImagesWithCategories,
} from '@/api/images';
import { getAllCategories, Category } from '@/api/categories';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import ImageCard from './image-card';
import { ImageViewer } from './image-viewer';
import { BlurFade } from '../magicui/blur-fade';

type ListImagesProps = {
  images: ImageWithCategory[];
  setImages: React.Dispatch<React.SetStateAction<ImageWithCategory[]>>;
};

const ListImages = ({ images, setImages }: ListImagesProps) => {
  const [loading, setLoading] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  const getImages = async () => {
    await listImagesWithCategories().then((data) => {
      const fixedData = data.map((img: any) => ({
        ...img,
        image_categories: img.image_categories.map((ic: any) => ({
          category: Array.isArray(ic.category) ? ic.category[0] : ic.category,
        })),
      }));
      setImages(fixedData);
      setLoading(false);
    });
  };

  const getCategories = async () => {
    await getAllCategories().then((data) => {
      setCategories(data);
    });
  };

  useEffect(() => {
    getImages();
    getCategories();
  }, []);

  const handleDeleteImage = async (id: string, path: string) => {
    try {
      await deleteImage(id, path);
      await getImages();
      toast({
        title: 'Image Deleted',
        description: 'The image has been removed successfully.',
        variant: 'destructive',
      });
    } catch (err) {
      toast({ title: 'Delete failed', description: String(err) });
    }
  };

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
            onUpdated={getImages}
            categories={categories}
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

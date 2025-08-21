'use client';

import { Category, getActiveCategories } from '@/api/categories';
import { ImageWithCategory, listImagesWithCategories } from '@/api/images';
import { cn } from '@/lib/utils';
import { Fira_Sans_Extra_Condensed } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { BlurFade } from '../magicui/blur-fade';
import { ImageModal } from '../ui/image-modal';

const Fira = Fira_Sans_Extra_Condensed({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '700'],
});

export default function GalleryPage() {
  const [images, setImages] = useState<ImageWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getImages = async () => {
    const data = await listImagesWithCategories();
    const fixedData = data.map((img: any) => ({
      ...img,
      image_categories: img.image_categories.map((ic: any) => ({
        category: Array.isArray(ic.category) ? ic.category[0] : ic.category,
      })),
    }));
    setImages(fixedData);
  };

  const getCategories = async () => {
    const data = await getActiveCategories();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
    getImages();
  }, []);

  const filteredImages = useMemo(() => {
    if (!activeCategory) return images;
    return images.filter((img) =>
      img.image_categories.some((ic) => ic.category?.id === activeCategory)
    );
  }, [images, activeCategory]);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  return (
    <div className='container mx-auto px-4 py-4 mt-24 flex flex-col items-center gap-6'>
      <div
        className={cn(
          'flex flex-wrap items-center gap-4 justify-center',
          Fira.className
        )}
      >
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            'px-3 py-1 rounded-full transition-colors hover:text-foreground duration-300 cursor-pointer',
            !activeCategory ? 'text-foreground' : 'text-foreground/30'
          )}
        >
          All
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            className={cn(
              'px-3 py-1 rounded-full transition-colors hover:text-foreground duration-300 cursor-pointer',
              activeCategory === item.id
                ? 'text-foreground'
                : 'text-foreground/30'
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
      {filteredImages.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-foreground/50'>
          <p className={cn('text-md', Fira.className)}>
            {activeCategory
              ? 'No images found in this category.'
              : 'No images to display yet.'}
          </p>
        </div>
      ) : (
        <div className='columns-2 gap-4 md:columns-4'>
          {filteredImages.map((image, idx) => (
            <BlurFade key={image.url} delay={0.25 + idx * 0.05} inView>
              <Image
                src={image.url}
                alt=''
                width={image.width}
                height={image.height}
                sizes='(max-width: 768px) 50vw, 25vw'
                className='mb-4 w-full h-auto rounded-lg object-contain cursor-pointer hover:opacity-90 transition-opacity select-none'
                draggable={false}
                onClick={() => handleImageClick(idx)}
                onContextMenu={(e) => e.preventDefault()}
                priority
              />
            </BlurFade>
          ))}
        </div>
      )}

      {filteredImages.length > 0 && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          currentImageIndex={currentImageIndex}
          images={filteredImages}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}

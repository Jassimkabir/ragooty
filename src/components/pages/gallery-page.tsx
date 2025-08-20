'use client';

import { Category, getActiveCategories } from '@/api/categories';
import { ImageWithCategory, listImagesWithCategories } from '@/api/images';
import { cn } from '@/lib/utils';
import { Fira_Sans_Extra_Condensed } from 'next/font/google';
import { useEffect, useMemo, useState } from 'react';
import { BlurFade } from '../magicui/blur-fade';

const Fira = Fira_Sans_Extra_Condensed({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '700'],
});

export default function GalleryPage() {
  const [images, setImages] = useState<ImageWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
            'px-3 py-1 rounded-full transition-colors',
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
              'px-3 py-1 rounded-full transition-colors',
              activeCategory === item.id
                ? 'text-foreground'
                : 'text-foreground/30'
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className='columns-2 gap-4 md:columns-4'>
        {filteredImages.map((image, idx) => (
          <BlurFade key={image.url} delay={0.25 + idx * 0.05} inView>
            <img
              src={image?.url}
              alt=''
              className='mb-4 size-full rounded-lg object-contain'
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

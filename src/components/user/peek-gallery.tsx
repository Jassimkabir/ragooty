'use client';

import { ImageWithCategory, listImagesWithCategories } from '@/api/images';
import { cn } from '@/lib/utils';
import { MoveUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Fira_Sans_Extra_Condensed } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Marquee } from '../magicui/marquee';

const Fira = Fira_Sans_Extra_Condensed({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '700'],
});

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const PeekGallery = () => {
  const [images, setImages] = useState<ImageWithCategory[]>([]);

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

  useEffect(() => {
    getImages();
  }, []);

  const firstRow = images.slice(0, images.length / 2);
  const secondRow = images.slice(images.length / 2);

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <div className='container mx-auto px-4 my-10 flex flex-col gap-6 items-center justify-center'>
        <div className='md:w-1/2 w-full'>
          <div className='relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden'>
            <Marquee pauseOnHover className='[--duration:20s]'>
              {firstRow.map((image) => (
                <motion.img
                  key={image.url}
                  src={image?.url}
                  alt=''
                  variants={imageVariants}
                  whileHover={{ scale: 1.05 }}
                  className='h-56 w-auto rounded-lg object-contain transition-shadow shadow-md hover:shadow-lg'
                />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className='[--duration:20s]'>
              {secondRow.map((image) => (
                <motion.img
                  key={image.url}
                  src={image?.url}
                  alt=''
                  variants={imageVariants}
                  whileHover={{ scale: 1.05 }}
                  className='h-56 w-auto rounded-lg object-contain transition-shadow shadow-md hover:shadow-lg'
                />
              ))}
            </Marquee>
            <div className='pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background'></div>
            <div className='pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background'></div>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.03 }}>
          <Link href={'gallery'}>
            <motion.p
              className={cn(
                'flex gap-2 items-center text-foreground text-lg md:text-xl',
                Fira.className
              )}
              whileHover={{ x: 4 }}
            >
              View Gallery
              <MoveUpRight className='w-4 h-4' />
            </motion.p>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PeekGallery;

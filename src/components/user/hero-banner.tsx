'use client';

import { getImagesByCategory, Image as ImageType } from '@/api/images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Cinzel_Decorative } from 'next/font/google';
import { cn } from '@/lib/utils';
import { MoveUpRight } from 'lucide-react';

const Cin = Cinzel_Decorative({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const HeroBanner = () => {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    getImagesByCategory('cf4395c9-373d-4caf-94da-9fcde4c9ffc5').then(
      (data: ImageType[]) => setImages(data)
    );
  }, []);

  return (
    <section className='w-full flex flex-col md:flex-row items-center justify-between'>
      <motion.div
        className='md:w-2/3 w-full space-y-6 px-64'
        initial='hidden'
        animate='visible'
        variants={textVariants}
      >
        <h1
          className={cn(
            Cin.className,
            'text-4xl md:text-6xl font-semibold tracking-tight leading-tight'
          )}
        >
          Ragooty Sasidharan
        </h1>
        <p className='text-lg md:text-xl max-w-xl text-gray-300'>
          Capturing moments, framing emotions. Explore the world through my
          lens.
        </p>
        <motion.a
          href='#gallery'
          className='flex gap-2 items-center text-white hover:underline'
          whileHover={{ x: 4 }}
        >
          Gallery
          <MoveUpRight className='w-4 h-4' />
        </motion.a>
      </motion.div>

      <motion.div
        className='md:w-1/3 w-full mt-10 md:mt-0 relative'
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
      >
        <Carousel plugins={[Autoplay({ delay: 3000 }), Fade()]}>
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id} className='w-full'>
                <div className='relative w-full aspect-square overflow-hidden'>
                  <Image
                    src={image.url}
                    alt='Photography work'
                    fill
                    className='object-cover'
                    sizes='100vw'
                    priority
                  />
                  <div className='absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-background pointer-events-none'></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default HeroBanner;

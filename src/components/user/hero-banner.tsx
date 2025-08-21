'use client';

import { getImagesByCategory, Image as ImageType } from '@/api/images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { MoveUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Cinzel_Decorative, Fira_Sans_Condensed } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';

const Cin = Cinzel_Decorative({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400'],
});

const Fira = Fira_Sans_Condensed({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const HeroBanner = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    getImagesByCategory('cf4395c9-373d-4caf-94da-9fcde4c9ffc5').then(
      (data: ImageType[]) => setImages(data)
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollIndicator(scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className='w-full min-h-[100dvh] h-[100dvh] flex flex-col md:flex-row md:mt-0 mt-24 items-center md:justify-between relative'>
      <motion.div className='md:w-1/2 w-full flex items-center container mx-auto md:px-6 px-4'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={textVariants}
          className='flex flex-col gap-4'
        >
          <h1
            className={cn(
              Cin.className,
              'text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-tight pt-10 pb-5'
            )}
          >
            Ragooty Sasidharan
          </h1>
          <motion.p
            variants={fadeInUp}
            className={cn(
              Fira.className,
              'text-lg md:text-xl text-muted-foreground max-w-3xl'
            )}
          >
            Chasing light, capturing moments, and telling stories through the
            lens of creativity
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className='md:w-1/2 w-full mt-10 md:mt-0 relative'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8 } }}
      >
        <Carousel plugins={[Autoplay({ delay: 3000 }), Fade()]}>
          <CarouselContent>
            {images.length > 0 &&
              images.map((image) => (
                <CarouselItem key={image.id} className='w-full'>
                  <div className='relative w-full md:h-[100dvh] max-[568px]:h-[calc(100dvh-388px)] h-[calc(100dvh-300px)] overflow-hidden'>
                    <Image
                      src={image.url}
                      alt='Photography work'
                      fill
                      className='object-cover'
                      sizes='100vw'
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      priority
                    />
                    <div className='absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-background via-background/0 to-background md:from-transparent md:to-background pointer-events-none'></div>
                  </div>
                </CarouselItem>
              ))}
            {images.length === 0 && (
              <CarouselItem className='w-full'>
                <div className='relative w-full md:h-[100dvh] max-[568px]:h-[calc(100dvh-388px)] h-[calc(100dvh-300px)] overflow-hidden'>
                  <Blurhash
                    hash={'UOJRdVxu_3ay~qj[ayRjRjRjIUofxuM{M{xu'}
                    width='100%'
                    height='100%'
                    punch={1}
                    resolutionX={32}
                    resolutionY={32}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-background via-background/0 to-background md:from-transparent md:to-background pointer-events-none'></div>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
      </motion.div>
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            className='absolute md:bottom-8 bottom-32 left-1/2 transform -translate-x-1/2 z-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className='flex flex-col items-center gap-2 text-white/70 hover:text-white/90 cursor-pointer transition-colors'
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth',
                });
              }}
            >
              <span className={cn(Fira.className, 'text-sm font-medium')}>
                scroll to explore
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroBanner;

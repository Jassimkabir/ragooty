'use client';

import { cn } from '@/lib/utils';
import { Cinzel_Decorative, Fira_Sans_Condensed } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const Cin = Cinzel_Decorative({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Fira = Fira_Sans_Condensed({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '700'],
});

const footer = () => {
  return (
    <footer className='relative bg-background text-foreground bottom-0 w-full flex flex-col items-center justify-center overflow-hidden py-16 md:py-20 lg:py-24 gap-6 md:gap-8 lg:gap-10'>
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/2 z-0'>
        <Image
          src='/images/ragooty-alternative.JPG'
          alt='Ragooty Sasidharan'
          fill
          sizes='(min-width: 1024px) 50vw, 100vw'
          priority
          className='object-cover object-center'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-background/90 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-b from-background to-transparent' />
      </div>
      <div className='relative z-20 flex flex-col gap-6 md:gap-8 lg:gap-10 items-center justify-center px-4 text-center'>
        <div>
          <Link
            href='mailto:ragootysasidharan@gmail.com'
            className={cn(
              Fira.className,
              'text-2xl sm:text-3xl lg:text-4xl font-bold hover:underline'
            )}
          >
            ragootysasidharan@gmail.com
          </Link>
        </div>
        <div className='text-center'>
          <Link href={'/'}>
            <div
              className={cn(Cin.className, 'text-lg sm:text-xl text-center')}
            >
              Ragooty Sasidharan
            </div>
          </Link>
          <p className={cn(Fira.className, 'text-xs sm:text-sm')}>
            © 2025 Ragooty Sasidharan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default footer;

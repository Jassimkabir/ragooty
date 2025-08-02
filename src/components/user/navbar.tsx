'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { MenuIcon, MoveUpRight, XIcon } from 'lucide-react';
import { Cinzel_Decorative, Fira_Sans_Condensed } from 'next/font/google';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../admin/theme-toggle';
import { MorphingText } from '../magicui/morphing-text';

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

const links = [
  { title: 'Home', href: '/' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

const socialLinks = [
  { title: 'Instagram', href: 'https://www.instagram.com/ragooty_sasidharan/' },
  { title: 'Facebook', href: 'https://www.facebook.com/r4rag.in/' },
  { title: 'Behance', href: '/about' },
];

const modalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: 'tween', duration: 0.3, delayChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { type: 'tween', duration: 0.2 },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
  exit: {
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: '50%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: '50%',
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== '/') {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <header className={cn('py-6 px-4 md:px-6 fixed top-0 left-0 right-0 z-50')}>
      <div className='absolute inset-0 pointer-events-none bg-gradient-to-b from-background/70 to-transparent z-[-1]' />
      <div className='flex justify-between items-center'>
        <div style={{ minHeight: '1.75rem' }}></div>
        <AnimatePresence>
          {scrolled && (
            <Link href={'/'}>
              <motion.div
                className={cn(Cin.className, 'text-xl text-center')}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                Ragooty Sasidharan
              </motion.div>
            </Link>
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label='Toggle menu'
          className='rounded-full bg-foreground/40 backdrop-blur-xl p-3'
        >
          <MenuIcon
            size={20}
            className={cn(open ? 'invisible' : '', 'text-background')}
          />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className='fixed inset-0 bg-background/80 backdrop-blur-lg flex flex-col justify-center items-center z-50'
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <motion.button
              onClick={() => setOpen(false)}
              className='absolute top-6 right-4 md:right-6 rounded-full bg-foreground/40 backdrop-blur-xl p-3'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <XIcon size={20} className='text-background' />
            </motion.button>
            <motion.div
              className='flex flex-col lg:flex-row gap-8 text-foreground text-3xl font-semibold w-full justify-center items-center text-center'
              variants={listVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              {links.map((link) => (
                <motion.p key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'transition-colors',
                      pathname === link.href
                        ? 'text-foreground'
                        : 'text-foreground/30 hover:text-foreground',
                      Fira.className
                    )}
                  >
                    {link.title}
                  </Link>
                </motion.p>
              ))}
            </motion.div>
            <motion.div
              className='flex flex-col lg:flex-row gap-8 text-foreground text-md w-full justify-center items-center text-center mt-10'
              variants={listVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              {socialLinks.map((link) => (
                <motion.p key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    target='_blank'
                    onClick={() => setOpen(false)}
                    className={cn(
                      'transition-colors flex gap-2 items-center',
                      'text-foreground/30 hover:text-foreground',
                      Fira.className
                    )}
                  >
                    {link.title}
                    <MoveUpRight className='w-4 h-4' />
                  </Link>
                </motion.p>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

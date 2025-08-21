'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Cinzel_Decorative, Fira_Sans_Condensed } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Settings, RotateCcw, X } from 'lucide-react';

const Cin = Cinzel_Decorative({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Fira = Fira_Sans_Condensed({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const modalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: 'tween', duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { type: 'tween', duration: 0.2 },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function AgeVerificationReset() {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    localStorage.removeItem('age-verified');
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <>
      <Button
        variant='link'
        size='sm'
        onClick={() => setIsOpen(true)}
        className={cn(
          Fira.className,
          'text-xs transition-all duration-200 text-foreground/50 cursor-pointer hover:no-underline hover:text-foreground'
        )}
      >
        <Settings className='h-4 w-4 mr-1' />
        Reset Age Verification
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 z-[100] flex items-center justify-center p-4'
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            {/* Backdrop */}
            <motion.div
              className='absolute inset-0 bg-background/80 backdrop-blur-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Content */}
            <motion.div
              className='relative w-full max-w-sm'
              variants={contentVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <div className='rounded-lg border bg-card/50 backdrop-blur-xl p-6 shadow-2xl'>
                {/* Header */}
                <div className='text-center mb-4'>
                  <div className='flex justify-center mb-3'>
                    <div className='rounded-full bg-muted/50 p-2'>
                      <RotateCcw className='h-6 w-6 text-foreground' />
                    </div>
                  </div>
                  <h3 className={cn(Fira.className, 'text-xl font-bold mb-1')}>
                    Reset Verification
                  </h3>
                  <p
                    className={cn(
                      Fira.className,
                      'text-muted-foreground text-sm'
                    )}
                  >
                    Clear your age verification status
                  </p>
                </div>

                {/* Description */}
                <div className='mb-4 p-4 rounded-lg bg-muted/30 border border-border/50'>
                  <p
                    className={cn(
                      Fira.className,
                      'text-sm text-muted-foreground text-center'
                    )}
                  >
                    This will clear your age verification status and require you
                    to verify your age again on the next page load.
                  </p>
                </div>

                {/* Buttons */}
                <div className='flex gap-3'>
                  <Button
                    onClick={handleReset}
                    variant='destructive'
                    className={cn(
                      Fira.className,
                      'flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-200'
                    )}
                  >
                    <RotateCcw className='h-4 w-4 mr-1' />
                    Reset
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant='outline'
                    className={cn(
                      Fira.className,
                      'flex-1 border-border/50 hover:bg-muted/50 transition-all duration-200'
                    )}
                  >
                    <X className='h-4 w-4 mr-1' />
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

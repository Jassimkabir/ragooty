'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, Camera, Eye, EyeOff, Info } from 'lucide-react';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { Cinzel_Decorative, Fira_Sans_Condensed } from 'next/font/google';
import { useEffect, useState } from 'react';

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

interface AgeVerificationProps {
  isOpen: boolean;
  onVerified: () => void;
}

const modalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: 'tween', duration: 0.4, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { type: 'tween', duration: 0.3 },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function AgeVerification({
  isOpen,
  onVerified,
}: AgeVerificationProps) {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('age-verified');
    if (verified === 'true') {
      setIsVerified(true);
      onVerified();
    }
  }, [onVerified]);

  const handleVerify = () => {
    localStorage.setItem('age-verified', 'true');
    setIsVerified(true);
    onVerified();
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isVerified) {
    return null;
  }

  return (
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
          />

          {/* Content */}
          <motion.div
            className='relative w-full max-w-md'
            variants={contentVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <div className='rounded-lg border bg-card/50 backdrop-blur-xl p-8 shadow-2xl'>
              {/* Header */}
              <motion.div
                className='text-center mb-4'
                variants={itemVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <div className='flex justify-center mb-4'>
                  <div className='rounded-full bg-muted/50 p-3'>
                    <Camera className='h-8 w-8 text-foreground' />
                  </div>
                </div>
                <h2 className={cn(Fira.className, 'text-2xl font-bold mb-2')}>
                  Content Notice
                </h2>
                <p
                  className={cn(
                    Fira.className,
                    'text-muted-foreground text-sm'
                  )}
                >
                  Photography portfolio with mature themes
                </p>
              </motion.div>

              {/* Warning */}
              <motion.div
                className='mb-4 p-4 rounded-lg bg-muted/30 border border-border/50'
                variants={itemVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <div className='flex items-start gap-3'>
                  <Info className='h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0' />
                  <div>
                    <p
                      className={cn(Fira.className, 'text-sm font-medium mb-1')}
                    >
                      Artistic Content
                    </p>
                    <p
                      className={cn(
                        Fira.className,
                        'text-xs text-muted-foreground'
                      )}
                    >
                      This photography portfolio includes artistic nude,
                      fashion, and portrait work that may contain explicit
                      content suitable for mature audiences only.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Age Requirement */}
              <motion.div
                className='mb-4 p-4 rounded-lg bg-muted/30 border border-border/50'
                variants={itemVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <div className='flex items-start gap-3'>
                  <Calendar className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                  <div>
                    <p
                      className={cn(Fira.className, 'text-sm font-medium mb-1')}
                    >
                      Age Confirmation
                    </p>
                    <p
                      className={cn(
                        Fira.className,
                        'text-xs text-muted-foreground'
                      )}
                    >
                      You must be 18 or older to view this photography
                      collection. Please confirm your age to continue browsing
                      the gallery.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                className='flex flex-col gap-3'
                variants={buttonVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <Button
                  onClick={handleVerify}
                  className={cn(
                    Fira.className,
                    'w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200'
                  )}
                >
                  <Eye className='h-4 w-4 mr-2' />
                  View Site
                </Button>
                <Button
                  onClick={handleDecline}
                  variant='outline'
                  className={cn(
                    Fira.className,
                    'w-full border-border/50 hover:bg-muted/50 transition-all duration-200'
                  )}
                >
                  <EyeOff className='h-4 w-4 mr-2' />
                  Leave Site
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

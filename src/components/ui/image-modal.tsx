'use client';

import { AnimatePresence, motion, Variants } from 'motion/react';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageIndex: number;
  images: Array<{ url: string; alt?: string }>;
  onNext: () => void;
  onPrev: () => void;
}

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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'tween', duration: 0.4, delay: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { type: 'tween', duration: 0.2 },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'tween', duration: 0.3, delay: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { type: 'tween', duration: 0.2 },
  },
};

export function ImageModal({
  isOpen,
  onClose,
  currentImageIndex,
  images,
  onNext,
  onPrev,
}: ImageModalProps) {
  const currentImage = images[currentImageIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        className='fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-lg'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        onClick={onClose}
      >
        <motion.button
          onClick={onClose}
          className='absolute top-4 right-4 z-10 rounded-full bg-foreground/10 backdrop-blur-xl p-3 text-foreground hover:bg-foreground/20 transition-colors'
          variants={buttonVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <XIcon size={24} />
        </motion.button>
        {images.length > 1 && (
          <>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className='absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-foreground/10 backdrop-blur-xl p-3 text-foreground hover:bg-foreground/20 transition-colors'
              variants={buttonVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <ChevronLeftIcon size={24} />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className='absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-foreground/10 backdrop-blur-xl p-3 text-foreground hover:bg-foreground/20 transition-colors'
              variants={buttonVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <ChevronRightIcon size={24} />
            </motion.button>
          </>
        )}
        <motion.div
          className='relative w-full h-full flex items-center justify-center p-8'
          variants={imageVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.url}
            alt={currentImage.alt || ''}
            className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
            style={{
              maxWidth: 'calc(100vw - 4rem)',
              maxHeight: 'calc(100vh - 8rem)',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

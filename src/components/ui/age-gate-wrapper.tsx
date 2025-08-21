'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import AgeVerification from './age-verification';

interface AgeGateWrapperProps {
  children: React.ReactNode;
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export default function AgeGateWrapper({ children }: AgeGateWrapperProps) {
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const verified = localStorage.getItem('age-verified');
    if (verified === 'true') {
      setIsAgeVerified(true);
    } else {
      setShowAgeVerification(true);
    }
  }, []);

  useEffect(() => {
    if (showAgeVerification) {
      const scrollY = window.scrollY;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showAgeVerification]);

  const handleAgeVerified = () => {
    setIsAgeVerified(true);
    setShowAgeVerification(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <motion.div
        className='transition-all duration-500 ease-in-out'
        style={{
          filter: showAgeVerification ? 'blur(16px)' : 'blur(0px)',
          pointerEvents: showAgeVerification ? 'none' : 'auto',
        }}
      >
        {children}
      </motion.div>

      <AgeVerification
        isOpen={showAgeVerification}
        onVerified={handleAgeVerified}
      />
    </>
  );
}

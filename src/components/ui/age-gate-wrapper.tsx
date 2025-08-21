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

    // Check if user has already verified their age
    const verified = localStorage.getItem('age-verified');
    if (verified === 'true') {
      setIsAgeVerified(true);
    } else {
      setShowAgeVerification(true);
    }
  }, []);

  // Disable scrolling when age verification is shown
  useEffect(() => {
    if (showAgeVerification) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Disable scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      // Cleanup function to re-enable scrolling
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

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Always render the children content with smooth blur transition */}
      <motion.div
        className='transition-all duration-500 ease-in-out'
        style={{
          filter: showAgeVerification ? 'blur(16px)' : 'blur(0px)',
          pointerEvents: showAgeVerification ? 'none' : 'auto',
        }}
      >
        {children}
      </motion.div>

      {/* Show age verification if not verified */}
      <AgeVerification
        isOpen={showAgeVerification}
        onVerified={handleAgeVerified}
      />
    </>
  );
}

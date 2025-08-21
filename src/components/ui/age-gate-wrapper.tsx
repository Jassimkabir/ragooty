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
      {/* Show age verification if not verified */}
      <AgeVerification
        isOpen={showAgeVerification}
        onVerified={handleAgeVerified}
      />

      {/* Show the actual content if age is verified */}
      <AnimatePresence>
        {isAgeVerified && (
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

const MIYU_IMG = 'https://media.base44.com/images/public/69f421629a32baa29433f382/fd3148364_generated_image.png';

export default function MiyuAvatar({ isOpen, isAnimating, size = 'md', speaking = false }) {
  const sizeClass = size === 'lg' ? 'w-20 h-20' : 'w-12 h-12';

  return (
    <motion.div
      className={`${sizeClass} relative rounded-full overflow-hidden border-2 border-primary/60 shadow-lg`}
      style={{
        background: 'linear-gradient(135deg, hsl(260,30%,20%), hsl(225,25%,18%))',
        boxShadow: '0 0 16px hsla(43,55%,52%,0.35)',
      }}
      animate={
        speaking
          ? { scale: [1, 1.04, 1], rotate: [0, 1, -1, 0] }
          : isAnimating
          ? { rotate: [0, -8, 8, -4, 4, 0], scale: [1, 1.05, 1] }
          : {}
      }
      transition={{ duration: speaking ? 0.5 : 0.6, repeat: speaking ? Infinity : 0, repeatType: 'loop' }}
    >
      <motion.img
        src={MIYU_IMG}
        alt="MIYU"
        className="w-full h-full object-cover object-top scale-125"
        animate={
          isOpen
            ? { y: [0, -2, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
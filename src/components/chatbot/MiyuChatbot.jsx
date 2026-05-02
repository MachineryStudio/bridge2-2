import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MiyuSetup from './MiyuSetup';
import MiyuChat from './MiyuChat';
import MiyuAvatar from './MiyuAvatar';

export default function MiyuChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [chatLang, setChatLang] = useState('en');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSetupComplete = ({ name, lang }) => {
    setCustomerName(name || '');
    setChatLang(lang);
    setSetupDone(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-[360px] max-h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-border/60"
            style={{
              background: 'linear-gradient(135deg, hsl(225,25%,16%) 0%, hsl(260,30%,18%) 100%)',
            }}
          >
            {!setupDone ? (
              <MiyuSetup onComplete={handleSetupComplete} onClose={() => setIsOpen(false)} />
            ) : (
              <MiyuChat
                customerName={customerName}
                lang={chatLang}
                onClose={() => setIsOpen(false)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating avatar button */}
      <motion.button
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative focus:outline-none"
        title="Chat with MIYU"
      >
        <MiyuAvatar isOpen={isOpen} isAnimating={isAnimating} size="lg" />
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
          >
            <span className="text-[9px] font-bold text-primary-foreground">♡</span>
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
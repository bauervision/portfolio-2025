import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAnimation, motion, AnimatePresence } from 'framer-motion';
import ChatBot from './ChatBot';
import EyeBubble from './EyeBubble';
import { ThoughtBubble } from './ThoughtBubble';
import { eyeBotMessages } from '@/constants/eyeBotMessages';

export default function MiniChatBotLauncher() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const pathname = usePathname();

  // Get page messages, or fallback if not defined
  const pageMessages = eyeBotMessages[pathname as string] || [
    'Have a question about this project?',
  ];

  // Hide bubble when chat opens, show when closed or path changes
  useEffect(() => {
    if (open) setBubbleVisible(false);
    else setBubbleVisible(true);
  }, [open, pathname]);

  // When EyeBot is clicked, auto-fill input with current prompt (if exists)
  const handleEyeBotClick = () => {
    if (currentPrompt) setInput(currentPrompt);
    setOpen(true);
  };

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end m-4'>
      {/* Thought bubble, staggered above EyeBubble */}
      <div style={{ position: 'relative', width: 128, height: 0 }}>
        <ThoughtBubble
          messages={pageMessages}
          visible={bubbleVisible}
          onPromptChange={setCurrentPrompt}
          align='left'
        />
      </div>
      {/* Bubble (EyeBot face) */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className='flex items-center justify-center rounded-full shadow-xl bg-blue-600 cursor-pointer'
            style={{ width: 128, height: 128 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.13, 1],
              opacity: 1,
              transition: {
                scale: {
                  duration: 1.35,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                },
                opacity: { duration: 0.5, delay: 0.1 },
              },
            }}
            whileHover={{ scale: 1.19 }}
            transition={{
              // This handles only the initial mount (Framer will merge with above)
              scale: {
                duration: 0.8,
                ease: [0.44, 0.0, 0.56, 1.0],
              },
              opacity: {
                duration: 0.4,
                delay: 0.1,
              },
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={handleEyeBotClick}
            title="Ask Mike's AI Assistant"
          >
            <EyeBubble />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Dialog */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className='fixed inset-0 bg-black bg-opacity-40 z-40'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className='fixed bottom-20 right-6 z-50'
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ width: 340, maxWidth: '90vw' }}
            >
              <div
                className='relative bg-white p-4 dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full'
                style={{
                  minHeight: 88,
                  transition: 'min-height 0.35s cubic-bezier(.4,2,.3,1)',
                }}
              >
                <button
                  className='absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-1 text-gray-600 dark:text-gray-100 z-10'
                  onClick={() => setOpen(false)}
                  aria-label='Close'
                >
                  ✕
                </button>
                <ChatBot input={input} setInput={setInput} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

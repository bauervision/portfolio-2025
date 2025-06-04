import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBot from './ChatBot'; // Use your ChatBot with input/setInput as before
import EyeBubble from './EyeBubble';

export default function MiniChatBotLauncher() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  // You can add suggested prompt logic as before if you want

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end m-4'>
      {/* Bubble */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className='flex items-center justify-center rounded-full shadow-xl bg-blue-600 cursor-pointer'
            style={{ width: 56, height: 56 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.15, 1],
              opacity: [0, 1, 1],
            }}
            transition={{
              scale: {
                duration: 0.75,
                ease: [0.44, 0.0, 0.56, 1.0], // easeInOut
              },
              opacity: {
                duration: 0.4,
                delay: 0.1,
              },
            }}
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.96 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={() => setOpen(true)}
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
            {/* Overlay: click to close */}
            <motion.div
              className='fixed inset-0 bg-black bg-opacity-40 z-40'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            {/* Chatbot box */}
            <motion.div
              className='fixed bottom-20 right-6 z-50'
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ width: 340, maxWidth: '90vw' }}
            >
              <div className='bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden'>
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

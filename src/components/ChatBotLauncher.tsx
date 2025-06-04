import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatBot from './ChatBot';
import EyeBubble, { ThoughtBubble } from './EyeBubble';

export default function ChatBotLauncher() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState('');
  const [suggestedPrompt, setSuggestedPrompt] = useState<string | null>(null);

  return (
    <>
      {/* Overlay: Mobile only (fixed & full screen) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key='overlay-mobile'
            className='fixed inset-0 z-40 bg-black/60 md:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              setOpen(false);
              setTimeout(() => setStarted(false), 300);
            }}
          />
        )}
      </AnimatePresence>
      {/* Overlay: Desktop (static, fills hero/grid only) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key='overlay-desktop'
            className='absolute inset-0 z-40 bg-black/60 hidden md:block'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              setOpen(false);
              setTimeout(() => setStarted(false), 300);
            }}
          />
        )}
      </AnimatePresence>

      {/* Eyebot with ThoughtBubble */}
      <>
        {/* Mobile: Eyebot centered, scrolls with page, has margin top */}
        {!open && (
          <div className='flex flex-col items-center justify-center w-full mt-[20px] mb-2 md:hidden'>
            <motion.div
              className='z-50 flex flex-col items-center'
              style={{ width: 128, height: 128 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: 1,
                transition: {
                  scale: {
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  },
                  opacity: { duration: 0.18 },
                },
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(true)}
              title='Ask me anything!'
            >
              <div className='relative flex flex-col items-center'>
                <ThoughtBubble onPromptChange={setSuggestedPrompt} />
                <EyeBubble
                  onClick={() => {
                    if (suggestedPrompt) {
                      setInput(suggestedPrompt);
                      setSuggestedPrompt(null);
                    }
                    setOpen(true);
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* Desktop: Eyebot centered in hero (as before) */}
        {!open && (
          <motion.div
            key='chat-bubble'
            className='z-50 flex flex-col items-center hidden md:flex'
            style={{ width: 128, height: 128 }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: 1,
              transition: {
                scale: {
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                },
                opacity: { duration: 0.18 },
              },
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(true)}
            title='Ask me anything!'
          >
            <div className='relative flex flex-col items-center'>
              <ThoughtBubble onPromptChange={setSuggestedPrompt} />
              <EyeBubble
                onClick={() => {
                  if (suggestedPrompt) {
                    setInput(suggestedPrompt);
                    setSuggestedPrompt(null);
                  }
                  setOpen(true);
                }}
              />
            </div>
          </motion.div>
        )}
      </>

      {/* Chat Dialog: Mobile (fixed & centered) */}
      <AnimatePresence>
        {open && (
          <div className='fixed inset-0 z-50 flex items-center justify-center md:hidden'>
            <motion.div
              key='chat-dialog-mobile'
              className='relative bg-white p-4 dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col w-[95vw] max-w-[380px]'
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 25 }}
              layout
            >
              <button
                className='absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-1 text-gray-600 dark:text-gray-100 z-10'
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => setStarted(false), 300);
                }}
                aria-label='Close'
              >
                ✕
              </button>
              <ChatBot
                input={input}
                setInput={setInput}
                minimal={!started}
                onStart={() => setStarted(true)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Dialog: Desktop (scrolls with page, absolute/relative as parent allows) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key='chat-dialog-desktop'
            className='absolute z-50 flex flex-col items-center justify-center hidden md:flex'
            initial={{ scale: 0.7, opacity: 0, y: 32 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 32 }}
            transition={{ type: 'spring', stiffness: 240, damping: 25 }}
            layout
            style={{
              minWidth: 340,
              minHeight: !started ? 88 : 380,
              width: 'clamp(420px, 36vw, 520px)',
              maxWidth: '96vw',
            }}
          >
            <div
              className='relative bg-white p-4 dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full'
              style={{
                minHeight: !started ? 88 : 380,
                transition: 'min-height 0.35s cubic-bezier(.4,2,.3,1)',
              }}
            >
              <button
                className='absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-1 text-gray-600 dark:text-gray-100 z-10'
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => setStarted(false), 300);
                }}
                aria-label='Close'
              >
                ✕
              </button>
              <ChatBot
                input={input}
                setInput={setInput}
                minimal={!started}
                onStart={() => setStarted(true)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

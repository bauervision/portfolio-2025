import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const SUGGESTIONS = [
  'How much React experience?',
  'Does he have a formal degree?',
  'What industries has he worked in?',
  'Does he have a military background?',
  'What’s his tech stack?',
  'Can I see a resume download?',
];

function getRandomPrompt(list: string[], last: string | null) {
  let filtered = list.filter((q) => q !== last);
  if (filtered.length === 0) filtered = list;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

type Align = 'center' | 'left';

export function ThoughtBubble({
  messages,
  visible = true,
  onPromptChange,
  align = 'center',
  overridePrompt,
}: {
  messages?: string[];
  visible?: boolean;
  onPromptChange?: (q: string | null) => void;
  align?: 'center' | 'left';
  overridePrompt?: string | null;
}) {
  const promptList = messages && messages.length ? messages : SUGGESTIONS;
  const [prompt, setPrompt] = useState<string | null>(messages?.[0] ?? null);
  const [lastPrompt, setLastPrompt] = useState<string | null>(null);
  const [show, setShow] = useState(visible);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const resumeCycleTimeout = useRef<NodeJS.Timeout | null>(null);

  // === Cycling Effect (PAUSE for 2s after overridePrompt goes null) ===
  useEffect(() => {
    // If overridePrompt is active, clear timers and show override
    if (overridePrompt) {
      if (timer.current) clearTimeout(timer.current);
      if (resumeCycleTimeout.current) clearTimeout(resumeCycleTimeout.current);
      setPrompt(overridePrompt);
      setShow(true);
      return;
    }

    // If overridePrompt was just cleared, delay resuming cycling
    if (!overridePrompt) {
      if (timer.current) clearTimeout(timer.current);
      if (resumeCycleTimeout.current) clearTimeout(resumeCycleTimeout.current);
      // Delay cycling for 2 seconds
      resumeCycleTimeout.current = setTimeout(() => {
        let active = true;
        function showPrompt() {
          if (!active) return;
          const newPrompt = getRandomPrompt(promptList, lastPrompt);
          setPrompt(newPrompt);
          setLastPrompt(newPrompt);
          setShow(true);
          timer.current = setTimeout(() => {
            setShow(false);
            timer.current = setTimeout(showPrompt, 2500 + Math.random() * 4000);
          }, 4500);
        }
        showPrompt();
        // Clean up when component unmounts or overridePrompt comes back
        return () => {
          active = false;
          if (timer.current) clearTimeout(timer.current);
        };
      }, 2000);
      // On cleanup, clear pending timeouts
      return () => {
        if (resumeCycleTimeout.current)
          clearTimeout(resumeCycleTimeout.current);
      };
    }
    // eslint-disable-next-line
  }, [promptList.join(','), overridePrompt]);

  // --- NEW: Fire onPromptChange *only* when overridePrompt changes, or when prompt is shown/hidden in cycle mode
  useEffect(() => {
    if (overridePrompt) {
      onPromptChange?.(overridePrompt);
      return;
    }
    if (show && prompt) {
      onPromptChange?.(prompt);
    }
    if (!show && !overridePrompt) {
      const t = setTimeout(() => onPromptChange?.(null), 400);
      return () => clearTimeout(t);
    }
  }, [show, prompt, overridePrompt, onPromptChange]);

  // --- Styling ---
  const bubblePosition =
    align === 'left'
      ? 'left-[-100px] top-[-120px] md:left-[-50px] md:top-[-110px]'
      : ' top-[-90px]  md:top-[-100px]';
  const tailPosition =
    align === 'left' ? 'right-6 md:right-10' : 'left-1/2 -translate-x-1/2';

  // --- Prompt to display ---
  const displayPrompt = overridePrompt ?? prompt;

  return (
    <AnimatePresence>
      {visible && displayPrompt && (
        <motion.div
          key={displayPrompt}
          className={`absolute ${bubblePosition} -top-2 md:-top-4 z-30 pointer-events-none select-none`}
          initial={{ opacity: 0, y: 16, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{
            opacity: { duration: 0.5, delay: 0.1 },
            y: { duration: 0.55, delay: 0.1 },
            scale: { duration: 0.35, delay: 0.1 },
          }}
        >
          <div className='relative'>
            <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl px-6 py-3 shadow-lg text-base font-semibold text-gray-800 dark:text-gray-100 whitespace-pre-line min-w-[210px] text-center'>
              {displayPrompt}
            </div>
            {/* Tail */}
            <div
              className={`flex flex-col items-center absolute ${tailPosition} top-full pt-1`}
            >
              <div className='w-3 h-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full mb-1 shadow-sm'></div>
              <div className='w-2 h-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm'></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

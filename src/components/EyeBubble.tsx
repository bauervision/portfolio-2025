import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const SUGGESTIONS = [
  'How much React experience?',
  'Does he have a formal degree?',
  'What industries has he worked in?',
  'Does he have a military background?',
  'What’s his tech stack?',
  'Can I see a resume download?',
];

function getRandomPrompt(last: string | null) {
  let filtered = SUGGESTIONS.filter((q) => q !== last);
  if (filtered.length === 0) filtered = SUGGESTIONS;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function ThoughtBubble({
  onPromptChange,
}: {
  onPromptChange?: (q: string | null) => void;
}) {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // prompt cycling effect
    let lastPrompt: string | null = null;
    function showPrompt() {
      const newPrompt = getRandomPrompt(lastPrompt);
      setPrompt(newPrompt);
      setVisible(true);
      lastPrompt = newPrompt;

      timer.current = setTimeout(() => {
        setVisible(false);
        timer.current = setTimeout(showPrompt, 2500 + Math.random() * 4000);
      }, 4500);
    }
    timer.current = setTimeout(showPrompt, 7000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    // visible prompt sync effect
    if (visible && prompt) {
      onPromptChange?.(prompt);
    }
    if (!visible) {
      const t = setTimeout(() => onPromptChange?.(null), 400);
      return () => clearTimeout(t);
    }
  }, [visible, prompt, onPromptChange]);

  return (
    <AnimatePresence>
      {visible && prompt && (
        <motion.div
          key={prompt}
          className='absolute -mt-20 md:-mt-5 transform -translate-x-1/2 -top-10 sm:-top-14 md:-top-20 z-30 pointer-events-none select-none'
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.38 }}
        >
          {/* Thought bubble look */}
          <div className='relative'>
            <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl px-6 py-3 shadow-lg text-base font-semibold text-gray-800 dark:text-gray-100 whitespace-pre-line min-w-[210px] text-center'>
              {prompt}
            </div>
            {/* Bubbles below (tail of the thought) */}
            <div className='flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-full pt-1'>
              <div className='w-3 h-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full mb-1 shadow-sm'></div>
              <div className='w-2 h-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm'></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Constants for eye geometry
const EYE_RADIUS = 48;
const IRIS_RADIUS = 18;
const IRIS_TRAVEL = 20;

const getRandomAngle = () => Math.random() * Math.PI * 2;

function getIrisTarget(
  center: { x: number; y: number },
  target: { x: number; y: number }
) {
  const dx = target.x - center.x;
  const dy = target.y - center.y;
  const angle = Math.atan2(dy, dx);
  const dist = Math.min(Math.hypot(dx, dy), IRIS_TRAVEL);
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
}

function getRandomLookOffset() {
  // Random angle, 50% outwards
  const angle = getRandomAngle();
  const dist = IRIS_TRAVEL * (0.4 + Math.random() * 0.6);
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
}

export default function EyeBubble({ onClick }: { onClick?: () => void }) {
  const [irisOffset, setIrisOffset] = useState({ x: 0, y: 0 });
  const [mouseActive, setMouseActive] = useState(false);
  const [lastMouse, setLastMouse] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [lookTimeout, setLookTimeout] = useState<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // Helper: Is mobile?
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  // Eye color for theme
  const irisFill = resolvedTheme === 'dark' ? '#a78bfa' : '#3b82f6'; // purple-400 or blue-500
  const irisStroke = resolvedTheme === 'dark' ? '#7c3aed' : '#1e40af'; // purple-600 or blue-900

  // Mouse tracking for desktop
  useEffect(() => {
    if (isMobile) return;

    let mouseMoveTimeout: NodeJS.Timeout | null = null;

    function handleMouse(e: MouseEvent) {
      if (!ref.current) return;
      setMouseActive(true);
      setLastMouse({ x: e.clientX, y: e.clientY });

      // Compute center
      const rect = ref.current.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      setIrisOffset(getIrisTarget(center, { x: e.clientX, y: e.clientY }));

      // If the mouse hasn't moved for a while, switch to idle mode
      if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => setMouseActive(false), 2500);
    }

    window.addEventListener('mousemove', handleMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
    };
  }, [isMobile]);

  // Idle/randomized gaze when not tracking mouse (or on mobile)
  useEffect(() => {
    if (mouseActive) {
      if (lookTimeout) clearTimeout(lookTimeout);
      return;
    }

    // On desktop, if idle, or on mobile always
    function setRandomGaze() {
      setIrisOffset(getRandomLookOffset());
      setLookTimeout(
        setTimeout(setRandomGaze, 5000 + Math.random() * 2000) // 5-7 seconds
      );
    }

    setRandomGaze();

    return () => {
      if (lookTimeout) clearTimeout(lookTimeout);
    };
    // eslint-disable-next-line
  }, [mouseActive, isMobile]);

  // On mobile, always look straight ahead at first
  useEffect(() => {
    if (!isMobile) return;
    setIrisOffset({ x: 0, y: 0 });
  }, [isMobile]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className='flex items-center justify-center rounded-full shadow-2xl cursor-pointer bubble-shimmer'
      style={{
        width: 128,
        height: 128,
        background: 'transparent',
        position: 'relative',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.38)',
      }}
      title='Ask Bauervision!'
    >
      {/* Eye (SVG) */}
      <svg width={128} height={128} style={{ display: 'block' }}>
        {/* Eyeball background */}
        <ellipse
          cx={64}
          cy={64}
          rx={EYE_RADIUS}
          ry={EYE_RADIUS}
          fill='#fff'
          stroke='#c7d2fe'
          strokeWidth={3}
        />
        {/* Iris */}
        <motion.ellipse
          cx={64 + irisOffset.x}
          cy={64 + irisOffset.y}
          rx={IRIS_RADIUS}
          ry={IRIS_RADIUS}
          fill={irisFill}
          stroke={irisStroke}
          strokeWidth={3}
          animate={{ cx: 64 + irisOffset.x, cy: 64 + irisOffset.y }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        />
        {/* Pupil */}
        <motion.ellipse
          cx={64 + irisOffset.x}
          cy={64 + irisOffset.y}
          rx={IRIS_RADIUS * 0.45}
          ry={IRIS_RADIUS * 0.45}
          fill='#1e293b'
          animate={{ cx: 64 + irisOffset.x, cy: 64 + irisOffset.y }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        />
        {/* Reflection highlight for realism */}
        <motion.ellipse
          cx={64 + irisOffset.x - 6}
          cy={64 + irisOffset.y - 7}
          rx={IRIS_RADIUS * 0.22}
          ry={IRIS_RADIUS * 0.13}
          fill='#fff'
          opacity={0.7}
          animate={{
            cx: 64 + irisOffset.x - 6,
            cy: 64 + irisOffset.y - 7,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        />
      </svg>
    </div>
  );
}

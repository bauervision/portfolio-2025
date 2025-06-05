import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

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
      className='flex items-center justify-center rounded-full shadow-2xl cursor-pointer bubble-shimmer [mix-blend-mode:additive]'
      style={{
        width: 128,
        height: 128,

        position: 'relative',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.8)',
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
          strokeWidth={9}
        />
        {/* Iris */}
        <ellipse
          cx={64 + irisOffset.x}
          cy={64 + irisOffset.y}
          rx={IRIS_RADIUS}
          ry={IRIS_RADIUS}
          fill={irisFill}
          stroke={irisStroke}
          // strokeWidth={3}
        />
        {/* Pupil */}
        <ellipse
          cx={64 + irisOffset.x}
          cy={64 + irisOffset.y}
          rx={IRIS_RADIUS * 0.45}
          ry={IRIS_RADIUS * 0.45}
          fill='#1e293b'
        />
        {/* Reflection highlight for realism */}
        <ellipse
          cx={64 + irisOffset.x - 6}
          cy={64 + irisOffset.y - 7}
          rx={IRIS_RADIUS * 0.22}
          ry={IRIS_RADIUS * 0.13}
          fill='#fff'
          opacity={0.7}
        />
      </svg>
    </div>
  );
}

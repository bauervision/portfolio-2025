// components/NavImageButton.tsx
'use client';

import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface NavImageButtonProps {
  label: string;
  mobile: boolean;
}

export default function NavImageButton({ label, mobile }: NavImageButtonProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Desktop gradients
  const defaultBg = isDark
    ? 'bg-gradient-to-r from-gray-700 to-gray-900'
    : 'bg-gradient-to-r from-blue-500 to-blue-700';
  const overlayBg = isDark ? 'bg-gray-800/80' : 'bg-blue-600/80';

  // Parallax for desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mobile) return; // No parallax on mobile
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    x.set(((offsetX - halfWidth) / halfWidth) * 10);
    y.set(((offsetY - halfHeight) / halfHeight) * 10);
  };

  const handleMouseLeave = () => {
    if (mobile) return;
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/${label.toLowerCase()}`} passHref>
      <motion.button
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
     group relative flex items-center justify-center shadow-2xl overflow-hidden
    w-full min-h-[200px] rounded-2xl text-xl font-bold
    md:w-[200px] md:h-[200px] rounded-l-2xl md:text-lg md:font-semibold    bg-gradient-to-r   focus:outline-none focus:ring-4 focus:ring-fuchsia-500/40 focus:ring-offset-2
  `}
        tabIndex={0}
      >
        {/* Gradient bar on left */}
        <div
          className={`opacity-40 absolute top-0 left-0 h-full w-full z-20 rounded-l-2xl`}
          style={{
            background:
              'linear-gradient(to right, #3b82f6 10%, transparent 100%)',
          }}
        />
        {/* Frosted glass overlay */}
        <div className='absolute inset-0  bg-white/10 z-10' />
        {/* Background image logic */}
        <div
          className={`
            absolute inset-0 bg-cover bg-center transition-opacity duration-500
            ${
              mobile
                ? 'opacity-50 '
                : 'opacity-10 group-hover:opacity-100 scale-110 group-hover:scale-100'
            }
          `}
          style={{
            backgroundImage: `url(/buttons/${label}.jpg)`,
          }}
        />

        {/* Label: always visible on mobile, fades out on hover (desktop) */}
        <span
          className={`
            absolute z-30 transition-all duration-300 select-none
            ${
              mobile
                ? 'left-6 bottom-4 text-left text-white [text-shadow:2px_4px_12px_rgba(0,0,0,1)]  text-xl tracking-wide'
                : 'relative group-hover:opacity-0 z-20'
            }
          `}
        >
          {label}
        </span>
      </motion.button>
    </Link>
  );
}

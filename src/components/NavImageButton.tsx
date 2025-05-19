// components/NavImageButton.tsx
'use client';

import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface NavImageButtonProps {
  label: string;
}

export default function NavImageButton({ label }: NavImageButtonProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Apply gradient background based on theme
  const defaultBg = isDark
    ? 'bg-gradient-to-r from-gray-700 to-gray-900'
    : 'bg-gradient-to-r from-blue-500 to-blue-700';
  const overlayBg = isDark ? 'bg-gray-800/80' : 'bg-blue-600/80';

  // Parallax motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
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
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/${label.toLowerCase()}`} passHref>
      <motion.button
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative w-[200px] h-[200px] flex items-center justify-center text-white text-lg font-semibold rounded-md shadow-md overflow-hidden ${defaultBg}`}
        style={{
          translateX: springX,
          translateY: springY,
        }}
      >
        <div
          className='absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 scale-110 group-hover:opacity-100 group-hover:scale-100'
          style={{
            backgroundImage: `url(/buttons/${label.toLowerCase()}.jpg)`,
          }}
        />
        <div
          className={`absolute inset-0 ${overlayBg} group-hover:bg-transparent transition-colors duration-500 z-10`}
        />
        <span className='relative z-20 transition-opacity duration-300 group-hover:opacity-0'>
          {label}
        </span>
      </motion.button>
    </Link>
  );
}

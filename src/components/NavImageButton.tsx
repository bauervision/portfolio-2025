'use client';

import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

interface NavImageButtonProps {
  label: string;
  mobile: boolean;
  onHover: () => void;
  onUnhover: () => void;
}

export default function NavImageButton({
  label,
  mobile,
  onHover,
  onUnhover,
}: NavImageButtonProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Gradients
  const defaultBg = isDark
    ? 'bg-gradient-to-r from-gray-700 to-gray-900'
    : 'bg-gradient-to-r from-blue-500 to-blue-700';

  // Motion for tilt and translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 16 });
  const springY = useSpring(y, { stiffness: 120, damping: 16 });

  // 3D tilt values
  const rotateX = useSpring(y, { stiffness: 80, damping: 18 }); // y controls X tilt
  const rotateY = useSpring(x, { stiffness: 80, damping: 18 }); // x controls Y tilt

  // Shadow depth (scales up on hover)
  const [hovered, setHovered] = useState(false);

  // Ripple for mobile
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const rippleTimeout = useRef<NodeJS.Timeout | null>(null);

  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mobile) return;
    setHovered(true);
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const percentX = (offsetX / rect.width - 0.5) * 2;
    const percentY = (offsetY / rect.height - 0.5) * 2;
    // max translation/tilt values
    x.set(percentX * 16);
    y.set(percentY * 16);
  };

  const handleMouseEnter = () => {
    if (mobile) return;
    setHovered(true);
    onHover();
  };

  const handleMouseLeave = () => {
    if (mobile) return;
    setHovered(false);
    x.set(0);
    y.set(0);
    onUnhover();
  };

  // Touch ripple effect for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!mobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    setRipple({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    if (rippleTimeout.current) clearTimeout(rippleTimeout.current);
    rippleTimeout.current = setTimeout(() => setRipple(null), 480);
  };

  // Shadow scaling
  const shadow =
    hovered && !mobile
      ? '0 12px 40px 0 rgba(0,0,0,0.35), 0 2px 8px 0 rgba(51,51,60,0.08)'
      : '0 8px 28px 0 rgba(0,0,0,0.22), 0 2px 6px 0 rgba(51,51,60,0.06)';

  return (
    <Link href={`/${label.toLowerCase()}`} passHref>
      <motion.button
        ref={cardRef}
        className={`
          group relative flex items-center justify-center overflow-hidden
          w-full min-h-[200px] rounded-2xl text-xl font-bold
          md:w-[200px] md:h-[200px] rounded-l-2xl md:text-lg md:font-semibold
          focus:outline-none focus:ring-4 focus:ring-fuchsia-500/40 focus:ring-offset-2
          ${defaultBg}
        `}
        tabIndex={0}
        style={
          !mobile
            ? {
                x: springX,
                y: springY,
                rotateX: rotateX, // 3D tilt
                rotateY: rotateY,
                boxShadow: shadow,
                willChange: 'transform, box-shadow',
                transition: 'box-shadow 0.18s cubic-bezier(.5,1.6,.6,1)',
              }
            : { boxShadow: shadow }
        }
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // Mobile ripple
        onTouchStart={handleTouchStart}
        onFocus={onHover}
        onBlur={handleMouseLeave}
        type='button'
      >
        {/* Ripple effect */}
        {mobile && ripple && (
          <span
            className='absolute z-50 pointer-events-none'
            style={{
              top: ripple.y - 32,
              left: ripple.x - 32,
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(140, 140, 255, 0.25)',
              animation: 'ripple-burst 0.48s cubic-bezier(.4,0,1,1)',
            }}
          />
        )}
        {/* Ripple keyframes */}
        <style>
          {`
            @keyframes ripple-burst {
              0% { transform: scale(0); opacity: 0.42; }
              85% { transform: scale(2.5); opacity: 0.28; }
              100% { transform: scale(2.9); opacity: 0; }
            }
          `}
        </style>

        {/* Gradient bar on left */}
        <div
          className={`opacity-40 absolute top-0 left-0 h-full w-full z-20 rounded-l-2xl`}
          style={{
            background:
              'linear-gradient(to right, #3b82f6 10%, transparent 100%)',
          }}
        />
        {/* Frosted glass overlay */}
        <div className='absolute inset-0 bg-white/10 z-10' />
        {/* Background image */}
        <div
          className={`
            absolute inset-0 bg-cover bg-center transition-opacity duration-500
            ${
              mobile
                ? 'opacity-50'
                : 'opacity-10 group-hover:opacity-100 scale-110 group-hover:scale-100'
            }
          `}
          style={{
            backgroundImage: `url(/buttons/${label}.jpg)`,
            pointerEvents: 'none',
          }}
        />
        {/* Label */}
        <span
          className={`
            absolute z-60 transition-all duration-300 select-none
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

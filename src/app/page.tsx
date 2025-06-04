// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import NavImageButton from '../components/NavImageButton';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ChatBotLauncher from '@/components/ChatBotLauncher';

const navSections = ['3D', 'Apps', 'Art', 'Games', 'UX', 'XR'];
const mobileBgColor = '#0a0d1a';

export default function HomePage() {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(true);

  // Framer Motion animated background for desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });
  const backgroundPosition = useTransform(
    [springX, springY],
    ([xVal, yVal]) => `${50 - Number(xVal)}% ${50 - Number(yVal) * 2}%`
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportSize({ width, height: window.innerHeight });
      setIsMobile(width < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ backgroundColor: mobileBgColor, opacity: 0 }}
      animate={{ backgroundColor: 'transparent', opacity: 1 }}
      transition={{ duration: 1.2 }}
      onMouseMove={(e) => {
        if (!isMobile) {
          const { clientX, clientY } = e;
          const { width, height } = viewportSize;
          const offsetX = (clientX / width - 0.5) * 20;
          const offsetY = (clientY / height - 0.5) * 20;
          x.set(offsetX);
          y.set(offsetY);
        }
      }}
      className={`
        min-h-screen w-full flex items-center justify-center
        bg-[#0a0d1a]
        md:bg-[url('/hero-background.jpg')] md:bg-cover md:bg-center md:bg-no-repeat
      `}
      style={{
        backgroundPosition: isMobile ? undefined : (backgroundPosition as any),
        backgroundSize: isMobile ? undefined : '110% 110%',
      }}
    >
      {/* Main content container */}
      <div className='flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-between w-full px-4 py-4 md:max-w-6xl mx-auto'>
        {/* Mobile-only at top */}
        <div className='mt-20 mb-10 block md:hidden w-full justify-center z-30'>
          <ChatBotLauncher />
        </div>

        {/* Left buttons group */}
        <div
          className='
            flex flex-col items-center md:items-start w-full md:w-auto gap-2 md:gap-4 pb-2
          '
        >
          {navSections.slice(0, 3).map((label, index) => (
            <motion.div
              key={label}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
              className='w-full md:w-auto   justify-center md:justify-start'
            >
              <NavImageButton label={label} mobile={isMobile} />
            </motion.div>
          ))}
        </div>

        {/* Chatbot widget */}
        <div className='hidden md:flex w-full justify-center items-center'>
          <ChatBotLauncher />
        </div>

        {/* Right buttons group */}
        <div
          className='
           flex flex-col items-center md:items-start w-full md:w-auto gap-2 md:gap-4
          '
        >
          {navSections.slice(3).map((label, index) => (
            <motion.div
              key={label}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: (index + 3) * 0.2, duration: 0.4 }}
              className='w-full md:w-auto  justify-center md:justify-end'
            >
              <NavImageButton label={label} mobile={isMobile} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

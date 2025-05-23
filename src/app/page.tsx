// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import NavImageButton from '../components/NavImageButton';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const navSections = ['3D', 'Apps', 'Art', 'Games', 'UX', 'XR'];

export default function HomePage() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });
const backgroundPosition = useTransform(
  [springX, springY],
  ([xVal, yVal]) => `${50 - Number(xVal)}% ${50 - Number(yVal) * 2}%`
);

  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () =>
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ backgroundColor: '#000000', opacity: 0 }}
      animate={{ backgroundColor: 'transparent', opacity: 1 }}
      transition={{ duration: 1.2 }}
      onMouseMove={(e) => {
        const { clientX, clientY } = e;
        const { width, height } = viewportSize;
        const offsetX = (clientX / width - 0.5) * 20;
        const offsetY = (clientY / height - 0.5) * 20;
        x.set(offsetX);
        y.set(offsetY);
      }}
    >
      <motion.div
        style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url("/hero-background.jpg")',
          backgroundSize: '110% 110%',
          backgroundPosition,
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1200px',
            px: 4,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {navSections.slice(0, 3).map((label, index) => (
              <motion.div
                key={label}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.4 }}
              >
                 <NavImageButton label={label} />
              </motion.div>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {navSections.slice(3).map((label, index) => (
              <motion.div
                key={label}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: (index + 3) * 0.2, duration: 0.4 }}
              >
                 <NavImageButton label={label} />
              </motion.div>
            ))}
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
}

// components/Navbar.tsx
'use client';

import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from './ClientLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';

const navLinks = ['XR', 'UX', 'Art', 'Apps', 'Websites', 'Apparel', 'Contact'];

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      position='static'
      sx={{
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(to right, #000000, #0f2027)'
            : 'linear-gradient(to right, #3f51b5, #2196f3)',
        borderBottom: '2px solid #0f2027',
      }}
    >
      <Toolbar className='w-full flex justify-between items-center'>
        <Box sx={{ flexGrow: 1 }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link href={'/'}>
              <Typography variant='h6' component='div'>
                BauerVision: Interactive App Design / UX
              </Typography>
            </Link>
          </motion.div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {navLinks.map((label, index) => (
            <motion.div
              key={label}
              style={{ display: 'inline-flex', position: 'relative' }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ color: '#ffffff' }}
            >
              <Button
                color='inherit'
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    height: '2px',
                    width: '100%',
                    backgroundColor: 'white',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease-in-out',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                {label}
              </Button>
            </motion.div>
          ))}
          <motion.div
            style={{ display: 'inline-flex' }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ delay: 0.3 + navLinks.length * 0.1, duration: 0.15 }}
          >
            <IconButton onClick={colorMode.toggleColorMode} color='inherit'>
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

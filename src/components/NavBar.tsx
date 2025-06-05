'use client';

import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from './ClientLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';

const navLinks = ['3D', 'Apps', 'Art', 'Games', 'UX', 'XR'];

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        {/* Logo/Brand */}
        <Box sx={{ flexGrow: 1 }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {isMobile ? (
              <Link href='/' aria-label='Home' tabIndex={0}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    color='inherit'
                    edge='start'
                    sx={{
                      display: { xs: 'inline-flex', md: 'none' }, // Hide on desktop
                      mr: 1,
                    }}
                  >
                    <HomeIcon fontSize='medium' />
                  </IconButton>
                  <Typography variant='h6' component='div'>
                    BauerVision
                  </Typography>
                </Box>
              </Link>
            ) : (
              <Link href={'/'}>
                <Typography variant='h6' component='div'>
                  BauerVision: Interactive App Design / UX
                </Typography>
              </Link>
            )}
          </motion.div>
        </Box>

        {/* Desktop Nav */}
        {!isMobile && (
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
                <Link href={`/${label.toLowerCase()}`} passHref>
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
                </Link>
              </motion.div>
            ))}

            <Link
              href='/contact'
              className='ml-4 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition'
              aria-label='Contact'
            >
              <EmailOutlinedIcon fontSize='medium' />
            </Link>

            <motion.div
              style={{ display: 'inline-flex' }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{
                delay: 0.3 + navLinks.length * 0.1,
                duration: 0.15,
              }}
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
        )}

        {/* Mobile Hamburger Menu */}
        {isMobile && (
          <>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='end'
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='right'
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: {
                  width: '80vw',
                  maxWidth: 320,
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(to right, #151a25, #263556)'
                      : 'linear-gradient(to right, #dde7fa, #9ec5fc)',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  py: 2,
                  px: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography variant='h6' sx={{ mb: 2, textAlign: 'left' }}>
                  BauerVision
                </Typography>
                <List>
                  {navLinks.map((label) => (
                    <ListItem key={label} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={`/${label.toLowerCase()}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <ListItemText primary={label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      href='/contact'
                      onClick={() => setDrawerOpen(false)}
                    >
                      <EmailOutlinedIcon sx={{ mr: 1 }} />
                      <ListItemText primary='Contact' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setDrawerOpen(false);
                        colorMode.toggleColorMode();
                      }}
                    >
                      <ListItemText
                        primary={
                          theme.palette.mode === 'dark'
                            ? 'Light Mode'
                            : 'Dark Mode'
                        }
                      />
                      {theme.palette.mode === 'dark' ? (
                        <Brightness7Icon />
                      ) : (
                        <Brightness4Icon />
                      )}
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

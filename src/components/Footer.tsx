// components/Footer.tsx
'use client';

import Link from 'next/link';
import { FaLinkedin, FaArtstation } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <footer
      className={`${
        isDark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'
      } py-8`}
      role='contentinfo'
    >
      <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
        {/* Company Info */}
        <div className='flex flex-col space-y-2'>
          <h2 className='text-xl font-semibold'>BauerVision</h2>
          <p className='text-sm max-w-md'>
            With over 20 years of professional experience, BauerVision provides
            UX, XR, art, and web development services tailored to your business
            needs.
          </p>
        </div>

        {/* Quick Links */}
        <div className='flex flex-col space-y-2'>
          <h3 className='font-semibold'>Quick Links</h3>
          <Link href='/3d'>3D</Link>
          <Link href='/apps'>Apps</Link>
          <Link href='/art'>Art</Link>
          <Link href='/games'>Games</Link>
          <Link href='/ux'>UX</Link>
          <Link href='/xr'>XR</Link>
        </div>

        {/* Contact Info */}
        <div className='flex flex-col space-y-2'>
          <h3 className='font-semibold'>Contact</h3>
          <a href='mailto:info@bauervision.com' className='hover:underline'>
            info@bauervision.com
          </a>

          <div className='flex space-x-4 pt-2'>
            <Link
              href='https://www.linkedin.com/in/mikecbauer/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-blue-400'
            >
              <FaLinkedin size={24} />
            </Link>
            <Link
              href='https://www.artstation.com/mikebauer'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-blue-400'
            >
              <FaArtstation size={24} />
            </Link>
          </div>
        </div>
      </div>

      <div className='mt-8 text-center text-sm'>
        <p>
          &copy; {new Date().getFullYear()} BauerVision. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

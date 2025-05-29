// components/ProjectPageTemplate.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { useTheme } from '@mui/material/styles';

interface ProjectPageTemplateProps {
  title: string;
  description?: string;

  images: {
    src: string;
    width: number;
    height: number;
    title?: string;
    description?: string;
    url?: string;
  }[];
  allSlugs: string[];
}

export default function ProjectPageTemplate({
  title,
  description,
  images,
  allSlugs,
}: ProjectPageTemplateProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const path = usePathname() || '/';
  const slug = path.split('/').pop() || '';
  const idx = allSlugs.indexOf(slug);
  const prevSlug = allSlugs[(idx + allSlugs.length - 1) % allSlugs.length];
  const nextSlug = allSlugs[(idx + 1) % allSlugs.length];

  const slides = images.map((img) => ({
    src: img.src,
    width: img.width,
    height: img.height,
    title: img.title,
    description: img.description,
    url: img.url,
  }));

  return (
    <main
      className={`min-h-screen flex flex-col ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Top navigation */}
      <div className='flex items-center justify-between py-8 px-4'>
        <Link href={`/${prevSlug}`} className='text-blue-500 hover:underline'>
          ← {prevSlug.toUpperCase()}
        </Link>
        <div className='text-center'>
          <h1 className='text-4xl font-bold'>{title}</h1>
          {description && (
            <p className='mt-2 text-lg text-blue-700 dark:text-gray-500 p-5'>
              {description}
            </p>
          )}
        </div>
        <Link href={`/${nextSlug}`} className='text-blue-500 hover:underline'>
          {nextSlug.toUpperCase()} →
        </Link>
      </div>

      {/* Photo gallery grid with parallax thumbnails */}
      <div className='flex-grow px-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {images.map((photo, i) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            const springX = useSpring(x, { stiffness: 100, damping: 20 });
            const springY = useSpring(y, { stiffness: 100, damping: 20 });
            const containerRef = useRef<HTMLDivElement>(null);

            const handleMouseMove = (e: React.MouseEvent) => {
              const rect = containerRef.current?.getBoundingClientRect();
              if (!rect) return;
              const offsetX = e.clientX - rect.left;
              const offsetY = e.clientY - rect.top;
              const halfW = rect.width / 2;
              const halfH = rect.height / 2;
              x.set(((offsetX - halfW) / halfW) * 5);
              y.set(((offsetY - halfH) / halfH) * 5);
            };

            const handleMouseLeave = () => {
              x.set(0);
              y.set(0);
            };

            return (
              <motion.div
                key={photo.src}
                ref={containerRef}
                className='relative group cursor-pointer overflow-hidden border-slate-500 border-4'
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ translateX: springX, translateY: springY }}
                onClick={() => {
                  if (photo.url) {
                    window.open(photo.url, '_blank', 'noopener,noreferrer');
                  } else {
                    setIndex(i);
                    setOpen(true);
                  }
                }}
              >
                <img
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.title || ''}
                  className='w-full h-auto object-cover'
                />
                <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-end justify-center text-white p-2 transition-opacity duration-300'>
                  <p className='text-center text-sm'>{photo.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox with captions */}
      {open && (
        <Lightbox
          slides={slides}
          open={open}
          index={index}
          close={() => setOpen(false)}
          plugins={[Captions]}
          styles={{
            container: { justifyContent: 'center', alignItems: 'center' },
            slide: { width: '80vw', height: 'auto', maxHeight: '80vh' },
          }}
        />
      )}

      {/* Bottom navigation */}
      <div className='flex items-center justify-between py-8 px-4'>
        <Link href={`/${prevSlug}`} className='text-blue-500 hover:underline'>
          ← {prevSlug.toUpperCase()}
        </Link>
        <Link href={`/${nextSlug}`} className='text-blue-500 hover:underline'>
          {nextSlug.toUpperCase()} →
        </Link>
      </div>
    </main>
  );
}

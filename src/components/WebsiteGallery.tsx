'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import MiniChatBotLauncher from './MiniChatBotLauncher';

export interface Website {
  title: string;
  description?: string;
  image: string;
  url: string;
}

interface WebsiteGalleryProps {
  sites: Website[];
  sectionTitle?: string;
  description?: string;
  allSlugs: string[];
}

export default function WebsiteGallery({
  sites,
  sectionTitle = 'Website Projects',
  description,
  allSlugs,
}: WebsiteGalleryProps) {
  const [index, setIndex] = useState(0);
  const path = usePathname() || '/';
  const slug = path.split('/').pop() || '';
  const idx = allSlugs.indexOf(slug);
  const prevSlug = allSlugs[(idx + allSlugs.length - 1) % allSlugs.length];
  const nextSlug = allSlugs[(idx + 1) % allSlugs.length];

  return (
    <section className='min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-8 px-4'>
      {/* Top navigation */}
      <div className='flex items-center justify-between py-8 px-4'>
        <Link href={`/${prevSlug}`} className='text-blue-500 hover:underline'>
          ← {prevSlug.toUpperCase()}
        </Link>
        <div className='text-center'>
          <h1 className='text-4xl font-bold'>{sectionTitle}</h1>
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
      <div className='w-full flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sites.map((site) => {
            // Parallax hover effect
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            const springX = useSpring(x, { stiffness: 100, damping: 20 });
            const springY = useSpring(y, { stiffness: 100, damping: 20 });
            const containerRef = useRef<HTMLAnchorElement>(null);

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
              <motion.a
                key={site.title}
                ref={containerRef}
                href={site.url}
                target='_blank'
                rel='noopener noreferrer'
                className='relative group cursor-pointer rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 transition-transform border-slate-500 border-4'
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  translateX: springX,
                  translateY: springY,
                  display: 'block',
                  minHeight: '230px',
                }}
              >
                <img
                  src={site.image}
                  alt={site.title}
                  className='w-full h-56 object-cover'
                />
                <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-opacity duration-300'>
                  <h2 className='text-xl font-bold'>{site.title}</h2>
                  {site.description && (
                    <p className='text-sm mt-1'>{site.description}</p>
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className='flex items-center justify-between py-8 px-4'>
        <Link href={`/${prevSlug}`} className='text-blue-500 hover:underline'>
          ← {prevSlug.toUpperCase()}
        </Link>
        <Link href={`/${nextSlug}`} className='text-blue-500 hover:underline'>
          {nextSlug.toUpperCase()} →
        </Link>
      </div>

      <MiniChatBotLauncher />
    </section>
  );
}

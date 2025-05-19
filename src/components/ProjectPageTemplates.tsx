'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

interface ProjectPageTemplateProps {
  title: string;
  images: {
    src: string;
    width: number;
    height: number;
    title?: string;
    description?: string;
  }[];
  allSlugs: string[];
}

export default function ProjectPageTemplate({
  title,
  images,
  allSlugs,
}: ProjectPageTemplateProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const path = usePathname() || '/';
  const slug = path.split('/').pop() || '';
  const idx = allSlugs.indexOf(slug);
  const prevSlug = allSlugs[(idx + allSlugs.length - 1) % allSlugs.length];
  const nextSlug = allSlugs[(idx + 1) % allSlugs.length];

  // Map images to slides with captions
  const slides = images.map((img) => ({
    src: img.src,
    width: img.width,
    height: img.height,
    title: img.title,
    description: img.description,
  }));

  return (
    <main className='min-h-screen flex flex-col'>
      {/* Prev / Next navigation */}
      <div className='flex items-center justify-between py-8 px-4'>
        <Link href={`/${prevSlug}`} className='text-blue-500 hover:underline'>
          ← {prevSlug.toUpperCase()}
        </Link>
        <Link href={`/${nextSlug}`} className='text-blue-500 hover:underline'>
          {nextSlug.toUpperCase()} →
        </Link>
      </div>

      {/* Photo gallery grid */}
      <div className='flex-grow px-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
          {images.map((photo, i) => (
            <div
              key={photo.src}
              className='relative group cursor-pointer'
              onClick={() => {
                setIndex(i);
                setOpen(true);
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
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox with captions plugin */}
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

      {/* Prev / Next navigation */}
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

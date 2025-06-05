'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export interface Website {
  title: string;
  description?: string;
  image: string;
  url: string;
}

export default function WebsiteGallery() {
  const myWebsites = [
    {
      title: 'AccessAi',
      description: 'Web page to examine accessibility of any given website',
      image: '/sites/accessai.jpg',
      url: 'https://accesai.web.app/',
    },
    {
      title: 'Logistics Planet',
      description:
        'Design prototype for a logistics order tracking application',
      image: '/sites/logistics-planet.jpg',
      url: 'https://logistics-planet.web.app/',
    },
    {
      title: 'Fretboard Modes',
      description:
        'A fundamental approach to learning modes of the guitar in an easy, and intuitive way',
      image: '/sites/fretboard.jpg',
      url: 'https://fretboard-modes.web.app',
    },
    {
      title: 'Preschool Patch',
      description: 'Created a website for my wifes business',
      image: '/sites/preschool-patch.jpg',
      url: 'https://preschool-patch.web.app/',
    },
  ];

  return (
    <section className='mb-4 flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-2 px-4 '>
      <h2 className='p-8 text-center text-3xl font-bold'>Active Websites</h2>
      <div className='w-full flex  justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {myWebsites.map((site) => {
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
    </section>
  );
}

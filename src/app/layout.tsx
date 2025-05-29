import './globals.css';
import { ReactNode } from 'react';
import ClientLayout from '../components/ClientLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mike C. Bauer Portfolio | Bauervision',
  description:
    'The UX & XR portfolio of Mike Bauer, modern design and dev for real world projects.',
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  // Optional: OpenGraph & SEO meta tags
  openGraph: {
    title: 'Mike Bauer Portfolio | Bauervision',
    description: 'Explore modern UX, XR, and web projects by Mike Bauer.',
    url: 'https://bauervision.com',
    siteName: 'Bauervision',
    images: [
      {
        url: '/preview.png', // Place your preview image in /public
        width: 1200,
        height: 630,
        alt: 'Bauervision portfolio preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico', // Make sure you have favicon.ico in /public
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='min-h-screen flex flex-col overflow-x-hidden'>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

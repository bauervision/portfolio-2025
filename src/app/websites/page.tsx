'use client';
import WebsiteGallery from '@/components/WebsiteGallery';
import { allSlugs } from '@/constants';

export default function WebsitesPage() {
  const myWebsites = [
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

  const description =
    'These are just a few of the websites I have developed in the past that I was able to rebuild and publish. They might not have all of the functionality--mainly they are not tied to a database anymore, but the layout is there, and you can see how i approached the UX. Fretboard Mode Explorer is a new project I am working on to help my boys learn the guitar';
  return (
    <WebsiteGallery
      allSlugs={allSlugs}
      sites={myWebsites}
      sectionTitle='Websites'
      description={description}
    />
  );
}

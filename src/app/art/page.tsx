'use client';
import ProjectPageTemplate from '@/components/ProjectPageTemplates';

const imagesArt = [
  {
    src: '/Art/Fine_1.jpg',
    width: 1815,
    height: 936,
    title: 'Bennetts Creek, Acrylic 2016',
    description:
      'This painting was from a photo I took from one of my favorite spots to take the kids, Bennetts Creek in Suffolk, VA. Took about a week to finish.',
  },
  {
    src: '/Art/Fine_2.jpg',
    width: 1815,
    height: 936,
    title: 'Nags Head, 2016',
    description:
      'Another acrylic painting from one of my brief painting phases. This was from a reference image I found online that just looked fun to paint.  I ended up selling it for like $50.',
  },
  {
    src: '/Art/Fine_3.jpg',
    width: 1815,
    height: 936,
    title: 'Floating, 2015',
    description: 'One of my favorite paintings.',
  },
  {
    src: '/Art/Fine_6.jpg',
    width: 1815,
    height: 936,
    title: 'Becoming, 2016',
    description:
      'A fun wave from Hatteras, NC. Honestly, not sure where this one went to...i guess I sold it...?',
  },
  {
    src: '/Art/Fine_7.jpg',
    width: 1815,
    height: 936,
    title: 'Creek Afternoon, 2016',
    description:
      'This is another angle of Bennetts Creek, one that looked South toward the bridge. I however, removed the bridge, as I felt it was better without the modern day addition.',
  },
  {
    src: '/Art/Fine_8.jpg',
    width: 1815,
    height: 936,
    title: 'Oncoming, 2014',
    description:
      'One of my largest acrylics to date, and one of my top 3 favorites. This one took about 2 weeks to complete.',
  },
];
const allSlugs = ['3d', 'apps', 'art', 'games', 'ux', 'xr'];
const description =
  'Every now and then I need to create something that actually exists in this world, and is not only present in binary code.  I have been an artist my whole life and I really love painting, and drawing. Unfortunately the mood to do so only hits me occasionally';

export default function ArtPage() {
  return (
    <ProjectPageTemplate
      title='Art Projects'
      description={description}
      images={imagesArt}
      allSlugs={allSlugs}
    />
  );
}

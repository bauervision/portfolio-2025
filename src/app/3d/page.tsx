'use client';

import ProjectPageTemplate from '@/components/ProjectPageTemplates';

// Replace these with your actual image metadata
const images = [
  {
    src: '/3D/elementary.jpg',
    width: 1815,
    height: 936,
    title: 'Unreal Development Kit (UDK), circa 2013',
    description:
      'This level was created as a part of a law enforcement immersive training simulation where officers had to respond to an active shooter in an elementary school',
  },
  {
    src: '/3D/gym.jpg',
    width: 1815,
    height: 936,
    title: 'Unreal Development Kit (UDK), circa 2013',
    description: 'Another image from the active shooter training simulation',
  },
  {
    src: '/3D/jungle.jpg',
    width: 1815,
    height: 936,
    title: 'Unreal Engine 4, circa 2014',
    description:
      'This was an image created as a part of a conceptual design for an animated short',
  },
  {
    src: '/3D/morning.jpg',
    width: 1815,
    height: 936,
    title: 'Unity, circa 2014',
    description:
      'Another conceptual image for the animated short experimenting with a different engine',
  },
  {
    src: '/3D/Saudi1.jpg',
    width: 1815,
    height: 936,
    title: 'Unreal Engine 4, circa 2015',
    description:
      'We were exploring Unreal engines realtime rendering for early VR use, laying out a Saudi college for pre-viz',
  },
  {
    src: '/3D/Saudi2.jpg',
    width: 1815,
    height: 936,
    title: 'Unreal Engine 4, circa 2015',
    description: 'Another view of the final design of the college',
  },
  {
    src: '/3D/sunrise.jpg',
    width: 1815,
    height: 936,
    title: 'Unity, circa 2015',
    description:
      'Experimenting with geospatial terrain rendering, and atomospheric effects',
  },
  {
    src: '/3D/trailerpark.jpg',
    width: 1815,
    height: 936,
    title: 'UDK, circa 2013',
    description:
      'This level was created as a part of a law enforcement immersive training simulation where officers had to respond to domestic violence calls',
  },
  {
    src: '/3D/warehouse.jpg',
    width: 1815,
    height: 936,
    title: 'UDK, circa 2013',
    description:
      'This was the "final" level in the training simulation where officers had to navigate a lot of shoot-no-shoot situations',
  },
];

const allSlugs = ['3d', 'apps', 'art', 'games', 'ux', 'xr'];
const description =
  'These images are from my work at Northrop Grumman between the years of 2012 and 2016 where I was the Lead Game Developer working on an internal project called the VIPE Holodeck.  This was a 360 degree immersive training simulator that used the Microsoft Kinect, Laser Shot, and 8 projectors to create a fully interactive, hands-free and headset-free, environment';

export default function ThreeDPage() {
  return (
    <ProjectPageTemplate
      title='3D Projects'
      description={description}
      images={images}
      allSlugs={allSlugs}
    />
  );
}

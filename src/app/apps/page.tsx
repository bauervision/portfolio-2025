'use client';

import ProjectPageTemplate from '@/components/ProjectPageTemplates';
import { allSlugs } from '@/constants';

const imagesApps = [
  {
    src: '/Apps/FindARscreenshot.jpg',
    width: 763,
    height: 308,
    title: 'FindAR, Google Play App 2023',
    description:
      'This app allowed you to place position markers on a map, and then using your camera phone to see in augmented reality, where that position is located from where you are standing, and how far away it is.',
  },
  {
    src: '/Apps/TabataScreenshot.jpg',
    width: 763,
    height: 308,
    title: 'Tabata Workout, Google Play App 2023',
    description:
      'I needed a Tabata ap that would let me track rounds, active time on & active time off, fo rmy personal workouts. There were a large number of apps that did similiar things, but I wanted something with the ads so I made one.',
  },
  {
    src: '/Apps/workout.jpg',
    width: 763,
    height: 308,
    title: 'Workout Planner, Google Play App 2023',
    description:
      'Another app created from a personal need for organizing my morning workouts better. This generates workouts based on mucle groups',
  },
];

const description =
  'I released these apps on the Google Play store a few years ago as 100% free apps, but recently took them all down as I am revamping my entire store to now account for a wider library of apps that I am planning on releasing. ';

export default function AppsPage() {
  return (
    <ProjectPageTemplate
      title='App Projects'
      description={description}
      images={imagesApps}
      allSlugs={allSlugs}
    />
  );
}

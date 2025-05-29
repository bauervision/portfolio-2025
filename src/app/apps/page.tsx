'use client';

import ProjectPageTemplate from '@/components/ProjectPageTemplates';
import { allSlugs } from '@/constants';

const imagesApps = [
  {
    src: '/sites/leaveweb.jpg',
    width: 1815,
    height: 936,
    title: 'LeaveWeb Mobile',
    description: '',
    url: 'https://leaveweb.web.app/',
  },
  {
    src: '/Apps/TabataScreenshot.jpg',
    width: 763,
    height: 308,
    title: 'Tabata Workout, Google Play App 2023',
    description: '',
    url: 'https://tabata-trainer-mobile.web.app/',
  },
  {
    src: '/Apps/workout.jpg',
    width: 763,
    height: 308,
    title: 'Workout Planner, Google Play App 2023',
    description: '',
    url: 'https://workout-plan-mobile.web.app/',
  },
  {
    src: '/sites/nextgen.jpg',
    width: 763,
    height: 308,
    title: 'Next Gen Terrain App',
    description: '',
    url: 'https://next-gen-terrain.web.app/',
  },
  {
    src: '/sites/vrsoldier.jpg',
    width: 763,
    height: 308,
    title: 'VR Solider Equipment Load',
    description: '',
    url: 'https://vr-soldier.web.app/',
  },
];

const description =
  'Some of these apps were on the Google Play store a few years ago as 100% free apps, but recently took them all down as I am revamping my entire store to now account for a wider library of apps that I am planning on releasing. The other apps are either projects I am still working on, or past projects that I can now show';

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

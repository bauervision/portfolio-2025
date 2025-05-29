'use client';
import ProjectPageTemplate from '@/components/ProjectPageTemplates';
import { allSlugs } from '@/constants';

const imagesUX = [
  {
    src: '/sites/leavewebfigma.jpg',
    width: 1815,
    height: 936,
    title: 'LeaveWeb: Figma file',
    description: '',
    url: 'https://www.figma.com/design/QI4dosJeLMvi4yXQzRKOnE/Leave-Web-Mobile?node-id=0-1&p=f',
  },
  {
    src: '/UX/UX1.JPG',
    width: 1815,
    height: 936,
    title: 'Snakehead: Landing Screen',
    description: 'Description for UX Project 1',
  },
  {
    src: '/UX/UX2.JPG',
    width: 1815,
    height: 936,
    title: 'Snakehead: Mission Select',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX3.JPG',
    width: 1815,
    height: 936,
    title: 'Snakehead: Mission Confirmation',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX4.JPG',
    width: 1815,
    height: 936,
    title: 'Snakehead: Main App UI',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX5.JPG',
    width: 1815,
    height: 936,
    title: 'Snakehead: Mission Asset Controller',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX6.PNG',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: Car Inspection Trainer',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX7.PNG',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: STEM Presentation, 2015',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX8.PNG',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: Main UI',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX9.PNG',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: James Webb Space Telescope Visualization',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX10.PNG',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: Global Hawk Animation Menu',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX11.PNG',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: Car Inspection Trainer',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX12.PNG',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: Global Hawk Main Menu',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX13.PNG',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: JWST Navigation Menu',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX14.jpg',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: JWST Deploy Screen',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX15.jpg',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: Electronic Warfare Visualization',
    description: 'Description for UX Project 2',
  },
  {
    src: '/UX/UX16.jpg',
    width: 1815,
    height: 936,
    title: 'VIPE HOLODECK: Electronic Warfare Visualization Main Menu',
    description: 'Description for UX Project 2',
  },
];

const description =
  'For the vast majority of my career I have been focused on creating pleasing and intuitive UX for every app I have ever been a part of designing.  I consider myself a UX first developer, and while the examples below do not represent all of my UI designs, these are the ones I was able to release publicly.  Also, any static images presented here are projects that have been lost to time that I only have select screenshots to share.';

export default function UXPage() {
  return (
    <ProjectPageTemplate
      title='UX Projects'
      description={description}
      images={imagesUX}
      allSlugs={allSlugs}
    />
  );
}

'use client';
import ProjectPageTemplate from '@/components/ProjectPageTemplates';

const imagesXR = [
  {
    src: '/XR/XR1.PNG',
    width: 1815,
    height: 936,
    title: 'XR Medical Trainer Environment: Day',
    description:
      'This environment was present within a VR scenario creation app that allowed users to create fully interactive training simulations without writing any code. We pulled from our extensive library of assets to populate a wide range of options for the user who was then able to layout interactions and objectives as they required.',
  },
  {
    src: '/XR/XR2.PNG',
    width: 1815,
    height: 936,
    title: 'XR Medical Trainer Environment: Night',
    description:
      'Another example of the same scene but with the night time lighting applied to offer more variety within each basic environment',
  },
  {
    src: '/XR/XR3.PNG',
    width: 1815,
    height: 936,
    title: 'Military Base: Day - Location 1',
    description:
      'These military scenes were the backdrop of interactive missions that showed how the system could load a variety of environments, and dynamically place data driven interactions all at runtime.',
  },
  {
    src: '/XR/XR4.PNG',
    width: 1815,
    height: 936,
    title: 'Military Base: Night - Location 1',
    description:
      'The night scenes in this system were not dynamic, but completely lit from HDRI imagery.',
  },
  {
    src: '/XR/XR5.PNG',
    width: 1815,
    height: 936,
    title: 'Military Base: Day - Location 2',
    description:
      'By offering customers the ability to customize where the player spawned in these environments, we allowed for multiple use case scenarios thereby extending the use of single environments.',
  },
  {
    src: '/XR/XR6.PNG',
    width: 1815,
    height: 936,
    title: 'Military Base: Night - Location 2',
    description:
      'This scene actually was very fun, but challenging to light correctly. HDRI plus what seemed like multiple pmni lights, but there is an engine limitation for how many real time light you can have, so I needed to do a little trickery to make it look like this.',
  },
  {
    src: '/XR/XR7.PNG',
    width: 1815,
    height: 936,
    title: 'Military Base: Day- Location 3',
    description:
      'Just highlighting how different starting points make it seem like completely different scenes.',
  },
  {
    src: '/XR/XR8.PNG',
    width: 1815,
    height: 936,
    title: 'Military Base: Night - Location 3',
    description:
      'This night time scene had only 1 light illuminating the environment, which made for a nice visual difference in the other scenes, and offered wonderful story telling opportunities and various objective alternatives.',
  },
  {
    src: '/XR/XR9.PNG',
    width: 1815,
    height: 936,
    title: 'Military Base: Day- Location 4',
    description:
      'This was easily the most used scene by the users. I believe it lent itself well to a wide variety of military training objectives',
  },
  {
    src: '/XR/XR10.PNG',
    width: 1815,
    height: 936,
    title: 'Military Base: Twilight- Location 4',
    description:
      'Only lit by HDRi again, this scene was beautiful inside the Oculus',
  },
  {
    src: '/XR/XR11.PNG',
    width: 1815,
    height: 936,
    title: 'Escape Room',
    description:
      'This was the very first scene where we attempted to handle full runtime objective creation.  The user was able to completely customize the objectives of the entire experience from a single dialog that prompted the user for decisions, we then connected all the dots under the hood and without needing to do anything other than run the app, experience the escape room from beginning to end. It was probably one of the most challenging and fun apps to date for me',
  },
];
const allSlugs = ['3d', 'apps', 'art', 'games', 'ux', 'xr'];
const description =
  'For the vast majority of my career I have been focused on creating pleasing and intuitive UX for every app I have ever been a part of designing.  I consider myself a UX first developer, and while the examples below do not represent all of my UI designs, these are the ones I was able to release publicly.';

export default function XRPage() {
  return (
    <ProjectPageTemplate
      title='XR Projects'
      description={description}
      images={imagesXR}
      allSlugs={allSlugs}
    />
  );
}

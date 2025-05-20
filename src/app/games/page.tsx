'use client';
import ProjectPageTemplate from '@/components/ProjectPageTemplates';

const imagesGames = [
  {
    src: '/Games/Forest.jpg',
    width: 1815,
    height: 936,
    title: 'ForestVision, Unity Asset Store product',
    description:
      'Forestvision is a product I sold for a while on the Unity Asset store. I have since made it free to use for anyone. This was a screenshot of one of the demo scenes that I shipped with the product',
  },
  {
    src: '/Games/Galo1.png',
    width: 1815,
    height: 936,
    title: 'Tutorial Level, Galo Islands, Unity',
    description:
      'Tutorial stage for my first game Galo Islands. Designed first for mobile, after release I will create the desktop version',
  },

  {
    src: '/Games/Galo2.png',
    width: 1815,
    height: 936,
    title: 'Tutorial Level',
    description:
      'Showing the UX for how I communicate to the players in game about what is available to them and how to use different features.',
  },

  {
    src: '/Games/Galo3.png',
    width: 1815,
    height: 936,
    title: 'Isle of Noob',
    description:
      'Just showing off some of the level design work for this level. Those bridges can fall if you stand on them too long.',
  },

  {
    src: '/Games/Galo4.png',
    width: 1815,
    height: 936,
    title: 'Isle of Noob',
    description:
      'Another view from the players perspective as they navigate through the tops of the trees, as I lead them towards different features and obstacles they must learn about.',
  },

  {
    src: '/Games/Galo5.png',
    width: 1815,
    height: 936,
    title: 'Mount Ego',
    description:
      'One of the first really big levels of the game, Mount Ego. This level is the first real test for the player to see how well they understand the mechanics of the game',
  },

  {
    src: '/Games/Galo6.png',
    width: 1815,
    height: 936,
    title: 'Mount Ego',
    description:
      'An interior shot that shows some of the puzzle elements that must be figured out to successfully clear the level',
  },

  {
    src: '/Games/Galo7.png',
    width: 1815,
    height: 936,
    title: 'Mount Ego',
    description:
      'POV shot as the player enters through the back entrance of the mountain temple. These doors can be busted through if you have the right player selected...',
  },

  {
    src: '/Games/Galo8.png',
    width: 1815,
    height: 936,
    title: 'Mount Ego',
    description:
      'Exterior shot showcasing the Zip line running from the top of the mountain.',
  },

  {
    src: '/Games/Galo9.png',
    width: 1815,
    height: 936,
    title: 'Frigid Forest',
    description:
      'The snow level in the game. Things are little more hidden here as there are just tons of places to look. There was a lot of challenges maintaining a frame rate in this level, so it required some unique approaches to the level design',
  },

  {
    src: '/Games/Galo10.png',
    width: 1815,
    height: 936,
    title: 'Frigid Forest',
    description:
      'Showcasing some of the highly optimized geometry and level design for this mobile performant game. I wrote very simple and efficient shaders to maintain high frame rates, while still adding the snow to the entire level.',
  },

  {
    src: '/Games/Galo11.png',
    width: 1815,
    height: 936,
    title: 'Frigid Forest',
    description:
      'Another level design shot showing one of the obstacles the player must traverse to accomplish specific tasks.',
  },

  {
    src: '/Games/Galo12.png',
    width: 1815,
    height: 936,
    title: 'Final Level',
    description:
      'Environment for the final challenging level of the game. Here you see in the foreground the Night Portal which allows the player to easily traverse between day and night within the game to accomplish tasks.',
  },

  {
    src: '/Games/Galo13.png',
    width: 1815,
    height: 936,
    title: 'Final Level',
    description:
      'Exterior shot showing one of the key entrances to the underground caverns of the level.',
  },

  {
    src: '/Games/Galo14.png',
    width: 1815,
    height: 936,
    title: 'Final Level',
    description:
      'Heading deep undergound, the player makes their way into the belly of the island.',
  },

  {
    src: '/Games/Galo15.png',
    width: 1815,
    height: 936,
    title: 'Final Level',
    description:
      'Here you can see how the ceiling of the cavern lifts high above the player introducing new climbing challenges.',
  },

  {
    src: '/Games/Galo16.png',
    width: 1815,
    height: 936,
    title: 'Final Level',
    description:
      'Another perspective shot of what the player experiences as they navigate deeper into the cave',
  },

  {
    src: '/Games/Galo17.png',
    width: 1815,
    height: 936,
    title: 'Final Level',
    description:
      'This part of cave has a hidden entrance that can be easily missed if you run through here too fast',
  },

  {
    src: '/Games/Galo18.png',
    width: 1815,
    height: 936,
    title: 'Final level',
    description:
      'Interior shot of the cave where the player finds the Heart of Island, and important piece of solving each islands puzzle',
  },

  {
    src: '/Games/Galo19.png',
    width: 1815,
    height: 936,
    title: 'Final level',
    description:
      'One of the final challenges for the player, but very well hidden. Only the most aware players will find this location',
  },
];
const allSlugs = ['3d', 'apps', 'art', 'games', 'ux', 'xr'];
const description =
  'About 5 years ago I started developing a game with my boys. They have since moved on from it, but I am determined to finish it and release it.  This game is called Galo Islands, and is a fun adventure game designed for mobile devices.';

export default function GamesPage() {
  return (
    <ProjectPageTemplate
      title='Game Projects'
      description={description}
      images={imagesGames}
      allSlugs={allSlugs}
    />
  );
}

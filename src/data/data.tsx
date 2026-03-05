import {
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import heroImage from '../images/header-background.webp';
import profilepic from '../images/profilepic.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Kasey | Resume Portfolio',
  description: 'Portfolio featuring software, game development, and creative work.',
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `I'm Kasey`,
  description: (<></>
  ),
  actions: [
    {
      href: '/assets/resume.html',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description:
    'My name is Kasey Lightheart. I am a graduate of Brigham Young University with a Bachelor\'s degree in Computer Science and 4 years of coding experience. I am also a proud husband to my beautiful wife, and father to my cute 9-month old son. I am proficient in building full stack web applications (React, Typescript) with modern frontend frameworks and cloud databases (Firebase, MongoDB, AWS). Skilled in leveraging AI tools (ChatGPT, GitHub Copilot) to write and debug code efficiently. Passionate about creating story driven experiences, such as game development in Unreal Engine 5, and making websites and web-based games. I am a hard worker and a quick learner with leadership, teaching, and office experience',
  aboutItems: [
    {label: 'What I Build', text: 'Visually appealing websites, fun web-based games, Unreal Engine 5 projects, Minecraft mods', Icon: MapIcon},
    {label: 'How I Work', text: 'I can work well independently or as part of a team, and am really good at following through on commmitments and showing up when I am needed.', Icon: FlagIcon},
    {label: 'Collaboration', text: 'Comfortable leading teams and teaching others, but also a helpful team member and quick learner', Icon: BuildingOffice2Icon},
    {label: 'Availability', text: 'I am open to internships, freelance projects, and full-time opportunities, and can commit to long-term projects as well.', Icon: CalendarIcon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Programming languages',
    skills: [
      {
        name: 'JavaScript',
        level: 9,
      },
      {
        name: 'TypeScript',
        level: 8,
      },
      {
        name: 'Java',
        level: 7,
      },
      {
        name: 'C++',
        level: 7,
      },
      {
        name: 'Python',
        level: 6,
      },
      {
        name: 'SQL',
        level: 6,
      },
    ],
  },
  {
    name: 'Web development',
    skills: [
      {
        name: 'React',
        level: 9,
      },
      {
        name: 'Tailwind CSS',
        level: 8,
      },
      {
        name: 'HTML5 & CSS3',
        level: 8,
      },
      {
        name: 'Netlify',
        level: 7,
      },
      {
        name: 'Firebase/Aws/MongoDB)',
        level: 6,
      }
    ],
  },
  {
    name: 'Game development',
    skills: [
      {
        name: 'Minecraft Modding (Java)',
        level: 8,
      },
      {
        name: 'C++ gameplay systems',
        level: 7,
      },
       {
        name: 'Unreal Engine 5',
        level: 6,
      },
      {
        name: 'Blender',
        level: 5,
      },
      {
        name: 'Houdini',
        level: 5,
      },
      {
        name: 'Maya',
        level: 4,
      },
    ],
  },
  {
    name: 'Software & workflow tools',
    skills: [
      {
        name: 'AI-assisted workflows',
        level: 9,
      },
      {
        name: 'Git & GitHub',
        level: 8,
      },
       {
        name: 'Microsoft Office/365 Products',
        level: 8,
      },
      {
        name: 'VS Code',
        level: 8,
      },
      {
        name: 'Canva & CapCut',
        level: 6,
      },
      {
        name: 'Figma',
        level: 6,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    category: 'Web-Based Games',
    title: 'StoryGoRound | Personal Project',
    description:
      'Turn-based web app (soon to be mobile app as well) for collaborative storytelling with friends and families based on a game we often play as a family tradition. Built with React Native + Expo and integrated Firebase (Auth + Firestore), still in development but play tested by family who love it.',
    url: 'https://storygoround.netlify.app/',
    videoSources: [
      '/assets/storygoround-part-000.mp4',
      '/assets/storygoround-part-001.mp4',
      '/assets/storygoround-part-002.mp4',
      '/assets/storygoround-part-003.mp4',
      '/assets/storygoround-part-004.mp4',
      '/assets/storygoround-part-005.mp4',
      '/assets/storygoround-part-006.mp4',
      '/assets/storygoround-part-007.mp4',
    ],
    iframeSrc: 'https://www.youtube.com/embed/LXEPIb143CQ',
  },
  {
    category: 'Web-Based Games',
    title: 'FlappyApple | Personal Project',
    description:
      'A web-based flappy bird type game based off of the characters and environment of my wife\'s graphic novel Rankless, built with html, css and javascript, using Supabase for backend data storage and authentication, and deployed with netlify. The game features multiple levels, characters you discover as you get farther, and a global leaderboard. This has been heavily play tested by fans and friends who have thoroughly enjoyed it!',
    url: 'https://youtu.be/MSNRCbNTtDo',
    liveUrl: 'https://ranklessflappybird.netlify.app/',
    videoSources: [
      '/assets/rankless-recording-part-000.mp4',
      '/assets/rankless-recording-part-001.mp4',
      '/assets/rankless-recording-part-002.mp4',
      '/assets/rankless-recording-part-003.mp4',
      '/assets/rankless-recording-part-004.mp4',
      '/assets/rankless-recording-part-005.mp4',
      '/assets/rankless-recording-part-006.mp4',
      '/assets/rankless-recording-part-007.mp4',
      '/assets/rankless-recording-part-008.mp4',
    ],
    iframeSrc: 'https://www.youtube.com/embed/MSNRCbNTtDo',
  },
  {
    category: 'Web Development',
    title: 'PowncePins | Personal Project',
    description:
      'This is a very new website I am working on for a pin business my wife and I are workshopping. It is built with React and Tailwind CSS, and deployed with Netlify.',
    url: 'https://powncepins.netlify.app/',
    videoSources: [
      '/assets/powncepins-part-000.mp4',
      '/assets/powncepins-part-001.mp4',
      '/assets/powncepins-part-002.mp4',
      '/assets/powncepins-part-003.mp4',
      '/assets/powncepins-part-004.mp4',
      '/assets/powncepins-part-005.mp4',
      '/assets/powncepins-part-006.mp4',
    ],
    iframeSrc: 'https://www.youtube.com/embed/RKuVA8YXcSY',
  },
  {
    category: 'Web Development',
    title: 'BYUDanceChallenge | Interview Challenge',
    description:
      'Website built as a 24-hour challenge for a web developer job interview for BYU Dance.',
    url: 'https://youtu.be/YxnJ2ee-90U',
    liveUrl: 'https://byudancechallenge.netlify.app/',
    videoSources: [
      '/assets/byudancechallenge-part-000.mp4',
      '/assets/byudancechallenge-part-001.mp4',
      '/assets/byudancechallenge-part-002.mp4',
      '/assets/byudancechallenge-part-003.mp4',
      '/assets/byudancechallenge-part-004.mp4',
      '/assets/byudancechallenge-part-005.mp4',
      '/assets/byudancechallenge-part-006.mp4',
    ],
    iframeSrc: 'https://www.youtube.com/embed/YxnJ2ee-90U',
  },
  {
    category: 'Web Development',
    title: 'EcoConnect | Group Project',
    description:
      'Responsive React website built with a 3-person team over a couple of weeks for a class, to promote zero-waste awareness in Utah and connect users with nonprofits, community service projects, and eco-friendly local shops.',
    url: 'https://ecoconnectgroup2.netlify.app/',
    videoSources: [
      '/assets/ecoconnect-video-part-000.mp4',
      '/assets/ecoconnect-video-part-001.mp4',
      '/assets/ecoconnect-video-part-002.mp4',
      '/assets/ecoconnect-video-part-003.mp4',
      '/assets/ecoconnect-video-part-004.mp4',
      '/assets/ecoconnect-video-part-005.mp4',
      '/assets/ecoconnect-video-part-006.mp4',
      '/assets/ecoconnect-video-part-007.mp4',
      '/assets/ecoconnect-video-part-008.mp4',
    ],
    iframeSrc: 'https://www.youtube.com/embed/4Q_bKJQiOB8',
    mediaFit: 'contain',
  },
  {
    category: 'Unreal Engine 5 + Houdini/Maya',
    title: 'Melodious | Personal Project',
    description:
      'Unreal Engine 5 game project focused on exploration, and melody-based progression, featuring custom C++ systems, terrain generation, melody recognition mechanics, and a cute villager character model.',
    url: 'https://youtu.be/4r4dQPAZ8Us',
    videoSources: [
      '/assets/melody-game-final-part-000.mp4',
      '/assets/melody-game-final-part-001.mp4',
      '/assets/melody-game-final-part-002.mp4',
      '/assets/melody-game-final-part-003.mp4',
      '/assets/melody-game-final-part-004.mp4',
      '/assets/melody-game-final-part-005.mp4',
    ],
    iframeSrc: 'https://www.youtube.com/embed/4r4dQPAZ8Us',
  },
  {
    category: 'Unreal Engine 5 + Houdini/Maya',
    title: 'Houdini Fountain Simulation',
    description: 'Custom fountain simulation built from scratch in Houdini and rendered as a video showcase.',
    videoSrc: '/assets/houdini-fountain.mp4',
  },
  {
    category: 'Unreal Engine 5 + Houdini/Maya',
    title: 'Gumballs FX Simulation',
    description: 'High-quality simulation showcase created in Houdini/Maya and rendered as a polished video pass.',
    videoSrc: '/assets/gumballs_hq.mp4',
    mediaFit: 'contain',
  },
  {
    category: 'Video Editing',
    title: 'Rankless Comet Fight Edit',
    description: 'Video editing example created for the comic project Rankless, focused on pacing, compositing, and impact.',
    videoSources: [
      '/assets/rankless-comet-fight-edit-part-000.mp4',
      '/assets/rankless-comet-fight-edit-part-001.mp4',
      '/assets/rankless-comet-fight-edit-part-002.mp4',
      '/assets/rankless-comet-fight-edit-part-003.mp4',
      '/assets/rankless-comet-fight-edit-part-004.mp4',
      '/assets/rankless-comet-fight-edit-part-005.mp4',
    ],
    url: 'https://youtube.com/shorts/ukUWqZaXkLM',
    iframeSrc: 'https://www.youtube.com/embed/ukUWqZaXkLM',
    mediaFit: 'contain',
    mediaAspect: 'portrait',
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: '2022 - 2025',
    location: 'Brigham Young University, Provo, UT',
    title: 'B.S. in Computer Science (Graduated December 2025)',
    content: (
      <p>
        Computer Science graduate focused on full-stack web development, software engineering fundamentals, and
        project-based application development.
      </p>
    ),
  },
  {
    date: '2015 - 2019',
    location: 'Thurston High School, Springfield, OR',
    title: 'High School Diploma',
    content: (
      <p>
        Completed core academic coursework and built a strong foundation in communication, teamwork, and leadership.
      </p>
    ),
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'September 2025 - Present',
    location: 'Tax Hawk',
    title: 'Tax Customer Support Specialist',
    content: (
      <p>
        Assist taxpayers with e-filing by providing platform guidance, answering tax process questions, and resolving
        technical issues while collaborating with in-office team members.
      </p>
    ),
  },
  {
    date: 'May 2022 - August 2025',
    location: 'Destination Events',
    title: 'Lead Event Coordinator / Trainer',
    content: (
      <p>
        Prepared and delivered event rentals including inflatables, tents, and decor for weddings, schools, and
        corporate events. Trained new hires on complex setups and warehouse workflows, and led on-site teams through
        efficient setup and breakdown.
      </p>
    ),
  },
  {
    date: 'Sep 2022 - May 2024',
    location: 'Brigham Young University',
    title: "Teacher's Assistant",
    content: (
      <p>
        Tutored students in introductory computer science courses, hosted twice-weekly practice labs, graded
        assignments, and taught foundational Python and JavaScript concepts with emphasis on good programming
        practices.
      </p>
    ),
  },
  {
    date: 'Dec 2019 - Dec 2021',
    location: 'The Church of Jesus Christ of Latter-day Saints (Brazil)',
    title: 'Missionary',
    content: (
      <p>
        Volunteered as a full-time missionary, developed leadership as a district and zone leader, taught in
        Portuguese, and strengthened communication, organization, and cross-cultural collaboration skills.
      </p>
    ),
  },
  {
    date: 'Aug 2015 - Nov 2019',
    location: "Papa's Pizza",
    title: 'Cook',
    content: (
      <p>
        Worked as cook and busser by preparing pizzas, maintaining kitchen cleanliness, and supporting large-party
        reservations in a fast-paced environment.
      </p>
    ),
  },
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'John Doe',
      text: 'Use this as an opportunity to promote what it is like to work with you. High value testimonials include ones from current or past co-workers, managers, or from happy clients.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg',
    },
    {
      name: 'Jane Doe',
      text: 'Here you should write some nice things that someone has said about you. Encourage them to be specific and include important details (notes about a project you were on together, impressive quality produced, etc).',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/14.jpg',
    },
    {
      name: 'Someone else',
      text: 'Add several of these, and keep them as fresh as possible, but be sure to focus on quality testimonials with strong highlights of your skills/work ethic.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Here is a good spot for a message to your readers to let them know how best to reach out to you.',
  items: [
    {
      type: ContactType.Email,
      text: 'kccooldude11@gmail.com',
      href: 'kccooldude11@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Springfield, Oregon, USA',
      href: 'https://www.bing.com/maps/search?mepi=60%7E%7EEmbedded%7ELargeMapLink&ty=18&vdpid=5053149130927374337&v=2&sV=1&qpvt=springfield+Oregon+google+maps&FORM=MIRE&q=Springfield%2C+Oregon&ss=id.sid%3A42b6665e-fb97-a48b-b3e3-b7c29804a810&mb=44.094948%7E-123.050415%7E44.027016%7E-122.879051&ppois=44.06098175048828_-122.9647331237793_Springfield%2C+Oregon_%7E&cp=44.060991%7E-122.964733&lvl=11.6&style=r',
    },
    {
      type: ContactType.Github,
      text: '@klightheart',
      href: 'https://github.com/KCcooldude11',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/KCcooldude11'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/kasey-lightheart-640905369/'},
];

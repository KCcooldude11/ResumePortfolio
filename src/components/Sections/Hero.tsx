import {ChevronDownIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {FC, memo, useEffect, useState} from 'react';

import {aboutData, heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const Hero: FC = memo(() => {
  const {name} = heroData;
  const {profileImageSrc} = aboutData;
  const [scrollY, setScrollY] = useState(0);
  const [aboutTopInViewport, setAboutTopInViewport] = useState(Number.POSITIVE_INFINITY);
  const [aboutBottomInViewport, setAboutBottomInViewport] = useState(Number.NEGATIVE_INFINITY);
  const [viewportHeight, setViewportHeight] = useState(900);

  const introOpacity = Math.max(0, 1 - scrollY / 220);
  const introTranslateY = Math.min(80, scrollY * 0.2);
  const profileSize = 180;
  const profileTop = 96;
  const revealTriggerTop = viewportHeight * 0.22;
  const hideTriggerBottom = profileTop + profileSize + 300;
  const profileVisible = aboutTopInViewport <= revealTriggerTop && aboutBottomInViewport >= hideTriggerBottom;

  useEffect(() => {
    const updateAboutPosition = () => {
      const aboutSection = document.getElementById(SectionId.About);
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setAboutTopInViewport(rect.top);
        setAboutBottomInViewport(rect.bottom);
      } else {
        setAboutTopInViewport(Number.POSITIVE_INFINITY);
        setAboutBottomInViewport(Number.NEGATIVE_INFINITY);
      }
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
      updateAboutPosition();
    };
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      updateAboutPosition();
    };

    handleScroll();
    handleResize();
    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, []);

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0f0a1a]">
        <img
          alt="stars"
          className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover"
          src="/assets/stars.png"
          style={{transform: `translateX(${scrollY * 0.25}px)`}}
        />
        <img
          alt="moon"
          className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-full object-cover mix-blend-screen"
          src="/assets/moon.png"
          style={{transform: `translateY(${scrollY * 1.05}px)`}}
        />
        {profileImageSrc && (
          <div
            className="pointer-events-none fixed left-1/2 z-[6] overflow-hidden rounded-full ring-4 ring-white/70 shadow-2xl shadow-black/50 transition-all duration-300"
            style={{
              height: `${profileSize}px`,
              marginLeft: `-${profileSize / 2}px`,
              opacity: profileVisible ? 1 : 0,
              top: `${profileTop}px`,
              transform: `scale(${profileVisible ? 1 : 0.9})`,
              width: `${profileSize}px`,
            }}>
            <Image alt="kasey-profile-moon" className="h-full w-full object-cover" src={profileImageSrc} />
          </div>
        )}
        <img
          alt="mountains behind"
          className="pointer-events-none absolute left-0 top-0 z-[2] h-full w-full object-cover"
          src="/assets/mountains_behind.png"
          style={{transform: `translateY(${scrollY * 0.5}px)`}}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-t from-[#1c0522] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-[44%] z-30 flex justify-center px-4">
          <h1
            className="text-center text-4xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.65)] sm:text-5xl lg:text-7xl"
            style={{opacity: introOpacity, transform: `translateY(${introTranslateY}px)`}}>
            {name}
          </h1>
        </div>

        <img
          alt="mountains front"
          className="pointer-events-none absolute bottom-0 left-0 z-[20] h-auto w-full object-cover"
          src="/assets/mountains_front.png"
        />
        <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center">
          <a
            className="rounded-full bg-white p-1 ring-white ring-offset-2 ring-offset-gray-700/80 focus:outline-none focus:ring-2 sm:p-2"
            href={`/#${SectionId.About}`}>
            <ChevronDownIcon className="h-5 w-5 bg-transparent sm:h-6 sm:w-6" />
          </a>
        </div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;

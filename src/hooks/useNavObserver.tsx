import {useEffect} from 'react';

import {headerID} from '../components/Sections/Header';
import {SectionId} from '../data/data';

export const useNavObserver = (selectors: string, handler: (section: SectionId | null) => void) => {
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>(selectors));
    const headerWrapper = document.getElementById(headerID);

    const updateActiveSection = () => {
      if (headings.length === 0) {
        handler(null);
        return;
      }

      const headerHeight = headerWrapper?.getBoundingClientRect().height ?? 0;
      const activationOffset = headerHeight + 120;
      const currentY = window.scrollY + activationOffset;
      const nearPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      const activeSection = headings.reduce<SectionId | null>((currentActive, section) => {
        const id = section.getAttribute('id') as SectionId | null;

        if (!id) {
          return currentActive;
        }

        return section.offsetTop <= currentY ? id : currentActive;
      }, null);

      if (nearPageBottom) {
        const lastSectionId = headings[headings.length - 1]?.getAttribute('id') as SectionId | null;
        handler(lastSectionId ?? activeSection);
        return;
      }

      handler(activeSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, {passive: true});
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependency here is the post content.
};

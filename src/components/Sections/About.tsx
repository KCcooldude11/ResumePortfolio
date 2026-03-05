import classNames from 'classnames';
import {FC, memo} from 'react';

import {aboutData, heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';

const About: FC = memo(() => {
  const {description, aboutItems} = aboutData;
  const {actions} = heroData;
  return (
    <Section className="relative z-[2] bg-neutral-800" sectionId={SectionId.About}>
      <div className="grid grid-cols-1 gap-8 pt-32 md:grid-cols-12 md:pt-40">
        <div className="col-span-1 flex flex-col gap-y-6 md:col-span-8">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-2xl font-bold text-white">About me</h2>
            <p className="prose prose-sm text-gray-300 sm:prose-base">{description}</p>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aboutItems.map(({label, text, Icon}, idx) => (
              <li className="col-span-1" key={idx}>
                <div className="flex items-start gap-x-2">
                  {Icon && <Icon className="h-6 w-6 shrink-0 text-white" />}
                  <div className="flex flex-col gap-y-1">
                    <span className="whitespace-nowrap text-sm font-bold text-white">{label}:</span>
                    <p className="text-sm text-gray-300">{text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 flex flex-col gap-y-4 md:col-span-4 md:items-start md:pt-10">
          <div className="flex gap-x-4 text-neutral-100">
            <Socials />
          </div>
          <div className="flex w-full flex-col gap-3 md:max-w-xs">
            {actions.map(({href, text, primary, Icon}) => (
              <a
                className={classNames(
                  'flex items-center justify-center gap-x-2 rounded-full border-2 bg-none px-4 py-2 text-sm font-medium text-white ring-offset-gray-700/80 hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-base',
                  primary ? 'border-violet-500 ring-violet-500' : 'border-white ring-white',
                )}
                href={href}
                key={text}>
                {text}
                {Icon && <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
});

About.displayName = 'About';
export default About;

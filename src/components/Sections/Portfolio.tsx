import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import {FC, memo, useEffect, useMemo, useRef, useState} from 'react';

import {isMobile} from '../../config';
import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import Section from '../Layout/Section';

const buildAutoplayEmbedSrc = (src: string) => {
  try {
    const url = new URL(src);
    url.searchParams.set('autoplay', '1');
    url.searchParams.set('mute', '1');
    url.searchParams.set('playsinline', '1');
    url.searchParams.set('rel', '0');
    url.searchParams.set('modestbranding', '1');
    return url.toString();
  } catch {
    return src;
  }
};

const Portfolio: FC = memo(() => {
  const [expandedItem, setExpandedItem] = useState<PortfolioItem | null>(null);

  const groups = [
    'Web Development',
    'Web-Based Games',
    'Unreal Engine 5 + Houdini/Maya',
    'Video Editing',
  ] as const;

  return (
    <Section
      className="relative z-[2] bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 py-16 md:py-24"
      noPadding
      sectionId={SectionId.Portfolio}>
      <div className="mx-auto flex w-full max-w-[96vw] flex-col gap-y-8 px-4 lg:px-8 2xl:max-w-[1800px]">
        <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
        {groups.map(group => {
          const items = portfolioItems.filter(item => item.category === group);
          if (items.length === 0) {
            return null;
          }

          return (
            <div className="flex flex-col gap-y-4" key={group}>
              <h3 className="text-lg font-semibold text-white">{group}</h3>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {items.map((item, index) => {
                  return (
                    <div key={`${item.title}-${index}`}>
                      <div className="relative w-full overflow-hidden rounded-lg shadow-lg shadow-black/30 lg:shadow-xl">
                        <CardMedia item={item} />
                        <ItemOverlay item={item} onMaximize={setExpandedItem} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {expandedItem && <ExpandedVideoModal item={expandedItem} onClose={() => setExpandedItem(null)} />}
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const ItemOverlay: FC<{item: PortfolioItem; onMaximize: (item: PortfolioItem) => void}> = memo(({item, onMaximize}) => {
  const {url, title, description, videoSrc, videoSources, iframeSrc, liveUrl} = item;
  const [mobile, setMobile] = useState(false);
  const projectHref = liveUrl || url;
  const previewVideo = iframeSrc || videoSources?.[0] || videoSrc;

  useEffect(() => {
    // Avoid hydration styling errors by setting mobile in useEffect
    if (isMobile) {
      setMobile(true);
    }
  }, []);

  return (
    <div
      className={classNames(
        mobile
          ? 'absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent'
          : 'absolute inset-0 h-full w-full bg-gray-900 opacity-0 transition-all duration-300 hover:opacity-80',
      )}>
      <div className={classNames('relative w-full', mobile ? 'p-3' : 'h-full p-4')}>
        <div className={classNames('flex w-full flex-col gap-y-2', {'h-full overflow-y-auto overscroll-contain': !mobile})}>
          <h2 className="text-center font-bold text-white opacity-100">{title}</h2>
          <p className="text-xs text-white opacity-100 sm:text-sm">{description}</p>
          {previewVideo ? (
            <div className="mt-2 flex gap-2">
              <button
                className="rounded bg-white/20 px-2 py-1 text-xs text-white hover:bg-white/30"
                onClick={() => onMaximize(item)}
                type="button">
                Maximize Video
              </button>
              {projectHref && (
                <a
                  className="rounded bg-white/20 px-2 py-1 text-xs text-white hover:bg-white/30"
                  href={projectHref}
                  rel="noopener noreferrer"
                  target="_blank">
                  Open Project
                </a>
              )}
            </div>
          ) : (
            <div className="mt-2 flex gap-2">
              {projectHref && (
                <>
                  <a
                    className="rounded bg-white/20 px-2 py-1 text-xs text-white hover:bg-white/30"
                    href={projectHref}
                    rel="noopener noreferrer"
                    target="_blank">
                    Open Project
                  </a>
                  {url && (
                    <a href={url} rel="noopener noreferrer" target="_blank">
                      <ArrowTopRightOnSquareIcon className="h-6 w-6 shrink-0 text-white" />
                    </a>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const CardMedia: FC<{item: PortfolioItem}> = memo(({item}) => {
  const {title, image, videoSrc, videoSources, iframeSrc, gallery, mediaFit = 'cover', mediaAspect = 'landscape'} = item;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const resolvedVideoSources = useMemo(() => {
    if (videoSources && videoSources.length > 0) {
      return videoSources;
    }
    return videoSrc ? [videoSrc] : [];
  }, [videoSources, videoSrc]);

  useEffect(() => {
    if (activeVideoIndex >= resolvedVideoSources.length) {
      setActiveVideoIndex(0);
    }
  }, [activeVideoIndex, resolvedVideoSources.length]);

  useEffect(() => {
    if (!gallery || gallery.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % gallery.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [gallery]);

  const showcaseImage = useMemo(() => {
    if (gallery && gallery.length > 0) {
      return gallery[activeIndex];
    }
    return image;
  }, [activeIndex, gallery, image]);

  const isStringImage = typeof showcaseImage === 'string';
  const mediaFitClass = mediaFit === 'contain' ? 'object-contain' : 'object-cover';
  const mediaAspectClass = mediaAspect === 'portrait' ? 'aspect-[9/16] xl:aspect-[3/4]' : 'aspect-video';
  const autoplayIframeSrc = iframeSrc ? buildAutoplayEmbedSrc(iframeSrc) : undefined;

  const goToNextVideo = () => {
    if (resolvedVideoSources.length <= 1) {
      return;
    }

    setActiveVideoIndex(prev => (prev + 1) % resolvedVideoSources.length);
  };

  return (
    <div className={classNames('w-full', mediaAspectClass)}>
      {resolvedVideoSources.length > 0 ? (
        <video
          autoPlay
          className={classNames('h-full w-full', mediaFitClass)}
          key={resolvedVideoSources[activeVideoIndex]}
          loop={resolvedVideoSources.length === 1}
          muted
          onEnded={goToNextVideo}
          onError={goToNextVideo}
          playsInline
          preload="metadata"
          src={resolvedVideoSources[activeVideoIndex]}
        />
      ) : iframeSrc ? (
        <iframe
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          className="h-full w-full pointer-events-none"
          src={autoplayIframeSrc}
          title={title}
        />
      ) : showcaseImage ? (
        isStringImage ? (
          <img alt={title} className={classNames('h-full w-full transition-all duration-500', mediaFitClass)} src={showcaseImage} />
        ) : (
          <Image
            alt={title}
            className={classNames('h-full w-full transition-all duration-500', mediaFitClass)}
            src={showcaseImage}
            style={{height: '100%', width: '100%'}}
          />
        )
      ) : null}
    </div>
  );
});

CardMedia.displayName = 'CardMedia';

const ExpandedVideoModal: FC<{item: PortfolioItem; onClose: () => void}> = memo(({item, onClose}) => {
  const {title, videoSrc, videoSources, iframeSrc} = item;
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const resolvedVideoSources = useMemo(() => {
    if (videoSources && videoSources.length > 0) {
      return videoSources;
    }
    return videoSrc ? [videoSrc] : [];
  }, [videoSources, videoSrc]);
  const autoplayIframeSrc = iframeSrc ? buildAutoplayEmbedSrc(iframeSrc) : undefined;

  useEffect(() => {
    if (activeVideoIndex >= resolvedVideoSources.length) {
      setActiveVideoIndex(0);
    }
  }, [activeVideoIndex, resolvedVideoSources.length]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (iframeSrc) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    video.volume = 0;
    video.load();
    void video.play().catch(() => {
      return;
    });
  }, [activeVideoIndex, iframeSrc]);

  const enforceSilentLocalVideo = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (!video.muted || video.volume !== 0) {
      video.muted = true;
      video.volume = 0;
    }
  };

  const goToNextVideo = () => {
    if (resolvedVideoSources.length <= 1) {
      return;
    }

    setActiveVideoIndex(prev => (prev + 1) % resolvedVideoSources.length);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4" onClick={onClose} role="dialog">
      <button aria-label="Close video" className="absolute right-4 top-4 rounded bg-white/20 px-3 py-1 text-white hover:bg-white/30" onClick={onClose} type="button">
        Close
      </button>
      <div className="w-full max-w-6xl" onClick={event => event.stopPropagation()}>
        <h3 className="mb-3 text-center text-sm font-semibold text-white sm:text-base">{title}</h3>
        {iframeSrc ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-[82vh] w-full rounded-md bg-black"
            src={autoplayIframeSrc}
            title={title}
          />
        ) : resolvedVideoSources.length > 0 ? (
          <video
            autoPlay
            className="h-auto max-h-[82vh] w-full rounded-md bg-black"
            controls
            loop={resolvedVideoSources.length === 1}
            muted
            onEnded={goToNextVideo}
            onError={goToNextVideo}
            onLoadedMetadata={enforceSilentLocalVideo}
            onPlay={enforceSilentLocalVideo}
            onVolumeChange={enforceSilentLocalVideo}
            playsInline
            preload="metadata"
            ref={videoRef}
            src={resolvedVideoSources[activeVideoIndex]}
          />
        ) : (
          <div className="rounded bg-white/10 p-6 text-center text-white">No video available.</div>
        )}
      </div>
    </div>
  );
});

ExpandedVideoModal.displayName = 'ExpandedVideoModal';

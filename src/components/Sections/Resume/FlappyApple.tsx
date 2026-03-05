import {FC, memo, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {SectionId} from '../../../data/data';

const FlappyApple: FC = memo(() => {
  const REG = '/assets/Apple_Regular.png';
  const FLY = '/assets/Apple_Fly.png';
  const MERRIKH_REG = '/assets/Merrikh_Regular.png';
  const MERRIKH_FLY = '/assets/Merrikh_Fly.png';
  const MEDALLION = '/assets/medallion.png';
  const APPLE_SIZE = 200;
  const MEDALLION_HEIGHT = 124;
  const MEDALLION_SECTION_OFFSET = 420;
  const MEDALLION_MIN_VIEWPORT_RATIO = 0.45;

  const [isFlyFrame, setIsFlyFrame] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDismissedDragHint, setHasDismissedDragHint] = useState(false);
  const [hasCollectedMedallion, setHasCollectedMedallion] = useState(false);
  const [position, setPosition] = useState({x: 24, y: 112});
  const [medallionPosition, setMedallionPosition] = useState({x: -10000, y: -10000});
  const [medallionSize, setMedallionSize] = useState({height: MEDALLION_HEIGHT, width: MEDALLION_HEIGHT});
  const [isMedallionReady, setIsMedallionReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dragOffsetRef = useRef({x: 0, y: 0});
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const img1 = new Image();
    img1.src = REG;
    const img2 = new Image();
    img2.src = FLY;

    const TOTAL = 2400;
    const TO_REG_AT = Math.floor(TOTAL * 0.55);
    const TO_FLY_AT = Math.floor(TOTAL * 0.98);

    let flyTimer: number | null = null;
    let regTimer: number | null = null;
    let loopTimer: number | null = null;

    const clearTimers = () => {
      if (flyTimer) {
        window.clearTimeout(flyTimer);
      }
      if (regTimer) {
        window.clearTimeout(regTimer);
      }
      if (loopTimer) {
        window.clearInterval(loopTimer);
      }
      flyTimer = null;
      regTimer = null;
      loopTimer = null;
    };

    const runCycle = () => {
      setIsFlyFrame(true);
      regTimer = window.setTimeout(() => setIsFlyFrame(false), TO_REG_AT);
      flyTimer = window.setTimeout(() => setIsFlyFrame(true), TO_FLY_AT);
    };

    runCycle();
    loopTimer = window.setInterval(runCycle, TOTAL);

    return () => {
      clearTimers();
    };
  }, [FLY, REG]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateMedallionPosition = () => {
      const resumeSection = document.getElementById(SectionId.Resume);

      if (!resumeSection) {
        const minViewportY = Math.round(window.innerHeight * MEDALLION_MIN_VIEWPORT_RATIO);
        const maxViewportY = Math.max(minViewportY, window.innerHeight - MEDALLION_HEIGHT - 24);
        setMedallionPosition({
          x: Math.max(24, window.innerWidth - medallionSize.width - 24),
          y: Math.min(minViewportY, maxViewportY),
        });
        return;
      }

      const rect = resumeSection.getBoundingClientRect();
      const candidateX = rect.right - medallionSize.width - 24;
      const candidateY = rect.top + MEDALLION_SECTION_OFFSET;
      const minViewportY = Math.round(window.innerHeight * MEDALLION_MIN_VIEWPORT_RATIO);
      const maxViewportY = window.innerHeight - MEDALLION_HEIGHT - 24;
      const clampedMinY = Math.min(minViewportY, maxViewportY);

      setMedallionPosition({
        x: Math.max(24, Math.min(candidateX, window.innerWidth - medallionSize.width - 24)),
        y: Math.max(clampedMinY, Math.min(candidateY, maxViewportY)),
      });
      setIsMedallionReady(true);
    };

    updateMedallionPosition();
    window.addEventListener('scroll', updateMedallionPosition, {passive: true});
    window.addEventListener('resize', updateMedallionPosition);

    return () => {
      window.removeEventListener('scroll', updateMedallionPosition);
      window.removeEventListener('resize', updateMedallionPosition);
    };
  }, [MEDALLION_HEIGHT, MEDALLION_MIN_VIEWPORT_RATIO, MEDALLION_SECTION_OFFSET, medallionSize.width]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging || pointerIdRef.current !== event.pointerId) {
        return;
      }

      const nextX = event.clientX - dragOffsetRef.current.x;
      const nextY = event.clientY - dragOffsetRef.current.y;

      const maxX = window.innerWidth - APPLE_SIZE;
      const maxY = window.innerHeight - APPLE_SIZE;

      setPosition({
        x: Math.max(0, Math.min(nextX, maxX)),
        y: Math.max(0, Math.min(nextY, maxY)),
      });
    };

    const stopDragging = (event: PointerEvent) => {
      if (pointerIdRef.current !== event.pointerId) {
        return;
      }

      pointerIdRef.current = null;
      setIsDragging(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointercancel', stopDragging);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopDragging);
      window.removeEventListener('pointercancel', stopDragging);
    };
  }, [APPLE_SIZE, isDragging]);

  useEffect(() => {
    if (!isMedallionReady || hasCollectedMedallion) {
      return;
    }

    const appleLeft = position.x;
    const appleTop = position.y;
    const appleRight = appleLeft + APPLE_SIZE;
    const appleBottom = appleTop + APPLE_SIZE;

    const medallionLeft = medallionPosition.x;
    const medallionTop = medallionPosition.y;
    const medallionRight = medallionLeft + medallionSize.width;
    const medallionBottom = medallionTop + medallionSize.height;

    const intersects =
      appleLeft < medallionRight &&
      appleRight > medallionLeft &&
      appleTop < medallionBottom &&
      appleBottom > medallionTop;

    if (intersects) {
      setHasCollectedMedallion(true);
    }
  }, [
    APPLE_SIZE,
    hasCollectedMedallion,
    isMedallionReady,
    medallionPosition.x,
    medallionPosition.y,
    medallionSize.height,
    medallionSize.width,
    position.x,
    position.y,
  ]);

  const onMedallionLoad: React.ReactEventHandler<HTMLImageElement> = event => {
    const target = event.currentTarget;
    const renderedWidth = target.getBoundingClientRect().width;

    setMedallionSize({
      height: MEDALLION_HEIGHT,
      width: renderedWidth || MEDALLION_HEIGHT,
    });
  };

  const currentSprite = hasCollectedMedallion ? (isFlyFrame ? MERRIKH_FLY : MERRIKH_REG) : isFlyFrame ? FLY : REG;

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = event => {
    pointerIdRef.current = event.pointerId;
    setIsDragging(true);
    setHasDismissedDragHint(true);

    dragOffsetRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <>
      {!hasCollectedMedallion && (
        <div
          aria-hidden="true"
          className="home-medallion-loop pointer-events-none hidden select-none lg:block"
          style={{
            left: medallionPosition.x,
            position: 'fixed',
            top: medallionPosition.y,
            zIndex: 1,
          }}>
          <img alt="" draggable={false} onLoad={onMedallionLoad} src={MEDALLION} style={{height: MEDALLION_HEIGHT, width: 'auto'}} />
        </div>
      )}
      <div
        aria-hidden="true"
        className={`hidden select-none lg:flex lg:flex-col lg:items-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={onPointerDown}
        style={{
          left: position.x,
          position: 'fixed',
          top: position.y,
          touchAction: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}>
        <img
          alt=""
          className={`drop-shadow-[0_10px_16px_rgba(0,0,0,0.28)] ${isDragging ? '' : 'home-apple-loop'}`}
          draggable={false}
          src={currentSprite}
          style={{height: APPLE_SIZE, width: APPLE_SIZE}}
        />
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none hidden md:flex md:flex-col md:items-center transition-opacity duration-150 ${hasDismissedDragHint ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: position.x + APPLE_SIZE / 2,
          position: 'fixed',
          top: position.y + APPLE_SIZE + 8,
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}>
        <span className="leading-none text-xs font-bold text-black">^</span>
        <span className="mt-1 text-[11px] font-semibold leading-none text-black">Drag me</span>
      </div>
    </>,
    document.body,
  );
});

FlappyApple.displayName = 'FlappyApple';

export default FlappyApple;
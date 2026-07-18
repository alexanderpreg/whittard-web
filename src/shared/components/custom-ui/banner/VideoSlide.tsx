'use client';

import { cn } from '@/lib/utils';
import { Maximize } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface VideoSlideProps {
  src: string;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

type SafariVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

export function VideoSlide({ src, onFullscreenChange }: VideoSlideProps) {
  const videoRef = useRef<SafariVideoElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const updateFullscreenState = (active: boolean) => {
      setIsFullscreen(active);

      video.muted = !active;

      if (active) {
        video.volume = 0.5;
      }

      onFullscreenChange?.(active);
    };

    const handleFullscreenChange = () => {
      updateFullscreenState(document.fullscreenElement === video);
    };

    const handleSafariEnterFullscreen = () => {
      updateFullscreenState(true);
    };

    const handleSafariExitFullscreen = () => {
      updateFullscreenState(false);

      video.play().catch(() => {});
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    video.addEventListener('webkitbeginfullscreen', handleSafariEnterFullscreen);

    video.addEventListener('webkitendfullscreen', handleSafariExitFullscreen);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);

      video.removeEventListener('webkitbeginfullscreen', handleSafariEnterFullscreen);

      video.removeEventListener('webkitendfullscreen', handleSafariExitFullscreen);
    };
  }, [onFullscreenChange]);

  const handleFullscreen = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      video.currentTime = 0;

      video.volume = 0.5;
      video.muted = false;

      if (video.webkitEnterFullscreen) {
        await video.play();

        video.webkitEnterFullscreen();

        return;
      }

      if (!document.fullscreenElement) {
        await video.requestFullscreen();

        await video.play();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        controls={isFullscreen}
        className={cn('h-full w-full', isFullscreen ? 'bg-black object-contain' : 'object-cover')}
      />

      {!isFullscreen && (
        <button
          type="button"
          onClick={handleFullscreen}
          className="absolute top-5 right-5 z-10 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/70"
          aria-label="Ver video en pantalla completa"
        >
          <Maximize size={22} />
        </button>
      )}
    </div>
  );
}

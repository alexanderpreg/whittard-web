'use client';

import { AppImage } from '@/shared/components/custom-ui/app-image';
import type { BannerSlide } from './types';

import { VideoSlide } from './VideoSlide';

interface BannerSlideInnerProps {
  slide: BannerSlide;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export function BannerSlideInner({ slide, onFullscreenChange }: BannerSlideInnerProps) {
  if (slide.type === 'video') {
    return <VideoSlide src={slide.videoUrl} onFullscreenChange={onFullscreenChange} />;
  }

  return (
    <div className="relative h-full w-full">
      {slide.mobileImageUrl && (
        <AppImage
          src={slide.mobileImageUrl}
          alt="Banner de Whittard"
          fill
          sizes="(max-width: 640px) 100vw, 0px"
          className="object-cover sm:hidden"
          priority
          skeleton={false}
        />
      )}

      <AppImage
        src={slide.desktopImageUrl}
        alt="Banner de Whittard"
        fill
        sizes="100vw"
        className="hidden object-cover sm:block"
        priority
        skeleton={false}
      />
    </div>
  );
}

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
    <picture>
      {slide.mobileImageUrl && <source media="(max-width: 640px)" srcSet={slide.mobileImageUrl} />}

      <AppImage
        src={slide.desktopImageUrl}
        alt="Banner de Whittard"
        fill
        sizes="100vw"
        className="object-cover"
        skeleton={false}
      />
    </picture>
  );
}

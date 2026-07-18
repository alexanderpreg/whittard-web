import type { BannerSlide } from './types';

import { BannerSlideInner } from './BannerSlideInner';
import { SlideWrapper } from './SlideWrapper';

interface BannerItemProps {
  slide: BannerSlide;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export function BannerItem({ slide, onFullscreenChange }: BannerItemProps) {
  return (
    <div className="relative aspect-square max-h-120 min-h-50 w-full sm:aspect-4/1">
      <SlideWrapper linkUrl={slide.linkUrl}>
        <BannerSlideInner slide={slide} onFullscreenChange={onFullscreenChange} />
      </SlideWrapper>
    </div>
  );
}

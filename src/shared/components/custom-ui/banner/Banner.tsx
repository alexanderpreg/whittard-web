'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/custom-ui/carousel';
import type { BannerSlide } from './types';

import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BannerFallback } from './BannerFallback';
import { BannerItem } from './BannerItem';

interface BannerProps {
  slides: BannerSlide[];
  fallbackImageUrl?: string;
}

export function Banner({ slides, fallbackImageUrl }: BannerProps) {
  const activeSlides = slides.filter((slide) => slide.isActive);
  const autoplay = useMemo(
    () =>
      Autoplay({ delay: 5000, playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true }),
    [],
  );
  const [api, setApi] = useState<CarouselApi>();

  const handleFullscreenChange = (isFullscreen: boolean) => {
    if (!api) return;

    const autoplay = api.plugins().autoplay;

    if (!autoplay) return;

    if (isFullscreen) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  };

  if (activeSlides.length === 0) {
    return <BannerFallback fallbackImageUrl={fallbackImageUrl} />;
  }

  if (activeSlides.length === 1) {
    const slide = activeSlides[0];

    return (
      <section className="relative w-full overflow-hidden">
        <BannerItem slide={slide} onFullscreenChange={handleFullscreenChange} />
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden">
      <Carousel
        plugins={[autoplay]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="relative w-full"
        setApi={setApi}
      >
        <CarouselContent className="ml-0">
          {activeSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <BannerItem slide={slide} onFullscreenChange={handleFullscreenChange} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {activeSlides.length > 1 && (
          <>
            <CarouselPrevious
              className="border-brand-primary/20 text-brand-dark left-[10%] z-20 h-10 w-10 bg-white/90 shadow-md hover:bg-white"
              renderIcon={() => <ChevronLeftIcon className="size-6" strokeWidth={2.5} />}
            />

            <CarouselNext
              className="border-brand-primary/20 text-brand-dark right-[10%] z-20 h-10 w-10 bg-white/90 shadow-md hover:bg-white"
              renderIcon={() => <ChevronRightIcon className="size-5" strokeWidth={2.5} />}
            />

            <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center px-4">
              <CarouselDots
                className="gap-2"
                renderDot={(index, active, goTo) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Ir al slide ${index + 1}`}
                    aria-current={active}
                    onClick={goTo}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      active ? 'w-8 bg-white' : 'w-2.5 bg-gray-200/60 hover:bg-white/80'
                    }`}
                  />
                )}
              />
            </div>
          </>
        )}
      </Carousel>
    </section>
  );
}

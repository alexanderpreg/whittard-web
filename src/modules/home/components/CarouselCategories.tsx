'use client';

import Link from 'next/link';

import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/custom-ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import { useMemo } from 'react';
import type { CategorySlide } from '../types/categories';

interface CategoriesProps {
  slides: CategorySlide[];
}

export function CategoriesCarousel({ slides }: CategoriesProps) {
  const autoplay = useMemo(
    () =>
      Autoplay({ delay: 4000, playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true }),
    [],
  );

  if (!slides.length) return null;

  return (
    <section className="w-full">
      <Carousel
        plugins={[autoplay]}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4 sm:-ml-6 lg:-ml-8 xl:-ml-12">
          {slides.map((slide) => (
            <CarouselItem
              key={slide.slug}
              className="basis-1/3 pl-4 sm:basis-1/4 sm:pl-6 md:basis-1/5 lg:basis-1/6 lg:pl-8 xl:basis-1/7 xl:pl-12"
            >
              <Link
                href={`/catalogo/${slide.slug}`}
                className="flex size-full flex-col items-center gap-3"
              >
                <div className="inline-flex aspect-square h-full w-full">
                  <AppImage
                    src={slide.imageUrl}
                    alt={slide.name}
                    width={250}
                    height={250}
                    className="size-full rounded-full object-cover object-center"
                    skeleton={false}
                    fallback={
                      <div className="flex size-full items-center justify-center rounded-full border border-dashed p-4 text-center text-xs font-medium">
                        Error imagen Logo {slide.name}
                      </div>
                    }
                  />
                </div>

                <span className="text-brand-primary text-center text-sm font-medium underline">
                  {slide.name}
                </span>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

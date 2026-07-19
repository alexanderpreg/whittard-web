'use client';

import { RecipeCard } from '@/modules/recipes/components/RecipeCard';
import type { RecipeSlide } from '@/modules/recipes/types/recipes';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/shared/components/custom-ui/carousel';
import { Heading } from '@/shared/components/custom-ui/Heading';
import Autoplay from 'embla-carousel-autoplay';
import { useMemo } from 'react';

interface RecipeCarouselProps {
  title: string;
  recipes: RecipeSlide[];
}

export function RecipeCarousel({ title, recipes }: RecipeCarouselProps) {
  const autoplay = useMemo(
    () =>
      Autoplay({ delay: 4000, playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true }),
    [],
  );
  if (!recipes.length) return null;

  return (
    <section className="isolate w-full space-y-8">
      <Heading as="h2" variant="subheading" className="font-brand-elephant text-center">
        {title}
      </Heading>

      <Carousel
        plugins={[autoplay]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {recipes.map((recipe) => (
            <CarouselItem key={recipe.id} className="basis-full pl-6 sm:basis-1/2 lg:basis-1/3">
              <RecipeCard recipe={recipe} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots className="mt-6 gap-3" />
      </Carousel>
    </section>
  );
}

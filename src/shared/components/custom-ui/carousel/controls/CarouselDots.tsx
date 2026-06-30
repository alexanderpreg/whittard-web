'use client';

import * as React from 'react';

import { isClient } from '@/lib/utils';
import { cn } from '@/lib/utils/shadcn-cn';

import { useCarousel } from '../core/useCarousel';

interface CarouselDotsProps extends React.ComponentProps<'div'> {
  renderDot?: (index: number, active: boolean, goTo: () => void) => React.ReactNode;
}

function CarouselDots({ className, renderDot, ...props }: CarouselDotsProps) {
  const { api, selectedIndex, slidesCount } = useCarousel();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(isClient());
  }, []);

  if (!mounted || !api || slidesCount <= 1) return null;

  const scrollSnapList = api.scrollSnapList();

  return (
    <div
      data-slot="carousel-dots"
      className={cn('flex items-center justify-center gap-2', className)}
      {...props}
    >
      {scrollSnapList.map((_, index) => {
        const active = selectedIndex === index;
        const goTo = () => api.scrollTo(index);

        if (renderDot) return renderDot(index, active, goTo);

        return (
          <button
            key={index}
            type="button"
            aria-label={`Ir al slide ${index + 1}`}
            aria-current={active}
            onClick={goTo}
            className={cn(
              'h-2.5 w-2.5 rounded-full transition-all duration-300',
              active ? 'bg-primary w-8' : 'bg-muted hover:bg-primary/40',
            )}
          />
        );
      })}
    </div>
  );
}

export { CarouselDots };

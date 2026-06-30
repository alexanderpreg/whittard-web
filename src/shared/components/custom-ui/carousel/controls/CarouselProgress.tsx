'use client';

import * as React from 'react';

import { isClient } from '@/lib/utils';
import { cn } from '@/lib/utils/shadcn-cn';

import { useCarousel } from '../core/useCarousel';

function CarouselProgress({ className, ...props }: React.ComponentProps<'div'>) {
  const { selectedIndex, slidesCount } = useCarousel();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(isClient());
  }, []);

  if (!mounted || slidesCount <= 1) return null;

  const progress = ((selectedIndex + 1) / slidesCount) * 100;

  return (
    <div
      data-slot="carousel-progress"
      className={cn('bg-muted h-1 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <div
        className="bg-primary h-full rounded-full transition-[width] duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export { CarouselProgress };

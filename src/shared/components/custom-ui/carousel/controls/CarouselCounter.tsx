'use client';

import * as React from 'react';

import { isClient } from '@/lib/utils';
import { cn } from '@/lib/utils/shadcn-cn';

import { useCarousel } from '../core/useCarousel';

function CarouselCounter({ className, ...props }: React.ComponentProps<'div'>) {
  const { selectedIndex, slidesCount } = useCarousel();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(isClient());
  }, []);

  if (!mounted || slidesCount <= 0) return null;

  return (
    <div
      data-slot="carousel-counter"
      className={cn('text-muted-foreground text-sm tabular-nums', className)}
      {...props}
    >
      {selectedIndex + 1} / {slidesCount}
    </div>
  );
}

export { CarouselCounter };

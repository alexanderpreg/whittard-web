'use client';

import * as React from 'react';

import { isClient } from '@/lib/utils';
import { cn } from '@/lib/utils/shadcn-cn';

import { useCarousel } from '../core/useCarousel';

function CarouselFraction({ className, ...props }: React.ComponentProps<'div'>) {
  const { selectedIndex, slidesCount } = useCarousel();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(isClient());
  }, []);

  if (!mounted || slidesCount <= 0) return null;

  return (
    <div
      data-slot="carousel-fraction"
      className={cn('inline-flex items-center gap-1 text-sm font-medium', className)}
      {...props}
    >
      <span>{String(selectedIndex + 1).padStart(2, '0')}</span>
      <span aria-hidden="true">/</span>
      <span>{String(slidesCount).padStart(2, '0')}</span>
    </div>
  );
}

export { CarouselFraction };

'use client';

import * as React from 'react';

import { isClient } from '@/lib/utils';
import { cn } from '@/lib/utils/shadcn-cn';

import { useCarousel } from '../core/useCarousel';

interface CarouselThumbsProps<T> extends React.ComponentProps<'div'> {
  items: T[];

  getKey: (item: T, index: number) => React.Key;

  renderThumb: (item: T, active: boolean, index: number) => React.ReactNode;
}

function CarouselThumbs<T>({
  items,
  getKey,
  renderThumb,
  className,
  ...props
}: CarouselThumbsProps<T>) {
  const { api, selectedIndex, slidesCount } = useCarousel();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(isClient());
  }, []);

  if (!mounted || !api || slidesCount <= 1 || items.length <= 1) {
    return null;
  }

  return (
    <div
      data-slot="carousel-thumbs"
      className={cn('mt-4 flex items-center justify-center gap-3', className)}
      {...props}
    >
      {items.map((item, index) => {
        const active = selectedIndex === index;

        return (
          <button
            key={getKey(item, index)}
            type="button"
            onClick={() => api.scrollTo(index)}
            aria-current={active}
            className={cn('transition-all', active && 'ring-brand-primary ring-2')}
          >
            {renderThumb(item, active, index)}
          </button>
        );
      })}
    </div>
  );
}

export { CarouselThumbs };

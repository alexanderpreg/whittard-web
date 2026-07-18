'use client';

import * as React from 'react';

import { ChevronLeftIcon } from 'lucide-react';

import { isClient } from '@/lib/utils';
import { cn } from '@/lib/utils/shadcn-cn';

import { Button } from '@/shared/components/shadcn-ui/button';

import { useCarousel } from '../core/useCarousel';

interface CarouselPreviousProps extends React.ComponentProps<typeof Button> {
  renderIcon?: () => React.ReactNode;
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon-sm',
  renderIcon,
  ...props
}: CarouselPreviousProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(isClient());
  }, []);

  if (!mounted) return null;

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      className={cn(
        'absolute touch-manipulation rounded-full',
        orientation === 'horizontal'
          ? 'inset-y-0 -left-12 my-auto'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      {...props}
    >
      {renderIcon ? renderIcon() : <ChevronLeftIcon />}
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

export { CarouselPrevious };

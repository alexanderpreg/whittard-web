'use client';

import * as React from 'react';

import { ChevronRightIcon } from 'lucide-react';

import { isClient } from '@/lib/utils';
import { cn } from '@/lib/utils/shadcn-cn';

import { Button } from '@/shared/components/shadcn-ui/button';

import { useCarousel } from '../core/useCarousel';

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon-sm',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(isClient());
  }, []);

  if (!mounted) return null;

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      disabled={!canScrollNext}
      onClick={scrollNext}
      className={cn(
        'absolute touch-manipulation rounded-full',
        orientation === 'horizontal'
          ? 'inset-y-0 -right-12 my-auto'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      {...props}
    >
      <ChevronRightIcon />

      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export { CarouselNext };

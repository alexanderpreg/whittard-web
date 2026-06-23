import { cn } from '@/lib/utils/shadcn-utils';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const containerVariants = cva('w-full', {
  variants: {
    size: {
      container: 'max-w-[1366px] px-2.5 lg:px-4 2xl:px-0 mx-auto xl:max-w-6xl 2xl:max-w-7xl',
      full: 'max-w-screen',
    },
  },
  defaultVariants: {
    size: 'container',
  },
});

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: never;
  size?: 'container' | 'full';
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ size, className, ...props }, ref) => {
    return <div ref={ref} className={cn(containerVariants({ size }), className)} {...props} />;
  },
);

Container.displayName = 'Container';

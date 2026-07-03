import { cn } from '@/lib/utils/shadcn-cn';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const containerVariants = cva('w-full', {
  variants: {
    size: {
      container: 'max-w-7xl px-2.5 lg:px-4 2xl:px-0 mx-auto 2xl:max-w-360',
      full: 'max-w-screen',
    },
  },
  defaultVariants: {
    size: 'container',
  },
});

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
  size?: 'container' | 'full';
}

export const Container = ({ as: Component = 'div', size, className, ...props }: ContainerProps) => {
  return <Component className={cn(containerVariants({ size }), className)} {...props} />;
};

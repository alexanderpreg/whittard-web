'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils/shadcn-cn';
import { useActivePath } from './useActivePath';

type ActiveLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    className?: string;
    activeClassName?: string;
    includeSubpath?: boolean;
    children: ReactNode;
  };

export function ActiveLink({
  href,
  className,
  activeClassName,
  includeSubpath = false,
  children,
  ...props
}: ActiveLinkProps) {
  const isActivePath = useActivePath();
  const isActive = isActivePath(String(href), includeSubpath);

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}

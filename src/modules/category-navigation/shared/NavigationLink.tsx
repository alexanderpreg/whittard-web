'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

interface NavigationLinkProps extends ComponentProps<typeof Link> {
  onNavigate?: () => void;
}

export function NavigationLink({ className, onNavigate, ...props }: NavigationLinkProps) {
  return (
    <Link
      className={cn(
        'group hover:text-brand-primary inline-flex items-center text-[15px] text-slate-700 transition-colors',
        className,
      )}
      onClick={onNavigate}
      {...props}
    >
      <span className="relative">
        {props.children}
        <span className="bg-brand-primary absolute -bottom-1 left-0 h-px w-0 transition-all group-hover:w-full" />
      </span>
    </Link>
  );
}

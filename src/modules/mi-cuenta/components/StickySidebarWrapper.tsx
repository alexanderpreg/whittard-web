// src/modules/profile/components/StickySidebarWrapper.tsx
'use client';

import { useScrollTop } from '@/lib/hooks/useScrollTop';
import { cn } from '@/lib/utils';

interface StickySidebarWrapperProps {
  children: React.ReactNode;
}

export function StickySidebarWrapper({ children }: StickySidebarWrapperProps) {
  const isAtTop = useScrollTop(0);

  return (
    <div
      className={cn(
        'sticky transition-[top] duration-200 ease-in-out',
        isAtTop ? 'top-39.25' : 'top-53.25',
      )}
    >
      {children}
    </div>
  );
}

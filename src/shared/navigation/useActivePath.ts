'use client';

import { usePathname } from 'next/navigation';

export function useActivePath() {
  const pathname = usePathname();

  return (href: string, includeSubpath = false) =>
    pathname === href || (includeSubpath && pathname.startsWith(`${href}/`));
}

'use client';

import Link from 'next/link';

export function SlideWrapper({
  linkUrl,
  children,
}: {
  linkUrl?: string;
  children: React.ReactNode;
}) {
  if (!linkUrl) return <>{children}</>;

  return (
    <Link href={linkUrl} target="_blank" className="block h-full w-full">
      {children}
    </Link>
  );
}

'use client';

import { cn } from '@/lib/utils/shadcn-cn';
import { useEffect, useRef, useState } from 'react';
import { LoadingUi } from './Loading';

const MIN_DISPLAY_MS = 800;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  // eslint-disable-next-line react-hooks/purity
  const mountTimeRef = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;

      const remaining = Math.max(0, MIN_DISPLAY_MS - (Date.now() - mountTimeRef.current));

      timeoutRef.current = setTimeout(() => {
        setIsFading(true);
        timeoutRef.current = setTimeout(() => setIsLoading(false), 400);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      document.addEventListener('readystatechange', dismiss);
    }

    return () => {
      dismissed = true;
      document.removeEventListener('readystatechange', dismiss);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-9999 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-400',
        isFading ? 'opacity-0' : 'opacity-100',
      )}
    >
      <LoadingUi size="md" />
    </div>
  );
}

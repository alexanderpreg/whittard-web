'use client';

import { useEffect, useState } from 'react';

export function useScrollTop(threshold = 0) {
  const [isAtTop, setIsAtTop] = useState<boolean | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= threshold);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isAtTop;
}

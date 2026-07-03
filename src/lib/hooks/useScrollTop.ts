'use client';

import { useEffect, useState } from 'react';

export function useScrollTop(threshold = 0) {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY <= threshold;

      setIsAtTop((previous) => (previous === atTop ? previous : atTop));
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isAtTop;
}

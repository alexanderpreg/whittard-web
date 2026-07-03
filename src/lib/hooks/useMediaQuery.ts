'use client';

import { useEffect, useState } from 'react';

import { isServer } from '../utils';

type UseMediaQueryOptions = {
  defaultValue?: boolean;
};

export function useMediaQuery(
  query: string,
  { defaultValue = false }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (): boolean => {
    if (isServer()) {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

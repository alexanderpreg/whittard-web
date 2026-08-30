'use client';

import { useEffect, useRef } from 'react';

import { isServer } from '../utils';

type UseIntersectionObserverOptions = {
  threshold?: number | number[];
  rootMargin?: string;
  enabled?: boolean;
};

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  callback: (entry: IntersectionObserverEntry) => void,
  { threshold = 0, rootMargin = '200px', enabled = true }: UseIntersectionObserverOptions = {},
) {
  const targetRef = useRef<T | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (isServer() || !enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            callbackRef.current(entry);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, rootMargin, threshold]);

  return targetRef;
}

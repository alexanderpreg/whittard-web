'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'whittard-favorites';

export interface FavoriteItem {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
}

function simulateApi<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), 400));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavorites(JSON.parse(stored));
      } catch {
        /* ignore parse errors */
      }
    }
    setReady(true);
  }, []);

  const toggle = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.productId === item.productId && f.variantId === item.variantId,
      );
      const next = exists
        ? prev.filter((f) => f.productId !== item.productId || f.variantId !== item.variantId)
        : [...prev, item];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleAsync = useCallback(
    async (item: FavoriteItem) => {
      await simulateApi(item);
      toggle(item);
      return item;
    },
    [toggle],
  );

  const isFavorite = useCallback(
    (productId: string, variantId: string) =>
      favorites.some((f) => f.productId === productId && f.variantId === variantId),
    [favorites],
  );

  return { favorites, toggle, toggleAsync, isFavorite, ready };
}

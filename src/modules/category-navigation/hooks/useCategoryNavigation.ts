'use client';

import { useMemo } from 'react';

import { categoryNavigationData } from '../data';

export function useCategoryNavigation() {
  const categories = categoryNavigationData;

  return useMemo(
    () => ({
      categories,
      getCategoryByLabel: (label: string) => categories.find((cat) => cat.name === label),
      getCategoryBySlug: (slug: string) => categories.find((cat) => cat.slug === slug),
      isLoading: false,
      error: null,
    }),
    [categories],
  );
}

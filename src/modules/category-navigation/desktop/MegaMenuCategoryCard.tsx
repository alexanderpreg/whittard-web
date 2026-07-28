'use client';

import Link from 'next/link';

import type { Category } from '../types/category-navigation.types';
import { buildCategoryNavigationUrl } from '../utils/buildCategoryNavigationUrl';

interface MegaMenuCategoryCardProps {
  category: Category;
  onNavigate?: () => void;
}

export function MegaMenuCategoryCard({ category, onNavigate }: MegaMenuCategoryCardProps) {
  return (
    <Link
      href={buildCategoryNavigationUrl(category.slug)}
      onClick={onNavigate}
      className="group flex w-full flex-col overflow-hidden rounded-sm bg-slate-900"
    >
      <div
        className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${category.image})` }}
      />
      <div className="flex flex-col gap-1.5 bg-white p-4">
        <span className="text-sm font-semibold text-slate-800">{category.name}</span>
        {category.shortDescription ? (
          <span className="text-xs leading-relaxed text-slate-500">
            {category.shortDescription}
          </span>
        ) : null}
        <span className="text-brand-primary mt-1 text-sm font-medium transition-opacity hover:opacity-70">
          Ver todos →
        </span>
      </div>
    </Link>
  );
}

'use client';

import { Container } from '@/shared/components/custom-ui/Container';

import type { Category } from '../types/category-navigation.types';
import { MegaMenuCategoryCard } from './MegaMenuCategoryCard';
import { MegaMenuColumn } from './MegaMenuColumn';

interface MegaMenuDesktopProps {
  category: Category;
  onNavigate?: () => void;
}

export function MegaMenuDesktop({ category, onNavigate }: MegaMenuDesktopProps) {
  return (
    <div className="absolute top-full left-0 w-full border-b border-slate-200/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <Container size="container" className="px-4 py-10 lg:max-w-4xl!">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(220px,0.75fr)]">
          <div className="grid gap-8">
            <div className="grid gap-8 md:grid-cols-3">
              {category.groups.map((group) => (
                <MegaMenuColumn
                  key={group.id}
                  group={group}
                  categorySlug={category.slug}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>

          <MegaMenuCategoryCard category={category} onNavigate={onNavigate} />
        </div>
      </Container>
    </div>
  );
}

'use client';

import { NavigationLink } from '../shared/NavigationLink';
import type { NavigationGroup } from '../types/category-navigation.types';
import { buildCategoryNavigationUrl } from '../utils/buildCategoryNavigationUrl';

interface MegaMenuColumnProps {
  group: NavigationGroup;
  categorySlug: string;
  onNavigate?: () => void;
}

export function MegaMenuColumn({ group, categorySlug, onNavigate }: MegaMenuColumnProps) {
  return (
    <div>
      <h3 className="text-[0.72rem] font-semibold text-slate-500 uppercase">{group.name}</h3>
      <ul className="mt-4 space-y-3">
        {group.items.map((item) => (
          <li key={item.id}>
            <NavigationLink
              href={buildCategoryNavigationUrl(categorySlug, item.slug)}
              onNavigate={onNavigate}
            >
              {item.name}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

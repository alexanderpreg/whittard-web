import { cn } from '@/lib/utils';
import {
  Apple,
  Baby,
  Clover,
  Gift,
  Globe,
  Leaf,
  Package,
  Sparkles,
  Wheat,
  Wine,
} from 'lucide-react';

const tagRegistry: Record<string, React.ComponentType<{ className?: string }>> = {
  teabags: Package,
  vegan: Clover,
  vegetarian: Leaf,
  gift_messaging: Gift,
  organic: Globe,
  gluten_free: Wheat,
  dairy_free: Wine,
  nut_free: Apple,
  kosher: Sparkles,
  baby_suitable: Baby,
};

interface ProductAttributeBadgesProps {
  tags: string[];
  className?: string;
}

export function ProductAttributeBadges({ tags, className }: ProductAttributeBadgesProps) {
  if (!tags.length) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => {
        const Icon = tagRegistry[tag];
        if (!Icon) return null;

        return (
          <span
            key={tag}
            className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white"
            aria-label={tag}
            title={tag}
          >
            <Icon className="text-brand-secondary size-5" />
          </span>
        );
      })}
    </div>
  );
}

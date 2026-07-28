'use client';

import { cn } from '@/lib/utils';

interface FilterGroupProps {
  title: string;
  items: Array<{
    label: string;
    value: string;
    count: number;
    checked: boolean;
  }>;
  onToggle: (value: string) => void;
}

export function FilterGroup({ title, items, onToggle }: FilterGroupProps) {
  return (
    <section className="space-y-3">
      <h3 className="font-brand-elephant border-b border-gray-200 pb-2 text-lg text-gray-800">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={item.value}
            className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onToggle(item.value)}
              className="border-brand-primary/30 size-4 rounded-sm"
            />
            <span className={cn('leading-tight', item.checked && 'font-medium text-gray-900')}>
              {item.label} <span className="text-gray-400">({item.count})</span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

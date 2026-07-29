'use client';

import { cn } from '@/lib/utils/shadcn-cn';
import type { DeliveryMethod, DeliveryMethodType } from '../types/checkout';

interface DeliverySelectorProps {
  methods: DeliveryMethod[];
  selected: DeliveryMethodType;
  onChange: (value: DeliveryMethodType) => void;
}

export function DeliverySelector({ methods, selected, onChange }: DeliverySelectorProps) {
  return (
    <div className="border-brand-200 flex overflow-hidden rounded-lg border">
      {methods.map((method) => {
        const isSelected = selected === method.id;
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id as DeliveryMethodType)}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all',
              isSelected
                ? 'bg-brand-primary text-white'
                : 'text-brand-secondary hover:text-brand-primary bg-white',
            )}
          >
            {method.name}
          </button>
        );
      })}
    </div>
  );
}

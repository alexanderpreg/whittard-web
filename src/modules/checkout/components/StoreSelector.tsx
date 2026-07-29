'use client';

import { Clock, MapPin } from 'lucide-react';

import { cn } from '@/lib/utils/shadcn-cn';
import type { PickupStore } from '../types/checkout';

interface StoreSelectorProps {
  stores: PickupStore[];
  selected: PickupStore;
  onChange: (store: PickupStore) => void;
}

export function StoreSelector({ stores, selected, onChange }: StoreSelectorProps) {
  return (
    <div className="space-y-2">
      {stores.map((store) => {
        const isSelected = selected.id === store.id;
        return (
          <button
            key={store.id}
            type="button"
            onClick={() => onChange(store)}
            className={cn(
              'flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all',
              isSelected
                ? 'border-brand-primary bg-brand-primary/[0.03]'
                : 'border-brand-200 hover:border-brand-secondary',
            )}
          >
            <span
              className={cn(
                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                isSelected ? 'border-brand-primary bg-brand-primary' : 'border-brand-400',
              )}
            >
              {isSelected && <span className="size-2 rounded-full bg-white" />}
            </span>
            <div className="flex-1">
              <p className="text-brand-primary text-sm font-semibold">{store.name}</p>
              <div className="mt-1 space-y-0.5">
                <div className="text-brand-secondary flex items-start gap-1.5 text-xs">
                  <MapPin className="mt-0.5 size-3 shrink-0" />
                  <span>{store.address}</span>
                </div>
                <div className="text-brand-secondary flex items-start gap-1.5 text-xs">
                  <Clock className="mt-0.5 size-3 shrink-0" />
                  <span>{store.schedule}</span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

'use client';

import { Clock, MapPin } from 'lucide-react';

import type { PickupStore } from '../types/checkout';

interface StoreInfoCardProps {
  store: PickupStore;
}

export function StoreInfoCard({ store }: StoreInfoCardProps) {
  return (
    <div className="border-brand-200 bg-brand-100/50 rounded-lg border p-4">
      <p className="text-brand-primary mb-2 font-semibold">{store.name}</p>
      <div className="space-y-1.5">
        <div className="text-brand-secondary flex items-start gap-2 text-xs">
          <MapPin className="mt-0.5 size-3.5 shrink-0" />
          <span>{store.address}</span>
        </div>
        <div className="text-brand-secondary flex items-start gap-2 text-xs">
          <Clock className="mt-0.5 size-3.5 shrink-0" />
          <span>{store.schedule}</span>
        </div>
      </div>
    </div>
  );
}

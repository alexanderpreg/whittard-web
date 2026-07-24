'use client';

import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
  className?: string;
}

export function QuantitySelector({ quantity, max, onChange, className }: QuantitySelectorProps) {
  return (
    <div className={cn('flex items-center gap-0', className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        className="border-brand-primary/30 text-brand-primary flex h-10 w-10 cursor-pointer items-center justify-center border-y border-l transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Reducir cantidad"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <div className="border-brand-primary/30 flex h-10 w-14 items-center justify-center border-y text-sm font-medium">
        {quantity}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="border-brand-primary/30 text-brand-primary flex h-10 w-10 cursor-pointer items-center justify-center border-y border-r transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Aumentar cantidad"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

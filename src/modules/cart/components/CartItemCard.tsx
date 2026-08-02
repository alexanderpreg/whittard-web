'use client';

import { formatCurrency } from '@/lib/utils';
import { QuantitySelector } from '@/modules/products/components/hero/QuantitySelector';
import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Trash2 } from 'lucide-react';
import type { CartItem } from '../types/cart';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const unitPrice = item.promoPrice ?? item.unitPrice;

  return (
    <article className="flex flex-col gap-4 border-b border-gray-200 p-4 last:border-b-0 md:grid md:grid-cols-[auto_auto_auto] md:items-center md:gap-6 md:py-5">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-gray-200 bg-white">
          <AppImage
            src={item.image}
            alt={item.name}
            fill
            sizes="96px"
            className="object-cover"
            skeleton={false}
          />
        </div>

        <div className="min-w-0 space-y-1">
          <h2 className="text-sm leading-snug font-medium text-gray-800 md:text-base">
            {item.name}
          </h2>
          <p className="text-xs text-gray-500">SKU: {item.sku}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <QuantitySelector
          quantity={item.quantity}
          max={item.stock}
          onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
        />
        <span className="text-sm font-medium whitespace-nowrap text-emerald-700">En Stock</span>
      </div>

      <div className="flex items-center justify-start gap-4 md:justify-end">
        <p className="text-base font-bold text-gray-900 md:w-24 md:text-right">
          {formatCurrency(unitPrice * item.quantity)}
        </p>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          title="Eliminar Producto"
          className="shrink-0 text-gray-400 transition-colors hover:text-red-500"
          aria-label={`Eliminar ${item.name}`}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}

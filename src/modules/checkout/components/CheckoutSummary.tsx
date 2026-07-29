'use client';

import { formatCurrency } from '@/lib/utils';
import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Button } from '@/shared/components/shadcn-ui/button';
import { Separator } from '@/shared/components/shadcn-ui/separator';
import { MOCK_PAYMENT_METHODS } from '../mocks/checkout.mock';
import type { CheckoutSummaryData, DeliveryMethodType } from '../types/checkout';

interface CheckoutSummaryProps {
  summary: CheckoutSummaryData;
  deliveryMethod: DeliveryMethodType;
  hideButton?: boolean;
}

export function CheckoutSummary({
  summary,
  deliveryMethod,
  hideButton = false,
}: CheckoutSummaryProps) {
  return (
    <aside className="sticky top-24 w-full space-y-5">
      <h2 className="font-brand-elephant text-brand-primary text-lg md:text-xl">
        Resumen de Compra
      </h2>

      <div className="divide-brand-200 divide-y">
        {summary.items.map((item) => (
          <div key={item.id} className="flex gap-3 py-3">
            <AppImage
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              skeleton={false}
              className="size-14 shrink-0 rounded-md object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
              <p className="text-brand-primary truncate text-sm font-medium">{item.name}</p>
              <p className="text-brand-secondary text-xs">Cantidad: {item.quantity}</p>
              <p className="text-brand-primary text-sm font-semibold">
                {formatCurrency(item.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm">
        <div className="text-brand-secondary flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(summary.subtotal)}</span>
        </div>
        <div className="text-brand-secondary flex items-center justify-between">
          <span>Delivery</span>
          <span>
            {deliveryMethod === 'pickup' ? (
              <span className="text-brand-quaternary">S/ 0.00</span>
            ) : (
              formatCurrency(summary.delivery)
            )}
          </span>
        </div>
        {summary.discount > 0 && (
          <div className="text-brand-highlight flex items-center justify-between">
            <span>Descuento</span>
            <span>-{formatCurrency(summary.discount)}</span>
          </div>
        )}
        <Separator />
        <div className="text-brand-primary flex items-center justify-between font-semibold">
          <span>Total</span>
          <span className="text-base">{formatCurrency(summary.total)}</span>
        </div>
      </div>

      {!hideButton && (
        <Button
          type="submit"
          className="bg-brand-primary hover:bg-brand-primary/90 h-12 w-full rounded-xs text-sm font-semibold tracking-wider text-white uppercase"
        >
          PAGAR
        </Button>
      )}

      {deliveryMethod === 'delivery' && (
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          {MOCK_PAYMENT_METHODS.map((method) => (
            <span
              key={method.id}
              className="bg-brand-100 text-brand-secondary rounded-md px-3 py-1 text-[11px]"
            >
              {method.name}
            </span>
          ))}
        </div>
      )}
    </aside>
  );
}

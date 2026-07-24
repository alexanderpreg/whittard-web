'use client';

import { formatCurrency } from '@/lib/utils';
import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Button } from '@/shared/components/shadcn-ui/button';
import { footerPayments } from '@/shared/layouts/footer/footer.data';

interface OrderSummaryProps {
  subtotal: number;
  delivery: number;
  total: number;
}

export function OrderSummary({ subtotal, delivery, total }: OrderSummaryProps) {
  return (
    <aside className="w-full space-y-4">
      <div className="text-brand-primary space-y-3 text-base">
        <div className="flex items-center justify-between">
          <span>Subtotal:</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery:</span>
          <span className="font-semibold">{formatCurrency(delivery)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-300 pt-3 text-base">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">{formatCurrency(total)}</span>
        </div>
      </div>

      <Button
        type="button"
        className="bg-brand-primary hover:bg-brand-primary/90 h-12 w-full rounded-xs text-white"
      >
        PAGAR
      </Button>

      <div className="flex w-full flex-wrap items-center justify-center gap-2.5">
        {footerPayments.map((payment) => (
          <span key={payment.label} className="flex h-full w-fit items-center">
            <AppImage
              src={payment.icon}
              alt={payment.label}
              width={155}
              height={60}
              skeleton={false}
              className="h-auto w-10 object-contain"
            />
          </span>
        ))}
      </div>
    </aside>
  );
}

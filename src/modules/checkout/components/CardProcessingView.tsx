'use client';

import { CreditCard, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { formatCurrency } from '@/lib/utils';
import { Button } from '@/shared/components/shadcn-ui/button';
import type { CheckoutSummaryData } from '../types/checkout';

interface CardProcessingViewProps {
  summary: CheckoutSummaryData;
}

export function CardProcessingView({ summary }: CardProcessingViewProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const processPayment = useCallback(() => {
    setProcessing(true);
    setTimeout(() => router.push('/checkout/success'), 2000);
  }, [router]);

  return (
    <div className="space-y-8">
      <div className="border-brand-200 bg-brand-100/30 rounded-lg border p-6 text-center">
        <CreditCard className="text-brand-primary mx-auto mb-3 size-10" />
        <p className="text-brand-secondary text-sm">
          Vamos a procesar el pago de{' '}
          <span className="text-brand-primary font-semibold">{formatCurrency(summary.total)}</span>{' '}
          con tu tarjeta.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="h-12 flex-1 rounded-xs"
        >
          Volver
        </Button>
        <Button
          type="button"
          onClick={processPayment}
          disabled={processing}
          className="bg-brand-primary hover:bg-brand-primary/90 h-12 flex-1 rounded-xs text-white"
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <Loader className="size-4 animate-spin" />
              Procesando...
            </span>
          ) : (
            `Pagar ${formatCurrency(summary.total)}`
          )}
        </Button>
      </div>
    </div>
  );
}

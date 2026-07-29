'use client';

import { Building2, CreditCard } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils/shadcn-cn';
import type { CheckoutSchemaType } from '../schema/checkout-schema';
import type { PaymentOption } from '../types/checkout';

interface PaymentCardProps {
  methods: PaymentOption[];
}

const PAYMENT_ICONS: Record<string, React.ReactNode> = {
  card: <CreditCard className="size-4" />,
  transfer: <Building2 className="size-4" />,
};

export function PaymentCard({ methods }: PaymentCardProps) {
  const { watch, setValue } = useFormContext<CheckoutSchemaType>();
  const selected = watch('payment.method');

  return (
    <div className="space-y-2">
      {methods.map((method) => {
        const isSelected = selected === method.id;
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => setValue('payment.method', method.id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all',
              isSelected
                ? 'border-brand-primary bg-brand-primary/[0.03]'
                : 'border-brand-200 hover:border-brand-secondary',
            )}
          >
            <span
              className={cn(
                'flex size-5 items-center justify-center rounded-full border-2 transition-colors',
                isSelected ? 'border-brand-primary bg-brand-primary' : 'border-brand-400',
              )}
            >
              {isSelected && <span className="size-2 rounded-full bg-white" />}
            </span>
            <span className="text-brand-primary flex items-center gap-2 text-sm font-medium">
              {PAYMENT_ICONS[method.id]}
              {method.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

'use client';

import { useFormContext } from 'react-hook-form';

import { Textarea } from '@/shared/components/shadcn-ui/textarea';
import type { CheckoutSchemaType } from '../schema/checkout-schema';

export function AdditionalInformationCard() {
  const { register } = useFormContext<CheckoutSchemaType>();

  return (
    <Textarea
      {...register('notes')}
      placeholder="Observaciones para el pedido."
      className="min-h-20"
    />
  );
}

import { CheckoutStepTwoView } from '@/modules/checkout/CheckoutStepTwoView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pago — Whittard',
  description: 'Completa el pago de tu pedido en Whittard Perú.',
};

export default function CheckoutStepTwoPage() {
  return <CheckoutStepTwoView />;
}

import { CheckoutView } from '@/modules/checkout/CheckoutView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout — Whittard',
  description: 'Completa tu compra en Whittard Perú.',
};

export default function CheckoutPage() {
  return <CheckoutView />;
}

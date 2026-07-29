import { CheckoutSuccessView } from '@/modules/checkout/CheckoutSuccessView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compra Exitosa — Whittard',
  description: 'Tu compra en Whittard Perú se ha registrado correctamente.',
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessView />;
}

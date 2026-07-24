import { CartView } from '@/modules/cart/CartView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrito — Whittard',
  description: 'Revisa los productos de tu cesta y continúa con el pago.',
};

export default function CartPage() {
  return <CartView />;
}

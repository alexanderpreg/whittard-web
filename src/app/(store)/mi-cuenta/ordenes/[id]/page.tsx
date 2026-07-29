import { ProfileOrderDetailView } from '@/modules/mi-cuenta/ProfileOrderDetailView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detalle de Pedido — Whittard',
  description: 'Revisa la información detallada de tu pedido en Whittard Perú.',
};

export default function OrderDetailPage() {
  return <ProfileOrderDetailView />;
}

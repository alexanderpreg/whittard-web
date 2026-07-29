import { ProfileOrdersView } from '@/modules/mi-cuenta/ProfileOrdersView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mis Órdenes — Whittard',
  description: 'Revisa el historial de tus pedidos en Whittard Perú.',
};

export default function OrdenesPage() {
  return <ProfileOrdersView />;
}

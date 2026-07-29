import { ProfileAddressView } from '@/modules/mi-cuenta/ProfileAddressView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dirección — Whittard',
  description: 'Administra tus direcciones de entrega en Whittard Perú.',
};

export default function DireccionesPage() {
  return <ProfileAddressView />;
}

import { ProfileDataView } from '@/modules/mi-cuenta/ProfileDataView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi Cuenta — Whittard',
  description: 'Administra tu información personal en Whittard Perú.',
};

export default function MiCuentaPage() {
  return <ProfileDataView />;
}

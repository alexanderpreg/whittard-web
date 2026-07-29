import { ProfileWishlistView } from '@/modules/mi-cuenta/ProfileWishlistView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lista de Deseos — Whittard',
  description: 'Tus productos favoritos en Whittard Perú.',
};

export default function DeseosPage() {
  return <ProfileWishlistView />;
}

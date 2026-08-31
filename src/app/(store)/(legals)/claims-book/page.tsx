import { buildSeoMetadata } from '@/lib/seo';
import { ClaimsBookView } from '@/modules/legals/claims-book/ClaimsBookView';

export const metadata = buildSeoMetadata({
  defaults: {
    title: 'Libro de Reclamaciones',
    description:
      'Registra tu queja o reclamo a través del Libro de Reclamaciones de Whittard Perú.',
  },
});

export default function Page() {
  return <ClaimsBookView />;
}

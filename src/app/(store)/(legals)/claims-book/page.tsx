import { buildSeoMetadata } from '@/lib/seo';
import { ContentService } from '@/modules/content/services/content.service';
import { LegalPageContent } from '@/modules/content/types/legals';
import { ClaimsBookView } from '@/modules/legals/claims-book/ClaimsBookView';

export const dynamic = 'force-dynamic';

export const metadata = buildSeoMetadata({
  defaults: {
    title: 'Libro de Reclamaciones',
    description:
      'Registra tu queja o reclamo a través del Libro de Reclamaciones de Whittard Perú.',
  },
});

export default async function Page() {
  const content = await ContentService.getPageContent<LegalPageContent>('legal');

  // Ahora content accede directo a la estructura dentro de "data"
  const complaintsData = content['complaints-book'];

  return <ClaimsBookView content={complaintsData} />;
}

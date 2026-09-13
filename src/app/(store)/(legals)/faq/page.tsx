import { buildSeoMetadata } from '@/lib/seo';
import { ContentService } from '@/modules/content/services/content.service';
import { LegalPageContent } from '@/modules/content/types/legals';
import { FaqsView } from '@/modules/legals/faq/FaqView';

export const dynamic = 'force-dynamic';

export const metadata = buildSeoMetadata({
  defaults: {
    title: 'Preguntas Frecuentes',
    description:
      'Resolvemos tus dudas sobre compras, métodos de pago, envíos a provincia y conservación de productos Whittard.',
  },
});

export default async function Page() {
  const content = await ContentService.getPageContent<LegalPageContent>('legal');
  const faqData = content?.faq;

  return <FaqsView faqData={faqData} />;
}

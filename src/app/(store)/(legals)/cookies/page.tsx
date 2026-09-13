import { buildSeoMetadata } from '@/lib/seo';
import { ContentService } from '@/modules/content/services/content.service';
import { LegalPageContent } from '@/modules/content/types/legals';
import { CookiesView } from '@/modules/legals/cookies/CookiesView';

export const dynamic = 'force-dynamic';

export const metadata = buildSeoMetadata({
  defaults: {
    title: 'Política de Cookies',
    description:
      'Información sobre el uso de cookies y tecnologías similares en www.whittardperu.com.',
  },
});

export default async function Page() {
  const content = await ContentService.getPageContent<LegalPageContent>('legal');
  const cookiesData = content['cookie-policy'];

  return (
    <CookiesView
      title={cookiesData?.title}
      subtitle={cookiesData?.subtitle}
      htmlContent={cookiesData?.body ?? ''}
    />
  );
}

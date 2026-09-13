import { buildSeoMetadata } from '@/lib/seo';
import { ContentService } from '@/modules/content/services/content.service';
import { LegalPageContent } from '@/modules/content/types/legals';
import { PrivacyPolicyView } from '@/modules/legals/privacy-policy/PrivacyPolicyView';

export const dynamic = 'force-dynamic';

export const metadata = buildSeoMetadata({
  defaults: {
    title: 'Políticas de Privacidad',
    description:
      'Política de privacidad de Whittard Perú conforme a la Ley N.° 29733 de Protección de Datos Personales.',
  },
});

export default async function PrivacyPolicyPage() {
  const content = await ContentService.getPageContent<LegalPageContent>('legal');
  const privacyData = content['privacy-policy'];

  return (
    <PrivacyPolicyView
      title={privacyData?.title}
      subtitle={privacyData?.subtitle}
      htmlContent={privacyData?.body ?? ''}
    />
  );
}

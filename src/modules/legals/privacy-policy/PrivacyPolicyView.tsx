// modules/legals/privacy-policy/PrivacyPolicyView.tsx
import { Container } from '@/shared/components/custom-ui/Container';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';

export interface PrivacyPolicyViewProps {
  htmlContent?: string;
}

export function PrivacyPolicyView({ htmlContent }: PrivacyPolicyViewProps) {
  return (
    <Container as="main" size="full" className="mb-12 flex-1">
      <PageHeroBanner title="Políticas de Privacidad" imageUrl="/banner-static.png" />

      <Container className="mt-14 mb-14">
        <div
          className="rich-text-legal mx-auto max-w-3xl"
          // El fallback || '' asegura que React siempre reciba un string
          dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        />
      </Container>
    </Container>
  );
}

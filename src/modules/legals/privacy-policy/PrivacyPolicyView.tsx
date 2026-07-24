// modules/legals/privacy-policy/PrivacyPolicyView.tsx
import { Container } from '@/shared/components/custom-ui/Container';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';

export interface PrivacyPolicyViewProps {
  htmlContent?: string;
}

export function PrivacyPolicyView({ htmlContent }: PrivacyPolicyViewProps) {
  return (
    <Container as="main" size="full" className="mb-14 flex-1 space-y-14">
      <PageHeroBanner title="Políticas de Privacidad" imageUrl="/banner-static.png" />

      <Container>
        <div
          className="rich-text-legal"
          // El fallback || '' asegura que React siempre reciba un string
          dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        />
      </Container>
    </Container>
  );
}

// modules/legals/privacy-policy/PrivacyPolicyView.tsx
import { Container } from '@/shared/components/custom-ui/Container';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';
import { RichText } from '@/shared/components/custom-ui/rich-text';

export interface PrivacyPolicyViewProps {
  htmlContent?: string;
}

export function PrivacyPolicyView({ htmlContent }: PrivacyPolicyViewProps) {
  return (
    <Container as="main" size="full" className="mb-14 flex-1 space-y-14">
      <PageHeroBanner title="Políticas de Privacidad" imageUrl="/banner-static.png" />

      <Container>
        <RichText html={htmlContent} className="text-justify" />
      </Container>
    </Container>
  );
}

// modules/legals/privacy-policy/PrivacyPolicyView.tsx
import { Container } from '@/shared/components/custom-ui/Container';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';
import { RichText } from '@/shared/components/custom-ui/rich-text';
import { Text } from '@/shared/components/custom-ui/Text';

export interface PrivacyPolicyViewProps {
  title?: string;
  subtitle?: string;
  htmlContent?: string;
}

export function PrivacyPolicyView({ title, subtitle, htmlContent }: PrivacyPolicyViewProps) {
  return (
    <Container as="main" size="full" className="mb-14 flex-1 space-y-14">
      <PageHeroBanner title={title || 'Políticas de Privacidad'} imageUrl="/banner-static.png" />

      <Container className="space-y-6">
        {subtitle && (
          <Text variant="body" className="text-brand-secondary text-base font-medium italic">
            {subtitle}
          </Text>
        )}

        <RichText html={htmlContent} className="text-justify" />
      </Container>
    </Container>
  );
}

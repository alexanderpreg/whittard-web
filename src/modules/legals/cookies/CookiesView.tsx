import { Container } from '@/shared/components/custom-ui/Container';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';
import { RichText } from '@/shared/components/custom-ui/rich-text';
import { Text } from '@/shared/components/custom-ui/Text';

export interface CookiesViewProps {
  title?: string;
  subtitle?: string;
  htmlContent?: string;
}

export function CookiesView({ title, subtitle, htmlContent }: CookiesViewProps) {
  return (
    <Container as="main" size="full" className="mb-14 flex-1 space-y-14">
      <PageHeroBanner title={title || 'Política de Cookies'} imageUrl="/banner-static.png" />

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

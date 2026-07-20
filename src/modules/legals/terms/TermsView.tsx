// modules/legals/terms/TermsView.tsx
import { Container } from '@/shared/components/custom-ui/Container';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';

export interface TermsViewProps {
  htmlContent?: string;
}

export function TermsView({ htmlContent }: TermsViewProps) {
  return (
    <Container as="main" size="full" className="mb-12 flex-1">
      <PageHeroBanner title="Términos y Condiciones" imageUrl="/banner-static.png" />

      <Container className="mt-14 mb-14">
        <div
          className="rich-text-legal mx-auto max-w-3xl"
          dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        />
      </Container>
    </Container>
  );
}

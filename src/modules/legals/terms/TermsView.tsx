// modules/legals/terms/TermsView.tsx
import { Container } from '@/shared/components/custom-ui/Container';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';

export interface TermsViewProps {
  htmlContent?: string;
}

export function TermsView({ htmlContent }: TermsViewProps) {
  return (
    <Container as="main" size="full" className="mb-14 flex-1 space-y-14">
      <PageHeroBanner title="Términos y Condiciones" imageUrl="/banner-static.png" />

      <Container>
        <div className="rich-text-legal" dangerouslySetInnerHTML={{ __html: htmlContent || '' }} />
      </Container>
    </Container>
  );
}

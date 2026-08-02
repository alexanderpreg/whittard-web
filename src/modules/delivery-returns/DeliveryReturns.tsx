import { Container } from '@/shared/components/custom-ui/Container';
import type { BreadcrumbItemType } from '@/shared/components/custom-ui/PageBreadcrumb';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';
import { DeliveryTabs } from './components/DeliveryTabs';

const BREADCRUMB_ITEMS: BreadcrumbItemType[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Delivery & Devoluciones' },
];

export function DeliveryAndReturnsView() {
  return (
    <Container as="main" size="full" className="mb-8 flex-1">
      <PageHeroBanner title="Delivery & Devoluciones" imageUrl="/banner-static.png" />

      <Container className="mt-10">
        <PageBreadcrumb items={BREADCRUMB_ITEMS} className="mb-8" />
        <DeliveryTabs />
      </Container>
    </Container>
  );
}

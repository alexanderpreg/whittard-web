import { toProductCardDataList } from '@/modules/products/mappers/product-card.mapper';
import type { ProductDetail } from '@/modules/products/types/catalog';
import { getRelatedCards } from '@/modules/products/utils/product-detail';
import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { ProductHero } from './components/hero/ProductHero';
import { ProductCarousel } from './components/product-carousel/ProductCarousel';

interface DetailProductViewProps {
  product: ProductDetail;
}

export function DetailProductView({ product }: DetailProductViewProps) {
  const relatedProducts = toProductCardDataList(getRelatedCards(product));
  const parent = product.category?.parent;

  const categoryPath = [parent?.slug, product.category?.slug].filter(Boolean).join('/');

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    ...(parent ? [{ label: parent.name, href: `/catalogo/${parent.slug}` }] : []),
    ...(product.category
      ? [{ label: product.category.name, href: `/catalogo/${categoryPath}` }]
      : []),
    { label: product.name },
  ];

  return (
    <Container as="main" className="py-6 md:py-10">
      <PageBreadcrumb items={breadcrumbItems} className="mb-6" />

      <ProductHero product={product} />

      {relatedProducts.length > 0 && (
        <ProductCarousel products={relatedProducts} title="También te puede gustar" />
      )}
    </Container>
  );
}

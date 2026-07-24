import type { ProductCardData } from '@/modules/products/types/productCard';
import type { ProductDetail } from '@/modules/products/types/productDetail';
import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { ProductHero } from './components/hero/ProductHero';
import { ProductCarousel } from './components/product-carousel/ProductCarousel';
import { MOCK_PRODUCTS } from './mocks/productDetail.mock';

function toCardData(product: ProductDetail): ProductCardData {
  const firstOptionId = product.variantGroups?.[0]?.options?.[0]?.id;

  return {
    productId: product.id,
    variantId: firstOptionId ?? product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    promoPrice: product.promoPrice,
    stock: product.stock,
    image: product.images[0]?.url ?? '',
    rating: product.rating,
  };
}

interface DetailProductViewProps {
  product: ProductDetail;
}

export function DetailProductView({ product }: DetailProductViewProps) {
  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).map(toCardData);

  return (
    <Container as="main" className="py-6 md:py-10">
      <PageBreadcrumb
        items={[
          { label: 'Inicio', href: '/' },
          { label: product.category, href: '/' },
          { label: product.name },
        ]}
        className="mb-6"
      />

      <ProductHero product={product} />

      {relatedProducts.length > 0 && (
        <>
          <ProductCarousel products={relatedProducts} title="También te puede gustar" />
        </>
      )}
    </Container>
  );
}

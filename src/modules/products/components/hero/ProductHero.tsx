import type { ProductDetail } from '@/modules/products/types/productDetail';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';

interface ProductHeroProps {
  product: ProductDetail;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <div className="mb-20 grid gap-8 md:grid-cols-2 md:gap-12">
      <ProductGallery images={product.images} />
      <ProductInfo product={product} />
    </div>
  );
}

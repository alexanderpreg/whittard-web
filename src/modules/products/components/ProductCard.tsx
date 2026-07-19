import { formatCurrency } from '@/lib/utils';
import type { ProductCardData } from '@/modules/products/types/productCard';
import { AppImage } from '@/shared/components/custom-ui/app-image';
import Link from 'next/link';
import { Stars } from './Starts';

interface ProductCardProps {
  product: ProductCardData;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasPromo = product.promoPrice !== null;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Link href={`/producto/${product.slug}`} className="group flex h-full flex-col gap-3">
      <div className="border-brand-primary/50 relative aspect-square w-full overflow-hidden rounded-xs border">
        <AppImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className="h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
          skeleton={false}
          fallback={
            <div className="flex size-full items-center justify-center p-4 text-center text-xs font-medium">
              Error imagen {product.name}
            </div>
          }
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <span className="line-clamp-2 text-sm leading-tight font-medium text-gray-800">
          {product.name}
        </span>

        <div className="flex items-center gap-2">
          {hasPromo ? (
            <>
              <span className="text-sm font-bold text-red-600">
                {formatCurrency(product.promoPrice!)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-900">{formatCurrency(product.price)}</span>
          )}
        </div>
        <Stars rating={product.rating} />

        {lowStock && (
          <span className="text-xs font-medium text-orange-600">¡Solo quedan {product.stock}!</span>
        )}

        {product.stock === 0 && <span className="text-xs font-medium text-red-600">Agotado</span>}
      </div>
    </Link>
  );
}

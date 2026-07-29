'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { cn, formatCurrency } from '@/lib/utils';
import type { ProductCardData } from '@/modules/products/types/productCard';
import { AppImage } from '@/shared/components/custom-ui/app-image';
import { useFavorites } from '../hooks/useFavorites';
import { Stars } from './Starts';

interface ProductCardProps {
  product: ProductCardData;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleAsync, isFavorite } = useFavorites();
  const active = isFavorite(product.productId, product.variantId);
  const hasPromo = product.promoPrice !== null;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <article className="group flex h-full flex-col gap-3">
      <div className="relative">
        <Link href={`/producto/${product.slug}`} className="block">
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
        </Link>

        <button
          type="button"
          onClick={() => {
            const wasFavorite = active;
            const item = {
              productId: product.productId,
              variantId: product.variantId,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
            };
            toast.promise(toggleAsync(item), {
              loading: wasFavorite ? 'Eliminando de favoritos...' : 'Guardando en favoritos...',
              success: () =>
                wasFavorite
                  ? `${product.name} se eliminó de favoritos`
                  : `${product.name} se agregó a favoritos`,
              error: 'Error al actualizar favoritos',
            });
          }}
          className="absolute top-2 right-2 z-10 flex size-8 items-center justify-center rounded-full bg-white/80 shadow-xs transition-colors hover:bg-white"
          aria-label={active ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            className={cn(
              'size-4',
              active
                ? 'fill-red-500 text-red-500'
                : 'text-brand-primary hover:fill-red-500 hover:text-red-500',
            )}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/producto/${product.slug}`} className="block">
          <span className="line-clamp-2 text-sm leading-tight font-medium text-gray-800">
            {product.name}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {hasPromo ? (
            <>
              <span className="text-brand-primary text-sm font-bold">
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

      {product.stock > 0 && (
        <button
          type="button"
          className="bg-brand-primary hover:border-brand-primary inline-flex h-10 items-center justify-center border border-gray-300 px-3 py-2 text-sm font-medium text-white opacity-100 transition-colors md:mt-auto md:border-0 md:px-0 md:py-0 md:text-left md:opacity-0 md:group-hover:opacity-100"
        >
          Agregar al carrito
        </button>
      )}
    </article>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { DEFAULT_PRODUCT_IMAGE } from '@/modules/products/constants';
import { useFavorites } from '@/modules/products/hooks/useFavorites';
import type { StorefrontProductDetail } from '@/modules/products/types/storefront';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  product: StorefrontProductDetail;
  variantId: string;
  className?: string;
}

export function FavoriteButton({ product, variantId, className }: FavoriteButtonProps) {
  const { toggleAsync, isFavorite } = useFavorites();
  const active = isFavorite(product.id, variantId);
  const primaryVariant =
    product.variants?.find((variant) => variant.id === variantId) ??
    product.variants?.find((variant) => variant.is_primary) ??
    product.variants?.[0];

  return (
    <button
      type="button"
      onClick={() => {
        const wasFavorite = isFavorite(product.id, variantId);
        const item = {
          productId: product.id,
          variantId,
          slug: product.slug,
          name: product.name,
          price: primaryVariant?.effective_price ?? primaryVariant?.price ?? 0,
          image:
            primaryVariant?.media?.find((media) => media.type === 'IMAGE')?.url ??
            DEFAULT_PRODUCT_IMAGE,
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
      className={cn(
        'flex h-10 w-10 cursor-pointer items-center justify-center p-0! hover:bg-transparent!',
        'hover:bg-gray-100',
        className,
      )}
      aria-label={active ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart
        className={cn(
          'size-6',
          active
            ? 'fill-red-500 text-red-500'
            : 'text-brand-primary hover:fill-red-500 hover:text-red-500',
        )}
      />
    </button>
  );
}

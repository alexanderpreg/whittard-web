'use client';

import { cn } from '@/lib/utils';
import { useFavorites } from '@/modules/products/hooks/useFavorites';
import type { ProductDetail } from '@/modules/products/types/productDetail';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  product: ProductDetail;
  variantId: string;
  className?: string;
}

export function FavoriteButton({ product, variantId, className }: FavoriteButtonProps) {
  const { toggleAsync, isFavorite } = useFavorites();
  const active = isFavorite(product.id, variantId);

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
          price: product.price,
          image: product.images[0]?.url ?? '',
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

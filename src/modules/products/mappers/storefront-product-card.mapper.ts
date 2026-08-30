import { DEFAULT_PRODUCT_IMAGE } from '../constants';
import type { ProductCardData } from '../types/productCard';
import type { StorefrontProductCard } from '../types/storefront';

/**
 * Mapea la tarjeta del catálogo del backend al modelo de vista del frontend.
 *
 * Reglas del spec:
 * - `default_variant` es la única fuente de precio, oferta, stock e imágenes.
 * - `effective_price` = precio final a cobrar; `price` se tacha cuando hay oferta.
 * - `available_stock` = stock - reserved_qty; `in_stock: false` no oculta el producto.
 */
export function toProductCardData(card: StorefrontProductCard): ProductCardData {
  const variant = card.default_variant;

  const onSale =
    variant.on_sale &&
    variant.effective_price !== null &&
    variant.price !== null &&
    variant.effective_price < variant.price;

  const effective = variant.effective_price ?? variant.price ?? 0;
  const regular = variant.price ?? effective;

  return {
    productId: card.id,
    variantId: variant.id,
    slug: card.slug,
    name: card.name,
    price: onSale ? regular : effective,
    promoPrice: onSale ? effective : null,
    stock: variant.available_stock,
    image: variant.image_url ?? DEFAULT_PRODUCT_IMAGE,
    rating: card.rating.avg,
    ratingCount: card.rating.count,
    brand: card.brand,
    category: card.category?.name ?? null,
    badges: card.attributions.map((attribution) => ({
      label: attribution.name,
      imageUrl: attribution.image_url,
    })),
    hoverImage: variant.hover_image_url,
  };
}

export function toProductCardDataList(cards: StorefrontProductCard[]): ProductCardData[] {
  return cards.map(toProductCardData);
}

export interface ProductCardBadge {
  label: string;
  imageUrl?: string | null;
}

export interface ProductCardData {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  price: number;
  /** Precio de oferta (efectivo) en pantalla. `null` cuando no hay oferta vigente. */
  promoPrice: number | null;
  stock: number;
  image: string; // URL de la imagen principal de la tarjeta
  rating: number; // Puntuación promedio de estrellas (ej: 4.7)
  /** Cantidad de reseñas (solo si el backend la entrega). */
  ratingCount?: number;
  brand?: string | null;
  category?: string | null;
  /** Sellos/atributos destacados (ej: 100% Orgánico). */
  badges?: ProductCardBadge[];
  /** Imagen secundaria al hover (si existe). */
  hoverImage?: string | null;
}

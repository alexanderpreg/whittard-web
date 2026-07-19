export interface ProductCardData {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  price: number;
  promoPrice: number | null; // null cuando el producto no está en oferta
  stock: number;
  image: string; // URL de la imagen principal de la tarjeta
  rating: number; // Puntuación promedio de estrellas (ej: 4.7)
}

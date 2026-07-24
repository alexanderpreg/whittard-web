export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  promoPrice: number | null;
  quantity: number;
  stock: number;
}

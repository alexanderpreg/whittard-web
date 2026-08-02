export interface AddToCartPayload {
  productId: string;
  variantId: string;
  sku: string;
  name: string;
  slug: string;
  image: string;
  unitPrice: number;
  promoPrice?: number | null;
  quantity?: number;
  maxQuantity?: number;
  stock?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  sku: string;
  name: string;
  slug: string;
  image: string;
  unitPrice: number;
  promoPrice: number | null;
  quantity: number;
  maxQuantity: number;
  stock: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  currency: string;
  totals: CartTotals;
  updatedAt: string;
}

export const CART_STORAGE_KEY = 'whittard-cart';
export const FREE_SHIPPING_THRESHOLD = 50;
export const DELIVERY_COST = 10;

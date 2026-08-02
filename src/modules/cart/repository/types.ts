import type { AddToCartPayload, Cart, CartItem } from '../types/cart';

export interface ICartRepository {
  get(): Promise<Cart>;
  addItem(payload: AddToCartPayload): Promise<Cart>;
  updateQuantity(productId: string, variantId: string, quantity: number): Promise<Cart>;
  removeItem(productId: string, variantId: string): Promise<Cart>;
  clear(): Promise<void>;
  replace(items: CartItem[]): Promise<Cart>;
}

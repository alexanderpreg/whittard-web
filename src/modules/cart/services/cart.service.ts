import { RemoteCartRepository } from '../repository/remote.repository';
import type { ICartRepository } from '../repository/types';
import type { AddToCartPayload, Cart, CartItem } from '../types/cart';

let currentRepository: ICartRepository | null = null;

export function useRemoteRepository() {
  if (!currentRepository) {
    currentRepository = new RemoteCartRepository();
  }
}

export function resetRepository() {
  currentRepository = null;
}

export const CartService = {
  async addItem(payload: AddToCartPayload): Promise<Cart | null> {
    if (!currentRepository) return null;
    return currentRepository.addItem(payload);
  },

  async updateQuantity(
    productId: string,
    variantId: string,
    quantity: number,
  ): Promise<Cart | null> {
    if (!currentRepository) return null;
    return currentRepository.updateQuantity(productId, variantId, quantity);
  },

  async removeItem(productId: string, variantId: string): Promise<Cart | null> {
    if (!currentRepository) return null;
    return currentRepository.removeItem(productId, variantId);
  },

  async clearCart(): Promise<void> {
    if (!currentRepository) return;
    return currentRepository.clear();
  },

  async replaceCart(items: CartItem[]): Promise<Cart | null> {
    if (!currentRepository) return null;
    return currentRepository.replace(items);
  },

  async sync(): Promise<void> {
    if (!currentRepository) return;
    const remote = await currentRepository.get();
    const store = (await import('../store/cart.store')).useCartStore.getState();
    store.items = remote.items;
    store.totals = remote.totals;
    store.updatedAt = remote.updatedAt;
  },
};

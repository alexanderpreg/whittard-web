import { useCartStore } from '../store/cart.store';
import type { CartItem } from '../types/cart';

export function useCart() {
  const items = useCartStore((state) => state.items);
  const currency = useCartStore((state) => state.currency);
  const totals = useCartStore((state) => state.totals);
  const updatedAt = useCartStore((state) => state.updatedAt);
  const error = useCartStore((state) => state.error);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  return {
    items,
    currency,
    totals,
    updatedAt,
    error,
    isLoading: !isHydrated,
    itemCount: items.reduce((count: number, item: CartItem) => count + item.quantity, 0),
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
}

export function useCartItemCount(): number {
  const items = useCartStore((state) => state.items);
  return items.reduce((count: number, item: CartItem) => count + item.quantity, 0);
}

export function useCartTotals() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity * (item.promoPrice ?? item.unitPrice),
    0,
  );

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 10;
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
}

export function useCartHydrated(): boolean {
  return useCartStore((state) => state.isHydrated);
}

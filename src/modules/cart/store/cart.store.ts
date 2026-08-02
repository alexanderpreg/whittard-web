import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AddToCartPayload, CartItem, CartTotals } from '../types/cart';
import { CART_STORAGE_KEY, DELIVERY_COST, FREE_SHIPPING_THRESHOLD } from '../types/cart';

interface CartState {
  items: CartItem[];
  currency: string;
  updatedAt: string;
  totals: CartTotals;
  isUpdating: boolean;
  error: string | null;
  isHydrated: boolean;

  addItem: (payload: AddToCartPayload) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
}

function calculateTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity * (item.promoPrice ?? item.unitPrice),
    0,
  );
  const discount = 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_COST;
  const tax = 0;
  const total = subtotal - discount + shipping + tax;
  return { subtotal, discount, shipping, tax, total };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      currency: 'PEN',
      updatedAt: new Date().toISOString(),
      totals: { subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0 },
      isUpdating: false,
      error: null,
      isHydrated: false,

      addItem: (payload: AddToCartPayload) => {
        const { items } = get();
        const newId = `${payload.productId}_${payload.variantId}`;
        const existing = items.find((item: CartItem) => item.id === newId);

        const updated = existing
          ? items.map((item: CartItem) =>
              item.id === newId
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + (payload.quantity ?? 1), item.maxQuantity),
                  }
                : item,
            )
          : [
              ...items,
              {
                id: newId,
                productId: payload.productId,
                variantId: payload.variantId,
                sku: payload.sku,
                name: payload.name,
                slug: payload.slug,
                image: payload.image,
                unitPrice: payload.unitPrice,
                promoPrice: payload.promoPrice ?? null,
                quantity: payload.quantity ?? 1,
                maxQuantity: payload.maxQuantity ?? 99,
                stock: payload.stock ?? 99,
              },
            ];

        set({
          items: updated,
          totals: calculateTotals(updated),
          updatedAt: new Date().toISOString(),
          error: null,
        });
      },

      updateQuantity: (productId: string, variantId: string, quantity: number) => {
        const { items } = get();
        const id = `${productId}_${variantId}`;

        if (quantity <= 0) {
          const updated = items.filter((item: CartItem) => item.id !== id);
          set({
            items: updated,
            totals: calculateTotals(updated),
            updatedAt: new Date().toISOString(),
          });
          return;
        }

        const updated = items.map((item: CartItem) =>
          item.id === id ? { ...item, quantity: Math.min(quantity, item.maxQuantity) } : item,
        );
        set({
          items: updated,
          totals: calculateTotals(updated),
          updatedAt: new Date().toISOString(),
        });
      },

      removeItem: (productId: string, variantId: string) => {
        const { items } = get();
        const id = `${productId}_${variantId}`;
        const updated = items.filter((item: CartItem) => item.id !== id);
        set({
          items: updated,
          totals: calculateTotals(updated),
          updatedAt: new Date().toISOString(),
        });
      },

      clearCart: () => {
        set({
          items: [],
          totals: calculateTotals([]),
          updatedAt: new Date().toISOString(),
        });
      },
    }),
    {
      name: CART_STORAGE_KEY,
      partialize: (state) => ({
        items: state.items,
        currency: state.currency,
        updatedAt: state.updatedAt,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.totals = calculateTotals(state.items);
          state.isHydrated = true;
        }
      },
    },
  ),
);

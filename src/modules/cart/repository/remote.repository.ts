import type { AddToCartPayload, Cart, CartItem } from '../types/cart';
import { CART_STORAGE_KEY, DELIVERY_COST, FREE_SHIPPING_THRESHOLD } from '../types/cart';
import type { ICartRepository } from './types';

function calculateTotals(items: CartItem[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * (item.promoPrice ?? item.unitPrice),
    0,
  );
  const discount = 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_COST;
  const tax = 0;
  const total = subtotal - discount + shipping + tax;
  return { subtotal, discount, shipping, tax, total };
}

function toCart(items: CartItem[]): Cart {
  return {
    items,
    currency: 'PEN',
    totals: calculateTotals(items),
    updatedAt: new Date().toISOString(),
  };
}

function toItem(payload: AddToCartPayload): CartItem {
  const qty = payload.quantity ?? 1;
  return {
    id: `${payload.productId}_${payload.variantId}`,
    productId: payload.productId,
    variantId: payload.variantId,
    sku: payload.sku,
    name: payload.name,
    slug: payload.slug,
    image: payload.image,
    unitPrice: payload.unitPrice,
    promoPrice: payload.promoPrice ?? null,
    quantity: qty,
    maxQuantity: payload.maxQuantity ?? 99,
    stock: payload.stock ?? 99,
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const STORAGE_KEY = `${CART_STORAGE_KEY}-remote`;

export class RemoteCartRepository implements ICartRepository {
  private load(): CartItem[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return parsed.items ?? [];
    } catch {
      return [];
    }
  }

  private persist(items: CartItem[]): void {
    const data = { items, currency: 'PEN', updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  async get(): Promise<Cart> {
    await delay(150);
    return toCart(this.load());
  }

  async addItem(payload: AddToCartPayload): Promise<Cart> {
    await delay(200);
    const items = this.load();
    const newId = `${payload.productId}_${payload.variantId}`;
    const existing = items.find((item) => item.id === newId);

    if (existing) {
      existing.quantity = Math.min(
        existing.quantity + (payload.quantity ?? 1),
        existing.maxQuantity,
      );
    } else {
      items.push(toItem(payload));
    }

    this.persist(items);
    return toCart(items);
  }

  async updateQuantity(productId: string, variantId: string, quantity: number): Promise<Cart> {
    await delay(200);
    const items = this.load();
    const id = `${productId}_${variantId}`;
    const existing = items.find((item) => item.id === id);

    if (!existing) return toCart(items);

    if (quantity <= 0) {
      const filtered = items.filter((item) => item.id !== id);
      this.persist(filtered);
      return toCart(filtered);
    }

    existing.quantity = Math.min(quantity, existing.maxQuantity);
    this.persist(items);
    return toCart(items);
  }

  async removeItem(productId: string, variantId: string): Promise<Cart> {
    await delay(150);
    const items = this.load();
    const id = `${productId}_${variantId}`;
    const filtered = items.filter((item) => item.id !== id);
    this.persist(filtered);
    return toCart(filtered);
  }

  async clear(): Promise<void> {
    await delay(100);
    localStorage.removeItem(STORAGE_KEY);
  }

  async replace(items: CartItem[]): Promise<Cart> {
    await delay(200);
    this.persist(items);
    return toCart(items);
  }
}

import type { CartItem } from '../types/cart';

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 'tea-001_default',
    productId: 'tea-001',
    variantId: 'default',
    slug: 'earl-grey-classic',
    name: 'Carrot Cake Flavoured Hot Chocolate',
    sku: '1111111',
    image: '/producto1.png',
    unitPrice: 12.95,
    promoPrice: null,
    quantity: 1,
    maxQuantity: 99,
    stock: 12,
  },
];

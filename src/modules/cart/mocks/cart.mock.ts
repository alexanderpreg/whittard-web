import type { CartItem } from '../types/cart';

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-item-1',
    productId: 'tea-001',
    slug: 'earl-grey-classic',
    name: 'Carrot Cake Flavoured Hot Chocolate',
    sku: '1111111',
    image: '/producto1.png',
    price: 12.95,
    promoPrice: null,
    quantity: 1,
    stock: 12,
  },
];

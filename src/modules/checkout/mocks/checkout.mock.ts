import type {
  CheckoutSummaryData,
  DeliveryMethod,
  PaymentOption,
  PickupStore,
} from '../types/checkout';

export const MOCK_DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: 'delivery',
    name: 'Delivery',
    description: 'Recibe tu pedido en la dirección indicada.',
    price: 10,
  },
  {
    id: 'pickup',
    name: 'Recojo en Tienda',
    description: 'Recoge tu pedido en una tienda.',
    price: 0,
  },
];

export const MOCK_STORES: PickupStore[] = [
  {
    id: 1,
    name: 'Whittard Larcomar',
    address: 'Malecón de la Reserva 610, Miraflores',
    schedule: 'Lunes a Domingo · 10:00 AM - 10:00 PM',
  },
  {
    id: 2,
    name: 'Whittard Jockey Plaza',
    address: 'Av. Javier Prado Este 4200, Santiago de Surco',
    schedule: 'Lunes a Domingo · 10:00 AM - 10:00 PM',
  },
  {
    id: 3,
    name: 'Whittard Plaza San Miguel',
    address: 'Av. La Marina 2450, San Miguel',
    schedule: 'Lunes a Domingo · 11:00 AM - 09:00 PM',
  },
  {
    id: 4,
    name: 'Whittard Plaza San Miguel',
    address: 'Av. La Marina 2450, San Miguel',
    schedule: 'Lunes a Domingo · 11:00 AM - 09:00 PM',
  },
  {
    id: 5,
    name: 'Whittard Plaza San Miguel',
    address: 'Av. La Marina 2450, San Miguel',
    schedule: 'Lunes a Domingo · 11:00 AM - 09:00 PM',
  },
];

export const MOCK_PICKUP_STORE: PickupStore = MOCK_STORES[0];

export const MOCK_PAYMENT_METHODS: PaymentOption[] = [
  { id: 'card', name: 'Tarjeta de Crédito / Débito' },
  { id: 'transfer', name: 'Transferencia Bancaria' },
];

export const MOCK_SUMMARY: CheckoutSummaryData = {
  subtotal: 49.9,
  delivery: 12.9,
  discount: 0,
  total: 62.8,
  items: [
    {
      id: 1,
      name: 'Classic Coffee Flavour Instant',
      image: '/images/product.png',
      quantity: 1,
      price: 49.9,
    },
  ],
};

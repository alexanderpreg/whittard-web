/**
 * Mock Data
 * Checkout Step 1
 */

export const checkoutMock = {
  customer: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    document: '',
    company: '',
  },

  delivery: {
    selected: 'delivery',

    methods: [
      {
        id: 'delivery',
        name: 'Delivery',
        description: 'Recibe tu pedido en la dirección indicada.',
        price: 12.9,
      },
      {
        id: 'pickup',
        name: 'Recojo',
        description: 'Recoge tu pedido en una tienda.',
        price: 0,
      },
    ],
  },

  pickupStore: {
    id: 1,
    name: 'Whittard Larcomar',
    address: 'Malecón de la Reserva 610, Miraflores',
    schedule: 'Lunes a Domingo · 10:00 AM - 10:00 PM',
  },

  address: {
    department: '',
    province: '',
    district: '',
    address: '',
    reference: '',
  },

  payment: {
    selected: 'card',

    methods: [
      {
        id: 'card',
        name: 'Tarjeta de Crédito / Débito',
      },
      {
        id: 'bank-transfer',
        name: 'Transferencia Bancaria',
      },
      {
        id: 'wallet',
        name: 'Yape / Plin',
      },
    ],
  },

  additionalInformation: '',

  summary: {
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
  },
};

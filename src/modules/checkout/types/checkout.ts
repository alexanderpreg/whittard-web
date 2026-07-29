export type DeliveryMethodType = 'delivery' | 'pickup';

export type PaymentType = 'card' | 'transfer';

export interface DeliveryMethod {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface PickupStore {
  id: number;
  name: string;
  address: string;
  schedule: string;
}

export interface PaymentOption {
  id: PaymentType;
  name: string;
}

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: 'dni' | 'ce' | 'ruc';
  documentNumber: string;
  company: string;
}

export interface CheckoutAddress {
  department: string;
  province: string;
  district: string;
  address: string;
  reference: string;
}

export interface CheckoutSummaryItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface CheckoutSummaryData {
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  items: CheckoutSummaryItem[];
}

export interface CheckoutFormData {
  deliveryMethod: DeliveryMethodType;
  customer: CheckoutCustomer;
  address: CheckoutAddress;
  selectedStore: PickupStore;
  payment: {
    method: PaymentType;
  };
  notes: string;
}

export interface LocationItem {
  id: string;
  name: string;
}

export interface Department extends LocationItem {
  provinces: Province[];
}

export interface Province extends LocationItem {
  districts: District[];
}

export type District = LocationItem;

export interface AddressFormData {
  address: string;
  number: string;
  department: string;
  province: string;
  district: string;
  reference: string;
}

export interface PersonalDataFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: string;
  documentNumber: string;
}

export interface AccountMockData {
  personalData: PersonalDataFormData;
}

export type OrderStatus = 'paid' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderProduct {
  id: string;
  name: string;
  sku: string;
  image: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  date: string;
  store: string;
  total: number;
  paymentMethod: string;
  deliveryAddress?: string;
  products: OrderProduct[];
}

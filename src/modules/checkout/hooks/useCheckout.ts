'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCartStore } from '@/modules/cart/store/cart.store';
import { MOCK_PICKUP_STORE } from '../mocks/checkout.mock';
import { checkoutSchema, type CheckoutSchemaType } from '../schema/checkout-schema';
import { loadCheckoutFormData, loadOrderId, saveCheckoutData } from '../store/checkout-storage';
import type { CheckoutFormData, CheckoutSummaryData, PickupStore } from '../types/checkout';

function buildDefaultValues(): CheckoutSchemaType {
  const stored = loadCheckoutFormData();
  if (stored) {
    return {
      deliveryMethod: stored.deliveryMethod,
      customer: {
        ...stored.customer,
        documentType: stored.customer.documentType as 'dni' | 'ce' | 'ruc',
      },
      address: stored.address,
      payment: stored.payment,
      notes: stored.notes,
    };
  }

  return {
    deliveryMethod: 'delivery',
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      documentType: 'dni',
      documentNumber: '',
      company: '',
    },
    address: {
      department: '',
      province: '',
      district: '',
      address: '',
      reference: '',
    },
    payment: { method: 'card' },
    notes: '',
  };
}

function buildSummaryFromCart(deliveryMethod: 'delivery' | 'pickup'): CheckoutSummaryData {
  const { items, totals } = useCartStore.getState();
  const delivery = deliveryMethod === 'pickup' ? 0 : totals.shipping;

  return {
    subtotal: totals.subtotal,
    delivery,
    discount: totals.discount,
    total: totals.subtotal - totals.discount + delivery,
    items: items.map((item, index) => ({
      id: index + 1,
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.promoPrice ?? item.unitPrice,
    })),
  };
}

export function useCheckout() {
  const router = useRouter();

  const form = useForm<CheckoutSchemaType>({
    resolver: standardSchemaResolver(checkoutSchema),
    mode: 'onTouched',
    defaultValues: buildDefaultValues(),
  });

  const { watch, setValue, handleSubmit } = form;
  // eslint-disable-next-line react-hooks/incompatible-library
  const deliveryMethod = watch('deliveryMethod');

  const [selectedStore, setSelectedStoreState] = useState<PickupStore>(() => {
    const stored = loadCheckoutFormData();
    return stored?.selectedStore ?? MOCK_PICKUP_STORE;
  });

  const [summary, setSummary] = useState<CheckoutSummaryData>(() =>
    buildSummaryFromCart(deliveryMethod),
  );

  const refreshSummary = useCallback((method: 'delivery' | 'pickup') => {
    setSummary(buildSummaryFromCart(method));
  }, []);

  const setDeliveryMethod = useCallback(
    (method: 'delivery' | 'pickup') => {
      setValue('deliveryMethod', method);
      refreshSummary(method);
    },
    [setValue, refreshSummary],
  );

  const onContinue = useMemo(
    () =>
      handleSubmit((data) => {
        const formData: CheckoutFormData = {
          ...data,
          selectedStore,
        };
        const existingOrderId = loadOrderId();
        const orderId = existingOrderId ?? 'ORD-1024';
        saveCheckoutData(formData, summary, orderId);
        router.push('/checkout/step-2');
      }),
    [handleSubmit, selectedStore, summary, router],
  );

  return {
    form,
    summary,
    selectedStore,
    setSelectedStore: setSelectedStoreState,
    setDeliveryMethod,
    onContinue,
  };
}

'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { MOCK_PICKUP_STORE, MOCK_SUMMARY } from '../mocks/checkout.mock';
import { checkoutSchema, type CheckoutSchemaType } from '../schema/checkout-schema';
import {
  loadCheckoutFormData,
  loadCheckoutSummary,
  loadOrderId,
  saveCheckoutData,
} from '../store/checkout-storage';
import type { CheckoutFormData, PickupStore } from '../types/checkout';

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

export function useCheckout() {
  const router = useRouter();

  const form = useForm<CheckoutSchemaType>({
    resolver: standardSchemaResolver(checkoutSchema),
    mode: 'onTouched',
    defaultValues: buildDefaultValues(),
  });

  const { watch, setValue, handleSubmit } = form;
  const deliveryMethod = watch('deliveryMethod');

  const [selectedStore, setSelectedStoreState] = useState<PickupStore>(() => {
    const stored = loadCheckoutFormData();
    return stored?.selectedStore ?? MOCK_PICKUP_STORE;
  });

  const [summary, setSummary] = useState(() => {
    const stored = loadCheckoutSummary();
    if (stored) return stored;
    const delivery = deliveryMethod === 'pickup' ? 0 : MOCK_SUMMARY.delivery;
    return {
      ...MOCK_SUMMARY,
      delivery,
      total: MOCK_SUMMARY.subtotal + delivery - MOCK_SUMMARY.discount,
    };
  });

  const refreshSummary = useCallback((method: 'delivery' | 'pickup') => {
    const delivery = method === 'pickup' ? 0 : MOCK_SUMMARY.delivery;
    setSummary({
      ...MOCK_SUMMARY,
      delivery,
      total: MOCK_SUMMARY.subtotal + delivery - MOCK_SUMMARY.discount,
    });
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
        if (!existingOrderId) {
          const orderId = 'ORD-1024';
          saveCheckoutData(formData, summary, orderId);
        } else {
          saveCheckoutData(formData, summary, existingOrderId);
        }
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

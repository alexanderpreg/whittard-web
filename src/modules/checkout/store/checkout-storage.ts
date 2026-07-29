import type { CheckoutFormData, CheckoutSummaryData } from '../types/checkout';

const FORM_DATA_KEY = 'checkout:formData';
const SUMMARY_KEY = 'checkout:summary';
const ORDER_ID_KEY = 'checkout:orderId';

export function saveCheckoutData(
  formData: CheckoutFormData,
  summary: CheckoutSummaryData,
  orderId?: string,
): void {
  try {
    sessionStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
    sessionStorage.setItem(SUMMARY_KEY, JSON.stringify(summary));
    if (orderId) {
      sessionStorage.setItem(ORDER_ID_KEY, orderId);
    }
  } catch {
    /* sessionStorage not available */
  }
}

export function loadCheckoutFormData(): CheckoutFormData | null {
  try {
    const raw = sessionStorage.getItem(FORM_DATA_KEY);
    return raw ? (JSON.parse(raw) as CheckoutFormData) : null;
  } catch {
    return null;
  }
}

export function loadCheckoutSummary(): CheckoutSummaryData | null {
  try {
    const raw = sessionStorage.getItem(SUMMARY_KEY);
    return raw ? (JSON.parse(raw) as CheckoutSummaryData) : null;
  } catch {
    return null;
  }
}

export function loadOrderId(): string | null {
  try {
    return sessionStorage.getItem(ORDER_ID_KEY);
  } catch {
    return null;
  }
}

export function clearCheckoutData(): void {
  try {
    sessionStorage.removeItem(FORM_DATA_KEY);
    sessionStorage.removeItem(SUMMARY_KEY);
    sessionStorage.removeItem(ORDER_ID_KEY);
  } catch {
    /* sessionStorage not available */
  }
}

'use client';

import { Building2, CreditCard, PencilLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';

import { CardProcessingView } from './components/CardProcessingView';
import { CheckoutStepper } from './components/CheckoutStepper';
import { CheckoutSummary } from './components/CheckoutSummary';
import { TransferPaymentView } from './components/TransferPaymentView';
import { loadCheckoutFormData, loadCheckoutSummary } from './store/checkout-storage';
import type { CheckoutFormData, CheckoutSummaryData } from './types/checkout';

const BREADCRUMBS = [
  { label: 'Inicio', href: '/' },
  { label: 'Carrito', href: '/carrito' },
  { label: 'Checkout', href: '/checkout' },
  { label: 'Pago' },
];

const PAYMENT_LABELS: Record<string, { name: string; icon: React.ReactNode }> = {
  card: { name: 'Tarjeta de Crédito / Débito', icon: <CreditCard className="size-4" /> },
  transfer: { name: 'Transferencia Bancaria', icon: <Building2 className="size-4" /> },
};

export function CheckoutStepTwoView() {
  const router = useRouter();
  const [formData] = useState<CheckoutFormData | null>(() => loadCheckoutFormData());
  const [summary] = useState<CheckoutSummaryData | null>(() => loadCheckoutSummary());

  useEffect(() => {
    if (!formData) {
      router.replace('/checkout');
    }
  }, [formData, router]);

  if (!formData || !summary) {
    return null;
  }

  const isCard = formData.payment.method === 'card';
  const currentPayment = PAYMENT_LABELS[formData.payment.method];

  return (
    <Container as="main" className="py-6 md:py-10">
      <PageBreadcrumb items={BREADCRUMBS} className="mb-6" />
      <div className="space-y-8">
        <CheckoutStepper currentStep={2} />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-5 lg:col-span-7 xl:col-span-8">
            <div className="border-brand-200 rounded-lg border bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {currentPayment.icon}
                  <div>
                    <h2 className="text-brand-primary font-semibold">{currentPayment.name}</h2>
                    <p className="text-brand-secondary text-xs">
                      {isCard
                        ? 'Procesaremos tu pago de forma segura'
                        : 'Sigue las instrucciones para completar tu pago'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => router.push('/checkout')}
                  className="text-brand-primary hover:text-brand-secondary flex items-center gap-1 text-xs font-medium transition-colors"
                >
                  <PencilLine className="size-3.5" />
                  Cambiar
                </button>
              </div>

              {isCard ? (
                <CardProcessingView summary={summary} />
              ) : (
                <TransferPaymentView summary={summary} />
              )}
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block xl:col-span-4">
            <CheckoutSummary
              summary={summary}
              deliveryMethod={formData.deliveryMethod}
              hideButton
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

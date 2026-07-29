'use client';

import { Building2, CreditCard, FileText, User } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';

import { AdditionalInformationCard } from './components/AdditionalInformationCard';
import { AddressCard } from './components/AddressCard';
import { CheckoutStepper } from './components/CheckoutStepper';
import { CheckoutSummary } from './components/CheckoutSummary';
import { CollapsibleSection } from './components/CollapsibleSection';
import { DeliverySelector } from './components/DeliverySelector';
import { PaymentCard } from './components/PaymentCard';
import { PersonalInformationCard } from './components/PersonalInformationCard';
import { StoreSelector } from './components/StoreSelector';
import { useCheckout } from './hooks/useCheckout';
import { MOCK_DELIVERY_METHODS, MOCK_PAYMENT_METHODS, MOCK_STORES } from './mocks/checkout.mock';

const BREADCRUMBS = [
  { label: 'Inicio', href: '/' },
  { label: 'Carrito', href: '/carrito' },
  { label: 'Checkout' },
];

export function CheckoutView() {
  const { form, summary, selectedStore, setSelectedStore, setDeliveryMethod, onContinue } =
    useCheckout();

  const deliveryMethod = form.watch('deliveryMethod');

  return (
    <Container as="main" className="py-6 md:py-10">
      <PageBreadcrumb items={BREADCRUMBS} className="mb-6" />
      <FormProvider {...form}>
        <form onSubmit={onContinue} className="space-y-8">
          <CheckoutStepper currentStep={1} />

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-5 lg:col-span-7 xl:col-span-8">
              <DeliverySelector
                methods={MOCK_DELIVERY_METHODS}
                selected={deliveryMethod}
                onChange={setDeliveryMethod}
              />

              <CollapsibleSection title="Información Personal" icon={<User className="size-4" />}>
                <PersonalInformationCard />
              </CollapsibleSection>

              <CollapsibleSection
                title={deliveryMethod === 'delivery' ? 'Dirección' : 'Recojo en Tienda'}
                icon={<Building2 className="size-4" />}
              >
                {deliveryMethod === 'delivery' ? (
                  <AddressCard />
                ) : (
                  <StoreSelector
                    stores={MOCK_STORES}
                    selected={selectedStore}
                    onChange={setSelectedStore}
                  />
                )}
              </CollapsibleSection>

              <CollapsibleSection title="Método de Pago" icon={<CreditCard className="size-4" />}>
                <PaymentCard methods={MOCK_PAYMENT_METHODS} />
              </CollapsibleSection>

              <CollapsibleSection
                title="Información Adicional"
                icon={<FileText className="size-4" />}
                defaultOpen={false}
              >
                <AdditionalInformationCard />
              </CollapsibleSection>

              <div className="pb-4 lg:hidden">
                <CheckoutSummary summary={summary} deliveryMethod={deliveryMethod} />
              </div>
            </div>

            <div className="hidden lg:col-span-5 lg:block xl:col-span-4">
              <CheckoutSummary summary={summary} deliveryMethod={deliveryMethod} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}

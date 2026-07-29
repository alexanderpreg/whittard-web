'use client';

import { AddressForm } from './components/AddressForm';
import { PageHeader } from './components/PageHeader';

export function ProfileAddressView() {
  return (
    <>
      <PageHeader title="Dirección" subtitle="Delivery a tu lugar" />
      <div className="border-brand-200 rounded-lg border bg-white p-6">
        <AddressForm />
      </div>
    </>
  );
}

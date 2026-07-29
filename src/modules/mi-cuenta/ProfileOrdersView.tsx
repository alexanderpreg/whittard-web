'use client';

import { OrdersSection } from './components/OrdersSection';
import { PageHeader } from './components/PageHeader';

export function ProfileOrdersView() {
  return (
    <>
      <PageHeader title="Historial de Pedidos" subtitle="Sobre mi cuenta" />

      <OrdersSection />
    </>
  );
}

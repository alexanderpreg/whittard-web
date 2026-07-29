'use client';

import { usePathname } from 'next/navigation';

import {
  PageBreadcrumb,
  type BreadcrumbItemType,
} from '@/shared/components/custom-ui/PageBreadcrumb';

const BREADCRUMB_LABELS: Record<string, string> = {
  '/mi-cuenta': 'Mi Cuenta',
  '/mi-cuenta/ordenes': 'Mis Órdenes',
  '/mi-cuenta/direcciones': 'Dirección',
  '/mi-cuenta/deseos': 'Lista de Deseos',
};

export function AccountBreadcrumb() {
  const pathname = usePathname();
  const isOrderDetail = pathname.startsWith('/mi-cuenta/ordenes/');
  const currentLabel = isOrderDetail ? 'Detalle de Pedido' : BREADCRUMB_LABELS[pathname];

  const items: BreadcrumbItemType[] = [
    { label: 'Inicio', href: '/' },
    {
      label: 'Mi Cuenta',
      href: pathname === '/mi-cuenta' ? undefined : '/mi-cuenta',
    },
  ];

  if (isOrderDetail) {
    items.push({ label: 'Mis Órdenes', href: '/mi-cuenta/ordenes' });
  }

  if (currentLabel && currentLabel !== 'Mi Cuenta') {
    items.push({ label: currentLabel });
  }

  return <PageBreadcrumb items={items} className="mb-8" />;
}

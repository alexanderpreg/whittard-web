'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { formatCurrency } from '@/lib/utils';
import { Pagination } from '@/shared/components/custom-ui/Pagination';
import { Badge } from '@/shared/components/shadcn-ui/badge';
import { MOCK_ORDERS } from '../mocks/orders.mock';
import type { OrderStatus } from '../types/profile';

const ITEMS_PER_PAGE = 3;

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link' }
> = {
  paid: { label: 'Pagado', variant: 'default' },
  pending: { label: 'Pendiente', variant: 'secondary' },
  processing: { label: 'Procesando', variant: 'outline' },
  shipped: { label: 'Enviado', variant: 'default' },
  delivered: { label: 'Entregado', variant: 'ghost' },
  cancelled: { label: 'Cancelado', variant: 'destructive' },
};

export function OrdersSection() {
  const [page, setPage] = useState(1);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const totalPages = Math.ceil(MOCK_ORDERS.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const orders = MOCK_ORDERS.slice(start, start + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-brand-200 animate-pulse rounded-lg border p-5">
            <div className="bg-brand-200 mb-3 h-4 w-1/3 rounded" />
            <div className="bg-brand-100 h-3 w-2/3 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
        No pudimos cargar tus pedidos. Intenta de nuevo más tarde.
      </div>
    );
  }

  if (MOCK_ORDERS.length === 0) {
    return (
      <div className="border-brand-200 rounded-lg border bg-white p-12 text-center">
        <p className="text-brand-secondary text-sm">No tienes pedidos registrados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {orders.map((order) => {
          const statusConfig = STATUS_CONFIG[order.status];
          return (
            <Link
              key={order.id}
              href={`/mi-cuenta/ordenes/${order.id}`}
              className="border-brand-200 flex items-center gap-4 rounded-lg border bg-white px-5 py-4 transition-shadow hover:shadow-sm"
            >
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                <p className="text-brand-primary text-sm font-semibold">Pedido {order.number}</p>
                <Badge variant={statusConfig.variant} className="w-fit">
                  {statusConfig.label}
                </Badge>
              </div>

              <div className="text-brand-secondary hidden items-center gap-6 text-xs sm:flex">
                <span>{order.date}</span>
                <span className="max-w-28 truncate">{order.store}</span>
                <span className="text-brand-primary font-semibold">
                  {formatCurrency(order.total)}
                </span>
              </div>

              <ArrowRight className="text-brand-secondary size-4 shrink-0" />
            </Link>
          );
        })}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

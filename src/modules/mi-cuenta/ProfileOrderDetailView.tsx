'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { formatCurrency } from '@/lib/utils';
import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Badge } from '@/shared/components/shadcn-ui/badge';
import { Button } from '@/shared/components/shadcn-ui/button';
import { MOCK_ORDERS } from './mocks/orders.mock';
import type { OrderStatus } from './types/profile';

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

export function ProfileOrderDetailView() {
  const params = useParams();
  const order = MOCK_ORDERS.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="border-brand-200 rounded-lg border bg-white p-12 text-center">
        <p className="text-brand-secondary text-sm">Pedido no encontrado.</p>
        <Link href="/mi-cuenta/ordenes">
          <Button type="button" variant="link" className="text-brand-primary mt-4 text-sm">
            Volver a mis pedidos
          </Button>
        </Link>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[order.status];

  return (
    <>
      <Link
        href="/mi-cuenta/ordenes"
        className="text-brand-secondary hover:text-brand-primary mb-4 flex items-center gap-1 text-xs"
      >
        <ArrowLeft className="size-3.5" />
        Volver a pedidos
      </Link>

      <div className="border-brand-200 rounded-lg border bg-white p-6">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-brand-primary font-semibold">Pedido {order.number}</h1>
            <p className="text-brand-secondary text-xs">{order.date}</p>
          </div>
          <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
        </div>

        <div className="mb-6 grid gap-4 text-xs sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-brand-primary mb-0.5 font-medium">Método de pago</p>
            <p className="text-brand-secondary">{order.paymentMethod}</p>
          </div>
          {order.deliveryAddress && (
            <div>
              <p className="text-brand-primary mb-0.5 font-medium">Dirección de entrega</p>
              <p className="text-brand-secondary">{order.deliveryAddress}</p>
            </div>
          )}
          <div>
            <p className="text-brand-primary mb-0.5 font-medium">Tienda</p>
            <p className="text-brand-secondary">{order.store}</p>
          </div>
          <div>
            <p className="text-brand-primary mb-0.5 font-medium">Total</p>
            <p className="text-brand-primary font-semibold">{formatCurrency(order.total)}</p>
          </div>
        </div>

        <p className="text-brand-secondary mb-3 text-xs font-semibold tracking-wide uppercase">
          Productos
        </p>
        <div className="divide-brand-100 divide-y">
          {order.products.map((product) => (
            <div key={product.id} className="flex gap-3 py-3">
              <AppImage
                src={product.image}
                alt={product.name}
                width={56}
                height={56}
                skeleton={false}
                className="size-14 shrink-0 rounded-md object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
                <p className="text-brand-primary truncate text-sm font-medium">{product.name}</p>
                <p className="text-brand-secondary text-xs">SKU: {product.sku}</p>
                <div className="text-brand-secondary flex items-center gap-3 text-xs">
                  <span>Cant: {product.quantity}</span>
                  <span>{formatCurrency(product.unitPrice)} c/u</span>
                </div>
              </div>
              <div className="text-brand-primary flex items-center text-sm font-semibold">
                {formatCurrency(product.total)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

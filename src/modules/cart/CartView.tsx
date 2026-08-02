'use client';

import { formatCurrency } from '@/lib/utils';
import { ProductCarousel } from '@/modules/products/components/product-carousel/ProductCarousel';
import type { ProductCardData } from '@/modules/products/types/productCard';
import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { useState } from 'react';
import { CartItemCard } from './components/CartItemCard';
import { CouponSection } from './components/CouponSection';
import { OrderSummary } from './components/OrderSummary';
import { useCart } from './hooks/useCart';

const CART_BREADCRUMBS = [{ label: 'Inicio', href: '/' }, { label: 'Carrito' }];

const RELATED_PRODUCTS: ProductCardData[] = [
  {
    productId: '1',
    variantId: '1a',
    slug: 'covent-garden-blend',
    name: 'Covent Garden Blend Loose Tea',
    price: 12.98,
    promoPrice: null,
    stock: 18,
    image: '/producto1.png',
    rating: 4.8,
  },
  {
    productId: '2',
    variantId: '2a',
    slug: 'english-breakfast',
    name: 'English Breakfast Loose Tea',
    price: 12.98,
    promoPrice: null,
    stock: 14,
    image: '/producto1.png',
    rating: 4.7,
  },
  {
    productId: '3',
    variantId: '3a',
    slug: 'earl-grey-classic',
    name: 'Earl Grey Classic Loose Tea',
    price: 12.98,
    promoPrice: null,
    stock: 6,
    image: '/producto1.png',
    rating: 4.9,
  },
  {
    productId: '4',
    variantId: '4a',
    slug: 'jasmine-green-tea',
    name: 'Jasmine Green Tea Loose Tea',
    price: 12.98,
    promoPrice: null,
    stock: 20,
    image: '/producto1.png',
    rating: 4.6,
  },
];

export function CartView() {
  const { items, totals, isLoading, updateQuantity, removeItem } = useCart();
  const [coupon, setCoupon] = useState('');
  const [couponState, setCouponState] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const shippingLeft = Math.max(50 - totals.subtotal, 0);

  if (isLoading) {
    return (
      <Container as="main" className="flex flex-1 items-center justify-center py-20">
        <p className="text-lg text-gray-500">Cargando carrito...</p>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container as="main" className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
        <PageBreadcrumb items={CART_BREADCRUMBS} className="mb-6 w-full" />
        <h1 className="font-brand-elephant text-brand-primary text-3xl md:text-4xl">Mi Carrito</h1>
        <p className="text-lg text-gray-500">Tu carrito está vacío</p>
        <p className="text-sm text-gray-400">Agrega productos para empezar tu compra</p>
      </Container>
    );
  }

  return (
    <Container as="main" className="py-6 md:py-10">
      <PageBreadcrumb items={CART_BREADCRUMBS} className="mb-6" />

      <section className="space-y-10">
        <header className="space-y-3 text-center">
          <h1 className="font-brand-elephant text-brand-primary text-3xl md:text-4xl">
            Mi Carrito
          </h1>
          <p className="text-base text-gray-600">
            {shippingLeft > 0 ? (
              <>
                Falta {formatCurrency(shippingLeft)} para aplicar tu{' '}
                <span className="font-semibold text-amber-600">Delivery Gratis</span>
              </>
            ) : (
              <>
                Tienes envío gratis.{' '}
                <span className="font-semibold text-amber-600">Aprovecha tu compra</span>
              </>
            )}
          </p>
        </header>

        <div className="w-full space-y-8">
          <div className="w-full divide-y divide-gray-200 border-y border-gray-300">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={(id, quantity) => {
                  const [productId, variantId] = id.split('_');
                  updateQuantity(productId, variantId, quantity);
                }}
                onRemove={(id) => {
                  const [productId, variantId] = id.split('_');
                  removeItem(productId, variantId);
                }}
              />
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.5fr] lg:items-start">
            <CouponSection
              coupon={coupon}
              couponState={couponState}
              onCouponChange={setCoupon}
              onApplyCoupon={() =>
                setCouponState(coupon.trim().toLowerCase() === 'whittard10' ? 'valid' : 'invalid')
              }
            />

            <OrderSummary
              subtotal={totals.subtotal}
              delivery={totals.shipping}
              total={totals.total}
            />
          </div>
        </div>

        <ProductCarousel products={RELATED_PRODUCTS} title="Productos Similares" />
      </section>
    </Container>
  );
}

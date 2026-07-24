'use client';

import { formatCurrency } from '@/lib/utils';
import { ProductCarousel } from '@/modules/products/components/product-carousel/ProductCarousel';
import type { ProductCardData } from '@/modules/products/types/productCard';
import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { useMemo, useState } from 'react';
import { CartItemCard } from './components/CartItemCard';
import { CouponSection } from './components/CouponSection';
import { OrderSummary } from './components/OrderSummary';
import { MOCK_CART_ITEMS } from './mocks/cart.mock';

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

const DELIVERY_COST = 10;
const FREE_SHIPPING_THRESHOLD = 50;

export function CartView() {
  const [items, setItems] = useState(MOCK_CART_ITEMS);
  const [coupon, setCoupon] = useState('');
  const [couponState, setCouponState] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + (item.promoPrice ?? item.price) * item.quantity, 0),
    [items],
  );

  const delivery = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_COST;
  const total = subtotal + delivery;
  const shippingLeft = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

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

        {/* Layout principal que distribuye el ancho correctamente */}
        <div className="w-full space-y-8">
          <div className="w-full divide-y divide-gray-200 border-y border-gray-300">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={(id, quantity) => {
                  setItems((current) =>
                    current.map((currentItem) =>
                      currentItem.id === id ? { ...currentItem, quantity } : currentItem,
                    ),
                  );
                }}
                onRemove={(id) => {
                  setItems((current) => current.filter((currentItem) => currentItem.id !== id));
                }}
              />
            ))}
          </div>

          {/* Sección Inferior: Cupón (Izquierda) vs Resumen de Totales (Derecha) */}
          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.5fr] lg:items-start">
            <CouponSection
              coupon={coupon}
              couponState={couponState}
              onCouponChange={setCoupon}
              onApplyCoupon={() =>
                setCouponState(coupon.trim().toLowerCase() === 'whittard10' ? 'valid' : 'invalid')
              }
            />

            <OrderSummary subtotal={subtotal} delivery={delivery} total={total} />
          </div>
        </div>

        {/* Carrusel de Productos Similares */}
        <ProductCarousel products={RELATED_PRODUCTS} title="Productos Similares" />
      </section>
    </Container>
  );
}

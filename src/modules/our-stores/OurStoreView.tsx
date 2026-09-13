// app/our-stores/_components/OurStoreView.tsx
'use client';

import { Container } from '@/shared/components/custom-ui/Container';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { BreadcrumbItemType, PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import { PhysicalStore, PhysicalStoreSection } from './types/our-store.types';

interface OurStoreViewProps {
  storeSection: PhysicalStoreSection | null;
}

const BREADCRUMB_ITEMS: BreadcrumbItemType[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nuestras Tiendas' },
];

export function OurStoreView({ storeSection }: OurStoreViewProps) {
  if (!storeSection || !storeSection.is_active || !storeSection.stores?.length) {
    return (
      <section className="py-8 md:py-12">
        <Container size="container">
          <PageBreadcrumb items={BREADCRUMB_ITEMS} className="mb-6" />
          <Heading as="h2" variant="heading" className="mb-3">
            Nuestras Tiendas
          </Heading>
          <p className="text-sm text-gray-600 md:text-base">
            No hay información de tiendas disponible por el momento.
          </p>
        </Container>
      </section>
    );
  }

  // Tiendas con información detallada (dirección / link)
  const mainStores = storeSection.stores.filter((store) => store.address || store.url);

  // Tiendas sin dirección detallada (solo logo)
  const secondaryStores = storeSection.stores.filter((store) => !store.address && !store.url);

  const renderStoreContent = (store: PhysicalStore) => (
    <>
      <div className="relative mb-4 flex h-28 w-48 items-center justify-center">
        <Image
          src={store.logo_url}
          alt={store.name}
          width={200}
          height={100}
          className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {store.address && (
        <div className="space-y-0.5 text-sm text-gray-500">
          <p className="group-hover:text-brand-primary font-medium text-gray-700 transition-colors">
            {store.address}
          </p>
        </div>
      )}
    </>
  );

  return (
    <section className="py-8 md:py-12">
      <Container size="container">
        {/* Breadcrumb */}
        <PageBreadcrumb items={BREADCRUMB_ITEMS} className="mb-6" />

        {/* Encabezado dinámico */}
        <div className="mb-12 max-w-3xl">
          <Heading as="h2" variant="heading" className="mb-3">
            {storeSection.title}
          </Heading>
          {storeSection.subtitle && (
            <p className="text-sm text-gray-600 md:text-base">{storeSection.subtitle}</p>
          )}
        </div>

        {/* Fila superior (Tiendas envueltas completamente en Link si tienen URL) */}
        {mainStores.length > 0 && (
          <div className="mb-16 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
            {mainStores.map((store) => {
              if (store.url) {
                return (
                  <Link
                    key={store.id}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex cursor-pointer flex-col items-center text-center"
                  >
                    {renderStoreContent(store)}
                  </Link>
                );
              }

              return (
                <div key={store.id} className="group flex flex-col items-center text-center">
                  {renderStoreContent(store)}
                </div>
              );
            })}
          </div>
        )}

        {/* Fila inferior (Cadenas / Supermercados) */}
        {secondaryStores.length > 0 && (
          <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
            {secondaryStores.map((store) => {
              const content = (
                <div className="relative flex h-20 w-40 items-center justify-center">
                  <Image
                    src={store.logo_url}
                    alt={store.name}
                    width={160}
                    height={80}
                    className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              );

              if (store.url) {
                return (
                  <Link
                    key={store.id}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex cursor-pointer justify-center p-4"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div key={store.id} className="group flex justify-center p-4">
                  {content}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

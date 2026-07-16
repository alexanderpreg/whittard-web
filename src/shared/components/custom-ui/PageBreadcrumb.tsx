'use client';

import Link from 'next/link';
import { Fragment } from 'react';

import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/shadcn-ui/breadcrumb';

export type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  items: BreadcrumbItemType[];
  /** Clase extra para personalizar la lista (BreadcrumbList) */
  className?: string;
  /** Clase específica para el ítem de la página actual (BreadcrumbPage) */
  currentClassName?: string;
};

export function PageBreadcrumb({ items, className, currentClassName }: PageBreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className={cn('text-brand-primary sm:gap-1.5', className)}>
        {items.map((item, index) => {
          // El último elemento SIEMPRE es la página actual
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.href ?? item.label}>
              <BreadcrumbItem>
                {/* Si tiene href y NO es el último elemento, se renderiza como enlace */}
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className={cn('text-brand-primary', currentClassName)}>
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { formatCurrency } from '@/lib/utils';
import { ProductCard } from '@/modules/products/components/ProductCard';
import { toProductCardDataList } from '@/modules/products/mappers/product-card.mapper';
import type { CatalogQueryParams } from '@/modules/products/repository/types';
import { getClientCatalogRepository } from '@/modules/products/services/client-catalog';
import type { CatalogFilters, CategoryPath, Pagination } from '@/modules/products/types/catalog';
import type { ProductCardData } from '@/modules/products/types/productCard';
import {
  buildCatalogQueryString,
  parseCatalogSearchParams,
} from '@/modules/products/utils/catalog-query';
import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';
import { FilterGroup } from './components/catalog/FilterGroup';

type FilterKey = 'flavorIds' | 'attributionIds' | 'attributeOptionIds';

interface ActiveFilter {
  key: FilterKey | 'priceMin' | 'priceMax' | 'search';
  value: string;
  label: string;
}

function resolveFilterLabel(
  key: ActiveFilter['key'],
  value: string,
  filters: CatalogFilters,
): string {
  switch (key) {
    case 'flavorIds':
      return filters.flavors.find((flavor) => flavor.id === value)?.name ?? value;
    case 'attributionIds':
      return filters.attributions.find((attribution) => attribution.id === value)?.name ?? value;
    case 'attributeOptionIds':
      return (
        filters.attributes
          .flatMap((attribute) => attribute.options)
          .find((option) => option.id === value)?.value ?? value
      );
    default:
      return value;
  }
}

interface ProductsCatalogViewProps {
  slug: string[];
  category: CategoryPath | null;
  products: ProductCardData[];
  pagination: Pagination;
  filters: CatalogFilters;
}

export function ProductsCatalogView({
  slug,
  category,
  products,
  pagination,
  filters,
}: ProductsCatalogViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = parseCatalogSearchParams(Object.fromEntries(searchParams.entries()));

  // Estado local de scroll infinito: la página base siempre viene de `products`
  // (props del servidor). `extraItems` acumula las páginas siguientes cargadas
  // en el cliente. La vista se remonta al cambiar filtros (key), así que este
  // estado siempre arranca limpio en una nueva página.
  const [extraItems, setExtraItems] = useState<ProductCardData[]>([]);
  const [loadedState, setLoadedState] = useState<{
    nextCursor: string | null;
    hasMore: boolean;
  } | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [priceMinInput, setPriceMinInput] = useState(currentParams.priceMin);
  const [priceMaxInput, setPriceMaxInput] = useState(currentParams.priceMax);

  const displayedItems = [...products, ...extraItems];
  const hasMore = loadedState?.hasMore ?? pagination.has_more;
  const nextCursor = loadedState?.nextCursor ?? pagination.next_cursor;

  const categoryPath = slug.join('/');
  const categoryName = category?.category.name ?? 'Catálogo';

  const navigateWith = (params: CatalogQueryParams, includeCursor = false) => {
    router.push(`${pathname}${buildCatalogQueryString(params, includeCursor)}`, {
      scroll: false,
    });
  };

  const resetLoadedState = () => {
    setExtraItems([]);
    setLoadedState(null);
  };

  const toggleListValue = (key: FilterKey, value: string) => {
    const current = currentParams[key] ?? [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    resetLoadedState();
    navigateWith({ ...currentParams, [key]: next.length > 0 ? next : undefined });
  };

  const applyPrice = () => {
    resetLoadedState();
    navigateWith({
      ...currentParams,
      priceMin: priceMinInput,
      priceMax: priceMaxInput,
    });
  };

  const changeSort = (value: string) => {
    resetLoadedState();
    navigateWith({ ...currentParams, sort: value || undefined });
  };

  const removeFilter = (filter: ActiveFilter) => {
    if (
      filter.key === 'flavorIds' ||
      filter.key === 'attributionIds' ||
      filter.key === 'attributeOptionIds'
    ) {
      toggleListValue(filter.key, filter.value);
      return;
    }
    if (filter.key === 'priceMin') {
      setPriceMinInput(undefined);
      resetLoadedState();
      navigateWith({ ...currentParams, priceMin: undefined });
      return;
    }
    if (filter.key === 'priceMax') {
      setPriceMaxInput(undefined);
      resetLoadedState();
      navigateWith({ ...currentParams, priceMax: undefined });
      return;
    }
    if (filter.key === 'search') {
      resetLoadedState();
      navigateWith({ ...currentParams, search: undefined });
    }
  };

  const clearAllFilters = () => {
    setPriceMinInput(undefined);
    setPriceMaxInput(undefined);
    resetLoadedState();
    navigateWith({});
  };

  const loadMore = async () => {
    if (!nextCursor || isLoadingMore) return;

    setIsLoadingMore(true);
    setHasError(false);
    try {
      const repository = getClientCatalogRepository();
      const response = await repository.getProducts({
        ...currentParams,
        category: categoryPath || undefined,
        cursor: nextCursor,
      });
      setExtraItems((prev) => [...prev, ...toProductCardDataList(response.items)]);
      setLoadedState({
        nextCursor: response.pagination.next_cursor,
        hasMore: response.pagination.has_more,
      });
    } catch {
      setHasError(true);
      toast.error('No se pudieron cargar más productos');
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Scroll infinito: el sentinel dispara la siguiente página al entrar al viewport.
  const sentinelRef = useIntersectionObserver<HTMLDivElement>(
    () => {
      void loadMore();
    },
    { rootMargin: '300px', enabled: hasMore && !isLoadingMore && !hasError },
  );

  const activeFilters: ActiveFilter[] = [
    ...(currentParams.flavorIds ?? []).map((value) => ({
      key: 'flavorIds' as const,
      value,
      label: resolveFilterLabel('flavorIds', value, filters),
    })),
    ...(currentParams.attributionIds ?? []).map((value) => ({
      key: 'attributionIds' as const,
      value,
      label: resolveFilterLabel('attributionIds', value, filters),
    })),
    ...(currentParams.attributeOptionIds ?? []).map((value) => ({
      key: 'attributeOptionIds' as const,
      value,
      label: resolveFilterLabel('attributeOptionIds', value, filters),
    })),
    ...(currentParams.priceMin !== undefined
      ? [
          {
            key: 'priceMin' as const,
            value: String(currentParams.priceMin),
            label: `Desde ${formatCurrency(currentParams.priceMin)}`,
          },
        ]
      : []),
    ...(currentParams.priceMax !== undefined
      ? [
          {
            key: 'priceMax' as const,
            value: String(currentParams.priceMax),
            label: `Hasta ${formatCurrency(currentParams.priceMax)}`,
          },
        ]
      : []),
    ...(currentParams.search
      ? [
          {
            key: 'search' as const,
            value: currentParams.search,
            label: `Búsqueda: ${currentParams.search}`,
          },
        ]
      : []),
  ];

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    ...(category?.breadcrumb ?? []).map((item, index) => {
      // El home sintético trae `id: null`: usa `slug` ("catalogo") para el enlace.
      // Los demás items solo traen su segmento, así que acumulamos la ruta.
      if (item.id === null) {
        return { label: item.name, href: '/catalogo' };
      }
      const segments = (category?.breadcrumb ?? [])
        .slice(1, index + 1)
        .map((segment) => segment.slug);
      return {
        label: item.name,
        href: `/catalogo/${segments.join('/')}`,
      };
    }),
    ...(slug.length === 0 && !category ? [{ label: 'Catálogo' }] : []),
  ];

  const resultText = `${displayedItems.length} resultado${displayedItems.length === 1 ? '' : 's'}`;
  const sort = currentParams.sort ?? '';

  return (
    <main>
      <Container className="mt-4">
        <PageBreadcrumb items={breadcrumbItems} className="mb-4" />
      </Container>
      <PageHeroBanner title={categoryName} imageUrl="/banner-static.png" className="mb-6" />

      <Container className="py-4 md:py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-xs border border-gray-200 bg-white p-4 lg:sticky lg:top-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm text-gray-600">Filtros</p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-gray-500 underline-offset-4 hover:text-gray-800 hover:underline"
                >
                  Limpiar Filtros
                </button>
              </div>

              {activeFilters.length > 0 && (
                <div className="mb-6 space-y-2 rounded-sm bg-gray-50 p-3">
                  <p className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase">
                    Filtros Seleccionados
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter) => (
                      <span
                        key={`${filter.key}-${filter.value}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white py-1 pr-1.5 pl-3 text-xs font-medium text-gray-700"
                      >
                        {filter.label}
                        <button
                          type="button"
                          onClick={() => removeFilter(filter)}
                          className="flex size-4 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
                          aria-label={`Eliminar filtro ${filter.label}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {category && category.children.length > 0 && (
                  <section className="space-y-3">
                    <h3 className="font-brand-elephant border-b border-gray-200 pb-2 text-lg text-gray-800">
                      Categorías
                    </h3>
                    <ul className="space-y-1.5">
                      {category.children.map((child) => (
                        <li key={child.id}>
                          <a
                            href={`/catalogo/${categoryPath}/${child.slug}`}
                            className="text-sm text-gray-700 transition-colors hover:text-gray-900 hover:underline"
                          >
                            {child.name}{' '}
                            <span className="text-gray-400">({child.products_count})</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {filters.flavors.length > 0 && (
                  <FilterGroup
                    title="Sabores"
                    items={filters.flavors.map((flavor) => ({
                      label: flavor.name,
                      value: flavor.id,
                      count: flavor.products_count,
                      checked: currentParams.flavorIds?.includes(flavor.id) ?? false,
                    }))}
                    onToggle={(value) => toggleListValue('flavorIds', value)}
                  />
                )}

                {filters.attributions.length > 0 && (
                  <FilterGroup
                    title="Sellos"
                    items={filters.attributions.map((attribution) => ({
                      label: attribution.name,
                      value: attribution.id,
                      count: attribution.products_count,
                      checked: currentParams.attributionIds?.includes(attribution.id) ?? false,
                    }))}
                    onToggle={(value) => toggleListValue('attributionIds', value)}
                  />
                )}

                {filters.attributes.map((attribute) => (
                  <FilterGroup
                    key={attribute.id}
                    title={attribute.label}
                    items={attribute.options.map((option) => ({
                      label: option.value,
                      value: option.id,
                      count: option.products_count ?? 0,
                      checked: currentParams.attributeOptionIds?.includes(option.id) ?? false,
                    }))}
                    onToggle={(value) => toggleListValue('attributeOptionIds', value)}
                  />
                ))}

                <section className="space-y-3">
                  <h3 className="font-brand-elephant border-b border-gray-200 pb-2 text-lg text-gray-800">
                    Precio
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={filters.price.min}
                        max={filters.price.max}
                        value={priceMinInput ?? ''}
                        onChange={(event) => setPriceMinInput(Number(event.target.value))}
                        placeholder={formatCurrency(filters.price.min)}
                        className="h-9 w-full border border-gray-300 px-2 text-sm"
                      />
                      <span className="text-gray-400">—</span>
                      <input
                        type="number"
                        min={filters.price.min}
                        max={filters.price.max}
                        value={priceMaxInput ?? ''}
                        onChange={(event) => setPriceMaxInput(Number(event.target.value))}
                        placeholder={formatCurrency(filters.price.max)}
                        className="h-9 w-full border border-gray-300 px-2 text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={applyPrice}
                      className="bg-brand-primary h-9 w-full cursor-pointer text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Aplicar precio
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </aside>

          <section className="space-y-4">
            <div className="flex flex-col gap-3 border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
              <p>
                {resultText} para <span className="font-medium text-gray-800">{categoryName}</span>
              </p>

              <label className="flex items-center gap-2 text-xs tracking-[0.2em] text-gray-400 uppercase">
                <span>Ordenar</span>
                <select
                  value={sort}
                  onChange={(event) => changeSort(event.target.value)}
                  className="border-gray-200 bg-white text-xs tracking-normal text-gray-700"
                >
                  <option value="">Relevancia</option>
                  <option value="price">Precio menor a mayor</option>
                  <option value="-price">Precio mayor a menor</option>
                  <option value="-rating">Mejor calificados</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {displayedItems.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>

            {displayedItems.length === 0 && (
              <div className="border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                No encontramos productos con esos filtros.
              </div>
            )}

            <div className="flex items-center justify-between pt-2 text-sm text-gray-500">
              <span>Mostrando {displayedItems.length} productos</span>
              {hasMore && (
                <span className="tracking-[0.2em] uppercase">
                  {hasError
                    ? 'Ocurrió un error'
                    : isLoadingMore
                      ? 'Cargando...'
                      : 'Desplázate para cargar más'}
                </span>
              )}
            </div>

            {hasMore && (
              <div ref={sentinelRef} className="flex items-center justify-center gap-3 py-6">
                {isLoadingMore ? (
                  <span className="border-t-brand-primary inline-block size-6 animate-spin rounded-full border-2 border-gray-200" />
                ) : hasError ? (
                  <button
                    type="button"
                    onClick={() => void loadMore()}
                    className="bg-brand-primary hover:bg-brand-primary/90 cursor-pointer px-4 py-2 text-xs font-medium text-white transition-colors"
                  >
                    Reintentar
                  </button>
                ) : (
                  <span className="h-1.5 w-24 animate-pulse rounded-full bg-gray-200" />
                )}
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}

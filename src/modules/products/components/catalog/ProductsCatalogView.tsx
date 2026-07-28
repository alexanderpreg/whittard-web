'use client';

import { useMemo, useState } from 'react';

import { formatCurrency } from '@/lib/utils';
import { ProductCard } from '@/modules/products/components/ProductCard';
import type { CatalogProduct, CatalogSort } from '@/modules/products/types/catalog';
import type { ProductCardData } from '@/modules/products/types/productCard';
import { Container } from '@/shared/components/custom-ui/Container';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';
import { FilterGroup } from './FilterGroup';

const CATEGORY_LABELS: Record<string, string> = {
  tea: 'Té',
  coffee: 'Coffee',
  'hot-chocolate': 'Hot Chocolate',
  gifts: 'Gifts',
  equipment: 'Equipment',
  'biscuits-chocolates': 'Biscuits & Chocolates',
};

const PRODUCTS: CatalogProduct[] = [
  {
    productId: 'tea-1',
    variantId: 'tea-1-a',
    slug: 'earl-grey-classic',
    name: 'Earl Grey Classic',
    price: 12.95,
    promoPrice: 9.95,
    stock: 18,
    image: '/producto1.png',
    rating: 4.8,
    category: 'Té',
    facets: {
      type: ['black'],
      presentation: ['loose-tea-caddy'],
      origin: ['china'],
      nutrition: ['organic'],
      flavor: ['citrus'],
    },
  },
  {
    productId: 'tea-2',
    variantId: 'tea-2-a',
    slug: 'english-breakfast',
    name: 'English Breakfast',
    price: 12.95,
    promoPrice: null,
    stock: 14,
    image: '/producto1.png',
    rating: 4.7,
    category: 'Té',
    facets: {
      type: ['black'],
      presentation: ['tea-bags'],
      origin: ['british'],
      nutrition: [],
      flavor: ['malty'],
    },
  },
  {
    productId: 'tea-3',
    variantId: 'tea-3-a',
    slug: 'jasmine-green-tea',
    name: 'Jasmine Green Tea',
    price: 13.5,
    promoPrice: null,
    stock: 6,
    image: '/producto1.png',
    rating: 4.9,
    category: 'Té',
    facets: {
      type: ['green'],
      presentation: ['loose-tea-pouch'],
      origin: ['china'],
      nutrition: ['organic'],
      flavor: ['floral'],
    },
  },
  {
    productId: 'tea-4',
    variantId: 'tea-4-a',
    slug: 'peach-infusion',
    name: 'Peach Infusion',
    price: 11.8,
    promoPrice: null,
    stock: 20,
    image: '/producto1.png',
    rating: 4.6,
    category: 'Té',
    facets: {
      type: ['fruit'],
      presentation: ['tea-bags'],
      origin: ['europe'],
      nutrition: ['vegan'],
      flavor: ['fruity'],
    },
  },
  {
    productId: 'tea-5',
    variantId: 'tea-5-a',
    slug: 'chamomile-honey',
    name: 'Chamomile & Honey',
    price: 10.95,
    promoPrice: 8.95,
    stock: 3,
    image: '/producto1.png',
    rating: 4.5,
    category: 'Té',
    facets: {
      type: ['herbal'],
      presentation: ['loose-tea-caddy'],
      origin: ['europe'],
      nutrition: ['organic'],
      flavor: ['sweet'],
    },
  },
  {
    productId: 'tea-6',
    variantId: 'tea-6-a',
    slug: 'mint-herbal-tea',
    name: 'Mint Herbal Tea',
    price: 11.25,
    promoPrice: null,
    stock: 0,
    image: '/producto1.png',
    rating: 4.4,
    category: 'Té',
    facets: {
      type: ['herbal'],
      presentation: ['tea-bags'],
      origin: ['india'],
      nutrition: ['vegan'],
      flavor: ['minty'],
    },
  },
];

const FACET_LABELS = {
  type: [
    { label: 'Negro', value: 'black' },
    { label: 'Saborizado', value: 'flavored' },
    { label: 'Infusión de fruta', value: 'fruit' },
    { label: 'Verde', value: 'green' },
    { label: 'Infusión herbal', value: 'herbal' },
  ],
  presentation: [
    { label: 'Loose Tea Caddy', value: 'loose-tea-caddy' },
    { label: 'Loose Tea Pouch', value: 'loose-tea-pouch' },
    { label: 'Tea Bags', value: 'tea-bags' },
  ],
  origin: [
    { label: 'Británico', value: 'british' },
    { label: 'China', value: 'china' },
    { label: 'Europa', value: 'europe' },
    { label: 'Alemania', value: 'germany' },
    { label: 'India', value: 'india' },
  ],
  nutrition: [{ label: 'Orgánico', value: 'organic' }],
  flavor: [
    { label: 'Cítrico', value: 'citrus' },
    { label: 'Frutado', value: 'fruity' },
    { label: 'Malta', value: 'malty' },
    { label: 'Nuez', value: 'nutty' },
    { label: 'Saborizado', value: 'sweet' },
    { label: 'Menta', value: 'minty' },
    { label: 'Floral', value: 'floral' },
  ],
} as const;

function matchesAny(selected: string[], values: string[]) {
  if (selected.length === 0) return true;
  return selected.some((value) => values.includes(value));
}

function normalizeProduct(product: CatalogProduct): ProductCardData {
  return {
    productId: product.productId,
    variantId: product.variantId,
    slug: product.slug,
    name: product.name,
    price: product.price,
    promoPrice: product.promoPrice,
    stock: product.stock,
    image: product.image,
    rating: product.rating,
  };
}

interface ProductsCatalogViewProps {
  categorySlug: string;
  subcategorySlug?: string;
}

export function ProductsCatalogView({ categorySlug, subcategorySlug }: ProductsCatalogViewProps) {
  const categoryLabel = CATEGORY_LABELS[categorySlug] ?? categorySlug;
  const subcategoryLabel = subcategorySlug ? subcategorySlug.replaceAll('-', ' ') : undefined;
  const [selected, setSelected] = useState<Record<string, string[]>>({
    type: [],
    presentation: [],
    origin: [],
    nutrition: [],
    flavor: [],
  });
  const [sort, setSort] = useState<CatalogSort>('relevance');
  const [maxPrice, setMaxPrice] = useState(15);
  const activeFilters: { label: string; group: string; value: string }[] = [
    ...selected.type.map((item) => ({
      label: FACET_LABELS.type.find((option) => option.value === item)?.label ?? item,
      group: 'type',
      value: item,
    })),
    ...selected.presentation.map((item) => ({
      label: FACET_LABELS.presentation.find((option) => option.value === item)?.label ?? item,
      group: 'presentation',
      value: item,
    })),
    ...selected.origin.map((item) => ({
      label: FACET_LABELS.origin.find((option) => option.value === item)?.label ?? item,
      group: 'origin',
      value: item,
    })),
    ...selected.nutrition.map((item) => ({
      label: FACET_LABELS.nutrition.find((option) => option.value === item)?.label ?? item,
      group: 'nutrition',
      value: item,
    })),
    ...selected.flavor.map((item) => ({
      label: FACET_LABELS.flavor.find((option) => option.value === item)?.label ?? item,
      group: 'flavor',
      value: item,
    })),
  ];

  const filteredProducts = useMemo(() => {
    const result = PRODUCTS.filter((product) => {
      const effectivePrice = product.promoPrice ?? product.price;

      return (
        effectivePrice <= maxPrice &&
        matchesAny(selected.type, product.facets.type) &&
        matchesAny(selected.presentation, product.facets.presentation) &&
        matchesAny(selected.origin, product.facets.origin) &&
        matchesAny(selected.nutrition, product.facets.nutrition) &&
        matchesAny(selected.flavor, product.facets.flavor)
      );
    });

    const sorted = [...result];

    switch (sort) {
      case 'price-asc':
        return sorted.sort((a, b) => (a.promoPrice ?? a.price) - (b.promoPrice ?? b.price));
      case 'price-desc':
        return sorted.sort((a, b) => (b.promoPrice ?? b.price) - (a.promoPrice ?? a.price));
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [maxPrice, selected, sort]);

  const productCards = filteredProducts.map(normalizeProduct);

  const toggle = (group: keyof typeof selected, value: string) => {
    setSelected((current) => {
      const hasValue = current[group].includes(value);

      return {
        ...current,
        [group]: hasValue
          ? current[group].filter((item) => item !== value)
          : [...current[group], value],
      };
    });
  };

  const resultText = `${filteredProducts.length} resultado${filteredProducts.length === 1 ? '' : 's'}`;
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Catalogo', href: '/catalogo' },
    { label: categoryLabel, href: `/catalogo/${categorySlug}` },
    ...(subcategoryLabel ? [{ label: subcategoryLabel }] : []),
  ];

  return (
    <main>
      <Container className="mt-4">
        <PageBreadcrumb items={breadcrumbItems} className="mb-4" />
      </Container>
      <PageHeroBanner title={categoryLabel} imageUrl="/banner-static.png" className="mb-6" />

      <Container className="py-4 md:py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm text-gray-600">Filtros</p>
                <button
                  type="button"
                  onClick={() =>
                    setSelected({
                      type: [],
                      presentation: [],
                      origin: [],
                      nutrition: [],
                      flavor: [],
                    })
                  }
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
                        key={`${filter.group}-${filter.value}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white py-1 pr-1.5 pl-3 text-xs font-medium text-gray-700"
                      >
                        {filter.label}
                        <button
                          type="button"
                          onClick={() =>
                            toggle(filter.group as keyof typeof selected, filter.value)
                          }
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
                <FilterGroup
                  title="Tipos De Tea"
                  items={FACET_LABELS.type.map((item) => ({
                    ...item,
                    count: PRODUCTS.filter((product) => product.facets.type.includes(item.value))
                      .length,
                    checked: selected.type.includes(item.value),
                  }))}
                  onToggle={(value) => toggle('type', value)}
                />

                <FilterGroup
                  title="Presentación"
                  items={FACET_LABELS.presentation.map((item) => ({
                    ...item,
                    count: PRODUCTS.filter((product) =>
                      product.facets.presentation.includes(item.value),
                    ).length,
                    checked: selected.presentation.includes(item.value),
                  }))}
                  onToggle={(value) => toggle('presentation', value)}
                />

                <FilterGroup
                  title="Origen"
                  items={FACET_LABELS.origin.map((item) => ({
                    ...item,
                    count: PRODUCTS.filter((product) => product.facets.origin.includes(item.value))
                      .length,
                    checked: selected.origin.includes(item.value),
                  }))}
                  onToggle={(value) => toggle('origin', value)}
                />

                <section className="space-y-3">
                  <h3 className="font-brand-elephant border-b border-gray-200 pb-2 text-lg text-gray-800">
                    Precio
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="8"
                      max="15"
                      step="0.1"
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(Number(event.target.value))}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatCurrency(8)}</span>
                      <span>{formatCurrency(maxPrice)}</span>
                    </div>
                  </div>
                </section>

                <FilterGroup
                  title="Filtros Nutricionales"
                  items={FACET_LABELS.nutrition.map((item) => ({
                    ...item,
                    count: PRODUCTS.filter((product) =>
                      product.facets.nutrition.includes(item.value),
                    ).length,
                    checked: selected.nutrition.includes(item.value),
                  }))}
                  onToggle={(value) => toggle('nutrition', value)}
                />

                <FilterGroup
                  title="Sabor"
                  items={FACET_LABELS.flavor.map((item) => ({
                    ...item,
                    count: PRODUCTS.filter((product) => product.facets.flavor.includes(item.value))
                      .length,
                    checked: selected.flavor.includes(item.value),
                  }))}
                  onToggle={(value) => toggle('flavor', value)}
                />
              </div>
            </div>
          </aside>

          <section className="space-y-4">
            <div className="flex flex-col gap-3 border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
              <p>
                {resultText} para <span className="font-medium text-gray-800">{categoryLabel}</span>
              </p>
              {subcategoryLabel && (
                <p className="text-xs tracking-[0.2em] text-gray-400 uppercase">
                  {subcategoryLabel}
                </p>
              )}

              <label className="flex items-center gap-2 text-xs tracking-[0.2em] text-gray-400 uppercase">
                <span>Ordenar</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as CatalogSort)}
                  className="border-gray-200 bg-white text-xs tracking-normal text-gray-700"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-asc">Precio menor a mayor</option>
                  <option value="price-desc">Precio mayor a menor</option>
                  <option value="rating-desc">Mejor calificados</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {productCards.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>

            {productCards.length === 0 && (
              <div className="border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                No encontramos productos con esos filtros.
              </div>
            )}

            <div className="flex items-center justify-between pt-2 text-sm text-gray-500">
              <span>
                Mostrando {filteredProducts.length} de {PRODUCTS.length}
              </span>
              <span className="tracking-[0.2em] uppercase">Página 1 de 1</span>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}

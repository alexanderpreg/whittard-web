import { toProductCardDataList } from '@/modules/products/mappers/storefront-product-card.mapper';
import { ProductsCatalogView } from '@/modules/products/ProductsCatalogView';
import { StorefrontCatalogService } from '@/modules/products/services/storefront-catalog.service';
import type { StorefrontCategoryPath } from '@/modules/products/types/storefront';
import { isNotFoundError } from '@/modules/products/utils/errors';
import { parseCatalogSearchParams } from '@/modules/products/utils/storefront-catalog-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CatalogPageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: Pick<CatalogPageProps, 'params'>): Promise<Metadata> {
  const { slug: slugArray } = await params;
  const slug = slugArray ?? [];
  if (slug.length === 0) return {};

  try {
    const category = await StorefrontCatalogService.getCategoryByPath(slug.join('/'));
    const seo = category.seo;
    if (!seo) {
      return { title: `${category.category.name} | Whittard` };
    }

    return {
      title: seo.meta_title ?? `${category.category.name} | Whittard`,
      description: seo.meta_description ?? undefined,
      keywords: seo.keywords ?? undefined,
      alternates: seo.canonical_url ? { canonical: seo.canonical_url } : undefined,
      robots: seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
      openGraph: {
        title: seo.og_title ?? seo.meta_title ?? category.category.name,
        description: seo.og_description ?? seo.meta_description ?? undefined,
        images: seo.og_image ? [{ url: seo.og_image }] : undefined,
      },
    };
  } catch (error) {
    if (isNotFoundError(error)) return {};
    throw error;
  }
}

export default async function CatalogPage({ params, searchParams }: CatalogPageProps) {
  const { slug: slugArray } = await params;
  const query = await searchParams;
  const slug = slugArray ?? [];

  let category: StorefrontCategoryPath | null = null;
  if (slug.length > 0) {
    try {
      category = await StorefrontCatalogService.getCategoryByPath(slug.join('/'));
    } catch (error) {
      if (isNotFoundError(error)) notFound();
      throw error;
    }
  }

  const productsParams = {
    ...parseCatalogSearchParams(query),
    ...(slug.length > 0 ? { category: slug.join('/') } : {}),
  };

  const [productsResponse, filters] = await Promise.all([
    StorefrontCatalogService.getProducts(productsParams),
    StorefrontCatalogService.getFilters(),
  ]);

  const jsonLd = category?.seo?.structured_data;

  // Cada cambio de filtros cambia el query string: el `key` remonta la vista
  // (reset de estado local: página 1, inputs de precio, scroll infinito).
  const viewKey = Object.keys(query)
    .sort()
    .map((key) => `${key}=${Array.isArray(query[key]) ? query[key].join(',') : query[key]}`)
    .join('&');

  return (
    <>
      <ProductsCatalogView
        key={viewKey}
        slug={slug}
        category={category}
        products={toProductCardDataList(productsResponse.items)}
        pagination={productsResponse.pagination}
        filters={filters}
      />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}

import { DetailProductView } from '@/modules/products/DetailProductView';
import { StorefrontCatalogService } from '@/modules/products/services/storefront-catalog.service';
import { isNotFoundError } from '@/modules/products/utils/errors';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string }>;
}

function buildMetadata(
  product: Awaited<ReturnType<typeof StorefrontCatalogService.getProductBySlug>>,
): Metadata {
  const seo = product.seo;
  if (!seo) {
    return {
      title: `${product.name} | Whittard`,
      description: product.descriptions?.short ?? undefined,
    };
  }

  return {
    title: seo.meta_title ?? `${product.name} | Whittard`,
    description: seo.meta_description ?? product.descriptions?.short ?? undefined,
    keywords: seo.keywords ?? undefined,
    alternates: seo.canonical_url ? { canonical: seo.canonical_url } : undefined,
    robots: seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: seo.og_title ?? seo.meta_title ?? product.name,
      description:
        seo.og_description ?? seo.meta_description ?? product.descriptions?.short ?? undefined,
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await StorefrontCatalogService.getProductBySlug(slug);
    return buildMetadata(product);
  } catch (error) {
    if (isNotFoundError(error)) return {};
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const sitemap = await StorefrontCatalogService.getSitemap();
    return sitemap.products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { variant } = await searchParams;

  let product;
  try {
    product = await StorefrontCatalogService.getProductBySlug(slug, variant);
  } catch (error) {
    if (isNotFoundError(error)) notFound();
    throw error;
  }

  const jsonLd = product.seo?.structured_data;

  return (
    <>
      <DetailProductView product={product} />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}

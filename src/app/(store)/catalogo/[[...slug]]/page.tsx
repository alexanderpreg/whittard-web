import { redirect } from 'next/navigation';

import { ProductsCatalogView } from '@/modules/products/ProductsCatalogView';

const SUPPORTED_CATEGORIES = new Set([
  'tea',
  'coffee',
  'hot-chocolate',
  'gifts',
  'equipment',
  'biscuits-chocolates',
]);

interface CatalogPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { slug } = await params;
  const [category, subcategory] = slug ?? [];

  if (!category) {
    redirect('/catalogo/tea');
  }

  if (!SUPPORTED_CATEGORIES.has(category)) {
    redirect('/catalogo/tea');
  }

  return <ProductsCatalogView categorySlug={category} subcategorySlug={subcategory} />;
}

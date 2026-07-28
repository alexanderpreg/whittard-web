export function buildCategoryNavigationUrl(categorySlug: string, itemSlug?: string): string {
  if (!itemSlug) return `/catalogo/${categorySlug}`;

  return `/catalogo/${categorySlug}/${itemSlug}`;
}

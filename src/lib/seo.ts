import type { Metadata } from 'next';

/**
 * Bloque SEO del backend (estructuralmente compatible con `Seo`
 * del catálogo). Si viene, manda sobre los `defaults` de la página.
 */
export interface SeoData {
  meta_title?: string | null;
  meta_description?: string | null;
  keywords?: string[] | null;
  canonical_url?: string | null;
  robots?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  structured_data?: Record<string, unknown> | null;
  noindex?: boolean;
}

export interface BuildSeoMetadataOptions {
  /** SEO del backend. Si viene, gana sobre `defaults`. */
  seo?: SeoData | null;
  /** Contenido propio de la página (fallback). */
  defaults: {
    /** Pasa por `title.template` del layout raíz (`%s | Whittard Peru`). */
    title: string;
    description?: string | null;
    image?: string | null;
  };
}

function resolveRobots(seo?: SeoData | null): Metadata['robots'] | undefined {
  if (seo?.noindex) return { index: false, follow: false };

  if (seo?.robots) {
    const index = !seo.robots.includes('noindex');
    const follow = !seo.robots.includes('nofollow');
    // Solo devolvemos robots si realmente hay que restringir (Next ya indexa por defecto).
    return index && follow ? undefined : { index, follow };
  }

  return undefined;
}

function buildOpenGraph(
  seo: SeoData | null | undefined,
  defaults: BuildSeoMetadataOptions['defaults'],
): Metadata['openGraph'] | undefined {
  const title = seo?.og_title ?? seo?.meta_title;
  const description = seo?.og_description ?? seo?.meta_description ?? defaults.description;
  const image = seo?.og_image ?? defaults.image;

  if (!title && !description && !image) return undefined;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(image ? { images: [{ url: image }] } : {}),
  };
}

/**
 * Mapea el bloque SEO a la `Metadata` de Next.js respetando sus convenciones:
 * - `defaults.title` pasa por `title.template` del layout raíz.
 * - Si el backend envía `meta_title` (ya incluye la marca), se usa como
 *   `title.absolute` para no duplicar el sufijo.
 * - `robots` solo se define cuando hay que restringir el indexado.
 */
export function buildSeoMetadata({ seo, defaults }: BuildSeoMetadataOptions): Metadata {
  const description = seo?.meta_description ?? defaults.description ?? undefined;
  const canonical = seo?.canonical_url;
  const robots = resolveRobots(seo);
  const openGraph = buildOpenGraph(seo, defaults);

  return {
    title: seo?.meta_title ? { absolute: seo.meta_title } : defaults.title,
    description,
    ...(seo?.keywords?.length ? { keywords: seo.keywords } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(robots ? { robots } : {}),
    ...(openGraph ? { openGraph } : {}),
  };
}

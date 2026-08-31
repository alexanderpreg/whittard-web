interface SeoJsonLdProps {
  data: Record<string, unknown> | null | undefined;
}

/** Inyecta el JSON-LD (structured_data) del backend como <script> de SEO. */
export function SeoJsonLd({ data }: SeoJsonLdProps) {
  if (!data) return null;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

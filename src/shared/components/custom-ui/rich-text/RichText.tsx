import { cn } from '@/lib/utils';

export interface RichTextProps {
  html: string | null | undefined;
  className?: string;
}

/**
 * Renderiza contenido HTML del backend con la tipografía de
 * `@tailwindcss/typography` (prose) en la variante de marca `prose-brand`.
 */
export function RichText({ html, className }: RichTextProps) {
  if (!html) return null;

  return (
    <div
      className={cn('prose prose-sm prose-brand md:prose-base max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

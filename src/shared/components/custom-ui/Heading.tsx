import { cn } from '@/lib/utils/shadcn-cn';
import { cva } from 'class-variance-authority';

const headingVariants = cva('font-brand-elephant  text-brand-primary ', {
  variants: {
    variant: {
      // 1. Display: Para Banners principales o Hero en Home.
      // Móvil: 30px (3xl) -> Escritorio: 48px (5xl) máximo. No más.
      display: 'text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight md:leading-none',

      // 2. Heading: Títulos principales de páginas interiores o secciones importantes.
      // Móvil: 24px (2xl) -> Escritorio: 36px (4xl). Es el tamaño H1 real por excelencia.
      heading: 'text-2xl sm:text-3xl md:text-4xl font-bold leading-tight',

      // 3. Subheading: Para subtítulos que acompañan a un heading o secciones secundarias.
      // Móvil: 18px (lg) -> Escritorio: 24px (2xl). Equilibrio puro.
      subheading: 'text-lg sm:text-xl md:text-2xl font-semibold leading-snug ',

      // 4. CardTitle: Para títulos de tarjetas de productos, blogs o grillas pequeñas.
      // Móvil: 16px (base) -> Escritorio: 18px (lg). Se mantiene compacto pero legible.
      cardTitle: 'text-base sm:text-lg font-bold leading-snug',
    },
  },
  defaultVariants: {
    variant: 'heading',
  },
});

interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof HTMLElementTagNameMap;
  variant?: 'display' | 'heading' | 'subheading' | 'cardTitle';
}

export const Heading = ({
  as: Tag = 'h2',
  variant,
  className,
  children,
  ...props
}: HeadingProps) => {
  return (
    <Tag className={cn(headingVariants({ variant, className }))} {...props}>
      {children}
    </Tag>
  );
};

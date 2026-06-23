import { cn } from '@/lib/utils/shadcn-utils';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva('text-black', {
  variants: {
    variant: {
      body: 'text-sm sm:text-base tracking-wide ',
      small: 'text-xs sm:text-sm  tracking-wide leading-relaxed',
      caption: 'text-[11px] sm:text-xs  tracking-wide',
    },
    tone: {
      default: 'text-black',
      muted: 'daryza-gray-oficial',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: keyof HTMLElementTagNameMap;
}

/**
 * 🧱 Componente de texto escalable y responsive.
 * Sirve como base tipográfica para párrafos, descripciones o etiquetas.
 */
export const Text = ({ as: Tag = 'p', children, variant, className, ...props }: TextProps) => {
  return (
    <Tag className={cn(textVariants({ variant }), className)} {...props}>
      {children}
    </Tag>
  );
};

'use client';

import { formatCurrency } from '@/lib/utils';
import { ProductRating } from '@/modules/products/components/ProductRating';
import type {
  ProductDetail,
  ProductInformationSection,
  VariantGroup,
} from '@/modules/products/types/productDetail';
import { Badge } from '@/shared/components/shadcn-ui/badge';
import { Button } from '@/shared/components/shadcn-ui/button';
import { AlertTriangle } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { FavoriteButton } from './FavoriteButton';
import { ProductAttributeBadges } from './ProductAttributeBadges';
import { ProductInformationAccordion } from './ProductInformationAccordion';
import { ProductShare } from './ProductShare';
import { QuantitySelector } from './QuantitySelector';
import { VariantSelector } from './VariantSelector';

function simulateApi<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
}

function getDefaultOptions(groups: VariantGroup[]): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const group of groups) {
    const firstAvailable = group.options.find((o) => o.isAvailable);
    if (firstAvailable) {
      defaults[group.id] = firstAvailable.id;
    }
  }
  return defaults;
}

function getSelectedPrice(
  basePrice: number,
  groups: VariantGroup[],
  selectedOptions: Record<string, string>,
): number {
  for (const group of groups) {
    const selectedId = selectedOptions[group.id];
    if (!selectedId) continue;
    const option = group.options.find((o) => o.id === selectedId);
    if (option?.price !== undefined) return option.price;
  }
  return basePrice;
}

function getSelectedAvailability(
  groups: VariantGroup[],
  selectedOptions: Record<string, string>,
): boolean {
  for (const group of groups) {
    const selectedId = selectedOptions[group.id];
    if (!selectedId) return false;
    const option = group.options.find((o) => o.id === selectedId);
    if (!option?.isAvailable) return false;
  }
  return true;
}

interface ProductInfoProps {
  product: ProductDetail;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const hasVariants = product.variantGroups && product.variantGroups.length > 0;

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    hasVariants ? getDefaultOptions(product.variantGroups!) : {},
  );
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);

  const displayPrice = hasVariants
    ? getSelectedPrice(product.price, product.variantGroups!, selectedOptions)
    : product.price;
  const displayPromo = product.promoPrice;
  const isOutOfStock = hasVariants
    ? !getSelectedAvailability(product.variantGroups!, selectedOptions)
    : product.stock === 0;
  const maxStock = hasVariants ? (isOutOfStock ? 0 : 99) : product.stock;

  const hasPromo = displayPromo !== null;

  const accordionSections: ProductInformationSection[] = product.description
    ? [{ id: 'description', title: 'Descripción', content: '<p>' + product.description + '</p>' }]
    : [];

  const handleOptionChange = useCallback((groupId: string, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupId]: optionId }));
  }, []);

  const variantId = useMemo(
    () => Object.values(selectedOptions).sort().join('-'),
    [selectedOptions],
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {product.badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-[11px] tracking-wider uppercase">
              {badge}
            </Badge>
          ))}
        </div>

        <h1 className="font-brand-elephant text-brand-primary text-2xl leading-tight md:text-3xl">
          {product.name}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-2">
          {hasPromo ? (
            <>
              <span className="text-2xl font-bold text-red-600">
                {formatCurrency(displayPromo!)}
              </span>
              <span className="text-brand-secondary text-lg line-through">
                {formatCurrency(displayPrice)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold">{formatCurrency(displayPrice)}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2">
        <span className="flex items-center gap-1 text-sm leading-snug font-medium tracking-wide text-amber-600">
          Califica este producto:
        </span>
        <div className="flex items-center gap-3">
          <ProductRating
            value={userRating}
            onChange={(rating) => {
              toast.promise(simulateApi(rating), {
                loading: 'Enviando calificación...',
                success: `Gracias, calificaste con ${rating} estrella${rating !== 1 ? 's' : ''}`,
                error: 'Error al enviar calificación',
              });
              setUserRating(rating);
            }}
            size="md"
          />
          {userRating > 0 && <span className="text-brand-secondary text-xs">({userRating}/5)</span>}
        </div>
      </div>

      {hasVariants && (
        <VariantSelector
          groups={product.variantGroups!}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
        />
      )}

      <div className="flex flex-col gap-2">
        <label className="text-brand-primary text-sm font-medium tracking-wide">Cantidad</label>
        <div className="flex items-center gap-2">
          <QuantitySelector quantity={quantity} max={maxStock} onChange={setQuantity} />
          <Button
            size="lg"
            disabled={isOutOfStock}
            className="h-10 flex-1 cursor-pointer rounded-xs text-sm font-semibold tracking-widest uppercase"
          >
            {isOutOfStock ? 'Agotado' : 'Agregar a Cesta'}
          </Button>
          <FavoriteButton product={product} variantId={variantId} />
        </div>
        {!isOutOfStock && maxStock <= 5 && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-orange-600">
            <AlertTriangle className="h-3.5 w-3.5" />
            ¡Solo quedan {maxStock} unidades!
          </p>
        )}
      </div>

      {product.tagline && (
        <p className="text-brand-secondary text-sm leading-relaxed">{product.tagline}</p>
      )}

      {product.tags && <ProductAttributeBadges tags={product.tags} />}
      <ProductInformationAccordion sections={accordionSections} />

      <ProductShare title={product.name} />
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';

import type { ProductDetail } from '@/modules/products/types/catalog';
import {
  buildVariantGroups,
  findVariantForSelection,
  resolveValidSelection,
  toProductMedia,
} from '@/modules/products/utils/product-detail';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';

interface ProductHeroProps {
  product: ProductDetail;
}

export function ProductHero({ product }: ProductHeroProps) {
  const variants = useMemo(() => product.variants ?? [], [product.variants]);
  const groups = useMemo(() => buildVariantGroups(product), [product]);

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(() =>
    resolveValidSelection(variants, groups, {}),
  );

  const selectedVariant = useMemo(
    () => findVariantForSelection(variants, selectedValues) ?? variants[0] ?? null,
    [variants, selectedValues],
  );

  const media = useMemo(() => toProductMedia(product, selectedVariant), [product, selectedVariant]);

  const handleOptionChange = (groupId: string, optionId: string) => {
    setSelectedValues((prev) =>
      resolveValidSelection(variants, groups, { ...prev, [groupId]: optionId }),
    );
  };

  return (
    <div className="mb-20 grid gap-8 md:grid-cols-2 md:gap-12">
      <ProductGallery images={media} />
      <ProductInfo
        product={product}
        groups={groups}
        selectedValues={selectedValues}
        selectedVariant={selectedVariant}
        onOptionChange={handleOptionChange}
      />
    </div>
  );
}

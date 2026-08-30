export type MediaType = 'image' | 'video';

export type ProductMedia =
  | { type: 'image'; url: string; alt: string }
  | { type: 'video'; url: string; alt?: string };

export type VariantType = 'pills' | 'icon-grid' | 'vertical-list';

export interface VariantOption {
  id: string;
  label: string;
  sublabel?: string;
  price?: number;
  iconUrl?: string;
  /** Swatch de color cuando la opción no tiene imagen. */
  colorHex?: string;
  discountBadge?: string;
  isAvailable: boolean;
}

export interface VariantGroup {
  id: string;
  name: string;
  type: VariantType;
  options: VariantOption[];
}

export interface ProductInformationSection {
  id: string;
  title: string;
  content: string;
}

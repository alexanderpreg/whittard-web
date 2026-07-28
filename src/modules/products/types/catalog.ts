import type { ProductCardData } from './productCard';

export type CatalogSort = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface CatalogFacet {
  type: string[];
  presentation: string[];
  origin: string[];
  nutrition: string[];
  flavor: string[];
}

export interface CatalogProduct extends ProductCardData {
  facets: CatalogFacet;
  category: string;
}

import type { ApiResponse } from '@/lib/types';

import type {
  StorefrontCatalogFilters,
  StorefrontCatalogResponse,
  StorefrontCategoryPath,
  StorefrontProductCard,
  StorefrontProductDetail,
  StorefrontSitemap,
} from '../types/storefront';

export interface CatalogQueryParams {
  /** Ruta completa de categoría (ej: `tea/black-tea`). Incluye descendientes. */
  category?: string;
  /** LIKE sobre name, slug y brand. */
  search?: string;
  /** LIKE sobre variants.sku. */
  sku?: string;
  /** IDs de sabores (OR). */
  flavorIds?: string[];
  /** IDs de sellos (OR). */
  attributionIds?: string[];
  /** IDs de opciones de atributo (AND). */
  attributeOptionIds?: string[];
  /** Precio efectivo mínimo. */
  priceMin?: number;
  /** Precio efectivo máximo. */
  priceMax?: number;
  /** Solo productos con stock disponible. */
  inStock?: boolean;
  /** `name`, `price`, `rating`, `created_at`; prefijo `-` = desc. */
  sort?: string;
  /** Items por página (default 24, tope 48). */
  perPage?: number;
  /** Cursor opaco para scroll infinito. */
  cursor?: string;
}

export type CatalogRequestOptions = {
  auth?: boolean | 'optional';
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export interface CatalogHttpClient {
  get<T>(endpoint: string, options?: CatalogRequestOptions): Promise<ApiResponse<T>>;
}

export interface StorefrontCatalogRepository {
  getProducts(
    params?: CatalogQueryParams,
    options?: CatalogRequestOptions,
  ): Promise<StorefrontCatalogResponse>;
  getFilters(options?: CatalogRequestOptions): Promise<StorefrontCatalogFilters>;
  getCategoryByPath(path: string, options?: CatalogRequestOptions): Promise<StorefrontCategoryPath>;
  getProductBySlug(
    slug: string,
    variant?: string,
    options?: CatalogRequestOptions,
  ): Promise<StorefrontProductDetail>;
  getSitemap(options?: CatalogRequestOptions): Promise<StorefrontSitemap>;
}

export type {
  StorefrontCatalogFilters,
  StorefrontCatalogResponse,
  StorefrontProductCard,
  StorefrontProductDetail,
};

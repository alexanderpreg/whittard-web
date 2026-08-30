import { ApiServer } from '@/lib/http/server/api-server';

import { RemoteStorefrontCatalogRepository } from '../repository/storefront-catalog.repository';
import type {
  CatalogHttpClient,
  CatalogQueryParams,
  CatalogRequestOptions,
  StorefrontCatalogRepository,
} from '../repository/types';
import type {
  StorefrontCatalogFilters,
  StorefrontCatalogResponse,
  StorefrontCategoryPath,
  StorefrontProductDetail,
  StorefrontSitemap,
} from '../types/storefront';

/**
 * Endpoints públicos de solo lectura: se cachean con ISR (revalidate) y se
 * invalidan al crear/actualizar un producto en el backend.
 */
export const STORE_PUBLIC_REVALIDATE = 60;

const PUBLIC_OPTIONS: CatalogRequestOptions = {
  auth: false,
  cache: 'force-cache',
  next: { revalidate: STORE_PUBLIC_REVALIDATE },
};

const serverRepository: StorefrontCatalogRepository = new RemoteStorefrontCatalogRepository(
  ApiServer as unknown as CatalogHttpClient,
);

/** Servicio para Server Components (SSR/ISR). */
export const StorefrontCatalogService = {
  getProducts(params?: CatalogQueryParams): Promise<StorefrontCatalogResponse> {
    return serverRepository.getProducts(params, PUBLIC_OPTIONS);
  },

  getFilters(): Promise<StorefrontCatalogFilters> {
    return serverRepository.getFilters(PUBLIC_OPTIONS);
  },

  getCategoryByPath(path: string): Promise<StorefrontCategoryPath> {
    return serverRepository.getCategoryByPath(path, PUBLIC_OPTIONS);
  },

  getProductBySlug(slug: string, variant?: string): Promise<StorefrontProductDetail> {
    return serverRepository.getProductBySlug(slug, variant, PUBLIC_OPTIONS);
  },

  getSitemap(): Promise<StorefrontSitemap> {
    return serverRepository.getSitemap({ auth: false });
  },
};

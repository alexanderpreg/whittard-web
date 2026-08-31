import { buildQueryString } from '@/lib/utils';

import type {
  CatalogFilters,
  CatalogResponse,
  CategoryPath,
  ProductDetail,
  Sitemap,
} from '../types/catalog';
import type {
  CatalogHttpClient,
  CatalogQueryParams,
  CatalogRepository,
  CatalogRequestOptions,
} from './types';

const STORE_V1_BASE = 'api/v1';

function toQuery(
  params: CatalogQueryParams,
): Record<string, string | number | boolean | undefined> {
  return {
    'filter[category]': params.category,
    'filter[search]': params.search,
    'filter[sku]': params.sku,
    'filter[flavor_ids]': params.flavorIds?.length ? params.flavorIds.join(',') : undefined,
    'filter[attribution_ids]': params.attributionIds?.length
      ? params.attributionIds.join(',')
      : undefined,
    'filter[attribute_option_ids]': params.attributeOptionIds?.length
      ? params.attributeOptionIds.join(',')
      : undefined,
    'filter[price_min]': params.priceMin,
    'filter[price_max]': params.priceMax,
    'filter[in_stock]': params.inStock,
    sort: params.sort,
    per_page: params.perPage,
    cursor: params.cursor,
  };
}

function withQuery(endpoint: string, params?: CatalogQueryParams): string {
  if (!params) return endpoint;
  const query = buildQueryString(toQuery(params));
  return query ? `${endpoint}?${query}` : endpoint;
}

export class RemoteCatalogRepository implements CatalogRepository {
  constructor(private readonly http: CatalogHttpClient) {}

  getProducts(
    params?: CatalogQueryParams,
    options?: CatalogRequestOptions,
  ): Promise<CatalogResponse> {
    const endpoint = withQuery(`${STORE_V1_BASE}/products`, params);
    return this.http.get<CatalogResponse>(endpoint, options).then((response) => response.data);
  }

  getFilters(options?: CatalogRequestOptions): Promise<CatalogFilters> {
    return this.http
      .get<CatalogFilters>(`${STORE_V1_BASE}/catalog/filters`, options)
      .then((response) => response.data);
  }

  getCategoryByPath(path: string, options?: CatalogRequestOptions): Promise<CategoryPath> {
    return this.http
      .get<CategoryPath>(`${STORE_V1_BASE}/catalog/categories/by-path/${path}`, options)
      .then((response) => response.data);
  }

  getProductBySlug(
    slug: string,
    variant?: string,
    options?: CatalogRequestOptions,
  ): Promise<ProductDetail> {
    const query = variant ? buildQueryString({ variant }) : '';
    const endpoint = `${STORE_V1_BASE}/products/${slug}${query ? `?${query}` : ''}`;
    return this.http.get<ProductDetail>(endpoint, options).then((response) => response.data);
  }

  getSitemap(options?: CatalogRequestOptions): Promise<Sitemap> {
    return this.http
      .get<Sitemap>(`${STORE_V1_BASE}/sitemap`, options)
      .then((response) => response.data);
  }
}

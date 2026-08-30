import type { ApiResponse } from '@/lib/types';

/**
 * Tipos del catálogo público del backend (storefront).
 *
 * Contrato real de los 5 endpoints públicos de `app/Modules/Product/Resources/StoreFront`:
 *   - GET /api/v1/products
 *   - GET /api/v1/catalog/filters
 *   - GET /api/v1/catalog/categories/by-path/{slug...}
 *   - GET /api/v1/products/{slug}
 *   - GET /api/v1/sitemap
 *
 * Ver `docs/specs/productos/storefront-product-catalog-web-integration.md`.
 */

export interface StorefrontPagination {
  per_page: number;
  has_more: boolean;
  next_cursor: string | null;
  prev_cursor: string | null;
}

export interface StorefrontSeo {
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  canonical_url: string | null;
  robots: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  structured_data: Record<string, unknown> | null;
  noindex: boolean;
}

export interface StorefrontCategoryRef {
  id: string;
  name: string;
  slug: string;
  parent?: StorefrontCategoryRef | null;
}

export interface StorefrontDefaultVariant {
  id: string;
  sku: string;
  price: number | null;
  effective_price: number | null;
  sale_price: number | null;
  sale_price_starts_at: string | null;
  sale_price_ends_at: string | null;
  on_sale: boolean;
  available_stock: number;
  in_stock: boolean;
  attributes: Record<string, string>;
  image_url: string | null;
  hover_image_url: string | null;
}

export interface StorefrontAttribution {
  id: string;
  name: string;
  image_url: string | null;
}

export interface StorefrontFlavor {
  id: string;
  name: string;
}

export interface StorefrontProductCard {
  id: string;
  name: string;
  slug: string;
  brand: string | null;
  category: StorefrontCategoryRef | null;
  default_variant: StorefrontDefaultVariant;
  rating: { avg: number; count: number };
  flavors: StorefrontFlavor[];
  attributions: StorefrontAttribution[];
}

export interface StorefrontAttributeOption {
  id: string;
  value: string;
  image_url: string | null;
  color_hex: string | null;
  order: number;
  products_count?: number;
}

export interface StorefrontAttribute {
  id: string;
  type: string;
  label: string;
  options: StorefrontAttributeOption[];
}

export interface StorefrontVariantMedia {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  url: string | null;
  is_primary: boolean;
  order: number;
}

export interface StorefrontVariant {
  id: string;
  sku: string;
  order: number;
  price: number | null;
  effective_price: number | null;
  sale_price: number | null;
  sale_price_starts_at: string | null;
  sale_price_ends_at: string | null;
  on_sale: boolean;
  available_stock: number;
  in_stock: boolean;
  is_primary: boolean;
  attributes: Record<string, string>;
  media: StorefrontVariantMedia[];
}

export interface StorefrontProductDetail extends Omit<StorefrontProductCard, 'default_variant'> {
  country_of_origin: string | null;
  descriptions: {
    short: string | null;
    long: string | null;
    ingredients: string | null;
    specifications: string | null;
  };
  seo: StorefrontSeo | null;
  attributes: StorefrontAttribute[];
  variants: StorefrontVariant[];
  combinable_products: StorefrontProductCard[];
  similar_products: StorefrontProductCard[];
}

export interface StorefrontFilterCategory {
  id: string;
  name: string;
  slug: string;
  products_count: number;
  children?: StorefrontFilterCategory[];
}

export interface StorefrontFilterOption {
  id: string;
  name: string;
  products_count: number;
}

export interface StorefrontCatalogFilters {
  categories: StorefrontFilterCategory[];
  flavors: StorefrontFilterOption[];
  attributions: (StorefrontAttribution & { products_count: number })[];
  attributes: StorefrontAttribute[];
  price: { min: number; max: number };
  total_products: number;
}

export interface StorefrontCategoryPath {
  category: { id: string; name: string; slug: string; products_count: number };
  breadcrumb: { id: string | null; name: string; slug: string }[];
  children: { id: string; name: string; slug: string; products_count: number }[];
  parent: { id: string; name: string; slug: string } | null;
  seo: StorefrontSeo | null;
}

export interface StorefrontCatalogResponse {
  items: StorefrontProductCard[];
  pagination: StorefrontPagination;
}

export interface StorefrontSitemap {
  categories: { slug: string }[];
  products: { slug: string; updated_at: string }[];
}

export type StorefrontCatalogResponseEnvelope = ApiResponse<StorefrontCatalogResponse>;
export type StorefrontFiltersEnvelope = ApiResponse<StorefrontCatalogFilters>;
export type StorefrontCategoryPathEnvelope = ApiResponse<StorefrontCategoryPath>;
export type StorefrontProductDetailEnvelope = ApiResponse<StorefrontProductDetail>;
export type StorefrontSitemapEnvelope = ApiResponse<StorefrontSitemap>;

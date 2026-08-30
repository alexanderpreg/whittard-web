import { ApiClient } from '@/lib/http/client/api-client';

import { RemoteStorefrontCatalogRepository } from '../repository/storefront-catalog.repository';
import type { CatalogHttpClient, StorefrontCatalogRepository } from '../repository/types';

let clientRepository: StorefrontCatalogRepository | null = null;

/** Repositorio para el navegador (scroll infinito, refetches desde el cliente). */
export function getClientStorefrontCatalogRepository(): StorefrontCatalogRepository {
  if (!clientRepository) {
    clientRepository = new RemoteStorefrontCatalogRepository(
      ApiClient as unknown as CatalogHttpClient,
    );
  }
  return clientRepository;
}

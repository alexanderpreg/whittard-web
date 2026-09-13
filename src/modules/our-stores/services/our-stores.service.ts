import { ApiServer } from '@/lib/http/server/api-server';
import { PhysicalStoreSection } from '../types/our-store.types';

export async function getPhysicalStores(): Promise<PhysicalStoreSection | null> {
  try {
    const response = await ApiServer.get<PhysicalStoreSection>(
      'api/v1/configuration/physical-stores',
      {
        auth: false,
        next: {
          revalidate: 60,
        },
      },
    );

    return response.data;
  } catch {
    return null;
  }
}

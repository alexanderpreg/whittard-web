// app/our-stores/page.tsx
import { OurStoreView } from '@/modules/our-stores/OurStoreView';
import { getPhysicalStores } from '@/modules/our-stores/services/our-stores.service';

export const metadata = {
  title: 'Nuestras Tiendas',
  description: 'Encuéntranos en los siguientes establecimientos.',
};

export default async function OurStoresPage() {
  const storeSection = await getPhysicalStores();

  return <OurStoreView storeSection={storeSection} />;
}

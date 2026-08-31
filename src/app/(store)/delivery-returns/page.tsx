import { buildSeoMetadata } from '@/lib/seo';
import { DeliveryAndReturnsView } from '@/modules/delivery-returns/DeliveryReturns';

export const metadata = buildSeoMetadata({
  defaults: {
    title: 'Delivery & Devoluciones',
    description:
      'Conoce los plazos de entrega, costos de envío y políticas de devolución de Whittard Perú.',
  },
});

export default function Page() {
  return <DeliveryAndReturnsView />;
}

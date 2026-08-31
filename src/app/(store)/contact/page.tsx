import { buildSeoMetadata } from '@/lib/seo';
import { ContactView } from '@/modules/contact/ContactView';

export const metadata = buildSeoMetadata({
  defaults: {
    title: 'Atención al Cliente',
    description:
      'Contacta con Whittard Perú por WhatsApp o email para consultas sobre tus pedidos, envíos y productos.',
  },
});

export default function Page() {
  return <ContactView />;
}

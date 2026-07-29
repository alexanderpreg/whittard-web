import { Container } from '@/shared/components/custom-ui/Container';
import { PageHeroBanner } from '@/shared/components/custom-ui/PageHeroBanner';
import { ContactChannels } from './components/ContactChannels';
import type { ContactPageData } from './types/contact';

// TODO: reemplazar con fetch al backend
const CONTACT_DATA: ContactPageData = {
  channels: [
    {
      iconUrl: '/contact-us/whatsappicon.png',
      title: 'Hablemos por WhatsApp',
      description:
        'En Whittard Perú estamos para ayudarte. Puedes comunicarte con nosotros de lunes a viernes de 8am a 6pm',
      buttonLabel: 'Comunicarte',
      href: 'https://wa.me/51999999999',
    },
    {
      iconUrl: '/contact-us/emailicon.png',
      title: 'Consultas sobre Whittard',
      description:
        'Para reclamos o incidencias, escríbenos a branding@onzafoods.com. También puedes seguirnos en nuestras redes oficiales para conocer novedades, promociones y lanzamientos.',
      buttonLabel: 'Comunicarte',
      href: 'mailto:branding@onzafoods.com',
    },
  ],
};

export function ContactView() {
  return (
    <Container as="main" size="full" className="mb-6 flex-1">
      <PageHeroBanner title="Atención al Cliente" imageUrl="/banner-static.png" />

      <div className="mx-auto mt-14 mb-14 max-w-[713px] px-4">
        <ContactChannels channels={CONTACT_DATA.channels} />
      </div>
    </Container>
  );
}

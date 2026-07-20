import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { Text } from '@/shared/components/custom-ui/Text';
import Link from 'next/link';
import type { ContactChannel } from '../types/contact';

interface ContactChannelsProps {
  channels: ContactChannel[];
}

export function ContactChannels({ channels }: ContactChannelsProps) {
  return (
    <div className="mx-auto max-w-[800px] space-y-16">
      {channels.map((channel) => (
        // Contenedor principal de la fila
        <div key={channel.title} className="flex items-center gap-10">
          {/* Columna izquierda: Contenedor circular con centrado absoluto */}
          <div className="relative mr-16 flex h-[220px] w-[220px] shrink-0 items-center justify-center">
            {/* Fondo: Centrado absoluto */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AppImage
                src="/contact-us/circulo-fill.png"
                alt="Background"
                width={220}
                height={220}
                className="h-full w-full object-contain"
                skeleton={false}
              />
            </div>

            {/* Ícono: Centrado absoluto sobre el fondo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AppImage
                src={channel.iconUrl}
                alt={channel.title}
                width={100}
                height={100}
                className="object-contain"
                skeleton={false}
                fallback={<div className="size-[100px]" />}
              />
            </div>
          </div>

          {/* Columna derecha: Bloque de texto y botón */}
          <div className="flex-1 space-y-4">
            <Heading
              as="h2"
              variant="subheading"
              className="font-brand-elephant text-brand-primary text-[26px] leading-tight"
            >
              {channel.title}
            </Heading>

            <Text
              variant="body"
              className="text-brand-secondary text-sm leading-relaxed font-light"
            >
              {channel.title.includes('WhatsApp') ? (
                channel.description
              ) : (
                <>
                  Para reclamos o incidencias, escríbenos a{' '}
                  <span className="text-brand-primary font-bold">branding@onzafoods.com</span>.
                  También puedes seguirnos en nuestras redes oficiales para conocer novedades,
                  promociones y lanzamientos.
                </>
              )}
            </Text>

            <Link
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-white inline-flex h-[51px] w-[250px] items-center justify-center border text-sm tracking-widest uppercase transition-colors"
            >
              {channel.buttonLabel}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

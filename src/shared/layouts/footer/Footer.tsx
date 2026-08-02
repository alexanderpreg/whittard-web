import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Container } from '@/shared/components/custom-ui/Container';
import { Heading } from '@/shared/components/custom-ui/Heading';

import { footerColumns, footerContacts, footerPayments, footerSocials } from './footer.data';
import { NewsletterSection } from './NewsletterSection';

export default function Footer() {
  const officeContact =
    footerContacts.find((contact) => contact.label === 'Dirección') ?? footerContacts[0];

  return (
    <footer className="bg-brand-primary text-white">
      <Container as="div" size="container" className="space-y-10 px-4 pt-10">
        <div className="grid gap-8 lg:grid-cols-[0.5fr_1.5fr] lg:gap-20 xl:gap-4 2xl:gap-8">
          <div className="space-y-6">
            <Link href="/" aria-label="Inicio" className="inline-flex">
              <AppImage
                src="/logo-whittard.png"
                alt="Whittard"
                className="object-contain"
                width={137}
                height={43}
                skeleton={false}
                fallback={
                  <div className="flex h-10.5 w-34 items-center justify-center rounded-md border border-dashed text-xs font-medium">
                    Error Logo Whittard
                  </div>
                }
              />
            </Link>
            <div className="flex flex-col gap-8">
              {/* Teléfono */}
              <div className="space-y-3">
                <Link href="tel:+51999999999" className="group flex items-center gap-3">
                  <Phone size={18} className="shrink-0" />
                  <span className="text-sm underline-offset-4 group-hover:underline">
                    +51 999 999 999
                  </span>
                </Link>

                {/* Email */}
                <Link href="mailto:branding@onza.com" className="group flex items-center gap-3">
                  <Mail size={18} className="shrink-0" />
                  <span className="text-sm underline-offset-4 group-hover:underline">
                    branding@onza.com
                  </span>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                {footerSocials.map((social) => {
                  return (
                    <a
                      key={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={social.href}
                      aria-label={social.label}
                      className="inline-flex items-center justify-center transition-transform hover:-translate-y-0.5"
                    >
                      <AppImage
                        src={social.icon}
                        alt={social.label}
                        width={20}
                        height={20}
                        skeleton={false}
                        className="size-5 object-contain"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid justify-between gap-8 md:grid-cols-2 xl:grid-cols-[auto_auto_auto_auto]">
            <div className="space-y-4">
              <Heading as="h3" variant="cardTitle" className="font-brand-avenir-lt! text-white">
                Oficina Central
              </Heading>
              <Link
                href={officeContact.href}
                className="block max-w-xs text-sm leading-relaxed text-white underline-offset-4 hover:underline"
              >
                Av. Mariscal La Mar 326
                <br />
                Miraflores - Lima, Perú
              </Link>

              <div className="space-y-2">
                <Heading as="h3" variant="cardTitle" className="font-brand-avenir-lt! text-white">
                  Horario de Atención
                </Heading>
                <p className="text-sm text-white">Lunes-Viernes: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-4">
                <Heading as="h3" variant="cardTitle" className="font-brand-avenir-lt! text-white">
                  {column.title}
                </Heading>

                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/80 transition-colors hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-4">
              <NewsletterSection />
            </div>
          </div>
        </div>

        {/* <div className="mt-10 pb-6">
          <NewsletterSection />
        </div> */}
        <div className="flex items-end justify-between border-t border-white/15 py-6">
          {' '}
          <p className="text-center text-sm leading-relaxed text-white/70">
            © 2012-2024, Whittard S.A.C. RUC 2000000000 Todos los derechos reservados. Desarrollado
            @WAVTechnology
          </p>
          <div className="flex h-full w-fit flex-wrap items-center justify-center gap-2.5 lg:justify-end">
            {footerPayments.map((payment) => (
              <span key={payment.label} className="flex h-full w-fit items-center">
                <AppImage
                  src={payment.icon}
                  alt={payment.label}
                  width={155}
                  height={60}
                  skeleton={false}
                  className="h-auto w-10 object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

'use client';

import { Heart, HelpCircle, LogOut, MapPin, Package, ShieldCheck, Truck, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils/shadcn-cn';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/shadcn-ui/alert-dialog';

const NAV_ITEMS = [
  { label: 'Mis Datos', href: '/mi-cuenta', icon: User },
  { label: 'Mis Órdenes', href: '/mi-cuenta/ordenes', icon: Package },
  { label: 'Dirección', href: '/mi-cuenta/direcciones', icon: MapPin },
  { label: 'Lista de Deseos', href: '/mi-cuenta/deseos', icon: Heart },
];

const SUPPORT_LINKS = [
  { label: 'Preguntas Frecuentes', href: '/faq', icon: HelpCircle },
  { label: 'Delivery y Devoluciones', href: '/delivery-returns', icon: Truck },
  { label: 'Políticas de Privacidad', href: '/privacy-policy', icon: ShieldCheck },
  { label: 'Términos y Condiciones', href: '/terms', icon: ShieldCheck },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-full space-y-6">
      <div>
        <p className="text-brand-primary border-brand-primary/40 font-brand-elephant mb-3 border-b pb-2 text-sm font-semibold tracking-wider uppercase">
          Mi Cuenta
        </p>
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/mi-cuenta'
                ? pathname === '/mi-cuenta'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-secondary hover:bg-brand-100 hover:text-brand-primary',
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="text-brand-secondary flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors hover:text-red-500"
              >
                <LogOut className="size-4" />
                Cerrar Sesión
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                <AlertDialogDescription>
                  Confirma si deseas salir de tu cuenta y volver al inicio de sesión.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={() => router.push('/login')}>
                  Cerrar sesión
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </nav>
      </div>

      <div>
        <p className="text-brand-primary border-brand-primary/40 font-brand-elephant mb-3 border-b pb-2 text-sm font-semibold tracking-wider uppercase">
          Atención al Cliente
        </p>
        <nav className="space-y-0.5">
          {SUPPORT_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-secondary hover:bg-brand-100 hover:text-brand-primary',
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-brand-200 border bg-[#FAFAFA] px-5 py-6 text-center">
        <p className="font-brand-elephant text-brand-primary mb-4 text-lg font-bold">Contáctanos</p>
        <div className="text-brand-secondary space-y-4 text-sm leading-snug">
          <p>En Whittard Perú estamos para ayudarte.</p>
          <p>
            Puedes comunicarte con nosotros de{' '}
            <span className="font-bold">lunes a viernes de 8am a 6pm.</span>
          </p>
          <p>
            Para consultas generales, escríbenos por WhatsApp al{' '}
            <span className="font-bold">(Confirmar número).</span>
          </p>
          <p>
            Para reclamos o incidencias, escríbenos a{' '}
            <span className="font-bold">branding@onzafoods.com.</span>
          </p>
          <p>
            También puedes seguirnos en nuestras redes oficiales para conocer novedades, promociones
            y lanzamientos.
          </p>
        </div>
      </div>
    </aside>
  );
}

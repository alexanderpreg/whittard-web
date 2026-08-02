import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Container } from '@/shared/components/custom-ui/Container';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { ScrollToTop } from '@/shared/components/custom-ui/ScrollToTop';
import { ImageOff } from 'lucide-react';
import { LoginForm } from './components/LoginForm';

const LOGIN_BREADCRUMBS = [
  { label: 'Inicio', href: '/' },
  { label: 'Iniciar Sesión' }, // Sin 'href' porque es la página actual
];

export function LoginView() {
  return (
    <Container as="main" className="my-8 flex-1 space-y-6">
      <ScrollToTop />

      <PageBreadcrumb items={LOGIN_BREADCRUMBS} />
      <Heading as="h1" variant="heading" className="text-brand-primary">
        Iniciar Sesión
      </Heading>
      <div className="grid w-full grid-cols-1 items-stretch justify-between gap-10 lg:grid-cols-2 lg:gap-20">
        <LoginForm />

        <div className="relative ml-auto hidden aspect-4/3 w-full lg:block">
          <AppImage
            src="/home/bannerHome.png"
            alt="Pantalla de inicio de sesión"
            fill
            sizes="(max-width: 768px) 100vw, 50vw" // mobile: 100%, desktop: 50%
            fallback={
              <div className="text-brand-primary bg-brand-200 flex h-full w-full flex-col items-center justify-center rounded-lg border">
                <ImageOff className="mb-2 size-10" strokeWidth={1.5} />
                <span className="text-sm font-medium">Sin imagen</span>
              </div>
            }
          />
        </div>
      </div>
    </Container>
  );
}

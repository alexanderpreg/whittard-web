import { ImageOff } from 'lucide-react';

import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Container } from '@/shared/components/custom-ui/Container';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { RegisterForm } from './components/RegisterForm';

const REGISTER_BREADCRUMBS = [{ label: 'Inicio', href: '/' }, { label: 'Registro' }];

export function RegisterView() {
  return (
    <Container as="main" className="my-8 flex-1 space-y-6">
      <PageBreadcrumb items={REGISTER_BREADCRUMBS} />

      <Heading as="h1" variant="heading" className="text-brand-primary">
        Registro
      </Heading>

      <div className="grid w-full grid-cols-1 items-stretch justify-between gap-10 lg:grid-cols-2 lg:gap-20">
        <RegisterForm />

        <div className="relative ml-auto hidden aspect-4/3 max-h-150 w-full lg:block">
          <AppImage
            src="/home/bannerRegister.png"
            alt="Registro de usuario"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            fallback={
              <div className="bg-brand-200 text-brand-primary flex h-full w-full flex-col items-center justify-center rounded-lg border">
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

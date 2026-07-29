'use client';

import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Container } from '@/shared/components/custom-ui/Container';
import { Button } from '@/shared/components/shadcn-ui/button';

import { clearCheckoutData } from './store/checkout-storage';

export function CheckoutSuccessView() {
  const router = useRouter();

  useEffect(() => {
    clearCheckoutData();
  }, []);

  return (
    <Container as="main" className="flex min-h-[60vh] items-center justify-center py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="bg-brand-quaternary/10 mx-auto mb-6 flex size-20 items-center justify-center rounded-full">
          <CheckCircle className="text-brand-quaternary size-10" />
        </div>
        <h1 className="font-brand-elephant text-brand-primary mb-3 text-2xl">
          ¡Compra registrada!
        </h1>
        <p className="text-brand-secondary mb-2 text-sm">
          Hemos recibido tu pedido correctamente. Te enviaremos un correo con los detalles de tu
          compra y el número de seguimiento.
        </p>
        <p className="text-brand-secondary mb-8 text-xs">
          Si elegiste transferencia bancaria, tu pedido se procesará una vez confirmado el pago.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            onClick={() => router.push('/')}
            className="bg-brand-primary hover:bg-brand-primary/90 h-12 rounded-xs px-8 text-white"
          >
            Ir al inicio
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/carrito')}
            className="h-12 rounded-xs px-8"
          >
            Ver mis pedidos
          </Button>
        </div>
      </div>
    </Container>
  );
}

'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

import { Heading } from '@/shared/components/custom-ui/Heading';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Enviar el correo a tu API / servicio de suscripción
    console.log('Correo suscrito:', email);
    setEmail('');
  };

  return (
    <div className="flex max-w-62.5 flex-col gap-4">
      <div className="space-y-4">
        <Heading as="h3" variant="cardTitle" className="font-brand-avenir-lt! text-white">
          ¡Suscríbete y obtén 15% OFF en tu primera compra!{' '}
        </Heading>
        {/* <p className="text-sm text-white/80">
          Únete a la familia Whittard para tener acceso a emocionante Promociones, nuevas Productos,
          recetas, concursos y mucho más.
        </p> */}
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo electrónico"
          required
          className="h-10 w-full rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/50 transition-colors focus:border-white focus:bg-white/20 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Suscribirse"
          className="text-brand-primary inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold hover:bg-white/90"
        >
          <span>Suscribirme</span>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

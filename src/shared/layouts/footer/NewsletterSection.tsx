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
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <Heading as="h3" variant="cardTitle" className="text-white">
          Suscríbete a nuestro boletín
        </Heading>
        <p className="text-sm text-white/80">
          Recibe ofertas exclusivas, novedades y promociones directo en tu correo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo electrónico"
          required
          className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/50 transition-colors focus:border-white focus:bg-white/20 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Suscribirse"
          className="text-brand-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold hover:bg-white/90"
        >
          <span>Suscribirme</span>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

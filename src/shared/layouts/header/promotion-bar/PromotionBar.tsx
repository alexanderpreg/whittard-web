'use client';
import { useScrollTop } from '@/lib/hooks/useScrollTop';
import { Container } from '@/shared/components/custom-ui/Container';
import { Countdown } from '@/shared/components/custom-ui/countdown';
import { Button } from '@/shared/components/shadcn-ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const SCROLL_THRESHOLD = 0;

export function PromotionBar() {
  const [isDismissed, setIsDismissed] = useState(false);
  const isAtTop = useScrollTop(SCROLL_THRESHOLD);
  const endDate = new Date('2026-07-10T23:59:59-05:00');

  const isVisible = !isDismissed && isAtTop;

  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
        isVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        <Container
          as="section"
          size="full"
          className={`bg-brand-tertiary text-brand-white relative h-14 transition-opacity duration-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex h-full items-center justify-center gap-10">
            <span className="hidden text-sm font-medium sm:block">15% en todo. Termina en:</span>
            <Countdown endDate={endDate} />
            <Button
              asChild
              size="sm"
              className="bg-brand-white text-brand-primary hover:bg-brand-white/90 h-8 rounded-xs px-8 font-semibold"
            >
              <Link href="/coffee">Shop Coffee</Link>
            </Button>
          </div>
          <button
            type="button"
            aria-label="Cerrar barra promocional"
            onClick={() => setIsDismissed(true)}
            className="absolute top-1/2 right-4 flex size-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </Container>
      </div>
    </div>
  );
}

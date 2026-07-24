import { AppImage } from '@/shared/components/custom-ui/app-image';
import Link from 'next/link';
import type { TasteProductCard } from '../types/taste';

interface TasteProductGridProps {
  cards: TasteProductCard[];
}

export function TasteProductGrid({ cards }: TasteProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.href} className="flex flex-col items-center gap-6">
          <div className="relative aspect-[331/352] w-full overflow-hidden">
            <AppImage
              src={card.imageUrl}
              alt={card.label}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
              skeleton={false}
              fallback={
                <div className="border-brand-200 text-brand-secondary flex size-full items-center justify-center border border-dashed text-xs">
                  {card.label}
                </div>
              }
            />
          </div>

          <Link
            href={card.href}
            className="text-brand-primary hover:bg-brand-primary hover:text-brand-white inline-flex h-12 w-full max-w-[250px] items-center justify-center border border-[#435764] text-sm font-medium tracking-widest transition-colors"
          >
            {card.label}
          </Link>
        </div>
      ))}
    </div>
  );
}

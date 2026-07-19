'use client';

import Link from 'next/link';

import { AppImage } from '@/shared/components/custom-ui/app-image';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { Text } from '@/shared/components/custom-ui/Text';
import { SummerFavoritesData } from '../types/SummerFavorites';

interface SummerFavoritesProps {
  content: SummerFavoritesData;
}

export function SummerFavorites({ content }: SummerFavoritesProps) {
  const { imageUrl, title, description } = content;

  return (
    <section className="overflow-hidden rounded-xs">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative inline-flex h-full w-full">
          <AppImage
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-cover"
            skeleton={false}
            fallback={
              <div className="border-brand-primary flex size-full min-h-62.5 items-center justify-center rounded-l-md border border-r-0 border-dashed text-center text-xs font-medium">
                Error imagen favoritos de verano
              </div>
            }
          />
        </div>

        <div className="bg-brand-300 flex items-center justify-center px-6 py-10">
          <div className="max-w-md text-center">
            <Heading as="h2" variant="heading" className="font-brand-elephant mb-5">
              {title}
            </Heading>

            <Text variant="body" className="text-brand-primary mb-8 text-sm">
              {description}
            </Text>

            <Link
              href="/productos"
              className="bg-brand-pink text-brand-primary inline-flex h-12 items-center justify-center rounded-xs px-10 text-sm font-medium tracking-widest transition-colors lg:text-base"
            >
              Comprar ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

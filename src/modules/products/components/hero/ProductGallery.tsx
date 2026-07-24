'use client';

import { cn } from '@/lib/utils';
import type { ProductMedia } from '@/modules/products/types/productDetail';
import { AppImage } from '@/shared/components/custom-ui/app-image';
import { VideoSlide } from '@/shared/components/custom-ui/banner/VideoSlide';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbs,
} from '@/shared/components/custom-ui/carousel';
import { ChevronLeftIcon, ChevronRightIcon, Play } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductMedia[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div>
      <Carousel className="w-full" opts={{ loop: images.length > 1 }}>
        <div className="relative">
          <CarouselContent className="ml-0">
            {images.map((media, index) => (
              <CarouselItem key={`${media.url}-${media.type}-${index}`} className="pl-0">
                <div className="border-brand-primary/20 relative aspect-square w-full overflow-hidden rounded-xs border bg-black/5">
                  {media.type === 'video' ? (
                    <div className="relative h-full w-full">
                      <VideoSlide src={media.url} />
                    </div>
                  ) : (
                    <AppImage
                      src={media.url}
                      alt={media.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-container"
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious
                className="bg-brand-primary/30 hover:bg-brand-primary/50 left-0 h-12 w-6 overflow-hidden rounded-l-none rounded-r-full border-none text-white hover:text-white"
                renderIcon={() => <ChevronLeftIcon className="-ml-1 size-7" strokeWidth={1.5} />}
              />
              <CarouselNext
                className="bg-brand-primary/30 hover:bg-brand-primary/50 right-0 h-12 w-6 overflow-hidden rounded-l-full rounded-r-none border-none text-white hover:text-white"
                renderIcon={() => <ChevronRightIcon className="-mr-1 size-7" strokeWidth={1.5} />}
              />
            </>
          )}
        </div>

        {images.length > 1 && (
          <CarouselThumbs
            items={images}
            getKey={(media, index) => `${media.url}-${media.type}-${index}`}
            renderThumb={(media, active) => {
              const isVideoThumb = media.type === 'video';
              return (
                <div
                  // data-active={active}
                  className={cn(
                    'relative size-20 overflow-hidden rounded-xs',
                    active && 'ring-brand-primary ring-1',
                    // 'data-[active=true]:ring-brand-primary data-[active=true]:ring-1',
                  )}
                >
                  {isVideoThumb ? (
                    <video
                      src={`${media.url}#t=0.1`} // <-- El #t=0.1 le obliga a mostrar el fotograma inicial
                      className="size-full object-cover"
                      preload="metadata"
                      muted
                      playsInline
                      disablePictureInPicture
                    />
                  ) : (
                    <AppImage
                      src={media.url}
                      alt={media.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                      skeleton={false}
                    />
                  )}
                  {isVideoThumb && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Play className="text-brand-primary h-3.5 w-3.5 fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              );
            }}
          />
        )}
      </Carousel>
    </div>
  );
}

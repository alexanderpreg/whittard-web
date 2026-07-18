import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';

export type CarouselApi = UseEmblaCarouselType[1];

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

export type CarouselOptions = UseCarouselParameters[0];
export type CarouselPlugin = UseCarouselParameters[1];
export type CarouselRef = ReturnType<typeof useEmblaCarousel>[0];

export interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi | undefined) => void;
}

export interface CarouselContextProps extends CarouselProps {
  carouselRef: CarouselRef;
  api: CarouselApi;

  scrollPrev: () => void;
  scrollNext: () => void;

  canScrollPrev: boolean;
  canScrollNext: boolean;

  selectedIndex: number;
  scrollSnapList: number[];
  slidesCount: number;
}

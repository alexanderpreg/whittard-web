import { Heading } from '@/shared/components/custom-ui/Heading';
import { AppImage } from '@/shared/components/custom-ui/app-image';

interface PageHeroBannerProps {
  title: string;
  imageUrl: string;
  className?: string;
}

export function PageHeroBanner({ title, imageUrl, className }: PageHeroBannerProps) {
  return (
    <div className={`relative h-28 w-full overflow-hidden md:h-[183.33px] ${className ?? ''}`}>
      <AppImage
        src={imageUrl}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover object-center brightness-50"
        skeleton={false}
        fallback={<div className="bg-brand-primary size-full" />}
      />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <Heading
          as="h1"
          variant="heading"
          className="font-brand-elephant text-brand-white balance text-center text-2xl tracking-wide md:text-4xl"
        >
          {title}
        </Heading>
      </div>
    </div>
  );
}

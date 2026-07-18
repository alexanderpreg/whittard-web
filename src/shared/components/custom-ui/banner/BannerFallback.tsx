import { AppImage } from '@/shared/components/custom-ui/app-image';

interface BannerFallbackProps {
  fallbackImageUrl?: string;
}

export function BannerFallback({
  fallbackImageUrl = '/home/banner/fallback.webp',
}: BannerFallbackProps) {
  return (
    <div className="relative aspect-square max-h-120 min-h-50 w-full sm:aspect-34/13">
      <AppImage
        src={fallbackImageUrl}
        alt="Banner de Whittard"
        fill
        sizes="(max-width: 768px) 100vw, 100vw"
        className="object-cover"
        skeleton={false}
      />
    </div>
  );
}

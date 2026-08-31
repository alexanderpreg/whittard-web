import { cn } from '@/lib/utils';
import type { Attribution } from '@/modules/products/types/catalog';
import { AppImage } from '@/shared/components/custom-ui/app-image';

interface ProductAttributeBadgesProps {
  attributions: Attribution[];
  className?: string;
}

export function ProductAttributeBadges({ attributions, className }: ProductAttributeBadgesProps) {
  if (!attributions.length) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {attributions.map((attribution) =>
        attribution.image_url ? (
          <AppImage
            key={attribution.id}
            src={attribution.image_url}
            alt={attribution.name}
            width={40}
            height={40}
            className="rounded-full border border-gray-200 bg-white object-contain"
            skeleton={false}
          />
        ) : (
          <span
            key={attribution.id}
            className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[10px] font-medium text-gray-500"
            title={attribution.name}
          >
            {attribution.name.charAt(0)}
          </span>
        ),
      )}
    </div>
  );
}

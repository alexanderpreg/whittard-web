'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProductRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: 'size-4', md: 'size-5', lg: 'size-6' };

function StarIcon({ fill, className }: { fill: number; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <defs>
        <linearGradient id={`rating-fill-${fill}`}>
          <stop offset={`${fill * 100}%`} stopColor="#E7A81B" />
          <stop offset={`${fill * 100}%`} stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#rating-fill-${fill})`}
        className="stroke-transparent"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );
}

export function ProductRating({
  value,
  onChange,
  readonly = false,
  size = 'md',
}: ProductRatingProps) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="flex items-center gap-0.5" role="radiogroup" aria-label="Calificación">
      {[1, 2, 3, 4, 5].map((star) => {
        const starFill = Math.max(0, Math.min(1, display - star + 1));
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={cn(
              'transition-transform',
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110',
            )}
            aria-label={`${star} estrella${star !== 1 ? 's' : ''}`}
          >
            <StarIcon fill={starFill} className={cn(sizeMap[size])} />
          </button>
        );
      })}
    </div>
  );
}

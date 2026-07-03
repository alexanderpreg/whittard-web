import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

interface ImageFallbackProps {
  className?: string;
}

export function ImageFallback({ className }: ImageFallbackProps) {
  return (
    <div className={cn('flex h-full w-full items-center justify-center rounded-lg', className)}>
      <ImageOff className="h-8 w-8" />
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { ImageFallback } from './ImageFallback';
import { ImageSkeleton } from './ImageSkeleton';
import { AppImageProps } from './types';

type ImageStatus = 'loading' | 'loaded' | 'error';

export function AppImage({
  src,
  alt = 'Imagen',
  className,
  fallback,
  skeleton = true,
  onLoad,
  onError,
  ...props
}: AppImageProps) {
  const [status, setStatus] = useState<ImageStatus>('loading');

  if (!src || status === 'error') {
    return fallback ?? <ImageFallback className={className} />;
  }

  const image = (
    <Image
      {...props}
      src={src}
      alt={alt}
      className={cn(
        'transition-opacity duration-300',
        !props.fill && 'h-auto max-w-full',
        status === 'loading' && 'opacity-0',
        status === 'loaded' && 'opacity-100',
        className,
      )}
      onLoad={(event) => {
        setStatus('loaded');
        onLoad?.(event);
      }}
      onError={(event) => {
        setStatus('error');
        onError?.(event);
      }}
    />
  );

  if (props.fill) {
    return (
      <>
        {skeleton && status === 'loading' && <ImageSkeleton className={className} />}

        {image}
      </>
    );
  }

  return (
    <div className="relative inline-block">
      {skeleton && status === 'loading' && <ImageSkeleton />}

      {image}
    </div>
  );
}

import { ImageProps } from 'next/image';
import { ReactNode } from 'react';

export interface AppImageProps extends ImageProps {
  skeleton?: boolean;
  fallback?: ReactNode;
}

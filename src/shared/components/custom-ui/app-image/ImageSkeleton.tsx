import { cn } from '@/lib/utils';
import { Skeleton } from '../../shadcn-ui/skeleton';

interface ImageSkeletonProps {
  className?: string;
}

export function ImageSkeleton({ className }: ImageSkeletonProps) {
  return <Skeleton className={cn('absolute inset-0 rounded-lg', className)} />;
}

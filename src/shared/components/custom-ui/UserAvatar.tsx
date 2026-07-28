'use client';

import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils/getInitials';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcn-ui/avatar';

type UserAvatarProps = {
  name: string;
  image?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fallbackClassName?: string;
};

export function UserAvatar({
  name,
  image,
  size = 'md',
  className,
  fallbackClassName,
}: UserAvatarProps) {
  const initials = getInitials(name);

  const sizes = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-10 w-10 text-base',
    lg: 'h-14 w-14 text-lg',
  };

  return (
    <Avatar className={cn('border', sizes[size], className)}>
      {image ? (
        <AvatarImage src={image} className="object-cover object-center" alt={name} />
      ) : (
        <AvatarFallback className={cn('bg-transparent', fallbackClassName)}>
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
}

import { cn } from '@/lib/utils/shadcn-cn';
import { createElement, forwardRef } from 'react';

type IconNode = readonly (readonly [string, Record<string, string>])[];

const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 48 48',
  fill: 'currentColor',
  'aria-hidden': 'true',
};

export function createSocialIcon(iconName: string, iconNode: IconNode) {
  const Component = forwardRef<SVGSVGElement, { className?: string }>(
    ({ className, ...props }, ref) =>
      createElement(
        'svg',
        { ref, ...defaultAttributes, className: cn(`social-${iconName}`, className), ...props },
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ),
  );
  Component.displayName = `Social${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`;
  return Component;
}

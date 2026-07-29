'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils/shadcn-cn';

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleSection({
  title,
  icon,
  defaultOpen = true,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-brand-200 rounded-lg border bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-brand-primary flex items-center gap-2 text-sm font-semibold">
          {icon}
          {title}
        </span>
        <ChevronDown
          className={cn('text-brand-secondary size-4 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && <div className="border-brand-200 border-t px-4 py-4">{children}</div>}
    </div>
  );
}

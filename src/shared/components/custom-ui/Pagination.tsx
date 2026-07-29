'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils/shadcn-cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | 'dots')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'dots') {
      pages.push('dots');
    }
  }

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="text-brand-secondary hover:bg-brand-100 hover:text-brand-primary flex size-8 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page, i) =>
        page === 'dots' ? (
          <span
            key={`dots-${i}`}
            className="text-brand-400 flex size-8 items-center justify-center text-xs"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              'flex size-8 items-center justify-center rounded-md text-xs font-medium transition-colors',
              page === currentPage
                ? 'bg-brand-primary text-white'
                : 'text-brand-secondary hover:bg-brand-100 hover:text-brand-primary',
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="text-brand-secondary hover:bg-brand-100 hover:text-brand-primary flex size-8 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

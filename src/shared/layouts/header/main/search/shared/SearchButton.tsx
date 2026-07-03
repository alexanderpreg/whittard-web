import { Search } from 'lucide-react';

type SearchButtonProps = {
  className?: string;
};

export function SearchButton({ className = '' }: SearchButtonProps) {
  return (
    <button
      type="button"
      aria-label="Buscar"
      className={`text-brand-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-r-sm transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 ${className}`}
    >
      <Search size={20} />
    </button>
  );
}

import { SearchButton } from './SearchButton';

export function SearchInput() {
  return (
    <div className="border-brand-primary/50 flex h-9 w-full overflow-hidden rounded-sm border bg-white focus:outline-none">
      <input
        type="search"
        placeholder="Buscar..."
        className="text-brand-primary min-w-0 flex-1 bg-transparent px-4 placeholder:text-neutral-400 focus:outline-none"
      />

      <SearchButton className="border-brand-primary/50 rounded-none border-l" />
    </div>
  );
}

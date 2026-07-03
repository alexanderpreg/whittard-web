import { SearchResultItem } from './SearchResultItem';

export function SearchResults() {
  return (
    <div className="absolute mt-2 w-full rounded-xl bg-white shadow-lg">
      <SearchResultItem />

      <SearchResultItem />

      <SearchResultItem />
    </div>
  );
}

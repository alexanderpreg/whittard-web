import { SearchInput } from '../shared/SearchInput';
import { SearchResults } from '../shared/SearchResults';
import { SearchSuggestions } from '../shared/SearchSuggestions';

export function DesktopSearch() {
  return (
    <div className="relative w-full">
      <SearchInput />

      <SearchSuggestions />

      <SearchResults />
    </div>
  );
}

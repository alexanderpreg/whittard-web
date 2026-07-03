export function SearchResultItem() {
  return (
    <button className="flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-gray-100">
      <img src="/placeholder.png" alt="" className="h-12 w-12 rounded" />

      <div>
        <p>Café Premium</p>

        <span>S/ 39.90</span>
      </div>
    </button>
  );
}

interface ProductSearchBarProps {
  search: string;
  resultCount: number;
  onSearchChange: (value: string) => void;
}

export const ProductSearchBar = ({
  search,
  resultCount,
  onSearchChange,
}: ProductSearchBarProps) => (
  <div className="w-full sm:max-w-sm">
    <label>
      <span className="mb-2 block text-sm font-medium text-content dark:text-content-dark transition-smooth">
        Buscar por marca o modelo
      </span>
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Ej. iPhone 17 Pro"
        className="w-full rounded-xl border border-secondary-300 bg-surface dark:bg-surface-dark px-4 py-3 text-sm shadow-sm outline-none transition-smooth placeholder:text-secondary-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-700"
      />
    </label>
    <div className="mt-3 flex justify-between text-sm text-content-muted dark:text-content-muted-dark transition-smooth">
      <span>
        {resultCount} {resultCount === 1 ? "producto" : "productos"}
      </span>
      {search && <span>Para “{search}”</span>}
    </div>
  </div>
);

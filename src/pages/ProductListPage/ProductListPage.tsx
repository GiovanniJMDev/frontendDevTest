import { useMemo, useState } from "react";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { ProductSearchBar } from "../../components/ProductSearchBar/ProductSearchBar";
import { mockProducts } from "../../data/mock";

export const ProductListPage = () => {
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLocaleLowerCase();

  const filteredProducts = useMemo(
    () =>
      mockProducts.filter((product) => {
        if (!normalizedSearch) {
          return true;
        }

        return `${product.brand} ${product.model}`
          .toLocaleLowerCase()
          .includes(normalizedSearch);
      }),
    [normalizedSearch],
  );

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
            Colección destacada
          </p>
          <h1 className="m-0 text-4xl font-bold tracking-tight text-content">
            Encuentra tu próximo dispositivo
          </h1>
          <p className="mt-3 max-w-2xl text-content-muted">
            Explora nuestra selección de smartphones actuales.
          </p>
        </div>
        <ProductSearchBar
          search={search}
          resultCount={filteredProducts.length}
          onSearchChange={setSearch}
        />
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  );
};

export default ProductListPage;

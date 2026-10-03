import { useMemo, useState } from "react";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import { ProductSearchBar } from "../../components/ProductSearchBar/ProductSearchBar";
import { useProducts } from "../../hooks/useProducts";

export const ProductListPage = () => {
  const [search, setSearch] = useState("");
  const {
    data: products = [],
    isPending,
    isError,
    error,
    refetch,
  } = useProducts();
  const normalizedSearch = search.trim().toLocaleLowerCase();

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (!normalizedSearch) {
          return true;
        }

        return `${product.brand} ${product.model}`
          .toLocaleLowerCase()
          .includes(normalizedSearch);
      }),
    [normalizedSearch, products],
  );

  if (isPending) {
    return (
      <section
        aria-busy="true"
        className="rounded-3xl bg-surface dark:bg-surface-dark px-6 py-16 text-center shadow-sm ring-1 ring-border dark:ring-border-dark"
      >
        <p className="text-lg font-semibold text-content dark:text-content-dark">
          Cargando productos...
        </p>
        <p className="mt-2 text-content-muted dark:text-content-muted-dark">
          Estamos obteniendo el catálogo.
        </p>
      </section>
    );
  }

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "No se ha podido cargar el catálogo.";

    return (
      <section
        role="alert"
        className="rounded-3xl border border-danger/20 bg-surface dark:bg-surface-dark px-6 py-16 text-center shadow-sm"
      >
        <h1 className="text-2xl font-bold text-content dark:text-content-dark">
          No se pudieron cargar los productos
        </h1>
        <p className="mt-3 text-content-muted dark:text-content-muted-dark">
          {errorMessage}
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-6 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition-smooth hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
        >
          Reintentar
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
            Colección destacada
          </p>
          <h1 className="m-0 text-4xl font-bold tracking-tight text-content dark:text-content-dark transition-smooth">
            Encuentra tu próximo dispositivo
          </h1>
          <p className="mt-3 max-w-2xl text-content-muted dark:text-content-muted-dark transition-smooth">
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

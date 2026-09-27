import type { Product } from "../../data/mock";
import { ProductCard } from "../ProductCard/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-secondary-300 bg-surface px-6 py-16 text-center">
        <h2 className="text-xl font-semibold text-content">No hay resultados</h2>
        <p className="mt-2 text-content-muted">Prueba con otra marca o modelo.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

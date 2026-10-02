import { Link, useParams } from "react-router";
import { ProductGallery } from "../../components/ProductGallery/ProductGallery";
import { ProductPurchasePanel } from "../../components/ProductPurchasePanel/ProductPurchasePanel";
import { ProductSpecifications } from "../../components/ProductSpecifications/ProductSpecifications";
import type { AddToCartRequest } from "../../data/mock";
import { useProduct } from "../../hooks/useProduct";
import { useCartStore } from "../../store/useCartStore";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isPending, isError, error, refetch } = useProduct(id);
  const addProduct = useCartStore((state) => state.addProduct);

  if (!id) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold text-content dark:text-content-dark">
          Producto no encontrado
        </h1>
        <p className="mt-3 text-content-muted dark:text-content-muted-dark">
          No se ha indicado ningún producto.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition-smooth hover:bg-primary-700"
        >
          Volver al catálogo
        </Link>
      </section>
    );
  }

  if (isPending) {
    return (
      <section
        aria-busy="true"
        className="rounded-3xl bg-surface dark:bg-surface-dark px-6 py-16 text-center shadow-sm ring-1 ring-border dark:ring-border-dark"
      >
        <p className="text-lg font-semibold text-content dark:text-content-dark">
          Cargando producto...
        </p>
        <p className="mt-2 text-content-muted dark:text-content-muted-dark">
          Estamos obteniendo sus detalles.
        </p>
      </section>
    );
  }

  if (isError || !product) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold text-content dark:text-content-dark">Producto no encontrado</h1>
        <p className="mt-3 text-content-muted dark:text-content-muted-dark">
          El producto que buscas no está disponible o no se ha podido cargar.
        </p>
        {error instanceof Error && (
          <p className="mt-3 text-danger">{error.message}</p>
        )}
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-6 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition-smooth hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
        >
          Reintentar
        </button>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition-smooth hover:bg-primary-700"
        >
          Volver al catálogo
        </Link>
      </section>
    );
  }

  const handleAddToCart = (_request: AddToCartRequest) => {
    addProduct(product);
  };

  return (
    <section className="space-y-8">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-800"
      >
        ← Volver a productos
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
        <ProductGallery product={product} />
        <ProductPurchasePanel
          product={product}
          onAddToCart={handleAddToCart}
        />
      </div>

      <ProductSpecifications product={product} />
    </section>
  );
};

export default ProductDetailPage;

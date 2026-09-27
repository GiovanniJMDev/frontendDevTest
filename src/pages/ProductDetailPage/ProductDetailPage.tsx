import { Link, useParams } from "react-router";
import { ProductGallery } from "../../components/ProductGallery/ProductGallery";
import { ProductPurchasePanel } from "../../components/ProductPurchasePanel/ProductPurchasePanel";
import { ProductSpecifications } from "../../components/ProductSpecifications/ProductSpecifications";
import { mockProductDetailsById } from "../../data/mock";
import type { AddToCartRequest } from "../../data/mock";
import { useCartStore } from "../../store/useCartStore";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? mockProductDetailsById[id] : undefined;
  const addProduct = useCartStore((state) => state.addProduct);

  if (!product) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl font-bold text-content">Producto no encontrado</h1>
        <p className="mt-3 text-content-muted">
          El producto que buscas no está disponible en los datos de prueba.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
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

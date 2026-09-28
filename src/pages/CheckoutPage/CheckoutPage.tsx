import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useCartStore } from "../../store/useCartStore";

const formatPrice = (price: string) => {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return "Consultar";
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(numericPrice);
};

export const CheckoutPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const total = cartItems.reduce((subtotal, { product, quantity }) => {
    const price = Number(product.price);
    return subtotal + (Number.isNaN(price) ? 0 : price * quantity);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-2xl py-12 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <ShoppingBag className="size-8" />
        </div>
        <h1 className="mt-5 text-3xl font-bold text-content dark:text-content-dark">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 text-content-muted dark:text-content-muted-dark">
          Añade un producto antes de continuar con la compra.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition-smooth hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
        >
          Volver a la tienda
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800"
      >
        <ArrowLeft className="size-4" />
        Volver a productos
      </Link>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">
          Checkout
        </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-content dark:text-content-dark">
          Finalizar compra
        </h1>
          <p className="mt-3 text-content-muted dark:text-content-muted-dark">
          Revisa tus productos antes de confirmar el pedido.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.4fr)]">
        <div className="rounded-3xl bg-surface dark:bg-surface-dark p-6 shadow-sm ring-1 ring-border dark:ring-border-dark">
          <h2 className="text-xl font-bold text-content dark:text-content-dark">Tu carrito</h2>
          <ul className="mt-5 divide-y divide-border">
            {cartItems.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <img
                  src={product.imgUrl}
                  alt={`${product.brand} ${product.model}`}
                  className="size-24 rounded-2xl bg-surface-muted dark:bg-surface-muted-dark object-contain p-2"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-content-muted dark:text-content-muted-dark">{product.brand}</p>
                  <h3 className="mt-1 font-semibold text-content dark:text-content-dark">{product.model}</h3>
                  <p className="mt-2 text-sm text-content-muted dark:text-content-muted-dark">
                    Cantidad: {quantity}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="font-semibold text-content dark:text-content-dark">
                    {formatPrice(product.price)}
                  </p>
                  <button
                    type="button"
                    aria-label={`Eliminar ${product.model} del carrito`}
                    onClick={() => removeProduct(product.id)}
                    className="rounded-lg p-2 text-content-muted dark:text-content-muted-dark transition-smooth hover:bg-red-50 hover:text-danger focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-100"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-3xl bg-surface dark:bg-surface-dark p-6 shadow-sm ring-1 ring-border dark:ring-border-dark">
          <h2 className="text-xl font-bold text-content dark:text-content-dark">Resumen</h2>
          <div className="mt-5 flex items-center justify-between text-sm text-content-muted dark:text-content-muted-dark">
            <span>Productos</span>
            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border dark:border-border-dark pt-4">
            <span className="font-semibold text-content dark:text-content-dark">Total</span>
            <span className="text-xl font-bold text-content dark:text-content-dark">
              {formatPrice(String(total))}
            </span>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-primary-600 px-5 py-3.5 font-semibold text-white transition-smooth hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
          >
            Confirmar pedido
          </button>
        </aside>
      </div>
    </section>
  );
};

export default CheckoutPage;

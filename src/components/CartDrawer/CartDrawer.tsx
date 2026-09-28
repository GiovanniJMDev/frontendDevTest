import { Activity } from "react";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { clsx } from "clsx";
import { useNavigate } from "react-router";
import { useCartStore } from "../../store/useCartStore";

interface CartDrawerProps {
  count: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ count, isOpen, onClose }: CartDrawerProps) => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const likedProducts = useCartStore((state) => state.likedProducts);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const toggleLiked = useCartStore((state) => state.toggleLiked);

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 transition-smooth",
        !isOpen && "pointer-events-none",
      )}
    >
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <button
          type="button"
          aria-label="Cerrar carrito"
          onClick={onClose}
          className="absolute inset-0 h-full w-full cursor-default bg-secondary-950/40"
        />
      </Activity>

      <dialog
        id="cart-drawer"
        aria-label="Carrito de compra"
        aria-modal="true"
        className={clsx(
          "relative ml-auto flex h-full w-full max-w-md flex-col bg-surface dark:bg-surface-dark p-0 shadow-2xl transition-smooth",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border dark:border-border-dark px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-content dark:text-content-dark">Tu carrito</h2>
            <p className="mt-1 text-sm text-content-muted dark:text-content-muted-dark">
              {count} {count === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Cerrar carrito"
            onClick={onClose}
            className="rounded-xl p-2 text-content-muted dark:text-content-muted-dark transition-smooth hover:bg-surface-muted dark:hover:bg-surface-muted-dark hover:text-content dark:hover:text-content-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-5">
          <section aria-labelledby="liked-products-title">
            <div className="mb-3 flex items-center gap-2">
              <Heart className="size-4 text-primary-600" />
              <h3
                id="liked-products-title"
                className="font-semibold text-content dark:text-content-dark"
              >
                Productos favoritos
              </h3>
            </div>

            {likedProducts.length === 0 ? (
              <p className="rounded-xl bg-surface-muted dark:bg-surface-muted-dark px-4 py-3 text-sm text-content-muted dark:text-content-muted-dark">
                Todavía no tienes productos favoritos.
              </p>
            ) : (
              <ul className="space-y-3">
                {likedProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center gap-3 rounded-2xl border border-border dark:border-border-dark p-3"
                  >
                    <img
                      src={product.imgUrl}
                      alt={`${product.brand} ${product.model}`}
                      className="size-14 rounded-xl bg-surface-muted dark:bg-surface-muted-dark object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-content dark:text-content-dark">
                        {product.model}
                      </p>
                      <p className="text-sm text-content-muted dark:text-content-muted-dark">
                        {product.price
                          ? `${product.price} €`
                          : "Precio bajo consulta"}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Quitar ${product.model} de favoritos`}
                      onClick={() => toggleLiked(product)}
                      className="rounded-lg p-2 text-primary-600 transition-smooth hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-100"
                    >
                      <Heart className="size-4 fill-current" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="cart-products-title">
            <div className="mb-3 flex items-center gap-2">
              <ShoppingBag className="size-4 text-primary-600" />
              <h3
                id="cart-products-title"
                className="font-semibold text-content dark:text-content-dark"
              >
                Productos en el carrito
              </h3>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center rounded-xl bg-surface-muted dark:bg-surface-muted-dark px-4 py-8 text-center">
                <ShoppingBag className="size-8 text-primary-600" />
                <p className="mt-3 text-sm font-semibold text-content dark:text-content-dark">
                  Tu carrito está vacío
                </p>
                <p className="mt-1 text-sm text-content-muted dark:text-content-muted-dark">
                  Añade un producto para verlo aquí.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {cartItems.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex items-center gap-3 rounded-2xl border border-border dark:border-border-dark p-3"
                  >
                    <img
                      src={product.imgUrl}
                      alt={`${product.brand} ${product.model}`}
                      className="size-14 rounded-xl bg-surface-muted dark:bg-surface-muted-dark object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-content dark:text-content-dark">
                        {product.model}
                      </p>
                      <p className="text-sm text-content-muted dark:text-content-muted-dark">
                        {quantity} {quantity === 1 ? "unidad" : "unidades"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-content dark:text-content-dark">
                        {product.price ? `${product.price} €` : "Consultar"}
                      </p>
                      <button
                        type="button"
                        aria-label={`Eliminar ${product.model} del carrito`}
                        onClick={() => removeProduct(product.id)}
                        className="mt-1 rounded-lg p-1.5 text-content-muted dark:text-content-muted-dark transition-smooth hover:bg-red-50 hover:text-danger focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-100"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="border-t border-border dark:border-border-dark p-6">
          <button
            type="button"
            disabled={count === 0}
            onClick={handleCheckout}
            className="w-full rounded-xl bg-primary-600 px-5 py-3.5 font-semibold text-white transition-smooth hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continuar con la compra
          </button>
        </div>
      </dialog>
    </div>
  );
};

import { useState } from "react";
import { Link, Outlet } from "react-router";
import { ShoppingBag } from "lucide-react";
import { CartDrawer } from "../../components/CartDrawer/CartDrawer";
import { useCartStore } from "../../store/useCartStore";

export const Layout = () => {
  const cartCount = useCartStore((state) => state.count);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-smooth text-content dark:text-content-dark flex flex-col">
      <header className="border-b transition-smooth bg-surface dark:bg-surface-dark border-border dark:border-border-dark px-6 py-4 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Mobile Shop
          </Link>
          <button
            type="button"
            aria-controls="cart-drawer"
            aria-expanded={isCartOpen}
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-content-muted dark:text-content-muted-dark transition-smooth hover:bg-surface-muted dark:hover:bg-surface-muted-dark hover:text-primary-700 dark:hover:text-primary-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300 dark:focus-visible:ring-primary-700"
          >
            <ShoppingBag className="size-5" />
            <span>Carrito ({cartCount})</span>
          </button>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        <Outlet />
      </main>
      <CartDrawer
        count={cartCount}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(!isCartOpen)}
      />
    </div>
  );
};

export default Layout;

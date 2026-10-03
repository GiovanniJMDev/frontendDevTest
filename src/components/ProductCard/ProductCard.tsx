import { type MouseEvent } from "react";
import { Link } from "react-router";
import { HeartIcon, ShoppingCartPlusIcon } from "lucide-react";
import type { Product } from "../../types/product";
import { useCartStore } from "../../store/useCartStore";
import { Badge } from "../shared/Badge/Badge";
import { Button } from "../shared/Button/Button";
import { Img } from "../shared/Img/Img";

interface ProductCardProps {
  product: Product;
}

const preventCardNavigation = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const isLiked = useCartStore((state) =>
    state.likedProducts.some((likedProduct) => likedProduct.id === product.id),
  );
  const toggleLiked = useCartStore((state) => state.toggleLiked);
  const addProduct = useCartStore((state) => state.addProduct);

  const handleLike = (event: MouseEvent<HTMLButtonElement>) => {
    preventCardNavigation(event);
    toggleLiked(product);
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    preventCardNavigation(event);
    addProduct(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group grid grid-rows-[1fr_auto_auto] h-auto max-h-80 w-full overflow-hidden rounded-3xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-3 shadow-sm transition-smooth hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-lg"
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-t-2xl rounded-br-2xl bg-surface-muted dark:bg-surface-muted-dark p-4 transition-smooth">
        <Badge variant="brand" className="absolute left-3 top-3">
          {product.brand}
        </Badge>
        <Img
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          loading="lazy"
          className="h-full bg-surface-muted dark:bg-surface-muted-dark bg-cover bg-center transition-smooth"
        />
      </div>

      <div className="flex w-full rounded-2xl">
        <div className="flex h-full w-full items-center rounded-b-2xl transition-smooth bg-surface-muted dark:bg-surface-muted-dark p-3">
          <p className="truncate text-lg font-bold text-content dark:text-content-dark transition-smooth">
            {product.price ? `${product.price} €` : "Precio bajo consulta"}
          </p>
        </div>
        <div className="bg-surface-muted dark:bg-surface-muted-dark transition-smooth">
          <div className="flex justify-end gap-2 rounded-tl-xl transition-smooth bg-surface dark:bg-surface-dark pt-2 pl-2">
            <Button
              variant="primary"
              aria-label={
                isLiked ? "Quitar de favoritos" : "Añadir a favoritos"
              }
              aria-pressed={isLiked}
              onClick={handleLike}
              className="aspect-square! rounded-xl! bg-surface-muted! dark:bg-surface-muted-dark! hover:bg-surface-muted-hover! dark:hover:bg-surface-muted-hover-dark! p-1!"
            >
              <HeartIcon
                className={`size-5 transition-smooth ${isLiked ? "fill-primary-600 text-primary-600" : "fill-transparent text-secondary-400"}`}
              />
            </Button>
            <Button
              variant="primary"
              aria-label="Añadir al carrito"
              onClick={handleAddToCart}
              className="aspect-square! rounded-xl! p-1!"
            >
              <ShoppingCartPlusIcon className="size-5 text-secondary-400 transition-smooth" />
            </Button>
          </div>
        </div>
      </div>

      <div className="h-fit w-full px-2 pt-3">
        <h2 className="truncate text-lg font-semibold text-content dark:text-content-dark transition-smooth">
          {product.model}
        </h2>
      </div>
    </Link>
  );
};

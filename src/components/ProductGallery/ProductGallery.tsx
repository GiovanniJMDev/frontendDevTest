import type { ProductDetail } from "../../data/mock";
import { Img } from "../shared/Img/Img";

interface ProductGalleryProps {
  product: ProductDetail;
}

export const ProductGallery = ({ product }: ProductGalleryProps) => (
  <div className="flex min-h-105 transition-smooth items-center justify-center rounded-3xl bg-surface dark:bg-surface-dark p-8 shadow-sm ring-1 ring-border dark:ring-border-dark">
    <Img
      src={product.imgUrl}
      alt={`${product.brand} ${product.model}`}
      className="max-h-120 w-full object-contain"
    />
  </div>
);

import { useState, type FormEvent } from "react";
import type { AddToCartRequest, ProductDetail } from "../../data/mock";
import { Select } from "../shared/Select/Select";

interface ProductPurchasePanelProps {
  product: ProductDetail;
  onAddToCart: (request: AddToCartRequest) => void;
}

export const ProductPurchasePanel = ({
  product,
  onAddToCart,
}: ProductPurchasePanelProps) => {
  const [colorCode, setColorCode] = useState(
    product.options.colors[0]?.code ?? 0,
  );
  const [storageCode, setStorageCode] = useState(
    product.options.storages[0]?.code ?? 0,
  );
  const [added, setAdded] = useState(false);
  const selectedStorage = product.options.storages.find(
    (storage) => storage.code === storageCode,
  );
  const basePrice = Number(product.price);
  const finalPrice = basePrice + (selectedStorage?.priceModifier ?? 0);
  const formattedPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(finalPrice);
  const colorSelectOptions = product.options.colors.map((option) => ({
    value: String(option.code),
    label: option.name,
  }));
  const storageSelectOptions = product.options.storages.map((option) => ({
    value: String(option.code),
    label: `${option.name}${option.priceModifier ? ` (+${option.priceModifier} €)` : ""}`,
  }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddToCart({ id: product.id, colorCode, storageCode });
    setAdded(true);
  };

  return (
    <div className="rounded-3xl bg-surface dark:bg-surface-dark p-7 shadow-sm ring-1 ring-border dark:ring-border-dark transition-smooth">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600 transition-text">
        {product.brand}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-content dark:text-content-dark transition-text">
        {product.model}
      </h1>
      <p className="mt-4 text-3xl font-bold text-content dark:text-content-dark transition-text">
        {product.price ? formattedPrice : "Precio bajo consulta"}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Select
          label="Color"
          value={String(colorCode)}
          options={colorSelectOptions}
          onValueChange={(value) => {
            setColorCode(Number(value));
            setAdded(false);
          }}
        />

        <Select
          label="Almacenamiento"
          value={String(storageCode)}
          options={storageSelectOptions}
          onValueChange={(value) => {
            setStorageCode(Number(value));
            setAdded(false);
          }}
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-primary-600 px-5 py-3.5 font-semibold text-white transition-smooth hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200"
        >
          {added ? "Añadido al carrito ✓" : "Añadir al carrito"}
        </button>
      </form>
    </div>
  );
};

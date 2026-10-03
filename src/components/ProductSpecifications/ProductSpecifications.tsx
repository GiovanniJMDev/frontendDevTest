import type { ProductDetail } from "../../types/product";

interface ProductSpecificationsProps {
  product: ProductDetail;
}

const formatList = (value: string | string[] | null | undefined) => {
  if (Array.isArray(value)) {
    return value.join(" · ");
  }

  return value ?? "";
};

const formatWeight = (weight: string) => {
  return /\s*g$/i.test(weight) ? weight : `${weight} g`;
};

export const ProductSpecifications = ({
  product,
}: ProductSpecificationsProps) => {
  const specs: Array<[string, string]> = [
    ["Marca", product.brand],
    ["Modelo", product.model],
    ["Precio", product.price ? `${product.price} €` : "Consultar"],
    ["CPU", product.cpu],
    ["RAM", product.ram],
    ["Sistema operativo", product.os],
    ["Resolución", product.displayResolution],
    ["Tamaño de pantalla", product.displaySize],
    ["Batería", product.battery],
    ["Cámara principal", formatList(product.primaryCamera)],
    ["Cámara frontal", formatList(product.secondaryCmera)],
    ["Dimensiones", product.dimentions],
    ["Peso", formatWeight(product.weight)],
  ];

  return (
    <div className="rounded-3xl bg-surface dark:bg-surface-dark p-7 shadow-sm ring-1 ring-border dark:ring-border-dark transition-smooth">
      <h2 className="text-2xl font-bold text-content dark:text-content-dark">Especificaciones</h2>
      <dl className="mt-5 grid gap-x-8 sm:grid-cols-2">
        {specs.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[minmax(120px,0.6fr)_1fr] gap-4 border-b border-secondary-100 py-3 text-sm"
          >
            <dt className="font-semibold text-content-muted dark:text-content-muted-dark">{label}</dt>
            <dd className="text-content dark:text-content-dark transition-smooth">{value || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

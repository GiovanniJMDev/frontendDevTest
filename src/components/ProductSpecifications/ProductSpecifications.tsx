import type { ProductDetail } from "../../data/mock";

interface ProductSpecificationsProps {
  product: ProductDetail;
}

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
    ["Resolución", product.displaySize],
    ["Batería", product.battery],
    ["Cámara principal", product.primaryCamera.join(" · ")],
    ["Cámara frontal", product.secondaryCmera.join(" · ")],
    ["Dimensiones", product.dimentions],
    ["Peso", `${product.weight} g`],
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
            <dd className="text-content dark:text-content-dark transition-text">{value || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

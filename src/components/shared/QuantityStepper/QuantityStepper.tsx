import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  label: string;
  onIncrease: () => void;
  onDecrease: () => void;
}

const buttonClasses =
  "inline-flex size-9 items-center justify-center rounded-lg text-content-muted dark:text-content-muted-dark transition-smooth hover:bg-surface-muted-hover dark:hover:bg-surface-muted-hover-dark hover:text-content dark:hover:text-content-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300 dark:focus-visible:ring-primary-700";

export const QuantityStepper = ({
  quantity,
  label,
  onIncrease,
  onDecrease,
}: QuantityStepperProps) => (
  <div className="inline-flex items-center rounded-xl bg-surface-muted dark:bg-surface-muted-dark p-0.5 transition-smooth">
    <button
      type="button"
      aria-label={
        quantity === 1 ? `Eliminar ${label} del carrito` : `Disminuir cantidad de ${label}`
      }
      onClick={onDecrease}
      className={`${buttonClasses} ${quantity === 1 ? "hover:text-danger! dark:hover:text-danger!" : ""}`}
    >
      {quantity === 1 ? (
        <Trash2Icon className="size-4" />
      ) : (
        <MinusIcon className="size-4" />
      )}
    </button>
    <span
      aria-live="polite"
      className="min-w-8 text-center text-sm font-semibold tabular-nums text-content dark:text-content-dark transition-smooth"
    >
      {quantity}
    </span>
    <button
      type="button"
      aria-label={`Aumentar cantidad de ${label}`}
      onClick={onIncrease}
      className={buttonClasses}
    >
      <PlusIcon className="size-4" />
    </button>
  </div>
);

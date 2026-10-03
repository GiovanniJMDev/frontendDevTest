import { useId, type SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "className" | "onChange" | "value"
> {
  label: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  labelClassName?: string;
  hideLabel?: boolean;
}

export const Select = ({
  label,
  options,
  value,
  onValueChange,
  className = "",
  labelClassName = "block text-sm font-semibold text-content dark:text-content-dark transition-smooth",
  hideLabel = false,
  ...selectProps
}: SelectProps) => {
  const generatedId = useId();

  return (
    <div className={labelClassName}>
      <label htmlFor={generatedId} className={hideLabel ? "sr-only" : undefined}>
        {label}
      </label>
      <div className="relative mt-2">
        <select
          {...selectProps}
          id={generatedId}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          className={`w-full cursor-pointer appearance-none rounded-xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark py-3 pl-4 pr-11 font-normal text-content dark:text-content-dark transition-smooth outline-none hover:border-primary-300 dark:hover:border-primary-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-surface text-content dark:bg-surface-dark dark:text-content-dark"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-content-muted dark:text-content-muted-dark"
        />
      </div>
    </div>
  );
};

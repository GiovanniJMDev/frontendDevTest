import { useId, type SelectHTMLAttributes } from "react";

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
  labelClassName = "block text-sm font-semibold text-content dark:text-content-dark transition-text",
  hideLabel = false,
  ...selectProps
}: SelectProps) => {
  const generatedId = useId();

  return (
    <label htmlFor={generatedId} className={labelClassName}>
      <span className={hideLabel ? "sr-only" : undefined}>{label}</span>
      <select
        {...selectProps}
        id={generatedId}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className={`mt-2 w-full rounded-xl border border-secondary-300 transition-smooth bg-surface dark:bg-surface-dark px-4 py-3 font-normal outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

import { forwardRef, type ButtonHTMLAttributes, type Ref } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "icon";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white shadow-sm hover:bg-primary-700 focus-visible:ring-primary-200",
  secondary:
    "border border-border bg-surface text-content shadow-sm hover:bg-surface-muted focus-visible:ring-secondary-200",
  ghost:
    "bg-transparent text-content-muted hover:bg-surface-muted focus-visible:ring-secondary-200",
  danger:
    "bg-danger text-white shadow-sm hover:bg-danger/90 focus-visible:ring-danger/20",
  icon: "bg-surface/90 text-content shadow-sm backdrop-blur hover:bg-surface focus-visible:ring-secondary-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-14 px-5 text-base",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "size-9 text-base",
  md: "size-12 text-lg",
  lg: "size-14 text-xl",
};

export const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    ...buttonProps
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const isIconButton = variant === "icon";

  return (
    <button
      {...buttonProps}
      ref={ref}
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50 duration-300 ${
        isIconButton ? iconSizeClasses[size] : sizeClasses[size]
      } ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
});

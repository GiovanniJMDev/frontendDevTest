import type { ReactNode } from "react";

export type BadgeVariant =
  | "brand"
  | "neutral"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  brand: "border-primary-200/80 bg-primary-50/90 text-primary-700",
  neutral: "border-border/80 dark:border-border-dark/80 bg-surface-muted/90 dark:bg-surface-muted-dark/90 text-content-muted dark:text-content-muted-dark",
  secondary: "border-secondary-300/80 bg-secondary-100/90 text-secondary-700",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-danger/30 bg-danger/10 text-danger",
  info: "border-info/30 bg-info/10 text-info",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  icon,
  className = "",
}: BadgeProps) => (
  <span
    className={`inline-flex w-fit items-center gap-1.5 rounded-full border font-bold uppercase leading-none tracking-[0.12em] shadow-sm backdrop-blur-sm ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
  >
    {icon && (
      <span aria-hidden="true" className="inline-flex shrink-0">
        {icon}
      </span>
    )}
    {children}
  </span>
);

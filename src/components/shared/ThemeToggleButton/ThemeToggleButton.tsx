import { Moon, Sun } from "lucide-react";

interface ThemeToggleButtonProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggleButton = ({
  isDark,
  onToggle,
}: ThemeToggleButtonProps) => (
  <button
    type="button"
    aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    aria-pressed={isDark}
    onClick={onToggle}
    className="inline-flex size-12 items-center justify-center rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-secondary-700 shadow-lg transition-smooth hover:border-primary-300 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-100 dark:text-secondary-100 dark:hover:text-primary-300"
  >
    {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    <span className="sr-only">
      {isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    </span>
  </button>
);

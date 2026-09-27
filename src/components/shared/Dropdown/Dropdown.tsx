import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type DropdownAlign = "left" | "right";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: DropdownAlign;
  className?: string;
}

const alignClasses: Record<DropdownAlign, string> = {
  left: "left-0",
  right: "right-0",
};

export const Dropdown = ({
  trigger,
  children,
  align = "left",
  className = "",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex items-center"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          role="menu"
          className={`absolute z-20 mt-2 min-w-48 rounded-xl border border-border bg-surface p-1.5 shadow-lg ${alignClasses[align]}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

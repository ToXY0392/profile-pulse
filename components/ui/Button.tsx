import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] disabled:opacity-50",
  secondary:
    "bg-zinc-600 text-white hover:bg-zinc-700 disabled:opacity-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "rounded-lg px-3 py-1.5 text-xs font-medium",
  lg: "rounded-xl px-4 py-3 text-sm font-semibold",
};

export function Button({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

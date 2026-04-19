import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-block cursor-pointer rounded-xl font-semibold no-underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "border-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg active:translate-y-px focus:ring-cyan-500":
            variant === "primary",
          "border-0 bg-slate-900 text-white shadow-md hover:bg-slate-950 hover:shadow-lg active:translate-y-px focus:ring-slate-500":
            variant === "secondary",
          "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 active:translate-y-px focus:ring-cyan-500":
            variant === "outline",
          "bg-slate-100 text-slate-900 hover:bg-slate-200 active:translate-y-px focus:ring-slate-500":
            variant === "ghost",
        },
        {
          "px-3 py-1.5 text-sm leading-tight": size === "sm",
          "px-4 py-2.5 text-base leading-tight": size === "md",
          "px-6 py-3 text-lg leading-tight": size === "lg",
        },
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

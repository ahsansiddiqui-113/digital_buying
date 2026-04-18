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
        "font-bold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer no-underline inline-block",
        {
          "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl focus:ring-blue-500 border-0":
            variant === "primary",
          "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-lg hover:shadow-xl focus:ring-purple-500 border-0":
            variant === "secondary",
          "border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus:ring-blue-500 font-bold":
            variant === "outline",
          "bg-gray-300 text-gray-900 hover:bg-gray-400 active:bg-gray-500 focus:ring-gray-500 font-bold":
            variant === "ghost",
        },
        {
          "px-3 py-1.5 text-sm leading-tight": size === "sm",
          "px-4 py-2.5 text-base leading-tight": size === "md",
          "px-6 py-3 text-lg leading-tight": size === "lg",
        },
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

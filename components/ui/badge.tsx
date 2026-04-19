import clsx from "clsx";

interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  children: string;
  className?: string;
}

export function Badge({ variant = "primary", children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-block px-3 py-1 text-sm font-medium rounded-full",
        {
          "bg-blue-100 text-blue-800": variant === "primary",
          "bg-gray-100 text-gray-800": variant === "secondary",
          "bg-green-100 text-green-800": variant === "success",
          "bg-yellow-100 text-yellow-800": variant === "warning",
          "bg-red-100 text-red-800": variant === "danger",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

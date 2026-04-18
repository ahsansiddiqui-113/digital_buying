import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: CardProps) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h2 className={clsx("text-2xl font-bold", className)}>{children}</h2>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children }: CardProps) {
  return <div className="mt-4 flex gap-2">{children}</div>;
}

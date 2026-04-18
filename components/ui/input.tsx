import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold text-gray-900 mb-2">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "w-full px-4 py-2.5 border-2 rounded-lg text-gray-900 placeholder-gray-500 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          {
            "border-red-500": error,
            "border-gray-300": !error,
          },
          className
        )}
        {...props}
      />
      {error && <p className="text-red-600 font-bold text-sm mt-1">{error}</p>}
    </div>
  );
}

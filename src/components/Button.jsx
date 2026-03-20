export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}) {
  const baseStyles =
    "px-5 py-2.5 rounded-lg font-semibold cursor-pointer transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/30",
    danger: "bg-error text-white hover:bg-error/90",
    success: "bg-success text-white hover:bg-success/90",
    warning: "bg-warning text-gray-900 hover:bg-warning/90",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
  };

  const finalClass = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  return (
    <button type={type} onClick={onClick} className={finalClass}>
      {children}
    </button>
  );
}

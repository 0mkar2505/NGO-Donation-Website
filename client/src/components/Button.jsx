export default function Button({
  as: Comp = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-brand-500 text-white shadow-sm hover:bg-brand-600 focus-visible:ring-brand-400",
    outline:
      "border border-stone-300 bg-white text-ink hover:bg-stone-100 focus-visible:ring-stone-300",
    ghost: "text-stone-600 hover:bg-stone-100",
    danger: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400",
  };
  return (
    <Comp
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

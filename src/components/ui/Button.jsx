function Button({
  children,
  className = "",
  size = "md",
  variant = "primary",
  type = "button",
  ...props
}) {
  const sizeClasses = {
    sm: "min-h-10 px-4 text-sm",
    md: "min-h-12 px-5 text-sm",
    lg: "min-h-14 px-6 text-base"
  };

  const variantClasses = {
    primary:
      "bg-[linear-gradient(135deg,#F5E0B1_0%,#C8A46A_45%,#8D6B35_100%)] text-black shadow-[0_12px_30px_rgba(200,164,106,0.24)]",
    secondary: "border border-white/10 bg-white/5 text-white",
    ghost: "bg-transparent text-white/72"
  };

  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center rounded-full font-semibold transition active:scale-[0.98]",
        sizeClasses[size],
        variantClasses[variant],
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

function Badge({ children, tone = "default" }) {
  const toneClasses = {
    default: "bg-white/8 text-white/70",
    gold: "bg-[rgba(200,164,106,0.16)] text-[var(--color-gold-soft)]",
    success: "bg-[rgba(116,198,157,0.18)] text-[var(--color-success)]"
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]",
        toneClasses[tone]
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export default Badge;

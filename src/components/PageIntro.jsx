function PageIntro({ eyebrow, title, description, action }) {
  return (
    <section className="glass-card rounded-[28px] p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
        {eyebrow}
      </p>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="max-w-[16ch] text-[28px] font-semibold leading-[1.05] text-white">
            {title}
          </h1>
          <p className="mt-3 max-w-[34ch] text-sm leading-6 text-white/70">
            {description}
          </p>
        </div>
        {action}
      </div>
    </section>
  );
}

export default PageIntro;

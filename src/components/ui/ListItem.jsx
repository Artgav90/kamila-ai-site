function ListItem({ title, subtitle, meta, trailing }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[20px] border border-white/7 bg-white/[0.03] px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{title}</p>
        <p className="mt-1 text-sm text-white/55">{subtitle}</p>
      </div>
      <div className="shrink-0 text-right">
        {meta ? <p className="text-xs uppercase tracking-[0.22em] text-white/42">{meta}</p> : null}
        {trailing}
      </div>
    </div>
  );
}

export default ListItem;

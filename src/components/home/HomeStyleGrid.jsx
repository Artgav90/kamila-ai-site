function HomeStyleGrid({ items }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className="relative h-[88px] overflow-hidden rounded-2xl transition-all active:scale-95"
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.label}
              className="h-full w-full object-cover"
              style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
            />
          ) : null}
          <div className="absolute inset-0" style={{ background: item.overlay }} />
          <div className="absolute inset-0 flex items-center justify-center px-2">
            <span className="text-center text-[11px] font-bold leading-none text-white">{item.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default HomeStyleGrid;

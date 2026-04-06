import Card from "./ui/Card";

function StatGrid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <Card key={item.label}>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item.label}</p>
          <p className="mt-4 text-2xl font-semibold text-white">{item.value}</p>
          <p className="mt-2 text-sm text-white/58">{item.caption}</p>
        </Card>
      ))}
    </div>
  );
}

export default StatGrid;

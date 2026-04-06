import { profileStats } from "./profileData";

function ProfileStatsGrid({ stats = profileStats }) {
  return (
    <section className="mb-5 grid grid-cols-3 gap-3">
      {stats.map((item) => (
        <article
          key={item.label}
          className="flex flex-col items-center gap-1 rounded-2xl p-4"
          style={{
            background: "rgb(19, 19, 31)",
            border: "1px solid rgba(255, 255, 255, 0.07)"
          }}
        >
          <span className="text-2xl font-black" style={{ color: item.color }}>
            {item.value}
          </span>
          <span
            className="text-center text-[10px] whitespace-pre-line"
            style={{ color: "rgba(255, 255, 255, 0.45)" }}
          >
            {item.label}
          </span>
        </article>
      ))}
    </section>
  );
}

export default ProfileStatsGrid;

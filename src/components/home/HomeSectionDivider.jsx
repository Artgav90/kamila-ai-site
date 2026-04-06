function HomeSectionDivider({ reverse = false }) {
  return (
    <div
      className="mx-8 mb-5 h-px opacity-35"
      style={{
        background: reverse
          ? "linear-gradient(90deg, transparent 0%, rgb(168, 85, 247) 35%, rgb(255, 95, 160) 65%, transparent 100%)"
          : "linear-gradient(90deg, transparent 0%, rgb(255, 95, 160) 35%, rgb(168, 85, 247) 65%, transparent 100%)"
      }}
    />
  );
}

export default HomeSectionDivider;

function Card({ children, className = "" }) {
  return (
    <section className={["glass-card rounded-[24px] p-4", className].join(" ")}>
      {children}
    </section>
  );
}

export default Card;

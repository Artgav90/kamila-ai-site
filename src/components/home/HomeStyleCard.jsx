function HomeStyleCard({ emoji, image, label, overlayClassName }) {
  return (
    <article className="relative h-[88px] overflow-hidden rounded-[16px]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className={["absolute inset-0 bg-gradient-to-b", overlayClassName].join(" ")} />

      <div className="relative flex h-full flex-col items-center justify-center gap-1">
        <span className="text-[20px] leading-7 text-[#fafafa]">{emoji}</span>
        <span className="text-[12px] font-bold leading-4 text-white">{label}</span>
      </div>
    </article>
  );
}

export default HomeStyleCard;

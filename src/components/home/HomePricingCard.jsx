function HomePricingCard({ title, subtitle, price, badge, badgeTone = "pink" }) {
  const badgeClasses = {
    pink: "bg-[rgba(255,95,160,0.15)] text-[#ff5fa0]",
    violet: "bg-[rgba(168,85,247,0.15)] text-[#a855f7]"
  };

  return (
    <article className="flex items-center justify-between rounded-[16px] border border-white/7 bg-[#13131f] px-[17px] py-[16px]">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-[14px] font-semibold leading-5 text-white">{title}</h3>
          {badge ? (
            <span
              className={[
                "inline-flex h-[19px] items-center rounded-[2px] px-2 text-[10.6px] font-bold leading-[15.9px]",
                badgeClasses[badgeTone]
              ].join(" ")}
            >
              {badge}
            </span>
          ) : null}
        </div>
        <p className="mt-[2px] text-[12px] leading-4 text-white/45">{subtitle}</p>
      </div>

      <p className="text-[20px] font-black leading-7 text-[#ff5fa0]">{price}</p>
    </article>
  );
}

export default HomePricingCard;

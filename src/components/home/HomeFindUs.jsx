import addressIcon from "../../assets/home/icon-address.svg";
import phoneIcon from "../../assets/home/icon-phone.svg";
import clockIcon from "../../assets/home/icon-clock.svg";
import mapPinIcon from "../../assets/home/icon-map-pin.svg";
import HomeSectionHeader from "./HomeSectionHeader";

function ContactRow({ icon, tintClassName, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className={["flex h-8 w-8 items-center justify-center rounded-[14px]", tintClassName].join(" ")}>
        <img src={icon} alt="" className="h-[15px] w-[15px]" />
      </span>
      <div>{children}</div>
    </div>
  );
}

function HoursRow({ day, hours }) {
  return (
    <div className="flex items-center justify-between gap-6 text-[12px] leading-4">
      <span className="text-white/45">{day}</span>
      <span className="font-medium text-white">{hours}</span>
    </div>
  );
}

function HomeFindUs() {
  return (
    <section className="space-y-3">
      <HomeSectionHeader title="Find Us" />

      <div className="overflow-hidden rounded-[24px] border border-white/7 bg-[#13131f] p-[1px]">
        <div className="relative h-[120px] bg-[#1a1a2e]">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,95,160,0.18)_0%,rgba(26,26,46,0)_48%)]" />

          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[linear-gradient(135deg,#FF5FA0_0%,#A855F7_100%)] shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
            <img src={mapPinIcon} alt="" className="h-[18px] w-[18px]" />
          </span>
        </div>

        <div className="space-y-3 p-4 pt-[15px]">
          <ContactRow icon={addressIcon} tintClassName="bg-[rgba(255,95,160,0.12)]">
            <p className="text-[14px] font-medium leading-5 text-white">Av. da Liberdade, 120</p>
            <p className="text-[12px] leading-4 text-white/45">1250-096 Lisbon, Portugal</p>
          </ContactRow>

          <ContactRow icon={phoneIcon} tintClassName="bg-[rgba(168,85,247,0.12)]">
            <p className="pt-[6px] text-[14px] font-medium leading-5 text-white">+351 21 345 6789</p>
          </ContactRow>

          <div className="h-px bg-white/7" />

          <ContactRow icon={clockIcon} tintClassName="bg-[rgba(59,130,246,0.12)]">
            <div className="min-w-[149px] space-y-1">
              <HoursRow day="Mon – Fri" hours="08:00 – 22:00" />
              <HoursRow day="Saturday" hours="09:00 – 20:00" />
              <HoursRow day="Sunday" hours="10:00 – 16:00" />
            </div>
          </ContactRow>
        </div>
      </div>
    </section>
  );
}

export default HomeFindUs;

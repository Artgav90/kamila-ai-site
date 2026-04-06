import { profileSubscription } from "./profileData";
import { ZapIcon } from "./ProfileIcons";

function ProfileSubscriptionCard({ subscription = profileSubscription }) {
  return (
    <section
      className="mb-5 rounded-3xl p-5"
      style={{
        background: "rgb(19, 19, 31)",
        border: "1px solid rgba(255, 255, 255, 0.07)"
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: "rgba(255, 95, 160, 0.12)" }}
          >
            <ZapIcon />
          </div>

          <div>
            <p className="text-sm font-bold text-white">{subscription.title}</p>
            <p className="text-[11px] text-white/45">{subscription.subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl px-3 py-1.5 text-xs font-bold text-white transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
            boxShadow: "0 3px 12px rgba(168, 85, 247, 0.35)"
          }}
        >
          {subscription.ctaLabel}
        </button>
      </div>

      <div className="mb-3 flex items-end gap-2">
        <span
          className="text-5xl font-black"
          style={{
            color: "rgb(255, 95, 160)",
            textShadow: "0 0 20px rgba(255, 95, 160, 0.4)"
          }}
        >
          {subscription.classesLeft}
        </span>

        <div className="mb-1.5">
          <p className="text-sm font-bold text-white">{subscription.classesLeftLabel}</p>
          <p className="text-[11px] text-white/45">{subscription.usageLabel}</p>
        </div>
      </div>

      <div className="relative">
        <div
          className="w-full overflow-hidden rounded-full"
          style={{
            height: "8px",
            background: "rgba(255, 255, 255, 0.07)"
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: subscription.progressWidth,
              background: "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))",
              boxShadow: "0 0 8px rgba(255, 95, 160, 0.4)"
            }}
          />
        </div>

        <div className="mt-1.5 flex justify-between">
          {Array.from({ length: subscription.totalDots }, (_, index) => (
            <div
              key={index}
              className="h-1 w-1 rounded-full"
              style={{
                background:
                  index < subscription.activeDots
                    ? "rgb(255, 95, 160)"
                    : "rgba(255, 255, 255, 0.15)"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileSubscriptionCard;

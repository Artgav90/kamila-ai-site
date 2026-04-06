import { CrmIcon } from "../CrmIcons";

export const PANEL_BACKGROUND = "rgb(15, 15, 26)";
export const SURFACE_BACKGROUND = "rgb(26, 26, 46)";
export const SURFACE_BORDER = "rgba(255, 255, 255, 0.06)";
export const MUTED_TEXT = "rgba(255, 255, 255, 0.45)";
export const SECONDARY_TEXT = "rgba(255, 255, 255, 0.25)";

function OverlayBackdrop({ onClick, zIndex = 20 }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
      style={{ zIndex }}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

export function PanelShell({ title, subtitle, children, onClose }) {
  return (
    <>
      <OverlayBackdrop onClick={onClose} />
      <aside
        className="fixed inset-y-0 right-0 flex w-[420px] flex-col"
        style={{
          zIndex: 30,
          background: PANEL_BACKGROUND,
          borderLeft: `1px solid ${SURFACE_BORDER}`,
          boxShadow: "-24px 0 80px rgba(0, 0, 0, 0.35)"
        }}
      >
        <div
          className="flex items-start justify-between gap-4 px-5 py-4"
          style={{ borderBottom: `1px solid ${SURFACE_BORDER}` }}
        >
          <div>
            <p className="text-base font-black text-white">{title}</p>
            <p className="mt-1 text-xs" style={{ color: MUTED_TEXT }}>
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all hover:bg-white/10"
            style={{ border: `1px solid ${SURFACE_BORDER}` }}
          >
            <CrmIcon name="x" size={16} color="rgba(255,255,255,0.75)" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </aside>
    </>
  );
}

export function ModalShell({
  children,
  className = "max-w-[520px]",
  title,
  subtitle,
  onClose
}) {
  return (
    <>
      <OverlayBackdrop onClick={onClose} zIndex={40} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-8">
        <div
          className={`w-full rounded-[24px] ${className}`}
          style={{
            background: PANEL_BACKGROUND,
            border: `1px solid ${SURFACE_BORDER}`,
            boxShadow: "0 30px 120px rgba(0, 0, 0, 0.55)"
          }}
        >
          <div
            className="flex items-start justify-between gap-4 px-6 py-5"
            style={{ borderBottom: `1px solid ${SURFACE_BORDER}` }}
          >
            <div>
              <p className="text-lg font-black text-white">{title}</p>
              <p className="mt-1 text-sm" style={{ color: MUTED_TEXT }}>
                {subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all hover:bg-white/10"
              style={{ border: `1px solid ${SURFACE_BORDER}` }}
            >
              <CrmIcon name="x" size={16} color="rgba(255,255,255,0.75)" />
            </button>
          </div>

          <div className="px-6 py-6">{children}</div>
        </div>
      </div>
    </>
  );
}

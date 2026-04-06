import { CrmIcon } from "./CrmIcons";
import { useLanguage } from "../../context/LanguageContext";

const HEADER_BACKGROUND = "rgb(15, 15, 26)";
const HEADER_BORDER = "rgba(255, 255, 255, 0.06)";
const MUTED_TEXT = "rgba(255, 255, 255, 0.45)";

function CrmTopBar({
  searchQuery,
  onSearchChange,
  onBellClick,
  onAddStudent,
  searchDropdown
}) {
  const { t } = useLanguage();

  return (
    <header
      className="sticky top-0 z-10 flex shrink-0 items-center justify-between px-6 py-3.5"
      style={{
        background: HEADER_BACKGROUND,
        borderBottom: `1px solid ${HEADER_BORDER}`
      }}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-base font-black text-white">{t("ui.09fa93e81a43")}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="flex h-9 items-center gap-2 rounded-xl px-3"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${HEADER_BORDER}`
            }}
          >
              <CrmIcon name="search" size={13} color={MUTED_TEXT} />
              <input
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={t("ui.708db57baf58")}
                className="w-36 bg-transparent text-xs text-white outline-none"
              />
          </div>

          {searchDropdown}
        </div>

        <button
          type="button"
          onClick={onBellClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:bg-white/10"
          style={{ border: `1px solid ${HEADER_BORDER}` }}
        >
          <CrmIcon name="bell" size={15} color={MUTED_TEXT} />
        </button>

        <button
          type="button"
          onClick={onAddStudent}
          className="flex h-9 items-center gap-2 rounded-xl px-4 text-xs font-bold text-white transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
            boxShadow: "0 4px 16px rgba(168, 85, 247, 0.3)"
          }}
        >
          <CrmIcon name="plus" size={13} color="currentColor" />
          <span>{t("ui.0b33b48e2541")}</span>
        </button>
      </div>
    </header>
  );
}

export default CrmTopBar;

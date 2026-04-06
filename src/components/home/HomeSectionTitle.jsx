import { Link } from "react-router-dom";
import { ChevronRightIcon } from "./HomeIcons";

function HomeSectionTitle({ title, actionLabel, actionTo }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-base font-bold text-white">{title}</h3>
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="flex items-center gap-1 text-xs font-medium text-[#ff5fa0]">
          {actionLabel}
          <ChevronRightIcon size={13} />
        </Link>
      ) : null}
    </div>
  );
}

export default HomeSectionTitle;

import { Link } from "react-router-dom";
import chevronRight from "../../assets/home/icon-chevron-right.svg";

function HomeSectionHeader({ title, actionLabel, actionTo }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-[16px] font-bold leading-6 text-white">{title}</h2>

      {actionLabel && actionTo ? (
        <Link to={actionTo} className="flex items-center gap-[3px] text-[12px] font-medium leading-4 text-[#ff5fa0]">
          <span>{actionLabel}</span>
          <img src={chevronRight} alt="" className="h-[13px] w-[13px]" />
        </Link>
      ) : null}
    </div>
  );
}

export default HomeSectionHeader;

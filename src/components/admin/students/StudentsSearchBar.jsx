import { SearchIcon } from "./StudentManagementIcons";

function StudentsSearchBar({ value, placeholder, onChange }) {
  return (
    <div className="mb-4 px-5">
      <div
        className="flex h-12 items-center gap-3 rounded-2xl px-4"
        style={{ background: "rgb(30, 30, 46)" }}
      >
        <SearchIcon color="rgba(255, 255, 255, 0.45)" />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
        />
      </div>
    </div>
  );
}

export default StudentsSearchBar;

function StudentActionSheet({ isOpen, title, subtitle, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-[430px] rounded-[30px] border p-4 sm:p-5"
        style={{
          background: "linear-gradient(145deg, rgb(18, 14, 30), rgb(10, 10, 18))",
          borderColor: "rgba(255, 255, 255, 0.11)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)"
        }}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-white">{title}</h3>
            {subtitle ? (
              <p className="mt-0.5 text-[11px] text-white/55">{subtitle}</p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-xs font-bold text-white/80 transition-all active:scale-95"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: "rgba(255, 255, 255, 0.04)"
            }}
          >
            CLOSE
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default StudentActionSheet;

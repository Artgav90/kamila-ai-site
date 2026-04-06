function StudentActionToast({ toast }) {
  if (!toast) {
    return null;
  }

  const tones = {
    success: {
      color: "rgb(255, 255, 255)",
      background: "linear-gradient(135deg, rgba(255, 95, 160, 0.95), rgba(168, 85, 247, 0.95))",
      borderColor: "rgba(255, 255, 255, 0.16)"
    },
    error: {
      color: "rgb(255, 255, 255)",
      background: "rgba(127, 29, 29, 0.96)",
      borderColor: "rgba(248, 113, 113, 0.25)"
    }
  };

  const tone = tones[toast.tone] ?? tones.success;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(94px+env(safe-area-inset-bottom))] z-40 flex justify-center px-5">
      <div
        className="w-full max-w-[390px] rounded-2xl border px-4 py-3 text-sm font-semibold shadow-2xl"
        style={{
          color: tone.color,
          background: tone.background,
          borderColor: tone.borderColor
        }}
      >
        {toast.message}
      </div>
    </div>
  );
}

export default StudentActionToast;

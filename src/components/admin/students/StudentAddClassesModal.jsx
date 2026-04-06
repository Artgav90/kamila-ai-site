import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import StudentActionSheet from "./StudentActionSheet";

const PRESET_AMOUNTS = [1, 4, 8];

function StudentAddClassesModal({ student, isOpen, onClose, onConfirm }) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setAmount(1);
  }, [isOpen, student?.studentId]);

  const nextClassesLeft = useMemo(() => {
    if (!student) {
      return 0;
    }

    return student.classesCount + amount;
  }, [amount, student]);

  if (!student) {
    return null;
  }

  return (
    <StudentActionSheet
      isOpen={isOpen}
      onClose={onClose}
      title={t("ui.c9828ec95833")}
      subtitle={t("ui.m.studentAddClasses.subtitle", { name: student.name })}
    >
      <div
        className="mb-4 rounded-2xl border p-4"
        style={{
          borderColor: "rgba(255, 255, 255, 0.08)",
          background: "rgba(255, 255, 255, 0.04)"
        }}
      >
        <p className="text-sm font-bold text-white">{student.name}</p>
        <p className="mt-1 text-xs text-white/45">{student.membershipLabel}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div
            className="rounded-2xl border px-3 py-3"
            style={{
              borderColor: "rgba(255, 255, 255, 0.08)",
              background: "rgba(11, 11, 19, 0.45)"
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/38">
              {t("ui.97cd077dc728")}
            </p>
            <p className="mt-1 text-2xl font-black text-white">{student.classesCount}</p>
          </div>

          <div
            className="rounded-2xl border px-3 py-3"
            style={{
              borderColor: "rgba(255, 95, 160, 0.18)",
              background: "rgba(255, 95, 160, 0.08)"
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/38">
              {t("ui.3cd42c3a2187")}
            </p>
            <p className="mt-1 text-2xl font-black text-white">{nextClassesLeft}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {PRESET_AMOUNTS.map((presetAmount) => (
          <button
            key={presetAmount}
            type="button"
            onClick={() => setAmount(presetAmount)}
            className="h-11 rounded-2xl text-sm font-bold transition-all active:scale-95"
            style={
              amount === presetAmount
                ? {
                    background:
                      "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                    color: "rgb(255, 255, 255)"
                  }
                : {
                    background: "rgba(168, 85, 247, 0.1)",
                    color: "rgb(168, 85, 247)",
                    border: "1px solid rgba(168, 85, 247, 0.16)"
                  }
            }
          >
            +{presetAmount}
          </button>
        ))}
      </div>

      <div className="mb-5 flex items-center justify-between rounded-2xl border px-3 py-3" style={{
        borderColor: "rgba(255, 255, 255, 0.08)",
        background: "rgba(255, 255, 255, 0.04)"
      }}>
        <button
          type="button"
          onClick={() => setAmount((currentAmount) => Math.max(1, currentAmount - 1))}
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-bold text-white transition-all active:scale-95"
          style={{ background: "rgba(255, 255, 255, 0.07)" }}
        >
          -
        </button>

        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.12em] text-white/38">
            {t("ui.4e9affc615c6")}
          </p>
          <p className="mt-1 text-3xl font-black text-white">{amount}</p>
        </div>

        <button
          type="button"
          onClick={() => setAmount((currentAmount) => currentAmount + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-bold text-white transition-all active:scale-95"
          style={{ background: "rgba(255, 255, 255, 0.07)" }}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => onConfirm(amount)}
        className="h-12 w-full rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
        style={{
          background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
          boxShadow: "0 10px 28px rgba(168, 85, 247, 0.32)"
        }}
      >
        {t("ui.m.studentAddClasses.button", { amount })}
      </button>
    </StudentActionSheet>
  );
}

export default StudentAddClassesModal;

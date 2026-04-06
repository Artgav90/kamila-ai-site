import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import {
  MUTED_TEXT,
  ModalShell,
  SURFACE_BACKGROUND,
  SURFACE_BORDER
} from "../shared";

export function CrmAddClassesModal({ isOpen, onClose, onConfirm, student }) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setAmount(1);
    }
  }, [isOpen, student?.studentId]);

  if (!isOpen || !student) {
    return null;
  }

  return (
    <ModalShell
      title={t("ui.c9828ec95833")}
      subtitle={t("ui.m.crm.addClasses.subtitle", { name: student.name })}
      onClose={onClose}
    >
      <div
        className="rounded-2xl p-4"
        style={{
          background: SURFACE_BACKGROUND,
          border: `1px solid ${SURFACE_BORDER}`
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-white">{student.name}</p>
            <p className="mt-1 text-sm" style={{ color: MUTED_TEXT }}>
              {student.membershipLabel}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: MUTED_TEXT }}>
              {t("ui.6a59fc0dabbd")}
            </p>
            <p className="mt-1 text-3xl font-black text-white">{student.classesCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[1, 4, 8].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setAmount(value)}
            className="h-12 rounded-2xl text-sm font-bold transition-all active:scale-[0.98]"
            style={
              amount === value
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
            +{value}
          </button>
        ))}
      </div>

      <div
        className="mt-4 flex items-center justify-between rounded-2xl p-3"
        style={{
          background: SURFACE_BACKGROUND,
          border: `1px solid ${SURFACE_BORDER}`
        }}
      >
        <button
          type="button"
          onClick={() => setAmount((current) => Math.max(1, current - 1))}
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-bold text-white"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          -
        </button>

        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: MUTED_TEXT }}>
            {t("ui.40d3dc0bc705")}
          </p>
          <p className="mt-1 text-4xl font-black text-white">{amount}</p>
        </div>

        <button
          type="button"
          onClick={() => setAmount((current) => current + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-bold text-white"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => onConfirm(amount)}
        className="mt-5 h-12 w-full rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
        }}
      >
        {t("ui.m.crm.addClasses.button", { amount })}
      </button>
    </ModalShell>
  );
}

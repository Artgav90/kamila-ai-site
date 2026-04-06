import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import {
  MUTED_TEXT,
  ModalShell,
  SURFACE_BACKGROUND,
  SURFACE_BORDER
} from "../shared";

function createEmptyStudentForm(t) {
  return {
    name: "",
    email: "",
    phone: "",
    tier: "Silver",
    membershipLabel: t("ui.6cedd83fd43c"),
    membershipRenewal: t("ui.c270a24c9ff5"),
    totalClasses: 1,
    emergencyContact: t("ui.2f7679d347e5"),
    emergencyPhone: t("ui.2f7679d347e5"),
    notes: t("ui.a51ef31c8034")
  };
}

export function CrmAddStudentModal({ isOpen, onClose, onSubmit }) {
  const { t } = useLanguage();
  const [form, setForm] = useState(() => createEmptyStudentForm(t));

  useEffect(() => {
    if (isOpen) {
      setForm(createEmptyStudentForm(t));
    }
  }, [isOpen, t]);

  if (!isOpen) {
    return null;
  }

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      totalClasses: Number.parseInt(form.totalClasses, 10) || 1
    });
  };

  return (
    <ModalShell
      title={t("ui.0b33b48e2541")}
      subtitle={t("ui.712f0239b91c")}
      onClose={onClose}
      className="max-w-[760px]"
    >
      <div className="grid grid-cols-2 gap-4">
        {[
          ["name", t("ui.76fba84cb8d6"), t("ui.5a72478ee78c")],
          ["email", "Email", t("ui.9a11cb355a78")],
          ["phone", t("ui.5f5cf935b0eb"), "+49 151 0000 0000"],
          ["membershipLabel", t("ui.927bfce026c4"), t("ui.3dfb43c18aa0")],
          ["membershipRenewal", t("ui.5c05280d023a"), t("ui.9cc944c96fa3")],
          ["totalClasses", t("ui.b037ee913226"), "10"],
          ["emergencyContact", t("ui.bc7ec840b5ae"), t("ui.fd2e2dc8c6b8")],
          ["emergencyPhone", t("ui.f18d5f06cc24"), "+49 151 1000 0000"]
        ].map(([field, label, placeholder]) => (
          <label key={field} className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: MUTED_TEXT }}>
              {label}
            </span>
            <input
              value={form[field]}
              onChange={(event) => updateField(field, event.target.value)}
              placeholder={placeholder}
              className="h-12 w-full rounded-2xl px-4 text-sm text-white outline-none"
              style={{
                background: SURFACE_BACKGROUND,
                border: `1px solid ${SURFACE_BORDER}`
              }}
            />
          </label>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: MUTED_TEXT }}>
          {t("ui.c8f1d2eb0476")}
        </p>
        <div className="grid grid-cols-4 gap-3">
          {["Gold", "Silver", "Platinum", "Bronze"].map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => updateField("tier", tier)}
              className="h-11 rounded-2xl text-sm font-bold transition-all active:scale-[0.98]"
              style={
                form.tier === tier
                  ? {
                      background:
                        "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                      color: "rgb(255, 255, 255)"
                    }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.82)",
                      border: `1px solid ${SURFACE_BORDER}`
                    }
              }
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: MUTED_TEXT }}>
          {t("ui.30ce43b85ad1")}
        </span>
        <textarea
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          rows="4"
          className="w-full rounded-2xl px-4 py-3 text-sm text-white outline-none"
          style={{
            background: SURFACE_BACKGROUND,
            border: `1px solid ${SURFACE_BORDER}`
          }}
        />
      </label>

      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="h-12 rounded-2xl px-5 text-sm font-bold text-white transition-all active:scale-[0.98]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${SURFACE_BORDER}`
          }}
        >
          {t("ui.954dd077a89d")}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="h-12 rounded-2xl px-5 text-sm font-bold text-white transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
          }}
        >
          {t("ui.3f727e776619")}
        </button>
      </div>
    </ModalShell>
  );
}

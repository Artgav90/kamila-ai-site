import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

function WelcomeEntrySheet({ isOpen, onClose, onSelect, onSubmit, selectedMode }) {
  const { lt, t } = useLanguage();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    contact: "",
    password: ""
  });
  const [loginForm, setLoginForm] = useState({
    contact: "",
    password: ""
  });

  const entryOptions = useMemo(
    () => [
      {
        id: "register",
        badge: "NEW",
        title: lt("Регистрация", "Registrierung"),
        description: lt(
          "Для нового ученика, который только начинает путь с TOP.DANCE.",
          "Fuer neue Schuelerinnen und Schueler, die gerade erst mit TOP.DANCE starten."
        )
      },
      {
        id: "login",
        badge: "LOGIN",
        title: lt("Авторизация", "Anmeldung"),
        description: lt(
          "Для ученика, у которого уже есть аккаунт и доступ в систему.",
          "Fuer Schuelerinnen und Schueler, die bereits ein Konto und Zugang zum System haben."
        )
      }
    ],
    [lt]
  );

  const selectionNotes = useMemo(
    () => ({
      register: lt(
        "Выбрана регистрация. Следующим шагом подключим полноценную форму создания аккаунта.",
        "Registrierung ausgewaehlt. Als naechstes binden wir die vollstaendige Kontoerstellung an."
      ),
      login: lt(
        "Выбрана авторизация. Следующим шагом подключим полноценную форму входа в аккаунт.",
        "Anmeldung ausgewaehlt. Als naechstes binden wir den vollstaendigen Login an."
      )
    }),
    [lt]
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const activeForm = selectedMode === "register" ? registerForm : loginForm;

  const canSubmit = useMemo(() => {
    if (selectedMode === "register") {
      return (
        registerForm.name.trim().length > 1 &&
        registerForm.contact.trim().length > 2 &&
        registerForm.password.trim().length >= 4
      );
    }

    if (selectedMode === "login") {
      return loginForm.contact.trim().length > 2 && loginForm.password.trim().length >= 4;
    }

    return false;
  }, [
    loginForm.contact,
    loginForm.password,
    registerForm.contact,
    registerForm.name,
    registerForm.password,
    selectedMode
  ]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-40 flex items-end justify-center px-3 pb-0 pt-10 backdrop-blur-md sm:px-4"
      style={{
        background:
          "linear-gradient(180deg, rgba(5, 5, 16, 0.34) 0%, rgba(5, 5, 16, 0.82) 100%), radial-gradient(circle at top, rgba(255, 95, 160, 0.16) 0%, transparent 30%), radial-gradient(circle at bottom, rgba(168, 85, 247, 0.12) 0%, transparent 28%)"
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="relative w-full overflow-hidden rounded-t-[32px] border px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-3 sm:rounded-[32px] sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, rgba(25, 18, 41, 0.985) 0%, rgba(14, 11, 24, 0.992) 38%, rgba(9, 9, 16, 0.998) 100%)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          boxShadow:
            "0 -24px 80px rgba(0, 0, 0, 0.64), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "radial-gradient(circle at top, rgba(255, 95, 160, 0.24) 0%, rgba(168, 85, 247, 0.14) 24%, transparent 72%)"
          }}
        />

        <div className="relative z-10 flex justify-center">
          <div
            className="h-1.5 w-16 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.26) 50%, rgba(255,255,255,0.08) 100%)"
            }}
          />
        </div>

        <div className="relative z-10 mt-5 flex items-start justify-between gap-4">
          <div className="max-w-[76%]">
            <p
              className="text-[11px] font-black uppercase tracking-[0.24em]"
              style={{
                background: "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              TOP.DANCE ACCESS
            </p>
            <h3
              className="mt-3 text-[32px] font-black leading-[0.98] tracking-[-0.04em] text-white"
              style={{ textShadow: "0 10px 30px rgba(0, 0, 0, 0.28)" }}
            >
              {lt("Выберите вход", "Zugang waehlen")}
            </h3>
            <p className="mt-4 max-w-[22ch] text-[15px] leading-8 text-white/56">
              {lt(
                "Нажми на нужный сценарий: новый аккаунт или вход в уже существующий профиль.",
                "Waehle den passenden Weg: neues Konto oder Anmeldung in ein bestehendes Profil."
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-[22px] px-4 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-all active:scale-95"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)"
            }}
          >
            {t("ui.004a4a31b476")}
          </button>
        </div>

        <div className="relative z-10 mt-6 space-y-4">
          {entryOptions.map((option) => {
            const isSelected = selectedMode === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
                className="group relative w-full overflow-hidden rounded-[28px] border px-5 py-5 text-left transition-all duration-200 active:scale-[0.992]"
                style={{
                  borderColor: isSelected
                    ? "rgba(255, 95, 160, 0.42)"
                    : "rgba(255, 255, 255, 0.08)",
                  background: isSelected
                    ? "linear-gradient(180deg, rgba(255, 95, 160, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)"
                    : "linear-gradient(180deg, rgba(255, 255, 255, 0.042) 0%, rgba(255, 255, 255, 0.024) 100%)",
                  boxShadow: isSelected
                    ? "0 18px 44px rgba(255, 95, 160, 0.12), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "inset 0 1px 0 rgba(255,255,255,0.04)"
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background: isSelected
                      ? "linear-gradient(90deg, transparent 0%, rgba(255,95,160,0.95) 38%, rgba(168,85,247,0.95) 72%, transparent 100%)"
                      : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)"
                  }}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span
                        className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em]"
                        style={{
                          color: isSelected ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.74)",
                          background: isSelected
                            ? "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))"
                            : "rgba(255, 255, 255, 0.08)",
                          boxShadow: isSelected
                            ? "0 10px 22px rgba(255, 95, 160, 0.18)"
                            : "none"
                        }}
                      >
                        {option.badge}
                      </span>
                      <span className="text-[18px] font-black tracking-[-0.03em] text-white">
                        {option.title}
                      </span>
                    </div>

                    <p className="mt-4 max-w-[26ch] text-[15px] leading-8 text-white/54">
                      {option.description}
                    </p>
                  </div>

                  <div
                    className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      borderColor: isSelected
                        ? "rgba(255, 95, 160, 0.8)"
                        : "rgba(255, 255, 255, 0.12)",
                      background: isSelected
                        ? "linear-gradient(135deg, rgba(255, 95, 160, 0.24), rgba(168, 85, 247, 0.2))"
                        : "rgba(255, 255, 255, 0.03)",
                      boxShadow: isSelected ? "0 0 26px rgba(255, 95, 160, 0.16)" : "none"
                    }}
                  >
                    <div
                      className="h-5 w-5 rounded-full border"
                      style={{
                        borderColor: isSelected
                          ? "rgba(255, 255, 255, 0.0)"
                          : "rgba(255, 255, 255, 0.22)",
                        background: isSelected
                          ? "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
                          : "transparent",
                        boxShadow: isSelected ? "0 0 14px rgba(255, 95, 160, 0.42)" : "none"
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div
          className="relative z-10 mt-4 rounded-[24px] border px-4 py-4"
          style={{
            borderColor: selectedMode ? "rgba(255, 95, 160, 0.14)" : "rgba(255, 255, 255, 0.08)",
            background: selectedMode
              ? "linear-gradient(180deg, rgba(255, 95, 160, 0.07) 0%, rgba(255, 255, 255, 0.03) 100%)"
              : "rgba(255, 255, 255, 0.035)"
          }}
        >
          <p className="text-[13px] leading-6 text-white/62">
            {selectedMode
              ? selectionNotes[selectedMode]
              : lt(
                  "Выбери один из вариантов, и мы поведем пользователя по нужному сценарию.",
                  "Waehle eine Option, und wir fuehren den Nutzer in den passenden Flow."
                )}
          </p>
        </div>

        {selectedMode ? (
          <form
            className="relative z-10 mt-5 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();

              if (!canSubmit) {
                return;
              }

              onSubmit(selectedMode, activeForm);
            }}
          >
            {selectedMode === "register" ? (
              <label className="block">
                <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/44">
                  {lt("Имя", "Name")}
                </span>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(event) =>
                    setRegisterForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder={lt("Как к вам обращаться", "Wie wir dich ansprechen duerfen")}
                  className="h-13 w-full rounded-[20px] border px-4 text-sm text-white outline-none transition-colors placeholder:text-white/28 focus:border-white/18 focus:bg-white/[0.06]"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    background: "rgba(255, 255, 255, 0.045)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)"
                  }}
                />
              </label>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/44">
                {selectedMode === "register"
                  ? lt("Телефон или email", "Telefon oder E-Mail")
                  : lt("Логин", "Login")}
              </span>
              <input
                type="text"
                value={activeForm.contact}
                onChange={(event) => {
                  const nextValue = event.target.value;

                  if (selectedMode === "register") {
                    setRegisterForm((current) => ({ ...current, contact: nextValue }));
                    return;
                  }

                  setLoginForm((current) => ({ ...current, contact: nextValue }));
                }}
                placeholder={
                  selectedMode === "register"
                    ? lt("Например, +49...", "Zum Beispiel +49...")
                    : lt("Email или телефон", "E-Mail oder Telefon")
                }
                className="h-13 w-full rounded-[20px] border px-4 text-sm text-white outline-none transition-colors placeholder:text-white/28 focus:border-white/18 focus:bg-white/[0.06]"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  background: "rgba(255, 255, 255, 0.045)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)"
                }}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/44">
                {lt("Пароль", "Passwort")}
              </span>
              <input
                type="password"
                value={activeForm.password}
                onChange={(event) => {
                  const nextValue = event.target.value;

                  if (selectedMode === "register") {
                    setRegisterForm((current) => ({ ...current, password: nextValue }));
                    return;
                  }

                  setLoginForm((current) => ({ ...current, password: nextValue }));
                }}
                placeholder={lt("Минимум 4 символа", "Mindestens 4 Zeichen")}
                className="h-13 w-full rounded-[20px] border px-4 text-sm text-white outline-none transition-colors placeholder:text-white/28 focus:border-white/18 focus:bg-white/[0.06]"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  background: "rgba(255, 255, 255, 0.045)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)"
                }}
              />
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-2 flex h-14 w-full items-center justify-center rounded-[22px] text-sm font-black uppercase tracking-[0.24em] text-white transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45"
              style={{
                background: "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                boxShadow:
                  "0 14px 34px rgba(255, 95, 160, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.22)"
              }}
            >
              {selectedMode === "register"
                ? lt("Зарегистрироваться", "Registrieren")
                : lt("Войти", "Einloggen")}
            </button>
          </form>
        ) : null}
      </section>
    </div>
  );
}

export default WelcomeEntrySheet;

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import AppHeaderBar from "../AppHeaderBar";
import {
  DEFAULT_PHONE_COUNTRY_OPTION,
  PHONE_COUNTRY_OPTIONS,
  resolveDialCode
} from "./phoneCountryCodes";

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF5FA0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A855F7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  );
}

function LogInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function LoginField({
  id,
  label,
  placeholder,
  countryCodeAriaLabel,
  type,
  value,
  onChange,
  icon,
  iconBackground,
  countryCode,
  onCountryCodeChange
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <div
        className="flex h-14 items-center gap-3 overflow-hidden rounded-2xl border px-4"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.07)"
        }}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
          style={{ background: iconBackground }}
        >
          {icon}
        </div>
        {typeof onCountryCodeChange === "function" ? (
          <div className="relative shrink-0">
            <select
              aria-label={countryCodeAriaLabel}
              value={countryCode}
              onChange={(event) => onCountryCodeChange(event.target.value)}
              className="h-9 rounded-lg border border-white/10 bg-white/5 px-2 pr-6 text-xs font-semibold text-white outline-none"
            >
              {PHONE_COUNTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
      </div>
    </div>
  );
}

function WelcomeLoginScreen({
  isOpen,
  onBack,
  onOpenCreateAccount,
  onSubmit,
  isSubmitting = false,
  errorMessage = ""
}) {
  const { lt } = useLanguage();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    clubCode: "",
    phoneCountryCode: DEFAULT_PHONE_COUNTRY_OPTION.value
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      clubCode: "",
      phoneCountryCode: DEFAULT_PHONE_COUNTRY_OPTION.value
    });
  }, [isOpen]);

  const canSubmit = useMemo(
    () =>
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      form.phoneNumber.trim().length > 5 &&
      form.clubCode.trim().length > 0,
    [form.clubCode, form.firstName, form.lastName, form.phoneNumber]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-30 flex h-full flex-col bg-[#09090E]">
      <AppHeaderBar />

      <div className="flex h-full flex-col bg-[#09090E]">
        <div className="flex shrink-0 items-center gap-3 px-5 pt-4 pb-4">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-all active:scale-95"
            style={{ background: "rgba(255, 255, 255, 0.08)" }}
            aria-label={lt("Назад", "Zurueck")}
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="text-xl font-bold text-white">{lt("Вход", "Einloggen")}</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          <form
            className="flex flex-col gap-5"
            onSubmit={(event) => {
              event.preventDefault();

              if (!canSubmit || isSubmitting) {
                return;
              }

              onSubmit({
                ...form,
                fullName: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
                phoneNumber: `${resolveDialCode(form.phoneCountryCode)} ${form.phoneNumber.trim()}`.trim()
              });
            }}
          >
            <div className="mb-2">
              <h2 className="mb-2 text-2xl font-bold text-white">{lt("С возвращением", "Willkommen zurueck")}</h2>
            </div>

            <LoginField
              id="login-first-name"
              label={lt("Имя", "Vorname")}
              placeholder={lt("Введите имя", "Vorname eingeben")}
              type="text"
              value={form.firstName}
              onChange={(event) =>
                setForm((current) => ({ ...current, firstName: event.target.value }))
              }
              icon={<UserIcon />}
              iconBackground="rgba(255, 95, 160, 0.12)"
            />

            <LoginField
              id="login-last-name"
              label={lt("Фамилия", "Nachname")}
              placeholder={lt("Введите фамилию", "Nachname eingeben")}
              type="text"
              value={form.lastName}
              onChange={(event) =>
                setForm((current) => ({ ...current, lastName: event.target.value }))
              }
              icon={<UserIcon />}
              iconBackground="rgba(255, 95, 160, 0.12)"
            />

            <LoginField
              id="login-phone-number"
              label={lt("Номер телефона", "Telefonnummer")}
              placeholder={lt("912 345 678", "912 345 678")}
              countryCodeAriaLabel={lt("Код страны", "Laendercode")}
              type="tel"
              value={form.phoneNumber}
              onChange={(event) =>
                setForm((current) => ({ ...current, phoneNumber: event.target.value }))
              }
              countryCode={form.phoneCountryCode}
              onCountryCodeChange={(nextCode) =>
                setForm((current) => ({ ...current, phoneCountryCode: nextCode }))
              }
              icon={<PhoneIcon />}
              iconBackground="rgba(168, 85, 247, 0.12)"
            />

            <LoginField
              id="login-club-code"
              label={lt("Код клуба", "Club-Code")}
              placeholder={lt("TOP.admin или topdance", "TOP.admin oder topdance")}
              type="text"
              value={form.clubCode}
              onChange={(event) =>
                setForm((current) => ({ ...current, clubCode: event.target.value }))
              }
              icon={<KeyIcon />}
              iconBackground="rgba(59, 130, 246, 0.12)"
            />

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-bold text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-45"
              style={{
                background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                boxShadow: "0 8px 32px rgba(255, 95, 160, 0.4)"
              }}
            >
              <LogInIcon />
              {isSubmitting
                ? lt("Выполняем вход...", "Anmeldung laeuft...")
                : lt("Войти", "Einloggen")}
            </button>

            {errorMessage ? (
              <p role="alert" className="mt-2 text-sm font-medium text-[#FF7AAF]">
                {errorMessage}
              </p>
            ) : null}

            <div className="mt-2 text-center">
              <span className="text-sm text-white/45">
                {lt("Ещё нет аккаунта? ", "Noch kein Konto? ")}
              </span>
              <button
                type="button"
                onClick={onOpenCreateAccount}
                className="text-sm font-semibold"
                style={{ color: "rgb(255, 95, 160)" }}
              >
                {lt("Создать аккаунт", "Konto erstellen")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WelcomeLoginScreen;

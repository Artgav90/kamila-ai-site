import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import welcomeArtwork from "../../assets/welcome/topdance-welcome-v2.jpg";
import { useAppAccess } from "../../context/AppAccessContext";
import { useLanguage } from "../../context/LanguageContext";
import { CloudAuthError, loginCloudUser, registerCloudUser } from "../../services/cloudAuth";
import WelcomeLoginScreen from "./WelcomeLoginScreen";
import WelcomeRegisterScreen from "./WelcomeRegisterScreen";

function resolveAuthErrorMessage(error, lt, fallbackMessage) {
  if (error instanceof CloudAuthError) {
    switch (error.code) {
      case "CLOUD_NOT_CONFIGURED":
        return lt(
          "Облако не подключено. Проверь настройки Supabase.",
          "Cloud ist nicht verbunden. Bitte Supabase-Einstellungen pruefen."
        );
      case "INVALID_FULL_NAME":
        return lt("Введите корректные имя и фамилию.", "Bitte gueltigen Vor- und Nachnamen eingeben.");
      case "INVALID_PHONE":
        return lt("Введите корректный номер телефона.", "Bitte gueltige Telefonnummer eingeben.");
      case "INVALID_REGISTRATION_CODE":
        return lt(
          "Неверный код регистрации. Используй TOP.admin или topdance.",
          "Ungueltiger Registrierungscode. Nutze TOP.admin oder topdance."
        );
      case "USER_EXISTS":
        return lt(
          "Этот номер уже зарегистрирован. Используй вход.",
          "Diese Nummer ist bereits registriert. Bitte einloggen."
        );
      case "USER_NOT_FOUND":
        return lt(
          "Пользователь не найден. Сначала зарегистрируйся.",
          "Benutzer nicht gefunden. Bitte zuerst registrieren."
        );
      case "INVALID_CREDENTIALS":
        return lt("Неверные данные для входа.", "Ungueltige Anmeldedaten.");
      case "CLOUD_POLICY_MISSING":
        return lt(
          "Облако отклонило запись. Проверь RLS-политики в Supabase.",
          "Cloud hat den Schreibzugriff blockiert. Bitte RLS-Regeln in Supabase pruefen."
        );
      case "APP_STATE_TABLE_MISSING":
        return lt(
          "В Supabase отсутствует таблица app_state.",
          "In Supabase fehlt die Tabelle app_state."
        );
      default:
        return error.message || fallbackMessage;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

function WelcomePhoneShell() {
  const { lt } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { grantAccess } = useAppAccess();
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const isPreviewPath = location.pathname.startsWith("/welcome-preview");
  const welcomeBasePath = isPreviewPath ? "/welcome-preview" : "/welcome";
  const isLoginScreenOpen = location.pathname === `${welcomeBasePath}/login`;
  const isRegisterScreenOpen = location.pathname === `${welcomeBasePath}/register`;

  const openLoginScreen = () => {
    if (isRegisterSubmitting || isLoginSubmitting) {
      return;
    }

    setRegisterError("");
    setLoginError("");
    navigate(`${welcomeBasePath}/login`, { replace: true });
  };

  const openRegisterScreen = () => {
    if (isRegisterSubmitting || isLoginSubmitting) {
      return;
    }

    setLoginError("");
    setRegisterError("");
    navigate(`${welcomeBasePath}/register`, { replace: true });
  };

  const closeLoginScreen = () => {
    if (isLoginSubmitting) {
      return;
    }

    setLoginError("");
    navigate(welcomeBasePath, { replace: true });
  };

  const closeRegisterScreen = () => {
    if (isRegisterSubmitting) {
      return;
    }

    setRegisterError("");
    navigate(welcomeBasePath, { replace: true });
  };

  const handleLoginSubmit = async (payload) => {
    if (isLoginSubmitting) {
      return;
    }

    setLoginError("");
    setIsLoginSubmitting(true);

    try {
      const user = await loginCloudUser(payload);
      grantAccess({
        mode: "login",
        userId: user.userId,
        role: user.role,
        displayName: user.fullName || "",
        identifier: user.phoneNumber || payload.phoneNumber
      });
      navigate("/home", { replace: true });
    } catch (error) {
      setLoginError(
        resolveAuthErrorMessage(
          error,
          lt,
          lt("Не удалось выполнить вход. Попробуй еще раз.", "Einloggen fehlgeschlagen. Bitte erneut versuchen.")
        )
      );
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (payload) => {
    if (isRegisterSubmitting) {
      return;
    }

    setRegisterError("");
    setIsRegisterSubmitting(true);

    try {
      const user = await registerCloudUser(payload);
      grantAccess({
        mode: "register",
        userId: user.userId,
        role: user.role,
        displayName: user.fullName || payload.fullName,
        identifier: user.phoneNumber || payload.phoneNumber
      });
      navigate("/home", { replace: true });
    } catch (error) {
      setRegisterError(
        resolveAuthErrorMessage(
          error,
          lt,
          lt("Не удалось создать аккаунт. Попробуй еще раз.", "Konto konnte nicht erstellt werden. Bitte erneut versuchen.")
        )
      );
    } finally {
      setIsRegisterSubmitting(false);
    }
  };

  return (
    <div
      className="relative flex h-[100dvh] w-full flex-col bg-[#09090E] sm:h-[844px] sm:w-[390px] sm:overflow-hidden sm:rounded-[44px] sm:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
      style={{ background: "rgb(9, 9, 14)", fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="relative flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <img
          src={welcomeArtwork}
          alt={lt("Логотип TOP.DANCE", "TOP.DANCE Logo")}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ objectPosition: "center 20%" }}
        />

        <div className="relative z-10 flex h-full flex-col px-6 pb-10">
          <div className="flex-1" />

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={openLoginScreen}
              className="h-14 w-full rounded-2xl text-base font-bold text-white transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                boxShadow: "0 8px 32px rgba(255, 95, 160, 0.4)"
              }}
            >
              {lt("Войти", "Einloggen")}
            </button>

            <button
              type="button"
              onClick={openRegisterScreen}
              className="h-14 w-full rounded-2xl text-base font-bold text-white transition-all active:scale-95"
              style={{
                border: "1.5px solid rgba(255, 255, 255, 0.25)",
                color: "rgb(255, 255, 255)",
                background: "rgba(255, 255, 255, 0.06)"
              }}
            >
              {lt("Создать аккаунт", "Konto erstellen")}
            </button>
          </div>
        </div>
      </div>

      <WelcomeLoginScreen
        isOpen={isLoginScreenOpen}
        onBack={closeLoginScreen}
        onOpenCreateAccount={openRegisterScreen}
        onSubmit={handleLoginSubmit}
        isSubmitting={isLoginSubmitting}
        errorMessage={loginError}
      />

      <WelcomeRegisterScreen
        isOpen={isRegisterScreenOpen}
        onBack={closeRegisterScreen}
        onOpenLogin={openLoginScreen}
        onSubmit={handleRegisterSubmit}
        isSubmitting={isRegisterSubmitting}
        errorMessage={registerError}
      />
    </div>
  );
}

export default WelcomePhoneShell;

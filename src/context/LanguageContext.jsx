import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { isSupabaseConfigured } from "../services/supabase";
import { settingsRepository } from "../repositories/cloud";
import { translateMessage } from "../i18n/messages";

const LANGUAGE_STORAGE_KEY = "topdance-language";
const DEFAULT_LANGUAGE = "ru";
const SUPPORTED_LANGUAGES = new Set(["ru", "de"]);

const LanguageContext = createContext(null);

function getSafeLanguage(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return SUPPORTED_LANGUAGES.has(normalized) ? normalized : DEFAULT_LANGUAGE;
}

function loadInitialLanguage() {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored) {
    return getSafeLanguage(stored);
  }

  const browserLanguage = window.navigator?.language?.toLowerCase();
  if (browserLanguage?.startsWith("de")) {
    return "de";
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(loadInitialLanguage);
  const [isCloudReady, setIsCloudReady] = useState(!isSupabaseConfigured());
  const didCloudHydrationRef = useRef(false);
  const hasLocalMutationRef = useRef(false);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState((currentLanguage) => {
      const resolvedLanguage =
        typeof nextLanguage === "function"
          ? getSafeLanguage(nextLanguage(currentLanguage))
          : getSafeLanguage(nextLanguage);

      if (!isCloudReady) {
        hasLocalMutationRef.current = true;
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, resolvedLanguage);
      }

      return resolvedLanguage;
    });
  }, [isCloudReady]);

  const toggleLanguage = useCallback(() => {
    setLanguage((currentLanguage) => (currentLanguage === "de" ? "ru" : "de"));
  }, [setLanguage]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!isSupabaseConfigured() || didCloudHydrationRef.current) {
      setIsCloudReady(true);
      return;
    }

    didCloudHydrationRef.current = true;
    let isMounted = true;

    const hydrateLanguageFromCloud = async () => {
      try {
        const cloudLanguage = await settingsRepository.loadLanguage();
        if (!isMounted || hasLocalMutationRef.current) {
          return;
        }

        if (typeof cloudLanguage === "string") {
          setLanguageState(getSafeLanguage(cloudLanguage));
        }
      } catch (error) {
        console.error("Supabase language hydration failed:", error);
      } finally {
        if (isMounted) {
          setIsCloudReady(true);
        }
      }
    };

    hydrateLanguageFromCloud();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isCloudReady || !isSupabaseConfigured()) {
      return;
    }

    settingsRepository.saveLanguage(language).catch((error) => {
      console.error("Supabase language sync failed:", error);
    });
  }, [isCloudReady, language]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    let isMounted = true;
    const unsubscribe = settingsRepository.subscribe((cloudSettings) => {
      try {
        if (!isMounted || typeof cloudSettings?.language !== "string") {
          return;
        }

        const nextLanguage = getSafeLanguage(cloudSettings.language);
        setLanguageState((currentLanguage) => {
          if (currentLanguage === nextLanguage) {
            return currentLanguage;
          }

          if (typeof window !== "undefined") {
            window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
          }

          return nextLanguage;
        });
      } catch (error) {
        console.error("Supabase language realtime sync failed:", error);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const locale = language === "de" ? "de-DE" : "ru-RU";

  const t = useCallback(
    (key, params) => translateMessage(language, key, params),
    [language]
  );

  const lt = useCallback(
    (ruText, deText) => {
      if (typeof deText === "undefined") {
        return t(ruText);
      }

      return language === "de" ? deText ?? ruText : ruText;
    },
    [language, t]
  );

  const value = useMemo(
    () => ({
      language,
      locale,
      t,
      lt,
      setLanguage,
      toggleLanguage
    }),
    [language, locale, t, lt, setLanguage, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}

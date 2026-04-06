import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const APP_ACCESS_STORAGE_KEY = "topdance-app-access";
const APP_USER_ROLES = Object.freeze({
  admin: "admin",
  student: "student"
});

const AppAccessContext = createContext(null);

function parseStoredSession(rawValue) {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue);

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    if (
      typeof parsed.mode !== "string" ||
      typeof parsed.grantedAt !== "string" ||
      typeof parsed.userId !== "string" ||
      parsed.userId.trim().length === 0
    ) {
      return null;
    }

    return {
      mode: parsed.mode,
      grantedAt: parsed.grantedAt,
      userId: parsed.userId.trim(),
      role:
        parsed.role === APP_USER_ROLES.student || parsed.role === APP_USER_ROLES.admin
          ? parsed.role
          : APP_USER_ROLES.admin,
      displayName: typeof parsed.displayName === "string" ? parsed.displayName : "",
      identifier: typeof parsed.identifier === "string" ? parsed.identifier : ""
    };
  } catch {
    return null;
  }
}

function loadInitialSession() {
  if (typeof window === "undefined") {
    return null;
  }

  return parseStoredSession(window.localStorage.getItem(APP_ACCESS_STORAGE_KEY));
}

export function AppAccessProvider({ children }) {
  const [session, setSession] = useState(loadInitialSession);

  const grantAccess = useCallback((payload) => {
    const userId = String(payload?.userId ?? "").trim();
    if (!userId) {
      throw new Error("grantAccess requires a non-empty userId");
    }

    const role =
      payload?.role === APP_USER_ROLES.student || payload?.role === APP_USER_ROLES.admin
        ? payload.role
        : APP_USER_ROLES.student;

    const nextSession = {
      mode: payload.mode,
      grantedAt: new Date().toISOString(),
      userId,
      role,
      displayName: String(payload.displayName ?? "").trim(),
      identifier: String(payload.identifier ?? "").trim()
    };

    setSession(nextSession);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(APP_ACCESS_STORAGE_KEY, JSON.stringify(nextSession));
    }

    return nextSession;
  }, []);

  const revokeAccess = useCallback(() => {
    setSession(null);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(APP_ACCESS_STORAGE_KEY);
    }
  }, []);

  const value = useMemo(
    () => ({
      session,
      hasAccess: Boolean(session),
      hasAdminAccess: Boolean(session) && session.role === APP_USER_ROLES.admin,
      grantAccess,
      revokeAccess
    }),
    [grantAccess, revokeAccess, session]
  );

  return <AppAccessContext.Provider value={value}>{children}</AppAccessContext.Provider>;
}

export function useAppAccess() {
  const context = useContext(AppAccessContext);

  if (!context) {
    throw new Error("useAppAccess must be used inside AppAccessProvider");
  }

  return context;
}

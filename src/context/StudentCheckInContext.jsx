import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usersRepository } from "../repositories/cloud";
import { isSupabaseConfigured } from "../services/supabase";
import { useLanguage } from "./LanguageContext";
import { useStudentCheckInActions } from "./studentCheckIn/actions";
import { useStudentCheckInSelectors } from "./studentCheckIn/selectors";
import { useStudentCheckInState } from "./studentCheckIn/state";
import { useStudentCheckInSync } from "./studentCheckIn/sync";

const StudentCheckInContext = createContext(null);

export function StudentCheckInProvider({ children }) {
  const { locale, lt } = useLanguage();
  const { checkInState, persistState, setCheckInState } = useStudentCheckInState();
  const [usersState, setUsersState] = useState({ usersById: {} });
  const didUsersHydrationRef = useRef(false);
  useStudentCheckInSync({ setCheckInState });

  useEffect(() => {
    if (!isSupabaseConfigured() || didUsersHydrationRef.current) {
      return;
    }

    didUsersHydrationRef.current = true;
    let isMounted = true;

    const hydrateUsers = async () => {
      try {
        const cloudUsers = await usersRepository.load();
        if (!isMounted || !cloudUsers) {
          return;
        }

        setUsersState((currentState) => usersRepository.merge(currentState, cloudUsers));
      } catch (error) {
        console.error("Supabase users hydration failed:", error);
      }
    };

    hydrateUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    let isMounted = true;
    const unsubscribe = usersRepository.subscribe((cloudUsers) => {
      try {
        if (!isMounted || !cloudUsers) {
          return;
        }

        setUsersState((currentState) => usersRepository.merge(currentState, cloudUsers));
      } catch (error) {
        console.error("Supabase users realtime sync failed:", error);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const persistUsersState = useCallback((nextStateOrUpdater) => {
    let resolvedNextState = null;

    setUsersState((currentState) => {
      const nextState =
        typeof nextStateOrUpdater === "function"
          ? nextStateOrUpdater(currentState)
          : nextStateOrUpdater;
      resolvedNextState = usersRepository.merge(currentState, nextState);
      return resolvedNextState;
    });

    if (!isSupabaseConfigured() || !resolvedNextState) {
      return;
    }

    usersRepository.save(resolvedNextState).catch((error) => {
      console.error("Supabase users sync failed:", error);
    });
  }, []);

  const {
    adminStudentsView,
    currentStudentId,
    profileIdentityView,
    profileStatsView,
    profileSubscriptionView
  } = useStudentCheckInSelectors({
    checkInState,
    usersState,
    locale,
    lt
  });

  const {
    addStudent,
    addClassesToStudent,
    consumeClassByStudentId,
    consumeClassFromPayload,
    updateCurrentStudentAvatar
  } = useStudentCheckInActions({
    checkInState,
    currentStudentId,
    lt,
    persistState,
    persistUsersState
  });

  const contextValue = useMemo(
    () => ({
      addStudent,
      addClassesToStudent,
      adminStudentsView,
      consumeClassByStudentId,
      consumeClassFromPayload,
      currentStudentId,
      profileIdentityView,
      profileStatsView,
      profileSubscriptionView,
      updateCurrentStudentAvatar,
      studentsById: checkInState.studentsById,
      usersById: usersState.usersById
    }),
    [
      addStudent,
      addClassesToStudent,
      adminStudentsView,
      consumeClassByStudentId,
      consumeClassFromPayload,
      currentStudentId,
      profileIdentityView,
      profileStatsView,
      profileSubscriptionView,
      updateCurrentStudentAvatar,
      checkInState.studentsById,
      usersState.usersById
    ]
  );

  return (
    <StudentCheckInContext.Provider value={contextValue}>
      {children}
    </StudentCheckInContext.Provider>
  );
}

export function useStudentCheckIn() {
  const context = useContext(StudentCheckInContext);
  if (!context) {
    throw new Error("useStudentCheckIn must be used inside StudentCheckInProvider");
  }

  return context;
}

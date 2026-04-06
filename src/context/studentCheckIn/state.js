import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured } from "../../services/supabase";
import { studentsRepository } from "../../repositories/cloud";
import { createDefaultState, loadPersistedState, STORAGE_KEY } from "./helpers";

export function useStudentCheckInState() {
  const [checkInState, setCheckInState] = useState(() => (
    isSupabaseConfigured() ? createDefaultState() : loadPersistedState()
  ));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checkInState));
  }, [checkInState]);

  const persistState = useCallback((nextState) => {
    setCheckInState(nextState);

    if (isSupabaseConfigured()) {
      studentsRepository.save(nextState).catch((error) => {
        console.error("Supabase sync failed:", error);
      });
    }
  }, []);

  return {
    checkInState,
    persistState,
    setCheckInState
  };
}

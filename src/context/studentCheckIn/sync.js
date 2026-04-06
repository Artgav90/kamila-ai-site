import { useEffect, useRef } from "react";
import { isSupabaseConfigured } from "../../services/supabase";
import { studentsRepository } from "../../repositories/cloud";
import { mergeStateWithFallback } from "./helpers";

export function useStudentCheckInSync({ setCheckInState }) {
  const didCloudHydrationRef = useRef(false);

  useEffect(() => {
    if (!isSupabaseConfigured() || didCloudHydrationRef.current) {
      return;
    }

    didCloudHydrationRef.current = true;
    let isMounted = true;

    const hydrateFromCloud = async () => {
      try {
        const cloudState = await studentsRepository.load();
        if (!isMounted || !cloudState) {
          return;
        }

        setCheckInState((currentState) =>
          mergeStateWithFallback(studentsRepository.merge(currentState, cloudState))
        );
      } catch (error) {
        console.error("Supabase hydration failed:", error);
      }
    };

    hydrateFromCloud();

    return () => {
      isMounted = false;
    };
  }, [setCheckInState]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    let isMounted = true;
    const unsubscribe = studentsRepository.subscribe((cloudState) => {
      try {
        if (!isMounted || !cloudState) {
          return;
        }

        setCheckInState((currentState) =>
          mergeStateWithFallback(studentsRepository.merge(currentState, cloudState))
        );
      } catch (error) {
        console.error("Supabase student realtime sync failed:", error);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [setCheckInState]);
}

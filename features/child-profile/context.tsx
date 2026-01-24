"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ChildProfile } from "./types";
import {
  clearChildProfile,
  loadChildProfile,
  saveChildProfile,
} from "./storage";

type ChildProfileContextValue = {
  profile: ChildProfile | null;
  isReady: boolean;
  saveProfile: (profile: ChildProfile) => void;
  clearProfile: () => void;
};

const ChildProfileContext = createContext<ChildProfileContextValue | undefined>(
  undefined
);

export function ChildProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setProfile(loadChildProfile());
    setIsReady(true);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      isReady,
      saveProfile: (nextProfile: ChildProfile) => {
        setProfile(nextProfile);
        saveChildProfile(nextProfile);
      },
      clearProfile: () => {
        setProfile(null);
        clearChildProfile();
      },
    }),
    [profile, isReady]
  );

  return (
    <ChildProfileContext.Provider value={value}>
      {children}
    </ChildProfileContext.Provider>
  );
}

export function useChildProfile() {
  const context = useContext(ChildProfileContext);
  if (!context) {
    throw new Error("useChildProfile must be used within ChildProfileProvider");
  }
  return context;
}

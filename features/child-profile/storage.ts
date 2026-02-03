import type { ChildProfile } from "./types";

const STORAGE_KEY = "childProfile";

export function loadChildProfile(): ChildProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as ChildProfile;
  } catch {
    return null;
  }
}

export function saveChildProfile(profile: ChildProfile) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function clearChildProfile() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

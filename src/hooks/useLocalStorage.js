import { useState, useEffect } from "react";

/**
 * Persists state to localStorage under `key`, so a user's
 * watched currency pairs survive a page refresh.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage unavailable (private mode, quota) — fail silently
    }
  }, [key, value]);

  return [value, setValue];
}

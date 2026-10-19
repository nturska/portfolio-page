"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import {
  isTheme,
  THEME_STORAGE_KEY,
  THEME_TRANSITION_CLASS,
  THEME_TRANSITION_MS,
  type Theme,
} from "@/lib/theme";

type UseThemeResult = {
  theme: Theme;
  toggleTheme: () => void;
};

const subscribe = (onChange: () => void): (() => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};

const getSnapshot = (): Theme => {
  const current = document.documentElement.dataset.theme;
  return isTheme(current) ? current : "light";
};

const getServerSnapshot = (): Theme => "light";

export const useTheme = (): UseThemeResult => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";

    root.classList.add(THEME_TRANSITION_CLASS);
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (e.g. private mode); the theme still applies.
    }

    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      root.classList.remove(THEME_TRANSITION_CLASS);
      timeoutRef.current = null;
    }, THEME_TRANSITION_MS);
  }, []);

  return { theme, toggleTheme };
};

"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n";
import { en } from "@/messages/en";
import { pl } from "@/messages/pl";

type Messages = typeof pl;
type MessageKey = Leaves<Messages>;

type Leaves<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : Leaves<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

type TranslateVars = Record<string, string | number>;

type UseLocaleResult = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  t: (key: MessageKey, vars?: TranslateVars) => string;
};

const dictionaries: Record<Locale, Messages> = { pl, en };

const subscribe = (onChange: () => void): (() => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  return () => observer.disconnect();
};

const getSnapshot = (): Locale => {
  const current = document.documentElement.lang;
  return isLocale(current) ? current : DEFAULT_LOCALE;
};

const getServerSnapshot = (): Locale => DEFAULT_LOCALE;

const applyLocale = (next: Locale): void => {
  document.documentElement.lang = next;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (e.g. private mode); the locale still applies.
  }
};

const lookup = (messages: Messages, key: MessageKey): string => {
  const parts = key.split(".");
  let current: unknown = messages;

  for (const part of parts) {
    if (typeof current !== "object" || current === null || !(part in current)) {
      return key;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : key;
};

const interpolate = (template: string, vars?: TranslateVars): string => {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in vars ? String(vars[name]) : `{${name}}`,
  );
};

export const useLocale = (): UseLocaleResult => {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setLocale = useCallback((next: Locale) => {
    applyLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    applyLocale(getSnapshot() === "pl" ? "en" : "pl");
  }, []);

  const t = useCallback(
    (key: MessageKey, vars?: TranslateVars): string =>
      interpolate(lookup(dictionaries[locale], key), vars),
    [locale],
  );

  return useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  );
};

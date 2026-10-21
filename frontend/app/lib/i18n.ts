export type Locale = "pl" | "en";

export type LocalizedText = {
  pl: string;
  en: string;
};

export const LOCALE_STORAGE_KEY = "locale";
export const DEFAULT_LOCALE: Locale = "pl";

export const isLocale = (value: string | null | undefined): value is Locale =>
  value === "pl" || value === "en";

export const localized = (value: LocalizedText, locale: Locale): string =>
  value[locale];

export const localeInitScript = `(function () {
  try {
    var stored = localStorage.getItem("${LOCALE_STORAGE_KEY}");
    var locale =
      stored === "pl" || stored === "en"
        ? stored
        : (navigator.language || "").toLowerCase().startsWith("pl")
          ? "pl"
          : "en";
    document.documentElement.lang = locale;
  } catch (e) {}
})();`;

"use client";

import { useLocale } from "@/lib/hooks/useLocale";

type LanguageToggleProps = {
  className?: string;
};

export const LanguageToggle = ({ className = "" }: LanguageToggleProps) => {
  const { locale, toggleLocale, t } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t("language.switchTo")}
      aria-pressed={locale === "en"}
      className={`btn btn-ghost btn-sm font-mono text-accent-content bg-accent hover:bg-accent/80 z-50 fixed bottom-4 right-4 ${className}`}
    >
      <span className={locale === "pl" ? "font-bold" : "opacity-40"}>PL</span>
      <span className="opacity-30" aria-hidden="true">
        /
      </span>
      <span className={locale === "en" ? "font-bold" : "opacity-40"}>EN</span>
    </button>
  );
};

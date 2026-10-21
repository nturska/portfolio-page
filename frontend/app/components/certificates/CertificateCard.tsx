"use client";

import { useLocale } from "@/lib/hooks/useLocale";
import { localized } from "@/lib/i18n";
import type { Certificate, CertificateAccent } from "./types";

type CertificateCardProps = Pick<
  Certificate,
  "title" | "issuer" | "year" | "pdfUrl" | "accent"
>;

const ACCENT_STYLES: Record<CertificateAccent, string> = {
  primary: "from-primary to-secondary text-primary-content",
  secondary: "from-secondary to-accent text-secondary-content",
  accent: "from-accent to-primary text-accent-content",
  neutral: "from-neutral to-base-300 text-neutral-content",
};

export const CertificateCard = ({
  title,
  issuer,
  year,
  pdfUrl,
  accent,
}: CertificateCardProps) => {
  const { locale, t } = useLocale();

  return (
    <article
      className={`flex aspect-3/4 flex-col justify-between rounded-box bg-linear-to-br p-6 shadow-xl ${ACCENT_STYLES[accent]}`}
    >
      <svg
        className="h-10 w-10 opacity-80"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>

      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-75">
          {issuer}
          {year && ` · ${year}`}
        </p>
        <h3 className="text-xl font-bold leading-tight">
          {localized(title, locale)}
        </h3>
      </div>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm border-none bg-base-100/90 text-base-content hover:bg-base-100"
      >
        {t("certificates.viewPdf")}
      </a>
    </article>
  );
};

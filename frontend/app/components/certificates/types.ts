import type { LocalizedText } from "@/lib/i18n";

export type CertificateAccent = "primary" | "secondary" | "accent" | "neutral";

export interface Certificate {
  id: string;
  title: LocalizedText;
  issuer: string;
  year?: string;
  pdfUrl: string;
  accent: CertificateAccent;
}

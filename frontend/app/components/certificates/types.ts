export type CertificateAccent = "primary" | "secondary" | "accent" | "neutral";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  pdfUrl: string;
  accent: CertificateAccent;
}

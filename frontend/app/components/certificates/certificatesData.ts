import {
  cursor_cert,
  ts,
  english,
  ds_cert,
  pmp_cert,
  py_cert,
} from "../../../public";
import type { Certificate } from "./types";

export const certificates: Certificate[] = [
  {
    id: "pmp",
    title: {
      pl: "Project Management Professional",
      en: "Project Management Professional",
    },
    issuer: "PMI",
    pdfUrl: pmp_cert,
    accent: "primary",
  },
  {
    id: "digital-skills",
    title: { pl: "Umiejętności cyfrowe", en: "Digital Skills" },
    issuer: "Google",
    pdfUrl: ds_cert,
    accent: "secondary",
  },
  {
    id: "python",
    title: { pl: "Python", en: "Python" },
    issuer: "Udemy",
    pdfUrl: py_cert,
    accent: "accent",
  },
  {
    id: "cursor",
    title: {
      pl: "Cursor: programowanie ze wsparciem AI",
      en: "Cursor: AI-assisted development",
    },
    issuer: "Udemy",
    pdfUrl: cursor_cert,
    accent: "primary",
  },
  {
    id: "english",
    title: { pl: "Business English", en: "Business English" },
    issuer: "University of Washington",
    pdfUrl: english,
    accent: "secondary",
  },
  {
    id: "typescript",
    title: { pl: "TypeScript", en: "TypeScript" },
    issuer: "Udemy",
    pdfUrl: ts,
    accent: "accent",
  },
];

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
    title: "Project Management Professional",
    issuer: "PMI",
    pdfUrl: pmp_cert,
    accent: "primary",
  },
  {
    id: "digital-skills",
    title: "Digital Skills",
    issuer: "Google",
    pdfUrl: ds_cert,
    accent: "secondary",
  },
  {
    id: "python",
    title: "Python",
    issuer: "Udemy",
    pdfUrl: py_cert,
    accent: "accent",
  },
  {
    id: "cursor",
    title: "Cursor: AI-assisted development",
    issuer: "Udemy",
    pdfUrl: cursor_cert,
    accent: "primary",
  },
  {
    id: "english",
    title: "Business English",
    issuer: "University of Washington",
    pdfUrl: english,
    accent: "secondary",
  },
  {
    id: "typescript",
    title: "TypeScript",
    issuer: "Udemy",
    pdfUrl: ts,
    accent: "accent",
  },
];

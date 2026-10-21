import type { LocalizedText } from "@/lib/i18n";

export type TimelineKind = "education" | "work" | "project";

export interface TimelineEntry {
  id: string;
  date: string;
  title: LocalizedText;
  place?: LocalizedText;
  description: LocalizedText;
  kind: TimelineKind;
}

export type TimelineSide = "left" | "right";

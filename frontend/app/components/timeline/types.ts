export type TimelineKind = "education" | "work" | "project";

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  place?: string;
  description: string;
  kind: TimelineKind;
}

export type TimelineSide = "left" | "right";

"use client";

import { motion } from "motion/react";
import { useLocale } from "@/lib/hooks/useLocale";
import { localized } from "@/lib/i18n";
import type { TimelineEntry, TimelineKind, TimelineSide } from "./types";

type TimelineItemProps = {
  entry: TimelineEntry;
  side: TimelineSide;
};

const KIND_STYLES: Record<TimelineKind, { dot: string; badge: string }> = {
  education: { dot: "bg-primary", badge: "badge-primary" },
  work: { dot: "bg-secondary", badge: "badge-secondary" },
  project: { dot: "bg-accent", badge: "badge-accent" },
};

const SIDE_STYLES: Record<TimelineSide, { item: string; dot: string }> = {
  left: {
    item: "md:mr-auto md:pr-12 md:pl-0 md:text-right",
    dot: "md:left-auto md:right-0 md:translate-x-1/2",
  },
  right: {
    item: "md:ml-auto md:pl-12",
    dot: "md:left-0",
  },
};

export const TimelineItem = ({ entry, side }: TimelineItemProps) => {
  const { locale, t } = useLocale();
  const kind = KIND_STYLES[entry.kind];
  const sideStyles = SIDE_STYLES[side];
  const kindLabel = t(`timeline.kind.${entry.kind}`);

  return (
    <motion.li
      className={`relative pl-12 md:w-1/2 ${sideStyles.item}`}
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span
        aria-hidden="true"
        className={`absolute top-6 left-4 h-4 w-4 -translate-x-1/2 rounded-full ring-4 ring-base-100 ${kind.dot} ${sideStyles.dot}`}
      />
      <div className="card bg-base-200 border border-base-300 shadow-sm">
        <div className="card-body p-5 gap-1">
          <div
            className={`flex items-center gap-2 ${side === "left" ? "md:justify-end" : ""}`}
          >
            <span className="text-sm font-mono text-base-content/60">
              {entry.date}
            </span>
            <span className={`badge badge-sm badge-soft ${kind.badge}`}>
              {kindLabel}
            </span>
          </div>
          <h3 className="text-lg font-bold">
            {localized(entry.title, locale)}
          </h3>
          {entry.place && (
            <p className="text-sm font-medium text-primary">
              {localized(entry.place, locale)}
            </p>
          )}
          <p className="text-sm text-base-content/80 leading-relaxed whitespace-pre-line">
            {localized(entry.description, locale)}
          </p>
        </div>
      </div>
    </motion.li>
  );
};

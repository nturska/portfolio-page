"use client";

import { useRef } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { useLocale } from "@/lib/hooks/useLocale";
import { TimelineItem } from "./TimelineItem";
import { timelineEntries } from "./timelineData";

export const Timeline = () => {
  const { t } = useLocale();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MotionConfig reducedMotion="user">
      <section id="timeline" className="py-20 px-4 md:px-12 bg-base-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("timeline.title")}
            </h2>
            <p className="text-base-content/70">{t("timeline.subtitle")}</p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 bg-base-300 md:left-1/2"
            />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: lineScale }}
              className="absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 origin-top bg-linear-to-b from-primary via-secondary to-accent md:left-1/2"
            />

            <ol ref={listRef} className="relative space-y-10">
              {timelineEntries.map((entry, index) => (
                <TimelineItem
                  key={entry.id}
                  entry={entry}
                  side={index % 2 === 0 ? "left" : "right"}
                />
              ))}
            </ol>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

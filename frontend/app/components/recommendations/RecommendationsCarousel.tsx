"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useTypewriter } from "@/lib/hooks/useTypewriter";
import { RecommendationCard } from "./RecommendationCard";
import type { Recommendation } from "./types";

const HOLD_AFTER_TYPE_MS = 4500;

type RecommendationsCarouselProps = {
  items: Recommendation[];
};

type ActiveRecommendationProps = {
  recommendation: Recommendation;
  animate: boolean;
  reducedMotion: boolean;
  paused: boolean;
  onAdvance: () => void;
};

const ActiveRecommendation = ({
  recommendation,
  animate,
  reducedMotion,
  paused,
  onAdvance,
}: ActiveRecommendationProps) => {
  const { displayed, isComplete } = useTypewriter(recommendation.quote, {
    enabled: animate,
    fallback: reducedMotion ? "all" : "empty",
  });

  useEffect(() => {
    if (!isComplete || paused) return;

    const timeoutId = window.setTimeout(onAdvance, HOLD_AFTER_TYPE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [isComplete, onAdvance, paused]);

  return (
    <RecommendationCard
      recommendation={recommendation}
      displayedQuote={displayed}
      isTyping={animate && !isComplete}
    />
  );
};

export const RecommendationsCarousel = ({
  items,
}: RecommendationsCarouselProps) => {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const current = items[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + items.length) % items.length);
    },
    [items.length],
  );

  const advance = useCallback(() => {
    if (items.length < 2) return;
    goTo(index + 1);
  }, [goTo, index, items.length]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      {current && (
        <ActiveRecommendation
          key={current.id}
          recommendation={current}
          animate={isInView && !prefersReducedMotion}
          reducedMotion={Boolean(prefersReducedMotion)}
          paused={paused || !isInView}
          onAdvance={advance}
        />
      )}

      <div className="mt-6 flex justify-center gap-2" role="tablist">
        {items.map((item, itemIndex) => {
          const isActive = itemIndex === index;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Rekomendacja: ${item.name}`}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${
                isActive ? "w-8 bg-primary" : "w-2.5 bg-base-content/30"
              }`}
              onClick={() => goTo(itemIndex)}
            />
          );
        })}
      </div>
    </div>
  );
};

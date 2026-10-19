"use client";

import { useEffect, useState } from "react";

type UseTypewriterResult = {
  displayed: string;
  isComplete: boolean;
};

type UseTypewriterOptions = {
  enabled?: boolean;
  charMs?: number;
  fallback?: "empty" | "all";
};

export const useTypewriter = (
  text: string,
  { enabled = true, charMs = 28, fallback = "all" }: UseTypewriterOptions = {},
): UseTypewriterResult => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled || count >= text.length) return;

    const timeoutId = window.setTimeout(() => {
      setCount((current) => current + 1);
    }, charMs);

    return () => window.clearTimeout(timeoutId);
  }, [charMs, count, enabled, text.length]);

  if (!enabled) {
    const displayed = fallback === "all" ? text : "";
    return { displayed, isComplete: fallback === "all" };
  }

  return {
    displayed: text.slice(0, count),
    isComplete: count >= text.length,
  };
};

"use client";

import { useCallback, useState } from "react";

type UseTouchedFieldsResult = {
  touch: (key: string) => void;
  shouldShowError: (key: string) => boolean;
  markSubmitted: () => void;
  reset: () => void;
};

// Errors appear once a field is blurred or after the first submit attempt.
export const useTouchedFields = (): UseTouchedFieldsResult => {
  const [touched, setTouched] = useState<ReadonlySet<string>>(() => new Set());
  const [submitted, setSubmitted] = useState(false);

  const touch = useCallback((key: string) => {
    setTouched((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));
  }, []);

  const shouldShowError = useCallback(
    (key: string) => submitted || touched.has(key),
    [submitted, touched],
  );

  const markSubmitted = useCallback(() => setSubmitted(true), []);

  const reset = useCallback(() => {
    setTouched(new Set());
    setSubmitted(false);
  }, []);

  return { touch, shouldShowError, markSubmitted, reset };
};

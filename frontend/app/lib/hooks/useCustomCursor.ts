"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

export const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, select, textarea, label, summary, .btn, .swiper-slide";

const FINE_POINTER_QUERY = "(pointer: fine)";
const CUSTOM_CURSOR_CLASS = "has-custom-cursor";

type UseCustomCursorResult = {
  enabled: boolean;
  isHovering: boolean;
  isVisible: boolean;
  ref: RefObject<HTMLDivElement | null>;
};

const subscribeFinePointer = (onChange: () => void): (() => void) => {
  const mql = window.matchMedia(FINE_POINTER_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

const getFinePointer = (): boolean =>
  window.matchMedia(FINE_POINTER_QUERY).matches;

const getServerFinePointer = (): boolean => false;

const isInteractive = (target: EventTarget | null): boolean =>
  target instanceof Element && target.closest(INTERACTIVE_SELECTOR) !== null;

export const useCustomCursor = (): UseCustomCursorResult => {
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointer,
    getServerFinePointer,
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add(CUSTOM_CURSOR_CLASS);

    let frame: number | null = null;
    let x = 0;
    let y = 0;

    const render = () => {
      frame = null;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const handleMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      setIsVisible(true);
      if (frame === null) frame = window.requestAnimationFrame(render);
    };

    const handleOver = (event: PointerEvent) => {
      setIsHovering(isInteractive(event.target));
    };

    const handleLeave = () => setIsVisible(false);

    document.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      root.classList.remove(CUSTOM_CURSOR_CLASS);
      if (frame !== null) window.cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled]);

  return { enabled, isHovering, isVisible, ref };
};

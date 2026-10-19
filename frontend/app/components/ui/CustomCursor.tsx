"use client";

import { useCustomCursor } from "@/lib/hooks/useCustomCursor";

export const CustomCursor = () => {
  const { enabled, isHovering, isVisible, ref } = useCustomCursor();

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
    >
      <div
        className={`h-5 w-5 -translate-1/2 rounded-full border border-white transition-[scale,opacity,background-color] duration-200 ease-out motion-reduce:transition-none ${
          isHovering ? "scale-[2] bg-white/20" : "scale-100 bg-transparent"
        } ${isVisible ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

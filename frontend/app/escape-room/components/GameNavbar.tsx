"use client";

import { usePlayerHydrated, usePlayerStore } from "@/store/usePlayerStore";

export default function GameNavbar() {
  const hasHydrated = usePlayerHydrated();
  const playerName = usePlayerStore((state) => state.playerName);
  const hasStarted = usePlayerStore((state) => state.hasStarted);

  return (
    // Używamy Daisy UI navbar
    <div className="navbar bg-black text-success border-b border-success/30 font-mono">
      <div className="flex-1">
        <span className="text-xl font-bold tracking-widest pl-4">
          SYS_OVERRIDE_v1.0
        </span>
      </div>

      <div className="flex-none pr-4">
        {/* Renderujemy powitanie dopiero po zamontowaniu i wpisaniu imienia */}
        {hasHydrated && hasStarted ? (
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="opacity-70">STATUS:</span>
            <span className="text-white">AUTHORIZED</span>
            <span className="opacity-70">|</span>
            <span>USER: [{playerName}]</span>
          </div>
        ) : (
          <span className="text-error animate-pulse text-sm">
            WAITING_FOR_INPUT...
          </span>
        )}
      </div>
    </div>
  );
}

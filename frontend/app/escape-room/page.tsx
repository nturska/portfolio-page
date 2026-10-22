"use client";

import GameNavbar from "./components/GameNavbar";
import IntroModal from "./components/IntroModal";
import PuzzleOne from "./components/PuzzleOne";
import { usePlayerStore } from "@/store/usePlayerStore";
import PuzzleTwo from "./components/PuzzleTwo";

export default function EscapeRoomPage() {
  const level = usePlayerStore((state) => state.level);
  const hasStarted = usePlayerStore((state) => state.hasStarted);

  return (
    <div className="min-h-screen bg-radial-[at_2%_100%] from-gray-900 to-zinc-900 to-75% text-white font-mono">
      <GameNavbar />
      <IntroModal />
      {hasStarted && (
        <main className="p-4 md:p-8">
          {level === 1 && <PuzzleOne />}
          {level === 2 && <PuzzleTwo />}
          {level === 3 && (
            <div className="text-success text-center mt-20 animate-pulse">
              {">"} WYDOSTAŁEŚ SIĘ! GRATULACJE.
            </div>
          )}
        </main>
      )}

      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
    </div>
  );
}

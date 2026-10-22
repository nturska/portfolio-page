"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PlayerState = {
  level: number;
  playerName: string;
  hasStarted: boolean;
  setPlayer: (name: string) => void;
  advanceLevel: () => void;
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      level: 1,
      playerName: "",
      hasStarted: false,
      setPlayer: (name) => set({ playerName: name, hasStarted: true }),
      advanceLevel: () => set((state) => ({ level: state.level + 1 })),
    }),
    {
      name: "escape-room-storage",
    },
  ),
);

const subscribeHydration = (onStoreChange: () => void): (() => void) =>
  usePlayerStore.persist.onFinishHydration(onStoreChange);

const getHydrationSnapshot = (): boolean =>
  usePlayerStore.persist.hasHydrated();

const getServerHydrationSnapshot = (): boolean => false;

export const usePlayerHydrated = (): boolean =>
  useSyncExternalStore(
    subscribeHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot,
  );

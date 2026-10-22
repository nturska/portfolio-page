"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/store/usePlayerStore";

export default function PuzzleOne() {
  const [answer, setAnswer] = useState("");
  const [isError, setIsError] = useState(false);

  const advanceLevel = usePlayerStore((state) => state.advanceLevel);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedAnswer = answer.toLowerCase().trim();

    if (normalizedAnswer === "javascript" || normalizedAnswer === "js") {
      setIsError(false);
      advanceLevel();
    } else {
      setIsError(true);
      setAnswer("");
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-20 p-6 bg-black border border-success rounded-lg shadow-lg font-mono"
    >
      <div className="flex items-center justify-between border-b border-success/30 pb-2 mb-4">
        <span className="text-success text-sm">root@system: ~/level_01</span>
        <span className="text-error text-xs animate-pulse">LOCKED</span>
      </div>

      <div className="text-success/80 mb-6 space-y-2">
        <p>{">"} SAFETY PROTOCOL INITIALIZATION...</p>
        <p>{">"} LOCKED DOOR DETECTED.</p>
        <br />
        <p className="text-white">SECURITY PUZZLE:</p>
        <p className="text-warning">
          &quot;Some could assume that I am the language of an Indonesian
          Island, but you know that without me, the internet would be a boring,
          static poster. Who am I?&quot;
        </p>
      </div>
      <motion.form
        onSubmit={handleSubmit}
        animate={
          isError
            ? {
                x: [-10, 10, -10, 10, 0],
                transition: { duration: 0.4, repeat: 2 },
              }
            : {}
        }
      >
        <div className="flex flex-col gap-2">
          <label className="text-xs text-success/50">ENTER_KEY:</label>
          <div className="flex items-center gap-2">
            <span className="text-success">{">"}</span>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`flex-1 bg-black border-b outline-none caret-success p-1 transition-colors ${
                isError
                  ? "border-error text-error"
                  : "border-success text-success"
              }`}
              placeholder="enter the answer..."
              autoFocus
            />
          </div>

          {isError && (
            <span className="text-error text-xs mt-1">
              [!] ERROR: ACCESS DENIED. TRY AGAIN.
            </span>
          )}
        </div>

        <button type="submit" className="hidden">
          SEND (Enter)
        </button>
      </motion.form>
    </motion.div>
  );
}

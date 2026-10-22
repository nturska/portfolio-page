"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { usePlayerHydrated, usePlayerStore } from "@/store/usePlayerStore";

export default function IntroModal() {
  const [name, setName] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const hasHydrated = usePlayerHydrated();
  const hasStarted = usePlayerStore((state) => state.hasStarted);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  if (!hasHydrated || hasStarted) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() !== "") {
      setPlayer(name);
    }
  };

  const text = "What is your name?";
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" },
  };

  return (
    <div className="fixed inset-0 bg-radial-[at_10%_100%] from-green-950 to-zinc-900 to-75% z-50 flex items-center justify-center font-mono">
      <div className="max-w-md w-full p-8">
        <motion.h2
          className="text-success text-2xl mb-6 flex"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setIsTypingDone(true)}
        >
          {letters.map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          {!isTypingDone && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="inline-block w-3 h-6 bg-success ml-1"
            />
          )}
        </motion.h2>
        {isTypingDone && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "linear" }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center text-success text-xl">
              <span className="mr-4">{">"}</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-none outline-none text-success caret-success w-full"
                placeholder="__"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline text-l btn-success rounded-none mt-4 hover:bg-success hover:text-black"
            >
              [ INITIALIZE SESSION ]
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export const useKonamiCode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't track if terminal is already open
      if (isOpen) return;

      const key = event.key;
      const newSequence = [...inputSequence, key].slice(-KONAMI_CODE.length);
      setInputSequence(newSequence);

      // Check if the sequence matches the Konami Code
      if (newSequence.length === KONAMI_CODE.length) {
        const isMatch = newSequence.every(
          (k, i) => k.toLowerCase() === KONAMI_CODE[i].toLowerCase()
        );
        if (isMatch) {
          setIsOpen(true);
          setInputSequence([]);
        }
      }
    },
    [inputSequence, isOpen]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setInputSequence([]);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { isOpen, close };
};

export default useKonamiCode;

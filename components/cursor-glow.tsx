'use client';

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return null;
}

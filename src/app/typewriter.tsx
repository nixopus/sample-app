"use client";

import { useState, useEffect } from "react";

export function Typewriter({
  text,
  speed = 80,
  delay = 0,
  className,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  if (!started) {
    return (
      <span className={className}>
        <span className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle animate-blink" />
      </span>
    );
  }

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-[3px] h-[1em] bg-white ml-1 align-middle ${
          done ? "animate-blink" : ""
        }`}
      />
    </span>
  );
}

export function FadeIn({
  children,
  delay = 0,
  duration = 600,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.95)",
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}

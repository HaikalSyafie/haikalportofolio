"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const roles = ["Data Scientist", "Data Analyst", "Machine Learning Engineer"];

const TYPE_SPEED = 65;
const DELETE_SPEED = 35;
const HOLD_MS = 1800;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function TypingRole() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const current = roles[roleIndex];

    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      const next = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 0);
      return () => clearTimeout(next);
    }

    const timeout = setTimeout(
      () => {
        setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
      },
      deleting ? DELETE_SPEED : TYPE_SPEED
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, reducedMotion]);

  const displayText = reducedMotion ? roles[0] : text;

  return (
    <span aria-label={roles[roleIndex]}>
      {displayText}
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
}

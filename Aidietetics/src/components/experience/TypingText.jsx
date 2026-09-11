import React, { useState, useEffect } from "react";

export default function TypingText({
  text,
  speed = 28,
  startDelay = 0,
  onComplete,
  className,
  showCursor = true,
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let interval;
    const startTimer = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setDone(true);
          onComplete?.();
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && !done && <span className="animate-pulse text-slate-400">|</span>}
    </span>
  );
}

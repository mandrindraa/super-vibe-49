import { useEffect, useState } from "react";

export function AnimatedSubtitle({ className }: { className?: string }) {
  const colored = ["Cultiver Demain    ", "Honorer le passé   "];
  const messages = [" en Préservant Hier", ", cultiver le futur"];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show current message for 4 seconds, then fade out
    const showTimeout = setTimeout(() => {
      setVisible(false);
    }, 4000);

    // After fade out (300ms), switch message and fade in
    const switchTimeout = setTimeout(() => {
      setIndex((i) => (i + 1) % messages.length);
      setVisible(true);
    }, 4300); // 4000 + 300ms fade

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(switchTimeout);
    };
  }, [index]);

  return (
    <span
      className={`${
        className ?? ""
      } inline-block transform-gpu transition-opacity duration-300 ease-in-out`}
      aria-live="polite"
      style={{
        opacity: visible ? 1 : 0,
        minHeight: "1.5em",
      }}
    >
      <span className="gradient-foreground block">
        {colored[index]}
        {messages[index]}
      </span>
    </span>
  );
}

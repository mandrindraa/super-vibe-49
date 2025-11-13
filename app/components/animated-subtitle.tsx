import { useEffect, useState } from "react";

export function AnimatedSubtitle({ className }: { className?: string }) {
  const messages = [
    "Cultiver Demain en Préservant Hier",
    "Semer l’avenir sans oublier nos racines",
  ];
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentMessage = messages[index];
    let charIndex = 0;

    if (isTyping) {
      // Type one letter at a time
      const typingInterval = setInterval(() => {
        if (charIndex < currentMessage.length) {
          setDisplayedText(currentMessage.slice(0, charIndex + 1));
          charIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 60); // Adjust speed: lower = faster, higher = slower

      return () => clearInterval(typingInterval);
    } else {
      // Wait before moving to next message
      const delayTimeout = setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length);
        setIsTyping(true);
        setDisplayedText("");
      }, 2000); // Pause duration before switching to next message

      return () => clearTimeout(delayTimeout);
    }
  }, [index, isTyping]);

  return (
    <span
      className={`${className ?? ""} inline-block transform-gpu`}
      aria-live="polite"
      style={{
        minHeight: "1.5em",
      }}
    >
      {displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
}

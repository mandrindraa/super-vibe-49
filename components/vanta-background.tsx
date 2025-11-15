"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function VantaBackground() {
  const [isDark, setIsDark] = useState(false);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const isDarkMode =
      theme === "dark" || (theme === "system" && systemTheme === "dark");
    setIsDark(isDarkMode);
  }, [theme, systemTheme]);
  // linear-gradient(0deg, transparent 24%, rgba(79, 39, 15, 0.05) 25%, rgba(79, 39, 15, 0.05) 26%, transparent 27%, transparent 74%, rgba(79, 39, 15, 0.05) 75%, rgba(79, 39, 15, 0.05) 76%, transparent 77%, transparent),
  // linear-gradient(90deg, transparent 24%, rgba(79, 39, 15, 0.05) 25%, rgba(79, 39, 15, 0.05) 26%, transparent 27%, transparent 74%, rgba(79, 39, 15, 0.05) 75%, rgba(79, 39, 15, 0.05) 76%, transparent 77%, transparent)
  /* absolute inset-0 bg-gradient-to-br from-background via-background to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 */
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="abslute inset_0 bg-muted/300 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/5 dark:via-background dark:to-accent/5" />

      {/* Animated gradient orbs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "6s", animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "8s", animationDelay: "4s" }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-80 dark:opacity-300"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(121, 86, 64, 0.05) 25%, rgba(79, 39, 15, 0.05) 26%, transparent 27%, transparent 74%, rgba(79, 39, 15, 0.05) 75%, rgba(79, 39, 15, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(121, 86, 64, 0.05) 25%, rgba(175, 161, 153, 0.05) 26%, transparent 27%, transparent 74%, rgba(79, 39, 15, 0.05) 75%, rgba(79, 39, 15, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}

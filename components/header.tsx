"use client";

import ThemeToggle from "@/components/theme-toggle";
import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass dark:bg-white/8 dark:border-white/15 shadow-sm transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
          <Leaf className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-2xl font-bold text-primary">
            L'Arche des Savoirs
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {Object.entries({
            exploration: "Explorer",
            contribuer: "Contribuer",
          }).map((item) => (
            <a
              key={item[1]}
              href={`#${item[0].toLowerCase()}`}
              className="text-foreground dark:text-white hover:text-accent transition-colors duration-300 relative group"
            >
              {item[1]}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

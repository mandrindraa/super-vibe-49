"use client";

import { Leaf } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import UserMenu from "./user-menu";

/* className="sticky top-0 z-50 glass dark:bg-white/8 dark:border-white/15 shadow-sm transition-all duration-500" */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/5 dark:via-background dark:to-accent/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
          <Leaf className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-2xl font-bold text-primary">
            L'Arche des Savoirs
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <UserMenu />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

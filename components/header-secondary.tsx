import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const SecondaryHeader = ({ text }: { text: string }) => (
  <header className="sticky top-0 z-50 glass shadow-sm">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
      >
        <ArrowLeft className="w-5 h-5 text-primary" />
        {/* <Leaf className="w-6 h-6 text-primary" /> */}
        <span className="text-primary">Retour</span>
      </Link>
      <h1 className="text-2xl font-bold text-primary">{text}</h1>
      <div className="w-12" /> {/* Spacer for alignment */}
    </div>
  </header>
);

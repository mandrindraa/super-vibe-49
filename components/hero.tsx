"use client";

import { AnimatedSubtitle } from "@/components/animated-subtitle";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero({ isLoaded }: { isLoaded: boolean }) {
  return (
    <section
      className={`py-16 md:py-32 min-h-screen flex items-center ${
        isLoaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl parallax-slow"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl parallax-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-72 h-72 bg-secondary/5 dark:bg-secondary/15 rounded-full blur-3xl parallax-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            className={`space-y-6 ${isLoaded ? "slide-in-left" : "opacity-0"}`}
          >
            <div className="space-y-4">
              <h2
                className="text-5xl md:text-7xl font-bold leading-tight fade-scale-in"
                style={{ animationDelay: "0.3s" }}
              >
                <AnimatedSubtitle className="text-foreground block mt-2" />
              </h2>
              <p
                className="text-lg md:text-xl text-foreground leading-relaxed max-w-xl fade-scale-in dark:border-white/20 p-4 rounded-md"
                style={{ animationDelay: "0.4s" }}
              >
                Découvrez les savoirs oubliés de nos ancêtres et participez à la
                transmission des traditions pour les générations futures. Une
                plateforme où le passé rencontre l'innovation.
              </p>
            </div>
          </div>

          <div
            className={`relative h-96 md:h-full md:min-h-96 flex items-center justify-center ${
              isLoaded ? "slide-in-right" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 shimmer dark:opacity-70 rounded-2xl pointer-events-none">
              <div className="relative w-[500px] h-[400px] pointer-events-auto perspective">
                {/* First image: slightly rotated left and offset up-left */}
                <div
                  className="absolute rounded-2xl overflow-hidden glass hero-image parallax-on-scroll shadow-2xl"
                  data-depth="0.12"
                  style={{
                    mixBlendMode: "multiply",
                    opacity: 0.98,
                    width: "380px",
                    height: "320px",
                    left: "-20px",
                    top: "-30px",
                    transform:
                      "perspective(1200px) rotateY(-8deg) rotateX(4deg) translateZ(0px)",
                  }}
                >
                  <img
                    src="/ancient-farming-techniques-wheat-field.jpg?height=360&width=420"
                    alt="Techniques de semis ancestrales"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>

                {/* Second image: slightly rotated right and offset down-right */}
                <div
                  className="absolute rounded-2xl overflow-hidden glass hero-image parallax-on-scroll shadow-2xl"
                  data-depth="0.28"
                  style={{
                    mixBlendMode: "screen",
                    opacity: 0.95,
                    width: "380px",
                    height: "320px",
                    right: "-20px",
                    bottom: "-30px",
                    transform:
                      "perspective(1200px) rotateY(8deg) rotateX(-4deg) translateZ(20px)",
                  }}
                >
                  <img
                    src="/herbal-medicine-plants-garden.jpg?height=360&width=420"
                    alt="Médecine des plantes"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              </div>
            </div>
            <div className="relative w-[500px] h-[400px] pointer-events-auto perspective"></div>
            <div
              className="absolute top-1/3 left-0 w-48 h-48 glass dark:bg-white/5 rounded-full opacity-60 blur-2xl parallax-slow hover:opacity-80 transition-opacity duration-300"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <div
            className={isLoaded ? "animate-fade-in" : "opacity-0"}
            style={{ animationDelay: "0.5s" }}
          >
            <Link href="#exploration">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Compass className="w-5 h-5 transition-transform group-hover:rotate-90 duration-500" />
                  Commencer l'exploration
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 duration-300" />
                </span>

                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

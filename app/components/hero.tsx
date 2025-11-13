"use client";

import { AnimatedSubtitle } from "./animated-subtitle";
import { VantaBackground } from "./vanta-background";

export default function Hero({ isLoaded }: { isLoaded: boolean }) {
  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/5 dark:via-background dark:to-accent/5 py-16 md:py-32 min-h-screen flex items-center ${
        isLoaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <VantaBackground />
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
                {/* <span className="gradient-text block">Cultiver Demain</span> */}
                <AnimatedSubtitle className="text-foreground block mt-2" />
              </h2>
              {/* <p
                className="glass text-lg md:text-xl text-foreground leading-relaxed max-w-xl fade-scale-in border border-white/10 dark:border-white/20 p-4 rounded-md"
                style={{ animationDelay: "0.4s" }}
              >
                Découvrez les savoirs oubliés de nos ancêtres et participez à la
                transmission des traditions pour les générations futures. Une
                plateforme où le passé rencontre l'innovation.
              </p> */}
            </div>

            {/* Buttons moved out of the sliding container so they don't move during the heading/intro animation */}
          </div>

          <div
            className={`relative h-96 md:h-full md:min-h-96 flex items-center justify-center ${
              isLoaded ? "slide-in-right" : "opacity-0"
            }`}
          >
            {/* Hero images with perspective and slight rotation for depth */}
            <div className="relative w-[500px] h-[400px] pointer-events-auto perspective">
              {/* First image: slightly rotated left and offset up-left
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
              </div> */}

              {/* Second image: slightly rotated right and offset down-right */}
              {/* <div
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
              </div> */}
            </div>

            <div
              className="absolute top-1/3 left-0 w-48 h-48 glass dark:bg-white/5 rounded-full opacity-60 blur-2xl parallax-slow hover:opacity-80 transition-opacity duration-300"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="absolute inset-0 shimmer opacity-30 rounded-2xl pointer-events-none"></div>
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <div
            className={isLoaded ? "animate-fade-in" : "opacity-0"}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* <button
                type="button"
                aria-label="Explorer"
                className="btn-animated flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                <span className="font-semibold">Explorer</span>
                <svg
                  className="btn-icon w-6 h-6 text-white transition-transform duration-300"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    fill="currentColor"
                  />
                </svg>
              </button> */}
              <a
                href="#exploration"
                className="cursor-pointer flex justify-between bg-gray-800 px-3 py-2 rounded-full text-white tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-mono w-[150px]"
              >
                Explorer!
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

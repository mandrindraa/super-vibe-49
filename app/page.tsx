"use client"

import Link from "next/link"
import { Search, Leaf, Plus, Sprout, ArrowRight, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface Savoir {
  id: string
  title: string
  category: string
  era: string
  image: string
  excerpt: string
  contributor: string
}

const recentSavoirs: Savoir[] = [
  {
    id: "1",
    title: "Techniques de Semis Ancestrales",
    category: "Agriculture",
    era: "XVIIIe siècle",
    image: "/ancient-farming-techniques-wheat-field.jpg",
    excerpt: "Les méthodes traditionnelles de semis utilisées par nos ancêtres pour optimiser les récoltes.",
    contributor: "Marie Dubois",
  },
  {
    id: "2",
    title: "Fabrication du Fromage Fermier",
    category: "Alimentation",
    era: "XIXe siècle",
    image: "/traditional-cheese-making-dairy.jpg",
    excerpt: "Savoir-faire transmis générations après générations pour créer les fromages de terroir.",
    contributor: "Jean Leclerc",
  },
  {
    id: "3",
    title: "Médecine des Plantes",
    category: "Santé",
    era: "Temps anciens",
    image: "/herbal-medicine-plants-garden.jpg",
    excerpt: "Remèdes naturels et potions préparées à partir des plantes du jardin.",
    contributor: "Sophie Martin",
  },
  {
    id: "4",
    title: "Charpente Traditionnelle",
    category: "Construction",
    era: "Moyen Âge",
    image: "/traditional-wooden-carpentry-roof.jpg",
    excerpt: "Techniques ancestrales de charpente sans clous, assemblages secrets.",
    contributor: "Pierre Bernard",
  },
  {
    id: "5",
    title: "Teinture Naturelle des Textiles",
    category: "Artisanat",
    era: "Renaissance",
    image: "/traditional-fabric-dyeing-natural-colors.jpg",
    excerpt: "Colorants extraits de plantes pour créer des teintes durables et authentiques.",
    contributor: "Isabelle Rousseau",
  },
  {
    id: "6",
    title: "Calendrier Lunaire Agricole",
    category: "Agriculture",
    era: "Antiquité",
    image: "/moon-calendar-agriculture-seasons.jpg",
    excerpt: "Cycles lunaires guidant les moments propices pour cultiver et récolter.",
    contributor: "Thomas Aubert",
  },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [showIntroAnimation, setShowIntroAnimation] = useState(true) // add intro animation state

  useEffect(() => {
    setIsLoaded(true)
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }

    const timer = setTimeout(() => {
      setShowIntroAnimation(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {showIntroAnimation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background dark:bg-slate-950 overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Growing seed animation */}
            <div className="absolute">
              <div className="animate-intro-seed text-6xl">🌱</div>
            </div>
            {/* Parchment scroll appearing */}
            <div className="absolute animate-intro-scroll text-4xl opacity-0">📜</div>
            {/* Fade out text */}
            <div className="text-center space-y-4 animate-intro-text-fade">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">Cultiver Demain</h2>
              <p className="text-lg text-foreground/70">Préservons la mémoire pour cultiver demain.</p>
            </div>
          </div>
        </div>
      )}

      <header
        className={`sticky top-0 z-50 glass dark:bg-white/5 dark:border-white/10 shadow-sm transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Leaf className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold text-primary">L'Arche des Savoirs</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#exploration"
              className="text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              Explorer
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#contribution"
              className="text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              Contribuer
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#apropos"
              className="text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              À propos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-muted dark:hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
            </button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-primary/5 dark:via-background dark:to-accent/5 py-16 md:py-32 min-h-screen flex items-center">
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
            <div className={`space-y-6 ${isLoaded ? "slide-in-left" : "opacity-0"}`}>
              <div
                className="glass dark:bg-white/8 dark:border-white/15 rounded-2xl p-6 md:p-8 w-fit hover:shadow-xl hover:bg-white/50 dark:hover:bg-white/12 transition-all duration-300"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-accent animate-bounce" style={{ animationDuration: "2s" }} />
                  <span className="text-sm font-semibold text-primary">Hackathon Cultiver Demain</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2
                  className="text-5xl md:text-7xl font-bold leading-tight fade-scale-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <span className="gradient-text block">Cultiver Demain</span>
                  <span className="text-foreground block mt-2">en Préservant Hier</span>
                </h2>
                <p
                  className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl fade-scale-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  Découvrez les savoirs oubliés de nos ancêtres et participez à la transmission des traditions pour les
                  générations futures. Une plateforme où le passé rencontre l'innovation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 fade-scale-in" style={{ animationDelay: "0.5s" }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  Commencer l'exploration
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  className="glass dark:bg-white/5 dark:border-white/15 text-foreground hover:bg-white/40 dark:hover:bg-white/10 border-primary/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Ajouter un Savoir
                </Button>
              </div>
            </div>

            <div className={`relative h-96 md:h-full md:min-h-96 ${isLoaded ? "slide-in-right" : "opacity-0"}`}>
              <div
                className="absolute top-0 right-0 w-72 h-80 glass dark:bg-white/8 dark:border-white/15 rounded-2xl overflow-hidden hero-floating shadow-2xl glow-pulse hover:shadow-2xl hover:glow-pulse-active transition-all duration-300 group cursor-pointer"
                style={{ animationDelay: "0.3s" }}
              >
                <img
                  src="/ancient-farming-techniques-wheat-field.jpg?height=320&width=288"
                  alt="Techniques de semis ancestrales"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white/90 text-sm font-medium">Techniques Ancestrales</p>
                </div>
              </div>

              <div
                className="absolute bottom-8 left-8 w-56 h-64 glass dark:bg-white/8 dark:border-white/15 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer hero-floating glow-pulse"
                style={{ animationDelay: "0.5s" }}
              >
                <img
                  src="/herbal-medicine-plants-garden.jpg?height=256&width=224"
                  alt="Médecine des plantes"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white/90 text-sm font-medium">Savoirs Naturels</p>
                </div>
              </div>

              <div
                className="absolute top-1/3 left-0 w-48 h-48 glass dark:bg-white/5 rounded-full opacity-60 blur-2xl parallax-slow hover:opacity-80 transition-opacity duration-300"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="absolute inset-0 shimmer opacity-30 rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="exploration"
        className="py-16 md:py-24 px-4 md:px-6 bg-background dark:bg-gradient-to-b dark:from-slate-950 dark:to-slate-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 fade-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Zone d'Exploration</h2>
            <p className="text-foreground/70">Parcourez notre collection de savoirs ancestraux</p>
          </div>

          <div className="mb-10 relative fade-scale-in" style={{ animationDelay: "0.1s" }}>
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un savoir... (agriculture, santé, artisanat...)"
              className="pl-12 h-12 glass dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-white/50 focus:border-primary text-foreground placeholder:text-muted-foreground hover:border-primary/50 transition-colors duration-300 focus:ring-primary/20"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentSavoirs.map((savoir, idx) => (
              <Link key={savoir.id} href={`/detail/${savoir.id}`}>
                <Card
                  className={`h-full cursor-pointer hover:shadow-2xl dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden hover:border-primary/50 dark:border-white/10 hover:-translate-y-2 stagger-item glass dark:bg-white/8 dark:border-white/10 ${isLoaded ? "" : "opacity-0"}`}
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <div className="aspect-video bg-muted dark:bg-white/5 overflow-hidden relative">
                    <img
                      src={savoir.image || "/placeholder.svg"}
                      alt={savoir.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-block bg-accent/20 dark:bg-accent/30 text-accent px-3 py-1 rounded-full text-sm font-medium hover:bg-accent/30 dark:hover:bg-accent/40 transition-colors">
                        {savoir.category}
                      </span>
                      <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                        {savoir.era}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-lg line-clamp-2">{savoir.title}</h3>
                    <p className="text-foreground/70 text-sm line-clamp-2">{savoir.excerpt}</p>
                    <div className="text-xs text-muted-foreground pt-2">Par {savoir.contributor}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div
            className="glass dark:bg-white/8 dark:border-white/10 rounded-lg p-8 md:p-12 text-center fade-scale-in hover:border-primary/40 dark:hover:border-white/20 hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="relative inline-block mb-4">
              <Leaf className="w-12 h-12 text-primary animate-bounce" style={{ animationDuration: "2s" }} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">Arbre des Savoirs Interactif</h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Explorez une représentation visuelle de tous les savoirs connectés entre eux. Découvrez les liens
              historiques et thématiques qui les unissent.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              Accéder à l'Arbre des Savoirs
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <section
        id="contribution"
        className="py-16 md:py-24 px-4 md:px-6 bg-muted/30 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center fade-scale-in">
            Zone de Contribution
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div
              className={`glass dark:bg-white/8 dark:border-white/15 rounded-lg p-8 md:p-10 shadow-sm hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-300 ${isLoaded ? "slide-in-left" : "opacity-0"}`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Partagez Vos Savoirs</h3>
              <p className="text-foreground/70 mb-8">
                Avez-vous des connaissances, techniques ou traditions à transmettre ? Contribuez à L'Arche des Savoirs
                en partageant vos découvertes.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { num: "1", title: "Remplissez le formulaire", desc: "Décrivez votre savoir en détail" },
                  { num: "2", title: "Ajoutez une image", desc: "Illustrez votre contribution" },
                  { num: "3", title: "Validez et Publiez", desc: "Votre savoir rejoint la communauté" },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-3 stagger-item" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 dark:bg-accent/30 flex items-center justify-center hover:bg-accent/40 dark:hover:bg-accent/50 transition-colors">
                      <span className="text-accent font-bold">{step.num}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{step.title}</p>
                      <p className="text-sm text-foreground/70">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Ajouter un Savoir Oublié
              </Button>
            </div>

            <div className={`relative h-80 md:h-96 ${isLoaded ? "slide-in-right" : "opacity-0"}`}>
              <div className="absolute inset-0 glass dark:bg-white/8 dark:border-white/15 rounded-2xl overflow-hidden flex items-center justify-center shadow-xl glow-pulse hover:shadow-2xl hover:glow-pulse-active transition-all duration-300 group">
                <img
                  src="/traditional-fabric-dyeing-natural-colors.jpg?height=384&width=448"
                  alt="Teinture naturelle"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 dark:from-primary/70 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-950 text-primary-foreground py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div className="stagger-item">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6" />
              <span className="font-bold text-lg">L'Arche des Savoirs</span>
            </div>
            <p className="text-primary-foreground/80 dark:text-white/70 text-sm">Cultiver demain en préservant hier.</p>
          </div>
          <div className="stagger-item" style={{ animationDelay: "0.1s" }}>
            <h4 className="font-semibold mb-4">Explorer</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline hover:text-accent transition-colors">
                  Tous les savoirs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-accent transition-colors">
                  Par catégorie
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-accent transition-colors">
                  Par époque
                </a>
              </li>
            </ul>
          </div>
          <div className="stagger-item" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-semibold mb-4">Contribuer</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline hover:text-accent transition-colors">
                  Ajouter un savoir
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-accent transition-colors">
                  Guide de contribution
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-accent transition-colors">
                  Modération
                </a>
              </li>
            </ul>
          </div>
          <div className="stagger-item" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline hover:text-accent transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:text-accent transition-colors">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 dark:border-white/10 pt-8 text-center text-sm">
          <p>© 2025 L'Arche des Savoirs. Hackathon "Cultiver Demain"</p>
        </div>
      </footer>
    </div>
  )
}

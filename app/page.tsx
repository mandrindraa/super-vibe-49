"use client";

import { Footer } from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VantaBackground } from "@/components/vanta-background";
import { ArrowRight, Leaf, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Savoir {
  id: string;
  title: string;
  category: string;
  era: string;
  image: string;
  excerpt: string;
  contributor: string;
}

const recentSavoirs: Savoir[] = [
  {
    id: "1",
    title: "Techniques de Semis Ancestrales",
    category: "Agriculture",
    era: "XVIIIe siècle",
    image: "/ancient-farming-techniques-wheat-field.jpg",
    excerpt:
      "Les méthodes traditionnelles de semis utilisées par nos ancêtres pour optimiser les récoltes.",
    contributor: "Marie Dubois",
  },
  {
    id: "2",
    title: "Fabrication du Fromage Fermier",
    category: "Alimentation",
    era: "XIXe siècle",
    image: "/traditional-cheese-making-dairy.jpg",
    excerpt:
      "Savoir-faire transmis générations après générations pour créer les fromages de terroir.",
    contributor: "Jean Leclerc",
  },
  {
    id: "3",
    title: "Médecine des Plantes",
    category: "Santé",
    era: "Temps anciens",
    image: "/herbal-medicine-plants-garden.jpg",
    excerpt:
      "Remèdes naturels et potions préparées à partir des plantes du jardin.",
    contributor: "Sophie Martin",
  },
  {
    id: "4",
    title: "Charpente Traditionnelle",
    category: "Construction",
    era: "Moyen Âge",
    image: "/traditional-wooden-carpentry-roof.jpg",
    excerpt:
      "Techniques ancestrales de charpente sans clous, assemblages secrets.",
    contributor: "Pierre Bernard",
  },
  {
    id: "5",
    title: "Teinture Naturelle des Textiles",
    category: "Artisanat",
    era: "Renaissance",
    image: "/traditional-fabric-dyeing-natural-colors.jpg",
    excerpt:
      "Colorants extraits de plantes pour créer des teintes durables et authentiques.",
    contributor: "Isabelle Rousseau",
  },
  {
    id: "6",
    title: "Calendrier Lunaire Agricole",
    category: "Agriculture",
    era: "Antiquité",
    image: "/moon-calendar-agriculture-seasons.jpg",
    excerpt:
      "Cycles lunaires guidant les moments propices pour cultiver et récolter.",
    contributor: "Thomas Aubert",
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Global background for entire page */}
      <div className="fixed inset-0 -z-20">
        <VantaBackground />
      </div>

      <Header />
      <Hero isLoaded={isLoaded} />

      {/* Exploration Section */}
      <section
        id="exploration"
        className="relative py-16 md:py-24 px-4 md:px-6 "
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 fade-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Zone d'Exploration
            </h2>
            <p className="text-foreground">
              Parcourez notre collection de savoirs ancestraux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentSavoirs.map((savoir, idx) => (
              <Link key={savoir.id} href={`/detail/${savoir.id}`}>
                <Card
                  // className={`h-full cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-primary/50 hover:-translate-y-2 stagger-item glass text-foreground border-primary/20 ${
                  className={`h-full cursor-pointer hover:shadow-2xl dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden hover:border-primary/50 dark:border-white/10 hover:-translate-y-2 stagger-item glass dark:bg-white/8 dark:border-white/10 text-foreground dark:text-white ${
                    isLoaded ? "" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    <img
                      src={savoir.image || "/placeholder.svg"}
                      alt={savoir.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium hover:bg-accent/30 transition-colors">
                        {savoir.category}
                      </span>
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm hover:bg-primary/20 transition-colors">
                        {savoir.era}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-lg line-clamp-2">
                      {savoir.title}
                    </h3>
                    <p className="text-foreground text-sm line-clamp-2">
                      {savoir.excerpt}
                    </p>
                    <div className="text-xs text-foreground/70 pt-2">
                      Par {savoir.contributor}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div
            className={`glass rounded-lg p-8 md:p-12 text-center fade-scale-in hover:border-primary/40 hover:shadow-lg transition-all duration-300 text-foreground border-primary/20 ${
              isLoaded ? "" : "opacity-0"
            }`}
            style={{ animationDelay: "0.8s" }}
          >
            <div className="relative inline-block mb-4">
              <Leaf
                className="w-12 h-12 text-primary animate-bounce"
                style={{ animationDuration: "2s" }}
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              Arbre des Savoirs Interactif
            </h3>
            <p className="text-foreground mb-6 max-w-2xl mx-auto">
              Explorez une représentation visuelle de tous les savoirs connectés
              entre eux. Découvrez les liens historiques et thématiques qui les
              unissent.
            </p>
            <Link href="/explore">
              <Button className="glass cursor-pointer dark:text-white border-2 border-primary bg-background/50 backdrop-blur-sm text-primary hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                Accéder à l'Arbre des Savoirs
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contribution Section */}
      <section
        id="contribution"
        className="relative py-16 md:py-24 px-4 md:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center fade-scale-in">
            Zone de Contribution
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div
              className={`glass rounded-lg p-8 md:p-10 shadow-sm hover:shadow-lg transition-all duration-300 text-foreground border-primary/20 ${
                isLoaded ? "slide-in-left" : "opacity-0"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Partagez Vos Savoirs
              </h3>
              <p className="text-foreground mb-8">
                Avez-vous des connaissances, techniques ou traditions à
                transmettre ? Contribuez à L'Arche des Savoirs en partageant vos
                découvertes.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    num: "1",
                    title: "Remplissez le formulaire",
                    desc: "Décrivez votre savoir en détail",
                  },
                  {
                    num: "2",
                    title: "Ajoutez une image",
                    desc: "Illustrez votre contribution",
                  },
                  {
                    num: "3",
                    title: "Validez et Publiez",
                    desc: "Votre savoir rejoint la communauté",
                  },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 stagger-item"
                    style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent/40 transition-colors">
                      <span className="text-accent font-bold">{step.num}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {step.title}
                      </p>
                      <p className="text-sm text-foreground/70">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/add-savoir">
                <Button
                  size="lg"
                  className="w-full cursor-pointer bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Ajouter un Savoir Oublié
                </Button>
              </Link>
            </div>

            <div
              className={`relative h-80 md:h-96 ${
                isLoaded ? "slide-in-right" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 glass rounded-2xl overflow-hidden flex items-center justify-center shadow-xl glow-pulse hover:shadow-2xl hover:glow-pulse-active transition-all duration-300 group border-primary/20">
                <img
                  src="/traditional-fabric-dyeing-natural-colors.jpg?height=384&width=448"
                  alt="Teinture naturelle"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { ChevronLeft, Leaf, User, Clock, Tag, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PageProps {
  params: Promise<{ id: string }>
}

// Mock data for detail page
const savoirDetails: Record<string, any> = {
  "1": {
    id: "1",
    title: "Techniques de Semis Ancestrales",
    image: "/ancient-farming-techniques-detailed.jpg",
    category: "Agriculture",
    era: "XVIIIe siècle",
    date: "15 novembre 2024",
    contributor: {
      name: "Marie Dubois",
      role: "Historienne et Agricultrice",
      avatar: "/professional-woman-portrait.png",
    },
    tags: ["Agriculture", "Semis", "Techniques", "Durabilité", "Tradition"],
    excerpt:
      "Les méthodes traditionnelles de semis utilisées par nos ancêtres pour optimiser les récoltes sans produits chimiques.",
    content: `
      <h2>La Sagesse Ancestrale du Semis</h2>
      <p>Pendant des millénaires, les agriculteurs ont perfectionné l'art du semis en observant la nature. Ces techniques, transmises de génération en génération, reposaient sur une compréhension profonde des cycles lunaires et des conditions climatiques.</p>
      
      <h3>Les Principes Fondamentaux</h3>
      <p>Le semis traditionnel respectait plusieurs principes clés :</p>
      <ul>
        <li><strong>Respect du calendrier lunaire :</strong> Les semis se faisaient à la lune montante pour les cultures aériennes.</li>
        <li><strong>Préparation du sol :</strong> Le terrain était enrichi avec des composts naturels et du fumier bien décomposé.</li>
        <li><strong>Rotation des cultures :</strong> Les parcelles alternaient les plantations pour préserver la fertilité du sol.</li>
        <li><strong>Sélection des graines :</strong> Les meilleures graines étaient conservées d'année en année.</li>
      </ul>

      <h3>La Technique du Semis en Ligne</h3>
      <p>Le semis en ligne, pratiqué depuis l'Antiquité, offrait plusieurs avantages :</p>
      <p>Cette méthode permettait un meilleur contrôle de l'espace entre les graines, réduisant la compétition et facilitant le désherbage manuel. Elle garantissait également une répartition plus uniforme des nutriments du sol.</p>

      <h3>Relevance Contemporaine</h3>
      <p>Aujourd'hui, face aux défis de la durabilité et de la production bio-certifiée, ces anciennes techniques retrouvent une importance particulière. Elles prouvent qu'une agriculture productive est possible sans dépendre des intrants chimiques modernes.</p>
    `,
    associatedKnowledge: [
      { id: "6", title: "Calendrier Lunaire Agricole" },
      { id: "3", title: "Médecine des Plantes" },
      { id: "2", title: "Fabrication du Fromage Fermier" },
    ],
  },
}

export default async function DetailPage({ params }: PageProps) {
  const { id } = await params
  const savoir = savoirDetails[id] || savoirDetails["1"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition">
            <ChevronLeft className="w-5 h-5" />
            <span>Retour</span>
          </Link>
          <div className="flex-1 flex items-center gap-2 md:ml-8">
            <Leaf className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">L'Arche des Savoirs</h1>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden bg-muted">
        <img src={savoir.image || "/placeholder.svg"} alt={savoir.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Meta */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full font-medium">
                  {savoir.category}
                </span>
                <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full">{savoir.era}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{savoir.title}</h1>
              <p className="text-lg text-foreground/70">{savoir.excerpt}</p>
            </div>

            {/* Meta Information */}
            <div className="border-t border-b border-border py-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Publié le</p>
                  <p className="font-medium text-foreground">{savoir.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Contributeur</p>
                  <p className="font-medium text-foreground">{savoir.contributor.name}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <article className="prose prose-neutral max-w-none space-y-6 text-foreground">
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Pendant des millénaires, les agriculteurs ont perfectionné l'art du semis en observant la nature. Ces
                  techniques, transmises de génération en génération, reposaient sur une compréhension profonde des
                  cycles lunaires et des conditions climatiques.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Les Principes Fondamentaux</h2>
                <p>Le semis traditionnel respectait plusieurs principes clés :</p>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong>Respect du calendrier lunaire :</strong> Les semis se faisaient à la lune montante pour
                      les cultures aériennes.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong>Préparation du sol :</strong> Le terrain était enrichi avec des composts naturels et du
                      fumier bien décomposé.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong>Rotation des cultures :</strong> Les parcelles alternaient les plantations pour préserver
                      la fertilité du sol.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      <strong>Sélection des graines :</strong> Les meilleures graines étaient conservées d'année en
                      année.
                    </span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">La Technique du Semis en Ligne</h2>
                <p>
                  Le semis en ligne, pratiqué depuis l'Antiquité, offrait plusieurs avantages. Cette méthode permettait
                  un meilleur contrôle de l'espace entre les graines, réduisant la compétition et facilitant le
                  désherbage manuel. Elle garantissait également une répartition plus uniforme des nutriments du sol.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Relevance Contemporaine</h2>
                <p>
                  Aujourd'hui, face aux défis de la durabilité et de la production bio-certifiée, ces anciennes
                  techniques retrouvent une importance particulière. Elles prouvent qu'une agriculture productive est
                  possible sans dépendre des intrants chimiques modernes.
                </p>
              </div>
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              {savoir.tags.map((tag: string) => (
                <Link key={tag} href={`/?tag=${tag}`}>
                  <span className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-full text-sm transition cursor-pointer">
                    <Tag className="w-4 h-4" />
                    {tag}
                  </span>
                </Link>
              ))}
            </div>

            {/* Share */}
            <div className="pt-6 border-t border-border flex gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contributor Card */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">À propos du contributeur</h3>
              <div className="flex gap-4">
                <img
                  src={savoir.contributor.avatar || "/placeholder.svg"}
                  alt={savoir.contributor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{savoir.contributor.name}</h4>
                  <p className="text-sm text-foreground/70">{savoir.contributor.role}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Voir le profil
              </Button>
            </Card>

            {/* Associated Knowledge */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Savoirs Associés</h3>
              <ul className="space-y-3">
                {savoir.associatedKnowledge.map((item: any) => (
                  <li key={item.id}>
                    <Link
                      href={`/detail/${item.id}`}
                      className="text-primary hover:text-primary/80 font-medium hover:underline transition"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            {/* CTA */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 space-y-4">
              <h3 className="font-semibold text-foreground">Vous aussi, contribuez</h3>
              <p className="text-sm text-foreground/70">
                Partagez un savoir ancestral ou une technique oubliée avec notre communauté.
              </p>
              <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Ajouter un Savoir
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 md:py-12 px-4 md:px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 L'Arche des Savoirs. Hackathon "Cultiver Demain"</p>
        </div>
      </footer>
    </div>
  )
}

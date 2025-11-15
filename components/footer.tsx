import Link from "next/link";

export const Footer = () => (
  <footer className="bg-primary dark:bg-slate-900 text-white py-6 md:py-8 px-4 md:px-6">
    <div className="max-w-7xl mx-auto">
      {/* Main Footer Content */}
      <div className="grid md:grid-cols-4 gap-6 mb-4 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-semibold mb-3 text-white">Explorer</h4>
          <ul className="space-y-1.5 text-sm text-white/80">
            <li>
              <a href="/explore" className="hover:text-white transition-colors">
                Tous les savoirs
              </a>
            </li>
            <li>
              <a href="/explore" className="hover:text-white transition-colors">
                Arbre interactif
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-semibold mb-3 text-white">Contribuer</h4>
          <ul className="space-y-1.5 text-sm text-white/80">
            <li>
              <Link
                href="/add-savoir"
                className="hover:text-white transition-colors"
              >
                Ajouter un savoir
              </Link>
            </li>
            <li>
              <a
                href="#contribution"
                className="hover:text-white transition-colors"
              >
                Guide contributeur
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-semibold mb-3 text-white">Communauté</h4>
          <ul className="space-y-1.5 text-sm text-white/80">
            <li>
              <Link
                href="/gamification"
                className="hover:text-white transition-colors"
              >
                Classement
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-semibold mb-3 text-white">À propos</h4>
          <ul className="space-y-1.5 text-sm text-white/80">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Notre mission
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 pt-4 text-center">
        <p className="text-sm text-white/70">
          © 2025 L'Arche des Savoirs. Hackathon "Cultiver Demain"
        </p>
      </div>
    </div>
  </footer>
);

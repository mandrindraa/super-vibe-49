export const Footer = () => (
  <footer className="item-center justify-center bg-primary dark:bg-slate-900 text-white py-6 md:py-8 px-4 md:px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 mb-4 justify-items-center text-center">
      <div className="flex flex-col items-center">
        <h4 className="font-semibold mb-3 text-white">Explorer</h4>
        <ul className="space-y-1.5 text-sm text-white/80 text-center">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Tous les savoirs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Arbre interactif
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Catégories
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="font-semibold mb-3 text-white">Contribuer</h4>
        <ul className="space-y-1.5 text-sm text-white/80 text-center">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Ajouter un savoir
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Mes contributions
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Guide contributeur
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="font-semibold mb-3 text-white">Communauté</h4>
        <ul className="space-y-1.5 text-sm text-white/80 text-center">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Classement
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Discussions
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Événements
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/20 pt-2 md:pt-3 text-center">
      <p className="text-xs text-white/70">
        © 2025 L'Arche des Savoirs. Hackathon "Cultiver Demain"
      </p>
    </div>
  </footer>
);

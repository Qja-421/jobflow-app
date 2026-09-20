import Link from "next/link";

export default function Home() {
  const userName = "Jacques Alphonse Matoko";
  const userEmail = "jacks.matoko@gmail.com";
  const userPhone = "+242 05 302 8383";
  const userLocation = "Pointe-Noire, Congo · Disponible à l'international & Télétravail";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Barre de navigation responsive */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-auto sm:h-18 py-3 sm:py-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Identité */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-base shadow-xs shrink-0">
                JM
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm sm:text-base leading-tight block">
                  JobFlow · Hub Personnel
                </span>
                <span className="text-xs text-slate-500">{userName}</span>
              </div>
            </div>

            {/* Bouton Dashboard visible sur mobile */}
            <Link
              href="/dashboard"
              className="sm:hidden inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-xs"
            >
              Dashboard ↗
            </Link>
          </div>

          {/* Navigation desktop & tablette */}
          <nav className="hidden sm:flex items-center gap-4 md:gap-6">
            <a href="#metiers" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Cœurs de Métier
            </a>
            <a href="#systeme" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Robot IA
            </a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xs transition-all hover:translate-y-[-1px]"
            >
              Tableau de bord ↗
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Principal Personnel */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 md:p-12 shadow-xs">
          {/* Badges statut */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              ROBOT IA ACTIF 24/7 (RAILWAY)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold">
              10 ANS D'EXPÉRIENCE · TRILINGUE FR / EN / RU
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {userName}
          </h1>

          <p className="text-lg sm:text-xl font-semibold text-blue-600 leading-snug mb-4">
            Responsable QHSE & Sécurité Industrielle · Expert en Automatisation IA & No-Code · Chef de Projet
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            Plateforme personnelle de recherche d'emploi et de pilotage automatisé. Le moteur IA veille en continu
            sur les opportunités en Afrique francophone (Congo, RDC, Gabon, Cameroun, Sénégal) et à l'international, calcule le score de matching et prépare des
            candidatures sur-mesure livrées directement sur ma boîte Gmail et Discord.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-lg text-sm sm:text-base font-bold shadow-sm transition-all hover:translate-y-[-1px]"
            >
              📊 Ouvrir mon tableau de bord →
            </Link>

            <a
              href={`mailto:${userEmail}?subject=Opportunité professionnelle pour Jacques Matoko`}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-5 py-3.5 rounded-lg text-sm sm:text-base font-semibold transition-colors"
            >
              ✉️ Me contacter ({userEmail})
            </a>
          </div>
        </div>
      </section>

      {/* Les 3 Cœurs de Métier */}
      <section id="metiers" className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <p className="font-mono text-xs font-bold text-blue-600 uppercase tracking-wider mb-1.5">
            PROFIL PROFESSIONNEL CIBLÉ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Mes 3 Cœurs de Métier & Expertises
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Métier 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col shadow-xs hover:border-blue-300 transition-colors">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              Management QHSE & Risques
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 grow">
              Master QHSE. Maîtrise rigoureuse des normes <strong>ISO 9001, ISO 14001, ISO 45001</strong>. Audits de
              conformité, plans de prévention, sécurité industrielle, analyse des risques et amélioration continue.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-blue-600 font-semibold">
              Audits · ISO 9001/14001/45001 · RSE & HSE
            </div>
          </div>

          {/* Métier 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col shadow-xs hover:border-blue-300 transition-colors">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              Automatisation IA & No-Code
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 grow">
              Conception d'architectures d'automatisation avancées (<strong>N8N, Python, Supabase, Groq/LLM</strong>).
              Scraping intelligent, agents autonomes et réduction mesurée de plus de 40% des temps de traitement métiers.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-blue-600 font-semibold">
              N8N · Agents IA · Python · Supabase · APIs
            </div>
          </div>

          {/* Métier 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col shadow-xs hover:border-blue-300 transition-colors">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              Chef de Projet & Pilotage
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 grow">
              Coordination transversale, planification opérationnelle (MS Project MCA), gestion des budgets et conduite
              du changement. Profil <strong>trilingue</strong> (Français natif, Anglais pro, Russe courant).
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-blue-600 font-semibold">
              MS Project MCA · Trilingue FR/EN/RU · Agile
            </div>
          </div>
        </div>
      </section>

      {/* Le flux d'automatisation IA */}
      <section id="systeme" className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xs">
          <p className="font-mono text-xs font-bold text-red-600 uppercase tracking-wider mb-1.5">
            ARCHITECTURE DU WORKFLOW AUTONOME
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Comment le système travaille pour Jacques Matoko 24h/24
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-2xl block mb-2">1. 🔍</span>
              <strong className="block text-sm font-bold text-slate-900 mb-1">
                Scraping Continu
              </strong>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Scan automatique toutes les 4h sur ArbeitNow, Remotive et Jobicy.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-2xl block mb-2">2. 🧠</span>
              <strong className="block text-sm font-bold text-slate-900 mb-1">
                Scoring IA Groq
              </strong>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comparaison sémantique avec mes 10 ans d'expérience et mes pays cibles.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-2xl block mb-2">3. ✍️</span>
              <strong className="block text-sm font-bold text-slate-900 mb-1">
                Lettre Sur-Mesure
              </strong>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Génération instantanée de la candidature et de l'email de relance J+7.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-2xl block mb-2">4. 📬</span>
              <strong className="block text-sm font-bold text-slate-900 mb-1">
                Discord & Gmail
              </strong>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Alerte instantanée sur Discord et lettre prête à l'envoi dans ma boîte Gmail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carte de contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
          <div className="space-y-2">
            <p className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
              COORDONNÉES PROFESSIONNELLES
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {userName}
            </h3>
            <p className="text-sm text-slate-400">
              ✉️ Email : <strong className="text-white font-medium">{userEmail}</strong>
            </p>
            <p className="text-sm text-slate-400">
              📞 Tél : <strong className="text-white font-medium">{userPhone}</strong>
            </p>
            <p className="text-sm text-slate-400">
              📍 {userLocation}
            </p>
          </div>

          <div className="w-full md:w-auto">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-lg text-sm sm:text-base font-bold shadow-sm transition-colors"
            >
              Accéder au Tableau de Bord ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs sm:text-sm text-slate-500">
        <p>© 2026 JobFlow · Espace personnel de <strong>{userName}</strong> · Tous droits réservés.</p>
      </footer>
    </main>
  );
}

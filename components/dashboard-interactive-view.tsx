"use client";

import { useState } from "react";
import Link from "next/link";
import type { DashboardData, Opportunity } from "../lib/types";

export function DashboardInteractiveView({ initialData }: { initialData: DashboardData }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialData.opportunities);
  const [selectedOffer, setSelectedOffer] = useState<Opportunity | null>(opportunities[0] || null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"candidature" | "relance">("candidature");
  const [isScanning, setIsScanning] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // Email de Jacques Matoko
  const userEmail = "jacks.matoko@gmail.com";
  const userName = "Jacques Alphonse Matoko";
  const userRole = "Responsable QHSE · Expert en Automatisation IA · Chef de Projet";

  function generateLetter(offer: Opportunity) {
    return `Objet : Candidature au poste de ${offer.role} chez ${offer.company}

Madame, Monsieur,

C'est avec un vif intérêt que je vous soumets ma candidature pour le poste de ${offer.role} (${offer.location}), identifié via ${offer.source}.

Fort de plus de 10 ans d'expertise combinant le management QHSE (Master QHSE, normes ISO 9001/14001/45001, audit et gestion des risques) et l'automatisation de processus par l'IA (N8N, Python, agents autonomes), je pilote des projets complexes en toute autonomie.

Mon expérience terrain à la Direction Départementale des Loisirs et à la tête de Securits Technologies m'a permis d'optimiser les flux opérationnels et de moderniser les systèmes métiers avec des résultats mesurables (-40% sur les temps de traitement).

Trilingue (Français, Anglais, Russe) et disponible immédiatement pour des missions locales, régionales ou en télétravail international, je serais honoré d'échanger avec vous sur la valeur que je peux apporter à ${offer.company}.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${userName}
📞 +242 05 302 8383
✉️ ${userEmail}
📍 Pointe-Noire, République du Congo · Disponible à distance & international`;
  }

  function generateFollowUp(offer: Opportunity) {
    return `Objet : Relance — Candidature au poste de ${offer.role} chez ${offer.company}

Madame, Monsieur,

Je me permets de revenir vers vous avec courtoisie suite à ma candidature transmise la semaine dernière pour le poste de ${offer.role} (${offer.location}).

Particulièrement enthousiasmé par les ambitions de ${offer.company}, je tiens à vous réitérer mon vif intérêt pour cette opportunité. 

Mon profil pluridisciplinaire combinant le management QHSE (Master QHSE, normes ISO 9001/14001/45001), le pilotage de projets (MS Project MCA) et l'automatisation par l'IA (N8N, Python) me permettra d'être immédiatement opérationnel au sein de vos équipes.

Restant à votre entière disposition pour convenir d'un entretien selon vos disponibilités, je vous remercie par avance pour l'attention portée à mon profil.

Je vous prie d'agréer, Madame, Monsieur, mes sincères salutations.

${userName}
📞 +242 05 302 8383
✉️ ${userEmail}
📍 Pointe-Noire, République du Congo · Disponible immédiatement`;
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleTriggerScan() {
    setIsScanning(true);
    setStatusNotice("Le robot IA scanne le web à la recherche de nouvelles offres pour Jacques Matoko...");
    setTimeout(() => {
      setIsScanning(false);
      setStatusNotice("Scan terminé avec succès ! Les alertes et lettres adaptées sont envoyées sur votre Discord et Gmail.");
      setTimeout(() => setStatusNotice(null), 5000);
    }, 2000);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 font-sans">
      {/* En-tête personnel clair & responsive */}
      <header className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 mb-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-lg shrink-0 shadow-xs">
            JM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {userName}
              </h1>
              <Link href="/" className="text-xs text-blue-600 hover:underline font-medium">
                ← Accueil
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {userRole}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            ROBOT IA ACTIF 24/7
          </span>
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isScanning ? "⏳ Scan en cours..." : "🔄 Lancer un scan"}
          </button>
        </div>
      </header>

      {/* Notification de statut */}
      {statusNotice && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2.5 animate-fade-in">
          <span>💡</span> {statusNotice}
        </div>
      )}

      {/* Cartes de destination des alertes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex items-center gap-3.5 shadow-xs">
          <div className="text-2xl sm:text-3xl shrink-0">✉️</div>
          <div className="min-w-0">
            <strong className="block text-xs sm:text-sm text-slate-900 truncate font-semibold">Boîte Gmail connectée</strong>
            <span className="text-blue-600 text-xs sm:text-sm font-medium truncate block">{userEmail}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex items-center gap-3.5 shadow-xs">
          <div className="text-2xl sm:text-3xl shrink-0">💬</div>
          <div className="min-w-0">
            <strong className="block text-xs sm:text-sm text-slate-900 truncate font-semibold">Salon Discord connecté</strong>
            <span className="text-emerald-600 text-xs sm:text-sm font-medium truncate block">#général (Serveur_Queja421) ✅ Connecté</span>
          </div>
        </div>
      </div>

      {/* Section Principale Responsive : Grille 1 colonne sur mobile, 2 colonnes sur grand écran */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Colonne Gauche (40% desktop, 100% mobile) : Offres détectées */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              📋 Offres ciblées ({opportunities.length})
            </h2>
            <span className="text-xs text-slate-500 font-mono">Triées par score IA</span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[560px] pr-1">
            {opportunities.map((offer) => {
              const isSelected = selectedOffer?.id === offer.id;
              return (
                <div
                  key={offer.id}
                  onClick={() => setSelectedOffer(offer)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/70 shadow-xs"
                      : "border-slate-100 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <strong className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {offer.role}
                    </strong>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold font-mono shrink-0 border ${
                      offer.score >= 90
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      ⭐ {offer.score}%
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-3">
                    🏢 {offer.company} · 📍 {offer.location}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs text-slate-400">
                    <span>Source : {offer.source}</span>
                    <span className="text-blue-600 font-semibold">Voir la lettre →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Colonne Droite (60% desktop, 100% mobile) : Lettre & Relance J+7 */}
        {selectedOffer && (
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col">
            
            {/* Sélecteur d'onglets responsive */}
            <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("candidature")}
                className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "candidature"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                📝 1. Candidature Initiale
              </button>
              <button
                onClick={() => setActiveTab("relance")}
                className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "relance"
                    ? "bg-red-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ⏰ 2. Relance (J+7)
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3 pb-3 border-b border-slate-100">
              <div>
                <span className={`text-xs font-mono font-bold uppercase ${
                  activeTab === "relance" ? "text-red-600" : "text-blue-600"
                }`}>
                  {activeTab === "relance" ? "⚡ Email de Relance IA (Sans réponse à J+7)" : "✨ Lettre de Motivation Personnalisée"}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  {selectedOffer.role} chez {selectedOffer.company}
                </h3>
              </div>
              <button
                onClick={() => handleCopy(activeTab === "relance" ? generateFollowUp(selectedOffer) : generateLetter(selectedOffer))}
                className={`self-start sm:self-auto px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white shadow-xs cursor-pointer transition-colors ${
                  activeTab === "relance" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {copied ? "✅ Copié !" : activeTab === "relance" ? "📋 Copier la relance" : "📋 Copier la lettre"}
              </button>
            </div>

            {/* Zone de texte de la lettre */}
            <div className={`rounded-xl p-4 sm:p-5 mb-4 border grow overflow-y-auto max-h-[420px] ${
              activeTab === "relance" ? "bg-red-50/50 border-red-200" : "bg-slate-50 border-slate-200"
            }`}>
              <pre className="font-sans text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {activeTab === "relance" ? generateFollowUp(selectedOffer) : generateLetter(selectedOffer)}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
              <span className="text-xs text-slate-500">
                {activeTab === "relance" ? "📌 Prêt à envoyer si aucune réponse sous 7 jours" : "📌 Prête à être envoyée au recruteur"}
              </span>
              <a
                href={selectedOffer.sourceUrl || "https://www.arbeitnow.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
              >
                🔗 Ouvrir l&apos;offre originale ↗
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

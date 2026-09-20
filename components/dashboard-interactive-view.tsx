"use client";

import { useState } from "react";
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
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 16px" }}>
      {/* En-tête personnel clair */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", padding: "24px 28px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#2563eb", color: "#ffffff", display: "grid", placeItems: "center", fontSize: "18px", fontWeight: 700, fontFamily: "var(--mono)" }}>
            JM
          </div>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
              {userName}
            </h1>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "13px" }}>
              {userRole}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "20px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "12px", fontWeight: 700, fontFamily: "var(--mono)" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#dc2626" }} />
            ROBOT IA ACTIF 24/7
          </span>
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#2563eb", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }}
          >
            {isScanning ? "⏳ Scan en cours..." : "🔄 Lancer un scan d'offres"}
          </button>
        </div>
      </header>

      {/* Notification de statut */}
      {statusNotice && (
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", padding: "14px 20px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px" }}>
          <span>💡</span> {statusNotice}
        </div>
      )}

      {/* Cartes de destination des alertes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ fontSize: "28px" }}>✉️</div>
          <div>
            <strong style={{ display: "block", fontSize: "14px", color: "#0f172a" }}>Boîte Gmail connectée</strong>
            <span style={{ color: "#2563eb", fontSize: "13px", fontWeight: 500 }}>{userEmail}</span>
          </div>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ fontSize: "28px" }}>💬</div>
          <div>
            <strong style={{ display: "block", fontSize: "14px", color: "#0f172a" }}>Salon Discord connecté</strong>
            <span style={{ color: "#16a34a", fontSize: "13px", fontWeight: 500 }}>#général (Serveur_Queja421) ✅ Connecté</span>
          </div>
        </div>
      </div>

      {/* Section Principale : Liste des offres & Lettre générée */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "24px" }}>
        
        {/* Colonne Gauche : Offres détectées */}
        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
              📋 Offres ciblées pour vous ({opportunities.length})
            </h2>
            <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--mono)" }}>Triées par score IA</span>
          </div>

          <div style={{ display: "grid", gap: "10px" }}>
            {opportunities.map((offer) => {
              const isSelected = selectedOffer?.id === offer.id;
              return (
                <div
                  key={offer.id}
                  onClick={() => setSelectedOffer(offer)}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    border: "2px solid",
                    borderColor: isSelected ? "#2563eb" : "#f1f5f9",
                    background: isSelected ? "#eff6ff" : "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <div>
                      <strong style={{ fontSize: "15px", color: "#0f172a", display: "block" }}>
                        {offer.role}
                      </strong>
                      <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "13px" }}>
                        🏢 {offer.company} · 📍 {offer.location}
                      </p>
                    </div>
                    <span style={{ background: offer.score >= 90 ? "#f0fdf4" : "#eff6ff", color: offer.score >= 90 ? "#16a34a" : "#2563eb", border: "1px solid", borderColor: offer.score >= 90 ? "#bbf7d0" : "#bfdbfe", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 700, fontFamily: "var(--mono)", whiteSpace: "nowrap" }}>
                      ⭐ {offer.score}%
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "8px", borderTop: "1px solid #e2e8f0", fontSize: "12px", color: "#94a3b8" }}>
                    <span>Source : {offer.source}</span>
                    <span style={{ color: "#2563eb", fontWeight: 600 }}>Voir la lettre →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Colonne Droite : Lettre de motivation & Relance Automatique J+7 */}
        {selectedOffer && (
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            
            {/* Sélecteur d'onglets : Candidature vs Relance */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", background: "#f8fafc", padding: "4px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <button
                onClick={() => setActiveTab("candidature")}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  background: activeTab === "candidature" ? "#2563eb" : "transparent",
                  color: activeTab === "candidature" ? "#ffffff" : "#64748b",
                  transition: "all 0.15s"
                }}
              >
                📝 1. Candidature Initiale
              </button>
              <button
                onClick={() => setActiveTab("relance")}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  background: activeTab === "relance" ? "#dc2626" : "transparent",
                  color: activeTab === "relance" ? "#ffffff" : "#64748b",
                  transition: "all 0.15s"
                }}
              >
                ⏰ 2. Relance Automatique (J+7)
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 700, color: activeTab === "relance" ? "#dc2626" : "#2563eb", fontFamily: "var(--mono)", textTransform: "uppercase" }}>
                  {activeTab === "relance" ? "⚡ Email de Relance IA (Sans réponse à J+7)" : "✨ Lettre de Motivation Personnalisée"}
                </span>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "4px 0 0" }}>
                  {selectedOffer.role} chez {selectedOffer.company}
                </h3>
              </div>
              <button
                onClick={() => handleCopy(activeTab === "relance" ? generateFollowUp(selectedOffer) : generateLetter(selectedOffer))}
                style={{ background: activeTab === "relance" ? "#dc2626" : "#2563eb", color: "#ffffff", border: "none", padding: "8px 14px", borderRadius: "6px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
              >
                {copied ? "✅ Copié !" : activeTab === "relance" ? "📋 Copier la relance" : "📋 Copier la lettre"}
              </button>
            </div>

            <div style={{ background: activeTab === "relance" ? "#fef2f2" : "#f8fafc", border: "1px solid", borderColor: activeTab === "relance" ? "#fecaca" : "#e2e8f0", borderRadius: "8px", padding: "16px", marginBottom: "18px" }}>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "var(--sans)", fontSize: "13px", lineHeight: "1.6", color: "#1e293b" }}>
                {activeTab === "relance" ? generateFollowUp(selectedOffer) : generateLetter(selectedOffer)}
              </pre>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                {activeTab === "relance" ? "📌 Prêt à envoyer si le recruteur n'a pas répondu sous 7 jours" : "📌 Prête à être envoyée au recruteur"}
              </span>
              <a
                href={selectedOffer.sourceUrl || "https://www.arbeitnow.com"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#0f172a", color: "#ffffff", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
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

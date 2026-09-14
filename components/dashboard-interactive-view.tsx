"use client";

import { useState } from "react";
import type { Application, DashboardData, Opportunity } from "../lib/types";
import { ApplicationStatus, LiveLabel, MetricTile } from "./dashboard-ui";
import { Button } from "./ui";

function Spark({ points, color = "#16a34a" }: { points: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} stroke={color} />
    </svg>
  );
}

type TabType = "offers" | "applications" | "documents" | "settings";
type FilterType = "all" | "ready" | "reviewing";

export function DashboardInteractiveView({ initialData }: { initialData: DashboardData }) {
  const [activeTab, setActiveTab] = useState<TabType>("offers");
  const [filter, setFilter] = useState<FilterType>("all");
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialData.opportunities);
  const [applications, setApplications] = useState<Application[]>(initialData.applications);
  const [offersThisWeek] = useState(initialData.offersThisWeek);
  const [applicationsSent, setApplicationsSent] = useState(initialData.applicationsSent);
  const [pendingValidation, setPendingValidation] = useState(initialData.pendingValidation);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [selectedOfferForDoc, setSelectedOfferForDoc] = useState<Opportunity | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [copiedDoc, setCopiedDoc] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Profil personnalisable par l'utilisateur
  const [userName, setUserName] = useState(initialData.userName);
  const [targetRole, setTargetRole] = useState("Coordinateur / Responsable de programme");
  const [location, setLocation] = useState("Kinshasa / Goma, RDC & Remote");
  const [skills, setSkills] = useState("Gestion de projets, coordination bailleurs (UNICEF, USAID, ECHO), suivi MEAL, leadership.");
  const [profileSaved, setProfileSaved] = useState(false);

  // Filtrage des opportunités
  const filteredOffers = opportunities.filter((offer) => {
    if (filter === "ready") return offer.ready;
    if (filter === "reviewing") return !offer.ready;
    return true;
  });

  const readyCount = opportunities.filter((o) => o.ready).length;

  // Validation 1-clic d'une candidature
  async function handleApply(offer: Opportunity) {
    if (applyingId) return;
    setApplyingId(offer.id);

    try {
      const response = await fetch("/api/applications/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: offer.id,
          role: offer.role,
          company: offer.company,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const newApp: Application = data.application;
        setApplications((prev) => [newApp, ...prev]);
        setOpportunities((prev) =>
          prev.map((o) => (o.id === offer.id ? { ...o, ready: false } : o))
        );
        setApplicationsSent((prev) => prev + 1);
        setPendingValidation((prev) => Math.max(0, prev - 1));

        setFeedbackMessage(`Candidature pour "${offer.role}" envoyée avec succès !`);
        setTimeout(() => setFeedbackMessage(null), 4000);
      } else {
        alert(data.error ?? "Une erreur est survenue.");
      }
    } catch (err) {
      console.error(err);
      alert("Impossible d'envoyer la candidature.");
    } finally {
      setApplyingId(null);
    }
  }

  function openDocumentModal(offer: Opportunity) {
    setSelectedOfferForDoc(offer);
    setIsDocModalOpen(true);
    setCopiedDoc(false);
  }

  function copyDocContent(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2500);
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaved(true);
    setFeedbackMessage("Profil et critères de recherche mis à jour avec succès !");
    setTimeout(() => {
      setProfileSaved(false);
      setFeedbackMessage(null);
    }, 4000);
  }

  const defaultOffer = opportunities[0] || initialData.opportunities[0];
  const activeOfferDoc = selectedOfferForDoc || defaultOffer;

  const generatedLetter = activeOfferDoc
    ? `Objet : Candidature au poste de ${activeOfferDoc.role} chez ${activeOfferDoc.company}\n\nMadame, Monsieur,\n\nC'est avec un vif intérêt que je vous présente ma candidature pour l'opportunité de ${activeOfferDoc.role}, identifiée sur ${activeOfferDoc.source}.\n\nFort(e) d'une solide expérience professionnelle dans le domaine (${skills}), j'ai développé une rigueur et une capacité d'adaptation confirmées sur des projets stratégiques à ${activeOfferDoc.location}.\n\nConvaincu(e) de pouvoir apporter une réelle valeur ajoutée aux initiatives de ${activeOfferDoc.company}, je serais ravi(e) de vous rencontrer lors d'un entretien.\n\nDans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.\n\n${userName}`
    : "Sélectionnez une offre pour afficher les documents adaptés.";

  return (
    <>
      {/* Topbar */}
      <header className="dashboard-topbar">
        <div>
          <p className="eyebrow">Tableau de bord de recherche d&apos;emploi</p>
          <h1>Bonjour, {userName} 👋</h1>
        </div>
        <div className="topbar-actions">
          <LiveLabel />
          <button
            className="notification"
            onClick={() => {
              setActiveTab("offers");
              setFilter("ready");
            }}
            title={`${readyCount} offre(s) à valider`}
          >
            🔔<span>{readyCount}</span>
          </button>
          <div className="top-avatar">{userName.slice(0, 2).toUpperCase()}</div>
        </div>
      </header>

      {/* Message de confirmation */}
      {feedbackMessage && (
        <div
          role="status"
          style={{
            margin: "18px 0",
            padding: "14px 20px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#166534",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}
        >
          <span style={{ fontSize: "16px" }}>✅</span> {feedbackMessage}
        </div>
      )}

      {/* Barre d'onglets principaux (Tous les boutons sont actifs) */}
      <div style={{ display: "flex", gap: "10px", margin: "24px 0 8px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", overflowX: "auto" }}>
        <button
          className={`button ${activeTab === "offers" ? "button-primary" : "button-light"}`}
          onClick={() => setActiveTab("offers")}
          style={{ fontWeight: 600 }}
        >
          📋 Offres Matchées ({opportunities.length})
        </button>
        <button
          className={`button ${activeTab === "applications" ? "button-primary" : "button-light"}`}
          onClick={() => setActiveTab("applications")}
          style={{ fontWeight: 600 }}
        >
          🚀 Candidatures Envoyées ({applications.length})
        </button>
        <button
          className={`button ${activeTab === "documents" ? "button-primary" : "button-light"}`}
          onClick={() => setActiveTab("documents")}
          style={{ fontWeight: 600 }}
        >
          📄 CV & Lettres IA
        </button>
        <button
          className={`button ${activeTab === "settings" ? "button-primary" : "button-light"}`}
          onClick={() => setActiveTab("settings")}
          style={{ fontWeight: 600 }}
        >
          ⚙️ Mon Profil & Préférences
        </button>
      </div>

      {/* VUE 1 : OFFRES D'EMPLOI */}
      {activeTab === "offers" && (
        <>
          {/* Métriques */}
          <section className="dashboard-overview" aria-labelledby="overview-title">
            <div className="overview-heading">
              <div>
                <p className="eyebrow">Performances en temps réel</p>
                <h2 id="overview-title">Votre agent IA est en recherche active.</h2>
              </div>
              <button
                className="button button-light"
                onClick={() => alert("Synchronisation n8n active en tâche de fond (toutes les 4h).")}
              >
                🔄 Actualiser le scan
              </button>
            </div>
            <div className="metrics-grid">
              <MetricTile
                label="Offres qualifiées trouvées"
                value={String(offersThisWeek).padStart(2, "0")}
                trend="positive"
                trendText="cette semaine"
              >
                <Spark points="0,30 12,24 25,26 39,18 51,21 65,12 80,15 100,3" />
              </MetricTile>
              <MetricTile
                label="Candidatures soumises"
                value={String(applicationsSent).padStart(2, "0")}
                trend="positive"
                trendText="envoyées"
              >
                <Spark points="0,31 14,31 26,25 38,26 51,16 63,16 77,9 89,12 100,4" />
              </MetricTile>
              <MetricTile
                label="Taux de compatibilité IA"
                value={`${initialData.responseRate}%`}
                trend="positive"
                trendText="score moyen"
              >
                <Spark points="0,27 15,26 28,20 41,25 55,15 68,19 84,10 100,5" />
              </MetricTile>
              <MetricTile
                label="Offres prêtes à valider"
                value={String(pendingValidation).padStart(2, "0")}
                trend={pendingValidation > 0 ? "negative" : "neutral"}
                trendText="en attente"
              >
                <Spark points="0,7 14,12 26,10 39,18 53,14 67,24 82,21 100,31" color="#dc2626" />
              </MetricTile>
            </div>
          </section>

          {/* Table des offres */}
          <section className="opportunities-section" id="offres">
            <div className="section-row">
              <div>
                <p className="eyebrow">Sélection d&apos;offres qualifiées</p>
                <h2>
                  Offres triées par pertinence <span>{String(filteredOffers.length).padStart(2, "0")}</span>
                </h2>
              </div>
              <div className="filter-group">
                <button
                  className={`filter ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                  type="button"
                >
                  Toutes <span>{String(opportunities.length).padStart(2, "0")}</span>
                </button>
                <button
                  className={`filter ${filter === "ready" ? "active" : ""}`}
                  onClick={() => setFilter("ready")}
                  type="button"
                >
                  À valider <span>{String(readyCount).padStart(2, "0")}</span>
                </button>
                <button
                  className={`filter ${filter === "reviewing" ? "active" : ""}`}
                  onClick={() => setFilter("reviewing")}
                  type="button"
                >
                  En analyse <span>{String(opportunities.length - readyCount).padStart(2, "0")}</span>
                </button>
              </div>
            </div>

            <div className="offers-table">
              <div className="offers-head">
                <span>OPPORTUNITÉ</span>
                <span>COMPATIBILITÉ</span>
                <span>SOURCE</span>
                <span>DATE</span>
                <span>ACTIONS</span>
              </div>
              {filteredOffers.length === 0 ? (
                <div style={{ padding: "48px 0", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
                  Aucune offre ne correspond à ce filtre actuellement.
                </div>
              ) : (
                filteredOffers.map((offer) => (
                  <article className="dashboard-offer" key={offer.id}>
                    <div className="dashboard-company-mark">{offer.company.slice(0, 1).toUpperCase()}</div>
                    <div className="dashboard-offer-main">
                      <h3>{offer.role}</h3>
                      <p>
                        <strong>{offer.company}</strong> <i>·</i> 📍 {offer.location}
                      </p>
                    </div>
                    <div className="match-score">
                      <strong>{offer.score}%</strong>
                      <div>
                        <i style={{ width: `${offer.score}%` }} />
                      </div>
                    </div>
                    <div>
                      <span className="source-badge">{offer.source}</span>
                    </div>
                    <time>{offer.date}</time>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button
                        className="button button-light"
                        onClick={() => openDocumentModal(offer)}
                        style={{ minHeight: "34px", padding: "6px 10px", fontSize: "12px" }}
                        title="Voir la lettre rédigée par l'IA"
                      >
                        👁️ Lettre
                      </button>
                      <button
                        className="button button-primary"
                        disabled={applyingId === offer.id}
                        onClick={() => handleApply(offer)}
                        style={{ minHeight: "34px", padding: "6px 12px", fontSize: "12px", fontWeight: 600 }}
                      >
                        {applyingId === offer.id ? "Envoi..." : "🚀 Valider"}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          {/* Section inférieure : Candidatures récentes + Documents */}
          <section className="dashboard-lower">
            <div className="applications-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Suivi des démarches</p>
                  <h2>Dernières candidatures ({applications.length})</h2>
                </div>
                <button onClick={() => setActiveTab("applications")}>Voir l&apos;historique complet →</button>
              </div>
              <div className="applications-list">
                {applications.length === 0 ? (
                  <div style={{ padding: "32px 0", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
                    Aucune candidature envoyée pour l&apos;instant. Cliquez sur &quot;Valider&quot; sur une offre pour postuler.
                  </div>
                ) : (
                  applications.slice(0, 3).map((app) => (
                    <div className="application-row" key={app.id}>
                      <div className="application-mark">{app.company.slice(0, 1)}</div>
                      <div>
                        <h3>{app.role}</h3>
                        <p>{app.company} <i>·</i> {app.date}</p>
                      </div>
                      <ApplicationStatus status={app.status} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="documents-panel">
              <div>
                <p className="eyebrow">Documents Intelligents</p>
                <h2>Générateur de Lettres IA</h2>
                <p>
                  Chaque offre détectée dispose automatiquement d&apos;une lettre de motivation rédigée sur-mesure par l&apos;IA pour votre profil.
                </p>
              </div>
              <button
                className="button"
                onClick={() => setActiveTab("documents")}
              >
                ✍️ Consulter & Éditer mes documents
              </button>
            </div>
          </section>
        </>
      )}

      {/* VUE 2 : CANDIDATURES COMPLÈTES */}
      {activeTab === "applications" && (
        <section style={{ padding: "32px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <p className="eyebrow">Historique & Suivi</p>
              <h2>Toutes vos candidatures envoyées ({applications.length})</h2>
            </div>
            <button className="button button-light" onClick={() => setActiveTab("offers")}>
              ← Retour aux offres
            </button>
          </div>

          <div className="offers-table">
            <div style={{ display: "grid", gridTemplateColumns: "40px 1.5fr 1fr 120px 120px", padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontWeight: 700, fontSize: "12px", color: "#64748b" }}>
              <span>#</span>
              <span>POSTE & ORGANISATION</span>
              <span>DATE D&apos;ENVOI</span>
              <span>STATUT</span>
              <span>ACTION</span>
            </div>
            {applications.map((app, index) => (
              <div key={app.id} style={{ display: "grid", gridTemplateColumns: "40px 1.5fr 1fr 120px 120px", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ fontWeight: 600, color: "#2563eb" }}>{index + 1}</span>
                <div>
                  <strong style={{ fontSize: "15px", color: "#0f172a" }}>{app.role}</strong>
                  <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#64748b" }}>{app.company}</p>
                </div>
                <span style={{ fontSize: "13px", color: "#475569" }}>{app.date}</span>
                <ApplicationStatus status={app.status} />
                <button
                  className="button button-light"
                  style={{ minHeight: "32px", padding: "4px 8px", fontSize: "11px" }}
                  onClick={() => alert(`Détails de la candidature ${app.role} chez ${app.company} : Dossier transmis.`)}
                >
                  Détails
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VUE 3 : CV & LETTRES IA */}
      {activeTab === "documents" && (
        <section style={{ padding: "32px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <p className="eyebrow">Studio de documents</p>
              <h2>Lettres de motivation & CV générés par l&apos;IA</h2>
            </div>
            <button className="button button-light" onClick={() => setActiveTab("offers")}>
              ← Retour aux offres
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
            {/* Liste des offres pour choisir le document */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1e3a8a", marginBottom: "12px" }}>
                Choisir une offre ciblée :
              </h3>
              <div style={{ display: "grid", gap: "8px" }}>
                {opportunities.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOfferForDoc(o)}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid",
                      borderColor: activeOfferDoc.id === o.id ? "#2563eb" : "#e2e8f0",
                      background: activeOfferDoc.id === o.id ? "#eff6ff" : "#ffffff",
                      textAlign: "left",
                      cursor: "pointer"
                    }}
                  >
                    <strong style={{ display: "block", fontSize: "13px", color: "#0f172a" }}>{o.role}</strong>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>{o.company} · Score: {o.score}%</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Éditeur / Visualiseur */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                  Lettre pour : {activeOfferDoc.role} ({activeOfferDoc.company})
                </h3>
                <button
                  className="button button-primary"
                  onClick={() => copyDocContent(generatedLetter)}
                >
                  {copiedDoc ? "✅ Copié dans le presse-papier !" : "📋 Copier la lettre"}
                </button>
              </div>

              <textarea
                value={generatedLetter}
                readOnly
                rows={16}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  color: "#0f172a",
                  fontFamily: "var(--sans)",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  resize: "vertical"
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* VUE 4 : PARAMÈTRES DU PROFIL */}
      {activeTab === "settings" && (
        <section style={{ padding: "32px 0", maxWidth: "800px" }}>
          <div style={{ marginBottom: "24px" }}>
            <p className="eyebrow">Configuration de votre recherche</p>
            <h2>Personnaliser votre profil & critères IA</h2>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
              Ces informations sont utilisées par l&apos;IA Groq dans n8n pour calculer votre score de matching et personnaliser vos lettres de motivation.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "28px", display: "grid", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0f172a", marginBottom: "6px" }}>
                Nom & Prénom
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "14px" }}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0f172a", marginBottom: "6px" }}>
                Métier / Poste recherché
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "14px" }}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0f172a", marginBottom: "6px" }}>
                Zone géographique / Pays cibles
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "14px" }}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0f172a", marginBottom: "6px" }}>
                Compétences clés & Résumé de votre expérience
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={4}
                style={{ width: "100%", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "14px", lineHeight: "1.5" }}
                required
              />
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <button type="submit" className="button button-primary" style={{ fontWeight: 600 }}>
                💾 Enregistrer les critères de recherche
              </button>
              <button
                type="button"
                className="button button-light"
                onClick={() => setActiveTab("offers")}
              >
                Annuler
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Modale de visualisation rapide de la lettre */}
      {isDocModalOpen && selectedOfferForDoc && (
        <div className="modal-overlay" onClick={() => setIsDocModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
              <div>
                <span className="eyebrow">Document généré par l&apos;IA</span>
                <h3 style={{ margin: "4px 0 0", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                  Lettre de motivation — {selectedOfferForDoc.role}
                </h3>
                <p style={{ margin: "2px 0 0", color: "#64748b", fontSize: "13px" }}>
                  Organisation : {selectedOfferForDoc.company} · Compatibilité : {selectedOfferForDoc.score}%
                </p>
              </div>
              <button
                onClick={() => setIsDocModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "18px", marginBottom: "20px" }}>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "var(--sans)", fontSize: "13px", lineHeight: "1.6", color: "#0f172a" }}>
                {generatedLetter}
              </pre>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
              <button
                className="button button-light"
                onClick={() => copyDocContent(generatedLetter)}
              >
                {copiedDoc ? "✅ Copié !" : "📋 Copier le texte"}
              </button>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="button button-light"
                  onClick={() => setIsDocModalOpen(false)}
                >
                  Fermer
                </button>
                <button
                  className="button button-primary"
                  onClick={() => {
                    setIsDocModalOpen(false);
                    handleApply(selectedOfferForDoc);
                  }}
                >
                  🚀 Postuler & Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

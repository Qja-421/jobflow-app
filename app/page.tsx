import Link from "next/link";

export default function Home() {
  const userName = "Jacques Alphonse Matoko";
  const userEmail = "jacks.matoko@gmail.com";
  const userPhone = "+242 05 302 8383";
  const userLocation = "Pointe-Noire, Congo · Disponible à l'international & Télétravail";

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>
      {/* Barre de navigation simple et directe */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            padding: "0 24px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "#2563eb",
                color: "#ffffff",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: "16px",
                fontFamily: "var(--mono)",
              }}
            >
              JM
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: "16px", color: "#0f172a", display: "block" }}>
                JobFlow · Hub Personnel
              </span>
              <span style={{ fontSize: "12px", color: "#64748b" }}>{userName}</span>
            </div>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <a href="#metiers" style={{ fontSize: "14px", fontWeight: 600, color: "#475569" }}>
              Cœurs de Métier
            </a>
            <a href="#systeme" style={{ fontSize: "14px", fontWeight: 600, color: "#475569" }}>
              Robot IA (n8n)
            </a>
            <a href="#contact" style={{ fontSize: "14px", fontWeight: 600, color: "#475569" }}>
              Contact
            </a>
            <Link
              href="/dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#2563eb",
                color: "#ffffff",
                padding: "9px 18px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 2px 4px rgba(37,99,235,0.2)",
              }}
            >
              Tableau de bord ↗
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Principal Personnel */}
      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "56px 24px 40px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "48px 40px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "20px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "var(--mono)",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#dc2626" }} />
              SYSTÈME IA ACTIF 24/7 (RAILWAY)
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "20px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#1d4ed8",
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "var(--mono)",
              }}
            >
              10 ANS D'EXPÉRIENCE · TRILINGUE FR / EN / RU
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#0f172a",
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
            }}
          >
            {userName}
          </h1>

          <p
            style={{
              fontSize: "19px",
              fontWeight: 600,
              color: "#2563eb",
              margin: "0 0 16px",
              lineHeight: 1.4,
            }}
          >
            Responsable QHSE & Sécurité Industrielle · Expert en Automatisation IA & No-Code · Chef de Projet
          </p>

          <p
            style={{
              fontSize: "16px",
              color: "#475569",
              maxWidth: "800px",
              lineHeight: 1.6,
              margin: "0 0 32px",
            }}
          >
            Plateforme personnelle de recherche d'emploi et de pilotage automatisé. Le moteur IA veille en continu
            sur les opportunités internationales, calcule le score de matching avec mon profil et prépare des
            candidatures sur-mesure prêtes à l'envoi vers ma boîte Gmail et Discord.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <Link
              href="/dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#2563eb",
                color: "#ffffff",
                padding: "13px 26px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 10px rgba(37,99,235,0.25)",
              }}
            >
              📊 Ouvrir mon tableau de bord →
            </Link>

            <a
              href={`mailto:${userEmail}?subject=Opportunité professionnelle pour Jacques Matoko`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#ffffff",
                color: "#0f172a",
                border: "1px solid #cbd5e1",
                padding: "13px 22px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              ✉️ Me contacter ({userEmail})
            </a>
          </div>
        </div>
      </section>

      {/* Les 3 Cœurs de Métier / Piliers d'expertise */}
      <section id="metiers" style={{ maxWidth: "1160px", margin: "0 auto", padding: "20px 24px 48px" }}>
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              fontWeight: 700,
              color: "#2563eb",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: "0 0 6px",
            }}
          >
            PROFIL PROFESSIONNEL CIBLÉ
          </p>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Mes 3 Cœurs de Métier & Expertises
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {/* Métier 1 */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>🛡️</div>
            <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#0f172a", margin: "0 0 10px" }}>
              Management QHSE & Risques
            </h3>
            <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px", flex: 1 }}>
              Master QHSE. Maîtrise rigoureuse des normes <strong>ISO 9001, ISO 14001, ISO 45001</strong>. Audits de
              conformité, plans de prévention, sécurité industrielle, analyse des risques et amélioration continue.
            </p>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                padding: "10px 14px",
                fontSize: "12px",
                fontFamily: "var(--mono)",
                color: "#2563eb",
                fontWeight: 600,
              }}
            >
              Audits · ISO 9001/14001/45001 · RSE & HSE
            </div>
          </div>

          {/* Métier 2 */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>⚡</div>
            <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#0f172a", margin: "0 0 10px" }}>
              Automatisation IA & No-Code
            </h3>
            <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px", flex: 1 }}>
              Conception d'architectures d'automatisation avancées (<strong>N8N, Python, Supabase, Groq/LLM</strong>).
              Scraping intelligent, agents autonomes et réduction mesurée de plus de 40% des temps de traitement métiers.
            </p>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                padding: "10px 14px",
                fontSize: "12px",
                fontFamily: "var(--mono)",
                color: "#2563eb",
                fontWeight: 600,
              }}
            >
              N8N · Agents IA · Python · Supabase · APIs
            </div>
          </div>

          {/* Métier 3 */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>📋</div>
            <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#0f172a", margin: "0 0 10px" }}>
              Chef de Projet & Pilotage
            </h3>
            <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px", flex: 1 }}>
              Coordination transversale, planification opérationnelle (MS Project MCA), gestion des budgets et conduite
              du changement. Profil <strong>trilingue</strong> (Français natif, Anglais pro, Russe courant).
            </p>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                padding: "10px 14px",
                fontSize: "12px",
                fontFamily: "var(--mono)",
                color: "#2563eb",
                fontWeight: 600,
              }}
            >
              MS Project MCA · Trilingue FR/EN/RU · Agile
            </div>
          </div>
        </div>
      </section>

      {/* Le flux d'automatisation IA */}
      <section id="systeme" style={{ maxWidth: "1160px", margin: "0 auto", padding: "20px 24px 48px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "36px 32px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              fontWeight: 700,
              color: "#dc2626",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: "0 0 6px",
            }}
          >
            ARCHITECTURE DU WORKFLOW AUTONOME
          </p>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: "0 0 24px" }}>
            Comment le système travaille pour Jacques Matoko 24h/24
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            <div style={{ padding: "18px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "22px", display: "block", marginBottom: "8px" }}>1. 🔍</span>
              <strong style={{ display: "block", fontSize: "14px", color: "#0f172a", marginBottom: "4px" }}>
                Scraping Continu
              </strong>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                Extraction automatique des offres d'emploi sur ReliefWeb, Arbeit Now et plateformes cibles.
              </p>
            </div>

            <div style={{ padding: "18px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "22px", display: "block", marginBottom: "8px" }}>2. 🧠</span>
              <strong style={{ display: "block", fontSize: "14px", color: "#0f172a", marginBottom: "4px" }}>
                Scoring IA Groq
              </strong>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                Comparaison sémantique avec mes 10 ans d'expérience QHSE, IA et gestion de projet.
              </p>
            </div>

            <div style={{ padding: "18px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "22px", display: "block", marginBottom: "8px" }}>3. ✍️</span>
              <strong style={{ display: "block", fontSize: "14px", color: "#0f172a", marginBottom: "4px" }}>
                Lettre Sur-Mesure
              </strong>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                Génération instantanée de la lettre adaptée avec signature et coordonnées complètes.
              </p>
            </div>

            <div style={{ padding: "18px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "22px", display: "block", marginBottom: "8px" }}>4. 📬</span>
              <strong style={{ display: "block", fontSize: "14px", color: "#0f172a", marginBottom: "4px" }}>
                Discord & Gmail
              </strong>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                Réception immédiate de l'alerte sur Discord et lettre prête à l'envoi sur Gmail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carte de contact & Accès rapide */}
      <section id="contact" style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div
          style={{
            background: "#0f172a",
            color: "#ffffff",
            borderRadius: "16px",
            padding: "40px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#60a5fa",
                textTransform: "uppercase",
                margin: "0 0 6px",
              }}
            >
              COORDONNÉES PROFESSIONNELLES
            </p>
            <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 12px", color: "#ffffff" }}>
              {userName}
            </h3>
            <p style={{ margin: "4px 0", color: "#94a3b8", fontSize: "14px" }}>
              ✉️ Email : <strong style={{ color: "#ffffff" }}>{userEmail}</strong>
            </p>
            <p style={{ margin: "4px 0", color: "#94a3b8", fontSize: "14px" }}>
              📞 Tél : <strong style={{ color: "#ffffff" }}>{userPhone}</strong>
            </p>
            <p style={{ margin: "4px 0", color: "#94a3b8", fontSize: "14px" }}>
              📍 {userLocation}
            </p>
          </div>

          <div>
            <Link
              href="/dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#2563eb",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Accéder au Tableau de Bord ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Pied de page épuré */}
      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          background: "#ffffff",
          padding: "24px",
          textAlign: "center",
          fontSize: "13px",
          color: "#64748b",
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 JobFlow · Espace personnel de <strong>{userName}</strong> · Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}

import { Footer, LandingNav } from "../components/chrome";
import { Button, StatusPulse } from "../components/ui";
import { DashboardPreview } from "../components/dashboard-preview";

const portals = ["LinkedIn", "indeed", "ReliefWeb", "impactpool", "emploicd", "Jobartis"];

const features = [
  {
    number: "01",
    title: "Recherche automatique",
    text: "JobFlow surveille chaque jour les portails qui comptent pour votre prochain poste.",
    icon: "radar",
  },
  {
    number: "02",
    title: "Matching IA",
    text: "Chaque offre est comparée à votre profil, à vos priorités et à votre expérience.",
    icon: "match",
  },
  {
    number: "03",
    title: "CV & lettres générés",
    text: "Des documents adaptés à l’offre, prêts à être relus et exportés en quelques secondes.",
    icon: "doc",
  },
  {
    number: "04",
    title: "Candidature en 1 clic",
    text: "Validez les candidatures sélectionnées. Vous gardez toujours la main avant l’envoi.",
    icon: "arrow",
  },
];

const steps = [
  ["01", "Créez votre profil", "Importez votre CV et indiquez le type de poste recherché."],
  ["02", "Laissez JobFlow chercher", "Nos agents surveillent les nouvelles offres sur vos portails."],
  ["03", "Validez les meilleures offres", "Consultez le score, ajustez vos documents puis envoyez."],
];

const plans = [
  {
    name: "Standard",
    price: "19",
    detail: "Pour chercher activement, sans perdre de temps.",
    items: ["3 portails surveillés", "25 candidatures / mois", "CV & lettres adaptés", "Validation en 1 clic"],
    featured: false,
  },
  {
    name: "Premium",
    price: "39",
    detail: "Pour accélérer une recherche exigeante et ciblée.",
    items: ["Tous les portails surveillés", "Candidatures illimitées", "Matching prioritaire", "Suivi avancé des réponses"],
    featured: true,
  },
];

function FeatureIcon({ kind }: { kind: string }) {
  if (kind === "radar") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 12 18 6M12 4v2M20 12h-2M12 20v-2M4 12h2" /><circle cx="12" cy="12" r="1.25" /></svg>;
  if (kind === "match") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h5v5H5zM14 14h5v5h-5zM9 10l6 4M15 5h4v4M5 15h4v4" /></svg>;
  if (kind === "doc") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7zM14 3v5h5M10 12h5M10 16h5" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 7l5 5-5 5" /><path d="M4 5v14" /></svg>;
}

export default function Home() {
  return (
    <main id="top">
      <LandingNav />

      <section className="hero shell" id="produit">
        <div className="hero-copy">
          <div className="eyebrow"><StatusPulse /> Recherche active</div>
          <h1>Votre recherche<br />d’emploi,<br /><em>automatisée.</em></h1>
          <p className="hero-description">JobFlow trouve les bonnes offres, adapte vos documents et vous laisse valider chaque candidature en un clic.</p>
          <div className="hero-actions">
            <Button href="#tarifs">Essayer gratuitement <span aria-hidden="true">↗</span></Button>
            <Button href="#comment-ca-marche" variant="dark">Voir comment ça marche <span aria-hidden="true">↓</span></Button>
          </div>
          <p className="hero-note">Aucune carte bancaire requise · 14 jours gratuits</p>
        </div>
        <DashboardPreview />
      </section>

      <section className="portal-section shell" aria-label="Portails surveillés">
        <p className="eyebrow">Portails surveillés</p>
        <div className="portal-strip">
          {portals.map((portal) => <span key={portal}>{portal}</span>)}
        </div>
      </section>

      <section className="features shell" aria-labelledby="features-title">
        <div className="section-intro">
          <p className="eyebrow">Un système, pas une to-do</p>
          <h2 id="features-title">Le travail répétitif<br />sort enfin de votre recherche.</h2>
          <p>Concentrez votre énergie sur les entretiens et les décisions qui font avancer votre carrière.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-top"><span className="feature-number">{feature.number}</span><FeatureIcon kind={feature.icon} /></div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow shell" id="comment-ca-marche" aria-labelledby="workflow-title">
        <div className="workflow-heading">
          <p className="eyebrow">Comment ça marche</p>
          <h2 id="workflow-title">Une recherche qui avance,<br />même quand vous dormez.</h2>
        </div>
        <div className="steps">
          {steps.map(([number, title, description]) => (
            <article className="step" key={number}>
              <span className="step-number">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <span className="step-arrow" aria-hidden="true">↘</span>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing shell" id="tarifs" aria-labelledby="pricing-title">
        <div className="pricing-heading"><p className="eyebrow">Des tarifs simples</p><h2 id="pricing-title">Choisissez votre rythme.</h2></div>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={`price-card ${plan.featured ? "price-card-featured" : ""}`} key={plan.name}>
              <div className="price-card-header"><div><p className="eyebrow">{plan.featured ? "Le plus choisi" : "Pour démarrer"}</p><h3>{plan.name}</h3></div>{plan.featured && <span className="plan-tag">RECOMMANDÉ</span>}</div>
              <p className="price-detail">{plan.detail}</p>
              <div className="price"><strong>{plan.price}$</strong><span>/ mois</span></div>
              <ul>{plan.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
              <Button href="#commencer" variant={plan.featured ? "light" : "ghost"}>Choisir {plan.name} <span aria-hidden="true">↗</span></Button>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta shell" id="commencer">
        <div><p className="eyebrow">Votre prochain poste commence ici</p><h2>Arrêtez de chercher.<br />Commencez à avancer.</h2></div>
        <div className="final-cta-action"><p>14 jours gratuits. Aucune carte bancaire. Résiliable à tout moment.</p><Button href="mailto:bonjour@jobflow.app" variant="dark">Essayer JobFlow <span aria-hidden="true">↗</span></Button></div>
      </section>

      <Footer />
    </main>
  );
}

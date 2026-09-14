import { StatusPulse } from "./ui";

const offers = [
  { title: "Responsable de programme", company: "ALIMA", score: "94%", scoreClass: "positive", status: "À valider" },
  { title: "Chef·fe de projet", company: "Médecins du Monde", score: "89%", scoreClass: "positive", status: "Documents prêts" },
  { title: "Chargé·e de partenariats", company: "Save the Children", score: "82%", scoreClass: "neutral", status: "En analyse" },
];

export function DashboardPreview() {
  return (
    <div className="dashboard-preview" aria-label="Aperçu du tableau de bord JobFlow">
      <div className="window-bar"><div className="traffic-lights"><i /><i /><i /></div><span>jobflow — recherche active</span><div className="window-live"><StatusPulse /> LIVE</div></div>
      <div className="preview-layout">
        <aside className="preview-sidebar"><span className="sidebar-logo">JF<span>_</span></span><span className="preview-side-active">▦</span><span>⌕</span><span>▤</span><span>◌</span></aside>
        <div className="preview-content">
          <div className="preview-title"><div><p className="eyebrow">Bonjour, Mariam</p><h2>Vos opportunités</h2></div><span className="week-label">SEMAINE 38</span></div>
          <div className="preview-metrics"><PreviewMetric label="Offres trouvées" value="38" delta="+12" /><PreviewMetric label="À valider" value="07" delta="aujourd’hui" accent="orange" /><PreviewMetric label="Taux de match" value="86%" delta="+4,2%" /></div>
          <div className="offer-list"><div className="offer-list-heading"><span>OFFRES RECOMMANDÉES</span><span>VOIR TOUTES →</span></div>{offers.map((offer) => <div className="mini-offer" key={offer.title}><div className="company-mark">{offer.company.slice(0, 1)}</div><div className="offer-name"><strong>{offer.title}</strong><span>{offer.company} · Kinshasa</span></div><div className={`score ${offer.scoreClass}`}>{offer.score}</div><span className="offer-status">{offer.status}</span><button aria-label={`Ouvrir ${offer.title}`}>→</button></div>)}</div>
        </div>
      </div>
    </div>
  );
}

function PreviewMetric({ label, value, delta, accent }: { label: string; value: string; delta: string; accent?: "orange" }) {
  return <div className="preview-metric"><span>{label}</span><strong>{value}</strong><small className={accent === "orange" ? "orange-text" : "green-text"}>{accent === "orange" ? "● " : "↗ "}{delta}</small></div>;
}

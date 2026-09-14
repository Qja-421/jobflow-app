import type { ReactNode } from "react";
import { StatusPulse } from "./ui";

type Trend = "positive" | "negative" | "neutral";

export function DashboardSidebar() {
  const navItems = [
    ["📋", "Offres", true],
    ["🚀", "Candidatures", false],
    ["📄", "CV & Lettres", false],
    ["⚙️", "Paramètres", false],
  ];

  return (
    <aside className="app-sidebar">
      <a className="app-logo" href="/" aria-label="Retour à l'accueil JobFlow">
        JOBFLOW<span>.AI</span>
      </a>
      <div className="app-user">
        <div className="avatar">MD</div>
        <div>
          <strong>Mariam Diallo</strong>
          <span>COMPTE PRO ACTIF</span>
        </div>
      </div>
      <nav className="app-nav" aria-label="Navigation du tableau de bord">
        {navItems.map(([icon, label, active]) => (
          <a className={active ? "active" : ""} href="#offres" key={label as string}>
            <i>{icon}</i>
            <span>{label as string}</span>
          </a>
        ))}
      </nav>
      <div className="app-sidebar-bottom">
        <a href="#aide">❓ <span>Centre d’aide</span></a>
        <a href="#compte">👤 <span>Mon compte</span></a>
      </div>
    </aside>
  );
}

export function MetricTile({ label, value, trend, trendText, children }: { label: string; value: string; trend: Trend; trendText: string; children: ReactNode }) {
  const symbol = trend === "positive" ? "↗" : trend === "negative" ? "↘" : "●";
  return <article className="metric-tile"><p>{label}</p><div className="metric-value"><strong>{value}</strong><span className={`metric-trend ${trend}`}>{symbol} {trendText}</span></div><div className={`sparkline ${trend}`}>{children}</div></article>;
}

export function ApplicationStatus({ status }: { status: "Envoyée" | "En attente" | "Réponse reçue" }) {
  const className = status === "Réponse reçue" ? "response" : status === "En attente" ? "waiting" : "sent";
  return <span className={`application-status ${className}`}><i />{status}</span>;
}

export function LiveLabel() {
  return <span className="live-label"><StatusPulse /> Recherche active</span>;
}

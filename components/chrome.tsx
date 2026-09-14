import { Button } from "./ui";

const footerColumns = [
  { title: "Produit", links: ["Comment ça marche", "Tarifs", "Portails supportés"] },
  { title: "Ressources", links: ["Centre d’aide", "Guides emploi", "Nous contacter"] },
  { title: "Légal", links: ["Confidentialité", "Conditions", "Mentions légales"] },
];

export function LandingNav() {
  return (
    <header className="site-header shell">
      <a className="wordmark" href="#top" aria-label="JobFlow, accueil">JOBFLOW<span>_</span></a>
      <nav aria-label="Navigation principale"><a href="#produit">Produit</a><a href="#comment-ca-marche">Comment ça marche</a><a href="#tarifs">Tarifs</a><a href="mailto:bonjour@jobflow.app">Contact</a></nav>
      <Button href="#tarifs">Essayer <span aria-hidden="true">↗</span></Button>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer shell">
      <div className="footer-main"><div><a className="wordmark" href="#top">JOBFLOW<span>_</span></a><p>Votre recherche d’emploi, automatisée.</p></div><div className="footer-links">{footerColumns.map((column) => <div key={column.title}><p className="eyebrow">{column.title}</p>{column.links.map((link) => <a href="#top" key={link}>{link}</a>)}</div>)}</div></div>
      <div className="footer-bottom"><span>© 2026 JobFlow</span><span>Fait pour les chercheurs d’emploi qui avancent.</span></div>
    </footer>
  );
}

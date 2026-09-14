import type { ReactNode } from "react";

type ButtonProps = { href: string; children: ReactNode; variant?: "light" | "dark" | "ghost" };

export function Button({ href, children, variant = "light" }: ButtonProps) {
  return <a className={`button button-${variant}`} href={href}>{children}</a>;
}

export function StatusPulse() {
  return <span className="status-pulse" aria-hidden="true" />;
}

import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`.trim()}>{children}</div>;
}

export function PrimaryButton({
  children,
  href = "#verify",
  className = "",
  size = "default",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "default" | "large";
}) {
  const sizeClass = size === "large" ? "btn-primary btn-primary-lg" : "btn-primary";
  return (
    <a href={href} className={`${sizeClass} ${className}`.trim()}>
      {children}
    </a>
  );
}

export function TextLink({ children, href, className = "" }: { children: ReactNode; href: string; className?: string }) {
  return (
    <a href={href} className={`text-link ${className}`.trim()}>
      {children}
    </a>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`section-title ${className}`.trim()}>{children}</h2>;
}

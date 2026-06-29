import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`.trim()}>{children}</div>;
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  size?: "default" | "large";
  variant?: "primary" | "secondary" | "accent";
};

export function PrimaryButton({
  children,
  href = "#book-call",
  className = "",
  size = "default",
  variant = "primary",
}: ButtonProps) {
  const variantClass =
    variant === "secondary" ? "btn-secondary" : variant === "accent" ? "btn-accent" : "btn-primary";
  const sizeClass = size === "large" ? "btn-primary-lg" : "";
  return (
    <a href={href} className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}>
      {children}
    </a>
  );
}

export function SecondaryButton({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a href={href} className={`btn btn-secondary ${className}`.trim()}>
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

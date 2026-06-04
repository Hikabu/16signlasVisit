import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type ButtonVariant = "accent" | "primary" | "secondary" | "glass";
type ButtonSize = "default" | "large";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const variantClass: Record<ButtonVariant, string> = {
  accent: "btn-accent",
  glass: "btn-glass",
  primary: "btn-primary",
  secondary: "btn-secondary",
};

export function ButtonLink({
  children,
  className,
  size = "default",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn("btn", variantClass[variant], size === "large" && "btn-lg", className)} {...props}>
      {children}
    </a>
  );
}

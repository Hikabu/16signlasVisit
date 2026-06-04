import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function TextLink({ children, className, ...props }: TextLinkProps) {
  return (
    <a className={cn("text-link", className)} {...props}>
      {children}
    </a>
  );
}

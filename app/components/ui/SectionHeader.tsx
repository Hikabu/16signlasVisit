import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({ body, className, eyebrow, title, titleClassName }: SectionHeaderProps) {
  return (
    <div className={cn("section-header", className)}>
      {eyebrow ? <p className="section-label">{eyebrow}</p> : null}
      {/* Change this line 👇 */}
      <h2 className={cn("section-title", eyebrow ? "mt-4" : undefined, titleClassName)}>
        {title}
      </h2>
      {body ? <p className="body-lg mt-[var(--space-6)]">{body}</p> : null}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

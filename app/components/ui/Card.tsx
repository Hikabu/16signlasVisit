import type { HTMLAttributes } from "react";
import { cn } from "@/app/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div";
};

export function Card({ as: Component = "article", className, ...props }: CardProps) {
  return <Component className={cn("card", className)} {...props} />;
}

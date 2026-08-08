"use client";

import { ComponentPropsWithoutRef, ElementType, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/cn";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  rootMargin = "0px 0px -24% 0px",
  threshold = 0.24,
  ...props
}: RevealProps<T>) {
  const Component: ElementType = as || "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold, visible]);

  // Merge the ref + state props into one typed object so the polymorphic
  // element (`as`) is checked against a single intrinsic props shape.
  return (
    <Component
      {...({
        ref,
        "data-visible": visible ? "true" : "false",
        className: cn("scroll-reveal", className),
        ...props,
      } as ComponentPropsWithoutRef<T>)}
    >
      {children}
    </Component>
  );
}

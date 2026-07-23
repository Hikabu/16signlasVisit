import { useEffect, useRef, useState, type RefObject } from "react";

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -12% 0px",
}: ScrollRevealOptions = {}): {
  ref: RefObject<T | null>;
  isRevealed: boolean;
} {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isRevealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsRevealed(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isRevealed, rootMargin, threshold]);

  return { ref, isRevealed };
}

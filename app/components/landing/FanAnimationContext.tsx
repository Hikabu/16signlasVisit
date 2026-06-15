"use client";

/**
 * FanAnimationContext
 * --------------------
 * Provides normalized scroll progress (0→1) across the fan-to-logo animation
 * lifecycle. All animation components read from this single source of truth
 * to stay synchronized without tight coupling.
 *
 * Scroll phases:
 *   0.00–0.15  Fan reveal (CSS-driven, timed delay)
 *   0.15–0.55  Fan ribs → flowing lines (scroll-driven)
 *   0.55–0.80  Lines persist, float with gentle pulse
 *   0.80–1.00  Lines converge into logo (scroll-driven)
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type FanAnimationState = {
  /** 0 = hero top, 1 = product section reached */
  progress: number;
  /** Whether the fan reveal animation has fired (one-time) */
  hasRevealed: boolean;
  /** Current phase name for conditional rendering */
  phase: "idle" | "reveal" | "stretching" | "floating" | "converging";
};

const FanAnimationCtx = createContext<FanAnimationState>({
  progress: 0,
  hasRevealed: false,
  phase: "idle",
});

export function useFanAnimation() {
  return useContext(FanAnimationCtx);
}

/** Raw scroll-normalized value before phase mapping */
type InternalState = {
  rawProgress: number;
  hasRevealed: boolean;
};

export function FanAnimationProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<InternalState>({ rawProgress: 0, hasRevealed: false });
  const [state, setState] = useState<FanAnimationState>({
    progress: 0,
    hasRevealed: false,
    phase: "idle",
  });
  const rafRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const derivePhase = useCallback(
    (raw: number, revealed: boolean): FanAnimationState => {
      if (!revealed) return { progress: 0, hasRevealed: false, phase: "idle" };

      let phase: FanAnimationState["phase"];
      if (raw < 0.15) phase = "reveal";
      else if (raw < 0.55) phase = "stretching";
      else if (raw < 0.80) phase = "floating";
      else phase = "converging";

      return { progress: raw, hasRevealed: true, phase };
    },
    []
  );

  useEffect(() => {
    // Skip reveal delay for reduced-motion users
    if (reducedMotion.current) {
      stateRef.current.hasRevealed = true;
      setState(derivePhase(0, true));
      return;
    }

    const revealTimer = window.setTimeout(() => {
      stateRef.current.hasRevealed = true;
      setState((prev) => ({
        ...prev,
        hasRevealed: true,
        phase: prev.progress < 0.15 ? "reveal" : prev.phase,
      }));
    }, 2500);

    return () => window.clearTimeout(revealTimer);
  }, [derivePhase]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;

        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;
        // Total animation distance: 1.5 viewport heights
        const totalDistance = heroHeight * 1.5;
        const raw = Math.min(1, Math.max(0, scrollY / totalDistance));

        const prev = stateRef.current.rawProgress;
        stateRef.current.rawProgress = raw;

        // Only update state if changed meaningfully (throttle re-renders)
        if (Math.abs(raw - prev) > 0.005) {
          setState(derivePhase(raw, stateRef.current.hasRevealed));
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [derivePhase]);

  return (
    <FanAnimationCtx.Provider value={state}>{children}</FanAnimationCtx.Provider>
  );
}

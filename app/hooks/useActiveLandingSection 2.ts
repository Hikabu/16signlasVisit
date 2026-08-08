"use client";

import { useEffect, useState } from "react";
import { LANDING_SECTION_IDS } from "@/app/data/landing";

export function useActiveLandingSection(enabled = true) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (!enabled) return;

    const updateActiveSection = () => {
      const threshold = window.innerHeight * 0.38;
      let currentSection = "hero";

      for (const sectionId of LANDING_SECTION_IDS) {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top <= threshold) {
          currentSection = sectionId;
        }
      }

      setActiveSection((current) =>
        current === currentSection ? current : currentSection,
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [enabled]);

  return enabled ? activeSection : null;
}

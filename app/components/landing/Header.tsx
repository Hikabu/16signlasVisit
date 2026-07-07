"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_SECONDARY_CTA, NAV_CTA, NAV_LINKS } from "@/app/lib/landing/constants";
import { IconClose, IconMenu } from "./icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-200 ${
          scrolled
            ? "border-b border-white/8 bg-[#08090b]/90 backdrop-blur-md"
            : "border-b border-white/5 bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container flex h-full items-center justify-between gap-4">
          <a href="#" className="flex shrink-0 items-center gap-2" aria-label="16 Signals home">
            <Image src="/a16zero.png" alt="" width={28} height={28} className="h-7 w-7 opacity-80" priority />
            <span
              className="text-sm font-medium tracking-tight"
              style={{ color: scrolled ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.56)" }}
            >
              16 Signals
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.38)",
                  letterSpacing: "-0.01em" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.68)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)"; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Nav CTA: quiet hairline, no fill, no pill — recessive by design */}
            <a
              href="#book-call"
              className="hidden md:inline-flex items-center font-sans"
              style={{
                padding: "7px 14px",
                fontSize: "13px",
                fontWeight: 420,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.42)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "2px",
                background: "transparent",
                textDecoration: "none",
                transition: "border-color 150ms, color 150ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.22)";
                el.style.color = "rgba(255,255,255,0.64)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.10)";
                el.style.color = "rgba(255,255,255,0.42)";
              }}
            >
              {HERO_SECONDARY_CTA}
            </a>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] border md:hidden"
              style={{ borderColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.52)" }}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08090b] pt-[var(--nav-height)] md:hidden">
          <nav className="container flex flex-col gap-6 py-8" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base"
                style={{ color: "rgba(255,255,255,0.64)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book-call"
              className="mt-4 inline-flex items-center font-sans"
              style={{
                padding: "10px 18px",
                fontSize: "14px",
                fontWeight: 420,
                color: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(255,255,255,0.20)",
                borderRadius: "2px",
                background: "transparent",
                textDecoration: "none",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {NAV_CTA}
            </a>
          </nav>
        </div>
      )}

      <div aria-hidden className="h-[var(--nav-height)] shrink-0" />
    </>
  );
}

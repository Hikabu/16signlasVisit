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
            ? "border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 shadow-[var(--shadow-1)] backdrop-blur-md"
            : "border-b border-white/10 bg-transparent text-white"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container flex h-full items-center justify-between gap-4">
          <a href="#" className="flex shrink-0 items-center gap-2" aria-label="16 Signals home">
            <Image src="/a16zero.png" alt="" width={32} height={32} className="h-8 w-8" priority />
            <span className={`text-sm font-medium tracking-tight ${scrolled ? "text-[color:var(--foreground)]" : "text-white"}`}>
              16 Signals
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  scrolled ? "text-[color:var(--muted)] hover:text-[color:var(--foreground)]" : "text-white/68 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#how-it-works"
              className={`btn hidden md:inline-flex ${
                scrolled
                  ? "btn-secondary"
                  : "border border-white/12 bg-white/8 text-white shadow-none backdrop-blur-md hover:bg-white/14"
              }`}
            >
              {HERO_SECONDARY_CTA}
            </a>
            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-base)] border md:hidden ${
                scrolled ? "border-[color:var(--border)] text-[color:var(--foreground)]" : "border-white/12 text-white"
              }`}
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
        <div className="fixed inset-0 z-40 bg-[color:var(--surface)] pt-[var(--nav-height)] md:hidden">
          <nav className="container flex flex-col gap-6 py-8" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-[color:var(--foreground)]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#verify" className="btn btn-primary mt-4" onClick={() => setMenuOpen(false)}>
              {NAV_CTA}
            </a>
          </nav>
        </div>
      )}

      <a
        href="#verify"
        className="btn btn-primary fixed bottom-4 left-4 right-4 z-50 shadow-[var(--shadow-2)] md:!hidden"
        style={{ maxWidth: "calc(100% - 2rem)", marginInline: "auto" }}
      >
        {NAV_CTA}
      </a>

      <div aria-hidden className="h-[var(--nav-height)] shrink-0" />
    </>
  );
}

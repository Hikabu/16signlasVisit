"use client";

import { useEffect, useState } from "react";
import { NAV_CTA, NAV_LINKS, PRODUCT_NAME } from "@/app/lib/landing/constants";
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
        className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container flex h-full items-center justify-between gap-4">
          <a href="#" className="text-sm font-medium tracking-tight text-[color:var(--foreground)]">
            {PRODUCT_NAME}
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-normal text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#verify" className="btn-primary hidden md:inline-flex">
              {NAV_CTA}
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--border)] md:hidden"
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
                className="text-lg text-[color:var(--foreground)]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <a
        href="#verify"
        className="btn-primary fixed bottom-4 left-4 right-4 z-50 shadow-lg md:hidden"
        style={{ maxWidth: "calc(100% - 2rem)", marginInline: "auto" }}
      >
        {NAV_CTA}
      </a>

      <div aria-hidden className="h-[var(--nav-height)] shrink-0" />
    </>
  );
}

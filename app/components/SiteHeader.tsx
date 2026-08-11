"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HERO_NAVIGATION } from "@/app/data/landing";
import { useActiveLandingSection } from "@/app/hooks/useActiveLandingSection";
import { useIsScrolled } from "@/app/hooks/useIsScrolled";
import styles from "./SiteHeader.module.css";

const mainNavigation = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Pricing", href: "/pricing" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const isScrolled = useIsScrolled(18);
  const isHome = pathname === "/";
  const activeSection = useActiveLandingSection(isHome);
  const hasSolidBackground = pathname !== "/" || isScrolled;
  const isBookCallActive = isHome && activeSection === "book-call";
  const activeNavigationItem = HERO_NAVIGATION.find(
    (item) => item.sectionId === activeSection,
  );

  const toggleHomeMenu = () => setIsHomeMenuOpen((open) => !open);

  return (
    <header
      className={`${styles.header} ${
        hasSolidBackground ? styles.headerScrolled : ""
      }`}
    >
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="16 Signals home">
          <Image
            className={styles.brandMark}
            src="/a16zero.png"
            alt=""
            width={1024}
            height={1024}
            priority
          />
          <span>16 Signals</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <div
            className={styles.homeMenu}
            onMouseEnter={() => setIsHomeMenuOpen(true)}
            onMouseLeave={() => setIsHomeMenuOpen(false)}
            onFocus={() => setIsHomeMenuOpen(true)}
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setIsHomeMenuOpen(false);
              }
            }}
          >
            <div className={styles.homeMenuTrigger}>
              {isHome ? (
                <button
                  type="button"
                  className={`${styles.homeMenuLabel} activeNav`}
                  onClick={toggleHomeMenu}
                  aria-expanded={isHomeMenuOpen}
                  aria-controls="homepage-section-menu"
                >
                  <span>What is 16Signals</span>
                  {activeNavigationItem ? (
                    <span
                      className={styles.activeSectionSlot}
                      aria-live="polite"
                    >
                      <span
                        key={activeNavigationItem.sectionId}
                        className={`${styles.activeSection} activeNav`}
                      >
                        {activeNavigationItem.label}
                      </span>
                    </span>
                  ) : null}
                </button>
              ) : (
                <Link href="/" className={styles.homeMenuLabel}>
                  <span>What is 16Signals</span>
                </Link>
              )}
              <button
                type="button"
                className={styles.menuToggle}
                onClick={toggleHomeMenu}
                aria-expanded={isHomeMenuOpen}
                aria-controls="homepage-section-menu"
                aria-label="Show homepage sections"
              >
                <span aria-hidden="true">⌄</span>
              </button>
            </div>

            <div
              id="homepage-section-menu"
              className={`${styles.dropdown} ${
                isHomeMenuOpen ? styles.dropdownOpen : ""
              }`}
            >
              <p>On this page</p>
              {HERO_NAVIGATION.map((item) => {
                const isSectionActive =
                  isHome && activeSection === item.sectionId;

                return (
                  <Link
                    key={item.href}
                    href={`/${item.href}`}
                    className={isSectionActive ? "activeNav" : undefined}
                    aria-current={isSectionActive ? "location" : undefined}
                    onClick={() => setIsHomeMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {mainNavigation.map((item) => {
            const isResearchRoute =
              item.href === "/blog" && pathname.startsWith("/research");
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              isResearchRoute;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "activeNav" : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.headerActions}>
          <Link
            className={`${styles.contactLink} ${
              isBookCallActive ? "activeNav" : ""
            }`}
            href="/#book-call"
            aria-current={isBookCallActive ? "location" : undefined}
          >
            Contact us
          </Link>
        </div>
      </div>
    </header>
  );
}

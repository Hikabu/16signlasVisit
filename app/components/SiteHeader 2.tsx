"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveLandingSection } from "@/app/hooks/useActiveLandingSection";
import { useIsScrolled } from "@/app/hooks/useIsScrolled";
import styles from "./SiteHeader.module.css";

const mainNavigation = [
  { label: "Blog", href: "/blog", homeSection: "research" },
  { label: "FAQ", href: "/faq", homeSection: "faq" },
  { label: "Pricing", href: "/pricing", homeSection: "pricing" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isScrolled = useIsScrolled(18);
  const activeSection = useActiveLandingSection(pathname === "/");
  const hasSolidBackground = pathname !== "/" || isScrolled;

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
          {mainNavigation.map((item) => {
            const isResearchRoute =
              item.href === "/blog" && pathname.startsWith("/research");
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              isResearchRoute ||
              (pathname === "/" && activeSection === item.homeSection);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? styles.activeNav : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.headerActions}>
          <Link className={styles.headerCta} href="/#book-call">
            Run it on your work
          </Link>
          <Link className={styles.contactLink} href="/#book-call">
            Call us
          </Link>
        </div>
      </div>
    </header>
  );
}

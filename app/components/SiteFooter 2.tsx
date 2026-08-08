"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HERO_NAVIGATION } from "@/app/data/landing";
import { useActiveLandingSection } from "@/app/hooks/useActiveLandingSection";
import styles from "./SiteFooter.module.css";

const pages = [
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Pricing", href: "/pricing" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const activeSection = useActiveLandingSection(pathname === "/");

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <Link href="/" className={styles.brand} aria-label="16 Signals home">
            <Image src="/a16zero.png" alt="" width={28} height={28} />
            <span>16 Signals</span>
          </Link>
          <p>See the work. Know what to ask.</p>
        </div>

        <div className={styles.linkColumns}>
          <div>
            <p className={styles.columnTitle}>Page map</p>
            <nav aria-label="Homepage sections">
              {HERO_NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={`/${item.href}`}
                  className={
                    pathname === "/" && activeSection === item.sectionId
                      ? styles.activeNav
                      : undefined
                  }
                  aria-current={
                    pathname === "/" && activeSection === item.sectionId
                      ? "location"
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className={styles.columnTitle}>Pages</p>
            <nav aria-label="Pages">
              {pages.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    pathname === item.href ||
                    (item.href === "/research" &&
                      pathname.startsWith("/research/"))
                      ? styles.activeNav
                      : undefined
                  }
                  aria-current={
                    pathname === item.href ||
                    (item.href === "/research" &&
                      pathname.startsWith("/research/"))
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className={styles.columnTitle}>Legal</p>
            <nav aria-label="Legal">
              <Link href="/terms">Terms &amp; Conditions</Link>
            </nav>
          </div>
        </div>
      </div>

      <div className={styles.bottomLine}>
        <p>© 16Signals. All rights reserved.</p>
      </div>
    </footer>
  );
}

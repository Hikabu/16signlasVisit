"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HERO_NAVIGATION } from "@/app/data/landing";
import { useActiveLandingSection } from "@/app/hooks/useActiveLandingSection";
import styles from "./SiteFooter.module.css";

const pages = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Pricing", href: "/pricing" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveLandingSection(isHome);

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
            <p className={styles.columnTitle}>Pages</p>
            <nav aria-label="Pages">
              {pages.map((item) => {
                const matchingHomepageSection =
                  item.href === "/research"
                    ? "research"
                    : item.href === "/faq"
                      ? "faq"
                      : item.href === "/pricing"
                        ? "pricing"
                        : null;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`) ||
                  (isHome && activeSection === matchingHomepageSection);
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
          </div>

          <div>
            <p className={styles.columnTitle}>Legal</p>
            <nav aria-label="Legal">
              <Link
                href="/terms"
                className={pathname === "/terms" ? "activeNav" : undefined}
                aria-current={pathname === "/terms" ? "page" : undefined}
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/privacy"
                className={pathname === "/privacy" ? "activeNav" : undefined}
                aria-current={pathname === "/privacy" ? "page" : undefined}
              >
                Privacy Policy
              </Link>
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

"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import styles from "./page.module.css";

export function ArticleReadingSurface({
  category,
  children,
}: {
  category: string;
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  return (
    <section
      className={`${styles.readingSurface} ${
        isDark ? styles.readingSurfaceDark : ""
      }`}
    >
      <div className={styles.readingToolbar}>
        <div className={styles.publisher}>
          <Image src="/a16zero.png" alt="" width={42} height={42} />
          <div>
            <strong>16 Signals Research</strong>
            <span>{category}</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={() => setIsDark((current) => !current)}
          aria-pressed={isDark}
          aria-label={
            isDark
              ? "Switch article to light reading mode"
              : "Switch article to dark reading mode"
          }
        >
          <span className={!isDark ? styles.themeOptionActive : ""}>Light</span>
          <span className={isDark ? styles.themeOptionActive : ""}>Dark</span>
        </button>
      </div>

      <div className={styles.body}>{children}</div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ContactMethodSwitch } from "@/app/components/ContactMethodSwitch";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import type { FaqItem } from "@/app/lib/content";
import styles from "./page.module.css";

const CATEGORIES = [
  { label: "General", value: "general" },
  { label: "Technical", value: "technical" },
  { label: "Legal", value: "legal" },
] as const;

type FaqCategory = (typeof CATEGORIES)[number]["value"];

export function FaqContent({ items }: { items: readonly FaqItem[] }) {
  const [category, setCategory] = useState<FaqCategory>(CATEGORIES[0].value);
  const categoryItems = items.filter((item) => item.category === category);

  return (
    <section className={styles.faqs} aria-label="Frequently asked questions">
      <div className={styles.sideNote}>
        <p>{String(items.length).padStart(2, "0")} questions</p>
      </div>

      <div className={styles.content}>
        <ContactMethodSwitch
          value={category}
          onChange={setCategory}
          prompt="Browse by category"
          options={CATEGORIES}
        />
        <FaqAccordion items={categoryItems} />
      </div>
    </section>
  );
}

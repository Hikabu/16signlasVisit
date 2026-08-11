"use client";

import { useId } from "react";
import styles from "./ContactMethodSwitch.module.css";

export type ContactMethod = "call" | "write";

export type ContactMethodOption<T extends string> = {
  label: string;
  value: T;
};

type ContactMethodSwitchProps<T extends string> = {
  value: T;
  onChange: (method: T) => void;
  prompt?: string;
  options?: readonly ContactMethodOption<T>[];
};

const DEFAULT_OPTIONS: readonly ContactMethodOption<ContactMethod>[] = [
  { label: "Book a call", value: "call" },
  { label: "Write to us", value: "write" },
];

export function ContactMethodSwitch<T extends string>({
  value,
  onChange,
  prompt = "How would you like to talk?",
  options,
}: ContactMethodSwitchProps<T>) {
  const labelId = useId();
  const switchOptions: readonly ContactMethodOption<T>[] =
    options ?? (DEFAULT_OPTIONS as readonly ContactMethodOption<T>[]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.prompt} id={labelId}>
        {prompt}
      </p>

      <div className={styles.switch} role="group" aria-labelledby={labelId}>
        {switchOptions.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              className={`${styles.option} ${
                isActive ? styles.activeOption : ""
              }`}
              onClick={() => onChange(option.value)}
            >
              <span className={isActive ? "activeNav" : undefined}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

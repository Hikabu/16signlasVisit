import styles from "./ContactMethodSwitch.module.css";

export type ContactMethod = "call" | "write";

type ContactMethodSwitchProps = {
  value: ContactMethod;
  onChange: (method: ContactMethod) => void;
};

const OPTIONS: { label: string; value: ContactMethod }[] = [
  { label: "Book a call", value: "call" },
  { label: "Write to us", value: "write" },
];

export function ContactMethodSwitch({
  value,
  onChange,
}: ContactMethodSwitchProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.prompt} id="contact-method-label">
        How would you like to talk?
      </p>

      <div
        className={styles.switch}
        role="group"
        aria-labelledby="contact-method-label"
      >
        {OPTIONS.map((option) => {
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

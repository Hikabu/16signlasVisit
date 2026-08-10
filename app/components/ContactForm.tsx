"use client";

import { useForm, ValidationError } from "@formspree/react";
import styles from "./ContactForm.module.css";

const FORMSPREE_FORM_ID = "mppapvzk";

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <p className={styles.successEyebrow}>Message sent</p>
        <h3>Thanks for reaching out.</h3>
        <p>We’ll reply by email.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="contact-email">Work email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
        <ValidationError
          className={styles.error}
          field="email"
          prefix="Email"
          errors={state.errors}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-company">
          Company <span>Optional</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Your company"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell us what you’re working on."
          required
        />
        <ValidationError
          className={styles.error}
          field="message"
          prefix="Message"
          errors={state.errors}
        />
      </div>

      <ValidationError className={styles.formError} errors={state.errors} />

      <div className={styles.actions}>
        <button
          className="btn btn-accent"
          type="submit"
          disabled={state.submitting}
        >
          {state.submitting ? "Sending…" : "Send message"}
        </button>
        <p>We’ll reply by email.</p>
      </div>
    </form>
  );
}

"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { ContactForm } from "@/app/components/ContactForm";
import {
  ContactMethodSwitch,
  type ContactMethod,
} from "@/app/components/ContactMethodSwitch";
import { LargeWord } from "@/app/components/LargeWord";
import { BOOK_CALL_CTA } from "@/app/data/landing";
import styles from "./BookCall.module.css";

export function BookCall() {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("call");

  useEffect(() => {
    const setupCal = async () => {
      const cal = await getCalApi({
        namespace: "product-explore",
      });

      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    void setupCal();
  }, []);

  return (
    <section
      id="book-call"
      className="landing-section relative isolate overflow-hidden pt-24 pb-20"
    >
      <LargeWord className="left-[8vw] top-4">TRUST</LargeWord>

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">Book a call</p>

          <h2 className="section-title mt-4 text-white">
            See what real work reveals before the interview.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-[color:var(--muted-strong)]">
            Bring us a role and your current hiring process. We will show where
            16Signals fits before your next hiring cycle.
          </p>

          <a
            href="#booking-calendar"
            className="btn btn-accent mt-8 min-w-[220px]"
          >
            {BOOK_CALL_CTA}
          </a>
        </div>
      </div>

      <div className={styles.contactSurface}>
        <ContactMethodSwitch
          value={contactMethod}
          onChange={setContactMethod}
        />

        <div
          id="booking-calendar"
          className={styles.methodPanel}
          aria-live="polite"
        >
          {contactMethod === "call" ? (
            <div
              key="call"
              className={`${styles.view} ${styles.calendarView}`}
            >
              <Cal
                namespace="product-explore"
                calLink="16-signals/quick-chat"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                config={{
                  layout: "month_view",
                  useSlotsViewOnSmallScreen: "true",
                }}
              />
            </div>
          ) : (
            <div
              key="write"
              className={`${styles.view} ${styles.formView}`}
            >
              <ContactForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

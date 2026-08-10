"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { ContactForm } from "@/app/components/ContactForm";
import {
  ContactMethodSwitch,
  type ContactMethod,
} from "@/app/components/ContactMethodSwitch";
import { LargeWord } from "@/app/components/LargeWord";
import styles from "./BookCall.module.css";

export function BookCall() {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("call");

  const activateContactMethod = (method: ContactMethod) => {
    setContactMethod(method);
    window.history.replaceState(
      null,
      "",
      method === "write" ? "#write-to-us" : "#book-call",
    );
  };

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

  useEffect(() => {
    const syncContactMethodWithHash = () => {
      if (window.location.hash === "#write-to-us") {
        setContactMethod("write");
      } else if (
        window.location.hash === "#book-call" ||
        window.location.hash === "#booking-calendar"
      ) {
        setContactMethod("call");
      }
    };

    syncContactMethodWithHash();
    window.addEventListener("hashchange", syncContactMethodWithHash);

    return () =>
      window.removeEventListener("hashchange", syncContactMethodWithHash);
  }, []);

  return (
    <section
      id="book-call"
      className="landing-section relative isolate overflow-hidden pt-24 pb-20"
    >
      <LargeWord className="left-[8vw] top-4">TRUST</LargeWord>

      <div className="container">
        <div className={styles.sectionIntro}>
          <div className={styles.introCopy}>
            <p className="section-label">Book a call</p>

            <h2 className="section-title mt-4 text-white">
              See what real work reveals before the interview.
            </h2>

            <p className="mt-5 max-w-2xl text-lg text-[color:var(--muted-strong)]">
              Bring us a role and your current hiring process. We will show
              where 16Signals fits before your next hiring cycle.
            </p>
          </div>

          <ContactMethodSwitch
            value={contactMethod}
            onChange={activateContactMethod}
          />
        </div>
      </div>

      <div className={styles.contactSurface}>
        <div
          id="booking-calendar"
          className={styles.workspace}
          data-active-method={contactMethod}
        >
          <section
            className={`${styles.panel} ${
              contactMethod === "call"
                ? styles.activePanel
                : styles.inactivePanel
            }`}
            aria-labelledby="call-panel-title"
          >
            <header className={styles.panelHeader}>
              <span className={styles.panelNumber}>01</span>
              <div>
                <h3 id="call-panel-title">Book a call</h3>
                <p>Choose a time that works for you.</p>
              </div>
            </header>

            <div className={`${styles.panelBody} ${styles.calendarView}`}>
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

            {contactMethod !== "call" && (
              <button
                type="button"
                className={styles.panelActivator}
                onClick={() => activateContactMethod("call")}
                aria-label="Activate Book a call"
              />
            )}
          </section>

          <section
            id="write-to-us"
            className={`${styles.panel} ${
              contactMethod === "write"
                ? styles.activePanel
                : styles.inactivePanel
            }`}
            aria-labelledby="write-panel-title"
          >
            <header className={styles.panelHeader}>
              <span className={styles.panelNumber}>02</span>
              <div>
                <h3 id="write-panel-title">Write to us</h3>
                <p>Tell us what you’re working on.</p>
              </div>
            </header>

            <div className={`${styles.panelBody} ${styles.formView}`}>
              <ContactForm />
            </div>

            {contactMethod !== "write" && (
              <button
                type="button"
                className={styles.panelActivator}
                onClick={() => activateContactMethod("write")}
                aria-label="Activate Write to us"
              />
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

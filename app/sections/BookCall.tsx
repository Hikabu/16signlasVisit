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
  const [contactMethod, setContactMethod] = useState<ContactMethod>("write");

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
      className={`${styles.section} landing-section relative isolate overflow-hidden`}
    >
      <LargeWord className="right-[6vw] top-4">TRUST</LargeWord>

      <div className="container">
        <div className={styles.sectionIntro}>
          <div className={styles.introCopy}>
            <p className="section-label">Contact us</p>

            <h2 className="section-title mt-4 text-white">
              See what real work reveals before the interview.
            </h2>

            <div className={styles.introSwitch}>
              <ContactMethodSwitch
                value={contactMethod}
                onChange={activateContactMethod}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="write-to-us" className={styles.contactSurface}>
        <div
          id="booking-calendar"
          className={styles.methodPanel}
          aria-live="polite"
        >
          {contactMethod === "call" ? (
            <div key="call" className={`${styles.view} ${styles.calendarView}`}>
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
            <div key="write" className={`${styles.view} ${styles.formView}`}>
              <ContactForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

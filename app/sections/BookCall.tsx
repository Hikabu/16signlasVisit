"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/app/components/ContactForm";
import { type ContactMethod } from "@/app/components/ContactMethodSwitch";
import styles from "./BookCall.module.css";

export function BookCall() {
  const [contactMethod, setContactMethod] = useState<ContactMethod>("write");
  const contentRef = useRef<HTMLDivElement>(null);

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
    const content = contentRef.current;
    if (!content) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          content.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(content);
    return () => observer.disconnect();
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
      className={styles.section}
      aria-labelledby="closing-title"
    >
      <div className={styles.frame}>
        <div className={styles.atmosphere} aria-hidden="true">
          <span className={`${styles.light} ${styles.tealLight}`} />
          <span className={`${styles.light} ${styles.coralLight}`} />
          <span className={`${styles.light} ${styles.amberLight}`} />
          <span className={`${styles.light} ${styles.blueLight}`} />
          <span className={styles.grain} />
        </div>

        <div className={styles.content} ref={contentRef} data-visible="false">
          <div className={styles.statement}>
            <p className={styles.eyebrow}>Behind every application</p>

            <h2 id="closing-title" className={styles.statementTitle}>
              Don't interview<br />a resume
            </h2>

            <p className={styles.statementBody}>
              There is a real person behind the application. Their work already
              contains years of decisions, mistakes, trade-offs,
              collaboration and progress.
            </p>

            <p className={styles.statementCloser}>
              <strong>16Signals doesn't decide who they are.</strong>
              It helps you see enough of their work to ask better questions
              when you meet them.
            </p>
          </div>

          <div className={styles.ctaBlock}>
            <div className={styles.ctaCopy}>
              <h3>Bring us one candidate you're actually considering.</h3>
              <p>
                We'll show you what you could have known before the interview.
              </p>

              <div className={styles.ctaActions}>
                <a
                  id="cta-run-candidate"
                  href="#write-to-us"
                  className={styles.primaryCta}
                  onClick={() => activateContactMethod("write")}
                >
                  Run it on a candidate
                  <span aria-hidden="true">→</span>
                </a>

                <a
                  href="#booking-calendar"
                  className={styles.secondaryCta}
                  onClick={() => activateContactMethod("call")}
                >
                  Book a call
                </a>
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
                      style={{ width: "100%", height: "100%" }}
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
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import styles from "./PricingSection.module.css";

export function PricingSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      id="pricing"
      className={`${styles.section} ${standalone ? styles.standalone : ""}`}
      aria-labelledby={standalone ? "pricing-page-title" : "home-pricing-title"}
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Pricing</p>
          <h2 id={standalone ? "pricing-page-title" : "home-pricing-title"}>
            Start with evidence. Grow with us.
          </h2>
          <p>
            Five analyses are yours for good. For teams ready to help shape
            the product, the beta program goes further.
          </p>
        </header>

        <div className={styles.plans}>
          <article className={styles.freePlan}>
            <div>
              <p className={styles.planLabel}>Free Trial</p>
              <p className={styles.price}>$0</p>
              <p className={styles.planNote}>Forever free</p>
            </div>
            <ul>
              <li>5 Lifetime Analysis Credits</li>
              <li>1 Employer Seat</li>
              <li>Unlimited Job Postings</li>
            </ul>
            <Link href="/#book-call" className={styles.secondaryAction}>
              Start free <span aria-hidden="true">↗</span>
            </Link>
          </article>

          <article className={styles.partnerPlan}>
            <div className={styles.partnerHeader}>
              <div>
                <p className={styles.planLabel}>Beta Program</p>
                <h3>Design Partner Program</h3>
              </div>
              <span className={styles.partnerTag}>Limited cohort</span>
            </div>

            <p className={styles.partnerDescription}>
              We partner with a select group of companies to shape the future
              of developer hiring.
            </p>

            <div className={styles.commitments}>
              <div>
                <h4>Your Commitment</h4>
                <ul>
                  <li>15-minute onboarding call</li>
                  <li>Async product feedback during the beta phase</li>
                  <li>Public case study if we help you make a great hire</li>
                </ul>
              </div>
              <div>
                <h4>Our Commitment to You</h4>
                <ul>
                  <li>50 Free Analysis Credits — 10× the free tier</li>
                  <li>Direct Slack/Email line to our founding engineers</li>
                  <li>Locked-in Founder Pricing for life</li>
                </ul>
              </div>
            </div>

            <Link href="/#book-call" className={styles.primaryAction}>
              Apply to the program <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

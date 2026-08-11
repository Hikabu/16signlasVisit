
**Last Updated:** 01.07.2026

16signlas ("**Company**," "**we**," "**us**," or "**our**") operates the EBTA platform (the "**Platform**"), which helps Employers obtain supplementary, evidence-based context about a Candidate they are already considering. This Policy explains what personal data we collect from **Employers** and **Candidates**, how we use it, how long we keep it, and your rights.

This Policy should be read with our [Terms of Service](./Terms-of-Service.md). Capitalized terms not defined here have the meaning given there.

**Controller/Processor Note.** For Employer account and billing data, we act as the data controller (or "business," under the CCPA). For Job Descriptions and Candidate materials an Employer submits, we generally act as a processor/service provider on the Employer's behalf. For data we collect **directly** from a Candidate through their own account-connection and repository-designation actions, we act as an **independent controller**, since the Candidate — not the Employer — authorizes and controls that data.

---

## 1. Data We Collect

### 1.1 From Employers
- **Identity and contact data:** name, work email, job title, company name.
- **Billing information:** billing contact and address; payment card/bank details are collected and processed by our third-party payment processor, and we retain only limited billing metadata (e.g., invoice history) for our own accounting.
- **Account and usage data:** login credentials (stored in hashed form), account configuration, subscription tier, and records of your interactions with the Platform.
- **Content you submit:** Job Descriptions and any Candidate materials (e.g., a resume) you choose to submit, which we process on your behalf.
- **Technical data:** IP address, browser/device information, and similar data collected automatically when you access the Platform.

### 1.2 From Candidates

- **Contact and invitation data:** the email address used to invite you, and records of invitation issuance, expiration, and use.
- **Account-connection data:** information confirming that you have connected your code hosting account and which repositories are available for you to use with the Platform. Connecting your account, by itself, does not involve any evaluation of a repository's content.
- **Repository identifiers.** When you designate a specific repository for a specific Brief request, we record an identifier for that repository. **No repository content is accessed, transmitted, or stored at this stage** — only the identifier, so the Platform knows which repository to evaluate if and when analysis is later triggered.
- **Repository content — accessed only during analysis, never stored.** When a designated repository is actually analyzed (see Section 2), its content is accessed solely for that purpose and is not written to persistent storage. It is discarded immediately once analysis is complete, and is never provided to any third-party AI model or used to train any model, for this or any other purpose.
- **Evidence.** The retained output of analysis is a set of abstracted, derived measurements — such as indicators of structure, complexity, and demonstrated proficiency in particular technical areas. Evidence does not include, and is not designed to permit reconstruction of, your source code or any underlying business logic. This is what is stored in your Vault, described further in Section 3.
- **Candidate Portal activity:** actions you take in the Candidate Portal, such as designating a repository, requesting re-analysis, disconnecting your account, or requesting deletion.
- **Technical data:** IP address and similar data collected automatically when you access the Candidate Portal or an invitation link.

### 1.3 What We Do Not Collect
We do not access repositories you have not specifically designated, and we do not access or evaluate any repository content before you have both connected your account and designated that repository for a specific Brief request.

---

## 2. How We Use Data

- **To generate a Brief:** matching a Candidate's Evidence against a Job Description to produce supplementary, evidence-based context for the requesting Employer.
- **To maintain the Vault:** so a Candidate's previously evaluated repositories can support future Brief requests without re-accessing or re-evaluating the underlying content.
- **To operate the Candidate Self-View:** showing Candidates a summary of their own Evidence.
- **To manage accounts and billing.**
- **To communicate with you:** invitations, status updates, and service notices.
- **To maintain security and integrity:** detecting fraud, abuse, or manipulation, and protecting the Platform and its users.
- **To improve the Platform:** using aggregated, de-identified usage data. Repository content is never used for this purpose.
- **To comply with legal obligations.**

**How AI is used.** A limited, separate process may be used to render already-extracted Evidence into readable narrative for an Employer. This process operates only on abstracted Evidence — it does not access, view, or evaluate repository content, and it does not determine the Evidence itself. Any Brief provided to an Employer includes the underlying Evidence, not merely an AI-generated narrative of it.

**Legal bases (where GDPR or similar law applies).** (i) **Consent** — for a Candidate's connection of their account and designation of a repository, withdrawable at any time; (ii) **contract performance** — for Employer account administration and billing; (iii) **legitimate interests** — for security, fraud prevention, and Platform improvement; and (iv) **legal obligation**.

---

## 3. Data Retention

| Data Category | Retention Approach |
|---|---|
| **Repository content** | Never persisted. Accessed only during analysis and discarded immediately upon completion. |
| **Repository identifiers (designated, not yet analyzed)** | Retained until analysis is triggered or you disconnect/delete, whichever comes first. |
| **Evidence (the Vault)** | Retained **indefinitely** so repositories remain reusable across Brief requests, **until you request deletion** (see Section 4), after which we delete it within the timeframe described there. |
| **Briefs delivered to an Employer** | Retained per the Employer's own account settings and obligations under the Terms of Service. Deletion of your Vault data does not retroactively remove Briefs already delivered before your request. |
| **Employer account and billing data** | Retained while the subscription is active, and for a reasonable period afterward (generally up to [7] years) for tax and accounting purposes. |
| **Invitation and session data** | Retained for a limited operational period tied to invitation validity, then deleted. |
| **Technical/log data** | Retained for a limited period (generally up to [12] months), then deleted or aggregated. |

We may retain data longer where necessary to comply with law, resolve a dispute, or enforce our agreements.

---

## 4. Your Rights

### 4.1 GDPR / UK GDPR and Similar Frameworks
You have the right to: **access** your data; **rectify** inaccurate data; **erase** your data (including Evidence in the Vault); **restrict** or **object** to certain processing; **port** your data; **withdraw consent** at any time (for Candidates, this includes disconnecting your account); and **lodge a complaint** with your supervisory authority.

### 4.2 CCPA/CPRA and Similar U.S. State Laws
You have the right to: **know** what categories of personal information we collect, use, and disclose; **delete** personal information, subject to exceptions; **correct** inaccurate information; **opt out of sale or sharing** — we do not sell or share personal information for cross-context behavioral advertising; **limit use of sensitive personal information** where applicable; **non-discrimination** for exercising these rights; and **appeal** a denial.

### 4.3 Candidate-Specific Controls
You can, at any time, without a formal request: **disconnect** your account through your code hosting provider or the Candidate Portal; **request deletion** of your Vault data via the Candidate Portal or info@16signals.com; and **view** a summary of your own Evidence.

### 4.4 How to Exercise Your Rights
Email info@16signals.com or use in-product controls. We may verify your identity before fulfilling a request. We respond within the timeframe required by law — generally 30 days for GDPR-based requests and 45 days (extendable by 45 days) for CCPA-based requests, at no cost, subject to limited exceptions for manifestly unfounded or excessive requests.

---

## 5. Data Sharing and Third Parties

We share data only as necessary to operate the Platform, with categories of recipients including: cloud infrastructure and hosting providers; your code hosting provider (governed by its own privacy practices); service providers that support the limited AI-assisted narrative step described in Section 2, which receive only abstracted Evidence, never repository content; payment processors; professional advisors and successors in a corporate transaction, under confidentiality obligations; and regulators or law enforcement where required by law.

We do not sell personal information, and repository content is never shared with any third party under any circumstances.

### 5.1 International Data Transfers
Where we transfer personal data across borders, we rely on appropriate safeguards such as Standard Contractual Clauses or other recognized transfer mechanisms.

---

## 6. Automated Processing

The Brief is generated through a combination of our internal analysis process and a limited, downstream text-generation step. We want to be clear about what this does and does not involve:

- The internal analysis process identifies only measurable, code-derived indicators — it does not "decide" anything about a Candidate.
- The downstream text-generation step operates solely on already-extracted Evidence to produce readable narrative; it does not access repository content and does not itself determine the underlying Evidence.
- The Platform does not rank, score, compare, sort, or shortlist Candidates against one another, and the Brief does not constitute, automate, or substitute for a hiring decision. It is supplementary context provided to an Employer about a single Candidate the Employer has already chosen to evaluate further; the Employer's own personnel make all hiring decisions.
- Where applicable law (such as GDPR Article 22) provides rights regarding decisions based solely on automated processing with legal or similarly significant effects, you may contact info@16signals.com to ask about the human-review practices in place or to raise questions about a specific Brief.
- Employers are separately responsible for determining whether laws governing automated tools in hiring apply to their specific use of the Platform and for complying with any applicable requirements — see Section 2.5 of the Terms of Service.

---

## 7. Security

We use administrative, technical, and physical safeguards designed to protect personal data, including the immediate, non-persistent handling of repository content described in Section 1.2. No system is completely secure. If we become aware of a data breach affecting your personal data, we will notify you and/or relevant authorities as required by applicable law.

---

## 8. Children's Privacy

The Platform is not directed to individuals under 18. If we learn we have collected personal data from someone under 18, we will delete it.

---

## 9. Cookies and Similar Technologies

We use cookies and similar technologies for authentication, session management, security, and, where permitted, analytics. Where required by law, we provide a cookie consent mechanism.

---

## 10. Changes to This Policy

We may update this Policy from time to time. Material changes will be reflected in the "Last Updated" date and, where required by law, communicated by additional notice.

---

## 11. Contact Us

**16signals**
Email: info@16signals.com


---

*End of Privacy Policy.*

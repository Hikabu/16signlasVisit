---
title: " Why “Insufficient Evidence” Is a Trust Feature"
date: "2026-02-10"
summary: "Recognizing weak or missing evidence prevents false confidence and leads to better interview questions."
---
# Why “Insufficient Evidence” Is a Trust Feature

Hiring systems are under pressure to produce answers.

Is this candidate senior enough?

Can they own architecture?

Do they have the experience required for this role?

The temptation is to answer every question.

But a system that always produces an answer is not necessarily more useful. Sometimes the most accurate result is:

**Insufficient evidence.**

For 16signals, that is not a failure. It is part of the method.

## Missing evidence is not negative evidence

Suppose we are looking for evidence that an engineer has operated production infrastructure.

We may find repeated contributions showing deployment changes, incident fixes and infrastructure ownership.

That supports an observation.

But suppose we find nothing.

There are several possible explanations.

The candidate may not have that experience.

Or the relevant repositories may be private.

Their work may have happened inside systems we cannot access.

Their contribution may not be represented clearly in the available artifacts.

Those situations produce the same observable result: **we cannot see enough evidence.**

They do not justify the same conclusion.

This distinction matters because hiring decisions affect people. A lack of observable evidence should not silently become a negative score.

---

## Trustworthy systems need boundaries

NIST's AI Risk Management Framework explicitly recommends documenting an AI system's **knowledge limits**, measuring uncertainty and identifying the conditions beyond which results may not generalize reliably. It also describes the ability to operate safely beyond those limits as an important part of trustworthy system design.

The principle is simple:

**A system should know what its evidence allows it to say.**

This is particularly important in hiring because the information is incomplete by default.

No repository contains a complete representation of an engineer.

Code does not capture every design discussion.

A pull request does not reveal every constraint.

Public work may represent only a small percentage of someone's career.

Any system that converts those gaps into confident conclusions creates false precision.

---

## Confidence should come from evidence, not from the model

Imagine two reports.

The first says:

> **Architecture ownership: Low**

The second says:

> **Insufficient evidence to assess architecture ownership. Available artifacts do not show enough system-level decision history. Investigate during interview.**

The first answer looks more decisive.

The second is more useful.

It tells the hiring team exactly what is known, what is not known and what should happen next.

This follows a broader principle already used in reliable AI systems: when uncertainty becomes too high, **abstaining can be preferable to forcing a prediction**. Research on selective prediction examines exactly this behavior—allowing systems to withhold conclusions when confidence is insufficient rather than treating every input as equally answerable.

For hiring, that distinction is critical.

A confident answer without sufficient evidence is not intelligence.

It is speculation.

---

## Evidence must support the decision being made

Employment-selection standards make a related point.

The EEOC's Uniform Guidelines define validation around demonstrating that a selection procedure is related to the job. They also warn that evidence supporting a procedure in one context does not automatically make it valid in another.

That means the standard cannot simply be:

**“We found a pattern.”**

The relevant questions are:

What evidence produced the pattern?

How directly does it relate to this role?

Is there enough information to support the interpretation?

What alternative explanations remain?

When those questions cannot be answered responsibly, the correct result is uncertainty.

---

## “Insufficient evidence” should change the interview

The purpose of 16signals is not to eliminate uncertainty before hiring.

That would be impossible.

Its purpose is to **make uncertainty visible and actionable.**

If strong evidence exists, the interviewer can investigate it more deeply.

If evidence conflicts, the interviewer can ask why.

If evidence is missing, the interviewer knows exactly what needs verification.

For example:

> **Observation:** Repeated evidence of backend service ownership.
> **Evidence strength:** Strong.

But:

> **Architecture leadership:** Insufficient evidence.
> **Next step:** Ask about their role in system-level design decisions and request a concrete example.

Now the report is not pretending to know the candidate.

It is preparing the company to evaluate them better.

---

## The goal is not to produce more conclusions

Most hiring technology is rewarded for producing an answer.

A score.

A ranking.

A recommendation.

But more output does not mean more knowledge.

For 16signals, trust should come from a stricter rule:

**Say what the work supports. Clearly identify what it does not. Never turn absence of evidence into evidence of absence.**

That is why “insufficient evidence” belongs in the product.

It shows that the system is not trying to win the argument.

It is trying to represent the evidence accurately.

And in hiring, knowing **when not to make a conclusion** can be just as important as knowing when to make one.

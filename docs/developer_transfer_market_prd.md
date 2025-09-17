# Product Requirements Document (PRD)

## Product Name
**IT Transfer Market**

---

## Overview
The IT Transfer Market is a platform inspired by the football transfer market, where companies can transfer or loan software developers. Developers can belong to one or multiple companies, or be registered as freelancers/free agents. The platform facilitates transparent negotiations between companies and developers, while offering developer profiles with rich skill, performance, and achievement data. The system also gamifies the experience with leaderboards and transfer news.

---

## Goals
- Create a transparent marketplace for companies to transfer, loan, or hire developers.
- Empower developers with visibility and recognition while ensuring their right to accept or reject offers.
- Automate skill validation and performance ratings through employer feedback, AI, and peer reviews.
- Facilitate discovery, valuation, and negotiation without handling legal contract execution directly.

---

## Core Concept & Business Rules
1. Developers can:
   - Be employed by a company (exclusive or multiple).
   - Register as freelancers (free agents).
2. Both developer and acquiring company must approve a transfer.
3. Developers can self-register as free agents.
4. Loans:
   - Developer remains employed by original company (no pay during loan).
   - Acquiring company pays developer’s wages during loan period.

---

## User Roles
- **Companies (Employers & Acquirers):** HR, talent acquisition specialists.
- **Developers:** Employees or freelancers.
- **Platform Admins:** Manage compliance, approvals, and system integrity.
- No role for agents.
- All discovery and search is transparent (no anonymous scouting).

---

## Developer Profile & Data
### Attributes to Track
- Technical skills (programming languages, frameworks, databases).
- Soft skills (leadership, communication, management).
- Ratings (performance, potential, overall rating).
- Achievements (projects, open-source, certifications, awards).
- Market value (auto-calculated, editable by current employer).

### Ratings Sources
- Employer feedback.
- Platform AI analysis (GitHub repos, code quality, etc.).
- Peer reviews.

### Visibility
- Developers cannot restrict visibility of their profiles.

---

## Transactions (Transfers & Loans)
- Transfer fee:
  - Automatically suggested by platform (market value model).
  - Negotiable between companies.
- Wage/salary:
  - Must be equal or higher than current wage.
  - Negotiated between developer and acquiring company.
  - Developer can accept/reject offers.
- Platform only facilitates introductions — legal activities handled externally.
- Trial periods supported.

---

## Marketplace & Discovery
- Companies can:
  - Browse/filter developers by skills, ratings, availability, market value.
  - Post transfer requests (e.g., “Looking for Senior React Developer”).
- No bidding wars.
- Marketplace access restricted to registered companies only.

---

## Monetization
- Commission on transfers and loans.
- Minimum commission: one month of developer’s wage.
- Revenue only from companies (developers do not pay).

---

## Legal & Ethical Considerations
- Developers treated as employees/freelancers with rights to accept/deny deals.
- Platform must comply with employment laws.
- Legal agreements handled outside the platform.

---

## Growth & Network Effects
- Initial focus: full-time employees.
- Integrations: GitHub, LinkedIn, StackOverflow for automatic portfolio verification.
- Gamification:
  - Leaderboards.
  - Rankings.
  - “Transfer news” feeds (similar to football transfer rumors).

---

## Success Metrics
- Number of registered companies and developers.
- Number of transfers/loans facilitated.
- Engagement with leaderboards and transfer news.
- Accuracy of market value predictions vs. actual deals.
- User satisfaction (developers and companies).

---

## Out of Scope (MVP)
- Legal contract execution (handled outside platform).
- Anonymous scouting.
- Agent/third-party representation.


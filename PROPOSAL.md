# kick-playr. — SaaS launch proposal

**Positioning:** Less admin. More football.

**Target:** Volunteer-led Swiss grassroots football clubs, initially 50–200 members.

**Promise:** Teams, members, payments, schedules and communication in one connected app.

## Customer journey
1. Discover: hero, visual product preview, clear pilot CTA.
2. Evaluate: six product pillars and how-it-works steps.
3. Trust: transparent pilot status, no fabricated testimonials or metrics.
4. Convert: pilot-interest contact flow.
5. Onboard: discovery interview, data import, coach and parent activation.

## Pilot MVP
Club and team roster, member/household relationships, role-based access, schedules, communications, fee/payment status, mobile UX, audit logs and tenant isolation.

## Success metrics
Admin hours saved per month, member activation, coach adoption, fee collection cycle, and parent satisfaction. Establish baselines before pilot.

## Launch sequence
- Phase 1: clear trademark/domain; conduct 3–5 club interviews.
- Phase 2: pilot with 2–3 clubs; instrument usage and feedback.
- Phase 3: improve onboarding, permissions, payments and messaging.
- Phase 4: introduce verified case studies and commercial pricing.

## Technical direction
Marketing at `kickplayr.app`, frontend at `app.kickplayr.app`, API at `api.kickplayr.app` (all provisional). Build on the existing React/Next.js + NestJS architecture, with strong tenant isolation and authorization. Integrate a proper consent-aware CRM or backend endpoint for lead capture.

## Pricing
Test a simple per-club subscription with member bands. No final price has been validated, so the landing page deliberately does not invent one.

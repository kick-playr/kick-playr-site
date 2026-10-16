# kick-playr. — product and launch proposal

**Positioning:** Less admin. More football.

**Target:** Swiss grassroots football clubs with volunteer-led administration and
bexio-based membership and financial records. The initial 50–200-member segment is
a proposal, not a verified market finding.

**Product basis:** The operational German FC RWW app, reviewed at
`http://localhost:3001` on 16 October 2026. See the
[functionality and website content brief](docs/PRODUCT-FUNCTIONALITY.md) for evidence
and verification limits. The marketing website runs separately on port 8080.

## Core product story

Connect the member lifecycle:

**Trial registration → team assignment → admission → assisted onboarding → bexio
invoice and payment status → clothing voucher → shop validation and settlement.**

Support that process with team rosters, season-specific training, trainer and
represented-member contexts, member self-service requests, seasonal transfers,
reporting, bounced-email monitoring and configured Matrix team chat.

bexio remains the membership and financial system of record. External federation
and team-tool work can be assisted through tasks, links and prepared information;
this does not imply automatic synchronisation with every external system.

## Customer journey

1. Discover: clear club-administration value and an illustrative product preview.
2. Evaluate: demonstrate the connected lifecycle and the separate admin, trainer
   and member experiences using approved, anonymised demonstration data.
3. Understand fit: explain the bexio prerequisite and which integrations and chat
   features are enabled for the proposed club setup.
4. Express interest: the current marketing form opens a prepared email; it does
   not submit leads to a backend.
5. Onboard: validate configuration, responsibilities, seasons, teams, permissions
   and integration readiness with the club.

## Existing functionality versus SaaS work

The FC RWW app already exposes operational club workflows. Describing the entire
product as only a planned roster/payments MVP would overlook those capabilities.
However, a single club's operational app does not prove a ready multi-club service.

Work still to validate for kick-playr includes tenant isolation, per-club bexio and
service configuration, club provisioning, safe migration, support and recovery,
commercial terms, privacy responsibilities and operational monitoring. No security
or tenant-isolation audit was performed during the browser review.

The website's member-workflow preview is illustrative. A general match/event calendar,
attendance system, payment processor and additional ERP connectors are not
established product capabilities. The current configured Matrix chat is real
functionality, but successful live sending and recovery were not tested in the
review; it should not be promised for every deployment without checking setup.

## Launch sequence

- Validate brand/domain availability and permission to use any club reference.
- Demonstrate the lifecycle with disposable data and controlled email/chat/shop
  destinations; verify write flows and all intended role boundaries.
- Prepare the reusable club setup and test isolation before onboarding additional
  clubs. Establish baseline administration and member-activation measures.
- Pilot with a small number of suitable bexio-using clubs, then improve onboarding,
  reporting, communication and operational support based on measured results.
- Publish verified case studies and commercial pricing when available.

## Technical direction

Marketing at `kickplayr.app`, frontend at `app.kickplayr.app`, and API at
`api.kickplayr.app` are provisional domain proposals. Keep the marketing site's
Next.js implementation separate from the operational frontend and backend.

The current FC RWW reference uses a Next.js frontend, Clerk authentication and an
external API, with bexio-backed workflows and configurable Matrix chat. Preserve
backend ownership of integration credentials and business rules. Connect the
marketing contact flow to an appropriate lead endpoint when ready, with a clear
privacy notice and accurate success/error messages.

## Success metrics and pricing

Measure administrative time, member activation, trainer adoption, onboarding
completion, contribution collection and voucher settlement. Establish baselines
before claiming improvements.

A per-club subscription with member bands remains a pricing hypothesis. Do not
present local invoice amounts, club clothing-contribution rules or speculative
subscription figures as validated kick-playr commercial terms.

# Product functionality and website content brief

Reviewed on **16 October 2026** against the German FC RWW app at
`http://localhost:3001`, using the existing authenticated administrator session.
The app footer displayed frontend **6.1.20** and API **5.1.15**.

The initial inventory below is supplemented by the
[complete menu and disclosure walkthrough](#detailed-menu-walkthrough--16-october-2026).
That second pass opened every menu available to the current administrator and
upgrades the earlier menu-only observations with the detailed evidence below.

## Product and environment boundaries

| Surface | Purpose | Current status |
| --- | --- | --- |
| kick-playr website, port 8080 | Multilingual marketing and pilot-interest page in this repository | Illustrative dashboard; email-client contact flow; no club management or lead database |
| FC RWW app, port 3001 | Operational club frontend for FC Rot-Weiss Winikon | German interface with authenticated, role-aware workflows and backend data |
| FC RWW API, port 3000 in this setup | Club data, integration and business operations | Separate backend; not implemented in this website repository |
| kick-playr SaaS | Proposed reusable club offering based on these workflows | Club provisioning and multi-tenant isolation have not been established by this review |

The local app is branded **FC RWW**, not kick-playr. Its capabilities provide the
product reference for this website; they do not establish that a public kick-playr
service is generally available. The app's German UI does not imply that it has the
website's English/German/French/Italian translation system.

## Product positioning

**Connected club administration, coaching and member self-service, with bexio as
the membership and financial system of record.**

Lead with the connected member lifecycle rather than generic match scheduling:

**Trial registration → team assignment → admission → onboarding tasks → membership
invoice and payment status → clothing voucher → shop validation and settlement.**

Season transitions, member changes and team communication support that lifecycle.
The existing product direction retains bexio as a prerequisite; support for other
ERP systems is not established.

## Functionality inventory

“Browser” below means a screen or control was observed in the running app, not that
its write operations were executed. “Source” refers to the existing FC RWW app
README and components, inspected to explain workflows without modifying club data.

| German UI / area | Member or club benefit | Evidence and limits |
| --- | --- | --- |
| Rolle wechseln | One login can have admin, trainer and represented-member contexts | Browser: selector offered all three context types. Role isolation and alternate-context screens were not exercised. |
| Teams | Team overview, roster counts, trainer/trial counts, search and team details | Browser: list loaded; a no-match search removed team links; clearing restored them; a team detail link was opened. Source describes contact actions and exports. |
| Probetrainings / Probe | Organise applicants, assignment and trial progress | Browser: loaded applicants, team/status filters, search, dates and acceptance/cancellation controls. These actions were not submitted. Source describes age-group matching, training suggestions and prepared email invitations. |
| Neumitglieder / Neu | Track administrative onboarding work | Browser: loaded the empty state `keine Aktionen vorhanden !! Perfekt`. Source describes SpielerPlus, NDS/J+S, clubcorner, WhatsApp and bexio tasks plus document handling. No populated task was available to test. |
| Rechnungen / Rechn. | See paid, open and reminder contributions by team | Browser: totals, payment percentages, search, drill-down and `Brief...` controls loaded. No invoices, reminders or physical letters were created or sent. |
| Kleider Vouchers / Kleider | Track issued clothing benefits through fulfilment and settlement | Browser: total/settlement/collected/open/expired/inactive filters, PDF controls, expiry extensions and settlement controls were present. No voucher was redeemed, extended or settled. |
| QR Erstellung / QR | Issue eligible welcome/clothing vouchers | Admin menu observed. Source describes eligibility, personalised PDF/QR and email issuance with confirmation. Issuance was not tested. |
| Team Transfer | Prepare next-season assignments and handle departures | Browser: inactive-at-year-end, archive and next-season transfer sections opened. Source describes assignment, follow-up flags, undo and CSV helpers. No transfer or archive action was executed. |
| Team Trainings / Train | Maintain season-specific training and coaching information | Browser: season dates, next training, holiday remarks and expanded team editor loaded. Editor includes birth years, recurring time/location/date ranges, trainer roles, trial contacts and WhatsApp/Matrix room references. No edits were saved. |
| Chat | Access club and team conversations | Browser: enabled in this environment; team, trainer and club room list loaded with search. Initial connection/loading indicator appeared. Source describes Matrix encrypted conversations, replies, media and polls. Message sending, encryption recovery and live delivery were not tested. |
| Statistik / Stats | Export reporting data | Browser: `Jahresstatistik Stadt Uster` and `Team Statistik` with options and CSV download controls. Downloads were not executed. |
| Einstellungen / Einst. | Configure season, billing, responsible people, shop and vacations | Admin menu observed; workflow details from source. Settings were not changed. |
| Bexio Einstellungen / Bexio | Map bexio categories, tags, roles and teams | Admin menu observed; mapping behaviour from source. No mappings were changed. |
| Mitglieder Änderungen / Änd. | Review personal-data and cancellation requests | Admin menu observed. Source describes before/after review and approval. Approval/deletion was not tested. |
| Unzustellbare E-Mails / Mail Bounce | Resolve email delivery failures | Browser: screen loaded `Keine offenen Zustellfehler.`, with refresh and archive controls. Instructions direct administrators to correct the contact in bexio before marking a failure resolved. |
| Kiosk | Provide kiosk information; chat depends on configuration | Admin menu observed. Source describes an informational page and configurable kiosk chat. Inventory, sales and shift management are not established. |
| Member self-service | Digital badge, team/invoice overview, personal vouchers and requests for changes or cancellation | Source-supported; member screens were not tested in this admin review. Changes are requests for admin review, not immediate edits to bexio. |

## Integrations and claim boundaries

- **bexio:** membership/contact and financial records. Present the app as a connected
  workflow layer, not a replacement accounting system or a payment processor.
- **Clerk:** authentication. The public welcome screen advertises Apple, Google,
  Microsoft and email/password; provider availability depends on configuration.
  The sign-in button reached the hosted Clerk sign-in screen in a fresh session.
- **Matrix:** integrated chat is enabled in the reviewed environment. Availability
  is feature- and role-controlled; do not promise it for every deployment.
- **SpielerPlus, SFV clubcorner, NDS/J+S and WhatsApp:** source documents assisted
  tasks, links, prepared messages and completion tracking. Do not claim universal
  automatic synchronisation or automatic completion inside those systems.
- **Sport shop / clothing:** voucher QR validation and settlement are a distinct
  benefit workflow. Eligibility, contribution and expiry are backend/configuration
  rules, not universal commercial terms for future clubs.
- **Physical mail:** source documents backend Pingen support. Sending was not
  tested and should not be described as verified end-to-end delivery.

## Guidance for the marketing website

The current six feature cards can stay as the high-level structure, but future
copy should make these capabilities concrete:

| Website pillar | Evidence-based emphasis |
| --- | --- |
| Teams and members | Rosters, trainer access, parent/member contexts and self-service requests |
| Schedules | Recurring training, seasons, locations, holiday-aware trial suggestions |
| Payments | bexio membership invoices, paid/open/reminder visibility and administrative follow-up |
| Communication | Configured team chat, trial invitations and assisted external communication |
| Club operations | Trial-to-member onboarding, vouchers, seasonal transfers and reporting |
| Roles and access | Distinct administrator, trainer and represented-member experiences |

Avoid claiming a general match/event calendar, attendance management, a live
payment gateway, audited tenant isolation, or self-service club onboarding from
this review. Match scheduling and the numbers in the website dashboard remain
illustrations, not evidence of implemented product behaviour or customer metrics.

The FAQ's “pilot-planning/design prototype” wording describes the **kick-playr
commercial offer and this marketing page**, not the existence of the operational
FC RWW app. A future copy revision should explain that distinction explicitly.
Pricing, launch dates, pilot terms, domain/trademark status and permission to use
FC RWW as a public reference require their own verified facts.

## Verification performed and remaining work

Read-only browser checks confirmed authenticated home navigation, the overflow
menu, team list/search, trial list, onboarding empty state, invoice overview,
voucher list, season transfer sections, expanded training editor, chat room list,
statistics controls and bounced-email empty state. Initial asynchronous loading
states resolved on the screens recorded as loaded above.

No emails/chat messages were sent, forms saved, invoices issued, financial actions
executed, or club records changed. Menu notification acknowledgement and normal
chat-session initialisation may occur when opening those screens. A full
end-to-end acceptance test still needs disposable data and controlled integration
destinations, plus separate trainer/member and permission checks.

No personal member records, private room links, invoice amounts or credentials are
included in this document. It records capabilities rather than the club's data.

## Sources and maintenance

- Live German UI: `http://localhost:3001`, reviewed 16 October 2026.
- Existing implementation documentation: sibling `fcrww-app/README.md`.
- Menu and access definitions: sibling `fcrww-app/src/components/menu.tsx` and
  `menu-access.ts`.
- Marketing implementation: this repository's `app/home.tsx`, `intl/` and README.

Recheck the running application when revising product claims. A module's menu item
alone does not prove that its integration or write flow succeeds.

## Detailed menu walkthrough — 16 October 2026

This second pass opened **all 15 main-menu items in their displayed order** in the
existing Admin context. Only navigation, read-only disclosures and the email
archive display filter were used. No action buttons, downloads, external contact
links, setting values, assignments, approval controls or financial operations were
activated. Trainer/member contexts are outside this pass.

Repeated row disclosures were inspected across the visible records: 21 trial
participants, nine invoice-status/team groups, and eight maintained training
teams, plus 52 disclosures across 26 archived delivery failures. These are coverage
counts for this local review, not marketing metrics.
Some accordions close the previous panel when the next panel opens; simultaneous
expansion is not required to inspect every panel.

### 1. Teams — `#menu-1`

Team cards distinguish player, trial, trainer and 1418-coach counts. A team card
opens a separate roster route. The inspected roster displays first name, surname,
birthday and contact rows directly, with player/parent phone and email details,
WhatsApp shortcuts and contact-download controls. A primary contact is marked
with an asterisk. A legend explains birthday proximity, trial status, trainers and
inactive-at-season-end highlighting.

No labelled roster expand control was present; data was already visible. Unlabelled
buttons and contact/download actions were left untouched. Document the roster as
a practical trainer/contact view, not only a list of team names.

### 2. Chat — `#menu-16`

The team/club room list includes team rooms, trainer rooms and club-wide groups.
Search is labelled **Chats und Nachrichten suchen**. The **Chat-Menü** disclosure
exposes **Alle als gelesen markieren**, an action which was not used. During
initialisation, a disconnected indicator and disabled room buttons were visible;
room titles subsequently populated. This makes loading/connection feedback part
of the user experience, not proof that message delivery was tested.

Room-opening buttons enter conversations rather than expanding inline data. No
conversation was opened in this pass, so read markers, messages and room actions
were not deliberately triggered. Conversation functionality remains supported by
implementation documentation rather than this disclosure-only inspection.

### 3. Probetrainings — `#menu-2`

All 21 visible **Spieler ausklappen** disclosures were opened. Opening a row also
expands its name/date summary. Details include birth date, named contact, phone,
email, address and a **Teaminformationen** area with age-group matches. The row
also exposes the team-assignment selector, including an unassigned and waiting-list
choice. No selection was changed.

The overview groups new/unassigned applicants separately from assigned team trials
and shows registration/update dates, status counters and search. Copy, accept,
cancel and communication controls were observed but not activated. The product
story can describe applicant triage and matching information separately from the
actual admission decision.

### 4. Neumitglieder — `#menu-6`

The page settled to **keine Aktionen vorhanden !! Perfekt**. There were no populated
onboarding cards or expanders to inspect. The documented external onboarding
checklist remains source-supported; this pass does not claim to have expanded an
actual onboarding task or viewed its documents.

### 5. Rechnungen — `#menu-4`

All nine available **Mahnungen anzeigen** / **Offene Rechnungen anzeigen** team/status
groups were inspected. These disclosure buttons change to a close label and show
individual invoice rows. The list uses an active group rather than keeping every
invoice group open simultaneously.

Expanded rows add invoice references, bexio invoice links, outstanding dates,
amounts and available phone contacts. WhatsApp and SMS links contain prepared
reminder text; their presence does not mean the app has sent a reminder. **Brief...**
buttons appear at overview and individual-invoice level. They were not clicked,
including to open their action dialogs. The header states a billing/renewal period
and the overview separates paid, open and reminder totals by team.

### 6. Kleider Vouchers — `#menu-3`

The loaded list provides total, to-settle, collected, open, expired and inactive
views. Voucher rows show linked member/team, issuance and fulfilment dates,
remaining or expired validity, the shop and club contribution. Fulfilled entries
can show articles and their billed state directly.

No dedicated record expand control appeared. PDF download, **Abrechnen**, **+14**
and **+30** are actions, not disclosures, and were left untouched. Distinguish
voucher tracking from voucher creation in the public feature descriptions.

### 7. QR Erstellung — `#menu-5`

The screen loaded an eligible action with paid membership information, contribution
purpose and separate member/billing-contact email links. Counters distinguish
clothing QR actions from membership-invoice actions. A **Keine E-Mail senden, nur
Gutschein erstellen** option is available; it was not changed. The row's issuance
button was not clicked, and there was no labelled read-only expander.

This supplies stronger UI evidence for an eligibility-driven voucher issuance
screen. Actual generation/email delivery is still untested.

### 8. Team Transfer — `#menu-9`

**Details öffnen** under **Inaktiv Ende Jahr** and **Archivierung öffnen** were
expanded. The first section had no pending actions. The archive section exposed
historical departure records with timestamps/reasons and controls for undo,
archiving and related status handling. The UI warns that this affects annual
statistics. No record control was changed.

The next-season area displayed **Teamwechsel 26.2 → 26.2**. General settings also
showed the current and next season both set to `26.2`. Record this as observed local
configuration; it is not proof of a transfer defect. Configure distinct intended
seasons before demonstrating or testing an actual season transition.

### 9. Team Trainings — `#menu-8`

All eight team **öffnen** disclosures were visited. This editor uses one expanded
team at a time. The common fields are birth-year groups, WhatsApp invitation,
Matrix team room and Matrix trainer-room references, recurring training slots,
and trainer assignments. Slots describe day, start/end time, optional location
and an optional validity period.

Trainer entries expose role selection and a **Probetraining Kontakt** flag. The
available role labels include Trainer, Co-Trainer, 1418 Coach, Goalie-Trainer,
Fitness-Trainer and Coach. Import, clone, delete, assignment and save controls were
not used. The overview independently shows season navigation, next training and
holiday remarks. No room links or personal trainer data are reproduced here.

### 10. Statistik — `#menu-10`

Two direct report cards are present, with no expandable detail panels:
**Jahresstatistik Stadt Uster**, with an **Alle** option, and **Team Statistik**, with
a **Probe** option. Their CSV download controls were not clicked. Export availability
was observed; generated file contents were not validated.

### 11. Einstellungen — `#menu-7`

All eight top-level disclosures were expanded. Their content adds the following
capabilities to the earlier inventory:

| Panel | Additional detail observed |
| --- | --- |
| Einstellungen | Current/next/billing season; membership year and season; start/end dates; invoice waiting time, payment deadline and invoice-search lookback. Cut-off rules have a graphical preview, date/discount fields and separate create/send/renewal flags. |
| Kleider | Voucher search lookback, validity in days and how long expired vouchers remain visible to members. Help text explicitly says validity applies to existing vouchers too. |
| Verantwortliche | Responsible people for finance, presidency, juniors, vice-presidency, administration, vouchers and kiosk, used as contacts in messages/documents. |
| Sport Shop | Active shop identity/address, maps link, approval-code control, discounts, flyer, offered articles and club/member cost shares. The approval-code reveal action was not used. |
| Ferienkalender | Season-bounded vacation/training-break ranges with comments, plus earliest-next-week and lead-time-in-days rules for trial training. |
| Teams | Current- and next-season team inclusion. Team-name buttons use pressed/toggle state; they change configuration and are not nested expand controls. They were not clicked. |
| Themes | Global room/person identicons, Jdenticon versus Blockies, and room-type colours versus a varied stable palette. Personal avatars remain coloured. Radio/toggle settings were only read. |
| Chats | Club-wide Matrix room/link mappings for administrators, board, 1418 coaches, trainers and kiosk. Help text says an empty value removes a mapping. No value was edited. |

Calendar pickers, season increment/reset buttons, delete controls and selectors
were not used. Presence of editable fields should not be mistaken for a completed
configuration or a verified save operation.

### 12. Kiosk — `#menu-12`

The inspected page displayed a club food-truck image and acknowledgement text.
There were no content expanders or sales/stock/shift-management controls. Keep its
marketing description informational; the separately configured kiosk chat does
not establish a point-of-sale feature.

### 13. Bexio Einstellungen — `#menu-11`

All five disclosures were expanded:

- **Kategorien:** map bexio categories/tags to lifecycle states such as active,
  trial and clothing already supplied. The expanded content separates categories
  and tags.
- **Rollen:** map categories/tags to club functions and access-role recognition.
- **Alle Teams:** clothing eligibility and 1418-team flags. Help explicitly directs
  season membership to the general **Teams** settings instead.
- **1418 Coaches:** associate each relevant team with its coach category.
- **Spielertrainer:** associate player-trainer tags with teams so a playing member's
  additional trainer role can be recognised.

Mapping selectors, team flags, create/delete controls and external bexio links were
not activated. The walkthrough verifies the configuration surfaces and explanatory
text, not the correctness or security of every mapping.

### 14. Mitglieder Änderungen — `#menu-14`

The **Mitgliederanträge** region explains that contact changes and cancellations
are reviewed and approved here. It settled to **Keine offenen Änderungsanträge.**
There were no request cards or expanders. Approval, comparison and rejection
behaviour could not be inspected against a live request in this pass.

### 15. Unzustellbare E-Mails — `#menu-17`

The open view settled to **Keine offenen Zustellfehler.** It instructs an admin to
correct the contact in bexio before marking a failure resolved. The **Archiv
anzeigen** view filter was opened separately to inspect historical failures;
refresh and resolve controls were not clicked. The archive loaded 26 historical
failure records from 30 checked emails. Both **Technische Diagnose** and **Details
der Fehlermeldung** were opened for every record, covering all 52 disclosures.

The archive distinguishes permanent failure, temporary failure and unclear status.
Human-readable reasons include unknown recipient, unavailable or full mailbox,
missing recipient domain, recipient-server rejection and temporary delivery
problems. SMTP/enhanced status codes are displayed alongside those reasons.
Where available, the record links a matched bexio contact and identifies the email
field; otherwise it explains that no matching contact was found or that the
recipient must be checked in the diagnosis.

**Technische Diagnose** reveals the SMTP response. **Details der Fehlermeldung**
reveals sender, message identifiers and the returned delivery report. These help
an administrator distinguish a mistyped address from a temporary mailbox/server
problem before correcting the contact. No addresses, message IDs or report bodies
are reproduced here. The archive display filter was restored to the open view.

### Coverage limits

This is a read-only walkthrough of the menus available to the current admin,
not a write-flow acceptance test. Empty states are recorded explicitly rather than
filled with invented examples. Feature visibility for another role, permission
checks, generated exports, live messages, invoice delivery and mutations require
separate controlled testing. No personal contact, financial, health or departure
record is copied into this documentation.

## Role walkthrough — 16 October 2026

The upper **Rolle wechseln** dropdown was used to select the trainer context,
both available member contexts, and finally the administrator context again.
Switching displayed **Rolle wird gewechselt ...**, temporarily disabled the
selector, and refreshed the interface. The selected context and its screens were
checked after loading. The original Admin context and home page were restored.
Only role selection, navigation and read-only disclosures were used; no business
action, edit, download or submission was performed.

### Observed menu/access comparison

| Area | Admin | Trainer | Member / represented member |
| --- | --- | --- | --- |
| Navigation | All 15 admin modules from the preceding walkthrough | Teams, Chat, Probetrainings, Rechnungen, Kleider Vouchers | Badge, Chat, Mitglied, Kleider Vouchers, Einstellungen |
| Team data | Club-wide team overview | One assigned team in this profile | Selected member's team in membership overview/badge |
| Trials | Club-wide workflow, assignment and decision controls | Assigned-team trials with contact disclosures; no assignment selector or accept/cancel controls | No trial menu |
| Billing | Club-wide paid/open/reminder overview and administrative controls | Assigned-team summary and open-invoice disclosure; no invoice send/create, letter or reminder action buttons observed | Personal invoice history in Mitglied |
| Vouchers | Club-wide list with issuance/extension/settlement elsewhere in the admin workflow | Assigned-team list with status filters and PDF controls; no extension or settlement buttons observed | Personal voucher screen; empty for both tested members |
| Settings | Club/season/shop/theme/chat configuration plus bexio mappings | No settings menu | Personal-data read view with Bearbeiten action; no club configuration menu |
| Cancellation | Request review in Mitglieder Änderungen | No cancellation-review menu | Expandable request form under Mitglied, without submitting it |
| Chat | Club/team room list in the admin context | Selected profile's permitted room list | Selected member's permitted room list; not an identical list for every member |

**Chat is enabled for members in this environment**, so the live member menu has
five items. The earlier four-menu baseline in sibling implementation documentation
must not override this observed feature configuration.

### Trainer checks

All five trainer menus were opened. Teams returned one assigned team, and its
roster detail route loaded with name/birthday columns and contact shortcuts.
Probetrainings returned two participants for that team; both contact disclosures
were expanded. The assignment dropdown and acceptance/cancellation buttons seen
as admin were absent; only the role dropdown remained.

Rechnungen displayed a team-scoped contribution overview. Its open-invoice group
was expanded, revealing contact/email and bexio references. No Brief, create/send
or reminder-operation button appeared. Kleider Vouchers loaded the team's voucher
list with total, settlement-state, collected, open and expired filters plus PDF
controls. A settlement-state filter is a display filter, not an Abrechnen action.
No voucher extension or settlement action button was present.

The trainer chat list included its team room, trainer rooms and an additional
club-wide room in this profile. Its Chat-Menü was expanded without using
Alle als gelesen markieren. Initial room loading/disconnected state was observed;
message delivery was not tested in the role pass.

### Both member contexts

The dropdown offered a represented member and the login holder's own member
context. All five member areas were visited in each, including the chat-menu and
cancellation disclosures where available. Displayed subjects, team and invoice
history changed with the selected member rather than remaining on the preceding
profile. The self-service settings field groups changed with the subject too.
This is a positive UI observation, not a full cross-contact isolation audit.

- **Badge:** name, season, function, team and validity display loaded for both
  members. Both showed a valid membership. The login holder's badge also listed
  additional club functions; this did not expose admin menus while in Member mode.
- **Chat:** the represented member saw one team room. The other member saw its
  team room plus a board room. Document chat scope as configured/permitted for the
  selected profile rather than promising exactly one room for every member.
- **Mitglied:** team overview and personal invoice history loaded in each context.
  Invoice-history columns include invoice/purpose, amount, status and date. No
  invoice/payment link was followed.
- **Kündigung disclosure:** opened for each member. It offers end-of-season versus
  immediate timing, a reason field, Senden and Abbrechen. Help requires at least
  ten reason characters and says the request is submitted for review. No timing,
  reason or submission action was changed.
- **Kleider Vouchers:** both contexts showed Keine Kleider Vouchers vorhanden.
  The review therefore confirms the personal empty state, not a populated member
  voucher redemption or PDF flow.
- **Einstellungen:** read view groups address, personal details, phone numbers,
  emails, parent/billing contacts and health information. Name, birth date,
  categories and tags are also displayed. Bearbeiten is an action and was not
  clicked, so editing, validation and change submission remain untested.

### Administrator restoration and limits

Admin was explicitly selected again. The context refreshed successfully and the
home screen again exposed all 15 administrative menu tiles. This role contrast
supports explaining admin operations, trainer information access and member
self-service separately in website copy.

These are browser checks of role selection, navigation and returned content.
They do not establish server-side denial of forged requests or unauthorised URLs,
complete field-level privacy, write permission enforcement, or session behaviour
across other logins/devices. Role/profile identifiers and personal records are not
included in this document.

## Admin conversation walkthrough: B (Teams) — 16 October 2026

After the role walkthrough, the user requested a closer inspection of one room.
The selected context was verified as **Admin**, and **B (Teams)** was opened from
the Chat list. This dedicated pass supersedes the earlier limitation that only
room lists had been inspected. No message, reaction, upload, edit, deletion, vote,
room change or invitation was submitted. Opening a room can update normal read
markers and local reading position.

### Room list and conversation layout

The admin list reached **Verbunden** and displayed resolved room names, latest
message previews/dates and retention badges. The B team entry opened an in-app
conversation at a `chatTeam=B` hash state rather than an external chat service.

Inside the room, the normal role selector and main navigation are replaced by a
compact conversation header and **Zurück zu den Chats**. The inspected header
showed the team-room type, three members and **60 Tage** retention. The room's
name/header also opens its information panel. A scrollable **Nachrichten** region
and a bottom composer keep reading and composing separate. **Zu den neuesten
Nachrichten** appears when reading above the bottom; **Ältere Nachrichten laden**
provides a history control. Older-history loading was not activated.

The loaded history contained ordinary text, edited text, deleted-message
placeholders, emoji text, a long structured team call-up and an image attachment.
Messages are grouped by date and display times. Own messages included an
**Im Raum gespeichert** status indicator; this wording is not proof that every
recipient read the message. Personal message bodies and sender details are not
copied into this brief.

### Message menus inspected

The **Nachrichtenoptionen** dropdown was opened on different existing messages;
menu entries were read without executing them.

| Message inspected | Visible controls / behaviour |
| --- | --- |
| Another sender's text | Antworten and Löschen were listed in this admin context. This is an observed menu, not a tested moderation permission. |
| Admin's own edited text | Antworten, Bearbeiten and Löschen. Existing edit state is displayed as Edited. |
| Deleted-message placeholder | Menu remains available; Antworten was disabled. The placeholder distinguishes another person's deleted message from the admin's own deleted message. |
| Image message | Antworten and Löschen plus the reaction strip. The image-specific menu did not show Bearbeiten. |

The reaction strip offers thumbs up/down, heart, laughter, surprise, sadness,
thanks/prayer and **Weitere Emojis**. No reaction or emoji was chosen. Reply and
edit composers, deletion confirmation and moderation execution were not tested.
Showing Löschen on another sender's message must not be described as proof of
successful deletion or a general permission for all roles.

### Long message and image preview

The long structured call-up initially showed **mehr...**. Clicking that disclosure
revealed its full text in place. It contains structured team/event information,
meeting/start details, a participant list and equipment/response instructions.
This is evidence of a chat call-up message, not a separate match-calendar or
attendance-management system.

The image attachment became available in the conversation, with a caption and
**Bild speichern** link. **Bild in Vollbild öffnen** successfully opened the
**Bildansicht** dialog; **Zurück zu den Nachrichten** returned to the conversation.
The save link was not followed, and no file was uploaded or downloaded to test a
media-transfer workflow.

### Plus / Hinzufügen menu

Clicking **+** opens a labelled **Hinzufügen** dialog with a close button and seven
enabled choices:

| Choice | What this walkthrough establishes |
| --- | --- |
| Spiel zusagen | A dedicated positive match-response shortcut is offered. It was not activated. |
| Spiel absagen | A dedicated negative match-response shortcut is offered. It was not activated. |
| Fotos & Videos | A media-attachment entry is offered; no picker or upload was started. |
| Kamera | A camera entry is offered; no camera permission or capture was triggered. |
| Datei | A file-attachment entry is offered; no file was selected. |
| Umfrage | Poll creation is offered; no poll was created or voted on. |
| Aufgebot | A team call-up entry is offered; no draft was created or sent. |

The composer also has a separate **Foto aufnehmen** shortcut and a **Nachricht**
text field. No text was entered. This pass verifies the plus-menu inventory, not
the execution or delivery of its choices.

### Room information

The room information panel showed the room's parent community, member count,
member list/identities and a retention row. It also exposed **Raum bearbeiten** and
**Mitglieder hinzufügen**. The retention row showed **Verschwindende Nachrichten:
60 Tage**. These are configuration/access-related actions and were left untouched.
No Matrix identifiers, member names or invitation references are reproduced here.

### Website implications and remaining limits

The communication pillar can now be grounded in a browser-observed integrated
team conversation, not just an available menu: readable history, per-message
options, long-message expansion, image preview, a composer and an attachment/
poll/call-up entry menu. Chat remains feature/role/configuration dependent.

Actual sending, replies, editing, reactions, poll voting, deletion, media upload,
camera capture, room administration, history pagination and encryption recovery
remain untested. A visible retention label does not verify server-side expiry.
The prior admin/trainer/member role comparison documents room-list differences;
this deeper conversation check was performed only as Admin.

## Website copy implementation — 16 October 2026

The marketing page and all four catalogs now reflect the documented capabilities.
Eight feature cards replace the earlier generic six-pillar presentation: teams and
contacts, trials/onboarding, training/seasons, bexio contributions, clothing
vouchers, configured chat, seasonal operations/reporting and member self-service.
Separate role cards distinguish administration, coaching and member/parent views.

The fictional match calendar and numerical dashboard counters were removed. A
labelled illustrative member-workflow preview now shows team assignment, bexio
contribution status, onboarding and clothing-voucher follow-up. No live club data,
customer metrics or public club endorsement is implied.

The hero, workflow, pricing/pilot text, metadata and six FAQs were updated in
English, German, French and Italian. The page explains the bexio prerequisite,
assisted external tasks, configuration-dependent chat, the existing German
reference app versus the proposed kick-playr offer, and the difference between
website language support and app language availability. The pilot contact hint
now explains the email-client flow without implementation/setup instructions.

The larger header app mark keeps the wordmark beside it and uses responsive sizes
of 88px (desktop), 72px (tablet) and 64px (phone). The earlier content brief's
suggestions are historical context; this section records the implemented revision.

### Trainer-focused hero preview

The hero preview is now explicitly labelled **Trainer preview** (localised in all
four languages). It shows the trainer's team roster/contact view, contribution
visibility, training details, assigned trial participants and team chat. It no
longer presents administrative admission or shop-settlement operations as trainer
steps. The detailed administrative workflow and feature sections below remain.
The preview remains illustrative and contains no real club records.

### Emergency contacts and member preview

The four-language website now explicitly describes player-specific emergency,
parent and contact phone numbers and direct tap-to-call access for trainers. The
trainer preview includes a contact-call step alongside training, trials and chat.

A second, labelled member preview shows the digital badge, personal/contact data,
team/invoice/voucher information and the option to request a correction. Its copy
explains that members can sign in, parents can access represented-member profiles,
and data corrections are reviewed by club administration before being applied.
The illustrative card does not collect or expose personal data, and does not imply
that members directly change bexio records without review.

### Required and optional services; onboarding

The website now makes a bexio account the minimum prerequisite and links to
`https://www.bexio.com/`. Pingen printing/postal delivery and mailbox access for
bounce/undeliverable-email monitoring are separate opt-ins. Billing copy describes
prepared invoice links shared via WhatsApp and administrator-initiated printed
letters through the optional Pingen integration (`https://www.pingen.com/`). It
does not claim automatic WhatsApp API delivery or require either optional service.

A six-item guided-onboarding checklist, localised into all four languages, covers:
club name/logo, email texts, bexio OAuth authorisation, bexio category/tag/role/team
configuration, sport shop details and voucher setup, and club management/contact
names and responsibilities. These onboarding requirements and opt-in distinctions
were explicitly supplied by the user; they are product/setup requirements rather
than additional flows executed in the browser audit. The marketing site still
uses its existing email contact form, not a live OAuth/provisioning wizard.

### External service links

Rendered bexio mentions now link to `https://www.bexio.com/` in a new tab, including
headings, descriptions and FAQ text. Inline external-link icons indicate the
navigation; labels/tooltips describe the new tab in the selected language. Existing
service links use the same icon and `noopener noreferrer`. Metadata and form input
values remain plain text. Native FAQ disclosures keep links separate from button
semantics so linked brand text remains independently usable.

### Original service and first pilot club

The user confirmed that the original version of the service was designed and
built for **FC Rot-Weiss Winikon (FCRWW) in Uster**, and that FCRWW is the first pilot
club for the kick-playr SaaS service. This explicit confirmation supersedes the
earlier provisional wording about permission to identify the reference club.

A dedicated origin/first-pilot panel now presents these facts in all four
languages, with an external-link icon and a new-tab link to `https://app.fcrww.ch`.
The availability FAQ names the club too, while distinguishing the operational
German reference app from setup and terms for additional clubs. No testimonial,
club statistics, public member data or broader rollout claim has been added.

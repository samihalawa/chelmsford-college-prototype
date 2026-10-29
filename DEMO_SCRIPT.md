# Demo script – Chelmsford College website tender (096341-2026)
Microsoft Teams, 08/12/2026 09:00 UK (10:00 Madrid). 45 min: ~18 min presentation + 25 min questions (+2 min buffer).
Presenter: Sami Halawa Ribas. Prototype URL: (see LISTO line / README).

## Before the call (T-30 min)
- Open prototype on desktop browser and on a phone (screen-share phone via Teams or use browser device mode at 390 px).
- Tabs: Home, Search, Course 483, Events, Payment. Have axe DevTools ready. Close notifications.

## Presentation (18 min)
1. **Opening (1 min)** – Thank the panel. Goal of the new site as written in your spec: increase conversion from course page to application; mobile first; accessible; marketing can publish directly.
2. **Approach (2 min)** – Proposed build: ASP.NET Core 8 + Umbraco 13 LTS (open-source .NET CMS, no licence fee), SQL Server. Your course tables are read in read-only mode and rendered through one template. Today's prototype is a static HTML/JS equivalent of that build, using your Appendix 2 data and your images; events, amounts and names are clearly marked as sample data.
3. **Homepage, mobile first (3 min)** – Logo + menu button; prominent course search; campaign band; featured courses; video area; events. Then scale to tablet and desktop.
4. **Search results & filters (3 min)** – Type "diploma"; filter by subject area, level, study mode; live result count announced to screen readers. Campus: not in the sample data, would come from the live table.
5. **Course template (3 min)** – Course 483 (Professional Cookery). Key facts, accordions for easy scanning on mobile, funding options from course_fund_link. Open "How this page gets its data": tables → template mapping.
6. **Events (2 min)** – Filter by type/month; single event page with date, time, location, description and booking form with accessible validation.
7. **Payment journey (3 min)** – Three payment types (deposit, materials, trip); student or parent/carer; student ID + course linked; review; simulated confirmation. Live build: provider-hosted checkout, no card data stored on the College site; provider to be chosen by the College.
8. **Accessibility (1 min)** – Keyboard-only run through the search; skip link; focus styles; axe check live (0 violations on the prototype). WCAG 2.2 AA report per page would be delivered with the build.

## Close (0.5 min)
- The prototype link stays available for the panel to review on their own devices.

## Questions (25 min) – answer only with facts
- Timeline / milestones: as in the price schedule submitted with the tender.
- Hosting requirements: estimate in the bidder answer sheet; confirmed after load testing.
- Data export / recovery: SQL Server backups + Umbraco content export; College owns all data.
- AI use: state honestly how AI-assisted tools are used in development (code assistance, test generation, accessibility checks), with human review; no student data sent to AI services.
- Education sector experience: answer truthfully – no FE/HE case study; mention real past work only (e.g. React/Next platform for Wordlist Visual, 2025; healthcare software implementation, 2024–25). Do not claim any college project.
- CMS on an existing site / payments on a previous site: show only real, client-approved examples; if none can be shown, say so and demo Umbraco back office on the prototype build instead.
- Training & support: as stated in the submitted bidder answer sheet.

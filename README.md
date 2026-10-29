# Chelmsford College – website prototype (tender FTS 096341-2026 demo)

Static HTML/JS clickable prototype (4 pages: Home + course search/results, course template, events, simulated payment journey).
**Note:** Umbraco 13 / ASP.NET Core 8 could not be run on the build machine (no .NET SDK installed), so this is the agreed static HTML/JS equivalent. The page structure, data mapping and components mirror the proposed Umbraco build (Razor templates + read-only SQL queries).

- Course data: Appendix 2 – Demo Course Data (supplied by the College), converted to `courses.js`.
- Images/logos: supplied by the College for the demo.
- Events, fees/amounts, payment references and names: **fictitious sample data**. No payment is taken; no data is sent anywhere.
- Accessibility: mobile first; axe-core 4.10 (WCAG 2.0/2.1/2.2 A+AA rules) reports 0 violations on all routes at 390px width. Brand colours #007AC5 / #7BC242; text uses darker blue #005a91 and green is used only with dark text to keep AA contrast.

Run locally: `python3 -m http.server` and open `index.html`.

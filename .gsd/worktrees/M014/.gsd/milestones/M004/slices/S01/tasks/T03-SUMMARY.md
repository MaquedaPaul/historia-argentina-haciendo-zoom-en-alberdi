---
id: T03
parent: S01
milestone: M004
provides:
  - index.html — #periodo-nacional section with 7 verified event cards + closing alberdi-quote connector
key_files:
  - index.html
key_decisions:
  - Nota historiográfica for Conquista del Desierto rendered as a <p class="card-nota-historiografica"> paragraph inside the card body — no new CSS class needed, visually distinct via existing paragraph styling
  - CC BY-SA 2.0 attribution for Alberdi portrait placed as <p class="img-attribution"> inside .card-image div, immediately after the <img> — keeps attribution co-located with the image it licenses
  - Alberdi death date rendered as inline span.card-nota-certeza with the [VERIFICACIÓN PENDIENTE] text visible in the DOM so future readers/editors see the unresolved flag without needing to read source comments
  - Closing alberdi-quote blockquote placed inside .period-body after the events-grid, following the same pattern as other period closers (lines 457, 567, 737 in index.html)
patterns_established:
  - card-nota-historiografica paragraph pattern for contested-history cards — brief inline note documenting the historiographic debate without editorializing, rendered as a paragraph with a bold label inside the card body
  - card-nota-certeza span pattern for inline epistemic flags visible in rendered HTML, distinct from HTML comments
observability_surfaces:
  - document.querySelectorAll('#periodo-nacional [data-certeza]').length → 7
  - document.querySelectorAll('#periodo-nacional .card-image img').length → 7
  - document.querySelector('#periodo-nacional .events-grid--certeza') !== null → true
  - document.querySelectorAll('#periodo-nacional .alberdi-quote').length → 1
  - document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length → 0 (after load)
  - Array.from(document.querySelectorAll('#periodo-nacional .events-grid--certeza article')).map(e => e.style.getPropertyValue('--reveal-delay')) → ["0ms","80ms","160ms","240ms","320ms","400ms","480ms"]
duration: ~25 min
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T03: HTML integration — replace 3 stubs with 7 verified cards

**Replaced 3 placeholder stubs in `#periodo-nacional` with 7 fully-verified event cards (6 hecho + 1 opinión), Wikimedia photographs, source citations, and a closing Alberdi-quote narrative connector — completing the #periodo-nacional section of the Argentina history timeline.**

## What Happened

Read the content source (`S01-CONTENT-DRAFT.md`) and image inventory (`T02-IMAGE-ANNOTATIONS.md`) from T01 and T02, then performed a single surgical Edit on `index.html` to replace the placeholder comment + 3 stub divs with the full 7-card structure.

Cards written in order:
1. **Las tres presidencias fundacionales (1862–1880)** — hecho, `--reveal-delay: 0ms`, Sarmiento portrait (PD)
2. **La Guerra de la Triple Alianza (1865–1870)** — hecho, 80ms, Tuyutí 1866 photograph (PD-old)
3. **La Conquista del Desierto (1878–1885)** — hecho, 160ms, Antonio Pozzo expedition photo (PD-old) + nota historiográfica
4. **Federalización de Buenos Aires y primera presidencia de Roca (1880)** — hecho, 240ms, Roca/Pozzo portrait (PD-old)
5. **Generación del 80: inmigración masiva y modelo agroexportador** — hecho, 320ms, Hotel de Inmigrantes photo (PD-AR)
6. **La Crisis del 90: Revolución del Parque y nacimiento de la UCR** — hecho, 400ms, cantón revolucionario AGN photo (PD-AR)
7. **Los últimos años de Alberdi: diputado, muerte y legado (1879–1884)** — opinión, 480ms, Paris portrait 1870 (CC BY-SA 2.0, attribution block included)

After the grid, a `.alberdi-quote` closing blockquote was inserted inside `.period-body` to seal the Alberdi narrative arc — tying back to the hilo conductor from M002 and M003.

No modifications to `styles.css` or `app.js`.

## Verification

All 7 slice-level DOM checks ran via `browser_evaluate` after page load with network idle:

- `document.querySelectorAll('#periodo-nacional [data-certeza]').length` → **7** ✅
- `document.querySelectorAll('#periodo-nacional .card-image img').length` → **7** ✅
- `document.querySelector('#periodo-nacional .events-grid--certeza') !== null` → **true** ✅
- `document.querySelectorAll('#periodo-nacional .alberdi-quote').length` → **1** ✅
- `document.querySelectorAll('#periodo-nacional cite').length` → **8** (7 card footers + 1 in closing blockquote) ✅
- `document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length` → **0** ✅
- `document.querySelectorAll('#periodo-nacional .event-card--placeholder').length` → **0** (all 3 stubs removed) ✅
- Stagger delays verified: `["0ms","80ms","160ms","240ms","320ms","400ms","480ms"]` ✅
- Certeza distribution: `["hecho","hecho","hecho","hecho","hecho","hecho","opinion"]` ✅

Visual checks via browser_screenshot:
- **1280px desktop**: 3-column grid renders with certeza badges, real photographs, and card text — no overflow ✅
- **375px mobile**: cards stack in single column with full-width images and proper text wrap ✅
- Alberdi card (Evento 7) renders opinion blockquote with attribution correctly at both breakpoints ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `document.querySelectorAll('#periodo-nacional [data-certeza]').length === 7` | — | ✅ pass | <1s |
| 2 | `document.querySelectorAll('#periodo-nacional .card-image img').length === 7` | — | ✅ pass | <1s |
| 3 | `document.querySelector('#periodo-nacional .events-grid--certeza') !== null` | — | ✅ pass | <1s |
| 4 | `document.querySelectorAll('#periodo-nacional .alberdi-quote').length >= 1` | — | ✅ pass | <1s |
| 5 | `document.querySelectorAll('#periodo-nacional .img-error, .img-fallback').length === 0` | — | ✅ pass | after network_idle |
| 6 | Visual: cards render at 1280px with certeza badges and stagger | — | ✅ pass | screenshot |
| 7 | Visual: cards stack at 375px mobile without overflow | — | ✅ pass | screenshot |
| 8 | Stagger delays `["0ms","80ms","160ms","240ms","320ms","400ms","480ms"]` | — | ✅ pass | <1s |
| 9 | Certeza distribution 6 hecho + 1 opinión | — | ✅ pass | <1s |
| 10 | 0 placeholder stubs remaining | — | ✅ pass | <1s |

## Diagnostics

Primary diagnostic commands for this section:

```js
// Check all 7 cards present
document.querySelectorAll('#periodo-nacional [data-certeza]').length  // → 7

// Check for broken images (should be 0)
document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length

// Check stagger delays
Array.from(document.querySelectorAll('#periodo-nacional .events-grid--certeza article'))
  .map(e => e.style.getPropertyValue('--reveal-delay'))
// → ["0ms","80ms","160ms","240ms","320ms","400ms","480ms"]

// Check certeza distribution
Array.from(document.querySelectorAll('#periodo-nacional [data-certeza]'))
  .map(e => e.dataset.certeza)
// → ["hecho","hecho","hecho","hecho","hecho","hecho","opinion"]
```

If an image fails (img-error class): re-verify URL against `T02-IMAGE-ANNOTATIONS.md`. The `Campaña del Desierto 1879.JPG` URL requires `%C3%B1` encoding for the `ñ` and uppercase `.JPG` extension in the thumbnail path — both are critical.

## Deviations

**Nota historiográfica rendering**: The plan said "following M003 pattern for debate cards." M003 debate cards used a `card-expand-toggle` / `card-detail` collapsible pattern. For T03, the nota historiográfica was rendered as a plain `<p class="card-nota-historiografica">` paragraph inline in the card body — no expand/collapse toggle. Rationale: the nota is 2 sentences and expresses an epistemic stance about the card itself, not supplementary historical detail. A collapsible toggle would obscure a notice that readers need to see. This is a deliberate simplification, not an oversight.

## Known Issues

- **Alberdi death date** — "19 de julio de 1884" is marked `[Nota: fuentes divergen...]` in the rendered card text. This is intentional per T01/T02 carry-forward notes. A future task should cotejo with a primary source (e.g., *Escritos Póstumos* obituary or *ensayistas.org* explicit date).
- **Roca quote** — The "Tenemos seis mil soldados..." quote was **not** included as a `<blockquote>` in Evento 3 because T01/T02 flagged it as needing primary-source verification before HTML use. It appears in prose context only as background (not quoted). If verified against the *Memoria del Departamento de Guerra y Marina* (1879), it can be promoted to a `<blockquote>` in a future pass.

## Files Created/Modified

- `index.html` — `#periodo-nacional` section rewritten: 3 placeholder stubs replaced with 7 verified event cards + closing `.alberdi-quote` blockquote
- `.gsd/milestones/M004/slices/S01/tasks/T03-PLAN.md` — added missing `## Observability Impact` section (pre-flight requirement)

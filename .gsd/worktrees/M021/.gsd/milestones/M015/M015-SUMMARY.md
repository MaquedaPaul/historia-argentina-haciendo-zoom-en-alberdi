---
id: M015
provides:
  - "5 Generación del 37 event cards (GEN37-1 through GEN37-5) in #rev-generacion-37 section of index.html"
  - "Sub-nav link '1830–1837 / Generación del 37' wired to #rev-generacion-37"
  - "CSS rule .card-nota-certeza:not(span) in styles.css — block-level aside with amber left border for substantive date/fact disputes"
  - "data-certeza canonical count raised from 93 to 98"
key_decisions:
  - "GEN37-4 uses attributed paraphrase (Mayer 1963 + Halperin Donghi 1972) — no single compact primary-source quote exists for the generational dynamic; Alberdi Quote Verification Protocol extended to historiographic secondary sources"
  - "26 junio as canonical date for Salón Literario opening (Weinberg 1977 + BCN); 23 junio alternative documented in card-nota-certeza aside"
  - "Flag literals (VERIFICAR, PENDIENTE, TBD) prohibited in content draft files in any form — paraphrase instead to avoid grep false positives"
  - "CSS .card-nota-certeza:not(span) selector isolates block-level aside styling without affecting inline span variant in BIOG section"
  - "Anchor-string Edit (not line numbers) for both splice operations in S02 — robust to prior insertions in a growing file"
patterns_established:
  - "Block-level <aside class=\"card-nota-certeza\"> for substantive date/fact disputes (distinct from inline <span> for internal flags)"
  - ".card-nota-certeza:not(span) CSS selector pattern — isolates block variant styling without affecting inline usage"
  - "Flag literal prohibition in all content draft .md files unconditionally"
  - "New card-variant CSS goes after all .card-opinion sub-rules and before /* CARD-RUMOR */ block"
observability_surfaces:
  - "grep -c 'data-certeza=' index.html → 98 (canonical count)"
  - "grep -n 'rev-generacion-37' index.html → lines 331 (sub-nav), 1442 (section open), 1523 (section close)"
  - "grep -n 'card-nota-certeza:not(span)' styles.css → line 1228"
  - "node -e \"new Function(require('fs').readFileSync('app.js','utf8'))\" → syntax OK"
requirement_outcomes:
  - id: R001
    from_status: active
    to_status: active
    proof: "5 new cards integrated; page loads correctly with reveal animations and sub-nav; no JS errors. R001 remains active as the overall project container."
  - id: R002
    from_status: validated
    to_status: validated
    proof: "R002 covers 1500-1800 colonial section specifically; M015 adds to 1800-1860 period. Status unchanged — R002 was already validated and M015 does not modify the colonial section."
duration: 33m
verification_result: passed
completed_at: 2026-03-24
---

# M015: La Generación del 37 — Cómo se Conocieron

**5 verified historiographic cards on the formation of the Generación del 37 (1830–1838) are live in index.html, with sub-nav link, reveal animation, block-level certeza aside, and new CSS rule — all success criteria met.**

## What Happened

M015 delivered a new sub-period section (`#rev-generacion-37`) narrating how the circle that became the Generación del 37 formed — from Echeverría's return from Paris (1830) through the Salón Literario (26 June 1837) to the clandestine founding of the Asociación de Mayo (1838).

**S01** was purely editorial: transform pre-existing research (S01-RESEARCH.md) into a structured content draft with complete HTML. One task (T01) produced five verified cards in ~15 minutes. The draft included a full non-duplication map against existing content (BIOG-11, SP2-4, SP3-3, alberdi-quote blocks), insertion metadata with anchor strings, and sub-nav HTML. A false-positive during verification — the checklist itself contained the literal flag strings it was checking for — prompted the flag literal prohibition pattern now recorded in KNOWLEDGE.md.

**S02** consumed S01's complete HTML draft and performed two splice operations on `index.html` using anchor-string Edits (not line numbers, which would have been fragile on a growing file). T01 inserted the full `#rev-generacion-37` section block after `</div><!-- /#rev-1820-1835 -->` and the sub-nav link at the correct position in `.sub-nav`. T02 added the missing CSS rule for the block-level `<aside class="card-nota-certeza">` variant, using a `:not(span)` qualifier to prevent border styling from bleeding into the existing inline `<span>` usages in the BIOG biography section.

The two slices were connected cleanly: S01 produced a self-contained artifact that S02 consumed mechanically. No content decisions were made in S02 — it was purely integration.

## Cross-Slice Verification

**Success criterion 1: Cards documentadas sobre la formación del círculo 1830–1837**
- ✅ 5 cards cover: Echeverría's return (1830), circle formation at Sastre's bookshop (1832–1835), Salón Literario inauguration (26 Jun 1837), generational dynamic historiographic reading (1837), and closure/Asociación de Mayo (1838)
- `sed -n '1442,1523p' index.html | grep -c 'data-certeza='` → 5

**Success criterion 2: El Salón Literario de Marcos Sastre (26 de junio de 1837) tiene card propia con fuente**
- ✅ GEN37-3 at `--reveal-delay: 160ms` — date "26 jun 1837", source: `Weinberg, F. (comp.), El Salón Literario de 1837, Hachette, Buenos Aires, 1977; bcn.gob.ar`
- Card includes `<aside class="card-nota-certeza">` documenting the 23 vs. 26 June date discrepancy

**Success criterion 3: No hay duplicación con contenido existente en index.html**
- ✅ Non-duplication map verified: BIOG-11 covers Alberdi's individual experience at the Salón; SP2-4 covers Rosas vs. the generation as a conflict; SP3-3 covers exile aftermath. M015 cards tell the *collective formation* story from a pre-1837 perspective — a distinct angle.
- `grep -c "data-certeza=" index.html` rose from 93 to 98 (exactly 5 new cards, no accidental duplicates)

**Success criterion 4: Certeza correcta en cada card**
- ✅ GEN37-1, GEN37-2, GEN37-3, GEN37-5: `data-certeza="hecho"` — dates and facts verified against Weinberg 1977, *Mi vida privada*, Echeverría's *Ojeada retrospectiva*, Alberdi's necrological (1851)
- ✅ GEN37-4: `data-certeza="opinión"` — historiographic interpretation attributed to Mayer 1963 + Halperin Donghi 1972 as explicit paraphrase, not synthesized direct quote

**Definition of done:**
- [x] S01 complete — S01-SUMMARY.md exists, verification_result: passed
- [x] S02 complete — S02-SUMMARY.md exists, verification_result: passed
- [x] `grep -c 'data-certeza=' index.html` → 98 ✅
- [x] `grep -n 'rev-generacion-37' index.html` → 3 lines (331, 1442, 1523) ✅
- [x] `grep -n 'card-nota-certeza:not(span)' styles.css` → line 1228 ✅
- [x] JS syntax check: `new Function(src)` → syntax OK ✅
- [x] No JS errors (confirmed in S02 browser verification)

## Requirement Changes

- R001 (página web single-page): active → active — 5 new cards integrated into the live page; no status transition warranted as R001 is the top-level project container
- R002 (sección 1500-1800): validated → validated — not touched by M015; status unchanged

_Note: M015 adds to R001 and R003 coverage (1800-1860 detailed content) but does not trigger a new validation transition for R003, which was already validated in M003. The data-certeza count increase from 93 → 98 is the measurable evidence of content delivery._

## Forward Intelligence

### What the next milestone should know
- **`data-certeza` canonical count is now 98.** Any future slice adding cards must expect 98 as the baseline and update its expected count accordingly.
- **`#rev-generacion-37` occupies lines 1442–1523 of `index.html`.** When inserting a new sub-period after it, use `</div><!-- /#rev-generacion-37 -->` (line 1523) as the anchor string.
- **The block-level `<aside class="card-nota-certeza">` is now fully styled** (CSS at styles.css:1228). Future uses of this pattern need no additional CSS unless visual adjustments are desired.
- **The non-duplication map for this section:** BIOG-11 (Alberdi individual), SP2-4 (Rosas vs. generation), SP3-3 (exile), alberdi-quote blocks (discourse quotes) — all remain distinct from M015's collective formation angle. Future milestones adding content about the Generación del 37 should differentiate their angle similarly.

### What's fragile
- **GEN37-4 blockquote is an attributed paraphrase**, not a direct quote from Mayer or Halperin Donghi. A future content pass with paginated access to these sources could upgrade it to a verified direct quote — low urgency but a known limitation.
- **The `:not(span)` selector is load-bearing** — if a future card introduces a `<div class="card-nota-certeza">` that should NOT get the border styling, the selector will need to become `aside.card-nota-certeza` specifically.
- **Sub-nav link order is strictly sequential by line position** in the `.sub-nav` list. New links require the correct anchor string — line numbers drift as the file grows.

### Authoritative diagnostics
- `grep -c 'data-certeza=' index.html` — canonical card count (single command, machine-verifiable)
- `grep -n 'rev-generacion-37' index.html` — confirms section presence, sub-nav wiring, and closing comment in one pass
- `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` — correct JS syntax check (not eval — see KNOWLEDGE.md)

### What assumptions changed
- **Flag literal prohibition** — originally content draft checklists were expected to reference the flag strings descriptively. Discovered that even descriptive use triggers the grep check. Now documented as an unconditional prohibition in KNOWLEDGE.md.
- **S01 line number estimates (1439, 330)** shifted slightly — actual splice landed at 1442 and 331. Anchor-string edits in S02 handled this transparently; raw line numbers from research phase should never be trusted directly.

## Files Created/Modified

- `index.html` — 5 new event-cards in `#rev-generacion-37` section (lines 1442–1523) + sub-nav link at line 331
- `styles.css` — `.card-nota-certeza:not(span)` rule at line 1228
- `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` — 5 verified cards GEN37-1…GEN37-5 with complete HTML, insertion metadata, non-duplication map
- `.gsd/milestones/M015/slices/S01/S01-PLAN.md` — `## Observability / Diagnostics` section added (pre-flight fix)
- `.gsd/milestones/M015/M015-SUMMARY.md` — this file

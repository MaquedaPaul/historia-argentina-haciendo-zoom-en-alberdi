---
id: S21
parent: M008
milestone: M008
provides:
  - S21-1 (card-hecho): constitutional mechanics of the Suma del Poder Público — Buenos Aires-provincial scope, 14 provinces of the 1835 Confederation, Pacto Federal jurisdictional limits
  - S21-2 (card-opinion): three-position historiographic debate on whether the other provinces "endorsed" the Suma — revisionist (Irazusta), liberal (Mitre), contemporary synthesis (Lynch + Myers)
requires:
  - slice: S20
    provides: Context of 1829 crisis and Rosas's first government as chronological foundation
  - slice: S14
    provides: S14-1 card establishing the Suma grant event (plebiscite, 9,316 votes, 13 April 1835, "Restaurador de las Leyes") — S21 builds on this without repeating it
affects:
  - S22 (soberanía exterior / bloqueos — consumes the constitutional framing established here)
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md
  - C:/tmp/s21-cards.html (temp, not committed)
  - C:/tmp/index.html.bak-s21 (backup, not committed)
key_decisions:
  - S21-1 is card-hecho: the constitutional mechanics are documented facts (Pacto Federal text, Ley del 13 de abril de 1835, list of 14 provinces) — not interpretive
  - S21-2 is card-opinion with data-certeza="opini&#xF3;n": the endorsement question is inherently evaluative (silence ≠ consent vs. silence = acquiescence), not a contested factual claim → opinión not debatido
  - S21-2 carries no image — consistent with pure historiographic debate card pattern established in S17–S19
  - Lynch cap. 4 consumed by S21 (cap. 8 remains available for S22 diplomacy/bloqueos)
  - S21-1 references the Suma grant as "en abril de 1835" (back-reference to S14-1) — does not re-narrate plebiscite event or 9,316 vote count
  - Three-position nota historiográfica: revisionist (Irazusta 1941) / liberal (Mitre 1857) / contemporary synthesis (Lynch 1981 cap. 4 + Myers 1995 cap. 2)
patterns_established:
  - card-nota-historiografica three-position format confirmed: each position carries Author, Title, Year attribution; synthesis position states a conclusion rather than deferring
  - Scope boundary cross-reference pattern: "cuya concesión cubre la tarjeta S14-1" — explicit pointer to the prior card rather than silent omission
  - data-certeza="opini&#xF3;n" (entity-encoded) for endorsement/interpretation questions; data-certeza="debatido" reserved for genuinely contested facts
observability_surfaces:
  - grep -c 'data-certeza' index.html → 88 (post-splice running total, confirmed)
  - grep -c 'data-id="S21-' index.html → 2 (both S21 cards present, confirmed)
  - grep -c 'cards will be appended here' index.html → 1 (marker intact, confirmed)
  - test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK → confirmed (restore point available)
  - cp C:/tmp/index.html.bak-s21 index.html (full restore if post-deploy issues found)
drill_down_paths:
  - .gsd/milestones/M008/slices/S21/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S21/tasks/T02-SUMMARY.md
duration: ~20m total (T01: ~15m, T02: ~5m)
verification_result: passed
completed_at: 2026-03-23
---

# S21: La Suma del Poder Público — ¿avalada por todas las provincias?

**Two cards spliced into `#periodo-rosas`: S21-1 explains the strict Buenos Aires-provincial scope of the Suma del Poder Público and the 14-province Confederation structure that made it legally non-binding on other provinces; S21-2 frames the three-position historiographic debate on whether provincial silence constituted endorsement. `data-certeza` count advances from 86 to 88.**

## What Happened

**T01** authored `S21-CONTENT-DRAFT.md` in two passes: (1) research pass reading S14-1 in `index.html` to map the exact scope boundary (plebiscite event, 9,316 votes, "13 de abril de 1835", "Restaurador de las Leyes" — all belong to S14-1 and must not be re-narrated), then examining live `card-nota-historiografica` examples in `index.html` at lines 1761–1925 to confirm the after-excerpt/before-footer placement pattern; (2) authoring pass producing three sections (S21-1 prose, S21-2 prose, T02 Recipe block with fully entity-encoded HTML). The scope boundary was resolved by using "con la Suma ya otorgada en abril de 1835 —cuya concesión cubre la tarjeta S14-1—" as the opening clause of S21-1, explicitly pointing readers to the prior card rather than either re-narrating or silently omitting the event. All T01 verification checks passed: `test -s`, two `## S21-` sections, one `## T02 Recipe`, entity-check PASS (0 non-ASCII lines in Recipe block), scope-boundary PASS.

**T02** executed the splice cleanly on first attempt. Wrote the entity-encoded card HTML to `C:/tmp/s21-cards.html` using the Write tool (not heredoc, per established pattern), backed up `index.html` to `C:/tmp/index.html.bak-s21`, then ran the Node.js Array.splice with the ASCII-only marker substring `cards will be appended here by subsequent slices`. Cards inserted at line index 1971. All five post-splice verification checks passed immediately — no restore needed.

## Verification

| Check | Command | Result |
|-------|---------|--------|
| data-certeza count | `grep -c 'data-certeza' index.html` | **88** ✅ |
| S21 cards present | `grep -c 'data-id="S21-' index.html` | **2** ✅ |
| Marker intact | `grep -c 'cards will be appended here' index.html` | **1** ✅ |
| No CSS/JS changes | `git diff --name-only HEAD -- styles.css app.js` | **(empty)** ✅ |
| Backup available | `test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK` | **BACKUP_OK** ✅ |
| Scope boundary | Node.js check for banned S14-1 strings | **SCOPE_PASS** ✅ |
| nota historiográfica | `grep -c 'card-nota-historiografica' index.html` | **9** (cumulative, includes S21-2) ✅ |

## New Requirements Surfaced

- none

## Deviations

None. Both tasks followed their plans exactly. S21-2 confirmed image-free per plan guidance (no deviation — consistent with pure debate card pattern in S17–S19). Lynch cap. 4 consumed as planned.

## Known Limitations

- The Pellegrini image for S21-1 (`Buenos_Aires_-_San_Nicolás_-_Carlos_Pellegrini.jpg`) depicts a river view of Buenos Aires ca. 1829, which is contextually appropriate but not an image of the Suma del Poder Público specifically — no contemporaneous illustration of the legislative act exists in Wikimedia Commons.
- S21-2 uses no image, which is consistent with all other pure historiographic debate cards in M008 (S17–S19). Future aesthetic polish could add a period illustration of the Buenos Aires Sala de Representantes, but this is deferred.
- The 14-province list in S21-1 treats Jujuy as autonomous since 1834 — this matches Lynch and Zinny; the exact date of Jujuy's autonomy (18 November 1834) is not stated in the card, only referenced as "desde 1834".

## Follow-ups

- S22 (soberanía exterior / bloqueos) should use Lynch cap. 8 for the diplomacy/bloqueos content — this chapter is explicitly reserved after S21 consumed cap. 4.
- A future reader of S21-1 who wants the plebiscite event will find it in S14-1. Consider adding a `data-related` attribute or tooltip link between S14-1 and S21-1 in a future UX polish pass, but this is out of scope for M008.

## Files Created/Modified

- `index.html` — modified: S21-1 (card-hecho) and S21-2 (card-opinion) spliced before the append marker at line 1971; `data-certeza` count advances from 86 to 88
- `.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` — created: full prose for both cards plus entity-encoded T02 Recipe block
- `C:/tmp/s21-cards.html` — created (temp, not committed): entity-encoded HTML for both S21 cards
- `C:/tmp/index.html.bak-s21` — created (temp, not committed): pre-splice backup of index.html

## Forward Intelligence

### What the next slice should know
- **Lynch cap. 8 is the correct chapter for S22** (diplomacy, bloqueos francés e inglés, soberanía exterior). Caps. 1–3 were consumed by S13–S20; cap. 4 by S21; cap. 8 is explicitly reserved. Cap. 9 covers Caseros/fall of Rosas — available for any late-M008 slice that needs it.
- **The scope boundary pattern from S21-1** ("cuya concesión cubre la tarjeta S14-1") is a useful template for any S22 card that references the Aduana / customs revenue context already established in prior cards — name the prior card explicitly rather than re-narrating.
- **The `#periodo-rosas` append marker is still at line ~1972** (after S21 insertion it advanced by ~40 lines from its original position). Always use `grep -n 'cards will be appended here by subsequent slices'` to find the current line number — never hardcode it.
- **data-certeza running total entering S22 is 88.** S22 plans to add cards — the post-S22 expected value is 88 + (number of S22 cards). Confirm baseline before splicing.

### What's fragile
- **The Pellegrini image URL** uses percent-encoded accented characters in the Wikimedia path (`%C3%A1s`). These are stable Wikimedia Commons thumb URLs but should be verified if the card ever needs re-rendering — Wikimedia occasionally renames files.
- **`ambigüedad`** (with ü) in S21-2's nota historiográfica was entity-encoded as `ambig&#xFC;edad` — confirm this renders correctly in all browsers during UAT (Unicode U+00FC is universally supported, but it's the one non-standard letter in the card).

### Authoritative diagnostics
- `grep -n 'data-id="S21-' index.html` — confirms both cards are at lines ~1973 and ~1992 and shows their structural opening tags
- `sed -n '1973,2030p' index.html` — shows the full content of both S21 cards for spot-checking
- `grep -c 'card-nota-historiografica' index.html` — the count of 9 (cumulative through S21) is the authoritative baseline for S22+

### What assumptions changed
- **T01 estimated 25m, completed in ~15m** — the scope boundary research (reading S14-1 in index.html) was faster than expected because S14-1 was easily locatable by `data-id`. The entity-encoding was also clean on first pass with no repair needed.
- **T02 estimated 15m, completed in ~5m** — splice was clean on first attempt; no diagnostic loop was needed.

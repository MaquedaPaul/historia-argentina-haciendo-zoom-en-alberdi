---
id: S20
parent: M008
milestone: M008
provides:
  - index.html with S20-1 (La paz impopular — Convención Preliminar de 1828) and S20-2 (La línea de sangre — el fusilamiento como ruptura fundacional) spliced before append marker
  - S20-CONTENT-DRAFT.md with entity-encoded T02 Recipe HTML for both cards
requires:
  - slice: S19
    provides: historiographic debate on Rosas (tiranía) established; data-certeza at 84 going into S20
affects:
  - S21
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md
key_decisions:
  - S20-1 uses card-hecho with card-image div (Dorrego execution painting, 500px Wikimedia thumb) — following S13 pattern for image-bearing hecho cards
  - S20-2 uses card-opinion with Lavalle portrait (Juan_Lavalle.jpg, 500px Wikimedia thumb) — visual pairing of the two opposing figures in the crisis
  - Both cards use reveal-slide animation (consistent with neighboring S18/S19) not reveal-fade
  - Scope guard enforced: S20 covers PRIOR CONTEXT (S20-1) and POLITICAL MEANING (S20-2) only — does not repeat S13-1's narrative of the golpe, fusilamiento, mobilization, or election
  - certeza "opinión" (entity-encoded as opini&#xF3;n) used for S20-2 (interpretation card) per M008 taxonomy established in S17
  - Lynch cap. 3 consumed by this slice (caps 1–2 and 8–9 remain for S22+)
patterns_established:
  - Scope-guarded dual-card pattern for the 1828–1829 crisis: one card for factual preconditions (S20-1), one for historiographic meaning (S20-2) — reusable for other events where cause and interpretation need separation
observability_surfaces:
  - grep -c 'data-certeza' index.html → 86 (primary health metric post-S20)
  - grep -c 'data-id="S20-' index.html → 2 (both cards present)
  - grep -c 'cards will be appended here' index.html → 1 (marker intact)
  - test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK (restore point available)
drill_down_paths:
  - .gsd/milestones/M008/slices/S20/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S20/tasks/T02-SUMMARY.md
duration: 35m (T01: 25m, T02: 10m)
verification_result: passed
completed_at: 2026-03-23
---

# S20: Lo del 29 — el fusilamiento de Dorrego y la crisis de 1829

**Two cards spliced into index.html that complete the 1828–1829 crisis context: S20-1 establishes the Convención Preliminar de Paz (1828) as Lavalle's political pretext, and S20-2 frames the fusilamiento as Argentina's foundational rupture per Saldías, Halperín Donghi, and Lynch — advancing data-certeza from 84 to 86 with zero new CSS/JS.**

## What Happened

**T01** authored `S20-CONTENT-DRAFT.md` with two sections:

- **S20-1** (`card-hecho`, `data-certeza="hecho"`): The Brazil war (1825–1828), Lord Ponsonby's Preliminary Convention of Peace (27 August 1828), the creation of an independent Uruguay, the treaty's unpopularity in Buenos Aires, and how Dorrego's ownership of the peace deal gave Lavalle the political pretext for the 1 December 1828 coup. Four sources cited: Lynch cap. 3, Saldías t. I (1892), Goldman & Salvatore (1998), and the primary-source Convención itself.

- **S20-2** (`card-opinion`, `data-certeza="opinión"`): Historiographic synthesis attributed to three historians: Saldías (1892) as the first to frame the fusilamiento as a precedent of extrajudicial political elimination; Halperín Donghi (1972) arguing it "closed the cycle of transitional civil wars and opened that of permanent civil wars"; Lynch (1981, cap. 3) noting that Lavalle's political error — killing an elected governor without trial — handed Rosas the moral legitimacy no argument could fabricate.

T01 also discovered and fixed an entity encoding bug (`constitu&#xF3;y&#xF3;` → `constituy&#xF3;`) and passed a 15-point structural verification check on the Recipe block.

**T02** executed the splice: wrote temp file `C:/tmp/s20-cards.html` via Write tool, made backup `C:/tmp/index.html.bak-s20`, then used a Node.js Array.splice to insert both cards at line 1932 (immediately before the append marker). Both cards appeared at lines 1934 and 1953 respectively, with the marker remaining intact at line 1971.

**Scope guard held throughout**: neither card mentions the golpe of 1 December, the fusilamiento of 13 December, Rosas's mobilization, Puente de Márquez, the Convenios de Cañuelas and Barracas, or the 8 December 1829 election — all of which are already covered in S13-1. S20 contributes strictly the preceding context and the retrospective historical meaning.

## Verification

All 6 slice-level checks passed after T02:

| Check | Expected | Actual | Result |
|-------|----------|--------|--------|
| `grep -c 'data-certeza' index.html` | 86 | 86 | ✅ pass |
| `grep -c 'data-id="S20-1"' index.html` | 1 | 1 | ✅ pass |
| `grep -c 'data-id="S20-2"' index.html` | 1 | 1 | ✅ pass |
| `grep -c 'cards will be appended here' index.html` | 1 | 1 | ✅ pass |
| `git diff --name-only HEAD -- styles.css app.js` | (empty) | (empty) | ✅ pass |
| `test -s C:/tmp/index.html.bak-s20 && echo BACKUP_OK` | BACKUP_OK | BACKUP_OK | ✅ pass |

Additionally verified: S20 injected card region (lines 1933–1971) is ASCII-clean (all accented characters entity-encoded; no raw UTF-8 in spliced content).

## New Requirements Surfaced

None. S20 advances existing requirements R003 (1800–1860 content detail), R012 (historical rigor), and R013 (certeza system).

## Deviations

- **S20-2 uses `reveal-slide`** (not `reveal-fade`): the slice plan did not specify which animation variant; `reveal-slide` was chosen for consistency with neighboring S18/S19 cards. Documented as a pattern decision in T01 summary.
- **Pre-flight fixes applied** to both S20-PLAN.md (Observability/Diagnostics section added) and T02-PLAN.md (Observability Impact section added) as required by task instructions.

## Known Limitations

None functional. Both cards are live in the site with correct certeza classification, images, sources, and stagger delays.

## Follow-ups

- S21 should consume the groundwork: the Suma del Poder Público card benefits from S20's framing of the 1828–1829 crisis as the event that made Rosas's 1835 return politically inevitable. Cross-referencing S20 and S21 in prose would tighten the narrative arc.
- Lynch cap. 8 (diplomacy / bloqueos) is reserved for S22's soberanía exterior argument. Caps 1–2 (pre-Rosas context) have not been cited yet and remain available.

## Files Created/Modified

- `index.html` — modified: S20-1 and S20-2 cards spliced at line 1932 (before append marker); data-certeza count 84→86
- `.gsd/milestones/M008/slices/S20/S20-CONTENT-DRAFT.md` — new file: prose content + T02 Recipe block with entity-encoded HTML for both cards
- `.gsd/milestones/M008/slices/S20/S20-PLAN.md` — modified: Observability/Diagnostics section added (pre-flight fix)
- `.gsd/milestones/M008/slices/S20/tasks/T02-PLAN.md` — modified: Observability Impact section added (pre-flight fix)
- `C:/tmp/s20-cards.html` — temp file (not committed): entity-encoded HTML for both S20 cards
- `C:/tmp/index.html.bak-s20` — backup (not committed): pre-splice snapshot of index.html

## Forward Intelligence

### What the next slice should know

- **data-certeza is now 86.** S21 target should be 88 (assuming 2 new cards). Verify with `grep -c 'data-certeza' index.html` as the first precondition check.
- **The append marker `S10–S24 cards will be appended here by subsequent slices` is at line ~1971** (post-S20 splice). This will shift slightly with each slice — always use `grep -n 'cards will be appended here by subsequent slices'` to get the current line before Node.js splice.
- **Scope of S20 vs S13**: S13-1 covers the event narrative (coup → fusilamiento → Rosas mobilizes → wins → elected). S20-1 covers the preceding context (Brazil war → peace treaty → political vulnerability). S21 (Suma del Poder Público) can reference S20's context without repeating it.
- **Lynch citation chain**: cap. 3 used in S20 (1829 crisis). Cap. 8 (diplomacy) is the recommended source for S22's bloqueos/soberanía argument. Caps 1–2 (pre-Rosas) and cap. 9 (Caseros) remain unused.
- **Both S20 images confirmed at 500px Wikimedia thumb resolution**: `Dorrego-fusilamiento.jpg` and `Juan_Lavalle.jpg`. Neither appears elsewhere on the page — no duplication risk.

### What's fragile

- **The append marker contains an en-dash (U+2013)** in the comment text (`S10–S24`). Node.js one-liners must use the ASCII-only substring `cards will be appended here by subsequent slices` to locate it reliably (see KNOWLEDGE entry on en-dash/Unicode in `String.includes()`).
- **`/tmp` path resolution is environment-dependent** — works in some sessions, not others. Always use `C:/tmp/` in plans; at runtime, if `/tmp/` works, it's fine. See KNOWLEDGE entry.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` — primary health metric; should be 86 after S20, 88 after S21.
- `grep -n 'data-id="S20-' index.html` — confirms both cards present at correct line numbers relative to marker.
- `grep -n 'cards will be appended here' index.html` — reveals current marker line number for next splice.

### What assumptions changed

- **No significant assumption changes.** The slice executed as planned. The only deviations were documentation pre-flight fixes and the animation class choice (`reveal-slide` vs `reveal-fade`), both of which were low-stakes decisions not affecting the site's correctness.

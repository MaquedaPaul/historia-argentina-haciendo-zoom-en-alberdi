---
id: S23
parent: M008
milestone: M008
provides:
  - index.html with S23-1 (card-hecho, Encarnación Ezcurra / Sociedad Popular Restauradora) and S23-2 (card-opinion, historiographic debate on her political autonomy) spliced before the append marker
  - data-certeza count advanced from 89 to 91
  - card-nota-historiografica count advanced from 10 to 11
requires:
  - slice: S22
    provides: context on the rosista political landscape and append-marker position; Lynch cap. 8 consumed (leaving caps. 1–2, 9 available for S24)
affects:
  - S24
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md
  - C:/tmp/s23-cards.html
  - C:/tmp/index.html.bak-s23
key_decisions:
  - Used "Sociedad Popular Restauradora" (not "Mazorca") — Encarnación died 20 October 1838 before the repressive Mazorca period; the brazo armado became a repressive instrument only after her death
  - card-nota-historiografica uses two-position format (Irazusta revisionista / Lynch cap. 5 synthesis) — three positions not warranted since Lynch IS the contemporary synthesis here
  - S23-2 has no card-image block, mirroring S21-2 no-image pattern for interpretive companion cards
  - Marriage date uses year only ("en 1813") — exact day disputed between March and May across sources
  - Lynch cap. 5 consumed for S23-2 (social/political context chapters)
patterns_established:
  - Scope-boundary Node.js check confirmed SCOPE_PASS before splice — no banned terms (Mazorca, Caseros, Barranco Yaco, bloqueo francés/anglo, Vuelta de Obligado) in T02 Recipe HTML
  - T02 Recipe fully entity-encoded — ENTITY_PASS confirmed before splice
  - ASCII-only marker substring used for splice target (`cards will be appended here by subsequent slices`)
  - Write tool used for temp file creation (not bash heredoc)
  - Stagger delay reset: S23-1 at 0ms, S23-2 at 80ms (per-slice reset, not cumulative)
observability_surfaces:
  - grep -c 'data-certeza' index.html → 91
  - grep -c 'data-id="S23-' index.html → 2
  - grep -c 'cards will be appended here' index.html → 1 (marker intact)
  - grep -c 'card-nota-historiografica' index.html → 11
  - test -s C:/tmp/index.html.bak-s23 → BACKUP_OK
  - git diff --name-only HEAD -- styles.css app.js → (empty)
drill_down_paths:
  - .gsd/milestones/M008/slices/S23/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S23/tasks/T02-SUMMARY.md
duration: ~20m (T01 ~15m + T02 ~5m)
verification_result: passed
completed_at: 2026-03-23
---

# S23: Encarnación Ezcurra — influencia sobre mujeres y apoyo a Rosas

**Two cards documenting Encarnación Ezcurra's political role (1833–1838) spliced into `#periodo-rosas`: S23-1 (`card-hecho`) on the Sociedad Popular Restauradora and the Revolución de los Restauradores; S23-2 (`card-opinion`) on the historiographic debate over the autonomy and scale of her agency. data-certeza count: 89 → 91.**

## What Happened

**T01** authored `S23-CONTENT-DRAFT.md` with two card entries and a fully entity-encoded T02 Recipe HTML block.

For S23-1 (`card-hecho`, `data-certeza="hecho"`), the content covers: Encarnación's role as political operator during Rosas's desert campaign (1833–1835); the Revolución de los Restauradores (October 1833) in which she mobilised support to restore Rosas's powers; her cross-class intelligence network communicating via letters to Rosas in the field; and the Sociedad Popular Restauradora as the organisational vehicle. The death date (20 October 1838) is noted explicitly, with the statement that the brazo armado only became a repressive instrument after her death — this keeps "Mazorca" out of the S23 scope entirely.

For S23-2 (`card-opinion`, `data-certeza="opinión"`), a two-position `card-nota-historiografica` was embedded: (1) Irazusta revisionista position (co-constitutive, not merely instrumental role); (2) Lynch cap. 5 synthesis (essential but in function of Rosas's project, not independently). No card-image block, following the S21-2 no-image pattern for interpretive companion cards. No direct quotes — attributed paraphrase per KNOWLEDGE.md protocol.

Image for S23-1: Encarnación Ezcurra 1835 portrait (García de Molino / Morel, PD, Wikimedia Commons 500px thumb), following the plan's image specification.

Both ENTITY_PASS and SCOPE_PASS verified before T02 ran.

**T02** extracted the T02 Recipe HTML from the draft, wrote it to `C:/tmp/s23-cards.html` via the Write tool (not heredoc), backed up `index.html` to `C:/tmp/index.html.bak-s23`, and ran the Node.js Array.splice using the ASCII-only marker substring `cards will be appended here by subsequent slices`. Marker found at line 2025. Splice completed without errors on first attempt. All seven verification checks passed.

## Verification

All six plan-level checks plus the scope-boundary check passed:

| Check | Command | Result |
|-------|---------|--------|
| data-certeza count | `grep -c 'data-certeza' index.html` | **91** ✅ |
| S23 cards present | `grep -c 'data-id="S23-' index.html` | **2** ✅ |
| Append marker intact | `grep -c 'cards will be appended here' index.html` | **1** ✅ |
| Nota count | `grep -c 'card-nota-historiografica' index.html` | **11** ✅ |
| No CSS/JS changes | `git diff --name-only HEAD -- styles.css app.js` | **(empty)** ✅ |
| Backup exists | `test -s C:/tmp/index.html.bak-s23` | **BACKUP_OK** ✅ |
| Scope boundary | Node.js banned-string check | **SCOPE_PASS** ✅ |

## New Requirements Surfaced

None.

## Deviations

None. Both tasks followed their plans exactly. Splice landed at line 2025 (plan estimated ~2026 — within expected range).

## Known Limitations

- S23 covers Encarnación's political role only from 1833 onward. Her earlier biography (origin, education, position before Rosas) is intentionally deferred to S24.
- The Wikimedia portrait URL should be verified to remain accessible at render time; Wikimedia thumb URLs are stable but not guaranteed indefinitely.

## Follow-ups

- S24 must cover Encarnación Ezcurra's pre-Rosas identity — origin family (Ezcurra y Arguibel), social position, education, and the question of how much of her influence was structurally hers vs. delegated. Lynch caps. 1–2 (pre-Rosas context) are the recommended starting point.
- Lynch caps. 1–2 and cap. 9 (Caseros / fall of Rosas) remain uncited in M008 and are available for S24.

## Files Created/Modified

- `index.html` — S23-1 and S23-2 spliced before append marker at line 2025; data-certeza = 91
- `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — created (T01 output): prose sections and entity-encoded T02 Recipe HTML
- `C:/tmp/s23-cards.html` — created (temp, not committed): extracted card HTML used for splice
- `C:/tmp/index.html.bak-s23` — created (temp, not committed): pre-splice restore point

## Forward Intelligence

### What the next slice should know

- **Lynch cap. 5 is consumed.** S23-2 cited Lynch, *Argentine Dictator* (1981), cap. 5 for the synthesis position on Encarnación's agency. Available for S24: caps. 1–2 (pre-Rosas, directly relevant to Encarnación's early biography), cap. 9 (Caseros — not relevant to S24 but available for future slices).
- **"Mazorca" is still off-limits in S23 scope** — the boundary is her death (1838). S24 is even earlier (pre-Rosas) so the same constraint applies: the Sociedad Popular Restauradora may be mentioned as context but not the post-1839 repressive Mazorca.
- **The two-position nota format sufficed here.** If S24 needs a nota historiográfica on the "was her pre-Rosas identity autonomous or constructed?" question, two positions are appropriate — the historiography has not converged on a three-way split for this question.
- **Marriage date trap:** Sources disagree on the exact day (March vs. May 1813). Use year only ("en 1813") to avoid picking a contested date. This was the decision made in S23-1 and should carry into any S24 content that references the marriage.
- **data-certeza = 91 after S23.** S24 will advance this to 93 (two more cards) if the plan holds.

### What's fragile

- **Portrait URL:** `https://upload.wikimedia.org/wikipedia/commons/thumb/.../500px-Encarnaci%C3%B3n_Ezcurra.jpg` — Wikimedia thumb URLs are structurally stable but the exact file name and hash path should be re-verified in T01 of S24 if a portrait is reused.
- **Append marker line number:** Currently at line 2025 (post-S23). S24's splice will target the same ASCII-only marker substring — do not hardcode the line number, use `findIndex` dynamically.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` → must be 91 after S23 and 93 after S24 — primary progress counter for M008 completion
- `grep -c 'cards will be appended here' index.html` → must remain 1 throughout — confirms the append marker is intact for S24
- `grep -c 'card-nota-historiografica' index.html` → 11 after S23; S24 adds one more → expect 12 if S24 includes an opinion card with nota

### What assumptions changed

- No original assumptions changed. The plan's estimates (Lynch two-position format, no-image for S23-2, entity encoding required) all proved correct on execution.

---
id: T02
parent: S09
milestone: M008
provides:
  - index.html with new #periodo-rosas sub-period container (4 S09 cards) inserted between /#rev-1820-1835 and SP2→SP3 Alberdi connector
  - Sub-nav link <a href="#periodo-rosas"> added after #rev-1820-1835 link
key_files:
  - index.html
key_decisions:
  - S09-3 Dorrego image uses direct URL (no /thumb/) per KNOWLEDGE.md small-image rule — Manuel_Dorrego.jpg is 349×537px with no 500px thumb available
  - S09-4 uses attributed-paraphrase blockquote (no synthetic direct quote) — per T01 decision, no verified Botana/Goldman pagination available; card-opinion__context carries the historian attribution
  - #periodo-rosas events-grid div left open with comment marker for S10–S24 to append
patterns_established:
  - The append marker comment "<!-- S10–S24 cards will be appended here by subsequent slices -->" placed before the closing </div><!-- /.events-grid S09 --> so future slices can locate the insertion point with grep
observability_surfaces:
  - grep -c 'data-certeza' index.html → must equal 62 (58 baseline + 4 S09 cards)
  - grep -c 'id="periodo-rosas"' index.html → must equal 1
  - grep -c 'href="#periodo-rosas"' index.html → must equal 1
  - grep -n 'S10–S24 cards will be appended' index.html → shows append point line for future slices
duration: ~15m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T02: Integrate S09 cards into index.html — create #periodo-rosas sub-period

**Created the `#periodo-rosas` sub-period container in index.html with 4 S09 cards (aduana roots, Directorio, 1826 constitution, unitario/federal identity crystallization) and added the sub-nav link — all 6 slice verification checks now pass.**

## What Happened

Using the fully verified content draft from T01, made two surgical edits to `index.html`:

**Edit 1 — Inserted the `#periodo-rosas` sub-period block** immediately after `</div><!-- /#rev-1820-1835 -->` (was line 1438) and before the `<!-- CONECTOR ALBERDI — SP2 → SP3 (Pasaje 2) -->` comment. The block contains:
- The sub-period container: `<div id="periodo-rosas" class="sub-period reveal reveal-fade">` with `<h3 class="sub-period__title">Unitarios, Federales y la Era de Rosas (1820–1852)</h3>`
- An `events-grid events-grid--certeza` div with `aria-label="Origen de unitarios y federales"`
- S09-1 (`card-hecho`, `data-certeza="hecho"`, delay 0ms): aduana and fiscal roots of the conflict, 1810–1820, image = Aduana de Buenos Aires 500px thumb (CC BY-SA 3.0, attribution in cite)
- S09-2 (`card-hecho`, `data-certeza="hecho"`, delay 80ms): Directorio centralista 1816–1820, image = Pueyrredón 500px thumb (no restrictions)
- S09-3 (`card-hecho`, `data-certeza="hecho"`, delay 160ms): Constitución de 1826 and capitalización law, image = Manuel Dorrego direct URL (349×537px, no thumb — per KNOWLEDGE.md small-image rule)
- S09-4 (`card-opinion`, `data-certeza="opinion"`, delay 240ms): when unitario/federal crystallized as mass identities, image = 1821 Provincias Unidas map 500px thumb (CC BY-SA 4.0, attribution in cite); uses `<blockquote class="card-opinion__quote">` with `card-opinion__attribution` / `card-opinion__author` / `card-opinion__context` pattern
- Closing comment `<!-- S10–S24 cards will be appended here by subsequent slices -->` before `</div><!-- /.events-grid S09 -->`
- `</div><!-- /#periodo-rosas -->`

**Edit 2 — Added sub-nav link** `<a href="#periodo-rosas" class="sub-nav__link">1820–1852<span class="sub-nav__link-label">Unitarios y Federales</span></a>` immediately after the existing `#rev-1820-1835` link (line 330).

SP2 cards (SP2-1 through SP2-4) were not touched. `styles.css` and `app.js` were not touched.

## Verification

All 6 slice-level verification commands passed:

```bash
grep -c 'data-certeza' index.html   # → 62 ✅
grep -c 'id="periodo-rosas"' index.html  # → 1 ✅
grep -c 'href="#periodo-rosas"' index.html  # → 1 ✅
grep -c 'id="rev-1820-1835"' index.html  # → 1 ✅
git diff --name-only HEAD -- styles.css app.js  # → (empty) ✅
test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && echo "OK"  # → OK ✅
```

Additional checks:
```bash
grep -c 'reveal reveal-slide' index.html  # → 68 (was 64, +4 from S09) ✅
```

S09-4 card confirmed to use `data-certeza="opinion"` (no accent) and `<blockquote class="card-opinion__quote">` — not a `<p>` excerpt.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 (returns 62) | ✅ pass | <1s |
| 2 | `grep -c 'id="periodo-rosas"' index.html` | 0 (returns 1) | ✅ pass | <1s |
| 3 | `grep -c 'href="#periodo-rosas"' index.html` | 0 (returns 1) | ✅ pass | <1s |
| 4 | `grep -c 'id="rev-1820-1835"' index.html` | 0 (returns 1) | ✅ pass | <1s |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | 0 (empty output) | ✅ pass | <1s |
| 6 | `test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && echo "OK"` | 0 (returns OK) | ✅ pass | <1s |
| 7 | `grep -c 'reveal reveal-slide' index.html` | 0 (returns 68) | ✅ pass | <1s |

## Diagnostics

- `grep -c 'data-certeza' index.html` → 62. Any value ≠ 62 indicates a card is missing its attribute or a duplicate was inserted.
- `grep -n 'id="periodo-rosas"' index.html` → line 1446. Confirms container position after SP2 close.
- `grep -n 'S10–S24 cards will be appended' index.html` → locates the append point for future slices inside the events-grid.
- `grep -n 'data-certeza="opinion"' index.html | grep -A0 "" | head -2` → shows S09-4 at `--reveal-delay: 240ms` as expected.
- `git diff --name-only HEAD -- styles.css app.js` → empty confirms no prohibited file changes.

## Deviations

None. Both edits exactly matched the T02 plan. The attributed-paraphrase pattern for S09-4 (no direct quote, historian attribution in `card-opinion__context`) was already specified in the plan based on T01's decision.

## Known Issues

None. All must-haves satisfied.

## Files Created/Modified

- `index.html` — two insertions: (1) new `#periodo-rosas` sub-period div with 4 S09 cards between `/#rev-1820-1835` and the SP2→SP3 Alberdi connector; (2) new sub-nav link `<a href="#periodo-rosas">` after the `#rev-1820-1835` link

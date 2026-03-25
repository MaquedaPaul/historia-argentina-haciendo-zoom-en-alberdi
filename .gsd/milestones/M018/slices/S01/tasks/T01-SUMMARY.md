---
id: T01
parent: S01
milestone: M018
provides:
  - S01-CONTENT-DRAFT.md — 4 CAM cards structured with titles, excerpts, sources, image filenames, and insertion notes
key_files:
  - .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
  - .gsd/milestones/M018/slices/S01/S01-PLAN.md
  - .gsd/milestones/M018/slices/S01/tasks/T01-PLAN.md
key_decisions:
  - CAM-4 classified as card-hecho (not card-opinion) — the immediate consequences (renuncia de Rosas, nombramiento de Vicente López, Acuerdo de San Nicolás) are documented facts with precise dates; interpretation is out of scope for the excerpt
  - Alberdi citation in CAM-4 kept as attributed paraphrase within the excerpt text, not as a new blockquote element, respecting the no-new-alberdi-quote constraint
patterns_established:
  - Draft format: YAML frontmatter + ## CAM-N sections each with Título / Año-display / Clase CSS / data-certeza / Justificación / Excerpt / Fuentes / Imagen candidata / Restricciones — this is the S01→S02 contract format for M018
  - Anti-duplication checklist at the end of the draft file enables T02 and S02 to verify SP3-6 constraints at a glance
observability_surfaces:
  - grep -c "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md → 4 (structural health)
  - grep "PENDIENTE|CONFIRMADO|FALLO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md (image verification status)
  - wc -l .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md → 176 (truncation check; <40 = corrupted write)
duration: ~20m
verification_result: passed (T01-specific checks); slice CONFIRMADO check deferred to T02
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Escribir S01-CONTENT-DRAFT.md con las 4 cards verificadas

**Creado S01-CONTENT-DRAFT.md con 4 cards estructuradas (CAM-1 a CAM-4) sobre el proceso previo a Caseros, con excerpts, fuentes ≥2, filenames de imagen candidatos, restricciones anti-SP3-6, y notas de inserción en index.html.**

## What Happened

All factual material was already verified in S01-RESEARCH.md. T01 transcribed that research into the S01→S02 contract format: a YAML-headered markdown file with 4 `## CAM-N` sections.

Each section includes:
- **Título + Año-display** for HTML rendering
- **Clase CSS + data-certeza + Justificación** — CAM-1/2/3 are `card-hecho`; CAM-4 is also `card-hecho` (the immediate post-Caseros facts are all documented with precise dates and actors)
- **Excerpt (2–4 oraciones)** in Spanish, written directly from verified facts without importing SP3-6's claims
- **≥2 fuentes** with author/title/year or named source
- **Imagen candidata** with filename, proposed alt text, known dimensions, Wikimedia API query URL, and status `PENDIENTE` (T02 fills these in)
- **Restricciones** block reminding S02 of no-duplicate constraints

**CAM-4 design decision:** Classified as `card-hecho` because all content (renuncia of Rosas on 3 Feb, nombramiento de Vicente López on 4 Feb, Acuerdo de San Nicolás on 31 May 1852, Buenos Aires's rejection in September 1852) are documented historical facts with precise dates. The Alberdi citation is used as a closing attributed paraphrase within the excerpt — not as a new `<blockquote class="alberdi-quote">` element (constraint respected).

The draft also includes an anti-duplication SP3-6 checklist at the bottom, verifying that none of the forbidden claims appear in the card excerpts.

Pre-flight items were addressed: added `## Observability / Diagnostics` to S01-PLAN.md (including failure-path diagnostic commands), added a diagnostic verification step to the slice Verification section, and added `## Observability Impact` to T01-PLAN.md.

## Verification

```bash
grep -c "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
# → 4 ✅

test -s .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md && echo "draft no vacío"
# → draft no vacío ✅

wc -l .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
# → 176 ✅ (well above the 120-line structural health threshold)

grep "FALLO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md || echo "No FALLO entries"
# → No FALLO entries ✅

grep -c "CONFIRMADO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
# → 1 (only checklist marker; T02 will add 3 image CONFIRMADO entries — expected at this stage)
```

Anti-duplication checks:
- `~45.000 vs. ~22.000`: appears only in restriction notes, NOT in excerpts ✅
- `alberdi-quote` blockquote: NOT created ✅
- `Batalla_de_Caseros_3_Febrero_1852.jpg`: appears only in restriction notes, NOT assigned to any card ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^## CAM-" S01-CONTENT-DRAFT.md` → 4 | 0 | ✅ pass | <1s |
| 2 | `test -s S01-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 3 | `wc -l S01-CONTENT-DRAFT.md` → 176 | 0 | ✅ pass | <1s |
| 4 | `grep "FALLO" S01-CONTENT-DRAFT.md` (no matches) | 1 | ✅ pass (no FALLO entries) | <1s |
| 5 | Slice check: `grep -c "CONFIRMADO"` → ≥3 | — | ⏳ deferred to T02 | — |

## Diagnostics

Inspect the draft at any time with:
```bash
# Section structure
grep "^## CAM-\|^**Título\|^**Clase\|Estado:" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md

# Image verification status (all should say CONFIRMADO after T02)
grep "Estado:" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md

# Full draft
cat .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```

If the draft needs to be regenerated, the source data is entirely in S01-RESEARCH.md and T01-PLAN.md's "Hechos clave" sections — no external lookups needed for T01.

## Deviations

None. The task followed the plan exactly. The one clarifying decision (CAM-4 as `card-hecho`) was within the range the plan allowed ("CAM-4 puede ser `card-hecho` o `card-opinion`"); `card-hecho` was chosen because all content is documented fact.

## Known Issues

- Slice verification check `grep -c "CONFIRMADO" >= 3` will only pass after T02 runs the Wikimedia API lookups. This is expected — T01's contract is structural, T02's contract is image confirmation.
- The single CONFIRMADO hit in the current draft is from the checklist section text, not from an image entry. T02 should update each image's `Estado:` line from `PENDIENTE` to `CONFIRMADO` with the actual thumburl.

## Files Created/Modified

- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — **new file** — 4 CAM cards with full structure ready for T02 (image verification) and S02 (HTML generation)
- `.gsd/milestones/M018/slices/S01/S01-PLAN.md` — added `## Observability / Diagnostics` section and diagnostic verification step (pre-flight fix)
- `.gsd/milestones/M018/slices/S01/tasks/T01-PLAN.md` — added `## Observability Impact` section (pre-flight fix)

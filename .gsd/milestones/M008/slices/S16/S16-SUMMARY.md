---
id: S16
parent: M008
milestone: M008
provides:
  - Three Mazorca repression cards (S16-1 card-hecho, S16-2 card-hecho, S16-3 card-opinion/debatido) spliced into #periodo-rosas before the append marker
  - Historiographic debate on repression scale with explicit three-position card-nota-historiografica (liberal estimate, revisionist contextualization, contemporary synthesis)
  - Florencio Varela assassination attributed under liberal historiography, not asserted as fact
requires:
  - slice: S14
    provides: Second Rosas mandate narrative + existing SP3-2/SP3-3 scope that S16 was designed not to duplicate
affects:
  - S17 (uses S16 data-certeza count 79 as baseline; append marker still at one occurrence for targeting)
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md
  - C:/tmp/s16-cards.html
  - C:/tmp/index.html.bak-s16
key_decisions:
  - Florencio Varela assassination (20 March 1848) attributed per liberal historiography, not asserted as fact — revisionists dispute the Mazorca agent claim
  - S16-1 uses Facundo cover (1845, PD) as image — preferred over a portrait because it is the primary source document that systematically described the repression
  - S16-2 carries no image — consistent with S14-3 and S15-2 historiographic/context card pattern
  - card-nota-historiografica in S16-3 covers three distinct positions without repeating the general liberal/revisionist polarity already seeded in S14-3
  - Scope boundary enforced: S16-1 goes deeper than SP3-2's overview (Mazorca structure, named victims beyond Maza, Noche de los cuchillos); S16-2 covers repression mechanics of exile (not the intellectual-production angle in SP3-3)
patterns_established:
  - HTML entities for ALL non-ASCII in T02 Recipe block (ó→&#xF3;, é→&#xE9;, etc.) — encoding safety on Windows; pattern started in S15 and confirmed here
  - Stagger delays reset to 0ms/80ms/160ms per slice — each slice's card group is independent
  - card-nota-historiografica used to name three distinct historiographic positions with explicit source attribution per position
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 79 (baseline for S17: +3 expected after S17)"
  - "grep -c 'data-id=\"S16-' index.html → 3 (cards present)"
  - "grep -c 'cards will be appended here' index.html → 1 (append marker intact for S17)"
  - "grep -n 'data-id=\"S16-' index.html → lines 1802, 1820, 1835"
  - "C:/tmp/index.html.bak-s16 — pre-splice recovery backup"
drill_down_paths:
  - .gsd/milestones/M008/slices/S16/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S16/tasks/T02-SUMMARY.md
duration: ~25m total (T01 ~20m + T02 ~5m)
verification_result: passed
completed_at: 2026-03-23
---

# S16: La represión rosista — ¿perseguía y mataba?

**Three verified Mazorca repression cards (two card-hecho + one card-opinion/debatido with three-position historiographic note) spliced into #periodo-rosas, raising data-certeza count from 76 to 79 with all eight verification checks passing.**

## What Happened

T01 authored `S16-CONTENT-DRAFT.md` by first reading the existing SP3-2 and SP3-3 cards to map what was already covered, then establishing precise scope boundaries. SP3-2 already covered the 1839–1842 overview, Manuel Vicente Maza assassination, Lynch's caveat on exaggeration, and Salón Literario closure. SP3-3 covered the intellectual production of the exiles. S16 was scoped to what neither covered: Mazorca organizational structure, documented mechanics beyond Maza, exile as a repression mechanism (confiscations, forced departures), and the historiographic debate on scale.

Three cards were authored with differentiated certeza:
- **S16-1** (card-hecho, 0ms): Mazorca structure (Sociedad Popular Restauradora → enforcement branch), the "degüello" as signature method, named victims beyond Maza (Agustín Maza, Juan Bautista Peña), the "Noche de los cuchillos" (June–July 1840), and punzó enforcement mechanics. Sources: Lynch 1981, Sarmiento 1845, Saldías 1892. Image: *Facundo* cover (1845, PD) — chosen as the primary source document that systematically analyzed the repression, not a portrait.
- **S16-2** (card-hecho, 80ms): Exile mechanics — Alberdi, Echeverría, Juan Cruz Varela, Florencio Varela departures under duress; property confiscation pattern; Florencio Varela assassination (20 March 1848) attributed to Mazorca agent per liberal historiography with dispute noted; punzó as daily coercion system extending to homes, correspondence, and commerce. No image (consistent with S14-3/S15-2 pattern for context cards). Sources: Lynch 1981, Goldman & Salvatore 1998, Zinny 1882.
- **S16-3** (card-opinion/debatido, 160ms): Scale and systematicity debate with `card-nota-historiografica` naming three distinct positions with source attribution per position: (1) liberal estimate (López 1883 — hundreds to low thousands, systematic and state-directed), (2) revisionist contextualization (Irazusta 1941, Rosa 1964 — figures inflated by exile propaganda, largely inter-factional, less total violence than 1828–1829 civil wars), (3) contemporary synthesis (Lynch 1981 cap. 7, Halperin Donghi 1972 — terror real and functional, "hundreds" defensible, selectively organized against the educated opposition). Sources cited per position.

T02 was a mechanical splice. Preconditions confirmed (76 data-certeza, marker present once, draft non-empty). Recovery backup written to `C:/tmp/index.html.bak-s16`. Node.js splice with ASCII-only marker substring `'cards will be appended here by subsequent slices'` found the marker at line 1800 and inserted the three cards immediately before it. First run succeeded with no debugging required.

## Verification

All eight checks passed:

| Check | Expected | Actual |
|-------|----------|--------|
| `grep -c 'data-certeza' index.html` | 79 | 79 ✅ |
| `grep -c 'data-id="S16-' index.html` | 3 | 3 ✅ |
| `grep -c 'data-id="S16-1"' index.html` | 1 | 1 ✅ |
| `grep -c 'cards will be appended here' index.html` | 1 | 1 ✅ |
| `git diff --name-only HEAD -- styles.css app.js` | (empty) | (empty) ✅ |
| `test -s C:/tmp/index.html.bak-s16` | BACKUP_OK | BACKUP_OK ✅ |
| `grep -c 'card-nota-historiografica' index.html` | ≥3 | 5 ✅ |
| `test -s S16-CONTENT-DRAFT.md` | DRAFT_OK | DRAFT_OK ✅ |

S16-1 at line 1802, S16-2 at line 1820, S16-3 at line 1835. Append marker intact at one occurrence for S17 targeting.

## New Requirements Surfaced

None.

## Deviations

None — both tasks executed exactly as specified in their respective plan files.

## Known Limitations

- Florencio Varela's assassination remains attributed rather than established — the historiographic dispute between liberal and revisionist accounts is noted in S16-2 prose but is not the focus of a dedicated card. A future slice could deepen this if needed, but the S16 scope boundary was maintained correctly.
- Exact victim counts for the Mazorca period are genuinely irrecoverable (no official padrones were kept); S16-3 honestly represents the scholarly consensus that "hundreds" is defensible but no precise figure exists.

## Follow-ups

- S17 depends on S16's data-certeza count (79) as its baseline. S17 should target 82 after adding its cards (3 new expected).
- The append marker is at line ~1853 post-splice; S17 should re-confirm its line position with `grep -n 'cards will be appended here' index.html` before targeting.

## Files Created/Modified

- `index.html` — 3 new S16 cards inserted before append marker at line 1800; data-certeza count now 79
- `.gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` — created in T01; contains three-card prose, sources, and T02 Recipe HTML block with full entity encoding
- `C:/tmp/s16-cards.html` — temp splice snippet (not committed)
- `C:/tmp/index.html.bak-s16` — pre-splice recovery backup (not committed)

## Forward Intelligence

### What the next slice should know
- The `card-nota-historiografica` pattern now has three live examples in index.html (S14-3, S15-2, S16-3). The S16-3 variant is the most developed: it names three distinct positions with source attribution per position. S17 and S19 (both labeled `risk:high` in the roadmap) should follow this pattern rather than a simpler two-position format.
- SP3-2 already covered the 1839–1842 terror period overview including Lynch's "exaggeration" caveat. SP3-3 covered the intellectual exile. S16 covered the repression mechanics. S17 ("¿Sin Rosas, Argentina sería un caos?") should focus on the necessity/order argument — distinct from the "did he persecute" question S16 answered.
- The Alberdi connector blockquote between the S09–S24 grid and the SP3 sub-period section (approximately line 1852 onwards) cites his Montevideo exile and references Rosas. S17–S18 cards should not duplicate this quote.

### What's fragile
- The append marker `<!-- S10–S24 cards will be appended here by subsequent slices -->` has survived 8 slices. Its line number after S16 is approximately 1853 — always re-confirm with grep before targeting, never assume line number.
- S16-3 uses `data-certeza="debatido"` — this is consistent with S15-2 which also used "debatido". The certeza normalization note in KNOWLEDGE (opinion vs. opinión both exist) applies here: the grep verification queries must handle both `debatido` and `debate` variants if future slices introduce them.

### Authoritative diagnostics
- `grep -n 'data-id="S16-' index.html` → current line positions are 1802, 1820, 1835; any deviation from these indicates splice drift from upstream edits
- `diff C:/tmp/index.html.bak-s16 index.html | head -80` → cleanest view of exactly what S16 contributed to index.html
- `grep -c 'card-nota-historiografica' index.html` → currently 5; each new debatido card should add 1; this is the quickest check that the nota pattern was followed

### What assumptions changed
- The S16 plan specified the image for S16-1 as "Facundo cover (1845, PD)" and noted it was preferred over a portrait. This held: the Sarmiento *Facundo* cover (`Civilización_y_Barbarie_Sarmiento_portada.jpg`) was available on Wikimedia Commons at 500px and used without substitution.
- S16-2 was planned with no image (matching S14-3 pattern) and this was confirmed correct — no image was needed or added.

---
id: S14
parent: M008
milestone: M008
provides:
  - 3 verified cards in #periodo-rosas narrating the second Rosas mandate (1835–1852): the return and Suma del Poder Público acquisition (card-hecho), the geopolitical arc — French blockade, Vuelta de Obligado, Caseros (card-hecho), and a historiographic seed note (card-opinion, data-certeza="debatido")
  - S14-CONTENT-DRAFT.md with full historical prose, sources, image attribution, and verbatim T02 Recipe HTML
requires:
  - slice: S13
    provides: First Rosas mandate narrated; chronological base and S13-2 thread ("denied the Suma in 1832") that S14-1 picks up explicitly
affects:
  - S15 (Quiroga assassination — consumes S14 geopolitical context and the Barranco Yaco timing)
  - S16 (Mazorca repression — S14-2 establishes mandate arc; S16 deepens the Mazorca thread introduced in SP3-2)
  - S17–S19 (historiographic debate chain — S14-3 seed note frames the polarity those slices will develop)
  - S21 (Suma del Poder Público detail — S14-1 provides the narrative hook S21 will expand constitutionally)
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md
key_decisions:
  - Plebiscite figure 9,316 (not 9,320) used in S14-1 to match SP3-1 already in index.html — avoids visible contradiction on the same page
  - S14-2 scope deliberately excludes Mazorca (already in SP3-2) and Caseros tactical detail (already in SP3-6); covers blockades + mandate arc instead
  - S14-3 uses card-opinion class with data-certeza="debatido" (no card-debatido class exists; zero-new-CSS constraint preserved)
  - T02 Recipe HTML uses HTML entities for all non-ASCII characters to ensure encoding safety on Windows during Node.js splice
  - ASCII-only marker substring 'cards will be appended here by subsequent slices' used in splice (no en-dash) per KNOWLEDGE.md rule
patterns_established:
  - T02 Recipe HTML entity encoding pattern for Windows encoding safety is now confirmed reliable for non-ASCII Spanish prose
  - Node.js splice via lastIndexOf('\n', pos)+1 to find line start of marker — standard pattern for all future splices
observability_surfaces:
  - grep -c 'data-certeza' index.html → 74
  - grep -c 'data-id="S14-' index.html → 3
  - grep -c 'cards will be appended here' index.html → 1
  - git diff --name-only HEAD -- styles.css app.js → (empty)
  - C:/tmp/s14-cards.html — verbatim splice snippet for post-hoc diffing
  - C:/tmp/index.html.bak-s14 — pre-splice recovery backup
drill_down_paths:
  - .gsd/milestones/M008/slices/S14/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S14/tasks/T02-SUMMARY.md
duration: ~25m (T01 ~15m + T02 ~10m)
verification_result: passed
completed_at: 2026-03-23
---

# S14: El segundo gobierno de Rosas — el Restaurador

**3 verified historical cards spliced into #periodo-rosas covering the second Rosas mandate (1835–1852): the Suma del Poder Público acquisition, the geopolitical arc (French blockade, Vuelta de Obligado, Caseros), and a historiographic seed note — raising data-certeza count from 71 to 74.**

## What Happened

T01 read the existing SP3 cards in index.html (lines ~1720–1889) to establish what NOT to duplicate: SP3-1 covers the Suma overview from an Alberdi-context angle; SP3-2 covers the Mazorca; SP3-6 covers Caseros tactical detail. This scoping work prevented redundancy and gave S14's three cards distinct territory.

The plebiscite vote count discrepancy was resolved before any HTML was written: the CONTEXT.md research file cited 9,320, but SP3-1 in the live index.html already used 9,316. Using 9,316 in S14-1 eliminates a visible contradiction on the same page. The research file confirmed 9,316 is the more commonly cited secondary-literature figure.

**S14-1** (card-hecho, 0ms stagger): Narrates the February 1835 crisis triggered by Quiroga's assassination, the Legislatura calling Rosas back, his explicit demand for the Suma del Poder Público as a condition of return, the plebiscite result (9,316 / 4), and the April 13 1835 formal grant. Explicitly picks up the S13-2 thread ("denied in 1829, demanded as condition in 1835"). Image: `Divisas_de_la_época_de_Rosas.jpg` (CC BY 2.5 ar, attribution inside `.card-image` per KNOWLEDGE.md pattern).

**S14-2** (card-hecho, 80ms stagger): Covers the French blockade 1838–1840 (resolved by Convention Mackau), the Anglo-French blockade and Battle of Vuelta de Obligado (20 Nov 1845 — tactical defeat but sovereignty symbol, blockade lifted 1850), and the fall at Caseros (Ejército Grande, 3 Feb 1852, Rosas exile to Southampton, died 1877). Kept at mandate-arc level, not repeating SP3-6 tactical detail. Image: `Batalla_de_la_Vuelta_de_Obligado.jpg` (Public domain).

**S14-3** (card-opinion, data-certeza="debatido", 160ms stagger): Brief historiographic seed note with `<p class="card-nota-historiografica">` signaling that the Rosas regime is contested between liberal and revisionist historiographic schools. No image — this is a meta-epistemic card, not a narrative event. Seeds the S15–S19 debate chain without resolving it.

T01 used HTML entities for all non-ASCII characters in the T02 Recipe block — a proactive encoding safety measure for Windows Node.js splice round-trips.

T02 confirmed preconditions (data-certeza=71, marker count=1), created the recovery backup at `C:/tmp/index.html.bak-s14`, wrote the recipe to `C:/tmp/s14-cards.html` via Write tool (not heredoc), and ran the Node.js splice using the ASCII-only marker substring. Splice reported `Spliced OK at char 148974`. All five verification checks passed on the first attempt.

## Verification

All slice-level checks confirmed post-splice:

| Check | Expected | Actual | Result |
|-------|----------|--------|--------|
| `grep -c 'data-certeza' index.html` | 74 | 74 | ✅ |
| `grep -c 'data-id="S14-' index.html` | 3 | 3 | ✅ |
| `grep -c 'cards will be appended here' index.html` | 1 | 1 | ✅ |
| `git diff --name-only HEAD -- styles.css app.js` | (empty) | (empty) | ✅ |
| `test -s S14-CONTENT-DRAFT.md && echo OK` | OK | OK | ✅ |

Zero CSS or JS changes introduced.

## New Requirements Surfaced

- none

## Deviations

- **HTML entity encoding in Recipe block:** The draft used HTML entities (&#xF3;, &#xE9;, etc.) for non-ASCII characters in the T02 Recipe block rather than native UTF-8. Proactive encoding safety measure; prose sections above the Recipe block use native UTF-8 for readability. Not a deviation from plan intent — plan required verbatim HTML ready for splice; entities are the correct form for that purpose on Windows.

## Known Limitations

- S14-3 uses the `card-opinion` CSS class with `data-certeza="debatido"` because no `card-debatido` class exists and zero-new-CSS is a hard constraint. Visually the card is styled as an opinion, which is acceptable — but a dedicated `card-debatido` class would be more semantically precise. Deferred to potential future styling slice.
- S14-1 image (`Divisas_de_la_época_de_Rosas.jpg`) is CC BY 2.5 ar, not public domain. Attribution block is correctly placed inside `.card-image` per KNOWLEDGE.md pattern. Future audits should verify this attribution renders correctly in the browser.

## Follow-ups

- S15 can now reference S14-2's Vuelta de Obligado card as the chronological anchor for the Barranco Yaco timeline (Quiroga died February 1835, before the blockades — the ordering is established).
- S21 will expand the Suma del Poder Público constitutional analysis that S14-1 introduces narratively.
- S17–S19 can reference S14-3's `card-nota-historiografica` as the established framing for the liberal/revisionist debate polarity.

## Files Created/Modified

- `index.html` — 3 new S14 cards (S14-1, S14-2, S14-3) inserted before append marker in `#periodo-rosas`; data-certeza count = 74
- `.gsd/milestones/M008/slices/S14/S14-CONTENT-DRAFT.md` — created in T01 with full prose, sources, image notes, and T02 Recipe HTML block
- `C:/tmp/s14-cards.html` — temp file used for splice (not committed)
- `C:/tmp/index.html.bak-s14` — pre-splice recovery backup (not committed)

## Forward Intelligence

### What the next slice should know

- **S14-3 seeds the debate, doesn't resolve it.** Slices S15–S19 should reference it as the established polarity note, not repeat it. The `card-nota-historiografica` paragraph in S14-3 names both the liberal and revisionist schools by name — subsequent debate cards can cite this framing.
- **SP3-2 (Mazorca) is already in index.html** and must not be duplicated by S16. S16's job is to deepen and source the Mazorca thread, not create it from scratch. Read SP3-2 before authoring S16 content.
- **SP3-6 (Caseros tactical detail) is already in index.html.** S14-2 covers the mandate arc angle (fall, exile, death). Any Caseros reference in S15–S24 must stay at the arc level or focus on a new angle (e.g., constitutional aftermath in S21).
- **Plebiscite figure is locked at 9,316** across the page. Any subsequent card that references the 1835 plebiscite must use 9,316, not 9,320.
- **The append marker remains at its original position.** After S14, the marker `<!-- S10–S24 cards will be appended here by subsequent slices -->` is still present exactly once. S15 splices before it using the same ASCII-only substring pattern.

### What's fragile

- **CC BY 2.5 ar image attribution for S14-1** — the attribution block is inside `.card-image` as required, but it uses a small `<p class="img-attribution">` that has no dedicated CSS in this project. It renders using inherited paragraph styles. If a future slice adds CSS for `.img-attribution`, confirm it doesn't conflict.
- **data-certeza="debatido" on S14-3** — this value is used here for the first time in the page. Future verification queries that count `data-certeza` must account for this new value. Queries like `grep -c 'data-certeza="hecho"'` will correctly exclude it, but any "total certeza" count must include `debatido`.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` → current count is 74; should increase by 1 per new card in subsequent slices.
- `grep -n 'cards will be appended here' index.html` → gives line number of append marker for splice targeting.
- `grep -n 'data-id="S14-' index.html` → shows exact line positions of the three S14 cards for context-window inspection.

### What assumptions changed

- **9,316 vs 9,320:** Research file had 9,320; live page already had 9,316 in SP3-1. The live page is the source of truth for consistency — research files may be drafted against different secondary sources. Always check the live page before writing any figure that may already appear elsewhere.
- **No card-debatido class exists:** The slice plan assumed `card-opinion` would be acceptable for the debatido card. This was confirmed correct — no new class needed. Future slices using `data-certeza="debatido"` should follow the same pattern.

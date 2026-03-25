---
id: S09
parent: M008
milestone: M008
provides:
  - index.html #periodo-rosas sub-period container with 4 cards covering the economic and political origins of the unitario/federal divide
  - S09-CONTENT-DRAFT.md with 4 Wikimedia-verified card entries (historical facts, sources, image URLs) ready for downstream slices to reference as structural pattern
  - Append marker comment "<!-- S10–S24 cards will be appended here by subsequent slices -->" inside the #periodo-rosas events-grid for future slices
  - Sub-nav link <a href="#periodo-rosas"> after #rev-1820-1835 link
requires: []
affects:
  - S10
  - S11
  - S12
  - S13
  - S14
  - S15
  - S16
  - S17
  - S18
  - S19
  - S20
  - S21
  - S22
  - S23
  - S24
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md
key_decisions:
  - Used Juan Martín de Pueyrredón portrait for S09-2 instead of José Rondeau — Rondeau's Wikimedia image is only 188×200px with no 500px thumb; Pueyrredón is the more historically significant figure of the 1816–1820 Directorio period
  - S09-4 opinion card uses attributed paraphrase (card-opinion__context pattern), not a direct quote — no digitized primary text with verified pagination was available for Botana or Goldman
  - Mapa de las Provincias Unidas del Río de la Plata en 1821 (CC BY-SA 4.0) used for S09-4; attribution included in HTML cite
  - S09-3 Dorrego image uses direct URL (no /thumb/) per KNOWLEDGE.md small-image rule — Manuel_Dorrego.jpg is 349×537px with no 500px thumb available
  - #periodo-rosas events-grid left open with append marker comment so S10–S24 can locate the insertion point with grep
patterns_established:
  - Append marker comment pattern: "<!-- S10–S24 cards will be appended here by subsequent slices -->" placed before closing </div><!-- /.events-grid S09 --> gives future slices a grep-stable insertion target
  - Certeza `opinion` (no accent) confirmed for all opinion cards in M008 — per KNOWLEDGE.md Certeza Attribute Accent Normalization
  - Framing notes in content draft explicitly document how each S09 card avoids duplicating existing SP2 cards — this is the right pattern for all M008 slices that share topic ground with SP2
  - Stagger delays: 0ms / 80ms / 160ms / 240ms for 4-card grids — consistent with prior milestones
observability_surfaces:
  - grep -c 'data-certeza' index.html → 62 (58 baseline + 4 S09)
  - grep -c 'id="periodo-rosas"' index.html → 1
  - grep -c 'href="#periodo-rosas"' index.html → 1
  - grep -n 'S10–S24 cards will be appended' index.html → shows line 1542 (append point for S10+)
  - grep -c 'reveal reveal-slide' index.html → 68 (was 64, +4 from S09)
drill_down_paths:
  - .gsd/milestones/M008/slices/S09/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S09/tasks/T02-SUMMARY.md
duration: ~40m (T01: ~25m, T02: ~15m)
verification_result: passed
completed_at: 2026-03-22
---

# S09: Origen de unitarios y federales

**Created the `#periodo-rosas` sub-period container in `index.html` with 4 verified cards covering the economic and political roots of the unitario/federal conflict — establishing the scaffold that S10–S24 will fill.**

## What Happened

S09 executed in two tasks following the established content-first pattern (D017, D022):

**T01** produced `S09-CONTENT-DRAFT.md` — a fully verified content draft with 4 card entries before any HTML was touched. The draft covers the structural aduana asymmetry (1810–1820), the Directorio's centralist governance and why it provoked Cepeda (1816–1820), the 1826 capitalización law as the economic mechanism behind provincial rejection of Rivadavia's constitution (1826–1827), and an opinion card on when "unitario/federal" crystallized as mass political identities (ca. 1826–1829). All 4 Wikimedia images were verified via the `/w/api.php?action=query&prop=imageinfo` API endpoint before HTML integration. One image candidate was rejected (Rondeau, 188×200px) and replaced with Pueyrredón. The S09-3 Dorrego image has no 500px thumb and uses the direct URL per the KNOWLEDGE.md small-image rule. The S09-4 opinion card uses an attributed paraphrase — no direct quote was available with verified pagination from Botana or Goldman — following the Alberdi Quote Verification Protocol.

**T02** inserted the `#periodo-rosas` sub-period block at the precise location in `index.html` (after line 1439 `</div><!-- /#rev-1820-1835 -->`, before the SP2→SP3 Alberdi connector at line 1546). The block contains: `<div id="periodo-rosas" class="sub-period reveal reveal-fade">`, the `events-grid--certeza` div with aria-label, 4 cards following exact structural patterns from existing SP2 cards (card-hecho from SP2-1 pattern, card-opinion from SP2-4 pattern), and the append marker comment `<!-- S10–S24 cards will be appended here by subsequent slices -->` before the closing div. A sub-nav link was added at line 331. No SP2 cards were touched. No CSS or JS files were modified.

The framing strategy for each card was explicitly designed to avoid duplicating SP2 content: S09-1 adds pre-1820 economic depth (aduana asymmetry); S09-2 covers *why* Cepeda happened rather than what happened (SP2-1's job); S09-3 covers the capitalización mechanism not just "provinces said no" (SP2-3's level); S09-4 is a new card type with no SP2 equivalent.

## Verification

All 6 slice-level verification commands passed after T02:

```bash
grep -c 'data-certeza' index.html      # → 62 ✅ (58 baseline + 4 S09)
grep -c 'id="periodo-rosas"' index.html  # → 1 ✅
grep -c 'href="#periodo-rosas"' index.html  # → 1 ✅
grep -c 'id="rev-1820-1835"' index.html   # → 1 ✅ SP2 untouched
git diff --name-only HEAD -- styles.css app.js  # → (empty) ✅
test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && echo "OK"  # → OK ✅
```

Additional structural check:
```bash
grep -c 'reveal reveal-slide' index.html  # → 68 (was 64, +4 from S09) ✅
```

S09-4 confirmed: `data-certeza="opinion"` (no accent), uses `<blockquote class="card-opinion__quote">` with `card-opinion__attribution` / `card-opinion__author` / `card-opinion__context` structure.

## New Requirements Surfaced

- None.

## Deviations

- **S09-2 image substitution:** `Jose_Rondeau.jpg` rejected (188×200px, no 500px thumb). Replaced with `Juan_Martín_de_Pueyrredón.jpg` (500px thumb available). The slice plan listed both as candidates, so this is within scope.
- **S09-2 and S09-4 excerpts are 5 sentences** (plan specified 2–4 sentences). The extra sentences were necessary to complete the causal arc (S09-2) and state the full interpretive argument (S09-4). Content quality takes precedence over sentence count.

## Known Limitations

- The `#periodo-rosas` section currently has only 4 cards (S09 scope). S10–S24 will append to it. Until all slices complete, the section is sparse relative to its sub-period title.
- The S09-4 opinion card uses an attributed paraphrase, not a verified direct quote from Botana or Goldman. This is honest (per protocol) but means the blockquote prose is paraphrase-level attribution. A future content revision could add a verified direct quote if pagination is confirmed against a physical copy.

## Follow-ups

- S10 (next slice) should append its cards inside the existing `#periodo-rosas` events-grid using the append marker comment at line 1542 as the insertion point.
- The Mapa de las Provincias Unidas (CC BY-SA 4.0, S09-4) requires attribution — already present in the HTML `<cite>`. No further action needed.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — created: 4-card content draft with Image Verification Log, bibliographic sources, framing notes, and T02 recipe
- `index.html` — two insertions: (1) new `#periodo-rosas` sub-period div with 4 S09 cards at line 1446; (2) sub-nav link `<a href="#periodo-rosas">` at line 331
- `.gsd/milestones/M008/slices/S09/S09-PLAN.md` — updated: T01 marked [x], T02 marked [x], Observability / Diagnostics section added

## Forward Intelligence

### What the next slice should know

- **Append target:** All S10–S24 cards go inside the `<div class="events-grid events-grid--certeza">` inside `#periodo-rosas`. The append marker comment `<!-- S10–S24 cards will be appended here by subsequent slices -->` is at line 1542 (immediately before `</div><!-- /.events-grid S09 -->`). Insert new cards immediately before this comment.
- **Stagger delay reset:** S09 used 0ms/80ms/160ms/240ms. S10 should start its own stagger sequence at 0ms — each slice's cards form their own visual group. Do NOT continue the cumulative delay from S09.
- **The sub-nav link already exists** — `<a href="#periodo-rosas">` was added by S09. S10 does NOT add another sub-nav link; it only adds cards to the existing grid.
- **SP2 overlap vigilance:** Several S10–S24 topics are touched panoramically in SP2 cards. Follow the framing-note pattern established in S09-CONTENT-DRAFT.md: each card should explicitly document how it differs from the nearest SP2 card.
- **Certeza values:** Use `opinion` (no accent) for opinion cards — not `opinión`. Already in KNOWLEDGE.md but worth repeating given the M008 scope.

### What's fragile

- **The events-grid closing div structure:** The `#periodo-rosas` events-grid has two nested closing divs: `</div><!-- /.events-grid S09 -->` and `</div><!-- /#periodo-rosas -->`. Future slices appending cards must insert content BEFORE `</div><!-- /.events-grid S09 -->`, not after it. Inserting after this div would break the grid.
- **Line numbers shift with each edit:** The append marker is currently at line 1542. After S10 inserts cards, this line number changes. Use `grep -n 'S10–S24 cards will be appended'` (not a line number) to find the insertion point.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` — the most reliable card-count signal; should equal 58 + (4 × number of completed M008 slices up to S09).
- `grep -n 'S10–S24 cards will be appended' index.html` — the canonical way to find the append point for future slices.
- `grep -n 'id="periodo-rosas"' index.html` — confirms container exists; should be line 1446 (shifts with each edit).

### What assumptions changed

- **Assumed Rondeau would be the S09-2 image** (plan listed him as primary candidate) — the actual image file was too small (188×200px). Pueyrredón was the correct replacement: more historically significant for the 1816–1820 period and has a verified 500px thumb.
- **Assumed all 4 cards would fit 2–4 sentences** — two cards needed 5 sentences for content integrity. Sentence count is a guideline, not a hard constraint when historical accuracy requires more.

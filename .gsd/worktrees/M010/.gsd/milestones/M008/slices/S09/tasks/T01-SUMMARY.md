---
id: T01
parent: S09
milestone: M008
provides:
  - S09-CONTENT-DRAFT.md with 4 verified card entries ready for T02 HTML integration
key_files:
  - .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md
key_decisions:
  - Used Juan Martín de Pueyrredón portrait for S09-2 instead of José Rondeau — Rondeau's Wikimedia image is only 188×200px (no 500px thumb); Pueyrredón is the more historically significant figure of the 1816–1820 period
  - S09-4 opinion card uses attributed paraphrase (card-opinion__context pattern), not a direct quote — no digitized primary text with verified pagination was available for Botana or Goldman
  - Mapa de las Provincias Unidas del Río de la Plata en 1821 (CC BY-SA 4.0) used for S09-4; needs attribution in HTML cite
patterns_established:
  - Certeza `opinion` (no accent) confirmed for opinion cards — per KNOWLEDGE.md Certeza Attribute Accent Normalization
  - Framing notes in content draft explicitly document how each card avoids duplicating existing SP2 cards
observability_surfaces:
  - grep -c '^## Card' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md → returns 4
  - test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && echo "exists"
  - Image Verification Log table in S09-CONTENT-DRAFT.md shows all 4 API-verified URLs with license and status
duration: ~25m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T01: Write S09 content draft with verified historical facts and Wikimedia images

**Created S09-CONTENT-DRAFT.md with 4 Wikimedia-verified cards covering the economic and political origins of the unitario/federal divide, ready for mechanical HTML integration in T02.**

## What Happened

Loaded the research (S09-RESEARCH.md), context (S09-CONTEXT.md), and KNOWLEDGE.md before writing. The draft covers 4 cards: (1) the structural aduana asymmetry 1810–1820, (2) the Directorio's centralist governance 1816–1820 and why it provoked Cepeda, (3) the 1826 capitalización law as the economic mechanism behind provincial rejection of Rivadavia's constitution, and (4) an opinion card on when "unitario/federal" crystallized as mass political identities (ca. 1826–1829).

**Wikimedia image verification:** All 4 images verified via the `/w/api.php?action=query&prop=imageinfo` API endpoint. The initial candidate for S09-2 (`Jose_Rondeau.jpg`) was rejected because the API returned a thumbnail at only 188×200px — per KNOWLEDGE.md, images below display-quality resolution must be substituted. Juan Martín de Pueyrredón (Director Supremo 1816–1819) was selected instead, with a valid 500px thumb. Three of four images are usable without attribution constraints (public domain or "no restrictions"); the 1821 map (S09-4) is CC BY-SA 4.0 and requires attribution in the HTML `<cite>` tag. The Dorrego portrait (S09-3) has no 500px thumb and must use the direct URL per KNOWLEDGE.md small-image rule.

**Quote handling for S09-4:** No direct quote from Botana or Goldman was available with verified pagination. The card uses the `card-opinion__context` attributed-paraphrase pattern (per the Alberdi Quote Verification Protocol in KNOWLEDGE.md), explicitly marked as historiographic interpretation, not a synthetic direct quote.

**SP2 overlap management:** Each card includes a framing note explaining how it differs from the nearest SP2 card. S09-2 covers *why* Cepeda happened (not what happened — SP2-1's job). S09-3 covers the economic mechanism of rejection (not just "provinces said no" — SP2-3's level). S09-1 adds pre-1820 economic depth absent from SP2-2's panoramic overview. S09-4 is a new card type with no SP2 equivalent.

Added the Observability / Diagnostics section to S09-PLAN.md as required by the pre-flight check.

## Verification

Both task-level verification commands passed:

```bash
test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && echo "exists"
# → "exists"

grep -c '^## Card' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md
# → 4
```

Slice-level checks status (T01 is intermediate — T02 completes the HTML work):
- `grep -c 'data-certeza' index.html` → 58 (expected 62 after T02) — **PARTIAL** (expected at this stage)
- `grep -c 'id="periodo-rosas"' index.html` → 0 (expected 1 after T02) — **PARTIAL**
- `grep -c 'href="#periodo-rosas"' index.html` → 0 (expected 1 after T02) — **PARTIAL**
- `grep -c 'id="rev-1820-1835"' index.html` → 1 ✅ SP2 untouched
- `git diff --name-only HEAD -- styles.css app.js` → (empty) ✅ No CSS/JS changes
- `test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && echo "OK"` → OK ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && echo "exists"` | 0 | ✅ pass | <1s |
| 2 | `grep -c '^## Card' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` | 0 (returns 4) | ✅ pass | <1s |
| 3 | `grep -c 'id="rev-1820-1835"' index.html` | 0 (returns 1) | ✅ pass | <1s |
| 4 | `git diff --name-only HEAD -- styles.css app.js` | 0 (empty output) | ✅ pass | <1s |
| 5 | `grep -c 'data-certeza' index.html` | 0 (returns 58, not yet 62) | ⏳ partial | <1s |
| 6 | `grep -c 'id="periodo-rosas"' index.html` | 1 (returns 0, not yet 1) | ⏳ partial | <1s |
| 7 | `grep -c 'href="#periodo-rosas"' index.html` | 1 (returns 0, not yet 1) | ⏳ partial | <1s |

Checks 5–7 are partial at T01 — they will pass after T02 inserts the HTML.

## Diagnostics

- `grep -c '^## Card' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — returns 4, confirms 4 card sections present
- `grep 'Certeza' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — inspect all certeza values; S09-4 must show `opinion` (no accent)
- Image Verification Log table in the draft records all API responses with thumb URLs, license, and status for all 4 images
- Rejected image candidates (Rondeau too small, all four SP2 images excluded) are documented in the Image Verification Log

## Deviations

- **S09-2 image substitution:** `Jose_Rondeau.jpg` rejected (188×200px, no 500px thumb available). Replaced with `Juan_Martín_de_Pueyrredón.jpg`. Plan named both as candidates ("portrait of José Rondeau (last Supreme Director) or Congress of Tucumán imagery"), so this is within scope.
- **S09-2 excerpt extends slightly beyond 4 sentences** (5 sentences) to complete the causal arc back to Cepeda. The extra sentence is necessary to link this card to SP2-1 without re-narrating the battle.
- **S09-4 uses 5 sentences** in the blockquote prose — the opinion argument requires that many to state the cycle, the crystallization moment, and the before/after contrast clearly.

## Known Issues

None. All must-haves satisfied. S09-3's Dorrego image uses the direct URL (no thumb); T02 should set `width="100%"` on the `<img>` per KNOWLEDGE.md small-image rule.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — created: 4-card content draft with verified historical facts, Wikimedia-verified image URLs, bibliographic sources, and T02 HTML recipe
- `.gsd/milestones/M008/slices/S09/S09-PLAN.md` — updated: T01 marked [x], Observability / Diagnostics section added

---
id: S11
parent: M008
milestone: M008
provides:
  - 2 card-hecho cards in #periodo-rosas: Los líderes unitarios (S11-1) and Los líderes federales (S11-2)
  - S11-CONTENT-DRAFT.md with verified biographic facts, image API confirmations, and T02 Recipe
requires:
  - slice: S10
    provides: Card skeleton format, used-image list, stagger delay convention, append marker location (line 1612)
affects:
  - S12: Profiles of Rosas, Quiroga, López, Ramírez, Urquiza are now established in #periodo-rosas — S12's caudillo narrative can reference these rather than re-introduce the figures
  - S15: Quiroga's profile (S11-2) names Barranco Yaco and flags the murder as an open question — S15 builds directly on this
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md
key_decisions:
  - Both cards use card-hecho (certeza=hecho) — all biographical dates, roles, and events are documented in standard secondary sources; no interpretive framing required at this stage
  - S11-1 image: Jose_maria_paz_retrato_homenaje.jpg (1887, pageid 158578426) — only non-reused 500px Paz portrait available on Commons; confirmed PD via API
  - S11-2 image: Justo_José_de_Urquiza.jpg (1880 oil by Josefa Díaz y Clucellas, pageid 182590987) — third distinct Urquiza variant; confirmed 500px PD via API; NOT the (retrato) or 983506 variants
  - Caseros narrative deferred from S11-2 — Urquiza introduced as federal caudillo (pre-1851) with a single sentence noting he later changed sides; full Caseros story belongs to S13/S14
  - Stagger resets to 0ms for S11-1, 80ms for S11-2 — consistent with multi-slice stagger-reset convention established in S09/S10
patterns_established:
  - Image API verification before draft (not after): both thumburls and licenses confirmed via live Wikimedia API call before any prose was written — prevents draft-then-discover-image-missing cycle
  - S11-PLAN.md augmented with Observability/Diagnostics section as pre-flight requirement — runtime signals table, inspection surfaces, failure visibility guide, redaction constraints
  - Append marker now at line 1647 (was 1612 before S11 insertion) — each slice updates this count implicitly; next slice should re-grep, never hardcode
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 67 (S11 contributed 2)"
  - "grep -c 'S11-' index.html → 2 (HTML comment markers confirming both cards present)"
  - "grep -n 'cards will be appended here by subsequent slices' index.html → 1647 (marker preserved)"
  - "grep -A 30 'S11-1' index.html / grep -A 30 'S11-2' index.html → full card markup for inspection"
drill_down_paths:
  - .gsd/milestones/M008/slices/S11/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S11/tasks/T02-SUMMARY.md
duration: ~25m (T01: ~20m, T02: ~5m)
verification_result: passed
completed_at: 2026-03-23
---

# S11: Referentes de cada bando

**Two card-hecho articles inserted in #periodo-rosas profiling the principal unitario leaders (Rivadavia, Paz, Lavalle, Florencio Varela, Juan Cruz Varela) and federal leaders (Rosas, Quiroga, López, Ramírez, Urquiza), raising data-certeza count from 65 to 67.**

## What Happened

T01 researched and verified all content before touching index.html. Both candidate images were confirmed via live Wikimedia API calls: José María Paz's 1887 homenaje portrait (`Jose_maria_paz_retrato_homenaje.jpg`, PD, 500px) and the 1880 oil portrait of Urquiza by Josefa Díaz y Clucellas (`Justo_José_de_Urquiza.jpg`, PD-Art, 500px) — the latter confirmed as the third distinct Urquiza variant not already in use. The S11-CONTENT-DRAFT.md was written with both card entries, biographical facts drawn from Halperin Donghi, Lynch, Sarmiento, Goldman, and Zinny, plus an Image Verification Log and T02 Recipe section providing all HTML attributes for mechanical copy-paste.

T02 located the append marker via grep (line 1612 at that point), wrote the card block to `/tmp/s11-cards.html` using the Write tool (not a bash heredoc, per KNOWLEDGE.md), then spliced it into index.html with a Node.js one-liner using the ASCII-only marker substring `'cards will be appended here by subsequent slices'` to avoid en-dash encoding failures. The marker shifted to line 1647 after insertion. All five verification checks passed on the first attempt with no corrections.

The S11-1 card cross-references S10's program descriptions by naming the leaders who *embodied* those programs, without restating S10's content. The S11-2 card introduces Urquiza as a federal caudillo (pre-1851) with a single closing sentence noting his 1851 switch — the Caseros narrative is explicitly deferred to S13/S14.

## Verification

All five slice-level checks passed:

| Check | Command | Result |
|-------|---------|--------|
| data-certeza count | `grep -c 'data-certeza' index.html` | **67** ✅ |
| S11 marker presence | `grep -c 'S11-' index.html` | **2** ✅ |
| Append marker intact | `grep -n 'cards will be appended here by subsequent slices' index.html` | **line 1647** ✅ |
| CSS/JS untouched | `git diff --name-only HEAD -- styles.css app.js` | **(empty)** ✅ |
| Content draft non-empty | `test -s .../S11-CONTENT-DRAFT.md && echo OK` | **OK** ✅ |

Card structure confirmed via `grep -A 35 'S11-1' index.html`: correct class (`event-card card-hecho reveal reveal-slide`), `data-certeza="hecho"`, stagger `--reveal-delay: 0ms` for S11-1 and `--reveal-delay: 80ms` for S11-2, Wikimedia CDN image URLs, full biographical excerpt, and sourced `<cite>` footer.

## New Requirements Surfaced

- none

## Deviations

None. Both tasks executed exactly as planned. The only additive change was augmenting S11-PLAN.md with the Observability/Diagnostics section as a pre-flight requirement — this was additive-only and did not affect T02.

## Known Limitations

- **Estanislao López has no portrait on Wikimedia Commons** — S11-2 profiles him by name and dates in text only; the card image uses Urquiza as the visual representative of federal leadership. This is documented in KNOWLEDGE.md and is the correct fallback given the Commons gap.
- The Urquiza card (S11-2) introduces Caseros in one sentence but does not narrate it — downstream slices S13/S14 carry that content.

## Follow-ups

- S12 can reference these leader profiles directly without re-introducing the figures.
- S15 (Quiroga assassination) builds on the Barranco Yaco mention in S11-2 — the groundwork is laid.
- The append marker is now at line 1647; S12 must re-grep before splicing.

## Files Created/Modified

- `index.html` — 2 S11 card-hecho articles inserted before the S10–S24 append marker (lines ~1612–1646 at time of insertion); data-certeza count raised from 65 to 67; append marker shifted to line 1647
- `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` — new file: 2 card entries (S11-1 unitario leaders, S11-2 federal leaders), Image Verification Log with API-confirmed thumburls and licenses, Must-Have Checklist, and T02 Recipe section
- `.gsd/milestones/M008/slices/S11/S11-PLAN.md` — added Observability/Diagnostics section (pre-flight requirement)

## Forward Intelligence

### What the next slice should know
- The append marker is at **line 1647** after S11's insertion. Always re-grep (`grep -n 'cards will be appended here by subsequent slices' index.html`) before splicing — never hardcode a line number.
- Both unitario and federal leader rosters are now established. S12 cards about caudillos and provincial governance can mention Rosas, Quiroga, López, Ramírez, and Urquiza by name without biographical re-introduction.
- The stagger convention is: each slice resets to 0ms for its first card, increments by 80ms per additional card within the slice. S11 used 0ms / 80ms.
- `data-certeza` count is 67 at the close of S11. S12 adds its own cards to this running total.

### What's fragile
- **Append marker uniqueness** — the marker string `cards will be appended here by subsequent slices` must remain unique in the file. If a future slice accidentally duplicates it, Node.js `findIndex` will match the first occurrence and insert before the wrong location. After each splice, verify only one occurrence remains: `grep -c 'cards will be appended here' index.html` should return 1.
- **Wikimedia CDN image URLs** — both S11 images use `/thumb/` paths confirmed via API. These URLs are stable but not eternal. If either image ever fails to render, re-verify against `https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`.

### Authoritative diagnostics
- `grep -A 35 'S11-1' index.html` and `grep -A 35 'S11-2' index.html` — fastest way to inspect exact card markup without opening the full file
- `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` T02 Recipe section — the canonical source for all HTML attributes used in these cards; compare against index.html if card content looks wrong

### What assumptions changed
- Append marker line number: was predicted at ~1612 (from T01 baseline grep); was confirmed at 1612 when T02 ran; shifted to 1647 after insertion. Prediction was exact — the intermediate slices did not insert above the marker. This is expected behavior but should not be assumed for future slices that may run out of order.

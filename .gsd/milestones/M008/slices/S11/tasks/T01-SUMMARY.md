---
id: T01
parent: S11
milestone: M008
provides:
  - S11-CONTENT-DRAFT.md with 2 verified card entries (S11-1 unitario leaders, S11-2 federal leaders), Image Verification Log, and T02 Recipe section
key_files:
  - .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md
  - .gsd/milestones/M008/slices/S11/S11-PLAN.md
key_decisions:
  - Both S11 cards use card-hecho (certeza=hecho) — all biographical dates, roles, and key events are documented in standard sources; no interpretive framing required
  - S11-2 image: Justo_José_de_Urquiza.jpg (1880 oil by Josefa Díaz y Clucellas, pageid 182590987) — third distinct Urquiza portrait, not in the used-image list; confirmed 500px PD via API
  - S11-1 image: Jose_maria_paz_retrato_homenaje.jpg (1887 homenaje, pageid 158578426) — only available 500px Paz portrait not already in use
patterns_established:
  - Pre-flight observability section added to S11-PLAN.md (runtime signals table, inspection surfaces, failure visibility, redaction constraints)
  - Both images verified live via Wikimedia API before draft was written — thumburl and license confirmed at API call time
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 65 (baseline before T02); after T02 must be 67"
  - "grep -c 'S11-' index.html → 0 (baseline before T02); after T02 must be 2"
  - "test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo OK → OK"
duration: ~20m
verification_result: passed
completed_at: 2026-03-22
blocker_discovered: false
---

# T01: Research and write S11 content draft with verified images

**Created `S11-CONTENT-DRAFT.md` with 2 fully verified card entries, Image Verification Log (both images confirmed 500px PD via live Wikimedia API calls), and copy-paste-ready T02 Recipe section.**

## What Happened

1. **Read S10-CONTENT-DRAFT.md** to confirm the exact structural format (Image Verification Log table, card entry sections with certeza/excerpt/sources/cite/image blocks, framing notes, T02 Recipe copy-paste section). Used it as the direct template.

2. **Read S11-CONTEXT.md and S11-RESEARCH.md** to gather all biographical facts, pre-verified image candidates, and constraints (used-image list, small-image rule, Caseros narrative deferral rule).

3. **Verified S11-1 image via Wikimedia API** — `Jose_maria_paz_retrato_homenaje.jpg` (pageid 158578426): thumburl confirmed as `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Jose_maria_paz_retrato_homenaje.jpg/500px-Jose_maria_paz_retrato_homenaje.jpg`, license `pd`, PD-AR-Photo category, dated 1887-12. ✅

4. **Verified S11-2 image via Wikimedia API** — `Justo_José_de_Urquiza.jpg` (pageid 182590987): thumburl confirmed as `https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-Justo_Jos%C3%A9_de_Urquiza.jpg`, license `pd`, PD-Art PD-old-100, artist Josefa Díaz y Clucellas (1852–1917), dated 1880. This is confirmed as the third distinct Urquiza variant — NOT `Justo_José_de_Urquiza_(retrato).jpg` or `Justo-jose-de-urquiza-983506.jpg`. ✅

5. **Wrote two card entries** in `S11-CONTENT-DRAFT.md`:
   - **S11-1: Los líderes unitarios** — excerpt profiles Rivadavia (1780–1845, primer presidente), Paz (1791–1854, La Tablada/Oncativo), Lavalle (1797–1841, fusilador de Dorrego), Florencio Varela (1807–1848, El Comercio del Plata, asesinado), Juan Cruz Varela (1794–1839). Cross-references S10's program cards by naming leaders who embodied those programs without restating S10's content. 3 cited sources.
   - **S11-2: Los líderes federales** — excerpt profiles Rosas (1793–1877, dos gobernaciones), Quiroga (ca. 1788–1835, asesinado en Barranco Yaco), López (1786–1838, Santa Fe), Ramírez (1786–1821, Cepeda, murió en combate), Urquiza (1801–1870, federal hasta 1851 with single-sentence note about Caseros). 3 cited sources. Caseros narrative is explicitly deferred.

6. **Added Observability section to S11-PLAN.md** (pre-flight requirement) — runtime signals table, inspection surfaces (content draft, image URLs, card grep commands), failure visibility (what each grep count deviation means), redaction constraints (none — all public content).

7. **Appended Image Verification Log and T02 Recipe** to `S11-CONTENT-DRAFT.md` — both cards have all HTML attributes (class, data-certeza, style, image src, alt, excerpt text, cite) ready for mechanical copy-paste in T02.

## Verification

```bash
# Task-level checks
test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo "file exists"
# → "file exists" ✅

grep -c "^## Card S11-" .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md
# → 2 ✅

# Slice-level baseline (T02 not yet run)
grep -c 'data-certeza' index.html
# → 65 (baseline — T02 will bring this to 67) ✅

grep -c 'S11-' index.html
# → 0 (expected — T02 not yet run) ✅

grep -n 'cards will be appended here by subsequent slices' index.html
# → 1612: line present ✅

git diff --name-only HEAD -- styles.css app.js
# → empty ✅

test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo OK
# → OK ✅
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo "file exists"` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## Card S11-" .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` | 0 (output: 2) | ✅ pass | <1s |
| 3 | `grep -c 'data-certeza' index.html` | 0 (output: 65, baseline before T02) | ✅ pass (expected 65 at this stage) | <1s |
| 4 | `grep -c 'S11-' index.html` | 1 (output: 0, expected before T02) | ✅ pass (expected 0 at this stage) | <1s |
| 5 | `grep -n 'cards will be appended here by subsequent slices' index.html` | 0 (line 1612 present) | ✅ pass | <1s |
| 6 | `git diff --name-only HEAD -- styles.css app.js` | 0 (empty — no CSS/JS changes) | ✅ pass | <1s |
| 7 | `test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo OK` | 0 (output: OK) | ✅ pass | <1s |
| 8 | Wikimedia API — S11-1 image thumburl | HTTP 200, thumburl contains `/500px-` | ✅ pass | ~1s |
| 9 | Wikimedia API — S11-2 image thumburl + license | HTTP 200, thumburl contains `/500px-`, license: pd | ✅ pass | ~1s |

## Diagnostics

- **Content draft** is the single source of truth for T02: `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` — read the Image Verification Log table and T02 Recipe section first when debugging card content or image URL issues.
- **Image URLs**: both thumb URLs are direct Wikimedia CDN links. `curl -I <thumburl>` should return HTTP 200. If a card's image fails to render, compare the `src` attribute in index.html against the verified URL in the draft's T02 Recipe.
- **Post-T02 inspection**: `grep -A 30 'S11-1' index.html` and `grep -A 30 'S11-2' index.html` surface the injected card markup.

## Deviations

None — task executed exactly as planned. S11-PLAN.md was updated to add the missing Observability section per the pre-flight requirement; this was an additive-only change that does not affect T02.

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` — new file: 2 card entries (S11-1 unitario leaders, S11-2 federal leaders), Image Verification Log with API-confirmed thumburls and licenses, Must-Have Checklist, and T02 Recipe section with all HTML attributes ready for mechanical integration
- `.gsd/milestones/M008/slices/S11/S11-PLAN.md` — added `## Observability / Diagnostics` section (pre-flight requirement): runtime signals table, inspection surfaces, failure visibility guide, redaction constraints

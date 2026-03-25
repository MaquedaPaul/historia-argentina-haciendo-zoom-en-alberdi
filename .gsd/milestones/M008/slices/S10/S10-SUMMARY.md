---
id: S10
parent: M008
milestone: M008
provides:
  - 3 verified content cards in #periodo-rosas covering the ideological and economic programs of unitarios and federales
  - S10-CONTENT-DRAFT.md documenting historical sources, certeza classification, and verified Wikimedia images
requires:
  - slice: S09
    provides: '#periodo-rosas container with append marker and baseline 62 data-certeza cards'
affects:
  - S11 (referentes de cada bando — can now name which leaders embodied the programs described here)
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md
key_decisions:
  - S10-2 image: Juan Bautista Bustos (Governor of Córdoba 1820–1829) chosen over unavailable Estanislao López portrait; Bustos best represents federal proteccionismo as Córdoba had the strongest artisanal economy
  - S10-3 image: General Juan Lavalle — his execution of Dorrego (Dec 1828) is the moment the economic conflict became armed war, connecting the economic thesis to a concrete historical symbol
  - S10-3 blockquote attributed to Halperin Donghi as explicit paraphrase (not direct quote) — consistent with no-synthetic-quote policy
patterns_established:
  - Image fallback chain for federal caudillos: Rosas (used) → Quiroga (used) → López (not on Commons) → Bustos (available, PD, fits theme)
  - Marker search uses ASCII-only substring ('cards will be appended here by subsequent slices') to avoid Node.js en-dash encoding failure
observability_surfaces:
  - grep -c 'data-certeza' index.html → 65
  - grep -c 'S10-' index.html → 3
  - grep -n 'cards will be appended here by subsequent slices' index.html → line 1612
  - git diff --name-only HEAD -- styles.css app.js → empty
  - test -s .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md && echo OK → OK
drill_down_paths:
  - .gsd/milestones/M008/slices/S10/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S10/tasks/T02-SUMMARY.md
duration: ~35m (T01 ~25m + T02 ~10m)
verification_result: passed
completed_at: 2026-03-22
---

# S10: Ideas de unitarios y federales

**Three verified content cards appended to `#periodo-rosas`: unitario program (certeza `hecho`), federal program (certeza `hecho`), and the economic substructure of the conflict (certeza `opinion`) — raising `data-certeza` count from 62 to 65, with no CSS or JS changes.**

## What Happened

S10 followed the two-task structure established by S09: T01 produced a verified content draft, T02 performed mechanical HTML integration.

**T01 (Research + content draft):** Reviewed the S09-CONTENT-DRAFT.md skeleton to ensure format consistency, then drafted three card entries. Image verification via the Wikimedia API confirmed three public-domain images not previously used in the project:

- **S10-1 (unitario program):** Sarmiento portrait by Benjamín Franklin Rawson (`Retrato_de_Sarmiento_-_Benjamín_Franklin_Rawson.jpg`) — confirmed thumburl at 500px, PD.
- **S10-2 (federal program):** Estanislao López was the natural choice but his portrait is not on Wikimedia Commons (API returned `missing`). Fallback: Juan Bautista Bustos, Governor of Córdoba 1820–1829 — confirmed thumburl at 500px, PD. Bustos was selected because Córdoba had the strongest artisanal manufacturing base in the interior, making it the clearest material embodiment of federal proteccionismo.
- **S10-3 (economic conflict):** General Juan Lavalle (`General_Don_Juan_LaValle.jpg`) — confirmed thumburl at 500px (3087×4778px original), explicitly "Public domain." Lavalle's execution of Dorrego in December 1828 was the moment the economic conflict became armed war, connecting Halperin Donghi's reframing to a concrete historical symbol.

A T02 Recipe section was included in the draft with copy-paste-ready HTML attributes for all three cards.

**T02 (HTML integration):** Located the append marker at line 1542 via `grep -n`. Cards were written to `/tmp/s10-cards.html` (per KNOWLEDGE.md heredoc warning) and spliced into `index.html` using Node.js. First attempt failed because the en-dash (`–`, U+2013) in `l.includes('S10\u2013S24 cards will be appended')` didn't match file bytes due to shell encoding. Fixed by using the ASCII-only substring `'cards will be appended here by subsequent slices'` — which is unique enough and avoids the special character. Splice succeeded; marker moved to line 1612.

**Card inventory after S10:**
- S10-1: `card-hecho`, `data-certeza="hecho"`, `--reveal-delay: 0ms` — El programa unitario (centralismo, libre comercio, educación pública; Echeverría *Dogma Socialista* 1837, Sarmiento *Facundo* 1845)
- S10-2: `card-hecho`, `data-certeza="hecho"`, `--reveal-delay: 80ms` — El programa federal (autonomía provincial, proteccionismo, reparto de rentas, Pacto Federal 1831)
- S10-3: `card-opinion`, `data-certeza="opinion"`, `--reveal-delay: 160ms` — La disputa real: ¿quién controla la aduana? (Halperin Donghi reframing; blockquote as attributed paraphrase)

## Verification

All 5 slice-level verification commands ran green:

| Command | Result |
|---------|--------|
| `grep -c 'data-certeza' index.html` | **65** (62 baseline + 3 new) |
| `grep -n 'S10–S24 cards will be appended' index.html` | line 1612 — marker intact |
| `git diff --name-only HEAD -- styles.css app.js` | empty — no side effects |
| `test -s S10-CONTENT-DRAFT.md && echo OK` | OK |
| `grep -c 'S10-' index.html` | **3** — all three identifier comments present |

Per-card attribute spot-checks:
- S10-1: `class="event-card card-hecho reveal reveal-slide"`, `data-certeza="hecho"`, `style="--reveal-delay: 0ms"` ✅
- S10-2: `class="event-card card-hecho reveal reveal-slide"`, `data-certeza="hecho"`, `style="--reveal-delay: 80ms"` ✅
- S10-3: `class="event-card card-opinion reveal reveal-slide"`, `data-certeza="opinion"`, `style="--reveal-delay: 160ms"` ✅

## New Requirements Surfaced

None. S10 extends the existing certeza and content-draft patterns without surfacing new system-level requirements.

## Deviations

- **S10-2 image changed from Echeverría to Bustos:** Echeverría's portrait was already used in SP3-3. The explicit fallback chain (Rosas used → Quiroga used → López not on Commons → Bustos available) was authorized by the T01 plan and is now documented in KNOWLEDGE.md.
- **Node.js marker search string changed:** The plan's predicate `l.includes('S10\u2013S24 cards will be appended')` failed due to en-dash encoding. Fixed to `l.includes('cards will be appended here by subsequent slices')`. Pattern logged in KNOWLEDGE.md.

## Known Limitations

- The economic conflict card (S10-3) uses a Halperin Donghi *paraphrase*, not a direct quote, because no digitized primary text was available for verification. The blockquote is explicitly labeled `[NO USAR COMO CITA DIRECTA]` in the draft. A future content pass with access to the 1972 Paidós edition could replace the paraphrase with a verified direct quote.
- Stagger delays reset to 0ms/80ms/160ms for S10 (per the S09-established pattern). This is correct: each slice forms its own visual group.

## Follow-ups

- S11 can now name the intellectual representatives who embodied each program (Echeverría, Sarmiento for unitarios; Quiroga, López, Bustos for federales) — the ideological groundwork is laid.
- A future content-accuracy pass should verify the Halperin Donghi paraphrase against the 1972 Paidós edition and upgrade it to a direct quote if the text matches.

## Files Created/Modified

- `index.html` — 3 S10 cards inserted before append marker; `data-certeza` count raised from 62 to 65; marker preserved at line 1612; no CSS or JS changes
- `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md` — new file; 3 card entries with T02-ready attributes, Image Verification Log, and T02 Recipe section
- `.gsd/milestones/M008/slices/S10/S10-PLAN.md` — Observability / Diagnostics section added (pre-flight requirement)
- `.gsd/milestones/M008/slices/S10/tasks/T01-PLAN.md` — Observability Impact section added (pre-flight requirement)

## Forward Intelligence

### What the next slice (S11) should know
- The three ideological cards in S10 deliberately avoid naming individual leaders — S10 is about *programs*, S11 is about *people*. S11 should cross-reference these cards by naming which leaders embodied which positions rather than re-stating the positions.
- `data-certeza` baseline entering S11 is **65**. The append marker is at line **1612**. Stagger delays for S11 should reset to 0ms.
- The Echeverría portrait (`Retrato_de_Echeverría...`) is already used in SP3-3 — do not reuse it for S11. For unitario intellectuals, consider Rivadavia, Lavalle (now used in S10-3), or Paz.

### What's fragile
- **Lavalle portrait used in S10-3** — if S11 plans a dedicated Lavalle card (his role in the 1829 crisis), it must use a different image. The S10-3 image (`General_Don_Juan_LaValle.jpg`) cannot be reused.
- **Halperin Donghi paraphrase in S10-3** — marked `[NO USAR COMO CITA DIRECTA]` in the draft. If a future agent reads the card HTML directly (not the draft), they won't see this warning. The HTML blockquote attribution reads "— Halperin Donghi, *De la revolución de independencia a la confederación rosista*, Paidós, 1972" which could be misread as a direct quote.

### Authoritative diagnostics
- `grep -c 'data-certeza' index.html` — single most reliable signal for card-count integrity; should be **65** entering S11
- `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md` Image Verification Log — canonical record of which images were verified, their license status, and why each was accepted or rejected

### What assumptions changed
- **Estanislao López assumed to be on Wikimedia Commons** — he is not. The API returned `missing`. Any slice needing a López portrait must find an alternative (engravings, period illustrations) or use a different representative federal caudillo.

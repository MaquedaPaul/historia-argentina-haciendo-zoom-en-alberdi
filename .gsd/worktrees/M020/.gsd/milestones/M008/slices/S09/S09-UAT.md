# S09: Origen de unitarios y federales — UAT

**Milestone:** M008
**Written:** 2026-03-22

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S09 produces a static HTML page change (no server, no JS logic, no API calls). All deliverables are inspectable via grep and DOM queries. The slice plan defines exact expected counts for every structural element. Artifact-driven verification is complete and sufficient.

## Preconditions

1. `index.html` is the file under test — located at the root of the working directory.
2. `S09-CONTENT-DRAFT.md` exists at `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md`.
3. No server required — all tests run against the static file or via a local file open in browser.
4. For browser tests: open `index.html` directly in Chrome/Firefox (or serve via `npx serve .` / `python -m http.server`).

## Smoke Test

```bash
grep -c 'data-certeza' index.html
# Expected: 62
# If this returns 62, S09 cards are present and the baseline is intact.
```

---

## Test Cases

### 1. Sub-period container exists and is correctly positioned

```bash
grep -n 'id="periodo-rosas"' index.html
```

1. Run the command.
2. **Expected:** Returns exactly 1 line. The line number must be greater than the line number of `</div><!-- /#rev-1820-1835 -->` and less than the line number of `<!-- CONECTOR ALBERDI — SP2 → SP3`.

Verification:
```bash
grep -n '/#rev-1820-1835\|id="periodo-rosas"\|CONECTOR ALBERDI.*SP2.*SP3' index.html
# Expected line order: /#rev-1820-1835 < id="periodo-rosas" < CONECTOR ALBERDI SP2→SP3
```

---

### 2. All 4 S09 cards are present with correct certeza values

```bash
grep -c 'data-certeza' index.html
# Expected: 62

grep -n 'data-certeza' index.html | tail -5
# Expected: last 4 entries show hecho, hecho, hecho, opinion (in that order)
```

1. Run first command → must return `62`.
2. Run second command → last 4 lines must show `data-certeza="hecho"`, `data-certeza="hecho"`, `data-certeza="hecho"`, `data-certeza="opinion"`.
3. **Expected:** S09-1, S09-2, S09-3 are `card-hecho`; S09-4 is `card-opinion` with `data-certeza="opinion"` (no accent).

---

### 3. Sub-nav link added correctly

```bash
grep -n 'href="#periodo-rosas"' index.html
# Expected: exactly 1 result

grep -n 'href="#rev-1820-1835"\|href="#periodo-rosas"' index.html
# Expected: #rev-1820-1835 appears on a line BEFORE #periodo-rosas
```

1. Confirm exactly 1 `href="#periodo-rosas"` exists.
2. Confirm it appears after the `#rev-1820-1835` link in document order.
3. **Expected:** Sub-nav link is `<a href="#periodo-rosas" class="sub-nav__link">1820–1852<span class="sub-nav__link-label">Unitarios y Federales</span></a>`.

---

### 4. SP2 cards are untouched

```bash
grep -c 'id="rev-1820-1835"' index.html
# Expected: 1

git diff HEAD -- index.html | grep '^-' | grep 'rev-1820-1835\|SP2-1\|SP2-2\|SP2-3\|SP2-4' | wc -l
# Expected: 0 (no SP2 lines were deleted)
```

1. Confirm `#rev-1820-1835` container still has exactly 1 instance.
2. Confirm no SP2 card lines were deleted from the diff.
3. **Expected:** All pre-existing SP2 content is intact.

---

### 5. No CSS or JS files modified

```bash
git diff --name-only HEAD -- styles.css app.js
# Expected: empty output (no lines)
```

1. Run the command.
2. **Expected:** Zero output — neither `styles.css` nor `app.js` appears in the diff.

---

### 6. Reveal system integration — all 4 S09 cards use correct reveal classes

```bash
grep -c 'reveal reveal-slide' index.html
# Expected: 68 (64 baseline + 4 new S09 cards)

grep -n 'periodo-rosas' index.html
# Then inspect lines around 1446–1545 for reveal reveal-fade on the container
# and reveal reveal-slide on each card article
```

1. Confirm `reveal reveal-slide` count increased by 4 from baseline.
2. **Expected:** `#periodo-rosas` container has `reveal reveal-fade`; each of the 4 card `<article>` elements has `reveal reveal-slide`.

---

### 7. Stagger delays are correctly assigned

```bash
grep -A2 'id="periodo-rosas"' index.html | head -20
# Then examine the 4 cards for --reveal-delay values
```

Expected delay sequence:
- S09-1 (aduana): `--reveal-delay: 0ms`
- S09-2 (Directorio): `--reveal-delay: 80ms`
- S09-3 (Constitución 1826): `--reveal-delay: 160ms`
- S09-4 (identidades): `--reveal-delay: 240ms`

1. Inspect the 4 card `<article>` elements inside `#periodo-rosas`.
2. **Expected:** Delays follow the 80ms increment sequence starting at 0ms.

---

### 8. Append marker exists for future slices

```bash
grep -n 'S10.*S24 cards will be appended' index.html
# Expected: exactly 1 result, inside the #periodo-rosas events-grid
```

1. Run the command.
2. **Expected:** Returns 1 line between the last S09 card and `</div><!-- /.events-grid S09 -->`.

---

### 9. Content draft satisfies structural requirements

```bash
grep -c '^## Card' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md
# Expected: 4

grep 'Certeza' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md
# Expected: 3 lines showing "hecho" and 1 line showing "opinion" (no accent)
```

1. Confirm 4 card sections exist in the draft.
2. Confirm certeza distribution: 3× hecho, 1× opinion.
3. **Expected:** Content draft is structurally complete and certeza values match the HTML.

---

### 10. Opinion card uses correct HTML structure (no synthetic direct quote)

```bash
grep -n 'card-opinion__quote\|card-opinion__author\|card-opinion__context' index.html | tail -6
```

1. Run the command.
2. **Expected:** The last 3 matches correspond to S09-4's blockquote structure with attribution to "Historiografía contemporánea" and context citing Botana and Goldman.
3. Confirm no `<q>` or `<blockquote>` element in S09-4 contains a text that appears to be a verbatim synthetic quote from a named historian without verified pagination.

---

## Edge Cases

### Missing image fallback behavior

S09-3 uses the Dorrego portrait direct URL (349×537px, no `/thumb/` path). Test that the image renders correctly in browser:

1. Open `index.html` in browser.
2. Scroll to `#periodo-rosas`.
3. Check S09-3 card image (Manuel Dorrego portrait).
4. **Expected:** Image renders at full card width, not broken. The `loading="lazy"` attribute means it will only load when the card is near the viewport.
5. If image appears broken: `curl -I 'https://upload.wikimedia.org/wikipedia/commons/4/48/Manuel_Dorrego.jpg'` — note that 429 from curl is expected (Wikimedia rate limit) and does NOT indicate the image is broken in browser.

### Certeza accent normalization

```bash
grep 'data-certeza="opinión"' index.html | wc -l
# Expected: 0 (no accented variant for S09 cards)

grep 'data-certeza="opinion"' index.html | wc -l
# Expected: matches the count of opinion cards (≥5 including pre-M008 cards)
```

S09-4 must use `opinion` (no accent). Any accented `opinión` in S09-4 would break CSS certeza-indicator rendering.

### Sub-nav link label text

```bash
grep 'href="#periodo-rosas"' index.html
# Expected output includes: 1820–1852 and Unitarios y Federales
```

Confirm the en-dash (–) is used (not a hyphen), matching the convention of other sub-nav links.

### No duplicate #periodo-rosas

```bash
grep -c 'id="periodo-rosas"' index.html
# Expected: 1 (not 2 — duplicate would break anchor navigation)
```

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns **60** instead of 62 → one S09 card is missing its `data-certeza` attribute. Run `grep -n 'card-hecho\|card-opinion' index.html | tail -8` to locate the malformed card.
- `grep -c 'data-certeza' index.html` returns **63+** → a duplicate card was inserted. Inspect `grep -n 'data-certeza' index.html | tail -10`.
- `grep -c 'id="periodo-rosas"' index.html` returns **0** → the sub-period container was not inserted or was mis-tagged. Check for typo: `id="period-rosas"` (missing 'o').
- `grep -c 'id="rev-1820-1835"' index.html` returns **0** → an SP2 card was accidentally deleted. Restore: `git checkout HEAD -- index.html` and re-apply the S09 edits.
- `git diff --name-only HEAD -- styles.css app.js` returns output → a prohibited file was modified. Revert immediately: `git checkout HEAD -- styles.css app.js`.
- S09-4 shows `data-certeza="opinión"` (with accent) → certeza normalization failed. Will not break display but violates KNOWLEDGE.md convention. Fix the attribute value.

---

## Not Proven By This UAT

- **Visual rendering at mobile breakpoints** — the reveal/stagger system and card layout at 375px are not tested here. These are covered by the existing R007 (responsive design) validation and the grid CSS already verified in M003–M005.
- **Scroll-triggered reveal animations** — IntersectionObserver behavior for the new cards is not tested. The system is unchanged from prior milestones; new cards use the same `.reveal.reveal-slide` pattern that was validated in R009.
- **Historical accuracy of card content** — this UAT tests structural and mechanical correctness, not historical fact verification. Fact verification was performed in T01 via content draft with bibliographic sources.
- **Cross-browser rendering** — only tested in the primary development browser. No IE/Safari-specific checks.
- **Image load performance** — Wikimedia CDN availability is not tested. Broken image display would require a Wikimedia CDN outage, not a code defect.

---

## Notes for Tester

- The `#periodo-rosas` section will appear visually sparse (4 cards) until S10–S24 complete. This is expected — S09 establishes the container that subsequent slices fill.
- The Dorrego portrait (S09-3) is a direct URL (no `/thumb/`). In browser, it renders at `width="100%"` filling the card image container. If the image container looks taller than adjacent card images, this is because the Dorrego portrait is 349×537 (portrait orientation) vs. the landscape images used in other cards. This is a content characteristic, not a layout bug.
- S09-4 shows "Interpretación historiográfica" as the certeza label (opinion card) — this is correct. The blockquote prose is a paraphrase attributed to Botana and Goldman, not a verbatim quote. This is intentional and consistent with the Quote Verification Protocol.
- When scrolling to test reveals, start from the top of the page — elements already in the viewport on load get `reveal--no-anim` (not animated), which is correct behavior per KNOWLEDGE.md. Navigate from above the `#periodo-rosas` section to see the stagger animation.

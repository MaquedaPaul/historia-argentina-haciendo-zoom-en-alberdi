---
id: S14
milestone: M008
uat_type: artifact-driven
written: 2026-03-23
---

# S14: El segundo gobierno de Rosas — el Restaurador — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- **UAT mode:** artifact-driven
- **Why this mode is sufficient:** The site is a static HTML page with no server, database, or runtime dependencies. All verifiable slice outputs (card presence, certeza count, marker integrity, zero CSS/JS drift) are readable directly from the file system via grep and git. Browser rendering is validated via scroll-reveal behavior, which depends only on the existing IntersectionObserver system (unchanged). No new JS or CSS was introduced.

## Preconditions

- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
- `index.html` is present and the slice has been spliced (data-certeza count = 74)
- A browser capable of opening local HTML files is available (Chrome, Firefox, or Edge)
- No local HTTP server required — `file://` protocol is sufficient for static content inspection

## Smoke Test

```bash
grep -c 'data-certeza' index.html
# Expected: 74
```

If this returns 74, the splice landed. Proceed to full test cases.

---

## Test Cases

### 1. Card count and marker integrity

**Purpose:** Confirm exactly 3 S14 cards were inserted and the append marker for subsequent slices is intact.

```bash
grep -c 'data-id="S14-' index.html
grep -c 'cards will be appended here' index.html
```

1. Run both commands from the working directory.
2. **Expected:** First command returns `3`. Second command returns `1`.
3. **Failure signal:** If first returns 0–2, one or more cards are missing. If second returns 0, the marker was deleted — restore from `C:/tmp/index.html.bak-s14`.

---

### 2. Zero CSS / JS drift

**Purpose:** Confirm no stylesheet or script changes were introduced.

```bash
git diff --name-only HEAD -- styles.css app.js
```

1. Run the command from the working directory.
2. **Expected:** Empty output (no files listed).
3. **Failure signal:** Any filename in output means a prohibited change was made. Inspect `git diff HEAD -- styles.css` or `git diff HEAD -- app.js` to identify the change.

---

### 3. S14-1 card content — Suma del Poder Público acquisition

**Purpose:** Confirm the return-to-power card is correctly formed with the right certeza, plebiscite figure, and image attribution.

```bash
grep -A 30 'data-id="S14-1"' index.html | head -40
```

1. Run the command.
2. **Expected output must include:**
   - `data-certeza="hecho"`
   - `9.316` (plebiscite figure — note: period as thousands separator in Spanish)
   - `img-attribution` (CC BY 2.5 ar attribution block inside `.card-image`)
   - `Divisas_de_la` (image filename reference)
   - `Restaurador de las Leyes` (the title Rosas received)
3. **Failure signal:** Missing `img-attribution` means the CC license is unattributed. Missing `9.316` means the plebiscite figure contradicts SP3-1.

---

### 4. S14-2 card content — geopolitical arc (blockades and Caseros)

**Purpose:** Confirm the blockades/Caseros arc card covers the correct events and does not duplicate SP3-6 tactical detail.

```bash
grep -A 40 'data-id="S14-2"' index.html | head -50
```

1. Run the command.
2. **Expected output must include:**
   - `data-certeza="hecho"`
   - `1838` or `1840` (French blockade dates)
   - `Vuelta de Obligado` (battle name)
   - `1845` (battle date)
   - `Southampton` (Rosas exile destination)
   - `Batalla_de_la_Vuelta_de_Obligado` (image filename)
3. **Expected output must NOT include:**
   - A detailed tactical Caseros battle description (that's SP3-6's territory)
   - References to Mazorca as main subject (that's SP3-2's territory)
4. **Failure signal:** If Mazorca is the primary subject of S14-2, the card duplicated SP3-2. If Caseros has full tactical detail, it duplicates SP3-6.

---

### 5. S14-3 card content — historiographic seed note

**Purpose:** Confirm the debate-seeding card has the correct certeza value, card-nota-historiografica paragraph, and no image.

```bash
grep -A 25 'data-id="S14-3"' index.html | head -30
```

1. Run the command.
2. **Expected output must include:**
   - `data-certeza="debatido"`
   - `card-nota-historiografica`
   - `card-opinion` (CSS class — no card-debatido class exists)
   - References to both liberal/unitaria and revisionist/federal historiographic schools
3. **Expected output must NOT include:**
   - An `<img>` tag (S14-3 has no image by design)
4. **Failure signal:** If `data-certeza` is `"hecho"` or `"opinion"` instead of `"debatido"`, the card is misclassified. If `card-nota-historiografica` is absent, the epistemic notice is missing.

---

### 6. Stagger delay sequencing

**Purpose:** Confirm the three S14 cards have the correct reveal-delay stagger (0ms → 80ms → 160ms).

```bash
grep -A 2 'data-id="S14-' index.html | grep 'reveal-delay'
```

1. Run the command.
2. **Expected:** Three lines, one per card, with values `0ms`, `80ms`, `160ms` in order.
3. **Failure signal:** If delays are absent or cumulative from prior slices (e.g., 480ms, 560ms, 640ms), the stagger reset was not applied.

---

### 7. Cards appear inside #periodo-rosas and before the append marker

**Purpose:** Confirm structural placement — all three S14 cards are inside the `#periodo-rosas` section, above the append marker for future slices.

```bash
grep -n 'data-id="S14-1"\|data-id="S14-2"\|data-id="S14-3"\|cards will be appended here\|id="periodo-rosas"' index.html
```

1. Run the command.
2. **Expected:** Lines in this order (ascending line numbers):
   - `id="periodo-rosas"` — the container open
   - `data-id="S14-1"` — first card
   - `data-id="S14-2"` — second card
   - `data-id="S14-3"` — third card
   - `cards will be appended here` — the marker for future slices
3. **Failure signal:** If any S14 card line number is AFTER the marker line, the splice landed in the wrong position.

---

### 8. Browser smoke test — cards visible and reveal on scroll

**Purpose:** Confirm the three cards render correctly in a browser and animate on scroll.

1. Open `index.html` in a browser (`file://` protocol is sufficient).
2. Navigate to the "Rosas" period section (scroll down past the colonial and revolución periods, or use the nav link if present).
3. Scroll slowly through the `#periodo-rosas` section.
4. **Expected:**
   - Three new cards appear in sequence: "El regreso y la Suma del Poder Público", the blockades/Caseros arc card, and the historiographic note.
   - Each card fades/slides in as it enters the viewport (reveal-on-scroll behavior).
   - The Divisas image appears in S14-1 with a small attribution line below it.
   - The Vuelta de Obligado battle image appears in S14-2.
   - S14-3 has no image — only text with a visible "Nota historiográfica:" label.
5. **Failure signal:** Cards invisible, no reveal animation, broken image (404), or missing attribution line.

---

## Edge Cases

### S14-1 image attribution renders visibly

1. Open `index.html` in a browser and navigate to S14-1.
2. Inspect the area below the Divisas image.
3. **Expected:** A small italic or muted line reading something like "Divisas de la época de Rosas / CC BY 2.5 ar" is visible below or overlaid on the image.
4. **Why this matters:** CC BY 2.5 ar requires visible attribution. If the `img-attribution` paragraph has no CSS and inherits `display: none` from some ancestor, the license is violated.

### data-certeza="debatido" does not break certeza-grid styling

1. Open `index.html` in a browser.
2. Navigate to S14-3 (the historiographic note card).
3. **Expected:** The card renders with normal card styling — no broken layout, no invisible text, no layout overflow. It may look like an opinion card (since it uses `card-opinion` class), which is acceptable.
4. **Not expected:** The card should NOT display a "hecho" or "rumor" badge — `data-certeza="debatido"` is a new value and the badge CSS may not have a rule for it. If the badge shows "debatido" as a formatted label, that's a bonus. If it shows nothing, that is acceptable given zero-new-CSS constraint.

### Prior SP3 cards are undisturbed

1. Run: `grep -c 'data-id="SP3-' index.html`
2. **Expected:** Same count as before S14 splice (6 cards from the earlier SP3 batch).
3. Run: `grep -n 'data-id="SP3-6"' index.html` and verify its content still includes Caseros tactical detail.
4. **Failure signal:** Any change to SP3 card count or content indicates the splice landed incorrectly or wrapped into existing content.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns < 74 → one or more cards were not inserted; restore from `C:/tmp/index.html.bak-s14` and re-splice.
- `grep -c 'cards will be appended here' index.html` returns 0 → marker was deleted; restore from backup immediately.
- `git diff --name-only HEAD -- styles.css app.js` is non-empty → prohibited CSS/JS change; inspect and revert.
- S14-3 has `data-certeza="hecho"` or `"opinion"` → wrong certeza; fix in index.html directly.
- `img-attribution` absent from S14-1 → CC license violation; add attribution block inside `.card-image`.
- S14 cards appear AFTER the append marker (line-number check) → splice landed in wrong position; restore and re-splice targeting the marker correctly.

---

## Not Proven By This UAT

- **Image availability at Wikimedia Commons URLs** — curl/wget may get 429 rate-limiting from Wikimedia (documented in KNOWLEDGE.md). Browsers load the images fine. Do not diagnose broken images based on CLI fetch failures.
- **Mobile responsive layout** — cards use the same grid as all other `#periodo-rosas` cards; no new CSS was introduced. Responsive behavior is inherited. A full mobile audit is deferred to a dedicated QA slice.
- **Cross-browser rendering** — tested on one browser is sufficient for a static HTML slice with no new CSS/JS.
- **Historiographic accuracy of S14-3** — the card intentionally presents the debate as open and contested. The UAT confirms structural correctness (certeza="debatido", card-nota-historiografica present) but does not adjudicate which historiographic school is correct.
- **S14-3 badge styling for "debatido"** — the `data-certeza="debatido"` value is new. Badge CSS may not have a rule for it. This is a known limitation, not a UAT failure.

---

## Notes for Tester

- The plebiscite figure in S14-1 is `9.316` (Spanish thousands separator = period). If you see `9,316` with a comma, that's a locale display difference, not an error — the HTML stores `9.316`.
- SP3-1 in the same page also references the Suma del Poder Público from the Alberdi-context angle. S14-1 covers the same event from the Rosas-return angle. Some topical overlap between these two cards is intentional and by design — they are different analytical lenses on the same 1835 event.
- S14-2's Caseros coverage intentionally stops at the mandate-arc level (exile, death in 1877). SP3-6 handles the tactical/political Caseros detail. Both cards in the same browser session is the correct reading experience — they complement, not duplicate, each other.
- S14-3's "debatido" classification seeds a four-slice debate arc (S15–S19). Reading S14-3 alone, the historiographic note will feel brief. That is intentional — it is a seed, not a resolution.

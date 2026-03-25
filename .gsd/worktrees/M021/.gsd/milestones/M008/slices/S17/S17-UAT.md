# S17: ¿Sin Rosas, Argentina sería un caos? — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S17 is a static HTML content slice with no runtime logic, backend, or user-interaction flow. All verification is deterministic: grep counts on index.html, file existence checks, and browser rendering of the new card. The slice's correctness is fully provable from the artifact.

## Preconditions

1. Working directory is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
2. `index.html` has been modified by T02 (data-certeza count = 80)
3. `S17-CONTENT-DRAFT.md` exists and is non-empty
4. No dev server required — file can be opened directly in browser as `file:///.../index.html`

## Smoke Test

```bash
grep -c 'data-certeza' index.html   # must return 80
grep -c 'data-id="S17-1"' index.html  # must return 1
```

If either check fails, the splice did not complete. Restore from `C:/tmp/index.html.bak-s17` and re-run T02.

---

## Test Cases

### 1. Card existence and identity

**Purpose:** Confirm the S17-1 card was inserted and has the correct data attributes.

```bash
grep -n 'data-id="S17-1"' index.html
```

**Expected:** Output shows exactly 1 line containing `data-id="S17-1"` inside an `<article>` element. The line should also contain `class="event-card card-opinion reveal reveal-fade"` and `data-certeza="opini&#xF3;n"`.

---

### 2. data-certeza count integrity

**Purpose:** Confirm total certeza card count is exactly 80 — one new card, no duplicates, no deletions.

```bash
grep -c 'data-certeza' index.html
```

**Expected:** `80`. Value of 79 = splice failed. Value of 81+ = duplicate insert.

---

### 3. Append marker integrity

**Purpose:** Confirm the splice did not corrupt or duplicate the inter-slice marker that all subsequent slices (S18–S24) depend on.

```bash
grep -c 'cards will be appended here' index.html
```

**Expected:** `1`. Value of 0 = marker corrupted. Value of 2 = marker was duplicated.

---

### 4. card-nota-historiografica count

**Purpose:** Confirm the nota block was not dropped during entity-encoding or Node.js splice.

```bash
grep -c 'card-nota-historiografica' index.html
```

**Expected:** `6` (was 5 before S17). Value of 5 = nota block was dropped during splice.

---

### 5. No new CSS or JS

**Purpose:** Confirm zero-new-CSS / zero-new-JS hard constraint.

```bash
git diff --name-only HEAD -- styles.css app.js
```

**Expected:** Empty output (no changes to either file).

---

### 6. Source attribution completeness

**Purpose:** Confirm the cite footer and nota contain all three required source attributions.

```bash
grep -A 30 'data-id="S17-1"' index.html | grep -c 'Irazusta\|Lynch\|Halper'
```

**Expected:** `3` or more (each author name appears at least once — once in the nota body and once in the cite footer). Value below 3 = one source attribution was dropped.

---

### 7. Scope boundary enforcement — no bloqueos/sovereignty content

**Purpose:** Confirm S17-1 does not contain content about bloqueos (anglés/francés) or foreign-policy sovereignty, which belongs to S22.

```bash
grep -A 30 'data-id="S17-1"' index.html | grep -i 'bloqueo\|soberan\|ingl\|franc\|intervenci'
```

**Expected:** Empty output (no matches). Any match indicates a scope violation — bloqueos/sovereignty content must be removed and deferred to S22.

---

### 8. Scope boundary enforcement — no repeat of S14-3 general polarity

**Purpose:** Confirm S17-1 does not duplicate the general tiranía/caudillo polarity already established in S14-3.

```bash
grep -A 30 'data-id="S17-1"' index.html | grep -i 'tiran\|caudillo'
```

**Expected:** Empty output. The S17 nota is scoped to the internal-order/necessity counterfactual — not the tiranía vs. caudillo-popular framing of S14-3.

---

### 9. Browser rendering — card visible and correct position

**Purpose:** Confirm the card renders in the correct visual position (after S16 cards, before the Alberdi quote connector) and that entity-encoded characters display correctly.

**Steps:**
1. Open `index.html` in a browser (Chromium/Firefox)
2. Navigate to the `#periodo-rosas` section (use the sub-nav or scroll)
3. Scroll past the S16 cards (three cards: Mazorca, Florencio Varela, scale-of-repression)
4. Observe the next card before the Alberdi quote block

**Expected:**
- Card title displays: **¿Era Rosas un mal necesario? El argumento de la necesidad histórica** (all accented characters render correctly — no `&#xBF;` or `&#xE9;` visible as raw entities)
- Card badge shows: 💬 Opinión / debate interpretativo
- Card year label shows: `debate historiográfico`
- Two named historiographic positions visible in the nota block (Irazusta vs. Halperín Donghi / Lynch)
- Cite footer shows all three source attributions

---

### 10. Browser rendering — reveal-on-scroll animation

**Purpose:** Confirm the card uses `reveal-fade` animation (not `reveal-slide`) and fires correctly when scrolled into view.

**Steps:**
1. Open `index.html` in browser, scroll to top
2. Scroll down slowly through the #periodo-rosas section
3. Observe the S17-1 card as it enters the viewport

**Expected:**
- Card enters with a fade animation (opacity 0 → 1), not a slide (no lateral movement)
- `--reveal-delay: 0ms` means the card enters without stagger relative to prior S16 cards
- The `card-nota-historiografica` nota block is fully visible (not collapsed)

---

## Edge Cases

### Entity encoding round-trip

**Steps:**
1. In browser DevTools, inspect the `<article data-id="S17-1">` element
2. Read the `data-certeza` attribute value

**Expected:** `opinión` (with accent, decoded from `opini&#xF3;n`). The HTML entity must decode to the native character in the DOM.

---

### certeza attribute selector compatibility

**Steps:**
1. In browser DevTools console, run:
   ```js
   document.querySelectorAll('[data-certeza="opinión"]').length
   ```

**Expected:** Returns the count of all opinion-type cards including S17-1. If this returns 0 while S17-1 is visible, the entity encoding broke the attribute value — inspect the raw HTML.

---

### Backup file availability

**Purpose:** Confirm the pre-splice recovery backup exists for rollback if needed.

```bash
test -s C:/tmp/index.html.bak-s17 && echo BACKUP_OK
```

**Expected:** `BACKUP_OK`. If missing, the T02 backup step was skipped — the recovery path is limited to git restore.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns 79 → splice failed; restore from backup and re-run T02
- `grep -c 'data-certeza' index.html` returns 81+ → duplicate insert; restore from backup
- `grep -c 'cards will be appended here' index.html` returns 0 → marker corrupted; CRITICAL — restores from `C:/tmp/index.html.bak-s17`
- `grep -c 'card-nota-historiografica' index.html` returns 5 → nota block dropped during splice; inspect `C:/tmp/s17-cards.html` to verify the nota was in the snippet
- Raw HTML entities visible in browser (e.g., `&#xBF;` rendered as text) → entity encoding issue; compare `C:/tmp/s17-cards.html` against S17-CONTENT-DRAFT.md Recipe block

## Not Proven By This UAT

- Browser rendering on mobile viewports (375px, 414px) — the card uses established CSS classes; mobile layout is covered by R007 which was validated in earlier milestones
- Lighthouse performance impact — one card is below measurement noise threshold
- Screen reader / accessibility audit — certeza indicator uses `aria-hidden="true"` per the established pattern; full a11y audit is deferred to a future audit milestone

## Notes for Tester

- The S17-1 card appears **between the S16 cards and the Alberdi quote connector** that leads into sub-período 3 (La Época de Rosas 1835–1852). If you reach the Alberdi quote without seeing the S17-1 card, scroll back — the card may have already passed through the viewport and is now above.
- The nota historiográfica is intentionally verbose — two named positions with full publication citations. This is by design (certeza transparency requirement).
- `data-certeza="opini&#xF3;n"` in the raw HTML is correct — it decodes to `opinión` in the DOM. If you run `grep 'opini' index.html` and see the entity form, that is expected and correct.

# S10: Ideas de unitarios y federales — UAT

**Milestone:** M008
**Written:** 2026-03-22

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: The slice is a static HTML content append with no runtime logic, backend, or interactive behavior beyond the existing reveal-on-scroll system. All correctness signals are observable directly from the HTML file and git state without running a server.

## Preconditions

1. Working directory is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
2. `index.html` exists and is the current working file
3. `S10-CONTENT-DRAFT.md` exists at `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md`

## Smoke Test

```bash
grep -c 'data-certeza' index.html
# Expected: 65
```

If this returns 65, the three S10 cards are present. If it returns 62, T02 integration did not persist — stop and diagnose.

## Test Cases

### 1. Card count is exactly 65

```bash
grep -c 'data-certeza' index.html
```

**Expected:** `65` (62 pre-S10 baseline + 3 S10 cards)

---

### 2. Append marker is intact and has not moved to an unexpected location

```bash
grep -n 'S10–S24 cards will be appended' index.html
```

**Expected:** One line returned, with line number > 1542 (marker shifted down by 70 lines after S10 insertion). Currently at line 1612.

---

### 3. No CSS or JS side effects

```bash
git diff --name-only HEAD -- styles.css app.js
```

**Expected:** Empty output — no changes to `styles.css` or `app.js`

---

### 4. All three S10 identifier comments are present

```bash
grep -c 'S10-' index.html
```

**Expected:** `3` — one `<!-- S10-N: card title -->` comment per card

---

### 5. Content draft exists and has three card entries

```bash
test -s .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md && echo "OK"
grep -c "^## Card S10-" .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md
```

**Expected:** `OK` then `3`

---

### 6. S10-1 (unitario program) has correct certeza, class, and stagger

```bash
grep -A5 '<!-- S10-1:' index.html
```

**Expected:** The `<article>` immediately after the comment has:
- `class="event-card card-hecho reveal reveal-slide"`
- `data-certeza="hecho"`
- `style="--reveal-delay: 0ms"`

---

### 7. S10-2 (federal program) has correct certeza, class, and stagger

```bash
grep -A5 '<!-- S10-2:' index.html
```

**Expected:** The `<article>` immediately after the comment has:
- `class="event-card card-hecho reveal reveal-slide"`
- `data-certeza="hecho"`
- `style="--reveal-delay: 80ms"`

---

### 8. S10-3 (economic conflict) is a card-opinion with correct stagger

```bash
grep -A5 '<!-- S10-3:' index.html
```

**Expected:** The `<article>` immediately after the comment has:
- `class="event-card card-opinion reveal reveal-slide"`
- `data-certeza="opinion"`
- `style="--reveal-delay: 160ms"`

---

### 9. S10-3 blockquote carries Halperin Donghi attribution

```bash
grep -A3 'Halperin Donghi' index.html
```

**Expected:** A `<blockquote>` element with attribution text referencing "Halperin Donghi" and "*De la revolución de independencia a la confederación rosista*" (or abbreviated form), inside a `card-opinion` section.

---

### 10. Reveal system counts increased by 3

```bash
grep -c 'reveal reveal-slide' index.html
```

**Expected:** `71` (was 68 after S09, +3 for S10 cards)

---

### 11. Images reference verified Wikimedia URLs (not broken paths)

```bash
grep 'Retrato_de_Sarmiento' index.html | head -1
grep 'Juan_Bautista_Bustos' index.html | head -1
grep 'LaValle\|Lavalle' index.html | grep 'S10' -A10 | head -5
```

**Expected:**
- S10-1 image src contains `Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg` or similar Wikimedia thumburl
- S10-2 image src contains `Juan_Bautista_Bustos`
- S10-3 image src contains `General_Don_Juan_LaValle`

---

### 12. S10 cards are positioned BEFORE the append marker, not after

```bash
node -e "
const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
const markerLine = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
const s10Lines = lines.reduce((acc, l, i) => l.includes('S10-') ? [...acc, i] : acc, []);
console.log('marker at line:', markerLine + 1);
console.log('S10 card comment lines:', s10Lines.map(i => i + 1));
console.log('all S10 before marker:', s10Lines.every(i => i < markerLine));
"
```

**Expected:** `all S10 before marker: true` — all three S10 card comments appear at line numbers lower than the marker line.

---

## Edge Cases

### Missing Estanislao López image fallback

The S10-2 card uses Juan Bautista Bustos (not López) because López's portrait is absent from Wikimedia Commons.

1. `grep 'Bustos\|López' index.html | grep 'S10-2' -A10 | head -5`
2. **Expected:** The S10-2 card image references Bustos, not López. If López appears in S10-2's image src, the wrong image was used.

---

### Certeza accent normalization

Both `data-certeza="opinion"` (no accent) and `data-certeza="opinión"` (with accent) may exist in the codebase. S10-3 uses no-accent `opinion`.

1. `grep 'data-certeza="opinion"' index.html | wc -l`
2. `grep 'data-certeza="opinión"' index.html | wc -l`
3. **Expected:** S10-3 uses `opinion` (no accent). Total opinion cards = sum of both queries. Neither query returning S10-3 would indicate wrong certeza value.

---

### No image reuse from prior cards

S10 must not reuse images already present in the site.

1. `grep -c 'Rawson\|Bustos\|LaValle' index.html`
2. **Expected:** Each of the three filenames appears **exactly once** in `index.html` (S10's card only). A count > 1 for any filename means it was reused from an existing card.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns `62` → T02 integration did not persist; marker-based Node.js splice may have failed silently
- Append marker line not returned by `grep -n` → marker was accidentally deleted; immediate `git checkout index.html` required
- `git diff --name-only HEAD -- styles.css app.js` returns non-empty → unintended CSS or JS side effect; revert and re-run T02
- `grep -c 'S10-' index.html` returns `0` → card identifier comments absent; cards may be present but unidentifiable
- Any S10 card image src contains a file already used in index.html elsewhere → image reuse violation; swap in one of the verified alternates from the Image Verification Log

## Not Proven By This UAT

- **Visual rendering:** Whether the cards actually render correctly in a browser (layout, image display, typography). This requires browser navigation with screenshot verification.
- **Reveal animation behavior:** Whether the reveal-on-scroll fires for the three new cards when scrolling to `#periodo-rosas`. Artifact-driven UAT cannot prove browser IntersectionObserver behavior.
- **Mobile responsiveness:** Whether the cards display correctly at 375px. Not verified in this slice.
- **Historical accuracy peer review:** The content draft captures sources and certeza classification, but does not substitute for a domain-expert review of the historical claims.
- **Halperin Donghi quote fidelity:** The S10-3 blockquote is an attributed paraphrase, not a verified direct quote. A primary-source pass against the 1972 Paidós edition is deferred.

## Notes for Tester

- The three S10 cards sit immediately before the append marker comment in `#periodo-rosas`. When browsing the page, they appear after the S09 cards (which cover the *origin* of the conflict) and before whatever S11 adds. This ordering is deliberate: origin → ideas → referentes.
- The S10-3 card (economic conflict) uses `card-opinion` styling with a blockquote. The attribution reads "Halperin Donghi, De la revolución de independencia a la confederación rosista" — this is a paraphrase, not a direct quote. If reviewing historical accuracy, check the draft's `[NO USAR COMO CITA DIRECTA]` label rather than treating the HTML blockquote as a verbatim citation.
- Stagger delays reset to 0ms for S10 (per the established multi-slice pattern). Do not interpret the 0ms first card as a missing delay.

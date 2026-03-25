# S11: Referentes de cada bando — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: This slice is a static HTML content injection into a file-based single-page application. There is no server, no async state, and no user-interaction logic — correctness is fully observable by inspecting the output artifact (index.html) and the content draft. Grep-based assertions on the file are deterministic and exhaustive.

## Preconditions

- Working directory is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
- `index.html` is present and is the live file for the historia site
- `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` exists and is non-empty
- No local uncommitted changes to `styles.css` or `app.js`

## Smoke Test

```bash
grep -c 'data-certeza' index.html
# Must return 67 — confirms both S11 cards are present (up from 65 before this slice)
```

## Test Cases

### 1. Card count correct (67 data-certeza attributes total)

```bash
grep -c 'data-certeza' index.html
```

**Expected:** `67`

If it returns 65: T02 splice did not execute — cards absent.  
If it returns 69+: duplicate insertion — splice ran more than once or prior run not rolled back.

---

### 2. Both S11 HTML comment markers present

```bash
grep -c 'S11-' index.html
```

**Expected:** `2`

Confirms that `<!-- S11-1: Los líderes unitarios -->` and `<!-- S11-2: Los líderes federales -->` are both in the file. If 0: comments absent — the block was not inserted or was malformed.

---

### 3. Append marker preserved and intact

```bash
grep -n 'cards will be appended here by subsequent slices' index.html
```

**Expected:** A single line result at approximately line 1647.

If the line is absent: the Node.js splice replaced the marker instead of inserting before it. If there are 2 occurrences: the marker was duplicated — only the first occurrence will be used by S12's splice, but this is a latent bug.

---

### 4. No CSS or JS modifications

```bash
git diff --name-only HEAD -- styles.css app.js
```

**Expected:** empty output (no files listed)

Any output here means prohibited files were modified — violates the D001 mandate of zero new CSS/JS.

---

### 5. Content draft exists and is non-empty

```bash
test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo OK
```

**Expected:** `OK`

---

### 6. S11-1 card: correct class, certeza, and stagger

```bash
grep -A 5 'S11-1' index.html | head -6
```

**Expected output includes:**
- `class="event-card card-hecho reveal reveal-slide"`
- `data-certeza="hecho"`
- `style="--reveal-delay: 0ms"`

S11-1 must be the *first* card of the slice, so its stagger delay resets to 0ms (not continuing from S10's sequence).

---

### 7. S11-2 card: correct class, certeza, and stagger

```bash
grep -A 5 'S11-2' index.html | head -6
```

**Expected output includes:**
- `class="event-card card-hecho reveal reveal-slide"`
- `data-certeza="hecho"`
- `style="--reveal-delay: 80ms"`

S11-2 is the second card of the slice: 80ms stagger (0ms + 80ms increment).

---

### 8. S11-1 image URL is the verified Paz portrait

```bash
grep -A 15 'S11-1' index.html | grep 'img src'
```

**Expected:** URL contains `Jose_maria_paz_retrato_homenaje.jpg` and `/500px-`

The exact verified URL is:  
`https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Jose_maria_paz_retrato_homenaje.jpg/500px-Jose_maria_paz_retrato_homenaje.jpg`

---

### 9. S11-2 image URL is the verified Urquiza oil painting (not the reused variants)

```bash
grep -A 15 'S11-2' index.html | grep 'img src'
```

**Expected:** URL contains `Justo_Jos%C3%A9_de_Urquiza.jpg` and `/500px-`, and does NOT contain `retrato` or `983506`.

The exact verified URL is:  
`https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-Justo_Jos%C3%A9_de_Urquiza.jpg`

---

### 10. S11-1 card profiles the five unitario leaders by name

```bash
grep -A 30 'S11-1' index.html | grep -oE '(Rivadavia|Paz|Lavalle|Florencio Varela|Juan Cruz Varela)' | sort -u
```

**Expected:** All five names appear: `Florencio Varela`, `Juan Cruz Varela`, `Lavalle`, `Paz`, `Rivadavia`

---

### 11. S11-2 card profiles the five federal leaders by name

```bash
grep -A 35 'S11-2' index.html | grep -oE '(Rosas|Quiroga|López|Ramírez|Urquiza)' | sort -u
```

**Expected:** All five names appear: `López`, `Quiroga`, `Ramírez`, `Rosas`, `Urquiza`

---

### 12. S11-2 defers Caseros narrative correctly

```bash
grep -A 35 'S11-2' index.html | grep -i 'caseros'
```

**Expected:** One occurrence of "Caseros" — in the single closing sentence noting Urquiza later changed sides. The word should NOT appear in a narrative context describing the battle outcome or Rosas's fall.

---

### 13. Cards are positioned before the append marker (ordering check)

```bash
grep -n 'S11-1\|S11-2\|cards will be appended here' index.html
```

**Expected:** S11-1 line < S11-2 line < append marker line  
e.g., `~1612: S11-1`, `~1613+: S11-2`, `1647: append marker`

---

### 14. Content draft has exactly 2 card entries

```bash
grep -c "^## Card S11-" .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md
```

**Expected:** `2`

## Edge Cases

### Marker line shift from prior slices

If S12 research has already run and modified index.html before this UAT executes, the append marker may be at a line number higher than 1647. This is expected — the marker line shifts with each slice insertion. The marker's *presence* (any line) is what matters, not its exact number.

**Check:** `grep -c 'cards will be appended here by subsequent slices' index.html` → must return `1` (exactly one occurrence).

### Image rendering in browser (optional live check)

Open `index.html` in a browser and scroll to the `#periodo-rosas` section. Both S11 cards should:
1. Be hidden on initial load (reveal system not yet triggered)
2. Fade/slide in as they enter the viewport during scroll
3. Display the Paz portrait (S11-1) and the Urquiza oil painting (S11-2)
4. Show the green `✓ Hecho documentado` certeza badge

Wikimedia CDN images load correctly in the browser even if `curl -I` returns 429 (rate-limit on CLI) — see KNOWLEDGE.md.

### No sub-nav link duplication

S09 added the `#periodo-rosas` sub-nav link. S11 must NOT have added another one.

```bash
grep -c 'href="#periodo-rosas"' index.html
```

**Expected:** `1` (the single link added by S09)

## Failure Signals

- `grep -c 'data-certeza' index.html` returns 65: cards not inserted — T02 splice failed
- `grep -c 'data-certeza' index.html` returns 69+: duplicate insertion
- `grep -c 'S11-' index.html` returns 0: HTML comment markers absent — block may be malformed
- `grep -n 'cards will be appended here by subsequent slices' index.html` returns nothing: marker was consumed or replaced — S12 splice will target the wrong location
- `git diff --name-only HEAD -- styles.css app.js` shows files: prohibited CSS/JS modification
- Image URLs contain `retrato` or `983506` in S11-2: wrong Urquiza variant used

## Not Proven By This UAT

- Live browser rendering of reveal-on-scroll animations for the S11 cards (covered by system-level R009 validation in prior milestones — the reveal system is proven extensible and requires no per-card wiring)
- Mobile layout of the two new cards (the grid system is proven responsive from M003/M005; no new CSS was introduced)
- Historical accuracy of biographical facts beyond source citation presence (verified at T01 research stage against Halperin Donghi, Lynch, Sarmiento, Goldman, Zinny)
- Image availability over time (Wikimedia CDN URLs are stable but not permanent; confirmed valid at T01 execution time via API)

## Notes for Tester

- The quick end-to-end check is: `grep -c 'data-certeza' index.html` → 67 and `grep -c 'S11-' index.html` → 2. If both pass, the slice is almost certainly correct.
- If verifying image rendering manually in a browser: Wikimedia images may require a second or two to load from CDN on first visit. This is normal — the `loading="lazy"` attribute defers load until the card enters the viewport.
- The `Estanislao López` profile in S11-2 appears in text only (no dedicated portrait) — this is intentional and documented. His portrait is not available on Wikimedia Commons. The card image uses Urquiza as the visual representative of federal leadership.
- Do not test the `#periodo-rosas` sub-nav link — it was added by S09 and is out of scope for S11's UAT.

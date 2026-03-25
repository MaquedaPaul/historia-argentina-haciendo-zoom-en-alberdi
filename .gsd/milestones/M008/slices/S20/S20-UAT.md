# S20: Lo del 29 — el fusilamiento de Dorrego y la crisis de 1829 — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: The slice produces static HTML cards in a static site. All correctness criteria are fully verifiable via DOM inspection and grep-based structural checks without a live server. The only runtime concern (reveal-on-scroll) is shared infrastructure that has been validated in every prior M008 slice; no new JS was introduced.

## Preconditions

- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
- `index.html` is the post-T02 version (data-certeza count = 86)
- No live server required — all tests are against the HTML file directly or via browser file:// load
- `C:/tmp/index.html.bak-s20` exists as restore point

## Smoke Test

```bash
grep -c 'data-certeza' index.html
# → 86 confirms both S20 cards are present
```

If this returns 84, T02 splice did not apply. Restore with `cp C:/tmp/index.html.bak-s20 index.html` and re-run T02.

---

## Test Cases

### 1. Both S20 cards are present with correct IDs

```bash
grep -c 'data-id="S20-1"' index.html   # → 1
grep -c 'data-id="S20-2"' index.html   # → 1
```

**Expected:** Each returns exactly 1. Two returns means duplicate splice; zero means card is absent.

---

### 2. Card certeza values are correct

```bash
grep 'data-id="S20-1"' index.html
# Expected output contains: data-certeza="hecho"

grep 'data-id="S20-2"' index.html
# Expected output contains: data-certeza="opini&#xF3;n"
```

**Expected:**
- S20-1: `card-hecho` class + `data-certeza="hecho"` — factual card about the 1828 peace treaty
- S20-2: `card-opinion` class + `data-certeza="opini&#xF3;n"` — interpretation card about the fusilamiento as political rupture

---

### 3. Append marker is intact (not consumed or duplicated)

```bash
grep -c 'cards will be appended here' index.html
# → 1
```

**Expected:** Exactly 1. Zero means the splice consumed the marker (catastrophic — future slices S21–S24 cannot find their insertion point). Two means the splice duplicated it (also wrong).

---

### 4. Zero new CSS/JS files modified

```bash
git diff --name-only HEAD -- styles.css app.js
# → (empty output)
```

**Expected:** No output. Any file names printed here indicate a broken zero-CSS/JS constraint.

---

### 5. S20 card content is ASCII-clean (no raw UTF-8 in injected HTML)

```bash
node -e "
const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
const commentStart = lines.findIndex(l => l.includes('S20-1: La paz impopular'));
const markerLine = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
const region = lines.slice(commentStart, markerLine);
const bad = region.filter(l => /[^\x00-\x7F]/.test(l));
console.log(bad.length === 0 ? 'ASCII CLEAN' : 'NON-ASCII:' + bad.length);
"
# → ASCII CLEAN
```

**Expected:** `ASCII CLEAN`. Any non-ASCII means a raw UTF-8 character slipped through entity encoding — could cause HTML parsing issues.

---

### 6. S20-1 card contains required content elements

```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const s201start = html.indexOf('data-id=\"S20-1\"');
const s201end = html.indexOf('data-id=\"S20-2\"');
const s201 = html.slice(s201start, s201end);
const checks = [
  ['card-hecho class', s201.includes('card-hecho')],
  ['year 1828', s201.includes('>1828<')],
  ['Ponsonby mention', s201.includes('Ponsonby')],
  ['Uruguay independence', s201.includes('Uruguay') || s201.includes('Banda Oriental')],
  ['Lynch source', s201.includes('Lynch')],
  ['Salidas source', s201.includes('Sald')],
  ['Dorrego image', s201.includes('Dorrego-fusilamiento.jpg')],
  ['loading=lazy', s201.includes('loading=\"lazy\"')],
  ['card-source footer', s201.includes('card-source')],
];
checks.forEach(([name, result]) => console.log((result ? 'PASS' : 'FAIL') + ': ' + name));
"
```

**Expected:** All lines print `PASS`.
- `card-hecho class`: correct certeza category
- `year 1828`: correct temporal anchor displayed to user
- `Ponsonby mention`: key historical figure (British diplomat who brokered the peace)
- `Uruguay independence`: core outcome of the 1828 treaty (Banda Oriental → Uruguay)
- `Lynch source`, `Salidas source`: required historiographic citations
- `Dorrego image`: visual element (fusilamiento painting)
- `loading=lazy`: performance attribute preserved
- `card-source footer`: citation footer present

---

### 7. S20-2 card contains required content elements

```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const s202start = html.indexOf('data-id=\"S20-2\"');
const markerPos = html.indexOf('cards will be appended here by subsequent slices');
const s202 = html.slice(s202start, markerPos);
const checks = [
  ['card-opinion class', s202.includes('card-opinion')],
  ['year 1828-1829', s202.includes('1828') && s202.includes('1829')],
  ['Halperin Donghi', s202.includes('Halper')],
  ['Lynch cap 3', s202.includes('Lynch') && s202.includes('cap. 3')],
  ['Salidas 1892', s202.includes('Sald') && s202.includes('1892')],
  ['Lavalle portrait', s202.includes('Juan_Lavalle.jpg')],
  ['certeza icon speech bubble', s202.includes('&#x1F4AC;')],
  ['card-source footer', s202.includes('card-source')],
];
checks.forEach(([name, result]) => console.log((result ? 'PASS' : 'FAIL') + ': ' + name));
"
```

**Expected:** All lines print `PASS`.
- `card-opinion class`: correct card type for interpretation card
- `year 1828-1829`: correct date range for the crisis period
- `Halperin Donghi`: required attribution for "guerras civiles permanentes" thesis
- `Lynch cap 3`: required chapter citation
- `Salidas 1892`: required attribution for foundational-rupture framing
- `Lavalle portrait`: visual element (Lavalle portrait, the actor in the fusilamiento)
- `certeza icon speech bubble`: correct icon (💬) for opinión cards per M008 taxonomy
- `card-source footer`: citation footer present

---

### 8. S20 cards appear immediately before the append marker (position check)

```bash
node -e "
const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
const markerLine = lines.findIndex(l => l.includes('cards will be appended here by subsequent slices'));
const s202Line = lines.findIndex(l => l.includes('data-id=\"S20-2\"'));
const gap = markerLine - s202Line;
console.log('Marker at line:', markerLine + 1);
console.log('S20-2 article at line:', s202Line + 1);
console.log('Gap (lines between S20-2 and marker):', gap);
console.log(gap > 0 && gap < 25 ? 'POSITION OK' : 'POSITION WRONG');
"
```

**Expected:** `POSITION OK`. The S20-2 `<article>` element should be 10–20 lines before the append marker (the card's closing `</article>` and comment precede the marker).

---

### 9. Stagger delays are correctly set

```bash
grep 'data-id="S20-' index.html | grep 'reveal-delay'
```

**Expected output (two lines):**
```
... data-id="S20-1" style="--reveal-delay: 0ms" ...
... data-id="S20-2" style="--reveal-delay: 80ms" ...
```

The 0ms / 80ms stagger follows the pattern established across M008 slices (each slice resets stagger to 0ms for its first card).

---

### 10. Scope guard: S20 does NOT duplicate S13-1 narrative

```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const s20start = html.indexOf('S20-1: La paz impopular');
const markerPos = html.indexOf('cards will be appended here by subsequent slices');
const s20region = html.slice(s20start, markerPos);
// These phrases belong to S13-1 and must NOT appear in S20 cards
const s13phrases = ['Pu ente de M', 'Ca&#xF1;uelas', 'Barracas', '8 de diciembre', 'electo gobernador'];
const found = s13phrases.filter(p => s20region.includes(p));
console.log(found.length === 0 ? 'SCOPE GUARD OK (no S13 narrative duplication)' : 'SCOPE VIOLATION: ' + found.join(', '));
"
```

**Expected:** `SCOPE GUARD OK (no S13 narrative duplication)`. Any violations mean the cards are repeating content already in S13-1 (golpe narrative, Rosas's election).

---

## Edge Cases

### EC-1: Image URLs respond (Wikimedia availability)

Open in browser and visually confirm both card images load:
- S20-1: `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Dorrego-fusilamiento.jpg/500px-Dorrego-fusilamiento.jpg`
- S20-2: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Juan_Lavalle.jpg/500px-Juan_Lavalle.jpg`

**Expected:** Both images render. If either fails, the `initImageFallbacks()` function in `app.js` will auto-apply the fallback placeholder — verify no broken image icons appear.

### EC-2: Reveal-on-scroll fires for S20 cards

Load `index.html` in a browser from the top (do not pre-scroll). Scroll down to the `#periodo-rosas` section.

**Expected:** S20-1 card slides in first (0ms delay), then S20-2 slides in 80ms later (visible stagger). Both use the `reveal-slide` animation class and should animate in from the right. If already in viewport on load, they receive `reveal--no-anim` and appear instantly (correct per KNOWLEDGE entry on reveal gating).

### EC-3: Certeza visual indicators render correctly

In the browser, inspect the certeza indicator areas of both cards:

- S20-1: Should show a ✓ checkmark icon and label "Hecho documentado"
- S20-2: Should show a 💬 speech bubble icon and label "Interpretación historiográfica"

**Expected:** Each indicator is visible and uses the correct icon per the M008 certeza taxonomy.

### EC-4: No duplicate images on page

```bash
grep -c 'Dorrego-fusilamiento.jpg' index.html  # → 1
grep -c 'Juan_Lavalle.jpg' index.html           # → 1
```

**Expected:** Each returns 1. Both images were confirmed not previously used in the page (pre-S20 state). Any value > 1 indicates accidental duplication.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns 84 → T02 splice did not apply; restore from `C:/tmp/index.html.bak-s20`
- `grep -c 'cards will be appended here' index.html` returns 0 → marker was consumed by splice (catastrophic); restore from backup immediately
- `grep -c 'cards will be appended here' index.html` returns 2 → marker was duplicated; restore from backup
- Certeza count > 86 → extra cards were injected (check for duplicate splice)
- Node ASCII check returns `NON-ASCII` in S20 region → entity encoding failed; raw UTF-8 may break HTML parsing
- `git diff --name-only HEAD -- styles.css app.js` returns non-empty → CSS/JS modified in violation of M008 constraint

## Not Proven By This UAT

- **Full browser rendering at all viewport sizes** (320px–1920px): UAT verifies structure, not visual fidelity at every breakpoint. The existing responsive system handles card layout; no new CSS was added, so layout regression risk is minimal.
- **Wikimedia image persistence**: Images are served from Wikimedia CDN. If Wikimedia throttles or removes the files, the fallback system handles it gracefully — but this UAT does not test image CDN reliability over time.
- **Historical accuracy peer review**: The UAT confirms sources are cited and certeza is correctly applied, but does not replicate expert historiographic review of the content claims. The content draft in `S20-CONTENT-DRAFT.md` is the artifact for that review.
- **Screen reader experience**: The accessibility of the certeza indicator pattern and card structure has been validated in prior slices; this UAT does not re-run an a11y audit.

## Notes for Tester

- The S20 cards appear in the `#periodo-rosas` section, which spans from around Rivadavia/1820 through Caseros/1852. The S20 cards are part of the sub-period covering the 1829 crisis, and will appear after the S19 cards (the Rosas tiranía debate) and before whatever S21 adds.
- The Dorrego fusilamiento painting (S20-1) may look visually confrontational — this is appropriate for a hecho card documenting an execution. It is a historical artwork, not a photograph.
- S20-2's prose contains inline attributions (Saldías, Halperín Donghi, Lynch) without a blockquote element — this is intentional. The card uses the interpretation-summary pattern rather than a direct-quote pattern, because these are paraphrased scholarly interpretations, not verbatim quotes. This is correct per the M008 card taxonomy.

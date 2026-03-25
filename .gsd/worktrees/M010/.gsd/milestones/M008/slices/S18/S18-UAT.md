# S18: Los unitarios conspiraban — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: This is a static HTML site. The slice adds two `card-hecho` elements to the `#periodo-rosas` events-grid. All correctness signals are in the file itself — element counts, content integrity, entity encoding, and scope compliance. No server, database, or runtime service is involved.

## Preconditions

- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
- `index.html` has been edited by T02 (data-certeza count = 82, marker intact at 1 occurrence)
- `S18-CONTENT-DRAFT.md` exists and is non-empty

## Smoke Test

```bash
grep -c 'data-certeza' index.html   # → 82 (confirms both S18 cards are present)
```

If this returns 82, the splice landed correctly and the slice basically works.

---

## Test Cases

### 1. S18-1 card is present with correct structure

```bash
grep -c 'data-id="S18-1"' index.html
```

1. Run the command above.
2. **Expected:** `1` — exactly one card with `data-id="S18-1"`.

```bash
grep -A2 'data-id="S18-1"' index.html | head -5
```

3. Verify the output shows:
   - `class="event-card card-hecho reveal reveal-slide"`
   - `data-certeza="hecho"`
   - `style="--reveal-delay: 0ms"`
4. **Expected:** All three attributes present on the article element.

---

### 2. S18-1 card-nota-historiografica is present and scoped correctly

```bash
grep -c 'card-nota-historiografica' index.html
```

1. Run the command above.
2. **Expected:** `7` (was 6 before S18).

```bash
grep -n 'card-nota-historiografica' index.html
```

3. Note the line number. Read the surrounding context:
   ```bash
   sed -n '<LINE-5>,<LINE+5>p' index.html
   ```
4. **Expected:** The nota contains "Myers" and "Lynch" citations. It does NOT contain the word "tiran" (tiranía debate is S19's scope).

```bash
grep -c 'tiran' index.html   # baseline count for context
```

5. Check that the S18 block (lines ~1866–1900) contains zero occurrences of `tiran`:
   ```bash
   sed -n '1866,1900p' index.html | grep -c 'tiran'
   ```
6. **Expected:** `0` — scope boundary intact.

---

### 3. S18-2 card is present with correct structure and image

```bash
grep -c 'data-id="S18-2"' index.html
```

1. Run the command above.
2. **Expected:** `1`.

```bash
sed -n '1882,1910p' index.html | grep 'card-image\|img src\|loading'
```

3. **Expected:** Lines showing:
   - `<div class="card-image">`
   - `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Mapa_ARGENTINA_1840_coalicion_del_norte.svg/500px-Mapa_ARGENTINA_1840_coalicion_del_norte.svg.png"`
   - `loading="lazy"`

```bash
sed -n '1882,1884p' index.html | grep 'reveal-delay: 80ms'
```

4. **Expected:** `--reveal-delay: 80ms` confirms correct stagger delay for S18-2.

---

### 4. Append marker integrity

```bash
grep -c 'cards will be appended here' index.html
```

1. Run the command above.
2. **Expected:** `1` — exactly one marker remains, positioned after S18-2 and before `</div><!-- /.events-grid -->`.

```bash
grep -n 'cards will be appended here\|S18-2\|events-grid S09' index.html
```

3. **Expected:** The output shows S18-2 line number < marker line number < closing div line number (marker is between S18-2 and the grid's closing tag).

---

### 5. No CSS or JS changes introduced

```bash
git diff --name-only HEAD -- styles.css app.js
```

1. Run the command above.
2. **Expected:** Empty output — no changes to styles.css or app.js.

---

### 6. Entity encoding — no non-ASCII bytes in S18 cards

```bash
node -e "const fs=require('fs'); const c=fs.readFileSync('index.html','utf8'); const s=c.indexOf('<!-- S18-1:'); const e=c.indexOf('cards will be appended here'); const block=c.slice(s,e); const bad=block.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(bad.length===0?'CLEAN':'FAIL: '+bad.length+' lines with non-ASCII');"
```

1. Run the command above from the working directory.
2. **Expected:** `CLEAN` — zero non-ASCII bytes in the S18 card HTML block.

---

### 7. Historical content accuracy spot-check

```bash
sed -n '1866,1900p' index.html
```

1. Read the rendered S18-1 card content.
2. **Expected (S18-1):**
   - Asociación de Mayo year: 1837–1838
   - Alberdi work cited: *La acción de la Europa en América*, Valparaíso, 1842
   - Comisión Argentina year: 1851
   - Year label renders as: `1838 – 1851` (en dash entity `&#x2013;`)
3. **Expected (S18-2):**
   - Lavalle invasion month/year: July 1840
   - Marco Avellaneda execution: 3 November 1841, Tucumán
   - Lavalle death: 9 October 1841, Jujuy (through window, not battle)
   - Year label: `1840 – 1841`

---

## Edge Cases

### Marker position: S18 cards appear BEFORE the marker, not after

```bash
grep -n 'S18-1\|S18-2\|cards will be appended here' index.html
```

1. **Expected:** S18-1 line < S18-2 line < marker line. If S18 cards appear AFTER the marker, the splice was applied incorrectly (post-marker means outside the events-grid — a rendering failure). This should never happen given the Node.js splice logic, but is worth confirming.

---

### Reveal-on-scroll classes present

```bash
grep 'data-id="S18-1"\|data-id="S18-2"' index.html
```

1. **Expected:** Both article elements include `reveal reveal-slide` in their class list. Without `reveal`, the IntersectionObserver will not add `reveal--visible` on scroll and cards will not animate into view.

---

### Sources footer present on both cards

```bash
sed -n '1866,1910p' index.html | grep -c 'card-source'
```

1. **Expected:** `2` — one `card-source` footer per card.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns 80 (not 82) → splice failed; restore from `C:/tmp/index.html.bak-s18`
- `grep -c 'cards will be appended here' index.html` returns 0 → marker was deleted during splice; restore from backup
- `grep -c 'cards will be appended here' index.html` returns 2+ → marker was duplicated; restore from backup
- Node.js entity check returns `FAIL: N lines` → non-ASCII bytes in S18 block; diagnose with `node -e "..." ` to find the offending lines, then fix the card HTML
- `git diff --name-only HEAD -- styles.css app.js` returns non-empty → unintended CSS/JS modification; restore styles.css/app.js from HEAD
- S18-1 card contains the word "tiran" → scope boundary violation (tiranía debate leaked from S19 scope); revise the nota

## Not Proven By This UAT

- **Visual render in browser:** This UAT is artifact-driven. It does not confirm that the cards visually render correctly at specific viewport sizes, that the map image loads from Wikimedia Commons, or that the reveal-on-scroll animation fires correctly when scrolling to the #periodo-rosas section. These require a live browser check.
- **Mobile layout:** Card layout at 375px (1-column grid) is not verified by grep-based checks. The CSS grid auto-fill mechanism is unchanged from prior slices, so this is low risk, but not formally proved here.
- **Cross-browser entity decoding:** Entity encoding correctness is verified at the byte level (no non-ASCII in source). Browser decoding of `&#xE1;`, `&#xF3;`, etc. is assumed correct per HTML spec — not tested in this UAT.
- **Wikimedia image availability:** The map URL is confirmed to exist (T01 used the Wikimedia Commons confirmed URL), but CDN availability at test time is not checked.

## Notes for Tester

- S18-1 has **no image** by design — this is consistent with S17-1 and is intentional. Do not flag the absence of an image as a bug.
- The `card-nota-historiografica` on S18-1 deliberately ends with "La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19." This forward reference is intentional — it is not an error or placeholder text.
- The most important scope boundary to validate: S18-1's nota should discuss the **pretext argument** (conspiracies real → used as cover for broader repression), NOT make a judgment about whether Rosas was a tyrant. Tiranía adjudication belongs to S19.
- Line numbers cited in test cases (1866 for S18-1, 1882 for S18-2) are approximate and will shift as subsequent slices add content before the append marker.

# S13: El primer gobierno de Rosas — cómo llegó al poder — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S13 delivers only static HTML content — two `card-hecho` articles inserted into `index.html`. No runtime code, no JS logic, no CSS was added. All correctness signals are readable from file content and browser DOM; no server state or user auth is involved.

## Preconditions

1. Working directory is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`.
2. `index.html` has been modified by T02 (data-certeza count = 71).
3. S13-CONTENT-DRAFT.md exists and is non-empty.
4. A static HTTP server can serve `index.html` locally (e.g. `npx serve .` or `python -m http.server`).

## Smoke Test

```bash
grep -c 'data-certeza' index.html
# Expected: 71
```

If this returns 71, the splice succeeded and both cards are present. Proceed with full test cases below.

---

## Test Cases

### 1. Both S13 cards are present in index.html

```bash
grep -c 'S13-' index.html
```

**Expected:** `4` (2 HTML comments `<!-- S13-1: ... -->` + 2 data-id attributes `data-id="S13-1"` and `data-id="S13-2"`)

**Why 4 and not 2:** Each S13 card uses both an HTML comment and a `data-id` attribute — this is the pattern T02 established. 4 grep matches = 2 cards confirmed.

---

### 2. Append marker is intact

```bash
grep -c 'cards will be appended here' index.html
```

**Expected:** `1`

If this returns 0, the marker was accidentally deleted during splice — subsequent slices (S14–S24) will have no anchor point. If >1, content was inserted at the wrong position.

---

### 3. No CSS or JS drift

```bash
git diff --name-only HEAD -- styles.css app.js
```

**Expected:** empty output (no files listed)

Any output here means S13 accidentally modified presentation or behavior code — a blocker.

---

### 4. S13-1 card narrates the 1828–1829 crisis correctly

```bash
grep -A 5 'S13-1' index.html | head -20
```

Manually inspect the output. **Expected content in S13-1:**
- Lavalle coup (1 December 1828) referenced
- Dorrego execution (13 December 1828) at Navarro, without trial
- Federal civil war / Rosas leading milicias
- Puente de Márquez (April 1829) referenced
- Convenio de Cañuelas (24 June 1829) and Convenio de Barracas (24 August 1829) referenced
- Legislatura elects Rosas governor (8 December 1829)
- `data-certeza="hecho"` on the article element
- `--reveal-delay: 0ms` stagger
- Image `src` containing `Juan_Manuel_de_Rosas_1829.jpg`
- At least one `<cite>` with Lynch, Saldías, or Halperín Donghi

---

### 5. S13-2 card narrates the first mandate with Campaña del Desierto nuance

```bash
grep -i 'Balcarce\|Campaña del Desierto' index.html
```

**Expected:** At least one match in the S13-2 card body, explicitly stating that the Campaña del Desierto (1833) was commanded by Rosas as a military officer under Governor Balcarce, not as governor.

This nuance is the most important factual distinction in the slice — it corrects the common misconception that Rosas conducted the desert campaign during his governorship.

Also verify:
- `data-certeza="hecho"` on the S13-2 article
- `--reveal-delay: 80ms` stagger (reset, not cumulative from S12)
- Image `src` containing `Juan_Manuel_de_Rosas_by_Descalzi_oval.png`
- Rosas's December 1832 retirement mentioned, with Suma del Poder Público as the reason

---

### 6. S13 cards are positioned before the append marker (not after)

```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const s13pos = html.indexOf('data-id=\"S13-1\"');
const markerpos = html.indexOf('cards will be appended here by subsequent slices');
console.log('S13-1 pos:', s13pos);
console.log('marker pos:', markerpos);
console.log('order correct:', s13pos < markerpos);
"
```

**Expected:** `order correct: true`

If false, the cards were inserted after the marker — subsequent slices will prepend before S13 instead of after S13, breaking chronological order.

---

### 7. Browser render: both cards visible at #periodo-rosas

1. Start a local HTTP server: `npx serve . -p 8097` (or any port)
2. Navigate to `http://localhost:8097/#periodo-rosas`
3. Scroll down to the S13 cards section
4. **Expected:**
   - Both cards render with card-hecho styling (green/teal certeza badge)
   - Card images load (Rosas 1829 portrait on S13-1, Descalzi oval portrait on S13-2)
   - Card text is legible with heading, body paragraphs, and source footer
   - Reveal-on-scroll animation triggers as cards enter viewport (cards fade/slide in)

5. Open browser DevTools console and run:
   ```js
   document.querySelectorAll('[data-id^="S13-"]').length
   ```
   **Expected:** `2`

---

### 8. S13 images are not duplicated from existing cards

```bash
grep 'Juan_Manuel_de_Rosas_1829.jpg\|Juan_Manuel_de_Rosas_by_Descalzi_oval.png' index.html | wc -l
```

**Expected:** `2` (one occurrence per image, in S13-1 and S13-2 respectively)

If >2, the same image files were reused in prior cards — acceptable but worth noting. If 0, images were dropped during splice.

---

## Edge Cases

### Splice at wrong line (double-splice scenario)

```bash
grep -c 'data-certeza' index.html
```

**Expected:** exactly 71. If this returns 73 or higher, the cards may have been spliced twice — check with:

```bash
grep -c 'S13-1' index.html
```

If >2, double-splice occurred. Restore from backup:

```bash
cp C:/tmp/index.html.bak-s13 index.html
```

Then re-run the T02 splice script once.

---

### Marker deleted (future slices cannot append)

```bash
grep -c 'cards will be appended here' index.html
```

If this returns 0, the marker was lost. The marker text is:
```
<!-- S10–S24 cards will be appended here by subsequent slices -->
```

It must be restored immediately before any subsequent slice (S14+) runs its T02 step. Locate the closing `</div><!-- /.events-grid -->` of `#periodo-rosas` and insert the marker immediately before it.

---

### S13-2 missing Balcarce nuance

If `grep -i 'Balcarce' index.html` returns no matches within the S13-2 card, the most critical nuance was dropped during splice. The nuance must be present:

> "La Campaña del Desierto (1833) fue comandada por Rosas como jefe militar, no como gobernador — el gobernador era Juan Ramón Balcarce."

This is historically significant: conflating the campaign with Rosas's governorship misrepresents the period. Fix by re-splicing from `C:/tmp/s13-cards.html` after verifying the nuance is in that file.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns anything other than **71** → splice failed, double-spliced, or a prior splice was undone
- `grep -c 'S13-' index.html` returns **0** → cards not present; inspect `C:/tmp/s13-cards.html` to confirm the temp file was written
- `grep -c 'cards will be appended here' index.html` returns **0** → marker deleted; S14–S24 cannot append without it
- `git diff --name-only HEAD -- styles.css app.js` returns any filenames → unintended side-effect; revert those files
- Browser shows cards without certeza badge or with broken images → HTML structure error in spliced content; compare against `C:/tmp/s13-cards.html`
- `querySelectorAll('[data-id^="S13-"]').length` returns **0** in browser → JS reveal system not finding cards; check if data-id attributes were stripped during splice

## Not Proven By This UAT

- That the historical prose is accurate beyond the specific facts that can be verified by grep (Balcarce, Campaña del Desierto). Full historical accuracy requires expert review.
- That the Wikimedia image URLs resolve and load for all users (they serve fine from Wikimedia CDN but require internet access).
- That reveal-on-scroll animations work on mobile viewports — only desktop was verified.
- That the cards are semantically integrated with the broader narrative arc (cross-slice coherence is validated at milestone level, not slice level).

## Notes for Tester

- The `grep -c 'S13-' index.html` count being **4** (not 2) is expected and correct — each card has both an HTML comment and a `data-id` attribute. Do not treat 4 as a failure.
- If images appear broken in browser, this is likely a network issue with Wikimedia Commons (curl also fails with 429 rate-limiting). Load the page in a real browser — images render fine from there.
- The S13-2 Campaña del Desierto nuance is the highest-value historical correction in this slice. If any single thing needs manual gut-check, it's that the prose clearly distinguishes "Rosas as military officer (1833)" from "Rosas as governor (1829–1832)".
- Recovery backup is at `C:/tmp/index.html.bak-s13` if any post-splice corruption is discovered.

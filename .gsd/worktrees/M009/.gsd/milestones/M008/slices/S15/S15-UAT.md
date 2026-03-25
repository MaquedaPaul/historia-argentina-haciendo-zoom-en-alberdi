# S15: El asesinato de Facundo Quiroga — ¿fue Rosas? — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: The slice produces static HTML injected into a static page. All correctness criteria — card count, certeza values, content accuracy, encoding safety, no CSS/JS changes — are fully verifiable by inspecting the file and running grep checks. No server or runtime behavior is involved.

## Preconditions

- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
- `index.html` must be the post-T02 splice version (data-certeza = 76)
- `S15-CONTENT-DRAFT.md` must exist at `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md`

## Smoke Test

```bash
grep -c 'data-certeza' index.html
```
**Expected:** `76`

If this returns 74, T02 did not run or the splice failed — restore from `/tmp/index.html.bak-s15`.

---

## Test Cases

### 1. Card count: exactly 2 S15 cards present

```bash
grep -c 'data-id="S15-' index.html
```
**Expected:** `2`

Notes: Use `data-id="S15-` (quoted attribute prefix) to get an unambiguous 1-per-card count. `grep -c 'S15-'` returns 4 due to HTML comment matches — that is also acceptable (2 cards × 2 matches each).

---

### 2. Append marker not consumed

```bash
grep -c 'cards will be appended here' index.html
```
**Expected:** `1`

The marker must remain intact so S16–S24 can continue appending to the same container.

---

### 3. No CSS or JS changes

```bash
git diff --name-only HEAD -- styles.css app.js
```
**Expected:** (empty output — no changes)

---

### 4. S15-1: correct certeza, class, and card structure

```bash
grep -A 5 'data-id="S15-1"' index.html
```
**Expected output must contain:**
- `class="event-card card-hecho reveal reveal-slide"`
- `data-certeza="hecho"`
- `--reveal-delay: 0ms`
- `card-certeza-icon` with `&#x2713;` (checkmark)
- `card-certeza-label` reading "Hecho documentado"

---

### 5. S15-2: correct certeza, class, and card structure

```bash
grep -A 5 'data-id="S15-2"' index.html
```
**Expected output must contain:**
- `class="event-card card-opinion reveal reveal-slide"`
- `data-certeza="debatido"`
- `--reveal-delay: 80ms`
- `card-certeza-icon` with `&#x2696;` (scales)
- `card-certeza-label` reading "Debatido historiográficamente"

---

### 6. S15-1 has an image; S15-2 does not

```bash
# S15-1 should have a card-image div
awk '/data-id="S15-1"/,/data-id="S15-2"/' index.html | grep 'card-image'
```
**Expected:** one `<div class="card-image">` match

```bash
# S15-2 should have NO card-image div
awk '/data-id="S15-2"/,/cards will be appended here/' index.html | grep 'card-image'
```
**Expected:** (empty — no match)

---

### 7. card-nota-historiografica present in S15-2 with all three positions

```bash
awk '/data-id="S15-2"/,/cards will be appended here/' index.html | grep 'card-nota-historiografica'
```
**Expected:** one match

Then inspect the content of that paragraph for:
- Reference to Sarmiento, Mitre, or Vicente Fidel López (liberal position)
- Reference to José María Rosa or "revisionista" (revisionist position)
- Reference to Lynch or "contemporánea" (contemporary synthesis)

---

### 8. Correct spelling: "Barranca Yaco" in S15 cards

```bash
awk '/data-id="S15-1"/,/cards will be appended here/' index.html | grep -c 'Barranca Yaco'
```
**Expected:** ≥2 (card title + excerpt)

```bash
awk '/data-id="S15-1"/,/cards will be appended here/' index.html | grep -c 'Barranco Yaco'
```
**Expected:** `0` (no misspelling in S15 cards)

Note: A pre-existing "Barranco Yaco" exists at line 1640 (S11 card) — this is out of S15 scope and will appear in a full-file grep. The scoped check above confirms S15 cards are correct.

---

### 9. S15 cards appear before the append marker (correct insertion order)

```bash
grep -n 'data-id="S15-1"\|data-id="S15-2"\|cards will be appended here' index.html
```
**Expected order:** S15-1 line < S15-2 line < marker line

Example: `1769: S15-1`, `1786: S15-2`, `1801: marker` ✅

---

### 10. Factual accuracy spot-check: key dates and names

Inspect the S15-1 excerpt (lines ~1769–1784):

- Date of ambush: **16 de febrero de 1835** ✅
- Location: **Barranca Yaco** (Córdoba) ✅
- Material executor: **Santos Pérez** ✅
- Organizers: **hermanos Reinafé** (José Vicente + brothers) ✅
- Execution of Reinafé: **25 de octubre de 1837** ✅
- Victim's full title and mission context mentioned ✅

Inspect S15-2 excerpt:
- Three hypotheses present (Reinafé solo, Rosas, Heredia) ✅
- Sarmiento's *Facundo* (1845) cited for liberal accusation ✅

---

### 11. Sources cited in both cards

```bash
awk '/data-id="S15-1"/,/data-id="S15-2"/' index.html | grep '<cite>'
```
**Expected:** one `<cite>` with Lynch (1981) and Saldías (1892)

```bash
awk '/data-id="S15-2"/,/cards will be appended here/' index.html | grep '<cite>'
```
**Expected:** one `<cite>` with Sarmiento (1845), Rosa (1964), Lynch (1981), Goldman/Salvatore (1998)

---

### 12. Content draft artifact exists and has required structure

```bash
test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK
grep -c "^## Card S15-" .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md
```
**Expected:** `OK` / `2`

---

## Edge Cases

### Pre-existing misspelling does not contaminate S15 cards

A "Barranco Yaco" misspelling exists in the S11 card at line 1640 (pre-S15). This is visible in full-file grep but must not appear in the S15 cards themselves. Test case 8 above uses scoped awk ranges to verify S15 cards are clean.

### data-certeza="debatido" first use in #periodo-rosas

S15-2 introduces the `debatido` certeza value for the first time in this container. Verify the certeza indicator renders correctly by inspecting the HTML:
```bash
grep -A 3 'data-certeza="debatido"' index.html | grep 'card-certeza-icon'
```
**Expected:** `&#x2696;` (scales of justice icon)

### Entity encoding safety (Windows)

```bash
node -e "const f=require('fs').readFileSync('index.html','utf8'); const m=f.match(/data-id=\"S15-[12]\"/g); console.log(m ? m.length + ' S15 data-id attrs found' : 'NONE');"
```
**Expected:** `2 S15 data-id attrs found`

If Node.js reports encoding errors or returns NONE, the file may have been written with incorrect encoding.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns 74 → splice did not run; restore from `/tmp/index.html.bak-s15`
- `grep -c 'cards will be appended here' index.html` returns 0 → marker was consumed; restore from backup immediately
- `grep -c 'data-id="S15-' index.html` returns 0 → cards not present; splice input `/tmp/s15-cards.html` may have been empty
- `git diff --name-only HEAD -- styles.css app.js` returns non-empty → forbidden CSS/JS changes introduced
- S15-2 has no `card-nota-historiografica` → the critical historiographic note was not spliced correctly

---

## Not Proven By This UAT

- Visual rendering of the certeza indicator badges and the ⚖ icon in a browser — requires visual inspection at `http://localhost:PORT`
- Reveal-on-scroll animation for S15 cards — requires live browser scroll test
- Image load success for the Descalzi painting URL (Wikimedia Commons) — the URL is structurally correct but depends on external availability
- Mobile layout of the two new cards — requires DevTools responsive view at ≤375px
- Whether the `debatido` certeza badge is visually distinguishable from `opinion` and `hecho` badges — CSS classes already handle this but browser rendering is unverified

## Notes for Tester

- Both S15 cards are in the `#periodo-rosas` section, after the S14 cards and before the `<!-- S10–S24 cards will be appended here -->` marker.
- S15-1 shows the ✓ (checkmark) certeza indicator and has a painting image. S15-2 shows the ⚖ (scales) indicator and has no image — this is intentional.
- The card-nota-historiografica in S15-2 is the main content requiring human historical review: does it fairly represent both the liberal accusation of Rosas and the revisionist defense? Does the Lynch synthesis feel neutral? This is a gut-check that automated tests cannot perform.
- The one pre-existing "Barranco Yaco" misspelling (S11, line 1640) is a known issue, not introduced by this slice. It can be noted for a later cleanup but should not block S15 sign-off.

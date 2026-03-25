# S23: Encarnación Ezcurra — influencia sobre mujeres y apoyo a Rosas — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: The slice produces static HTML spliced into `index.html`. All acceptance criteria can be verified by inspecting the file directly — card count, certeza values, nota presence, scope boundary, and the absence of new CSS/JS. No server or runtime is required.

## Preconditions

- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
- `index.html` has been modified by the S23 T02 splice
- `C:/tmp/index.html.bak-s23` exists (pre-splice backup)
- No pending git uncommitted changes to `styles.css` or `app.js`

## Smoke Test

```bash
grep -c 'data-certeza' index.html
```
**Expected:** `91` — confirms both S23 cards were spliced and no cards were lost.

---

## Test Cases

### 1. data-certeza card count advanced to 91

```bash
grep -c 'data-certeza' index.html
```
**Expected:** `91` (was 89 before this slice; S23-1 and S23-2 each add one `data-certeza` attribute)

---

### 2. Both S23 cards are present by data-id

```bash
grep -c 'data-id="S23-' index.html
```
**Expected:** `2` (one match per card: `data-id="S23-1"` and `data-id="S23-2"`)

---

### 3. Append marker for S24 is intact

```bash
grep -c 'cards will be appended here' index.html
```
**Expected:** `1` — marker was not consumed by the splice; S24 can use it as its insertion target

---

### 4. card-nota-historiografica count advanced to 11

```bash
grep -c 'card-nota-historiografica' index.html
```
**Expected:** `11` (was 10 before this slice; S23-2 adds one embedded nota)

---

### 5. No new CSS or JS introduced

```bash
git diff --name-only HEAD -- styles.css app.js
```
**Expected:** empty output — zero new CSS or JS files touched (D001 hard constraint)

---

### 6. Backup file exists

```bash
test -s C:/tmp/index.html.bak-s23 && echo BACKUP_OK
```
**Expected:** `BACKUP_OK` — pre-splice restore point is available

---

### 7. S23-1 is a card-hecho with certeza "hecho"

```bash
grep 'data-id="S23-1"' index.html
```
**Expected:** output contains `data-certeza="hecho"` and `card-hecho` in the same card block

Verify manually by inspecting the card block:
```bash
node -e "
const f = require('fs').readFileSync('index.html','utf8');
const i = f.indexOf('data-id=\"S23-1\"');
console.log(f.slice(Math.max(0,i-200), i+200));
"
```
**Expected:** card element has `class="card card-hecho"`, `data-certeza="hecho"`, and `data-id="S23-1"`

---

### 8. S23-2 is a card-opinion with certeza "opinión"

```bash
node -e "
const f = require('fs').readFileSync('index.html','utf8');
const i = f.indexOf('data-id=\"S23-2\"');
console.log(f.slice(Math.max(0,i-200), i+200));
"
```
**Expected:** card element has `class="card card-opinion"`, `data-certeza="opini&#xF3;n"` (entity-encoded), and `data-id="S23-2"`

---

### 9. S23-1 contains the Sociedad Popular Restauradora and Revolución de los Restauradores

```bash
grep -c 'Sociedad Popular Restauradora' index.html
```
**Expected:** ≥1 (the institution is named in S23-1)

```bash
grep -c 'Restauradores' index.html
```
**Expected:** ≥1 (the October 1833 event is referenced)

---

### 10. S23-2 contains the two-position nota historiográfica

```bash
node -e "
const f = require('fs').readFileSync('index.html','utf8');
const start = f.indexOf('data-id=\"S23-2\"');
const block = f.slice(start, start + 2000);
const hasNota = block.includes('card-nota-historiografica');
const hasIrazusta = block.includes('Irazusta') || block.includes('irazusta') || block.includes('revisionista');
const hasLynch = block.includes('Lynch');
console.log('nota:', hasNota, '| Irazusta/revisionista:', hasIrazusta, '| Lynch:', hasLynch);
"
```
**Expected:** `nota: true | Irazusta/revisionista: true | Lynch: true`

---

### 11. S23-1 has a card image (Encarnación portrait)

```bash
node -e "
const f = require('fs').readFileSync('index.html','utf8');
const start = f.indexOf('data-id=\"S23-1\"');
const block = f.slice(start, start + 1500);
const hasImg = block.includes('<img');
const hasCaption = block.includes('card-image__caption') || block.includes('card-image');
console.log('has_img:', hasImg, '| has_image_block:', hasCaption);
"
```
**Expected:** `has_img: true | has_image_block: true`

---

### 12. S23-2 has NO card image block (interpretive companion card)

```bash
node -e "
const f = require('fs').readFileSync('index.html','utf8');
const start = f.indexOf('data-id=\"S23-2\"');
const end = f.indexOf('data-id=\"S24-', start);
const block = f.slice(start, end > start ? end : start + 3000);
const hasImg = block.includes('<img');
console.log('S23-2 has_img:', hasImg);
"
```
**Expected:** `S23-2 has_img: false` — interpretive companion cards do not have images

---

### 13. Scope boundary — no banned terms in S23 card blocks

```bash
node -e "
const f = require('fs').readFileSync('index.html','utf8');
const start = f.indexOf('data-id=\"S23-1\"');
const end = f.indexOf('cards will be appended here', start);
const block = f.slice(start, end);
const banned = ['Barranco Yaco','bloqueo franc','bloqueo anglo','Vuelta de Obligado','Caseros'];
const found = banned.filter(b => block.includes(b));
console.log(found.length === 0 ? 'SCOPE_PASS' : 'SCOPE_FAIL:' + found.join(','));
"
```
**Expected:** `SCOPE_PASS` — the S23 cards do not contain events outside the 1833–1838 scope (Encarnación's death year)

---

### 14. Stagger delays are reset at slice level

```bash
node -e "
const f = require('fs').readFileSync('index.html','utf8');
const s1 = f.indexOf('data-id=\"S23-1\"');
const s2 = f.indexOf('data-id=\"S23-2\"');
const b1 = f.slice(s1, s1+300);
const b2 = f.slice(s2, s2+300);
const d1 = b1.match(/--reveal-delay:\s*([^;\"]+)/);
const d2 = b2.match(/--reveal-delay:\s*([^;\"]+)/);
console.log('S23-1 delay:', d1 ? d1[1].trim() : 'NOT FOUND');
console.log('S23-2 delay:', d2 ? d2[1].trim() : 'NOT FOUND');
"
```
**Expected:** `S23-1 delay: 0ms` and `S23-2 delay: 80ms` (per-slice stagger reset, not cumulative)

---

## Edge Cases

### Mazorca not mentioned in S23 cards

```bash
node -e "
const f = require('fs').readFileSync('index.html','utf8');
const start = f.indexOf('data-id=\"S23-1\"');
const end = f.indexOf('cards will be appended here', start);
const block = f.slice(start, end);
console.log(block.includes('Mazorca') ? 'FAIL: Mazorca present' : 'PASS: Mazorca absent');
"
```
**Expected:** `PASS: Mazorca absent` — the Mazorca as repressive institution postdates Encarnación's death (1838)

---

### S23 cards position — immediately before the append marker

```bash
node -e "
const f = require('fs').readFileSync('index.html','utf8');
const markerIdx = f.indexOf('cards will be appended here');
const s23_2_idx = f.lastIndexOf('data-id=\"S23-2\"', markerIdx);
const gapText = f.slice(s23_2_idx, markerIdx);
const hasOnlyWhitespaceAndHTML = !/data-id="S2[4-9]/.test(gapText);
console.log('S23-2 is closest card before marker:', hasOnlyWhitespaceAndHTML ? 'PASS' : 'FAIL');
"
```
**Expected:** `PASS` — S23-2 is the last card before the append marker (no S24+ cards inserted between them)

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns `89` — splice did not apply; restore from `C:/tmp/index.html.bak-s23`
- `grep -c 'data-id="S23-' index.html` returns `0` or `1` — one or both cards missing; inspect `C:/tmp/s23-cards.html` for the source HTML
- `grep -c 'cards will be appended here' index.html` returns `0` — marker was accidentally consumed; restore from backup and re-splice with `Array.splice(idx, 0, ...)` (zero-deletion second argument)
- `grep -c 'card-nota-historiografica' index.html` returns `10` — S23-2 nota block missing; inspect the card HTML in `C:/tmp/s23-cards.html`
- `git diff --name-only HEAD -- styles.css app.js` returns non-empty — CSS/JS contamination; revert immediately

## Not Proven By This UAT

- Visual rendering in a browser (card layout, image load, stagger animation timing) — this is a static artifact UAT only
- Reveal-on-scroll behaviour for S23 cards specifically — the reveal system is unchanged and tested in prior milestones
- Wikimedia Commons portrait URL availability at runtime — the URL is structurally correct but live availability depends on Wikimedia uptime

## Notes for Tester

- The "Mazorca" entity appears elsewhere in `index.html` (in S16 cards). The scope check above isolates only the S23 card block — a global `grep -c 'Mazorca' index.html` returning a positive count is expected and correct.
- `data-certeza="opinión"` is entity-encoded in source as `opini&#xF3;n` — if grepping for the raw string, search for both forms or use Node.js for the check.
- The marriage date in S23-1 uses year only ("en 1813") — this is intentional, not an omission.

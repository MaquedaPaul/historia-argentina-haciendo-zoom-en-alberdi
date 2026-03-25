# S02: Integración HTML — UAT

**Milestone:** M017
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S02 makes exclusively static HTML changes. All behavior is observable via grep/node structural checks and browser DOM inspection. No runtime backend, no async paths, no JS logic changes. The 8 structural verification checks are deterministic and reproducible.

## Preconditions

1. `index.html` is the post-S02 file (6 URQ cards inserted)
2. `app.js` is unmodified (S02 touches only HTML)
3. Node.js is available in the shell environment
4. A browser (Chrome/Firefox/Safari) is available for visual/DOM checks
5. Working directory is the project root (where `index.html` and `app.js` live)

## Smoke Test

```bash
grep -c 'data-id="URQ-' index.html
```

Expected output: `6`. Any other value means the section is missing or partially inserted.

## Test Cases

### 1. Sub-nav has exactly 8 links

```bash
grep -c 'sub-nav__link' index.html
```

**Expected:** `8`

**Why:** S02 added the 8th link (`href="#rev-urquiza-perfil"`, label "Urquiza") to the existing 7-link sub-nav inside `#rev-1835-1852`. Fewer than 8 means the link was not inserted; more than 8 means a duplicate was introduced.

---

### 2. New sub-nav link targets the correct anchor

```bash
grep 'sub-nav__link' index.html | grep 'rev-urquiza-perfil'
```

**Expected:** 1 line matching `href="#rev-urquiza-perfil"` with visible label text "Urquiza".

---

### 3. Section wrapper present exactly once

```bash
grep -c 'id="rev-urquiza-perfil"' index.html
```

**Expected:** `1`

**Why:** The `<div id="rev-urquiza-perfil">` is the container for the entire Urquiza sub-period. Exactly 1 instance is required — 0 means the edit was not applied; 2+ means a duplicate was introduced.

---

### 4. All 6 URQ cards present

```bash
grep -c 'data-id="URQ-' index.html
```

**Expected:** `6`

**Why:** S02 inserts 6 cards (URQ-1 through URQ-6). Each card article has `data-id="URQ-N"` on its opening tag.

---

### 5. Each individual card is present

```bash
for i in 1 2 3 4 5 6; do
  echo -n "URQ-$i: "
  grep -c "data-id=\"URQ-$i\"" index.html
done
```

**Expected:** Each line outputs `1` (URQ-1 through URQ-6 all present exactly once).

---

### 6. URQ-5 uses debatido certeza and card-opinion class

Run in browser DevTools console (after opening `index.html`):
```js
const el = document.querySelector('[data-id="URQ-5"]');
console.log(el.dataset.certeza);     // "debatido"
console.log(el.classList.contains('card-opinion'));  // true
el.querySelector('.certeza-icon').textContent;       // "⚖"
```

**Expected:** `"debatido"`, `true`, `"⚖"`

**Why:** URQ-5 covers the Pronunciamiento de 1851, which is historiographically disputed (¿traición o decisión de estado?). It must be classified as `debatido`, styled as `card-opinion`, and show the ⚖ certeza icon.

---

### 7. URQ-6 uses opinión certeza with HTML entity encoding

Structural check (node.js — required on Windows bash due to `&` metacharacter issue):
```bash
node -e "const fs=require('fs');const l=fs.readFileSync('index.html','utf8').split('\n');console.log(l.filter(x=>x.includes('opini&#xF3;n')&&x.includes('URQ-6')).length);"
```

**Expected:** `1`

Browser DevTools:
```js
const el = document.querySelector('[data-id="URQ-6"]');
console.log(el.dataset.certeza);     // "opinión"
console.log(el.classList.contains('card-opinion'));  // true
el.querySelector('.certeza-icon').textContent;       // "💬"
```

**Expected:** `"opinión"`, `true`, `"💬"`

---

### 8. URQ-3 has inline card-nota-certeza span

```bash
grep -A15 'URQ-3' index.html | grep -c 'card-nota-certeza'
```

**Expected:** `1`

Browser DevTools:
```js
const urq3 = document.querySelector('[data-id="URQ-3"]');
urq3.querySelectorAll('.card-nota-certeza').length;  // 1
```

**Why:** URQ-3 contains an inline epistemic flag on troop count figures. The span must be present in the rendered card body.

---

### 9. Parent anchor /#rev-1835-1852 is intact

```bash
grep -c '/#rev-1835-1852' index.html
```

**Expected:** `1`

**Why:** S02 inserts content _before_ the `</div><!-- /#rev-1835-1852 -->` closing anchor. If this check returns 0, the closing comment was clobbered and the DOM structure of the parent period is broken.

---

### 10. No JS syntax errors introduced

```bash
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX:', e.message); else console.log('OK'); }"
```

**Expected:** `OK`

**Why:** S02 modifies only `index.html`. This check confirms no accidental edit touched `app.js`.

---

### 11. Section visible in browser — 6 cards render

1. Open `index.html` in a browser
2. Navigate to `#rev-urquiza-perfil` (either via sub-nav or by scrolling)
3. Inspect the section: `document.querySelectorAll('#rev-urquiza-perfil article').length`

**Expected:** `6` article elements inside `#rev-urquiza-perfil`

---

### 12. URQ-6 does NOT contain a new Alberdi blockquote

```bash
grep -A30 'data-id="URQ-6"' index.html | grep -c '<blockquote'
```

**Expected:** `0`

**Why:** The Alberdi blockquote referenced by URQ-6 already existed at approximately line 2274–2276 (pre-edit). S02 must NOT add a duplicate blockquote. URQ-6 is a card-opinion that references the existing quote — it should have no `<blockquote>` of its own inside the card article.

---

### 13. URQ-2 has no card-image div (no-image card pattern)

```bash
grep -A10 'data-id="URQ-2"' index.html | grep -c 'card-image'
```

**Expected:** `0`

**Why:** URQ-2 covers the commerce/politics period (1830s–1840s), for which no suitable public-domain image was available. The no-image card pattern is valid; verifying its absence confirms the card was not accidentally given a broken image reference.

---

### 14. URQ-4 uses original Wikimedia URL (no /thumb/ path) with width="100%"

```bash
grep -A15 'data-id="URQ-4"' index.html | grep 'src=' | head -1
```

**Expected:** URL contains `Urquiza_daguerrotipo` (or similar) without `/thumb/` path segment, and a nearby line has `width="100%"` on the `<img>` tag.

**Why:** URQ-4's daguerrotipo is a small Wikimedia image with no 500px thumbnail. Per KNOWLEDGE.md, small images must use the original URL with `width="100%"` on the `<img>` to fill the card container.

## Edge Cases

### grep -A5 is insufficient for card-nota-certeza detection

`grep -A5 'URQ-3' index.html | grep -c 'card-nota-certeza'` returns 0 even when the span is present. The `card-nota-certeza` span is ~10 lines into the excerpt paragraph — use `-A15` or the node.js approach.

### grep for opini&#xF3;n fails silently on Windows Git Bash

`grep 'opini&#xF3;n' index.html` — the `&` character is a bash metacharacter and causes bash to fork in the background. The grep receives only the pattern up to `&`. Always use node.js for this verification on Windows.

### data-certeza DOM vs HTML attribute value

In the DOM, `el.dataset.certeza` returns `"opinión"` (decoded Unicode), while the HTML source contains `opini&#xF3;n` (entity). Both are correct. CSS attribute selectors must match the decoded form: `[data-certeza="opinión"]` or `[data-certeza="opinion"]` (the unaccented variant used in some older cards).

## Failure Signals

- `grep -c 'data-id="URQ-' index.html` returns < 6 → partial insertion, run T01 again
- `grep -c '/#rev-1835-1852' index.html` returns 0 → parent closing anchor clobbered, critical DOM structure break
- `grep -c 'sub-nav__link' index.html` returns < 8 → sub-nav link was not added
- `grep -c 'sub-nav__link' index.html` returns > 8 → duplicate sub-nav link was added
- `node -e "new Function(...app.js...)"` throws SyntaxError → app.js was accidentally modified
- URQ-5 `data-certeza` is not `"debatido"` → wrong certeza classification for the Pronunciamiento card
- URQ-6 `data-certeza` is not `"opinión"` → wrong certeza for the historiographic debate card
- URQ-6 has a `<blockquote>` inside its article → duplicate Alberdi quote was introduced

## Not Proven By This UAT

- **Visual design quality** — card layout, typography, certeza icon sizes, and color-coding are not verified. A full visual check requires browser rendering at multiple viewport widths.
- **Smooth-scroll from sub-nav to section** — requires live browser interaction; not tested by structural checks.
- **IntersectionObserver sub-nav highlighting** — the `#rev-urquiza-perfil` link should activate in the sub-nav when the section enters the viewport. Not tested by static checks.
- **Reveal animation on URQ cards** — each card has `class="reveal reveal-fade"` and should animate in on scroll. Not tested here.
- **Image loading for URQ-1, URQ-3, URQ-4, URQ-5, URQ-6** — images are served from Wikimedia Commons. Actual network availability of the confirmed URLs is not tested. `initImageFallbacks()` in `app.js` handles 404s automatically.
- **Mobile responsiveness** — card layout at ≤640px or ≤375px is not tested here.

## Notes for Tester

- The `opini&#xF3;n` HTML entity in URQ-6's `data-certeza` attribute is intentional and correct. When inspected in browser DevTools Elements panel, it will display as `opinión` (decoded). This is not an encoding error.
- URQ-2 having no image is intentional. The card should render normally with text only — the card template does not require an image div.
- The Alberdi quote near line 2274–2276 (pre-S02) belongs to the surrounding narrative context, not to URQ-6. URQ-6 card text _references_ this quote but does not contain its own blockquote element.
- The `card-nota-certeza` span in URQ-3 is a visible epistemic flag to readers about uncertain troop count figures. It is correct and intentional — do not treat it as a content error.

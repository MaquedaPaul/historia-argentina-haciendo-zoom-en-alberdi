# S04: Perú, Guayaquil y retiro del poder — UAT

**Milestone:** M021
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S04 is pure static HTML injection — no server, no JS changes, no runtime state. All observable outcomes are directly queryable via DOM or file content. Browser rendering of badges, expand/collapse, and images can be spot-checked via browser navigation to the local file.

## Preconditions

1. `index.html` is present in the worktree root — confirmed at `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M021/index.html`
2. All 5 verification commands have already passed (boundary count=15, global certeza=108, Guayaquil URL=1, JS syntax OK, card-nota-certeza≥1)
3. For browser test cases: open `index.html` directly in a browser (file:// or local server) and scroll to the `#rev-san-martin` sub-period

## Smoke Test

Run the boundary-scoped node command:

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"
```

**Expected:** `15`

If this prints `15`, the slice is structurally sound. Proceed with detailed test cases.

---

## Test Cases

### 1. Card count in #rev-san-martin is exactly 15

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"
```

**Expected:** `15`

---

### 2. Global data-certeza count is exactly 108

```bash
grep -c 'data-certeza' index.html
```

**Expected:** `108`

---

### 3. Guayaquil card uses direct (non-thumb) image URL

```bash
grep 'Encuentro_de_Guayaquil' index.html
```

**Expected:** The matching line contains `https://upload.wikimedia.org/wikipedia/commons/f/ff/Encuentro_de_Guayaquil.jpg` (no `/thumb/` path component).

---

### 4. Guayaquil card has card-opinion class, data-certeza="debatido", and nota historiográfica

```bash
grep -A 5 'Encuentro_de_Guayaquil.jpg' index.html | head -20
grep -c 'data-certeza="debatido"' index.html
grep -c 'card-nota-historiografica' index.html
```

**Expected:**
- `data-certeza="debatido"` count ≥ 1 (Guayaquil card present)
- `card-nota-historiografica` count ≥ 3 (logias, Guayaquil, legado — existing + new)
- The Guayaquil card HTML contains `class="event-card card-opinion"` and `class="card-nota-historiografica"`

---

### 5. Guayaquil nota historiográfica names all three positions

```bash
grep -A 30 'data-certeza="debatido"' index.html | head -35
```

**Expected:** The `card-nota-historiografica` paragraph contains references to:
- Mitre (voluntary retreat / San Martín deferred to Bolívar's superior force)
- Guido / edecán / tradition view (political ambush / Bolívar leveraged position)
- Lynch / síntesis (tacit zone-of-influence agreement)

No verdict is present — the card presents positions without resolving the debate.

---

### 6. Retiro del poder card (Entrada 13) has card-nota-certeza span

```bash
grep -c 'card-nota-certeza' index.html
```

**Expected:** ≥ 1 (currently 24 — includes all prior spans plus the new one in Entrada 13)

To verify Entrada 13 specifically:
```bash
grep -B 2 -A 2 'card-nota-certeza' index.html | grep -A 4 -B 4 'compatriotas\|sacrificios\|retiro'
```

**Expected:** A `<span class="card-nota-certeza">` wrapping an uncertain paraphrase about San Martín's stated reason for retiring, within the expand detail of the Retiro del poder card.

---

### 7. Legado card (Entrada 15) uses data-certeza="opinión" (HTML entity)

```bash
grep 'opini' index.html | grep 'rev-san-martin\|Legado\|síntesis' 
grep -c 'opini&#xF3;n' index.html
```

**Expected:** At least 1 occurrence of `data-certeza="opini&#xF3;n"` (the HTML entity form for ó, matching the existing codebase pattern).

---

### 8. JS syntax is valid after injection

```bash
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK (runtime-only error)'); }"
```

**Expected:** `syntax OK`

---

### 9. Stagger delays reset to 0ms at Entrada 11

```bash
grep -A 3 'Campaña al Perú\|Entrada 11\|s04-start' index.html | head -15
```

**Expected:** The first card of the S04 cluster (Campaña al Perú) has `--reveal-delay: 0ms` (or no `--reveal-delay` with default 0). Subsequent cards increase by 80ms increments: 0/80/160/240/320ms for Entradas 11–15.

---

### 10. (Browser) Expand/collapse works on all 5 new cards

1. Open `index.html` in a browser
2. Scroll to the `#rev-san-martin` sub-period
3. Scroll past the S03 cards (San Lorenzo through Maipú) to reach the 5 new cards
4. Click the expand toggle on each of the 5 new cards (Entradas 11–15)

**Expected:** Each card smoothly expands to reveal the detail section; clicking again collapses it. The `card-nota-certeza` span is visible in Entrada 13's expanded state.

---

### 11. (Browser) Guayaquil card renders "debatido" badge

1. Open `index.html` in a browser
2. Scroll to the Guayaquil card in `#rev-san-martin`

**Expected:** The card displays a visual badge or label indicating "debatido" (distinct from the green "hecho" badge and the blue/orange "opinión" badge). If no badge renders, check whether the CSS has a rule for `[data-certeza="debatido"]`.

---

### 12. (Browser) All 5 new card images load (no broken image icons)

1. Open `index.html` in a browser
2. Scroll to Entradas 11–15

**Expected:** Each card shows either (a) a correctly loaded image, or (b) the styled placeholder fallback activated by `initImageFallbacks()` in `app.js`. No raw broken-image browser icon should appear.

---

## Edge Cases

### data-certeza="debatido" vs. "debate" typo

```bash
grep 'data-certeza="deba' index.html
```

**Expected:** Exactly `data-certeza="debatido"` — no `debate`, `debatida`, or similar variants.

---

### Boundary anchor present exactly once

```bash
grep -c '</div><!-- /#rev-san-martin -->' index.html
```

**Expected:** `1` — if there are 2 occurrences, the inject created a duplicate closing anchor; if 0, the sub-period was malformed.

---

### No cards injected outside #rev-san-martin

If boundary count = 15 but global count ≠ 108 (e.g., > 108), some cards were injected outside the sub-period. Verify:

```bash
# Global count should be exactly 108
grep -c 'data-certeza' index.html
```

**Expected:** `108` exactly.

---

### Entrada 15 HTML entity round-trips correctly in browser

In browser devtools console:

```js
document.querySelector('[data-certeza]').closest('[id="rev-san-martin"]');
// Then inspect the last card's data-certeza attribute:
[...document.querySelectorAll('#rev-san-martin [data-certeza]')].pop().dataset.certeza
```

**Expected:** Returns `"opinión"` (with accent) — the browser's HTML parser decodes `&#xF3;` to `ó` correctly.

---

## Failure Signals

- `node boundary count < 15` — cards missing from `#rev-san-martin`; check for inject anchor mismatch
- `grep -c 'data-certeza' index.html > 108` — cards injected outside the sub-period
- `grep -c 'data-certeza' index.html < 108` — fewer than 5 cards injected
- `grep -c 'Encuentro_de_Guayaquil.jpg' index.html = 0` — Guayaquil image URL missing or wrong filename
- `grep 'Encuentro_de_Guayaquil.jpg' index.html` contains `/thumb/` — wrong URL type (thumb instead of direct)
- `syntax OK` not printed — JS syntax error introduced during injection (malformed HTML bleed into `<script>`)
- `grep -c 'data-certeza="debatido"' index.html = 0` — Guayaquil card missing correct certeza value
- `grep -c 'card-nota-historiografica' index.html` decreased — nota historiográfica paragraphs were accidentally removed
- Browser: Guayaquil card shows no badge — CSS rule for `[data-certeza="debatido"]` missing
- Browser: Expand toggle unresponsive — JS event delegation broken (check browser console for errors)

---

## Not Proven By This UAT

- Sub-nav link to `#rev-san-martin` — this is S05's responsibility
- `revolucion-timeline` markers for 1812 and 1817 — S05's responsibility
- Correct rendering at 320px and 1920px+ — S05 viewport verification
- No JS console errors in full browser session — S05 final check
- `document.querySelectorAll('#rev-san-martin .event-card').length >= 14` milestone criterion — S05 final DOM verification pass
- Audio, parallax, or other interactive features — not touched by S04

---

## Notes for Tester

- The `data-certeza="debatido"` value is only used for the Guayaquil card in the entire codebase. If the CSS badge does not render, it may indicate the CSS was never extended for this value. Check `styles.css` for a `[data-certeza="debatido"]` rule — if absent, S05 or a follow-up should add it.
- Entrada 13 (Retiro del poder) has a `card-nota-certeza` span **only in the expanded detail section** (inside `card-detail[hidden]`). It will not be visible until the expand toggle is clicked. This is by design.
- Entrada 15 (Legado) is a `card-opinion` with a `card-nota-historiografica` but **no `<blockquote>`** — the note names historians without quoting them. This is intentional (no verified direct quotes available for the synthesis card).
- The Guayaquil `card-nota-historiografica` withholds a verdict intentionally — the note names three positions without endorsing any. This matches the milestone requirement: "Guayaquil tratada como debate historiográfico… sin veredicto".

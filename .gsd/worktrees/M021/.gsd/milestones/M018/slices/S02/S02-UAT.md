# S02: Integración HTML — UAT

**Milestone:** M018
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S02 produces only static HTML edits to `index.html`. All verification is deterministic — grep counts, line presence, JS syntax check. No server-side logic, no async behavior, no dynamic data. Browser visual verification is additive (confirms render) but the artifact checks alone fully prove correctness of the integration.

## Preconditions

1. Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M018`
2. `index.html` and `app.js` are present in the working directory
3. Node.js is available (for JS syntax check)

## Smoke Test

```bash
grep -c 'id="rev-camino-caseros"' index.html
```
Expected output: `1`

If this returns `1`, the entire `#rev-camino-caseros` block was successfully inserted. If it returns `0`, nothing from S02 is present.

---

## Test Cases

### 1. JS syntax integrity

```bash
node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK')}catch(e){if(e instanceof SyntaxError)console.error('SYNTAX ERROR:',e.message);else console.log('OK')}"
```

**Expected:** `OK`

No JS syntax errors may be introduced by the HTML edit (script tags, inline handlers). This confirms `app.js` remains valid.

---

### 2. Four new `card-hecho` cards present

```bash
grep -c 'data-certeza="hecho"' index.html
```

**Expected:** `70` (or ≥ 18 — the original requirement threshold)

Confirms all 4 CAM cards carry `data-certeza="hecho"` and were inserted.

---

### 3. Sub-period grid ID present exactly once

```bash
grep -c 'id="rev-camino-caseros"' index.html
```

**Expected:** `1`

The grid container must exist and must not be duplicated.

---

### 4. Sub-nav link present exactly once

```bash
grep -c 'href="#rev-camino-caseros"' index.html
```

**Expected:** `1`

The 8th sub-nav link must be present so users can navigate directly to the section.

---

### 5. Sub-period heading present

```bash
grep -c 'El camino a Caseros' index.html
```

**Expected:** `3` (h4 heading + sub-nav label + aria-label on grid)

Confirms the visible section title, nav label, and accessibility label all reference the period correctly.

---

### 6. alberdi-quote count unchanged

```bash
grep -c 'class="alberdi-quote' index.html
```

**Expected:** `6`

CAM-4 includes an Alberdi citation as inline prose — it must NOT have added a new `alberdi-quote` blockquote. Count must remain exactly 6.

---

### 7. Anti-duplication: battle figures appear only in existing SP3-6 card

```bash
grep -n '45.000' index.html | grep ' vs'
```

**Expected:** Exactly one line, approximately: `2262: ...~45.000 soldados vs. ~22.000...`

The new `#rev-camino-caseros` block narrates the path to Caseros, not the battle itself. The battle figures (troop counts) must appear only in the pre-existing SP3-6 card.

---

### 8. CAM-3 panoramic image has cover treatment

```bash
grep -n 'object-fit: cover' index.html
```

**Expected:** One result at approximately line 2329, inside the CAM-3 article

The `La-batalla-de-caseros.JPG` image (2197×582 px, 3.77:1 ratio) requires `object-fit: cover; object-position: center top` to avoid collapsing to near-zero height in the card container.

---

### 9. CAM-4 has no card-image div

```bash
sed -n '2342,2380p' index.html | grep 'card-image'
```

**Expected:** No output (empty)

No verified public domain image exists for the post-Caseros constituyente content. CAM-4 must render without a `<div class="card-image">`.

---

### 10. All four cards are present with correct IDs

```bash
grep -c 'CAM-[1-4]' index.html
```

**Expected:** `4`

Each of the four HTML comment markers (`<!-- CAM-1 -->` through `<!-- CAM-4 -->`) must appear exactly once.

---

## Edge Cases

### Sub-nav link position

```bash
grep -n 'href="#rev-1835-1852"\|href="#rev-camino-caseros"\|href="#rev-1852-1860"' index.html | head -5
```

**Expected:** Three consecutive lines with `#rev-1835-1852` first, `#rev-camino-caseros` second, `#rev-1852-1860` third.

The new link must sit between the two existing links in DOM order — not prepended or appended to the sub-nav.

---

### Block insertion position

```bash
grep -n 'events-grid SP3\|rev-camino-caseros\|#rev-1835-1852' index.html | tail -5
```

**Expected:** `</div><!-- /.events-grid SP3 -->` appears before `id="rev-camino-caseros"`, which appears before `</div><!-- /#rev-1835-1852 -->`.

The new grid must be inside `#rev-1835-1852`, after SP3's grid ends.

---

### CAM-3 image source URL

```bash
grep -n 'La-batalla-de-caseros' index.html
```

**Expected:** One line with `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/La-batalla-de-caseros.JPG/500px-La-batalla-de-caseros.JPG`

Confirms the Wikimedia thumb URL is intact and points to the correct file.

---

## Failure Signals

- `grep -c 'id="rev-camino-caseros"' index.html` returns `0` → the block was not inserted; check for failed edit
- `grep -c 'id="rev-camino-caseros"' index.html` returns `>1` → block was duplicated; search for the extra copy and remove it
- `grep -c 'class="alberdi-quote' index.html` returns `>6` → an `alberdi-quote` blockquote was inadvertently added in CAM-4; must be converted to inline prose
- JS syntax check returns `SYNTAX ERROR:` → the HTML file contains a malformed `<script>` or `</script>` tag in the new block; inspect lines around insertion
- `grep -c 'data-certeza="hecho"' index.html` returns `<70` → one or more CAM cards is missing or has incorrect `data-certeza` value

---

## Not Proven By This UAT

- **Browser render quality** — this UAT does not confirm that the 3 card images (CAM-1, CAM-2, CAM-3) actually load with HTTP 200 in a browser. Wikimedia thumb availability is not tested here. Use DevTools > Network tab for live verification.
- **Reveal animations** — the `--reveal-delay` stagger (0ms, 80ms, 160ms, 240ms) is present in HTML but animation behavior requires a browser with scrolling to verify.
- **Mobile layout** — certeza grid column wrapping at narrow viewports is not verified by these shell checks.
- **Sub-nav sticky behavior** — that `#rev-camino-caseros` correctly activates the new sub-nav link as the user scrolls into view is a live-runtime test not covered here.

---

## Notes for Tester

- The slice plan's `grep -n "45\.000 vs"` command pattern (with backslash-escaped dot) returns **no output** in this codebase — the HTML uses `~45.000 soldados vs.` with a Spanish thousands-separator dot. This is expected behavior, not a failure. Use `grep '45.000' | grep ' vs'` instead (Test Case 7 above).
- Pre-task `data-certeza="hecho"` baseline was 66, not 14 as the plan estimated. The count 70 (not 18) is correct for this site state.
- CAM-4's Alberdi quote (`«El pueblo que ha combatido veinte años…»`) also appears verbatim in the `alberdi-quote` blockquote connector that immediately follows the `#rev-camino-caseros` grid. This is intentional — the connector provides full citation context. It is not accidental duplication.

# S03: Batallas y campañas — San Lorenzo hasta Maipú — UAT

**Milestone:** M021
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S03 is a pure HTML content injection — no new JS, no new CSS, no server. All acceptance criteria reduce to DOM structure checks and image URL presence, which can be verified entirely via bash/Node.js against `index.html` and a browser smoke test.

## Preconditions

- `index.html` is present in the working directory
- `app.js` is present in the working directory
- A browser can open `index.html` as a local file or via a local server

## Smoke Test

Open `index.html` in a browser, scroll to the "San Martín" section, and confirm you can see 10 cards including titles like "Cuyo y la preparación", "El cruce de los Andes", "Batalla de Chacabuco", and "Cancha Rayada y Maipú".

Alternatively, run this single command:
```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log('Cards:', m?m.length:0, m&&m.length>=10?'✅ PASS':'❌ FAIL');"
```
Expected output: `Cards: 10 ✅ PASS`

## Test Cases

### 1. Card count in #rev-san-martin reaches 10

1. Run: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"`
2. **Expected:** `10`

### 2. Global certeza count is 103

1. Run: `grep -c 'data-certeza' index.html`
2. **Expected:** `103`

### 3. All 4 Wikimedia image URLs are present

1. Run: `grep -c "San_Mart%C3%ADn_en_los_Andes" index.html`
   - **Expected:** `1`
2. Run: `grep -c "Cruce_de_los_Andes.jpg" index.html`
   - **Expected:** `1`
3. Run: `grep -c "Battle_of_Chacabuco" index.html`
   - **Expected:** `1`
4. Run: `grep -c "Batalla_de_Maipu.jpg" index.html`
   - **Expected:** `1`

### 4. JS syntax is valid

1. Run: `node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"`
2. **Expected:** `OK`

### 5. All 4 new cards have correct stagger delays

1. Run: `grep -E "reveal-delay: (480|560|640|720)ms" index.html | wc -l`
2. **Expected:** `4`

### 6. Expand/collapse works on battle cards (browser)

1. Open `index.html` in a browser
2. Scroll to the "San Martín" sub-period
3. Find the "Cuyo y la preparación del Ejército de los Andes" card
4. Click "Ver más"
5. **Expected:** Card detail expands smoothly, showing text about logistical preparation and libertos battalions
6. Click "Ver menos" (or collapsed toggle)
7. **Expected:** Card collapses smoothly back to excerpt

### 7. Images load in browser (no broken image icons)

1. Open `index.html` in a browser
2. Scroll to the 4 new battle cards
3. **Expected:** Each card displays its Wikimedia image — Ballerini's Andes painting, the classic Cruce de los Andes painting, Battle_of_Chacabuco image, and the Maipú battle painting. No broken image icons.

Note: curl/wget may return 429 (rate-limited) for Wikimedia URLs; this is expected and does not indicate broken images. Test in browser only.

### 8. Cards are visible at 320px viewport (mobile)

1. Open `index.html` in a browser with viewport set to 320px width
2. Scroll to the San Martín section
3. **Expected:** Cards stack in single-column layout; all text is readable; no horizontal overflow; images fill card width

### 9. Cards are visible at 1920px viewport (desktop wide)

1. Open `index.html` in a browser with viewport set to 1920px width
2. Scroll to the San Martín section
3. **Expected:** Cards display in multi-column grid; all 10 cards visible in proper certeza-grid layout

## Edge Cases

### Certeza indicator for "debatido" vs "hecho"

1. Inspect the 4 new battle cards' certeza indicators in the browser
2. **Expected:** All 4 cards show "Hecho documentado" (✓ icon) — they are `data-certeza="hecho"`, not "debatido". The two "debatido" cards in the section (Entradas 3 and 4 from S02) show the ⚖ icon — those should be visually distinct from the new battle cards.

### No duplicate closing tags

1. Run: `grep -c 'events-grid rev-san-martin' index.html`
2. **Expected:** `1` (the comment appears exactly once — the grid closes once)

## Failure Signals

- `node -e boundary count` returns < 10 → cards were not injected or injection was partial
- `grep -c 'data-certeza' index.html` returns < 103 → injection missed cards or overwrote existing content
- Any Wikimedia grep returns 0 → image URL was not injected correctly
- JS syntax check returns `SYNTAX ERROR` → app.js was corrupted (shouldn't happen — S03 doesn't touch app.js)
- Broken image icons in browser for the 4 new cards → Wikimedia URL was mangled in injection
- Certeza grid shows wrong layout at 320px → CSS regression from another slice

## Not Proven By This UAT

- Reveal-on-scroll animation for the 4 new cards (requires scrolling in a real browser with a fresh page load)
- Image fallback behavior when Wikimedia is unreachable (tested by `initImageFallbacks` in app.js automatically; no per-card wiring needed)
- S04 integration (Perú, Guayaquil, retiro cards not yet present)
- Sub-nav link to `#rev-san-martin` (S05 deliverable)
- Timeline markers for 1812/1817 (S05 deliverable)
- `querySelectorAll('#rev-san-martin [data-certeza]').length >= 14` (S04 deliverable)

## Notes for Tester

- The `grep -A 200 'id="rev-san-martin"' | grep -c 'data-certeza'` command used in the slice plan is unreliable — it returns 17 because it bleeds into adjacent sub-periods. Use the Node.js boundary-scoped command in Test Case 1 above for the authoritative count.
- Wikimedia images may take a moment to load on a slow connection; the `initImageFallbacks` function in app.js will substitute a styled placeholder if any image fails after 5 seconds.
- The 4 new cards should appear after the "El combate de San Lorenzo" card (Entrada 6, 400ms stagger delay) — you'll see the delays progress: 0 → 80 → 160 → 240 → 320 → 400 → **480 → 560 → 640 → 720ms**.

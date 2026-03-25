# S03: Batallas y campañas — San Lorenzo hasta Maipú

**Goal:** Inject 4 battle cards (Entradas 7–10 from the content draft) into the existing `#rev-san-martin` sub-period, bringing the card count to 10 and satisfying the slice success criterion.
**Demo:** `document.querySelectorAll('#rev-san-martin [data-certeza]').length >= 10` is true in browser console; all 4 battle cards are visible with images, expand/collapse, and sources.

## Must-Haves

- 4 new cards appended inside `#rev-san-martin`: Cuyo/preparación, Cruce de los Andes, Batalla de Chacabuco, Cancha Rayada y Maipú
- All cards use `data-certeza="hecho"` with correct stagger delays (480/560/640/720ms)
- All 4 Wikimedia 500px thumb image URLs present and correct
- `grep -A 200 'id="rev-san-martin"' index.html | grep -c 'data-certeza'` returns 10
- `grep -c 'data-certeza' index.html` returns 103 (was 99, +4)
- JS syntax check passes (`new Function` approach)

## Verification

```bash
# Cards in sub-period (should be 10)
grep -A 200 'id="rev-san-martin"' index.html | grep -c 'data-certeza'

# Global certeza count (was 99, +4 = 103)
grep -c 'data-certeza' index.html

# All 4 new image URLs present
grep -c "San_Mart%C3%ADn_en_los_Andes" index.html
grep -c "Cruce_de_los_Andes.jpg" index.html
grep -c "Battle_of_Chacabuco" index.html
grep -c "Batalla_de_Maipu.jpg" index.html

# JS syntax still OK
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
```

## Tasks

- [x] **T01: Inject 4 battle cards into #rev-san-martin** `est:30m`
  - Why: Delivers the entire slice — appends Entradas 7–10 from the content draft into the existing sub-period structure established by S02
  - Files: `index.html`, `tmp-san-martin-s03.html` (temp staging, deleted after)
  - Do: Write 4 cards to temp file using Write tool; inject via Edit anchored on `</div><!-- /.events-grid rev-san-martin -->` two-line block; delete temp file; run verification checks
  - Verify: `grep -A 200 'id="rev-san-martin"' index.html | grep -c 'data-certeza'` returns 10; `grep -c 'data-certeza' index.html` returns 103; all 4 image URL greps return 1
  - Done when: All 6 verification commands above pass

## Files Likely Touched

- `index.html`

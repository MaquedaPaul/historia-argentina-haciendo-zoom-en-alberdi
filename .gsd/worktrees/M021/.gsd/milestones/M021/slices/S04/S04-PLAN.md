# S04: Perú, Guayaquil y retiro del poder

**Goal:** Inject 5 final cards (Entradas 11–15) into `#rev-san-martin`, completing the San Martín narrative arc from the Peru campaign through voluntary exile, and bringing the sub-period card count to 15.
**Demo:** `node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"` prints `15`; global `grep -c 'data-certeza' index.html` prints `108`.

## Must-Haves

- 5 cards injected into `#rev-san-martin` before the `</div><!-- /.events-grid rev-san-martin -->` anchor
- `querySelectorAll('#rev-san-martin [data-certeza]').length === 15` (15 cards total in sub-period)
- Global `data-certeza` count = 108 (103 + 5)
- Guayaquil card uses `card-opinion` + `data-certeza="debatido"` + `<p class="card-nota-historiografica">` (three named historiographic positions)
- Entrada 13 (retiro del poder) contains `<span class="card-nota-certeza">` around uncertain phrasing
- Entrada 15 (legado) uses `data-certeza="opini&#xF3;n"` (with HTML entity for ó)
- Stagger delays reset to 0ms at Entrada 11 (new thematic cluster)
- Guayaquil image uses direct URL `https://upload.wikimedia.org/wikipedia/commons/f/ff/Encuentro_de_Guayaquil.jpg` (NOT a /thumb/ path — image is 484px, below 500px threshold)
- JS syntax check passes

## Verification

```bash
# 1. Authoritative card count in #rev-san-martin (must be 15)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"

# 2. Global certeza count (must be 108)
grep -c 'data-certeza' index.html

# 3. Guayaquil direct image URL present (must be 1)
grep -c 'Encuentro_de_Guayaquil.jpg' index.html

# 4. JS syntax check
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK (runtime-only error)'); }"

# 5. card-nota-certeza span present (Entrada 13)
grep -c 'card-nota-certeza' index.html
```

Success criteria: cards=15, global certeza=108, Guayaquil URL count=1, JS syntax OK, card-nota-certeza≥1.

## Tasks

- [x] **T01: Inject Entradas 11–15 into #rev-san-martin** `est:30m`
  - Why: Completes the San Martín arc with the Peru campaign, the Guayaquil historiographic debate, the voluntary retirement, the exile, and the legacy — bringing the sub-period to 15 cards and satisfying the milestone's `≥14` requirement.
  - Files: `index.html`
  - Do: Write the 5-card HTML block to a temp file using the Write tool, then use Edit anchored on the exact two-line closing block `          </div><!-- /.events-grid rev-san-martin -->\n        </div><!-- /#rev-san-martin -->`. See T01-PLAN.md for the complete card specifications and HTML.
  - Verify: Run the 5 verification commands from the Verification section above. All must pass.
  - Done when: boundary-scoped node count = 15, global certeza = 108, Guayaquil URL = 1, JS syntax OK, card-nota-certeza ≥ 1.

## Files Likely Touched

- `index.html`

## Observability / Diagnostics

**Runtime signals added by this slice:**
- Every new card renders with `data-certeza` attribute; DOM query `querySelectorAll('#rev-san-martin [data-certeza]').length` gives live card count visible in browser devtools.
- Guayaquil card carries `data-certeza="debatido"` — this triggers the yellow "debatido" badge style; a missing badge in the UI is an observable failure signal.
- Entrada 13 `card-nota-certeza` span is inline in the expanded detail — if expand/collapse JS is broken the span is still visible in static HTML grep.
- Entrada 15 `data-certeza="opini&#xF3;n"` entity must round-trip through the browser's HTML parser correctly; inspect the DOM attribute value to verify it decodes to `opinión`.

**Inspection surfaces:**
- `grep -c 'data-certeza' index.html` — total card count across all sub-periods (authoritative: 108 after slice).
- `node -e "..."` boundary-scoped count script (in Verification section) — sub-period-scoped count (authoritative: 15).
- `grep 'Encuentro_de_Guayaquil.jpg' index.html` — confirms direct (non-thumb) Wikimedia URL is present.

**Failure visibility:**
- If the Edit anchor mismatches (e.g. extra/missing whitespace), the tool returns an explicit "no match" error — do NOT proceed silently.
- If boundary count < 15 but global count = 108, the cards were injected outside `#rev-san-martin` — check for duplicate closing div comments.
- JS syntax error in `app.js` surfaces as `SYNTAX ERROR:` prefix in verification output, not a silent pass.

**Redaction constraints:** None — this slice contains only static HTML content and no credentials or PII.

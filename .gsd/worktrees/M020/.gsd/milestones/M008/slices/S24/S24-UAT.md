# S24: Encarnación Ezcurra antes de Rosas — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: The slice delivers static HTML cards into a static site. All correctness criteria are verifiable by inspecting the HTML file — card presence, attribute values, entity encoding, structural constraints (no image on S24-2), certeza counts, and nota count. No server, database, or runtime is required. Scroll-reveal behavior is a live-runtime concern covered by the existing M008 integration criterion; it is noted under "Not Proven By This UAT."

## Preconditions

- `index.html` has been modified by T02 (data-certeza count = 93).
- `C:/tmp/index.html.bak-s24` exists (pre-splice backup available for recovery).
- Working directory is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`.

## Smoke Test

Run: `grep -c 'data-id="S24-' index.html`

**Expected:** `2`

If this returns 0, the splice did not occur. If it returns 4+, the card HTML was doubled. Either failure means T02 must be re-run from backup.

---

## Test Cases

### 1. S24-1 biographical card — structural integrity

1. Run: `grep -n 'data-id="S24-1"' index.html`
2. Note the line number (should be ~2063).
3. Extract lines from that position + 25: `sed -n '2063,2087p' index.html`
4. **Expected:**
   - Class `card-hecho` present on the `<article>` element.
   - `data-certeza="hecho"` on the same element.
   - `--reveal-delay: 0ms` in the style attribute.
   - Year span `1795&#x2013;1813` (en-dash entity-encoded) present.
   - Image src contains `Buenos_Aires_1790.jpg`.
   - `loading="lazy"` on the `<img>`.

### 2. S24-1 — biographical content accuracy

1. Run: `grep 'event-card__excerpt' index.html | grep 'S24' || sed -n '2075,2082p' index.html`
2. Inspect the excerpt paragraph for the following facts (all entity-encoded):
3. **Expected** — all present in the S24-1 card excerpt:
   - Birth date: `25 de marzo de 1795`
   - Father: `Juan Ignacio de Ezcurra` with mention of `Pamplona, Navarra` and `Cabildo` and `Consulado de Comercio`
   - Mother: `Teodora Arguibel` with mention of `ascendencia francesa`
   - Marriage date: `16 de marzo de 1813`
   - Ages at marriage: `18 a&#xF1;os` (her) and `20` (his) — entity-encoded ñ
   - Sister connection: `Mar&#xED;a Josefa Ezcurra` / `Manuel Belgrano` / `Pedro Rosas y Belgrano`
   - No pre-Rosas political activity: phrase to the effect of `No se ha documentado actividad p&#xFA;blica ni pol&#xED;tica de Encarnaci&#xF3;n anterior a la carrera de Rosas`

### 3. S24-1 — entity encoding (no raw non-ASCII)

1. Run:
   ```
   node -e "const f=require('fs').readFileSync('index.html','utf8'); const s=f.indexOf('data-id=\"S24-1\"'); const e=f.indexOf('</article>',s)+10; const block=f.slice(s,e); const bad=block.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(bad.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+bad.length+' lines');"
   ```
2. **Expected:** `ENTITY_PASS`

### 4. S24-2 debate card — structural integrity

1. Run: `grep -n 'data-id="S24-2"' index.html`
2. Note the line number (should be ~2083).
3. Extract lines: `sed -n '2083,2115p' index.html`
4. **Expected:**
   - Class `card-opinion` on the `<article>` element.
   - `data-certeza="opini&#xF3;n"` (entity-encoded ó) present.
   - `--reveal-delay: 80ms` in style attribute.
   - **No `<div class="card-image">` block** inside this article (S24-2 has no image).
   - `card-nota-historiografica` paragraph present inside the article.
   - Year span reads `debate historiogr&#xE1;fico`.

### 5. S24-2 — two-position nota content

1. Run: `node -e "const f=require('fs').readFileSync('index.html','utf8'); const s=f.indexOf('data-id=\"S24-2\"'); const e=f.indexOf('</article>',s)+10; const block=f.slice(s,e); console.log(block.includes('Ramos Mej')&&block.includes('Lynch')&&block.includes('card-nota-historiografica')?'NOTA_PASS':'NOTA_FAIL');"`
2. **Expected:** `NOTA_PASS`
3. Additionally verify manually that the nota contains:
   - Position 1: Ramos Mejía attribution referencing *Rosas y su tiempo* (1907) and personal capital social / family networks.
   - Position 2: Lynch synthesis (*Argentine Dictator*, Oxford, 1981, cap. 2) arguing Encarnación's influence only became *political* within the Rosas project.
   - The sentence making the agency question irresolvable from available correspondence.

### 6. S24-2 — entity encoding (no raw non-ASCII)

1. Run:
   ```
   node -e "const f=require('fs').readFileSync('index.html','utf8'); const s=f.indexOf('data-id=\"S24-2\"'); const e=f.indexOf('</article>',s)+10; const block=f.slice(s,e); const bad=block.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(bad.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+bad.length+' lines');"
   ```
2. **Expected:** `ENTITY_PASS`

### 7. S24 scope boundary — no prohibited terms in card block

1. Run:
   ```
   node -e "const f=require('fs').readFileSync('index.html','utf8'); const s24_1=f.indexOf('data-id=\"S24-1\"'); const s24_2_end=f.indexOf('</article>',f.indexOf('data-id=\"S24-2\"'))+10; const block=f.slice(s24_1-200,s24_2_end); const banned=['Mazorca','Caseros','Barranco Yaco','bloqueo franc','Vuelta de Obligado','Restauradores','Sociedad Popular Restauradora']; console.log(banned.filter(b=>block.includes(b)).length===0?'SCOPE_PASS':'SCOPE_FAIL');"
   ```
2. **Expected:** `SCOPE_PASS`
3. Note: The spec's EOF-bounded scope check (using `f.indexOf('S24-1')` to EOF) will return SCOPE_FAIL due to banned terms in pre-existing SP3-x cards that follow S24 in the DOM. This is a **known false positive** — use the tight-boundary check above as the authoritative test.

### 8. Global certeza and nota counts

1. Run each command separately:
   ```
   grep -c 'data-certeza' index.html
   grep -c 'card-nota-historiografica' index.html
   grep -c 'cards will be appended here' index.html
   ```
2. **Expected:**
   - `data-certeza`: **93**
   - `card-nota-historiografica`: **12**
   - `cards will be appended here`: **1** (marker intact)

### 9. No CSS or JS modifications

1. Run: `git diff --name-only HEAD -- styles.css app.js`
2. **Expected:** empty output (no lines printed).

### 10. S24-1 image — does not reuse S23-1 portrait

1. Run: `grep -c 'Encarnacion_Ezcurra_1835' index.html`
2. Note: This count should be 1 (from S23-1 only).
3. Run: `node -e "const f=require('fs').readFileSync('index.html','utf8'); const s=f.indexOf('data-id=\"S24-1\"'); const e=f.indexOf('</article>',s)+10; console.log(f.slice(s,e).includes('Encarnacion_Ezcurra_1835')?'FAIL_reused_portrait':'PASS_no_reuse');"`
4. **Expected:** `PASS_no_reuse`

---

## Edge Cases

### Stagger delay sequence

1. Run: `node -e "const f=require('fs').readFileSync('index.html','utf8'); const s1=f.match(/data-id=\"S24-1\"[^>]*style=\"([^\"]*)\"/); const s2=f.match(/data-id=\"S24-2\"[^>]*style=\"([^\"]*)\"/); console.log('S24-1:',s1&&s1[1],'S24-2:',s2&&s2[1]);"`
2. **Expected:** S24-1 shows `--reveal-delay: 0ms`; S24-2 shows `--reveal-delay: 80ms`.
3. Rationale: Stagger resets to 0ms per slice (does not continue cumulative delay from S23).

### S24 cards appear before the append marker

1. Run: `node -e "const f=require('fs').readFileSync('index.html','utf8'); const s24pos=f.indexOf('data-id=\"S24-1\"'); const markerpos=f.indexOf('cards will be appended here'); console.log(s24pos<markerpos?'ORDER_PASS':'ORDER_FAIL');"`
2. **Expected:** `ORDER_PASS` (S24-1 appears before the marker in the DOM).

### S24-2 certeza icon is 💬 not ✓

1. Run: `node -e "const f=require('fs').readFileSync('index.html','utf8'); const s=f.indexOf('data-id=\"S24-2\"'); const e=f.indexOf('</article>',s)+10; const block=f.slice(s,e); console.log(block.includes('&#x1F4AC;')&&!block.includes('&#x2713;')?'ICON_PASS':'ICON_FAIL');"`
2. **Expected:** `ICON_PASS` (💬 for opinión, not ✓ for hecho).

---

## Failure Signals

- `grep -c 'data-id="S24-' index.html` returns **0**: cards were not spliced. Restore from `C:/tmp/index.html.bak-s24` and re-run T02.
- `grep -c 'data-certeza' index.html` returns **91**: splice did not add the two new cards. Restore from backup.
- `grep -c 'data-certeza' index.html` returns **95+**: cards were duplicated. Restore from backup and re-splice.
- `grep -c 'cards will be appended here' index.html` returns **0**: marker was deleted during splice. Restore from backup — marker must be preserved.
- `grep -c 'card-nota-historiografica' index.html` returns **11** (not 12): S24-2 nota block is missing or malformed.
- ENTITY_FAIL on either card: raw non-ASCII characters were introduced. Locate offending lines and replace with HTML entities.
- `git diff --name-only HEAD -- styles.css app.js` returns non-empty: CSS or JS was accidentally modified. Revert those files with `git checkout -- styles.css app.js`.

---

## Not Proven By This UAT

- **Scroll-reveal animation behavior:** The UAT verifies that S24-1 and S24-2 have `.reveal .reveal-slide` classes and correct `--reveal-delay` values, but does not verify that the IntersectionObserver fires correctly for these cards in a browser. This is covered by M008's integration criterion (navigate to `#periodo-rosas` and verify all cards reveal on scroll).
- **Image load success in browser:** The UAT confirms the Buenos Aires 1790 image URL is present and was HTTP 200 at authoring time; it does not re-verify live image availability. Wikimedia Commons URLs are stable but not guaranteed.
- **Mobile layout:** Responsive rendering of S24 cards at 375px is not verified by this UAT. The card structure follows the established template used by S09–S23, which was verified mobile-compatible in earlier slices.
- **Cross-browser rendering of entity-encoded characters:** The UAT confirms entities are present in the HTML source; it does not verify that all browsers render them identically.

---

## Notes for Tester

- The most important check is Test Case 8 (counts = 93 / 12 / 1) — this is the definitive signal that M008 is complete and nothing is broken.
- Test Case 7 (scope check) uses the **tight-boundary** check, not the EOF-bounded check. The EOF-bounded check produces a known false positive. If you accidentally run the spec's version (`f.slice(f.indexOf('S24-1'))` to EOF), expect SCOPE_FAIL — this is expected and documented.
- S24-2 intentionally has no image. If it appears to be missing an image in the browser, that is correct behavior — not a rendering error.
- The certeza icon for S24-2 is 💬 (chat bubble, `&#x1F4AC;`) because it is an `opinión` card. The checkmark icon ✓ (`&#x2713;`) is reserved for `hecho` cards. Do not flag the icon difference as a bug.
- Lynch caps. 1–2 are cited in S24-1's footer as `Lynch, J., Argentine Dictator, Oxford, 1981, caps. 1–2` (entity-encoded en-dash). This is the final consumption of the Lynch citation chain across M008.

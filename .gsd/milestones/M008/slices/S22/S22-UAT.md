# S22: ¿Sin Rosas la Patria hubiera caído? — UAT

**Milestone:** M008
**Written:** 2026-03-23

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: This is a static HTML site. All deliverables are file-level artifacts — card HTML in `index.html`, content draft, temp files. There is no runtime server, database, or user session. Artifact-driven verification (grep counts, DOM inspection, positional checks) is the authoritative test surface.

## Preconditions

1. Working directory is `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008`
2. `index.html` has been modified by T02 (S22-1 splice complete)
3. `S22-CONTENT-DRAFT.md` exists and is non-empty
4. `C:/tmp/index.html.bak-s22` exists (T02 backup)

## Smoke Test

```bash
grep -c 'data-certeza' index.html
# Expected: 89
```
If this returns 89, the card was successfully spliced and the slice basically works.

---

## Test Cases

### 1. Card count integrity — data-certeza advances exactly by 1

```bash
grep -c 'data-certeza' index.html
```

**Expected:** `89`

Rationale: The baseline before S22 was 88. S22 adds exactly one card (S22-1). Any other result indicates a duplicate splice (>89) or a failed splice (<89) or a different card was inadvertently removed (unexpected value).

---

### 2. S22-1 card present exactly once

```bash
grep -c 'data-id="S22-' index.html
```

**Expected:** `1`

If 0: the card was not inserted. If >1: duplicate splice occurred — restore from `C:/tmp/index.html.bak-s22` and re-splice.

---

### 3. Append marker intact for S23–S24

```bash
grep -c 'cards will be appended here' index.html
```

**Expected:** `1`

If 0: the multi-slice append marker was accidentally overwritten or deleted — this blocks all remaining slices (S23, S24). Restore from backup immediately.

---

### 4. No CSS or JS changes introduced

```bash
git diff --name-only HEAD -- styles.css app.js
```

**Expected:** (empty output — no lines printed)

Any output here means the zero-new-CSS/JS constraint was violated.

---

### 5. Card is positioned immediately before the append marker

```bash
grep -n 'data-id="S22-1"' index.html
grep -n 'cards will be appended here' index.html
```

**Expected:** The `data-id="S22-1"` line number is approximately 18 lines before the `cards will be appended here` line. The card must be inside `#periodo-rosas` (not outside the section or after the closing `</div>`).

Specifically as of S22-completion:
- `data-id="S22-1"` → line 2008
- `cards will be appended here` → line 2026

If the card appears outside the `#periodo-rosas` section, the splice target was wrong.

---

### 6. Card has correct certeza classification

```bash
grep -A2 'data-id="S22-1"' index.html | head -5
```

**Expected output includes:**
- `class="event-card card-opinion reveal reveal-slide"`
- `data-certeza="opini&#xF3;n"` (entity-encoded accent)
- `style="--reveal-delay: 0ms"`

If `data-certeza="debatido"` appears instead, the certeza taxonomy was applied incorrectly. S22-1 is an interpretive counterfactual (opinión), not a contested fact (debatido).

---

### 7. Three-position nota historiográfica is present and attributed

```bash
grep -c 'card-nota-historiografica' index.html
```

**Expected:** 10 (was 9 before S22)

Then inspect the nota content:

```bash
grep -A20 'data-id="S22-1"' index.html | grep 'card-nota-historiografica'
```

**Expected:** One `<p class="card-nota-historiografica">` containing:
- "Irazusta" (revisionista position, 1934 + 1941)
- "Halper" (liberal position, Halperín Donghi 1972)
- "Lynch" (synthesis, cap. 8)

If any of the three positions is missing, the card is incomplete per the slice plan.

---

### 8. Scope boundary — no S14-2 events re-narrated in the card

```bash
node -e "
const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S22/S22-CONTENT-DRAFT.md','utf8');
const r=f.slice(f.indexOf('## T02 Recipe'));
const banned=['Vuelta de Obligado','Convenci\u00f3n Mackau','octubre de 1840','bloqueo franc\u00e9s','1838 y 1840','Caseros','3 de febrero de 1852'];
const found=banned.filter(b=>r.includes(b));
console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));
"
```

**Expected:** `SCOPE_PASS`

If `SCOPE_FAIL` with any banned string: the card has re-narrated events that belong to S14. These must be replaced with the cross-reference phrase "detallados en las tarjetas S14-1 y S14-2".

---

### 9. Cross-reference opener is present in the card excerpt

```bash
grep 'S14-1 y S14-2' index.html
```

**Expected:** At least one matching line (inside the S22-1 excerpt paragraph)

This opener is the canonical scope-boundary signal that tells readers where the bloqueo narrative lives. Its absence would indicate the card silently omits the cross-reference.

---

### 10. Image — Monvoisin portrait URL is well-formed

```bash
grep -A8 'data-id="S22-1"' index.html | grep 'img src'
```

**Expected:** URL contains `Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas.jpg` (no-comma variant, distinct from any prior Rosas portrait in index.html)

```bash
grep 'Monvoisin' index.html | wc -l
```

**Expected:** ≥1 (the new card's image and caption). If the URL has been corrupted or uses a different filename variant, the image will 404 in-browser (the `initImageFallbacks` function will substitute the placeholder automatically, so visual regression is contained).

---

### 11. No duplicate Monvoisin URL conflicts with prior cards

```bash
grep 'Monvoisin' index.html
```

**Expected:** Lines should show the no-comma variant (`Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas.jpg`). The SP3 card uses a comma-variant; these are different files. Confirm no duplicate URL exists across cards.

---

### 12. Backup restore point functional

```bash
test -s C:/tmp/index.html.bak-s22 && echo BACKUP_OK
```

**Expected:** `BACKUP_OK`

If the backup is missing, it means T02 did not complete its backup step before splicing — dangerous for any future recovery. Document as a known gap if confirmed missing.

---

## Edge Cases

### Entity encoding integrity — no raw non-ASCII characters in the S22-1 card block

```bash
node -e "
const f=require('fs').readFileSync('index.html','utf8');
const lines=f.split('\n');
const start=lines.findIndex(l=>l.includes('data-id=\"S22-1\"'));
const end=lines.findIndex((l,i)=>i>start&&l.includes('</article>'));
const block=lines.slice(start,end+1).join('\n');
const bad=block.split('\n').filter(l=>/[^\x00-\x7F]/.test(l));
console.log(bad.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+bad.length+' lines with non-ASCII');
"
```

**Expected:** `ENTITY_PASS`

If `ENTITY_FAIL`: raw accented characters are present in the card block (e.g., `ó`, `á`, `é`). These must be replaced with their HTML entity equivalents per D053. The most common offenders: `ó` → `&#xF3;`, `é` → `&#xE9;`, `á` → `&#xE1;`, `í` → `&#xED;`.

---

### Reveal system classes intact — card will animate on scroll

```bash
grep 'data-id="S22-1"' index.html
```

**Expected:** The article element has both `reveal` and `reveal-slide` classes, and `style="--reveal-delay: 0ms"`. If either class is missing, the card will appear instantly without animation (not broken, but not consistent with the rest of the section).

---

### S22 distinct from S17-1 — different excerpt text, different historiographic question

```bash
grep 'S17-1' index.html | head -5
```

Inspect the S17-1 excerpt and compare with S22-1 excerpt. S17-1 asks about internal order ("¿sin Rosas Argentina sería un caos?"). S22-1 asks about foreign-policy sovereignty (river system, European bloqueos). If the two excerpts overlap substantially or ask the same question, S22's scope differentiation has failed.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` returns anything other than 89 → splice failed or duplicate occurred
- `grep -c 'cards will be appended here' index.html` returns 0 → append marker destroyed; S23/S24 are now blocked
- `git diff --name-only HEAD -- styles.css app.js` returns non-empty output → CSS/JS constraint violated
- `grep -c 'data-id="S22-' index.html` returns 0 → card not inserted; T02 splice did not execute
- `grep -c 'data-id="S22-' index.html` returns >1 → duplicate card; likely T02 ran twice without restoration
- Node.js scope check returns `SCOPE_FAIL` → banned bloqueo event strings are in the card HTML — re-narration violation
- Node.js entity check returns `ENTITY_FAIL` → non-ASCII bytes in the card; will cause display issues in strict encodings

## Not Proven By This UAT

- **Visual rendering in a browser** — the card's actual appearance (image loading, animation trigger at scroll threshold, nota historiográfica typography) is not verified by artifact-driven tests. Browser rendering requires navigating to the page and scrolling to `#periodo-rosas`.
- **Wikimedia image availability** — the Monvoisin portrait URL is structurally correct but not verified as currently serving (Wikimedia CDN availability is not under project control). The `initImageFallbacks` function provides a safety net.
- **Semantic coherence of historiographic positions** — the nota's historical accuracy (e.g., that Halperín Donghi's 1972 book makes the argument attributed to it) is not verified by any programmatic check. This was verified by the T01 author but cannot be re-verified automatically.
- **S22-1 vs S17-1 thematic distinctness** — the UAT includes a manual comparison step, but automated content-diff is not implemented.

## Notes for Tester

- All grep checks should be run from `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M008` as the working directory.
- The Node.js entity check and scope check are the highest-value tests — they catch the two most common failure modes (encoding corruption, scope creep) that are invisible to grep-count tests.
- If you open the page in a browser and scroll to the Rosas period, the S22-1 card should appear with a 💬 (opinión) certeza indicator, the Monvoisin portrait, the card title "¿Sin Rosas, Argentina habría perdido la soberanía sobre sus ríos?", and a nota historiográfica paragraph with three named positions. The nota should be visible inline (not collapsed).
- The append marker at line 2026 is invisible in the browser — it only matters for the splice scripts of S23 and S24. Confirm it is present via `grep -c`.

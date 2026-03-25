# S01: Investigación y borrador — UAT

**Milestone:** M018
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S01 produces a single structured markdown file (`S01-CONTENT-DRAFT.md`). All deliverables are verifiable via grep/wc against the file — section count, image confirmation status, absence of PENDIENTE entries, and anti-duplication constraints. No runtime environment is needed at this stage; S02 handles browser verification.

## Preconditions

- `S01-CONTENT-DRAFT.md` exists at `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md`
- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M018`

## Smoke Test

```bash
test -s .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md && echo "DRAFT EXISTS AND NON-EMPTY" || echo "FAIL: draft missing or empty"
```
**Expected:** `DRAFT EXISTS AND NON-EMPTY`

## Test Cases

### 1. Cuatro secciones CAM presentes

```bash
grep -c "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** `4`

If result < 4: draft was truncated mid-write or a section header was malformed. Inspect with `grep "^## CAM-"` to see which are present.

---

### 2. Al menos tres imágenes confirmadas con thumburl

```bash
grep -c "CONFIRMADO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** `≥3` (currently 4)

If result < 3: T02 image verification is incomplete. Run `grep "Estado:" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` to see which images still have PENDIENTE status.

---

### 3. Ningún PENDIENTE sin resolver

```bash
grep "PENDIENTE" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md && echo "FAIL: unresolved PENDIENTE entries" || echo "OK: no unresolved PENDIENTE"
```
**Expected:** `OK: no unresolved PENDIENTE`

If PENDIENTE entries appear: T02 was not completed. S02 must not proceed with PENDIENTE image entries — they will generate broken `<img>` tags.

---

### 4. Estructura mínima de líneas (archivo no truncado)

```bash
wc -l .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** `≥120` (currently 186)

If result < 40: write was aborted mid-execution. File is corrupted — T01 must be re-run.

---

### 5. Restricción anti-SP3-6: cifras de batalla ausentes en excerpts

```bash
grep -n "45.000\|22.000\|45000\|22000" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** No matches — OR — matches appear only in restriction/checklist sections (not in `**Excerpt**` blocks)

To confirm any matches are in restriction sections (not excerpts), inspect surrounding context:
```bash
grep -B5 -A2 "45.000\|22.000" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** Any match has `Restricciones:` or checklist text nearby, never inside an `**Excerpt**` block.

---

### 6. Restricción anti-SP3-6: imagen de batalla SP3-6 no asignada a ninguna card

```bash
grep "Batalla_de_Caseros_3_Febrero_1852" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** No matches — OR — matches appear only in restriction blocks (never as `Filename:` assignment for a card)

---

### 7. Restricción anti-alberdi-quote: ningún nuevo bloque alberdi-quote creado

```bash
grep "alberdi-quote" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** No matches — OR — matches appear only as restriction notes prohibiting its use (e.g., "NO nuevo blockquote class=\"alberdi-quote\"")

---

### 8. Thumburls son URLs válidas de Wikimedia

```bash
grep "thumburl.*https://" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** ≥3 lines, each containing `https://upload.wikimedia.org/wikipedia/commons/thumb/`

Any thumburl that does NOT match the `upload.wikimedia.org/…/thumb/…` pattern is suspect and should be re-verified.

---

### 9. Las cuatro cards tienen clase CSS card-hecho

```bash
grep "Clase CSS:" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** 4 lines, all reading `Clase CSS: card-hecho`

---

### 10. Las cuatro cards tienen data-certeza="hecho"

```bash
grep "data-certeza:" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** 4 lines, all reading `data-certeza: hecho`

---

### 11. Anchor de inserción documentado

```bash
grep "rev-1835-1852\|rev-camino-caseros" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** Both strings present — indicates insertion anchor and sub-period ID are documented

---

### 12. Sub-nav link documentado

```bash
grep "sub-nav__link" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** At least one line with `href="#rev-camino-caseros"` and `class="sub-nav__link"`

## Edge Cases

### FALLO entries presentes pero resueltos

```bash
grep "FALLO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** FALLO entries are present (CAM-3 original candidate and CAM-4 optional). This is CORRECT behavior — FALLOs are documented original candidates replaced by verified alternatives. The health signal is NOT "zero FALLOs" but "zero PENDIENTE without resolution".

To distinguish resolved from unresolved FALLOs:
```bash
grep -A3 "FALLO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md | grep -i "alternativa\|Estado: CONFIRMADO"
```
**Expected:** Every FALLO block is immediately followed by an alternative with CONFIRMADO status.

---

### CAM-3 filename contiene guiones (no guiones bajos)

```bash
grep "La-batalla-de-caseros" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
```
**Expected:** Present — this is the correct alternative filename. Distinguish from the failed original `La_Batalla_de_Caseros_2.JPG` (underscores).

If S02 accidentally uses the underscore version in HTML, the image will 404. The hyphen version is the only verified-existing file.

---

### CAM-4 sin imagen primaria (comportamiento esperado)

```bash
grep -A5 "## CAM-4" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md | grep "Estado: CONFIRMADO"
```
**Expected:** No match — CAM-4 has no mandatory image. This is intentional per the slice plan. S02 may optionally use one of the two verified alternatives documented in CAM-4's image section.

## Failure Signals

- `grep -c "^## CAM-"` returns anything other than 4 → draft structure is broken
- `grep -c "CONFIRMADO"` returns < 3 → T02 image verification incomplete; S02 must not proceed
- `grep "PENDIENTE"` returns matches → unresolved image verification; blocking for S02
- Any thumburl in the draft that does NOT contain `upload.wikimedia.org/…/thumb/` → suspect URL, re-verify via Commons API
- `wc -l` returns < 40 → aborted write; file corrupted, T01 must be re-run
- `grep "alberdi-quote"` returns a line inside an `**Excerpt**` or `**Imagen candidata**` block (not a restriction note) → constraint violation

## Not Proven By This UAT

- **HTML integration correctness:** S02 handles the actual rendering of cards in index.html. This UAT only confirms the draft is structurally correct and ready to consume.
- **Browser rendering of thumbnails:** Wikimedia thumburls are confirmed via API response, but actual loading in the browser is only verified by S02's integration tests.
- **Scroll/reveal animation behavior** for new CAM cards: verified by S02.
- **Sub-nav scroll spy activation** for `#rev-camino-caseros`: verified by S02 in browser.
- **No JS errors** introduced: S01 produces no JS; S02 verifies this post-integration.
- **CAM-3 image aspect ratio rendering:** The `La-batalla-de-caseros.JPG` panorama (2197×582, ratio ~3.77:1) may need CSS `object-position` tuning — S02 must verify visually.

## Notes for Tester

- All verification commands above are deterministic shell checks — no browser, no server needed.
- The presence of FALLO entries in the draft is expected and correct. Do NOT treat FALLO entries as failures; treat PENDIENTE entries as failures.
- CAM-3 uses a filename with **hyphens** (`La-batalla-de-caseros.JPG`). The original candidate with **underscores** (`La_Batalla_de_Caseros_2.JPG`) does not exist in Commons and will produce broken images if used in HTML.
- If regenerating the draft from scratch: all factual source material is in `.gsd/milestones/M018/slices/S01/S01-RESEARCH.md` and `.gsd/milestones/M018/slices/S01/tasks/T01-PLAN.md`. No external lookups needed for T01; T02 requires Commons API calls (use `commons.wikimedia.org`, not `en.wikipedia.org`).

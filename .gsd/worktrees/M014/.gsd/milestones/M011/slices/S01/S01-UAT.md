# S01: Research — Encarnación/Suma del Poder Público y red Gen. del 37 — UAT

**Milestone:** M011
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S01 delivers only a content draft markdown file — no HTML was changed, no runtime server is involved. All proof is in the artifact structure, content correctness, and grep-verifiable properties of `S01-CONTENT-DRAFT.md`.

## Preconditions

- File `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` must exist
- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M011`

## Smoke Test

```bash
grep -c "^## " .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
```
Expected: `5` — confirms 5 card sections exist. If this returns `<3`, the slice is incomplete.

---

## Test Cases

### 1. File structure — ≥3 cards present

```bash
grep "^## " .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
```

1. Run command
2. **Expected:** Output lists exactly 5 card headings:
   - `## M011-ENC-1 — El lobby de Encarnación: despejar el partido federal (1833–1835)`
   - `## M011-ENC-2 — La Nota Historiográfica: ¿inventó Encarnación la Suma como condición?`
   - `## M011-RED37-1 — La formación de la red: cómo se conocieron Alberdi, Echeverría y la Generación del 37`
   - `## M011-MARIQ-1 — Mariquita Sánchez de Thompson: la anfitriona del siglo (1786–1868)`
   - `## M011-RED37-2 — Echeverría vuelve de París: el catalizador romántico (1830–1837)`

### 2. Certeza asignada a cada card

```bash
grep "^- Certeza:" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
```

1. Run command
2. **Expected:** 5 lines, one per card. Values must be:
   - `- Certeza: debatido` (ENC-1)
   - `- Certeza: debatido` (ENC-2)
   - `- Certeza: hecho` (RED37-1)
   - `- Certeza: hecho (con nota de certeza diferenciada para el Himno Nacional)` (MARIQ-1)
   - `- Certeza: hecho` (RED37-2)

### 3. Fuentes específicas presentes en cada card

```bash
grep -c "Fuentes:" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
```

1. Run command
2. **Expected:** `5` — every card has a Fuentes section.

```bash
grep -A1 "^\\*\\*Fuentes:\\*\\*" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md | grep -v "^--$" | grep "^-"
```

3. **Expected:** ≥1 bullet per card (specific author + title + year format). No card should have `Fuentes: —` (empty).

### 4. Zero unresolved VERIFICAR flags

```bash
grep "\[VERIFICAR\]" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
```

1. Run command
2. **Expected:** No output (exit code 1 = no matches = PASS). Any output indicates unresolved research flags that must be cleared before S03 integration.

### 5. Encarnación/Suma del Poder Público content present

```bash
grep -q "Encarnaci" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
grep -q "Suma del Poder" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
```

1. Run both commands
2. **Expected:** Both return `PASS`

### 6. Mariquita Sánchez de Thompson content present with biographical profile

```bash
grep -q "Mariquita" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
grep -q "1786" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
grep -q "tertuli" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
```

1. Run all three commands
2. **Expected:** All return `PASS` — confirms profile covers biographical facts (birth year 1786), and documents the tertulias role

### 7. Red Generación del 37 content present

```bash
grep -q "Salón Literario" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
grep -q "Echeverría" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
grep -q "Gutiérrez" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
```

1. Run all three commands
2. **Expected:** All return `PASS` — confirms the Gen. del 37 network card covers the Salón Literario as crystallization point and names key members

### 8. D052 compliance — debatido cards use card-opinion CSS class

```bash
grep -q "card-opinion" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && echo PASS || echo FAIL
grep -A10 "Certeza: debatido" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md | grep "card-opinion"
```

1. Run both commands
2. **Expected:** First returns `PASS`; second shows `card-opinion` appears in context below each `debatido` certeza declaration (ENC-1 and ENC-2)

### 9. Card-nota-certeza for Hymn tradition in MARIQ-1

```bash
grep "card-nota-certeza" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
```

1. Run command
2. **Expected:** ≥1 line mentioning `card-nota-certeza` containing the word "Himno" or "tradición" — confirms that the Hymn National tradition claim is tagged with inline differentiated certeza, not asserted as established fact

### 10. Hecho cards all have specific sources (not generic references)

```bash
grep -A5 "Certeza: hecho" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md | grep "Fuentes: —"
```

1. Run command
2. **Expected:** No output (empty result) — confirms no `hecho` card has an empty sources field

### 11. HTML insertion notes present for each card

```bash
grep -c "Nota de inserción HTML" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
```

1. Run command
2. **Expected:** `5` — every card has an HTML insertion note guiding S03 integration

```bash
grep -c "data-id" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
```

3. **Expected:** ≥5 — each card has a suggested `data-id` value

---

## Edge Cases

### Duplicate content with existing cards

1. Read the `data-id` suggestions from each card's "Nota de inserción HTML"
2. Confirm none suggest `data-id` values that already exist in `index.html`:
   - ENC-1 → `M011-ENC-1` (new, safe)
   - ENC-2 → `M011-ENC-2` (new, safe)
   - RED37-1 → `M011-RED37-1` (new, safe)
   - MARIQ-1 → `M011-MARIQ-1` (new, safe)
   - RED37-2 → `M011-RED37-2` (new, safe)
3. **Expected:** All suggested data-ids use the `M011-` prefix, which is new and not in use in the existing site (which uses `SP##-#`, `S##-#`, and `BIOG-#` patterns)

### Certeza "hecho" without primary source

1. For each card marked `Certeza: hecho` (RED37-1, MARIQ-1, RED37-2), inspect the Fuentes section
2. **Expected:** Each has ≥1 named academic or institutional source (author + title + year, or institutional URL + date). The Alberdi quote in MARIQ-1 is noted as "atribuido en historiografía secundaria" — this is acceptable because it is clearly marked, not silently treated as verified.

### Quote Verification Protocol compliance

```bash
grep -i "paráfrasis\|PARÁFRASIS\|atribuido\|fuente primaria" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
```

1. Run command
2. **Expected:** ≥2 lines — confirms that where primary-source verification was not possible, the draft uses explicit attribution markers rather than silently presenting secondary sources as primary

---

## Failure Signals

- `grep -c "^## " S01-CONTENT-DRAFT.md` returns `<3` → S01 did not deliver minimum card count
- `grep "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` returns any output → unresolved research flags exist; S03 must not integrate until cleared
- `grep -A5 "Certeza: hecho" S01-CONTENT-DRAFT.md | grep "Fuentes: —"` returns any output → a `hecho` card has no specific source — credibility failure
- MARIQ-1 excerpt contains "Himno" without `card-nota-certeza` → Hymn tradition is being silently presented as fact
- Any card has `CSS class sugerida: card-hecho` with `data-certeza value: debatido` → D052 violation (debatido must use card-opinion class)

---

## Not Proven By This UAT

- That the content will render correctly in `index.html` — HTML integration is S03's scope
- That the reveal-on-scroll system handles the new cards — S03 verifies this in browser
- That the card positions in the DOM are optimal — S03 may adjust insertion points based on actual HTML layout
- That the Alberdi quote about Mariquita is from a verified primary source — this is a known limitation documented in the slice summary; S03 must resolve before publishing
- That the certeza visual indicators (badge, CSS styling) will display correctly — the draft specifies class names but visual rendering requires browser verification in S03

---

## Notes for Tester

- The draft is the complete artifact for S01 — there are no runtime servers or browser sessions to verify
- M011-ENC-2 is intentionally flexible: it can integrate as an independent article *or* as a `<p class="card-nota-historiografica">` within M011-ENC-1. The draft does not commit to one approach — S03 decides based on DOM space and proximity to S23-2
- The `card-nota-certeza` span in MARIQ-1's excerpt is intended to be included verbatim in the HTML `<p class="event-card__excerpt">` — it is not boilerplate to remove
- D051: if any S03 context near ENC-1 mentions the 1835 plebiscite, the correct figure is 9,316 (not 9,320) — already in the live site at SP3-1
- The `debatido` certeza value is semantically distinct from `opinion` even though both use `card-opinion` CSS class (D052). The `data-certeza` attribute distinguishes them in the DOM

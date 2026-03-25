# S01: Investigación y borrador — UAT

**Milestone:** M015
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S01 produces a single static Markdown file (`S01-CONTENT-DRAFT.md`). There is no server, no runtime, no browser interaction, and no user-facing output. All correctness claims are verifiable directly against the file's content.

## Preconditions

- `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` must exist (T01 must have completed)
- Working directory: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M015`

## Smoke Test

Run the three slice-plan verification commands. All three must exit 0:

```bash
test -f .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md && echo "PASS: file exists"
grep -c "^## GEN37-" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md
# must return exactly 5
! grep -qi "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md && echo "PASS: no unresolved flags"
```

If all three pass, the slice is structurally complete.

## Test Cases

### 1. All five cards present with correct IDs

1. Open `S01-CONTENT-DRAFT.md`
2. Run: `grep "^## GEN37-" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
3. **Expected:** Exactly 5 lines returned, one each for GEN37-1, GEN37-2, GEN37-3, GEN37-4, GEN37-5 — in that order.

### 2. Each card has required structural fields

1. For each of the 5 GEN37-x sections in the draft, verify the following fields are present:
   - `**Clase HTML:**` — one of `card-hecho` or `card-opinion`
   - `**data-certeza:**` — one of `hecho` or `opinión`
   - `**Año display:**`
   - `**Stagger delay:**`
   - `**Título:**`
   - `**Fuentes:**` — at least one real bibliographic source
   - A `**Excerpt:**` or `**Blockquote**` block
   - A complete HTML `<article>` block
2. **Expected:** All fields present in all 5 cards. No card has a missing or empty required field.

### 3. No unresolved research flags anywhere in the file

1. Run: `grep -i "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** Zero matches. Exit code 1 (grep returns non-zero when no match found).

### 4. Certeza classification is correct for each card

1. Verify that GEN37-1, GEN37-2, GEN37-3, GEN37-5 use `data-certeza="hecho"` and `card-hecho` class.
2. Verify that GEN37-4 uses `data-certeza="opinión"` and `card-opinion` class.
3. **Expected:** 4 `card-hecho` + 1 `card-opinion`. The opinion card (GEN37-4) has a `<blockquote>` with a `<footer class="card-opinion__author">` attribution block.

### 5. GEN37-3 has card-nota-certeza for date dispute

1. Search: `grep -n "card-nota-certeza" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** At least 2 matches — the `<aside class="card-nota-certeza">` element and its `<p class="card-nota-certeza__text">` child, both inside the GEN37-3 HTML block.
3. Verify the note text mentions both "26 de junio" and "23 de junio" and names Weinberg as the canonical reference.

### 6. Stagger delays are correct and sequential

1. Search: `grep "reveal-delay" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** Exactly 5 matches, with values `0ms`, `80ms`, `160ms`, `240ms`, `320ms` — one per card in order.

### 7. Insertion metadata is complete

1. Verify the draft contains a `## Metadata de inserción` section with:
   - `#rev-generacion-37` as the section ID
   - A concrete insertion point (after `</div><!-- /#rev-1820-1835 -->`)
   - Sub-nav HTML (`<a href="#rev-generacion-37" ...>`)
2. **Expected:** All three fields present, no placeholders.

### 8. Non-duplication map covers all four existing overlapping items

1. Find the `## Mapa de no-duplicación` section.
2. **Expected:** The table lists BIOG-11, SP2-4, SP3-3, and the `alberdi-quote` — four rows — each with an "Ángulo" column explaining how M015 differentiates.

### 9. Complete HTML section wrapper is present

1. Search: `grep -n "id=\"rev-generacion-37\"" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** At least 1 match inside the `## HTML completo de la sección` block.
3. Verify the closing comment `<!-- /#rev-generacion-37 -->` is also present.
4. Verify `class="events-grid events-grid--certeza"` is on the grid container.

### 10. GEN37-4 blockquote attribution is correct (no synthesized direct quote)

1. Find the GEN37-4 `<blockquote>` block in the HTML section.
2. **Expected:** The `<footer class="card-opinion__author">` cites `Mayer, J., Alberdi y su tiempo` AND `Halperin Donghi, T., De la revolución de independencia...` — attributed paraphrase, not presented as a verbatim literal quote from either author.

## Edge Cases

### Flag literals in descriptive/checklist text

1. Search with case-insensitive grep for `verificar`, `pendiente`, `TBD` individually: `grep -i "verificar\|pendiente\|TBD" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** The only matches (if any) should be the word "verificar" used as a verb in Spanish prose (e.g., "para verificar la integridad"), NOT as a bracketed flag `[VERIFICAR]`. The bracketed form must be absent.

### data-certeza accent variant on GEN37-4

1. Run: `grep 'data-certeza' .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
2. **Expected:** GEN37-4 uses `data-certeza="opinión"` (with accent). The other four use `data-certeza="hecho"`. No card uses the unaccented `"opinion"`.

### Echeverría absent from GEN37-3 inaugural act

1. Read the GEN37-3 excerpt and HTML.
2. **Expected:** The text states explicitly that Echeverría was NOT present at the inaugural act, but sent *La Cautiva* to be read. Both the absence and the symbolic presence via the text must be mentioned.

## Failure Signals

- `grep -c "^## GEN37-" S01-CONTENT-DRAFT.md` returns anything other than `5` → a card is missing or an ID is malformed.
- Any match from the `[VERIFICAR]`/`[PENDIENTE]`/`TBD` grep → unresolved research flag remains in the draft.
- GEN37-4 HTML has no `<blockquote>` → card was written as card-hecho instead of card-opinion.
- GEN37-3 has no `card-nota-certeza` aside → the date-dispute note was omitted.
- `Metadata de inserción` section missing → S02 has no reliable insertion target.

## Not Proven By This UAT

- Whether the insertion point (after line 1439) is still accurate in the current state of `index.html` — line numbers may have shifted. S02 must verify this before splicing.
- Whether `card-nota-certeza` as an `<aside>` renders correctly in the browser without additional CSS — visual rendering is S02's concern.
- Whether `data-certeza` count in index.html rises from 93 to 98 after integration — that is an S02 verification.
- Historical accuracy of the facts — the research phase (S01-RESEARCH.md) carried that burden; this UAT checks structure and completeness of the draft artifact.

## Notes for Tester

The draft checklist at the end of S01-CONTENT-DRAFT.md is a human-readable summary of what was verified during authoring — it is not a substitute for running the grep checks above. Always run the grep commands directly against the file.

GEN37-4 is deliberately an attributed paraphrase, not a direct quote. The blockquote text is a historiographic synthesis attributed to Mayer and Halperin Donghi — this is correct per the Alberdi Quote Verification Protocol and should not be "upgraded" to a direct quote without verified pagination from those works.

The `card-nota-certeza` on GEN37-3 uses an `<aside>` element (block-level), not the inline `<span>` pattern seen in M004. This is an intentional design choice — the date dispute is substantive. S02 may need a few lines of CSS.

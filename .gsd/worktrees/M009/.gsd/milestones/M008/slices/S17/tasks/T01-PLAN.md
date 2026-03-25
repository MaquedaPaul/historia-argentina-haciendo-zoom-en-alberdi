# T01: Author S17-CONTENT-DRAFT.md — necessity argument card

## Description

Author the content draft for the single S17-1 card: the "historical necessity" interpretive argument for Rosas. This card asks whether Argentina would have collapsed into civil war without Rosas — distinct from S14-3's general regime debate and S22's future foreign-policy sovereignty argument.

The draft must include prose, sources, and the verbatim T02 Recipe HTML block (with all non-ASCII encoded as HTML entities). This is the high-risk task — all historical accuracy, certeza classification, and scope-boundary enforcement happens here before index.html is touched.

## Steps

1. **Read the existing cards to map what is already covered and enforce scope boundary:**
   - Run `grep -n 'data-id="S14-3"\|data-id="S15-\|data-id="S16-' index.html` to locate existing cards
   - Read S14-3 (general regime debate), S16-3 (repression scale) to confirm what NOT to repeat
   - Key boundary: S17 = internal order / chaos counterfactual only. Foreign-policy sovereignty / bloqueos → S22. General "era tirano vs. caudillo popular" polarity → already in S14-3, do not repeat.

2. **Confirm the append marker position:**
   - `grep -n 'cards will be appended here' index.html` — note the current line number (≈1850, but verify)

3. **Write `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md`** with:

   ### Card S17-1
   - **Type:** `card-opinion` | `data-certeza="opinión"` | stagger: `0ms` | no image
   - **Year label:** `debate historiográfico`
   - **Title:** `¿Era Rosas un mal necesario? El argumento de la necesidad histórica`
   - **Excerpt prose (2–4 sentences):** Frame the counterfactual. Use the 1820–1829 period as the baseline for near-continuous civil war: Cepeda 1820, eight Buenos Aires governors in one year, anarchic fragmentation of provincial power, fusilamiento de Dorrego (December 1828). Rosas brought relative internal stability from 1829–~1845. The historiographic question: was *that specific stability* indispensable, or could another strong authority have achieved it?
   - **`card-nota-historiografica` — two positions:**
     1. **Revisionista** (Irazusta, Rosa): Rosas was indispensable — no other figure commanded the coalition of estancieros + interior caudillos + clases populares rurales simultaneously; the liberal/unitario project had already demonstrated (1820–1829) that it could not maintain order; without Rosas the country would have dissolved or fallen to foreign creditors. Primary citation: Julio Irazusta, *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941.
     2. **Liberal / síntesis** (Halperín Donghi, Lynch): Rosas was historically necessary for a *specific window* (1829–~1845) but became an obstacle to national organization in his final decade; Urquiza's achievement of the 1853 Constitution within 18 months of Caseros demonstrates the country did not require Rosas personally — what it required was strong authority, and Rosas monopolized that role rather than enabling institutional succession. Primary citations: Tulio Halperín Donghi, *De la revolución de independencia a la confederación rosista*, Paidós, Buenos Aires, 1972; John Lynch, *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 10.
   - **Footer cite:** Irazusta 1941; Halperín Donghi 1972; Lynch 1981

4. **T02 Recipe HTML block** — include the verbatim HTML for the splice, with **all non-ASCII characters encoded as HTML entities**:
   - á → `&#xE1;`, é → `&#xE9;`, í → `&#xED;`, ó → `&#xF3;`, ú → `&#xFA;`, ñ → `&#xF1;`, ü → `&#xFC;`, ¿ → `&#xBF;`, ¡ → `&#xA1;`, — (em dash) → `&#x2014;`, « → `&#xAB;`, » → `&#xBB;`
   - Stagger: `style="--reveal-delay: 0ms"`
   - No `<figure>` / no `<img>` block
   - Include `<!-- S17-1: Rosas — necesidad histórica -->` HTML comment above the card div
   - Card structure: `<article class="event-card card-opinion reveal reveal-fade" data-certeza="opinión" data-id="S17-1" style="--reveal-delay: 0ms">`
   - Follow the exact card-opinion template from S14-3 or S16-3 (blockquote optional; if used, mark as paraphrase, not direct quote per D050 pattern)
   - `<p class="card-nota-historiografica">` inside card body with `<strong>Nota historiogr&#xE1;fica:</strong>` prefix
   - Footer: `<footer class="card-source"><cite>` with the three sources

5. **Verify draft is non-empty:**
   ```bash
   test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md && echo DRAFT_OK
   ```

## Must-Haves

- Draft file exists and is non-empty
- T02 Recipe HTML block present in draft
- Two-position `card-nota-historiografica` with source attribution per position
- No bloqueos, sovereignty, or foreign-policy content (that is S22)
- No repetition of S14-3's general "tiranía vs. caudillo popular" framing — S17's angle is the *counterfactual necessity* argument specifically
- All non-ASCII in the Recipe block encoded as HTML entities
- `data-certeza="opinión"` (with accent — consistent with other opinión cards in this period)

## Verification

```bash
test -s .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md && echo DRAFT_OK
grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md  # → ≥1
grep -c 'Irazusta' .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md    # → ≥1
grep -c 'Lynch' .gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md       # → ≥1
```

## Inputs

- `index.html` — read-only; inspect S14-3 and S16-3 cards to understand scope boundary and card structure template
- `.gsd/milestones/M008/slices/S17/S17-RESEARCH.md` — primary reference for card content and historiographic positions
- `.gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` — reference for T02 Recipe HTML block format and entity encoding pattern

## Expected Output

- `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` created with:
  - Prose summary of the card
  - Two-position historiographic note with source attributions
  - T02 Recipe HTML block (verbatim, entity-encoded)

## Observability Impact

**Signals that change when T01 completes:**
- `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` transitions from non-existent to non-empty — `test -s` check passes
- `grep -c 'T02 Recipe' S17-CONTENT-DRAFT.md` returns ≥1 — the splice block is present and ready for T02 to consume

**How a future agent inspects this task:**
- Read `S17-CONTENT-DRAFT.md` directly to review prose quality, scope compliance, and entity encoding
- `grep 'data-certeza' S17-CONTENT-DRAFT.md` — confirms `opini&#xF3;n` encoding in the Recipe block
- `grep 'card-nota-historiografica' S17-CONTENT-DRAFT.md` — confirms the nota block is present in the Recipe
- `grep -E 'Irazusta|Lynch|Halper' S17-CONTENT-DRAFT.md` — confirms all three required source citations are present

**Failure state:**
- If the file is empty or missing: T01 was interrupted before the write completed — re-run T01 from scratch; index.html is not affected
- If entity encoding is wrong (e.g., raw accented characters in the Recipe block): T02's Node.js splice may corrupt the characters on Windows; fix the Recipe block entities before running T02
- T01 is index.html-safe — it never modifies `index.html`; all failure modes are isolated to the draft file


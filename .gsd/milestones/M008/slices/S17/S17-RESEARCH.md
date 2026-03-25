# S17 — ¿Sin Rosas, Argentina sería un caos? — Research

**Date:** 2026-03-23

## Summary

S17 is a single-card interpretive block: the "historical necessity" argument for Rosas. The roadmap calls for "Card de interpretación con ambas posiciones" — one card combining prose summary with a `card-nota-historiografica`, `data-certeza="opinión"`, no image (consistent with S15-2 and S16-3 interpretation-card pattern). The content is well-defined in `S17-CONTEXT.md` and requires no external research — the historiographic positions are documented in sources already cited across S09–S16.

The slice is **light-research territory**: same two-task pattern (T01 content draft → T02 splice) established in S09–S16, same append-marker mechanism, same HTML entity encoding, same Node.js one-liner splice. No new CSS, JS, or architecture.

**Baseline state confirmed:** 79 `data-certeza` cards. After S17: expected 80. Append marker at line 1850 (confirmed by grep).

## Recommendation

Author one `card-opinion` with `data-certeza="opinión"` containing:
- A short prose excerpt framing the counterfactual question
- A `card-nota-historiografica` with **two positions** (revisionista + liberal/síntesis contemporánea) — the two-position format is correct here because the S17 debate is narrower than the scale debate in S16-3; there is no sufficiently distinct "third position" that isn't just the synthesis restating the liberal argument with more nuance
- No image — consistent with S14-3 ("¿Qué fue el régimen rosista?"), S15-2 (autorship debate), S16-3 (scale debate), all of which use no image

Follow the exact T01 → T02 pipeline from prior slices.

## Implementation Landscape

### Key Files

- `index.html` — single target file; S17 card inserted before append marker `<!-- S10–S24 cards will be appended here by subsequent slices -->` (line 1850 as of post-S16 state)
- `.gsd/milestones/M008/slices/S17/S17-CONTENT-DRAFT.md` — to be created in T01; provides prose, sources, and the verbatim T02 Recipe HTML block with full entity encoding
- `C:/tmp/s17-cards.html` — temp splice file for T02
- `C:/tmp/index.html.bak-s17` — pre-splice recovery backup

### Scope Boundaries (critical — prevent duplication)

S17 must be clearly differentiated from adjacent cards:

| Card | What it covers | S17 must NOT repeat |
|------|----------------|---------------------|
| S14-3 | General "what was the rosista regime?" debate (liberal vs revisionista, three frames: tiranía / hegemonía de clase / populismo premoderno) | The general polarity — "era tirano vs. era caudillo popular" |
| S16-3 | Scale of Mazorca repression (how many victims, systematic vs. paramilitary) | The repression scale debate |
| S22 (future) | Rosas as guarantor of external sovereignty (bloqueos francés e inglés, resistance to European intervention) | The sovereignty/foreign-policy argument |

**S17's specific scope:** Was the *internal order* Rosas provided historically necessary? Would Argentina have dissolved into civil war without him? This is the "orden interno necesario" argument — distinct from S22's foreign-policy sovereignty argument.

### Card Design

**Card S17-1:**
- Type: `card-opinion` | `data-certeza="opinión"` | stagger: `0ms`
- No image
- Year label: `debate historiográfico`
- Title: `¿Era Rosas un mal necesario? El argumento de la necesidad histórica`
- Excerpt: Frame the counterfactual — the 1820–1829 period of near-continuous civil war (Cepeda 1820, eight Buenos Aires governors in one year, fusilamiento de Dorrego 1828) as the baseline; Rosas brought relative stability; the question is whether that stability required *him* specifically or just some strong authority
- `card-nota-historiografica` — two positions:
  1. **Revisionista** (Irazusta, Rosa): Rosas was indispensable — no other figure had the coalition (estancieros + caudillos del interior + clases populares rurales); without him the liberal/unitario project would have fragmented the country or surrendered it to foreign creditors; cite Irazusta, *Vida política de Juan Manuel de Rosas*, 1941
  2. **Liberal / síntesis** (Halperín Donghi, Lynch): Rosas was necessary for a *specific window* (1829–~1845) but became an obstacle to national organization in his final years; Urquiza's rapid achievement of the 1853 Constitution within 18 months of Caseros shows the country did not require Rosas personally; cite Halperín Donghi, *De la revolución de independencia a la confederación rosista*, Paidós, 1972; Lynch, *Argentine Dictator*, Oxford, 1981, cap. 10
- Footer cite: Irazusta 1941, Halperín Donghi 1972, Lynch 1981

### Build Order

1. **T01** — Author `S17-CONTENT-DRAFT.md` with prose, sources, and T02 Recipe HTML block (all non-ASCII → HTML entities in the Recipe block)
2. **T02** — Splice using Node.js one-liner; insert before append marker using ASCII-only substring `'cards will be appended here by subsequent slices'`

### Verification Approach

```bash
grep -c 'data-certeza' index.html          # → 80 (was 79, +1)
grep -c 'data-id="S17-' index.html        # → 1
grep -c 'data-id="S17-1"' index.html      # → 1
grep -c 'cards will be appended here' index.html  # → 1 (marker intact)
git diff --name-only HEAD -- styles.css app.js    # → (empty)
test -s C:/tmp/index.html.bak-s17 && echo BACKUP_OK
grep -c 'card-nota-historiografica' index.html    # → 6 (was 5, +1)
test -s S17-CONTENT-DRAFT.md && echo DRAFT_OK
```

## Constraints

- Zero new CSS or JS — hard constraint. `card-opinion` with `data-certeza="opinión"` is the correct pattern (per D052: `data-certeza="debatido"` also uses `card-opinion` CSS class, but "opinión" is semantically more precise for S17 since it is an interpretive debate without a body of conflicting empirical claims — unlike S16-3 where the dispute is over irrecoverable numbers).
- All non-ASCII characters must be HTML-entity encoded in the T02 Recipe block (per D053 and patterns established in S15–S16).
- `C:/tmp/` for temp files on Windows (per KNOWLEDGE.md).
- ASCII-only marker search substring in Node.js one-liner (per KNOWLEDGE.md en-dash note).
- Stagger resets to 0ms per slice (single card → only 0ms needed).

## Common Pitfalls

- **Scope bleed into S22** — the "bloqueos" and "sovereignty" arguments belong in S22, not S17. S17 = internal order only.
- **Repeating S14-3's general polarity** — S17 must not just re-say "liberals called him tyrant, revisionists called him caudillo popular." S17's specific angle is the *counterfactual necessity* argument: would the country have fallen into chaos without him?
- **Using `data-certeza="debatido"` vs. `"opinión"`** — both work (same CSS class per D052). Prefer `"opinión"` here because S17 is a debate of *interpretations*, not of empirical facts with conflicting evidence (unlike S15-2's "who ordered the assassination?" which is a factual dispute).
- **Two-position vs. three-position nota** — two positions are sufficient for S17. The Halperín Donghi / Lynch synthesis position on this question *is* the liberal counter-argument (they agree Rosas was not indispensable long-term), so there is no distinct third voice.

# S11: Referentes de cada bando — Research

**Date:** 2026-03-22

## Summary

S11 is straightforward application of established M008 patterns. The slice adds two `card-hecho` cards to `#periodo-rosas`: one for the principal unitario leaders, one for the principal federal leaders. All biographical facts (dates, roles, key events) are well-documented in the sources already listed in M008-CONTEXT and S11-CONTEXT. No new historiographic debate is involved — certeza `hecho` throughout.

The only design question is image selection, since almost every major figure is either already used in the site or lacks a portrait on Wikimedia Commons. The **unitario card** can use the newly verified José María Paz 1887 homenaje portrait (500px, Public Domain), not yet used anywhere in the project. The **federal card** can use a new Urquiza oil painting (`Justo_José_de_Urquiza.jpg`, 1880, by Josefa Díaz y Clucellas) not yet used — Urquiza is the ideal federal representative for a card that must cover the full 1820–1852 arc because he was a caudillo throughout Rosas's era and the man who finally defeated him, making him the federal leader who bridges the period.

Two tasks: T01 produces a verified content draft (following the S10-CONTENT-DRAFT format); T02 performs mechanical HTML integration.

## Recommendation

Produce two `card-hecho` cards:
- **S11-1**: "Los líderes unitarios" — profiles Rivadavia, Lavalle, Paz, Florencio Varela, Juan Cruz Varela with dates and key roles. Image: José María Paz 1887 homenaje portrait.
- **S11-2**: "Los líderes federales" — profiles Rosas, Quiroga, López, Ramírez, Urquiza with dates and key roles. Image: Justo José de Urquiza oil painting (1880, new Urquiza variant not yet used).

Stagger delays reset to 0ms / 80ms per the established per-slice pattern.

## Implementation Landscape

### Key Files

- `index.html` — insert two S11 cards immediately before `<!-- S10–S24 cards will be appended here by subsequent slices -->` at line 1612 (verify with `grep -n 'cards will be appended here by subsequent slices' index.html`).
- `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` — create this file in T01 with verified card content following the exact structure of `S10-CONTENT-DRAFT.md`.

### Build Order

1. **T01**: Create `S11-CONTENT-DRAFT.md` with two card entries, image verification log, and T02 Recipe section. Verify all biographical facts against S11-CONTEXT and M008-CONTEXT. Confirm both image URLs via Wikimedia API. Verify neither image is in the used-image list.
2. **T02**: Locate the append marker (via grep, not line number), write cards to a temp file, splice into `index.html` via Node.js using the ASCII-only marker string `'cards will be appended here by subsequent slices'`.

### Verification Approach

```
grep -c 'data-certeza' index.html            # must be 67 (65 + 2)
grep -c 'S11-' index.html                    # must be 2
grep -n 'cards will be appended here by subsequent slices' index.html   # marker still present
git diff --name-only HEAD -- styles.css app.js  # must be empty
test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo OK
```

## Constraints

- **Zero CSS/JS changes** (D001 mandate). No new classes or JS needed — `card-hecho` with existing `reveal reveal-slide` is the correct template.
- **No image reuse**: already used portraits — Rosas (×2), Quiroga, Rivadavia, Pueyrredón, Dorrego, Sarmiento-Rawson, Bustos, LaValle, Sarmiento militar, Urquiza (×2 — `Justo_José_de_Urquiza_(retrato).jpg` and `Justo-jose-de-urquiza-983506.jpg`), Echeverría in SP3-3. The new oil painting `Justo_José_de_Urquiza.jpg` (pageid 182590987, 1880 by Josefa Díaz y Clucellas) is a **third distinct Urquiza image** not yet used.
- **Small-image rule** (KNOWLEDGE.md): Florencio Varela's daguerreotype is only 344px with no 500px thumb — do not use as the primary card image. Same for `General_José_M_Paz.jpg` (389px, no 500px thumb). Use the verified 500px homenaje variant `Jose_maria_paz_retrato_homenaje.jpg` for S11-1.
- **No synthesized direct quotes** — the card excerpts are narrative text (card-hecho), not opinion blockquotes; no quote verification needed.
- **Stagger delays reset to 0ms per slice** (established in S09, confirmed in S10). S11-1: `--reveal-delay: 0ms`; S11-2: `--reveal-delay: 80ms`.

## Image Verification Summary (pre-verified)

| Card | File | Thumb URL | License | Width | Status |
|------|------|-----------|---------|-------|--------|
| S11-1 | `Jose_maria_paz_retrato_homenaje.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Jose_maria_paz_retrato_homenaje.jpg/500px-Jose_maria_paz_retrato_homenaje.jpg` | Public domain | 500px ✅ | Not used — accepted |
| S11-2 | `Justo_José_de_Urquiza.jpg` | `https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Justo_Jos%C3%A9_de_Urquiza.jpg/500px-Justo_Jos%C3%A9_de_Urquiza.jpg` | Public domain | 500px ✅ | Not used (3rd Urquiza variant) — accepted |

**Rejected candidates:**
- `General_José_M_Paz.jpg` — 389px, no 500px thumb; per KNOWLEDGE.md small-image rule, use as fallback only.
- `Florencio_Varela.jpg` — 344px, no 500px thumb; too small.
- `Estanislao_López.jpg` — missing on Wikimedia Commons (confirmed in KNOWLEDGE.md / S10 research).
- `Francisco_Ramírez.jpg` — missing on Wikimedia Commons (confirmed by API + search).
- All two prior Urquiza variants — already in use elsewhere in the HTML.

**Urquiza as federal card representative rationale:** S11-2 must cover federal leaders across 1820–1852. Urquiza is the only federal leader with a fresh unused portrait who was active for the full period and whose story has an obvious narrative arc: he served faithfully under the federal banner until 1851, then defeated Rosas at Caseros in 1852. He is also the federal figure who appears most prominently in the S12-onwards slices (Pacto Federal, Caseros), making his introduction here purposeful. The 1880 oil painting is by Josefa Díaz y Clucellas — a notable Argentine painter — housed at the Museo Histórico Provincial Brigadier General Estanislao López, giving it a connection to the López figure who otherwise has no portrait available.

## Open Risks

- **Urquiza already introduced in M003**: There is a Urquiza card in the existing `#periodo-revolucion` section (at the Caseros sub-period). The S11-2 card must introduce him in his role as a *federal caudillo* (pre-1851), not as the man who defeated Rosas — that framing belongs to S13/S14. The card should cover 1820–1851 and note in a single sentence that he later changed sides, without duplicating the Caseros narrative.
- **López and Ramírez have no portraits**: the prose in S11-2 must be authoritative on both figures even without dedicated images. The Urquiza oil painting covers the federal card visually; the text does the work for López and Ramírez.
- **Line number drift**: the append marker is at line 1612 as of S10 completion. If any other edit touched `index.html` between S10 and S11, the line number may have shifted. Always use `grep -n 'cards will be appended here by subsequent slices'` — never hardcode the line number.

## Sources

S11 uses sources already established in M008-CONTEXT and S11-CONTEXT:
- Sarmiento, D. F., *Facundo*, 1845 (Quiroga profile)
- Lynch, J., *Argentine Dictator*, Oxford, 1981 (Rosas profile)
- Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972 (Lavalle, Paz, Rivadavia)
- Zinny, A., *Historia de los gobernadores de las provincias argentinas*, 1882 (López, Ramírez, Urquiza dates and roles)
- Goldman, N. (dir.), *Nueva Historia Argentina*, t. III, Sudamericana, 1998 (broader context)

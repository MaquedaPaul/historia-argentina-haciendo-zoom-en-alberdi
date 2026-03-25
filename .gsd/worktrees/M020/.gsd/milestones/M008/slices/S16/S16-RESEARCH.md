# S16 — La represión rosista — ¿perseguía y mataba? — Research

**Date:** 2026-03-23

## Summary

S16 is a content slice that follows the same T01 (content draft) → T02 (Node.js splice) pipeline established by S13–S15. The work is well-understood: write ~3 cards covering the Mazorca repression apparatus, the color punzó as political coercion, and the exiles — with certeza split between documented facts and contested scale — then splice them before the append marker at line 1801 in `index.html`.

The key constraint is SP3-2: there is already a card in `index.html` titled "La Sociedad Popular Restauradora y La Mazorca" (lines 1842–1868, pre-existing from an earlier milestone). S16 must **deepen and source** the Mazorca thread, not repeat it. The three S16 cards must cover distinct territory: (1) the mechanics and documented acts of the Mazorca as a political terror instrument (card-hecho), (2) the exiles and the color punzó as coercion system (card-hecho), and (3) the scale debate — revisionist vs. liberal historiography on how many victims, how systematic (card-opinion / data-certeza="debatido"). This three-card structure avoids all content already in SP3-2 and SP3-3 (the exilio de la Generación del 37 card at lines 1869+).

The existing S14-3 `card-nota-historiografica` already seeds the liberal/revisionist polarity for the entire S15–S19 chain; S16-3's debate card can reference that framing without repeating it.

## Recommendation

Follow the exact pattern from S15:
- **T01**: Author `S16-CONTENT-DRAFT.md` with three-card content prose, HTML entity encoding throughout the Recipe block, and verified sources (Lynch 1981 is the primary anchor; Sarmiento *Facundo* 1845 for liberal testimony; Irazusta/Rosa for revisionist contextualization). Include a `card-nota-historiografica` paragraph in S16-3.
- **T02**: Mechanical Node.js splice before the append marker using the ASCII-only substring `'cards will be appended here by subsequent slices'`. Stagger delays reset to 0ms / 80ms / 160ms for S16's own card group.

Do NOT touch `styles.css` or `app.js`. Zero new CSS or JS.

## Implementation Landscape

### Key Files

- `index.html` — target file; append marker at line 1801 (`<!-- S10–S24 cards will be appended here by subsequent slices -->`); current `data-certeza` count = 76; S16 will add 3 cards → expected count 79.
- `.gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` — to be created in T01.
- `C:/tmp/s16-cards.html` — temp file for T02 splice (not committed).

### Content Scope — What NOT to Duplicate

| Already in index.html | Location | Notes |
|----------------------|----------|-------|
| SP3-2: La Mazorca overview | lines 1842–1868 | Mentions 1839–1842 terror, assassination of Manuel Vicente Maza (27 Jun 1839), Lynch's caveat about exaggeration, closure of the Salón Literario 1838 |
| SP3-3: Exilio Generación del 37 | lines 1869–1900+ | Echeverría portrait, Alberdi quote from Valparaíso 1842 exile |
| S14-3: Debate framing seed | line 1753 | Names liberal and revisionist schools by name; S16-3 can reference it, not repeat it |

### Three-Card Structure for S16

**S16-1** (`card-hecho`, `data-certeza="hecho"`, 0ms stagger):
- Focus: The Mazorca as a documented political terror apparatus — distinct from SP3-2's broad overview. Cover: structure (Sociedad Popular Restauradora → Mazorca as enforcement branch), the "degüello" as signature method, documented individual cases beyond Maza (Juan Bautista Peña, Agustín Maza — younger son of Manuel Vicente Maza; the 1840 "Noche de los cuchillos"), and the obligatory color punzó system and its enforcement mechanisms.
- Image: `Domingo_Faustino_Sarmiento.jpg` (confirmed available on Wikimedia Commons, PD, 500px thumb OK). Sarmiento is the primary witness-source for the repression and this visual grounds the card in a key source. Alternatively, the *Facundo* book cover (`Civilización_y_Barbarie_Sarmiento_portada.jpg`, also confirmed available, 500px thumb OK) — the book that documented the terror in print — is the better choice because it is primary-source documentary rather than a portrait (per KNOWLEDGE.md photographic vs. artistic distinction for contested-history cards).
- Sources: Lynch, *Argentine Dictator*, 1981 (cap. 6–7); Sarmiento, *Facundo*, 1845; Saldías, *Historia de la Confederación Argentina*, 1892, t. II.

**S16-2** (`card-hecho`, `data-certeza="hecho"`, 80ms stagger):
- Focus: The exiles as documented repression outcome — distinct from SP3-3 which covers ideas-in-exile. This card covers the **mechanics of exile**: who was expelled or fled under threat (Alberdi, Echeverría, López, Varela brothers), the pattern of property confiscation, the death of those who stayed (Florencio Varela assassinated in Montevideo 1848, by a Mazorca agent according to the liberal account). The color punzó as daily coercion system — who was required to wear it, what happened if you didn't.
- Image: No new image needed (or reuse Echeverría portrait is out since SP3-3 uses it). Use the *Facundo* cover for S16-1 and leave S16-2 without an image — consistent with S14-3 and S15-2 (historiographic/context cards sometimes have no image). Alternatively, search for a period illustration of exiles crossing the river — but no confirmed image exists. **Safe default: no image on S16-2.**
- Sources: Lynch, 1981; Goldman, N. y Salvatore, R. (comps.), *Caudillismos rioplatenses*, EUDEBA, 1998; Zinny, A., *Historia de los gobernadores*, 1882.

**S16-3** (`card-opinion`, `data-certeza="debatido"`, 160ms stagger):
- Focus: Scale and systematicity debate. NOT a repeat of the general liberal/revisionist polarity (already in S14-3) — this is the specific sub-debate about **how many victims** and **how organized** the repression was.
  - Liberal estimate: hundreds to low thousands killed, repression systematic and state-directed.
  - Revisionist contextualization (Irazusta, Rosa): figures inflated by exilic propaganda; much violence was inter-factional, not state-organized; Rosas governed with less total violence than the wars that preceded him (1828–1829 civil war).
  - Contemporary synthesis (Lynch, Halperín Donghi): the terror was real and functional as a political tool; exact numbers are unrecoverable due to absence of official records; "hundreds" is the defensible range.
- Requires `<p class="card-nota-historiografica">` with explicit source attribution on each position.
- No image.
- Sources: Lynch, 1981, cap. 7; Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941; Rosa, J. M., *Historia Argentina*, t. IV–V, Oriente, 1964; Halperín Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972.

### Image Decision

| Card | Image | URL | License | Status |
|------|-------|-----|---------|--------|
| S16-1 | *Facundo* portada (1845 1st ed.) | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Civilizaci%C3%B3n_y_Barbarie_Sarmiento_portada.jpg/500px-Civilizaci%C3%B3n_y_Barbarie_Sarmiento_portada.jpg` | PD (1845 print, >170 years) | ✅ confirmed |
| S16-2 | None | — | — | No image; consistent with context cards in S14-3, S15-2 |
| S16-3 | None | — | — | No image; historiographic debate card |

The *Facundo* cover (1845 first edition) is an ideal choice for S16-1: it is the primary document where Rosas's repression was systematically described, it is visually distinct from all images already used in the S13–S15 cards (which are portraits and battle paintings), and it is unambiguously public domain.

### Build Order

1. **T01 first**: Author `S16-CONTENT-DRAFT.md` with full prose for all three cards, verified sources, and the complete T02 Recipe HTML block (all non-ASCII entity-encoded). Lock in the three-card scope, certeza assignments, and the card-nota-historiografica content. This is the high-risk task — historical accuracy and scope decisions happen here.
2. **T02 second**: Mechanical splice — create backup, write temp HTML from Recipe block, run Node.js splice. Low-risk if T01 is clean.

### Verification Approach

```bash
# After T02 splice:
grep -c 'data-certeza' index.html           # Expected: 79 (was 76)
grep -c 'data-id="S16-' index.html          # Expected: 3
grep -c 'cards will be appended here' index.html  # Expected: 1 (marker still present)
git diff --name-only HEAD -- styles.css app.js    # Expected: (empty)
test -s .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK  # Expected: OK
```

## Constraints

- **Zero new CSS or JS** — hard constraint for the entire M008 milestone.
- **SP3-2 already covers the Mazorca overview** — S16-1 must go deeper on mechanics and documented cases, not repeat the 1839–1842 summary.
- **SP3-3 already covers the exilio from an ideas-in-exile angle** — S16-2 must cover the repression-mechanics angle (confiscation, assassination of exiles abroad, punzó enforcement), not repeat the intellectual/literary frame.
- **data-certeza="debatido"** for S16-3 uses `card-opinion` CSS class (same pattern as S14-3 and S15-2 — no `card-debatido` class exists, zero-new-CSS constraint preserved).
- **HTML entities for all non-ASCII in the Recipe block** — confirmed reliable pattern from S13–S15. Prose sections of the draft use native UTF-8.
- **Append marker uses ASCII-only substring** for Node.js `findIndex` — `'cards will be appended here by subsequent slices'` (per KNOWLEDGE.md rule, no en-dash in search string).
- **Stagger delays reset to 0ms for S16** — each slice's cards form their own visual group (per KNOWLEDGE.md multi-slice container pattern).

## Common Pitfalls

- **Scope creep into SP3-2/SP3-3 territory** — read those cards carefully before writing S16-1 and S16-2 content. The SP3-2 card already names the 1839–1842 period, the Maza assassination, and Lynch's caveat. S16-1 should go to named mechanics and documented events SP3-2 doesn't cover.
- **`data-certeza="debatido"` verification count** — this value is now used by S14-3 and S15-2. A `grep -c 'data-certeza'` count of 79 includes all values (hecho, opinion, debatido, rumor). Use `grep -c 'data-id="S16-'` for unambiguous S16 card count.
- **Florencio Varela assassination date** — Varela was assassinated in Montevideo on 20 March 1848. The liberal historiography attributes this to a Mazorca agent; the revisionists dispute this. Mark accordingly with certeza language in the card prose (not as a hard fact if attributing to Mazorca).

## Forward Intelligence for Planner

- The append marker is at line 1801 after S15. After S16 splice, it will shift to approximately line 1825–1840 (3 cards × ~8 lines each).
- S17 follows S16 and will continue splicing to the same marker using the identical Node.js pattern.
- The `card-nota-historiografica` in S16-3 can be brief — S14-3 already laid the groundwork for the liberal/revisionist polarity. S16-3 focuses the note on the scale/numbers sub-debate specifically.

---
estimated_steps: 4
estimated_files: 1
---

# T01: Author S16 content draft with three verified historical cards

**Slice:** S16 — La represión rosista — ¿perseguía y mataba?
**Milestone:** M008

## Description

Write `S16-CONTENT-DRAFT.md` with full historical prose for three cards covering (1) the Mazorca as a documented political terror apparatus with specific mechanics and named cases, (2) the exile mechanics and punzó coercion system, and (3) the historiographic debate over scale and systematicity. This is the high-risk task — all accuracy, scope, and certeza decisions are locked in here. T02 is purely mechanical.

**Critical scope constraints:**
- SP3-2 (already in `index.html`) covers the general 1839–1842 Mazorca overview, the Maza assassination (27 Jun 1839), Lynch's caveat, and Salón Literario closure. S16-1 must go deeper on **named mechanics and individual cases** SP3-2 doesn't cover.
- SP3-3 (already in `index.html`) covers the Generación del 37 from an ideas-in-exile angle (Echeverría, Alberdi quote). S16-2 must cover the **repression mechanics** angle (property confiscation, assassination of exiles abroad, punzó enforcement).
- S14-3 already names the liberal/revisionist polarity. S16-3's `card-nota-historiografica` focuses on the **scale/numbers sub-debate**, not the general polarity.

## Steps

1. **Read SP3-2 and SP3-3 from index.html** (`sed -n '1840,1910p' index.html`) to confirm exact content already present — this prevents duplication.

2. **Write the prose sections of the draft** (native UTF-8 Spanish is fine for prose sections above the Recipe block):
   - **S16-1** (`card-hecho`, `data-certeza="hecho"`, stagger 0ms): Mazorca mechanics and documented cases. Cover: organizational structure (Sociedad Popular Restauradora founded 1833, Mazorca as its enforcement arm), the "degüello" as signature execution method, documented cases beyond Maza: Juan Bautista Peña (killed 1840), Agustín Maza (younger son of Manuel Vicente, killed in same period), the "Noche de los cuchillos" (July 1840 wave of killings during unitario uprising), the obligatory color punzó decree and its enforcement (fines, beatings, forced wearing). Image: *Facundo* portada (first edition 1845) at `https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Civilizaci%C3%B3n_y_Barbarie_Sarmiento_portada.jpg/500px-Civilizaci%C3%B3n_y_Barbarie_Sarmiento_portada.jpg` (PD, 1845 print). Sources: Lynch (1981 cap. 6–7), Sarmiento *Facundo* (1845), Saldías t. II (1892).
   - **S16-2** (`card-hecho`, `data-certeza="hecho"`, stagger 80ms): Exile mechanics. Cover: who fled (Alberdi, Echeverría, Juan María Gutiérrez, Juan Cruz Varela, Florencio Varela), the pattern of property confiscation and loss of civil status, the assassination of Florencio Varela in Montevideo (20 March 1848 — note in prose that liberal historiography attributes this to a Mazorca agent while revisionists dispute the direct link), the punzó as daily-life coercion (required in public spaces, on doors, on documents). No image. Sources: Lynch (1981), Goldman/Salvatore (1998), Zinny (1882).
   - **S16-3** (`card-opinion`, `data-certeza="debatido"`, stagger 160ms): Scale debate. Include `<p class="card-nota-historiografica">` naming: liberal estimate (hundreds to low thousands killed, systematic state direction — Sarmiento 1845; Mitre), revisionist contextualization (figures inflated by exilic propaganda, much violence inter-factional not state-organized — Irazusta *Vida política de Rosas* 1941; Rosa *Historia Argentina* t. IV–V 1964), contemporary synthesis (terror real and functional, exact numbers unrecoverable, "hundreds" is defensible — Lynch 1981 cap. 7; Halperín Donghi *De la revolución de independencia* 1972). No image. Sources: all four above.

3. **Write the T02 Recipe HTML block** at the bottom of the draft. This block must use HTML entities for ALL non-ASCII characters (ó → `&#xF3;`, é → `&#xE9;`, á → `&#xE1;`, í → `&#xED;`, ú → `&#xFA;`, ñ → `&#xF1;`, ¿ → `&#xBF;`, ü → `&#xFC;`, « → `&#xAB;`, » → `&#xBB;`, — → `&#x2014;`, ¡ → `&#xA1;`). Write all three cards in order: S16-1 (with image), S16-2 (no image), S16-3 (no image, with card-nota-historiografica paragraph). Each card uses `data-id="S16-N"` attribute and `<!-- S16-N: ... -->` HTML comment.

4. **Verify the draft** with a grep count check before finishing.

## Must-Haves

- [ ] Three card sections (`## Tarjeta S16-1`, `## Tarjeta S16-2`, `## Tarjeta S16-3`) in the prose section.
- [ ] S16-1 covers Mazorca structure + degüello + named cases (Peña, Agustín Maza, Noche de los cuchillos) + punzó enforcement — does NOT repeat SP3-2 general overview.
- [ ] S16-2 covers exile mechanics + confiscation + Florencio Varela assassination (with attribution note) + daily punzó — does NOT repeat SP3-3 ideas-in-exile frame.
- [ ] S16-3 has `<p class="card-nota-historiografica">` with all three historiographic positions named by author and source.
- [ ] T02 Recipe HTML block present, all non-ASCII entity-encoded.
- [ ] S16-1 image uses the *Facundo* portada URL (confirmed PD).
- [ ] certeza values: S16-1 and S16-2 = `hecho`; S16-3 = `debatido` (uses `card-opinion` CSS class).
- [ ] Stagger delays: S16-1 = 0ms, S16-2 = 80ms, S16-3 = 160ms.

## Verification

- `grep -c "^## Tarjeta S16-" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` returns 3
- `grep -q "T02 Recipe" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK`
- `grep -q "card-nota-historiografica" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK`
- `grep -q "Facundo" .gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md && echo OK`

## Inputs

- `index.html` lines 1840–1910 — read SP3-2 and SP3-3 to confirm exact content already present before writing S16 prose (prevents duplication).
- S14-3 at line 1753 — the existing historiographic seed note; S16-3 must complement it (scale sub-debate), not repeat the general polarity.
- S15 pattern — two-card draft with HTML entities in Recipe block, confirmed reliable in S15-T01.
- Sources: Lynch (1981), Sarmiento *Facundo* (1845), Saldías t. II (1892), Goldman/Salvatore (1998), Irazusta (1941), Rosa t. IV–V (1964), Halperín Donghi (1972).

## Expected Output

- `.gsd/milestones/M008/slices/S16/S16-CONTENT-DRAFT.md` — created, non-empty, with 3 prose card sections and a verbatim T02 Recipe HTML block ready for mechanical splice in T02.

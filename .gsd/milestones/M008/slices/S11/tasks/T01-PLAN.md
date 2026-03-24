---
estimated_steps: 4
estimated_files: 1
---

# T01: Research and write S11 content draft with verified images

**Slice:** S11 — Referentes de cada bando
**Milestone:** M008

## Description

Produce `S11-CONTENT-DRAFT.md` — a fully verified content draft with 2 card entries covering the principal unitario and federal leaders of the 1820–1852 period. This is the high-risk task: historical accuracy, certeza classification, and image sourcing happen here before any HTML is touched.

The two cards:
1. **S11-1: Los líderes unitarios** — profiles of Rivadavia (1780–1845, primer presidente 1826–1827), Lavalle (1797–1841, fusilador de Dorrego, exilio), Paz (1791–1854, victorioso en La Tablada 1829 y Oncativo 1830, capturado 1831), Florencio Varela (1807–1848, periodista, asesinado en Montevideo), and Juan Cruz Varela (1794–1839, poeta y político). Certeza: `hecho` — dates and roles documented in standard sources.
2. **S11-2: Los líderes federales** — profiles of Rosas (1793–1877, gobernador 1829–1832 y 1835–1852), Quiroga (ca. 1788–1835, caudillo riojano, asesinado en Barranco Yaco), López (1786–1838, gobernador de Santa Fe), Ramírez (1786–1821, caudillo entrerriano, victorioso en Cepeda 1820), and Urquiza (1801–1870, gobernador de Entre Ríos, federal hasta 1851 — note that he later defeated Rosas at Caseros, but do not develop that narrative here; it belongs to S13/S14). Certeza: `hecho`.

Both cards are `card-hecho` — no historiographic debate, no `card-opinion` or `card-nota-historiografica` needed. All biographical facts are well-documented.

## Steps

1. **Read the S10 content draft** (`.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md`) to confirm the structural format — copy the card skeleton exactly (Image Verification Log table format, card entry sections, T02 Recipe section).
2. **Verify both images via the Wikimedia API** — for each candidate, hit `https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=500&format=json`. Confirm `thumburl` exists with `/500px-` in the path. Confirm license is public domain. Record results in the Image Verification Log.
   - S11-1: `Jose_maria_paz_retrato_homenaje.jpg` (the 1887 homenaje portrait; pre-verified in S11-RESEARCH.md but re-confirm)
   - S11-2: `Justo_José_de_Urquiza.jpg` (the 1880 oil painting by Josefa Díaz y Clucellas, pageid 182590987 — NOT the `(retrato)` or `983506` variants, both already in use). URL-encode the filename for the API: `Justo_Jos%C3%A9_de_Urquiza.jpg`.
3. **Write the two card entries** in `S11-CONTENT-DRAFT.md`. Each entry includes: title, year display, certeza, excerpt (3–5 sentences covering all named leaders), ≥2 sources, cite reference text, and image info (filename, verified 500px thumb URL, alt text, license). The S11-1 excerpt must cross-reference S10 content by naming which leaders *embodied* the programs described there — without restating S10's content. The S11-2 card must introduce Urquiza as a federal caudillo (1820–1851) and may note in one sentence that he later crossed sides to defeat Rosas, but must not develop the Caseros narrative.
4. **Append the Image Verification Log and T02 Recipe section** — the Recipe section lists all HTML attributes for both cards ready for mechanical copy-paste: card class, `data-certeza`, `style`, image src, alt text, year display, h3 title, excerpt text, and cite text.

## Must-Haves

- [ ] `S11-CONTENT-DRAFT.md` exists and is non-empty
- [ ] Two card entries: `## Card S11-1` and `## Card S11-2`
- [ ] Both cards have certeza: `hecho`
- [ ] Each card has ≥2 cited sources
- [ ] S11-1 image (`Jose_maria_paz_retrato_homenaje.jpg`) confirmed via Wikimedia API: 500px thumb present, public domain
- [ ] S11-2 image (`Justo_José_de_Urquiza.jpg`, the 1880 oil painting) confirmed via Wikimedia API: 500px thumb present, public domain; NOT the `(retrato)` or `983506` variants
- [ ] Image Verification Log records both API verification attempts with thumburl and license result
- [ ] T02 Recipe section present with copy-paste-ready HTML attributes
- [ ] No synthesized direct quotes — `card-hecho` uses narrative prose only, no blockquotes
- [ ] S11-2 does not develop the Caseros narrative (belongs to S13/S14)

## Verification

```bash
test -s .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md && echo "file exists"
grep -c "^## Card S11-" .gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md
# expected: 2
```

## Inputs

- `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md` — structural template (Image Verification Log format, card skeleton, T02 Recipe section)
- `.gsd/milestones/M008/slices/S11/S11-CONTEXT.md` — biographical data for all 10 leaders (dates, roles, key events)
- `.gsd/milestones/M008/slices/S11/S11-RESEARCH.md` — pre-verified image candidates, rationale for Urquiza as federal card representative, constraints list
- **Already-used Wikimedia images (DO NOT REUSE any of these):**
  - `Bernardino_Rivadavia.jpg` — already used
  - `General_Don_Juan_LaValle.jpg` — used in S10-3
  - `Retrato_de_Juan_Manuel_de_Rosas.jpg` — used
  - `Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas,_1842.jpg` — used
  - `Facundo_Quiroga_por_García_del_Molino.jpg` — used
  - `Juan_Bautista_Bustos.jpg` — used in S10-2
  - `Retrato_de_Sarmiento_-_Benjamín_Franklin_Rawson.jpg` — used in S10-1
  - `Justo_José_de_Urquiza_(retrato).jpg` — used
  - `Justo-jose-de-urquiza-983506.jpg` — used
  - `Charton,_Ernest_-_Retrato_de_Esteban_Echeverría_-o.jpg` — used
  - `Domingo_Faustino_Sarmiento_militar.jpg` — used
- **Key sources for content:**
  - Sarmiento, D.F., *Facundo: Civilización y Barbarie*, 1845 — Quiroga profile
  - Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981 — Rosas profile
  - Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972 — Lavalle, Paz, Rivadavia
  - Zinny, A., *Historia de los gobernadores de las provincias argentinas*, 1882 — López, Ramírez, Urquiza dates and roles
  - Goldman, N. (dir.), *Nueva Historia Argentina*, t. III, Sudamericana, 1998 — broader context

## Expected Output

- `.gsd/milestones/M008/slices/S11/S11-CONTENT-DRAFT.md` — new file with 2 fully specified card entries, Image Verification Log, and T02 Recipe section ready for mechanical HTML integration

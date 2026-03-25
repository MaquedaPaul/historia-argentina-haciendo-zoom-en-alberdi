---
estimated_steps: 5
estimated_files: 1
---

# T01: Research and write S10 content draft with verified images

**Slice:** S10 — Ideas de unitarios y federales
**Milestone:** M008

## Description

Produce `S10-CONTENT-DRAFT.md` — a fully verified content draft with 3 card entries covering the ideological and economic programs of the unitario and federal bandos. This is the high-risk task: historical accuracy, certeza classification, and image sourcing happen here before any HTML is touched. The executor has authority to resolve image assignments during this task.

The three cards:
1. **S10-1: El programa unitario** — the actual policy positions (centralismo, libre comercio, educación pública, modelo europeo), with Rivadavia as political practitioner, Echeverría (*Dogma Socialista* 1837) and Sarmiento (*Facundo* 1845) as intellectual representatives. Certeza: `hecho` — these positions are documented in published primary texts.
2. **S10-2: El programa federal** — the actual positions (autonomía provincial, proteccionismo, reparto de rentas aduaneras, identidad criolla/gaucha), with the Pacto Federal de 1831 as the constitutional instrument and Rosas/Quiroga/López/Ramírez as key representatives. Certeza: `hecho` — documented in the Pacto Federal, Rosas correspondence, and provincial decrees.
3. **S10-3: El conflicto real — ¿quién controla la aduana?** — the economic substructure: aduana = ~80% of national income, libre comercio vs. proteccionismo as survival question for interior economies, the paradox of provincial autonomy + redistribution demands, Halperin Donghi's reframing (not civilización/barbarie but two competing models of Atlantic economic insertion). Certeza: `opinion` attributed to Halperin Donghi (and Lynch as secondary citation).

## Steps

1. **Read the S09 content draft** (`.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md`) to confirm the structural template — copy the card skeleton format exactly.
2. **Check used images** — the full list of already-used Wikimedia images in `index.html` is in the Inputs section. Verify your final image candidates are NOT on this list.
3. **Source and verify images via Wikimedia API** — for each candidate, hit `https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=500&format=json`. Confirm the `thumburl` field exists and that license is public domain or CC BY/BY-SA. Record the verified 500px thumb URL. Do NOT invent or guess thumb URLs.
4. **Write the draft** with all 3 card entries. Each entry needs: title, year display, certeza type, excerpt (3-5 sentences), ≥2 sources, cite reference text, image filename + verified thumb URL + license + alt text, and a framing note explaining how the card differs from SP2-2's 3-sentence summary. For S10-3 (opinion card), include the blockquote text attributed to Halperin Donghi and a `card-opinion__context` line.
5. **Append an Image Verification Log** at the end of the draft recording each candidate filename, API response status, thumb URL, and accept/reject decision.

## Must-Haves

- [ ] S10-CONTENT-DRAFT.md exists and is non-empty
- [ ] Three card entries: `## Card S10-1`, `## Card S10-2`, `## Card S10-3`
- [ ] Each card has certeza specified: S10-1=`hecho`, S10-2=`hecho`, S10-3=`opinion`
- [ ] Each card has ≥2 cited sources (S10-3 must cite Halperin Donghi with book title and year)
- [ ] Each card's image is verified via Wikimedia API — thumburl confirmed, license confirmed, NOT in the used-image list
- [ ] Each card has a framing note documenting how it goes deeper than SP2-2
- [ ] No direct quote is synthesized from secondary sources — paraphrases are labeled as such per the Alberdi Quote Verification Protocol
- [ ] S10-3 blockquote is attributed to a named historian, not presented as a direct primary-source quote from a historical figure

## Verification

```bash
test -s .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md && echo "file exists"
grep -c "^## Card S10-" .gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md
# expected: 3
```

## Inputs

- `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — structural template for the draft format (copy card skeleton)
- `.gsd/milestones/M008/slices/S10/S10-RESEARCH.md` — extensive pre-work: content notes for each card, image candidates, source list, constraints
- **Already-used Wikimedia images (DO NOT REUSE any of these):**
  - `Facundo_Quiroga_por_García_del_Molino.jpg` (SP2-2)
  - `Bernardino_Rivadavia.jpg` (SP2-3)
  - `Juan_Bautista_Alberdi.jpg` (SP2-4 and SP3-1 area)
  - `Aduana_de_Buenos_Aires.jpg` (S09-1)
  - `Juan_Martín_de_Pueyrredón.jpg` (S09-2)
  - `Manuel_Dorrego.jpg` (S09-3)
  - `Mapa_de_las_Provincias_Unidas_del_Río_de_la_Plata_en_1821.png` (S09-4)
  - `Raymond_Monvoisin_-_Retrato_de_Juan_Manuel_de_Rosas,_1842.jpg` (SP3-1)
  - `Retrato_de_Juan_Manuel_de_Rosas.jpg` (SP3-2)
  - `Charton,_Ernest_-_Retrato_de_Esteban_Echeverría_-o.jpg` (**ALREADY USED in SP3-3** — do NOT use for S10-1 or S10-2)
  - `Domingo_Faustino_Sarmiento_militar.jpg` (**ALREADY USED in SP3-4** — do NOT use)
  - `Domingo_Sarmiento.jpg` (**ALREADY USED** — do NOT use)
  - `Mariano_Moreno_1812.jpg`, `Justo_José_de_Urquiza_(retrato).jpg`, `Bartolomé_Mitre_(Manzoni,_1861).jpg`, `Flickr_-_bastique_-_Portrait_of_Juan_Bautista_Alberdi.jpg`, `Batalla_de_Caseros_3_Febrero_1852.jpg`, `San_Martín`, `Belgrano`, `Congreso_de_Tucumán`, `Cabildo_Abierto`, `Asamblea_del_año_XIII`, `Campaña_del_Desierto_1879`, `Julio_roca_retrato`, `Tuyuti1`, `Mapa_Argentina_vs_BuenosAires_1858`, `Mapa_Virreinato`, `Karte-Indianer-Patagoniens`, `Buenos_Aires_shortly_after_its_foundation`, etc.

- **Recommended image candidates to investigate** (none confirmed in use — verify via API before committing):
  - **S10-1 (unitario program):** `Retrato_de_Sarmiento_-_Benjamín_Franklin_Rawson.jpg` — different Sarmiento portrait by Rawson; research doc confirmed this is NOT in use, 500px thumb at `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg/500px-Retrato_de_Sarmiento_-_Benjam%C3%ADn_Franklin_Rawson.jpg`. Verify via API.
  - **S10-2 (federal program):** Search Wikimedia for an unused federal figure — options: Estanislao López (Santa Fe caudillo), Juan Bautista Bustos (Córdoba caudillo), or a period illustration of gaucho/federation iconography. Try `list=search&srnamespace=6&srsearch=Estanislao+Lopez+retrato` and `srsearch=Juan+Bautista+Bustos+retrato`. If no usable result, try `srsearch=Pacto+Federal+1831` for a document image.
  - **S10-3 (economic/aduana conflict):** `General_Don_Juan_LaValle.jpg` — Lavalle as unitario general, symbol of the military dimension of the conflict; public domain, research doc confirmed 500px available. Verify via API: `https://en.wikipedia.org/w/api.php?action=query&titles=File:General_Don_Juan_LaValle.jpg&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=500&format=json`.

- **Key sources for content:**
  - Sarmiento, D.F., *Facundo: Civilización y Barbarie*, 1845 — canonical unitario framing
  - Echeverría, E., *Dogma Socialista de la Asociación de Mayo*, 1837/1846 — Gen. del 37 program
  - Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972 — economic reframing (cite as Paidós, 1972 or 2000 [1972])
  - Lynch, J., *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981
  - Goldman, N. (dir.), *Nueva Historia Argentina*, t. III, Sudamericana, 1998
  - Pacto Federal del Litoral, 4 de enero de 1831 — primary source for federal constitutional framework

## Observability Impact

### What signals change after T01
- `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md` is created (non-empty). `test -s` check passes.
- `grep -c "^## Card S10-" S10-CONTENT-DRAFT.md` returns 3 — one for each card.
- The Image Verification Log at the end of the file records three API verification attempts with `thumburl` values and license status.

### How a future agent inspects this task
- Read `S10-CONTENT-DRAFT.md` to see all card content, certeza classifications, image URLs, source citations, and framing notes.
- The "T02 Recipe" section at the end of the draft lists all HTML attributes needed for mechanical integration — a T02 executor can copy-paste without re-reading the narrative.
- The Image Verification Log records each candidate tested, the API result, and the accept/reject decision with reason — preventing T02 from re-testing or inadvertently reusing rejected images.

### Failure state visibility
- If T01 fails mid-execution, the draft file may be absent or partial. `test -s S10-CONTENT-DRAFT.md` returns non-zero on absence; `grep -c "^## Card S10-"` returns < 3 on partial completion.
- If an image API call fails (network timeout), the Image Verification Log records "API timeout / no thumburl" as the status. T01 then falls back to the research doc's pre-verified URL for that candidate, noting the fallback decision.
- If a quote is flagged as unverifiable, the draft uses the `[NO USAR COMO CITA DIRECTA — es paráfrasis historiográfica]` label pattern (inherited from S09-CONTENT-DRAFT.md), making the uncertainty explicit for T02 and future reviewers.

## Expected Output

- `.gsd/milestones/M008/slices/S10/S10-CONTENT-DRAFT.md` — new file with 3 fully specified card entries ready for mechanical HTML integration in T02. The file should include a T02 Recipe section listing each card's HTML attributes for easy copy-paste (following S09-CONTENT-DRAFT.md's pattern).

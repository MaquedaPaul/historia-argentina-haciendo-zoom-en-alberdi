---
id: T02
parent: S01
milestone: M004
provides:
  - T02-IMAGE-ANNOTATIONS.md — 7-image verified inventory for #periodo-nacional (1860–1900) with API-confirmed URLs, licenses, alt text, and T03 integration notes
  - Evento 1 (Sarmiento): Domingo_Sarmiento.jpg — PD-AR-Photo, 428×575px direct URL
  - Evento 2 (Guerra Triple Alianza): Tuyuti1.jpg — PD-old, 1866 albumen print (Bate y cia.)
  - Evento 3 (Conquista del Desierto): Campaña_del_Desierto_1879.JPG — PD-old, Antonio Pozzo expedition photo
  - Evento 4 (Federalización/Roca): Julio_roca_retrato_antoniopozzo.jpg — PD-old, Antonio Pozzo portrait of Roca ca. 1879
  - Evento 5 (Generación del 80): Gigantografía_Inmigrantes_esperan_su_turno.jpg — PD-AR-Photo, Hotel de Inmigrantes ca. 1890s
  - Evento 6 (Revolución del Parque): R90_Canton_revolucionario...jpg — PD-AR-Photo, AGN July 1890
  - Evento 7 (Alberdi legado): Flickr_bastique_Portrait_of_JBA.jpg — CC BY-SA 2.0 (ATTRIBUTION REQUIRED)
  - License summary: 6 PD images (no attribution required) + 1 CC BY-SA 2.0 (Alberdi, attribution required in T03 HTML)
key_files:
  - .gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md
key_decisions:
  - "For Evento 3, chose Campaña_del_Desierto_1879.JPG (Pozzo field photograph at Río Negro, 1879) over the Juan Manuel Blanes 1889 painting 'La conquista del desierto' — the plan called for photographic images and Pozzo's is a primary-source documentary photograph, not a heroic painting that takes an interpretive stance"
  - "For Evento 4, chose Julio_roca_retrato_antoniopozzo.jpg (Roca as Minister of War, 1879, photographed by Pozzo) — the same photographer links Events 3 and 4 visually, reinforcing narrative continuity; also more historically precise than a later presidential portrait"
  - "For Evento 5, used Gigantografía_Inmigrantes_esperan_su_turno.jpg — a photo of a historical photograph displayed at MUNTREF Museo de la Inmigración; this is the best available PD image of the Hotel de Inmigrantes interior showing actual immigrants; Hotel_Inmigrantes_Buenos_Aires.jpg (FAL) was rejected as it is a modern exterior shot of the building"
  - "Alberdi photo (Evento 7) is CC BY-SA 2.0 — the only non-PD image in the set; required attribution block must be included in T03 HTML; this is the same file family used in M003 (bastique Flickr collection from Museo Histórico Nacional)"
patterns_established:
  - "Pozzo visual thread across Eventos 3–4: the same photographer (Antonio Pozzo, fotógrafo oficial of the 1879 expedition) produced both the field photograph of the army at Río Negro AND the portrait of Roca as Minister of War. T03 can optionally surface this connection in captions to reinforce thematic continuity."
  - "When Wikimedia search returns zero results for exact Spanish terms, try category API (action=query&list=categorymembers) before giving up — the Conquista del Desierto category yielded the Blanes painting that confirmed Pozzo was the better choice"
observability_surfaces:
  - grep -c "^### " T02-IMAGE-ANNOTATIONS.md → 7 (count of annotated images; should be 7)
  - grep "API-verified" T02-IMAGE-ANNOTATIONS.md → 7 lines, all showing ✅
  - grep "Attr. req.*YES" T02-IMAGE-ANNOTATIONS.md → 1 (only Evento 7)
  - curl -sI "<any thumb URL from annotations>" | head -1 → HTTP 200 confirms Wikimedia CDN is serving image
  - Failure indicator: if any image card in browser shows img-error or img-fallback class, cross-reference filename with this annotation file and re-query API for updated URL
duration: ~60 minutes
verification_result: passed
completed_at: 2026-03-19
blocker_discovered: false
---

# T02: Wikimedia image sourcing — API-verified URLs for 7 cards

**7 API-verified Wikimedia Commons images documented for #periodo-nacional (1860–1900): 6 PD + 1 CC BY-SA 2.0 (Alberdi), with Antonio Pozzo's 1879 expedition photograph as the visual centerpiece for Evento 3.**

## What Happened

Read S01-CONTENT-DRAFT.md and M004-RESEARCH.md to extract all 7 image candidates before touching the API. The candidates from T01 were: `Sarmiento_1868.jpg`, a "Guerra del Paraguay" generic search, Antonio Pozzo expedition photos, `Julio_Argentino_Roca.jpg`, Hotel de Inmigrantes photo, Leandro Alem or Parque revolution photo, and the M003-era Alberdi portrait.

**Candidate resolution results:**
- `Sarmiento_1868.jpg` → missing (pageid=-1 / not found). Searched and found `Domingo_Sarmiento.jpg` (pageid=441731) — PD presidential portrait.
- `Julio_Argentino_Roca.jpg` → missing. Searched and found `Julio_roca_retrato_antoniopozzo.jpg` (pageid=89656119) — a photographic portrait of Roca by Antonio Pozzo himself, ca. 1879, when he was still Minister of War.
- Pozzo expedition photos: text search for "Antonio Pozzo conquista desierto" returned 0 results. Category search (`Conquista del Desierto`) returned only the Blanes painting and a modern anniversary photo. Broader search for "Pozzo fotografo argentina" returned `Campaña del Desierto 1879.JPG` (pageid=6692197) — the authentic 1879 field photograph by Pozzo showing the army at the Río Negro.
- Guerra Triple Alianza: `Tuyuti1.jpg` (pageid=1244365) — an 1866 albumen print by Bate y cia. showing Uruguayan soldiers in trench at Tuyutí. Authentic period documentary photograph.
- Hotel Inmigrantes: `Hotel_Inmigrantes_Buenos_Aires.jpg` was evaluated and rejected (modern building exterior, Free Art License, not a historical immigration photo). `Gigantografía_Inmigrantes_esperan_su_turno.jpg` (pageid=50230513) — a photo of a historical display photograph at MUNTREF Museo de la Inmigración showing immigrants in the Hotel's waiting room — is the better choice: PD-AR-Photo, historical subject matter.
- Leandro Alem: `Leandro_N._Alem.jpg` (pageid=532747) — PD Old portrait. Also found `R90_Canton_revolucionario_en_Talcahuano_y_Piedad_-hoy_Mitre.jpg` (pageid=1078870) — an actual July 1890 field photograph of the revolutionary canton from the Archivo General de la Nación. Chose R90 field photo as primary; it is historically richer than a static portrait.
- Alberdi: `Flickr_-_bastique_-_Portrait_of_Juan_Bautista_Alberdi.jpg` (pageid=7927138) — anonymous Paris ca. 1870 photograph, photographed by bastique at the Museo Histórico Nacional. CC BY-SA 2.0 — the only non-PD image; **attribution required in T03 HTML**.

**Alberdi death date resolution attempt:** The Alberdi Flickr photo metadata (Paris, 1870, Museo Histórico Nacional f.10894) does not contain death date information. The VERIFICACIÓN PENDIENTE flag on "19 de julio de 1884" remains unresolved. `ensayistas.org` is the strongest secondary source for "19 de julio" — T03 should use this date with that citation.

## Verification

All four task-plan verification checks passed:

1. `grep -c "^### " T02-IMAGE-ANNOTATIONS.md` → **7** ✅
2. Each of the 7 entries has URL, License, and Alt text fields → **7/7** ✅
3. `curl -sI "<Campaña del Desierto URL>" | head -1` → **HTTP/1.1 200 OK** ✅
4. `curl -sI "<Domingo_Sarmiento.jpg URL>" | head -1` → **HTTP/1.1 200 OK** ✅

Additional HTTP checks all passed:
- `Tuyuti1.jpg` thumb 500px → HTTP 200 ✅
- `Julio_roca_retrato_antoniopozzo.jpg` thumb 500px → HTTP 200 ✅
- `Flickr_bastique_Alberdi.jpg` thumb 500px → HTTP 200 ✅
- `R90_Canton...jpg` thumb 500px → HTTP 200 ✅
- `Gigantografía_Inmigrantes...jpg` thumb 500px → HTTP 200 ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^### " .gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md` | 0 (output: 7) | ✅ pass | <1s |
| 2 | `grep "License:" T02-IMAGE-ANNOTATIONS.md \| grep -v "License URL" \| wc -l` | 0 (output: 7) | ✅ pass | <1s |
| 3 | `grep "Alt text:" T02-IMAGE-ANNOTATIONS.md \| wc -l` | 0 (output: 7) | ✅ pass | <1s |
| 4 | `curl -sI "...Campaña_del_Desierto_1879.JPG/500px..." \| head -1` | 0 (HTTP 200) | ✅ pass | 0.3s |
| 5 | `curl -sI "...Domingo_Sarmiento.jpg" \| head -1` | 0 (HTTP 200) | ✅ pass | 0.4s |
| 6 | `curl -sI "...Flickr_bastique_Alberdi/500px..." \| head -1` | 0 (HTTP 200) | ✅ pass | 0.4s |
| 7 | `curl -sI "...R90_Canton.../500px..." \| head -1` | 0 (HTTP 200) | ✅ pass | 0.5s |
| 8 | `curl -sI "...Gigantografia_Inmigrantes/500px..." \| head -1` | 0 (HTTP 200) | ✅ pass | 0.4s |
| 9 | `curl -sI "...Julio_roca_retrato_antoniopozzo/500px..." \| head -1` | 0 (HTTP 200) | ✅ pass | 0.3s |

## Diagnostics

Primary inspection command: `grep -c "^### " .gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md` → 7.

If an image fails to load in the browser (img-error or img-fallback class):
1. Check the filename exactly as written in the annotation — URL-encoding of special characters (ñ → %C3%B1) is required in the thumb URL.
2. Re-query the API: `curl -s "https://commons.wikimedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json"`.
3. The `Campaña del Desierto 1879.JPG` filename contains an uppercase `.JPG` extension and the ñ — both matter in the URL-encoded thumb path.

Alberdi attribution: `grep -A5 "Evento 7" T02-IMAGE-ANNOTATIONS.md | grep "Attribution text"` → shows exact attribution string for T03 HTML.

## Deviations

- **Evento 1 image changed:** `Sarmiento_1868.jpg` (plan candidate) does not exist on Wikimedia Commons. Used `Domingo_Sarmiento.jpg` instead — a PD presidential portrait taken before 1888. The Sarmiento Gobernador de San Juan (1862–1864) photo exists but shows him as provincial governor, before the presidential period the card covers; `Domingo_Sarmiento.jpg` is broader and shows him as president.
- **Evento 4 image changed:** `Julio_Argentino_Roca.jpg` (plan candidate) does not exist. Used `Julio_roca_retrato_antoniopozzo.jpg` — a superior choice photographed by Antonio Pozzo, the same photographer who covered the 1879 Conquista del Desierto expedition. This creates a visual/narrative thread between Events 3 and 4.
- **Evento 6 image:** Used R90 revolution field photograph instead of a Leandro Alem portrait. The R90 photo is more historically evocative (actual barricades in July 1890) and the card covers the revolutionary event, not a biography of Alem.

## Known Issues

- **Alberdi death date still unresolved** — "19 de julio de 1884" remains [VERIFICACIÓN PENDIENTE]. The Alberdi portrait metadata (Paris, 1870) offers no death-date evidence. T03 must resolve this before fixing in HTML; `ensayistas.org` explicitly states "19 de julio de 1884, Neuilly-sur-Seine" and is a reliable secondary source — use with explicit citation.
- **Evento 5 image is a photograph of a historical photograph** — not a primary period photo. It is the best available PD option on Wikimedia for the interior of the Hotel de Inmigrantes with actual immigrants. A direct AGN photo of immigrant arrival would be preferable but was not found via API search.

## Files Created/Modified

- `.gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md` — 7-image inventory with Wikimedia Commons filenames, API-verified thumbnail URLs, license tags, alt text, and T03 integration notes; 1 CC BY-SA 2.0 image (Alberdi) flagged for required HTML attribution

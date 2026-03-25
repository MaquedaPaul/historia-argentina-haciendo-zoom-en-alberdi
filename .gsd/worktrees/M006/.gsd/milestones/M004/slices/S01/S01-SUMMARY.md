---
id: S01
parent: M004
milestone: M004
provides:
  - S01-CONTENT-DRAFT.md — complete 7-event verified content draft for #periodo-nacional (1860–1900) with certeza classification, source citations, Alberdi narrative angles, and image candidates
  - Certeza distribution: 6 hecho, 1 opinión (Evento 7 — Alberdi legado), 0 rumor
  - El crimen de la guerra quote correctly attributed (written ca. 1870, published 1895 Escritos Póstumos)
  - Alberdi death flagged: 19 de julio de 1884 [VERIFICACIÓN PENDIENTE]
  - Alberdi narrative arc closed in Evento 7: return 1879, diputado Tucumán, vicepresidente Cámara, death 1884, legacy
  - 23 source citations across 7 events (avg >3 per event; all hecho events have ≥2 independent sources)
  - Integration notes for T02 (image sourcing) and T03 (HTML): stagger delays, certeza classes, pending verification flags
  - T02-IMAGE-ANNOTATIONS.md — 7-image verified inventory for #periodo-nacional (1860–1900) with API-confirmed URLs, licenses, alt text, and T03 integration notes
  - Evento 1 (Sarmiento): Domingo_Sarmiento.jpg — PD-AR-Photo, 428×575px direct URL
  - Evento 2 (Guerra Triple Alianza): Tuyuti1.jpg — PD-old, 1866 albumen print (Bate y cia.)
  - Evento 3 (Conquista del Desierto): Campaña_del_Desierto_1879.JPG — PD-old, Antonio Pozzo expedition photo
  - Evento 4 (Federalización/Roca): Julio_roca_retrato_antoniopozzo.jpg — PD-old, Antonio Pozzo portrait of Roca ca. 1879
  - Evento 5 (Generación del 80): Gigantografía_Inmigrantes_esperan_su_turno.jpg — PD-AR-Photo, Hotel de Inmigrantes ca. 1890s
  - Evento 6 (Revolución del Parque): R90_Canton_revolucionario...jpg — PD-AR-Photo, AGN July 1890
  - Evento 7 (Alberdi legado): Flickr_bastique_Portrait_of_JBA.jpg — CC BY-SA 2.0 (ATTRIBUTION REQUIRED)
  - License summary: 6 PD images (no attribution required) + 1 CC BY-SA 2.0 (Alberdi, attribution required in T03 HTML)
  - index.html — #periodo-nacional section with 7 verified event cards + closing alberdi-quote connector
key_files:
  - .gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md
  - .gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md
  - index.html
key_decisions:
  - Evento 7 classified as "opinión (con elementos de hecho documentados)" — biographical facts (return, election, death) are hecho, but "legacy as intellectual father of the Constitution" is inherently historiographic interpretation; classifying the whole card as opinión is more epistemically honest than hecho
  - Roca quote in Evento 3 flagged as "verify against primary source before HTML blockquote" — present in multiple secondary sources but primary-source attribution not confirmed
  - For Evento 3, chose Campaña_del_Desierto_1879.JPG (Pozzo field photograph at Río Negro, 1879) over the Juan Manuel Blanes 1889 painting 'La conquista del desierto' — the plan called for photographic images and Pozzo's is a primary-source documentary photograph, not a heroic painting that takes an interpretive stance
  - For Evento 4, chose Julio_roca_retrato_antoniopozzo.jpg (Roca as Minister of War, 1879, photographed by Pozzo) — the same photographer links Events 3 and 4 visually, reinforcing narrative continuity; also more historically precise than a later presidential portrait
  - For Evento 5, used Gigantografía_Inmigrantes_esperan_su_turno.jpg — a photo of a historical photograph displayed at MUNTREF Museo de la Inmigración; this is the best available PD image of the Hotel de Inmigrantes interior showing actual immigrants; Hotel_Inmigrantes_Buenos_Aires.jpg (FAL) was rejected as it is a modern exterior shot of the building
  - Alberdi photo (Evento 7) is CC BY-SA 2.0 — the only non-PD image in the set; required attribution block must be included in T03 HTML; this is the same file family used in M003 (bastique Flickr collection from Museo Histórico Nacional)
  - Nota historiográfica for Conquista del Desierto rendered as a <p class="card-nota-historiografica"> paragraph inside the card body — no new CSS class needed, visually distinct via existing paragraph styling
  - CC BY-SA 2.0 attribution for Alberdi portrait placed as <p class="img-attribution"> inside .card-image div, immediately after the <img> — keeps attribution co-located with the image it licenses
  - Alberdi death date rendered as inline span.card-nota-certeza with the [VERIFICACIÓN PENDIENTE] text visible in the DOM so future readers/editors see the unresolved flag without needing to read source comments
  - Closing alberdi-quote blockquote placed inside .period-body after the events-grid, following the same pattern as other period closers (lines 457, 567, 737 in index.html)
patterns_established:
  - "Nota historiográfica" within a hecho card (Evento 3 — Conquista del Desierto) to document live historiographic debate without editorializing — extends M003 debate-card pattern to contested labeling, not just contested facts
  - Simultaneous events cross-reference: Evento 3 (Conquista del Desierto 1879) and Evento 7 (Alberdi's return 1879) are the same year — noted in Alberdi angle to reinforce narrative irony
  - Pozzo visual thread across Eventos 3–4: the same photographer (Antonio Pozzo, fotógrafo oficial of the 1879 expedition) produced both the field photograph of the army at Río Negro AND the portrait of Roca as Minister of War. T03 can optionally surface this connection in captions to reinforce thematic continuity.
  - When Wikimedia search returns zero results for exact Spanish terms, try category API (action=query&list=categorymembers) before giving up — the Conquista del Desierto category yielded the Blanes painting that confirmed Pozzo was the better choice
  - card-nota-historiografica paragraph pattern for contested-history cards — brief inline note documenting the historiographic debate without editorializing, rendered as a paragraph with a bold label inside the card body
  - card-nota-certeza span pattern for inline epistemic flags visible in rendered HTML, distinct from HTML comments
observability_surfaces:
  - grep -c "^## Evento" S01-CONTENT-DRAFT.md → 7 (event count)
  - grep "VERIFICACIÓN PENDIENTE" S01-CONTENT-DRAFT.md → shows all unresolved flags before HTML integration
  - grep "Certeza:" S01-CONTENT-DRAFT.md → shows full certeza distribution at a glance
  - T02 image sourcing will resolve the 3 "Nota" flagged items before HTML work begins
  - grep -c "^### " T02-IMAGE-ANNOTATIONS.md → 7 (count of annotated images; should be 7)
  - grep "API-verified" T02-IMAGE-ANNOTATIONS.md → 7 lines, all showing ✅
  - grep "Attr. req.*YES" T02-IMAGE-ANNOTATIONS.md → 1 (only Evento 7)
  - curl -sI "<any thumb URL from annotations>" | head -1 → HTTP 200 confirms Wikimedia CDN is serving image
  - Failure indicator: if any image card in browser shows img-error or img-fallback class, cross-reference filename with this annotation file and re-query API for updated URL
  - document.querySelectorAll('#periodo-nacional [data-certeza]').length → 7
  - document.querySelectorAll('#periodo-nacional .card-image img').length → 7
  - document.querySelector('#periodo-nacional .events-grid--certeza') !== null → true
  - document.querySelectorAll('#periodo-nacional .alberdi-quote').length → 1
  - document.querySelectorAll('#periodo-nacional .img-error, #periodo-nacional .img-fallback').length → 0 (after load)
  - Array.from(document.querySelectorAll('#periodo-nacional .events-grid--certeza article')).map(e => e.style.getPropertyValue('--reveal-delay')) → ["0ms","80ms","160ms","240ms","320ms","400ms","480ms"]
verification_result: passed
completed_at: 2026-03-20T00:27:46.993Z
---

# S01: Slice Summary

- **T01**: S01-CONTENT-DRAFT.md written: 7 verified events for the 1860–1900 panoramic period, 6 hecho + 1 opinión, all with source citations, Alberdi angles, and image candidates — ready for image sourcing (T02) and HTML integration (T03).
- **T02**: 7 API-verified Wikimedia Commons images documented for #periodo-nacional (1860–1900): 6 PD + 1 CC BY-SA 2.0 (Alberdi), with Antonio Pozzo's 1879 expedition photograph as the visual centerpiece for Evento 3.
- **T03**: Replaced 3 placeholder stubs in `#periodo-nacional` with 7 fully-verified event cards (6 hecho + 1 opinión), Wikimedia photographs, source citations, and a closing Alberdi-quote narrative connector — completing the #periodo-nacional section of the Argentina history timeline.

---
estimated_steps: 7
estimated_files: 1
---

# T02: Wikimedia image sourcing — API-verified URLs for 7 cards

**Slice:** S01 — Contenido verificado + imágenes + integración HTML
**Milestone:** M004

## Description

Query the Wikimedia Commons API to obtain verified thumbnail URLs for all 7 event card images. This era (1860–1900) had photography — Antonio Pozzo documented the Conquista del Desierto (1879), and photographic portraits exist for Mitre, Sarmiento, Roca, Avellaneda, Alem, and Alberdi. Each image is verified via the API (never guessed), documented with license and alt text, and ready for HTML integration.

## Steps

1. For each image candidate from T01's content draft, construct the Wikimedia API query: `https://commons.wikimedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`
2. Query Evento 1 image (Sarmiento or Mitre portrait). If candidate filename missing, use search API (`list=search&srnamespace=6&srsearch=TERM`) to find the correct filename. Prefer photographic portraits over paintings for this era.
3. Query Evento 2 image (Guerra del Paraguay — campaign photo or battle scene). Add "retrato" or "guerra paraguay" to search if needed.
4. Query Evento 3 image (Conquista del Desierto — Antonio Pozzo 1879 expedition photo). These are the strongest visual asset of M004.
5. Query Evento 4 image (Roca portrait or Buenos Aires federalización). Prefer Julio Argentino Roca photographic portrait.
6. Query Evento 5 image (immigration arrival photo or Buenos Aires 1880s cityscape). Search "inmigrantes argentina hotel" or "buenos aires 1880" on Wikimedia.
7. Query Evento 6 image (Revolución del Parque or Leandro Alem portrait). If no revolution photo available, use Alem portrait.
8. Query Evento 7 image (Alberdi portrait — may reuse the same Wikimedia file used in M003; acceptable for narrative closure).
9. For each result: record filename, verified thumburl (or direct URL if image < 500px), license tag, 1-sentence descriptive alt text, and CC attribution text if needed.

## Must-Haves

- [ ] 7 images documented with API-verified URLs
- [ ] Each URL confirmed via API response (not manually constructed)
- [ ] License recorded: PD-old, PD-Art, CC BY, or CC BY-SA (no NC/ND)
- [ ] Descriptive alt text for each image (1 sentence, historically specific)
- [ ] CC-attributed images flagged with attribution text for HTML inclusion

## Verification

- `grep -c "^### " .gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md` returns 7
- Each entry has URL, License, and Alt fields populated
- At least 2 URLs tested with `curl -sI "URL" | head -1` returning HTTP 200

## Inputs

- `.gsd/milestones/M004/slices/S01/S01-CONTENT-DRAFT.md` — image candidate filenames per event
- `.gsd/milestones/M004/M004-RESEARCH.md` — image candidates table with Wikimedia filenames and notes

## Expected Output

- `.gsd/milestones/M004/slices/S01/T02-IMAGE-ANNOTATIONS.md` — complete 7-image inventory with verified URLs, licenses, and alt text

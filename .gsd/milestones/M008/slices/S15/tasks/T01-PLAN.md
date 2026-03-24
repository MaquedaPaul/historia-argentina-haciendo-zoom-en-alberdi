---
estimated_steps: 4
estimated_files: 1
---

# T01: Author S15-CONTENT-DRAFT.md with historical prose and verbatim T02 Recipe HTML

**Slice:** S15 — El asesinato de Facundo Quiroga — ¿fue Rosas?
**Milestone:** M008

## Description

Create `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` with verified historical prose for two cards and a verbatim T02 Recipe HTML block ready for the Node.js splice in T02. This task owns all historical accuracy decisions — once the draft is written and the HTML block is correct, T02 is purely mechanical.

The two cards are:

- **S15-1** (`card-hecho`, `data-certeza="hecho"`, 0ms stagger): Documented facts of the Barranca Yaco ambush.
- **S15-2** (`card-opinion`, `data-certeza="debatido"`, 80ms stagger): Three hypotheses on intellectual authorship, with a `<p class="card-nota-historiografica">`.

## Steps

1. **Read the existing S14 card HTML** (lines 1718–1768 of `index.html`) to confirm the exact HTML structure to replicate for S15.

2. **Write S15-CONTENT-DRAFT.md** at `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` with the following sections:
   - `## Overview` — brief summary of the two cards
   - `## Card S15-1: La emboscada de Barranca Yaco (16 de febrero de 1835)` — prose, sources, image note
   - `## Card S15-2: ¿Quién ordenó el asesinato? La disputa sobre el autor intelectual` — prose, sources, historiographic positions
   - `## T02 Recipe` — verbatim HTML block for both cards (HTML entities for all non-ASCII)

3. **Historical content for S15-1** (card-hecho):
   - Title: `La emboscada de Barranca Yaco (16 de febrero de 1835)`
   - Year display: `16 de febrero de 1835`
   - Excerpt: Quiroga was returning from a pacification mission in the northwest dispatched by Governor Maza (at Rosas's behest); the convoy was ambushed at Barranca Yaco, camino de Córdoba, by a party led by Santos Pérez under orders from the Reinafé brothers; Quiroga and his entire escort (~12 persons), including his secretary Santos Ortiz, were killed; the Reinafé brothers — José Vicente Reinafé (gobernador de Córdoba) and his brothers — were arrested, tried in Buenos Aires, and executed on 25 October 1837.
   - Sources: Lynch, J., *Argentine Dictator*, Oxford, 1981, cap. 4; Saldías, A., *Historia de la Confederación Argentina*, t. I, 1892.
   - Image: `Barranca_Yaco_2.jpeg` by Cayetano Descalzi (Argentine artist, 1809–1886), 19th century. Public domain. 500px thumb URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Barranca_Yaco_2.jpeg/500px-Barranca_Yaco_2.jpeg`
   - Alt text: `«La emboscada de Barranca Yaco» (ca. mediados del siglo XIX), pintura de Cayetano Descalzi. Interpretación artística del asesinato de Facundo Quiroga el 16 de febrero de 1835.`

4. **Historical content for S15-2** (card-opinion, data-certeza="debatido"):
   - Title: `¿Quién ordenó el asesinato? La disputa sobre el autor intelectual`
   - Year display: `1835 — debate abierto`
   - Excerpt: Present the three hypotheses — (1) Los Reinafé solos (had personal motives; confessions did not implicate Rosas); (2) Rosas como autor intelectual — Rosas was the sole beneficiary, the only federal caudillo who rivaled him for national leadership; Sarmiento accused Rosas in *Facundo* (1845); the mission itself placed Quiroga on the road through Córdoba; (3) Alejandro Heredia (Gobernador de Tucumán) also had conflicts with Quiroga; cited by some historians as possible accomplice.
   - Include `<p class="card-nota-historiografica">` with: liberal position (Sarmiento, Mitre, López: Rosas was the intellectual author) vs. revisionist position (José María Rosa, *Historia Argentina*, t. IV, 1964: Reinafé acted alone; accusation against Rosas was fabricated by enemies) vs. contemporary synthesis (Lynch, 1981: evidence is circumstantial; Rosas clearly benefited but was never proven guilty).
   - Sources: Sarmiento, D. F., *Facundo*, 1845, Segunda Parte; Rosa, J. M., *Historia Argentina*, t. IV, 1964; Lynch, J., *Argentine Dictator*, 1981, cap. 4; Goldman, N. y Salvatore, R. (comps.), *Caudillismos rioplatenses*, EUDEBA, 1998.

5. **T02 Recipe block**: Write the verbatim HTML for both cards in `## T02 Recipe`, using HTML entities for ALL non-ASCII characters (ó → `&#xF3;`, é → `&#xE9;`, í → `&#xED;`, ú → `&#xFA;`, ñ → `&#xF1;`, á → `&#xE1;`, ü → `&#xFC;`, em-dash → `&#x2014;`, en-dash → `&#x2013;`, ¿ → `&#xBF;`, « → `&#xAB;`, » → `&#xBB;`). Follow the exact HTML structure from S14-1 and S14-2 visible in index.html lines 1718–1768.

## Must-Haves

- [ ] File created at `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md`
- [ ] Contains `## Card S15-1` and `## Card S15-2` sections
- [ ] S15-1 uses `data-certeza="hecho"`, S15-2 uses `data-certeza="debatido"`
- [ ] Stagger delays: S15-1 = `0ms`, S15-2 = `80ms`
- [ ] S15-2 includes `<p class="card-nota-historiografica">` with liberal, revisionist, and contemporary-synthesis positions named
- [ ] Image for S15-1: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Barranca_Yaco_2.jpeg/500px-Barranca_Yaco_2.jpeg` (public domain, no attribution block needed)
- [ ] S15-2 has NO image (consistent with S14-3 historiographic note card)
- [ ] Spelling: "Barranca Yaco" (with "a") — NOT "Barranco Yaco" — as primary form throughout
- [ ] Execution date of Reinafé brothers: 25 October 1837 (not 1836 or 1838)
- [ ] Santos Pérez identified as material executor (gunman); Reinafé brothers as organizers — these are distinct roles
- [ ] T02 Recipe block uses HTML entities for all non-ASCII characters
- [ ] Data-ids: `data-id="S15-1"` and `data-id="S15-2"`

## Verification

- `test -s .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md && echo OK`
- `grep -c "^## Card S15-" .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` returns 2
- `grep -c "T02 Recipe" .gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` returns 1

## Inputs

- `index.html` lines 1718–1768 — exact HTML card structure to replicate (S14 cards as template)
- S15-RESEARCH.md (`.gsd/milestones/M008/slices/S15/S15-RESEARCH.md`) — all historical facts, image URL, entity encoding rules, and pitfall warnings already resolved
- S14 Summary Forward Intelligence — confirms: data-certeza is at 74, marker is at line 1768, append marker uses ASCII-only substring `cards will be appended here by subsequent slices`

## Expected Output

- `.gsd/milestones/M008/slices/S15/S15-CONTENT-DRAFT.md` — complete content draft with verified prose for both cards, sources, image note, and the verbatim T02 Recipe HTML block using HTML entities. T02 can read this file and run the splice without any additional historical research.

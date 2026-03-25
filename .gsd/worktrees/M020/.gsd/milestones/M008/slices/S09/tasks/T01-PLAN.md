---
estimated_steps: 4
estimated_files: 1
---

# T01: Write S09 content draft with verified historical facts and Wikimedia images

**Slice:** S09 — Origen de unitarios y federales
**Milestone:** M008

## Description

Produce a structured content draft (`S09-CONTENT-DRAFT.md`) with 4 card entries covering the origin of the unitario/federal divide. Each entry specifies: title, date display, certeza type, a 2–4 sentence excerpt, ≥2 bibliographic sources, and a Wikimedia-verified image URL (or an explicit fallback decision). The draft is the intellectual work of the slice — T02 uses it as a recipe for mechanical HTML integration.

The 4 cards are framed to complement (not duplicate) the existing SP2 cards:
- SP2-1 covers what happened at Cepeda → S09-2 covers WHY the Directorio collapsed (1816–1820 context)
- SP2-3 covers Rivadavia's presidency basic facts → S09-3 covers the economic reason provinces rejected the 1826 constitution (the capitalización law stripping customs revenue)
- SP2-2 gives a panoramic overview → S09-1 goes deeper on the aduana economic roots (1810–1820)
- S09-4 is a new card type (opinion) on when the identities crystallized — no SP2 card covers this

## Steps

1. **Draft the 4 card entries** in `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md`. For each card follow this structure:
   ```
   ## Card S09-N: [TITLE]
   - **Certeza:** hecho | opinion
   - **Year display:** [text shown in <span class="event-card__year">]
   - **Excerpt:** [2–4 sentences]
   - **Sources:** [≥2 full bibliographic references]
   - **Image:** [URL or fallback decision]
   - **Framing note:** [how this differs from SP2 overlap]
   ```

2. **Card S09-1 (`card-hecho`)** — "La Revolución sin resolver: Buenos Aires y el control de la aduana (1810–1820)". Core fact: the Buenos Aires customs house generated ~80% of national revenue; provinces contributed soldiers and primary goods but received almost nothing from the port. The tension was structural, not merely political: the post-1810 provisional governments never resolved who controlled the aduana. Sources: Halperin Donghi, *De la revolución de independencia a la confederación rosista* (1972/2000); Goldman, *Nueva Historia Argentina* t. III (1998). Image: look up via Wikimedia API — candidates: a period map of Río de la Plata, or an engraving of the Buenos Aires port/aduana. Do not reuse any image from SP2.

3. **Card S09-2 (`card-hecho`)** — "El Directorio centralista (1816–1820): el primer ensayo unitario y su derrota". Core fact: after the Congress of Tucumán (1816) declared independence, the Supreme Directors (Pueyrredón, Rondeau) governed with centralist authority that the interior provinces increasingly resented — high conscription demands, no revenue sharing, political exclusion. This framing explains WHY Cepeda happened (context); it does not re-narrate the battle (that's SP2-1). Sources: Levene, *Historia de la Nación Argentina* vol. VII (1940); Halperin Donghi (1972). Image: portrait of José Rondeau (last Supreme Director) or Congress of Tucumán imagery. Look up `Jose_Rondeau` on Wikimedia; alternatively search for `Congreso_Tucuman`.

4. **Card S09-3 (`card-hecho`)** — "La Constitución de 1826 y el rechazo provincial: ¿por qué dijeron no?". Core fact: Rivadavia's 1826 constitution included the Ley de Capitalización, which converted Buenos Aires into the national capital under federal control — effectively dissolving the province of Buenos Aires and redirecting its customs revenue away from the province's treasury. The provincial governors and caudillos saw this as Buenos Aires shedding its own provincial obligations while retaining effective control. This goes deeper than SP2-3 (which says "provinces rejected it" without explaining why). Rivadavia resigned 27 June 1827. Sources: Piccirilli, *Rivadavia y su tiempo* (1960); Botana, *La tradición republicana* (1984); Ravignani, *Asambleas Constituyentes Argentinas* t. II (1937). Image: avoid the Bernardino Rivadavia portrait (already used in SP2-3). Look up `Manuel Dorrego` portrait or a period document/constitution image. Candidate: `Manuel_Dorrego.jpg`.

5. **Card S09-4 (`card-opinion`)** — "¿Cuándo nacieron 'unitarios' y 'federales' como identidades políticas?" Certeza: `opinion` (no accent — per KNOWLEDGE.md Certeza Attribute Accent Normalization). Attribution: Botana, *La tradición republicana* (1984) and Goldman, *Nueva Historia Argentina* t. III (1998). Core argument: the labels existed earlier, but crystallized as antagonistic mass-political identities in the cycle 1826–1829: the Rivadavia failure → Dorrego governor → Dorrego fusilado por Lavalle (Dec. 1828) → primera gobernación de Rosas (1829). Before that cycle, the division was more fluid. Do NOT synthesize a direct quote unless one is found in the digitized primary text; instead attribute the interpretation to the historians by name. If a suitable quote from Botana's *La tradición republicana* is available in indexed digitized form, use it; otherwise use the paraphrase pattern with card-opinion__context attribution. Image: a period map of Argentine provinces or a generic illustration showing the division. Candidate: search Wikimedia for `Argentina 1820` or `mapa provincias argentinas`.

6. **Verify image URLs** for cards where a Wikimedia filename is proposed. Use the Wikimedia API: `https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json`. If the API returns a valid `thumburl`, use it. If not, use `list=search&srnamespace=6` to find the actual filename. Record the result (found URL or explicit "use fallback: [description]") in the draft for each card.

## Must-Haves

- [ ] Draft file exists at `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md`
- [ ] 4 card sections (## Card S09-1 through ## Card S09-4)
- [ ] Certeza for S09-4 is `opinion` (no accent)
- [ ] Each card has ≥2 sources with author, title, publisher/year
- [ ] Each card has an image entry: either a verified Wikimedia URL or an explicit fallback decision with rationale
- [ ] No image duplicates from SP2 cards (no Rivadavia portrait, no Rosas portrait, no Quiroga portrait, no Alberdi portrait)
- [ ] S09-2 frames the Directorio context (1816–1820) — NOT a re-narration of the Cepeda battle (that's SP2-1)
- [ ] S09-3 explains the economic reason for rejection (capitalización law) — not just "provinces rejected it"
- [ ] No synthesized direct quotes without primary source verification

## Verification

- `test -s .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md && echo "exists"` → outputs "exists"
- `grep -c '^## Card' .gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` → returns 4

## Inputs

- `.gsd/milestones/M008/slices/S09/S09-RESEARCH.md` — full research with card plan, framing notes, source list, image candidates, and insertion point in `index.html`
- `.gsd/milestones/M008/slices/S09/S09-CONTEXT.md` — certeza recommendations and key facts to verify
- `.gsd/KNOWLEDGE.md` — Wikimedia image sourcing protocol (use API, not guessed URLs), certeza accent normalization (`opinion` not `opinión`), content draft structure pattern

## Expected Output

- `.gsd/milestones/M008/slices/S09/S09-CONTENT-DRAFT.md` — structured 4-card content draft with verified facts, sources, and image decisions, ready to be consumed by T02 for HTML integration.

---
estimated_steps: 7
estimated_files: 1
---

# T01: Author S18-CONTENT-DRAFT.md with full prose and entity-encoded T02 Recipe HTML

**Slice:** S18 — Los unitarios conspiraban
**Milestone:** M008

## Description

Write the historical content draft for S18's two `card-hecho` cards — the high-risk creative/research step that separates historical accuracy work from mechanical file manipulation. The draft must contain: (1) readable prose for each card verifiable by a historian, (2) a scope compliance checklist confirming S18 does not bleed into S19 or S22, and (3) a verbatim T02 Recipe HTML block with all non-ASCII encoded as HTML entities for safe Windows/Node.js round-trip.

The two cards are:
- **S18-1**: Overview of unitario conspiracies 1838–1851 (Asociación de Mayo, apoyo al bloqueo francés, Comisión Argentina) — no image, with `card-nota-historiografica` on the pretext argument.
- **S18-2**: Coalición del Norte 1840–1841 (Lavalle's invasion, Avellaneda's uprising, defeat and aftermath) — with Wikimedia Commons map image.

## Steps

1. Create `.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md`.

2. Write **S18-1 card entry** (readable prose section):
   - Year label: `1838 – 1851`
   - Title: "Los unitarios en el exilio conspiraban: la Asociación de Mayo, el bloqueo francés y la Comisión Argentina"
   - certeza: `hecho` / `card-hecho`
   - No image
   - Prose: Asociación de Mayo (Echeverría's *Dogma Socialista*, 1838, Buenos Aires intellectual circle that became the exile network); apoyo al bloqueo francés (1838–1840: exiliados in Montevideo and Paris — Juan Cruz Varela among them — actively lobbied the French government); Alberdi's dissent (in *La acción de la Europa en América*, Valparaíso, 1842, he argued relying on European intervention was a strategic and ethical error — showing the exile was not monolithic); Comisión Argentina (1851: organized in Montevideo with Urquiza and Brazil's backing; directly prepared Caseros)
   - card-nota-historiografica: Narrow pretext argument only — conspiracies were real; Myers (*Orden y virtud*, UNQ, 1995) documents how the "conspirador unitario" label was applied beyond actual conspirators; Lynch (*Argentine Dictator*, Oxford, 1981, cap. 6) distinguishes documented plotters from those swept up in mass intimidation. Do NOT extend to the general tiranía debate (→ S19).
   - Sources: Myers (1995), Lynch (1981 cap. 6), Echeverría *Dogma Socialista* (1838), Alberdi *La acción de la Europa en América* (1842)

3. Write **S18-2 card entry** (readable prose section):
   - Year label: `1840 – 1841`
   - Title: "La Coalición del Norte: Lavalle invade, las provincias se levantan"
   - certeza: `hecho` / `card-hecho`
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Mapa_ARGENTINA_1840_coalicion_del_norte.svg/500px-Mapa_ARGENTINA_1840_coalicion_del_norte.svg.png`
   - Alt text: "Mapa de Argentina hacia 1840 que muestra los movimientos militares de la Coalición del Norte"
   - Prose: Lavalle launched the invasion from the litoral in July 1840 with French naval support and Uruguayan backing; Coalición del Norte comprised provincial uprisings coordinated with Lavalle: Marco Avellaneda (governor of Tucumán), plus Salta and Jujuy; Avellaneda was captured and executed by order of Oribe on 3 November 1841 in Tucumán; Lavalle retreated northward and died in Jujuy on 9 October 1841 (shot through the window of the house where he sheltered); defeat of the Coalición confirmed Rosas's military dominance and was followed by the most intense period of Mazorca repression (1840–1842)
   - Sources: Lynch (1981 cap. 6), Beverina *Las campañas de los ejércitos libertadores* (1923), Zinny (1882)

4. Write **Scope compliance checklist**:
   - ✓ S18 does NOT adjudicate whether Rosas was a tyrant (→ S19)
   - ✓ S18 covers bloqueo francés from the unitario side only (exiliados alentaron el bloqueo) — NOT from Rosas's resistance side (→ S22)
   - ✓ Alberdi's dissent from the pro-intervention strategy is included, keeping R011 Alberdi thread alive
   - ✓ card-nota-historiografica on S18-1 is narrowly scoped to the pretext argument (not a general tiranía judgment)

5. Write the **T02 Recipe HTML block** — the verbatim splice-ready HTML for both cards. CRITICAL: every non-ASCII character in this block MUST be an HTML entity. Encoding map: á→`&#xE1;`, é→`&#xE9;`, í→`&#xED;`, ó→`&#xF3;`, ú→`&#xFA;`, ñ→`&#xF1;`, ó (in "Asociación", "Coalición", "Comisión")→`&#xF3;`, ó (in "bloqueo")→plain 'o' (ASCII). Card structure for **S18-1** (no image):
   ```html
   <!-- S18-1: Los unitarios en el exilio conspiraban -->
   <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S18-1" style="--reveal-delay: 0ms">
     <div class="card-certeza-indicator">
       <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
       <span class="card-certeza-label">Hecho documentado</span>
     </div>
     <span class="event-card__year">1838 &#x2013; 1851</span>
     <h3 class="event-card__title">Los unitarios en el exilio conspiraban: la Asociaci&#xF3;n de Mayo, el bloqueo franc&#xE9;s y la Comisi&#xF3;n Argentina</h3>
     <p class="event-card__excerpt">[entity-encoded prose]</p>
     <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> [entity-encoded nota]</p>
     <footer class="card-source">
       <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
       <cite>[sources]</cite>
     </footer>
   </article>
   ```
   Card structure for **S18-2** (with map image):
   ```html
   <!-- S18-2: La Coalición del Norte -->
   <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S18-2" style="--reveal-delay: 80ms">
     <div class="card-certeza-indicator">
       <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
       <span class="card-certeza-label">Hecho documentado</span>
     </div>
     <div class="card-image">
       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Mapa_ARGENTINA_1840_coalicion_del_norte.svg/500px-Mapa_ARGENTINA_1840_coalicion_del_norte.svg.png" alt="[entity-encoded alt]" loading="lazy">
     </div>
     <span class="event-card__year">1840 &#x2013; 1841</span>
     <h3 class="event-card__title">La Coalici&#xF3;n del Norte: Lavalle invade, las provincias se levantan</h3>
     <p class="event-card__excerpt">[entity-encoded prose]</p>
     <footer class="card-source">
       <span class="card-source__icon" aria-hidden="true">&#x1F4C4;</span>
       <cite>[sources]</cite>
     </footer>
   </article>
   ```

6. After writing the file, run the entity-check: `grep -P '[^\x00-\x7F]' .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — the T02 Recipe HTML block section should return zero non-ASCII lines. (Prose sections above the Recipe block may contain native UTF-8 for readability — that is acceptable.)

7. Confirm the draft is non-empty and well-formed: `wc -l .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` should return ≥ 80 lines.

## Must-Haves

- [ ] Draft file exists and is non-empty
- [ ] S18-1 prose covers all four documented episodes: Asociación de Mayo, bloqueo francés connection, Alberdi's dissent, Comisión Argentina
- [ ] S18-2 prose accurately states: Lavalle invasion July 1840; Avellaneda executed 3 November 1841; Lavalle died 9 October 1841 in Jujuy
- [ ] `card-nota-historiografica` on S18-1 is scoped to the pretext argument only (not a general tiranía judgment)
- [ ] Scope compliance checklist confirms S18/S19/S22 boundary is respected
- [ ] T02 Recipe HTML block is present and all non-ASCII in that block are HTML entities
- [ ] No image block on S18-1; map image block present on S18-2 with confirmed Wikimedia URL

## Verification

- `test -s .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md && echo DRAFT_OK`
- `wc -l .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` (should be ≥ 80)
- `grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` (should be ≥ 1)

## Inputs

- `.gsd/milestones/M008/slices/S18/S18-RESEARCH.md` — full content notes for both cards including confirmed image URL, source list, prose bullets, and card-nota-historiografica content
- `.gsd/KNOWLEDGE.md` — entity encoding protocol (D053), card template patterns, scope boundary rules
- Prior card examples in `index.html`: S17-1 (card-opinion without image, line ~1850), S16-1 (card-hecho with image), S14-1/S14-2 (card-hecho with certeza indicator)

## Expected Output

- `.gsd/milestones/M008/slices/S18/S18-CONTENT-DRAFT.md` — complete content draft with readable prose sections, scope compliance checklist, and verbatim T02 Recipe HTML block ready for mechanical splice by T02

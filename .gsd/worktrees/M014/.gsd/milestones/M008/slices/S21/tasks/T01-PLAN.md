---
estimated_steps: 6
estimated_files: 1
---

# T01: Author S21 content draft with two-card prose and entity-encoded T02 Recipe block

**Slice:** S21 — La Suma del Poder Público — ¿avalada por todas las provincias?
**Milestone:** M008

## Description

Author `S21-CONTENT-DRAFT.md` with historically accurate prose for two cards and a verbatim entity-encoded HTML Recipe block for T02 to splice. This task is where all accuracy, scope, and certeza decisions are made.

**Scope discipline:** S14-1 already covers the plebiscite event (9,316 votes, 13 April 1835 Legislatura formalization, "Restaurador de las Leyes" title). S21 must NOT re-narrate those facts. S21's contribution is: (1) what the Suma *meant* constitutionally, with the 14-province geography and the jurisdictional distinction between Buenos Aires and the other provinces; (2) the historiographic debate over whether the other provinces actually "endorsed" it.

**certeza taxonomy:**
- S21-1: `data-certeza="hecho"` — the constitutional mechanics and jurisdictional structure are documented, not disputed.
- S21-2: `data-certeza="opini&#xF3;n"` (entity-encoded) with `card-nota-historiografica` — the endorsement question is interpretive, not a contested fact. Per D057/D058: use "opinión" (💬) for interpretive/historiographic interpretation cards, not "debatido" (⚖) which is for genuinely contested facts.

## Steps

1. **Write S21-1 prose section** (`card-hecho`):
   - Explain that the Suma del Poder Público (Ley del 13 de abril de 1835) concentrated executive, legislative, and judicial powers in the gobernador of Buenos Aires, effectively dissolving the Legislatura as a co-equal branch. Do NOT narrate the plebiscite or the 13 April 1835 event — S14-1 covers that. Simply reference that the Suma was granted in early 1835.
   - List the 14 provinces of the Confederation in 1835: Buenos Aires, Córdoba, Corrientes, Entre Ríos, Santa Fe, Santiago del Estero, Tucumán, Salta, Mendoza, San Juan, La Rioja, Catamarca, San Luis, Jujuy (Jujuy became autonomous from Salta in 1834).
   - Explain the jurisdictional structure: each province was sovereign over its own internal affairs under the Confederation model. The Pacto Federal (4 January 1831) delegated only *relaciones exteriores* to Buenos Aires/Rosas — NOT a national legislature or national executive. The Suma was therefore legally a Buenos Aires-internal instrument; it granted Rosas extraordinary powers as *gobernador de Buenos Aires*, not as a national ruler. He could not pass laws binding Córdoba or Tucumán by virtue of the Suma.
   - Image: Carlos Pellegrini, "Buenos Aires — San Nicolás" (ca. 1829). URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buenos_Aires_-_San_Nicol%C3%A1s_-_Carlos_Pellegrini.jpg/500px-Buenos_Aires_-_San_Nicol%C3%A1s_-_Carlos_Pellegrini.jpg`. License: Public Domain.
   - Sources: Lynch, J., *Argentine Dictator*, Oxford, 1981, cap. 4; Myers, J., *Orden y virtud*, UNQ, 1995; Zinny, A., *Historia de los gobernadores de las Provincias Argentinas*, Buenos Aires, 1882; Saldías, A., *Historia de la Confederación Argentina*, t. II, 1892.

2. **Write S21-2 prose section** (`card-opinion`, `data-certeza="opinión"`):
   - Frame the interpretive question: "¿Avalaron las provincias la Suma del Poder Público?"
   - Present three positions with explicit author + title + year attribution:
     - **Revisionista** (Irazusta, Rosa): El Pacto Federal otorgó a Rosas autoridad nacional de facto; los 14 gobernadores estaban alineados con la causa federal; la Suma fue la expresión formal de lo que ya era la realidad política de la Confederación. Cita: Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941.
     - **Liberal** (Mitre): La Suma fue un acto interno de Buenos Aires; ninguna provincia otorgó formalmente la concentración de los tres poderes en Rosas. El silencio de las demás provincias refleja la dominación coercitiva de Rosas, no un consentimiento genuino. Cita: Mitre, B., *Historia de Belgrano y de la Independencia Argentina*, Buenos Aires, 1857.
     - **Síntesis contemporánea** (Lynch 1981, Myers 1995): Jurídicamente, la Suma estaba confinada a Buenos Aires. En la práctica, Rosas la ejerció como instrumento nacional de facto al controlar las rentas aduaneras y el reconocimiento diplomático. La confusión conceptual entre "gobernador de Buenos Aires con poderes extraordinarios" y "conductor nacional" fue una ambigüedad deliberada que sirvió a los intereses de Rosas. Cita: Lynch, J., *Argentine Dictator*, cap. 4; Myers, J., *Orden y virtud*, cap. 2.
   - No image for S21-2 (consistent with M008 opinion/debate card pattern: S17-1, S18-1, S19-1, S19-2 all lack images).

3. **Write T02 Recipe block** — the verbatim entity-encoded HTML for both cards:
   - S21-1: `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="S21-1" style="--reveal-delay: 0ms">` with `card-image` div, `event-card__year`, `event-card__title`, `event-card__excerpt`, `card-source` footer with `<cite>` element.
   - S21-2: `<article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" data-id="S21-2" style="--reveal-delay: 80ms">` with certeza icon `&#x1F4AC;` (💬), `event-card__year`, `event-card__title`, `event-card__excerpt`, `<p class="card-nota-historiografica">` block (three positions, each with attribution), `card-source` footer with `<cite>` element.
   - `card-nota-historiografica` placement: INSIDE the `<article>` body, AFTER `<p class="event-card__excerpt">`, BEFORE `<footer class="card-source">`. This is the confirmed pattern from S14-3, S15-2, S16-3, S17-1, S18-1, S19-2.
   - All non-ASCII characters entity-encoded: accented vowels (á=`&#xE1;`, é=`&#xE9;`, í=`&#xED;`, ó=`&#xF3;`, ú=`&#xFA;`), ñ=`&#xF1;`, ü=`&#xFC;`, em-dash=`&#x2014;`, en-dash=`&#x2013;`, opening angle quote=`&#xAB;`, closing angle quote=`&#xBB;`, left curly quote=`&#x201C;`, right curly quote=`&#x201D;`, emoji entity as needed.

4. **Run entity-check on T02 Recipe block**:
   ```
   node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md','utf8'); const recipe=f.slice(f.indexOf('## T02 Recipe')); const lines=recipe.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(lines.length===0?'PASS':'FAIL: '+lines.length+' non-ASCII lines');"
   ```
   Must return PASS. If FAIL, find and fix each raw non-ASCII character.

5. **Scope boundary check**: confirm the Recipe block does NOT standalone-assert the plebiscite vote count or the exact Legislatura date as new information. If `9,316` or `13 de abril` appear as prose claims in the Recipe block, reframe as a back-reference to S14-1 ("con la Suma ya otorgada en abril de 1835…") or remove.

6. **Verify section structure**:
   ```
   grep -c '## S21-' .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md   # → 2
   grep -c '## T02 Recipe' .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md  # → 1
   ```

## Must-Haves

- [ ] S21-1 prose covers: 3-power concentration, 14 provinces list, jurisdictional distinction (BA Legislatura ≠ national grant), Pacto Federal as the only inter-provincial instrument.
- [ ] S21-1 does NOT re-narrate: plebiscite event, 9,316 vote count, 13 April 1835 date, "Restaurador de las Leyes" title (these are in S14-1).
- [ ] S21-2 prose presents three historiographic positions each with explicit author + title + year.
- [ ] S21-2 uses `data-certeza="opini&#xF3;n"` (entity-encoded) with certeza icon 💬 (`&#x1F4AC;`), not "debatido" (⚖).
- [ ] `card-nota-historiografica` is inside the S21-2 article, after the excerpt paragraph, before the footer.
- [ ] T02 Recipe block is entity-encoded — entity-check passes (0 non-ASCII lines in Recipe section).
- [ ] Plebiscite figure if referenced: 9,316 (matches S14-1, per D051).

## Verification

- `test -s .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` — file exists and is non-empty
- `grep -c '## S21-' .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` returns 2
- `grep -c '## T02 Recipe' .gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` returns 1
- Node.js entity-check on Recipe block returns PASS

## Inputs

- `.gsd/milestones/M008/slices/S21/S21-RESEARCH.md` — historical content notes, source list, image URL, certeza decisions, scope boundary rules.
- `index.html` lines around S14-1 (grep for `data-id="S14-1"`) — confirms what S14-1 already covers so S21-1 doesn't duplicate.
- Prior opinion card examples in `index.html` — grep for `card-nota-historiografica` to verify placement pattern.
- `S20-CONTENT-DRAFT.md` — reference for T02 Recipe block structure (entity encoding, card anatomy).

## Expected Output

- `.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` — new file with:
  - Section `## S21-1`: prose for the hecho card (constitutional mechanics + 14 provinces + jurisdictional distinction)
  - Section `## S21-2`: prose for the opinion card (three-position historiographic debate)
  - Section `## T02 Recipe`: entity-encoded HTML for both cards, ready for T02 splice

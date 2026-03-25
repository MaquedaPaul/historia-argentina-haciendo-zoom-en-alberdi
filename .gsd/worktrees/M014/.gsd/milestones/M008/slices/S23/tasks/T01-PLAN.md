---
estimated_steps: 5
estimated_files: 1
---

# T01: Author S23-CONTENT-DRAFT.md with Encarnación Ezcurra cards and entity-encoded T02 Recipe

**Slice:** S23 — Encarnación Ezcurra — influencia sobre mujeres y apoyo a Rosas
**Milestone:** M008

## Description

Research and write the content draft for two cards covering the political role of Encarnación Ezcurra:

- **S23-1** (`card-hecho`): The Sociedad Popular Restauradora and the intelligence correspondence (1833–1838). Documents the factual record: Encarnación as political operator while Rosas was on the desert campaign, her intelligence-gathering letters to Rosas (published 1923, AGN Sala X), cross-class network (elite + pardos, mulatos, negros, orilleros), organisation of the Revolución de los Restauradores (October 1833, toppling governor Balcarce), the Sociedad Popular Restauradora (ca. 1833) whose brazo armado *became* the Mazorca — after her death. Encarnación died 20 October 1838. Image: García de Molino / Morel 1835 portrait (500px thumb, PD).
- **S23-2** (`card-opinion`): ¿Cuánto poder propio tenía Encarnación? The historiographic debate over the degree of her independent political agency. Two-position nota historiográfica: Irazusta (revisionista: co-architect, comparable to great women rulers) vs. Lynch cap. 5 (synthesis: essential but deployed *in function of* Rosas's project, autonomous agency unresolvable from correspondence). No image.

The draft must produce both readable prose and a fully entity-encoded `## T02 Recipe` HTML block ready for mechanical splice. This task is the only real risk in the slice — T02 is mechanical once T01 is correct.

## Steps

1. **Read a recent S23-class card pair from index.html for structural reference.** Run:
   ```bash
   grep -n 'data-id="S20-1"' index.html
   ```
   Then read ~80 lines from that position to study the two-card pattern: card-hecho structure (certeza indicator block, year span, title h3, excerpt p, card-image, card-source footer) and card-opinion structure (certeza indicator, year, title h3, excerpt p, card-nota-historiografica p, card-source footer without image).

   Also check the stagger delay values used in S20/S21/S22 to confirm the 0ms/80ms per-slice reset pattern.

2. **Review key historical facts and constraints from S23-RESEARCH.md (inlined in slice context):**
   - Born 25 March 1795, Buenos Aires (Museo Histórico Nacional)
   - Married Rosas en 1813 (exact day disputed — use year only: "en 1813")
   - Active as political operator from August 1833 during Rosas's desert campaign
   - Letters to Rosas 1833–1834, published 1923, AGN Sala X
   - Organised the Revolución de los Restauradores, October 1833, toppling Balcarce
   - Cross-class network: elite + pardos, mulatos, negros, orilleros
   - Sociedad Popular Restauradora, ca. 1833; brazo armado = *became* La Mazorca (after her death)
   - Died 20 October 1838, disease, aged 43
   - Funeral: most solemn given to a woman in 19C Río de la Plata (4 independent sources)
   - **Key constraint:** She died before the Mazorca became the main repressive instrument (1839–1842). Use "Sociedad Popular Restauradora" not "la Mazorca" when describing her organisation.
   - **Quote constraint:** The Encarnación quote ("Tus amigos, la mayoría de casaca…") appears in secondary literature citing AGN. Per KNOWLEDGE.md, never synthesize a direct quote from secondary sources — use attributed paraphrase or contextual description, not blockquote format.
   - **Lynch cap. 5 constraint:** The phrase about Encarnación being "la más hábil operadora política de su tiempo en Buenos Aires" is attributed to Lynch in secondary literature. Use `[atribuida a Lynch]` note, attributed-paraphrase pattern — no direct quote block.

3. **Write the draft file** at `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` with three sections:

   **Section `## S23-1`** (prose description):
   - Card type: `card-hecho`, `data-certeza="hecho"`, certeza indicator: `✓` / `Hecho documentado`
   - Stagger: `--reveal-delay: 0ms`
   - Year display: `1833–1838`
   - Title: `La Sociedad Popular Restauradora y las cartas a Rosas`
   - Excerpt (2–4 sentences): Encarnación managed the federal political network in Buenos Aires while Rosas was away on the desert campaign (1833–1835); she organised the Revolución de los Restauradores (October 1833) that toppled the Balcarce government; her intelligence-gathering letters to Rosas (published 1923 from AGN Sala X) document a sophisticated cross-class mobilisation reaching elite circles and the black and mulato communities; she died 20 October 1838 — the Sociedad Popular Restauradora's brazo armado only became the fully-developed Mazorca after her death.
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Encarnacion_Ezcurra_1835.jpg/500px-Encarnacion_Ezcurra_1835.jpg`
   - Alt text: Portrait of Encarnación Ezcurra, wife of Juan Manuel de Rosas and key political operator of the Restoration period
   - Caption: `Fernando Garc&#xED;a de Molino y Carlos Morel, ca. 1835&#x2013;36. Wikimedia Commons. Dominio p&#xFA;blico.`
   - Sources: Museo Histórico Nacional; AGN Sala X (cartas 1833–1834); mujeresbonaerenses.gba.gob.ar; museohistoriconacional.cultura.gob.ar; institutorosas.cultura.gob.ar
   - Cite footer: `Museo Hist&#xF3;rico Nacional; AGN Sala X, cartas 1833&#x2013;34; Lynch, J., Argentine Dictator, Oxford, 1981, cap. 5`

   **Section `## S23-2`** (prose description):
   - Card type: `card-opinion`, `data-certeza="opini&#xF3;n"`, certeza indicator: `💬` / `Interpretaci&#xF3;n historiogr&#xE1;fica`
   - Stagger: `--reveal-delay: 80ms`
   - Year display: `debate historiogr&#xE1;fico`
   - Title: `&#xBF;Cu&#xE1;nto poder propio ten&#xED;a Encarnaci&#xF3;n?`
   - Excerpt (1–2 sentences): La eficacia pol&#xED;tica de Encarnaci&#xF3;n es reconocida por todas las corrientes historiogr&#xE1;ficas; el debate es sobre el grado de agencia aut&#xF3;noma que ejerci&#xF3; — si fue co-arquitecta del rosismo o una operadora extraordinaria al servicio del proyecto de Rosas.
   - card-nota-historiografica, two-position format:
     - **Revisionista (Irazusta, J., *Vida pol&#xED;tica de Juan Manuel de Rosas*, Buenos Aires, 1941):** Irazusta placed Encarnación among the great political women of history — comparable in temperament to Isabel de Inglaterra or Catalina la Grande. Her role was *co-constitutive* of the rosista project: she did not merely manage communications but shaped the political base that made the second mandate possible.
     - **S&#xED;ntesis contempor&#xE1;nea (Lynch, J., *Argentine Dictator*, Oxford, 1981, cap. 5):** Lynch considered her work essential — she created the political conditions for Rosas's return — but framed her activity as *deployed in function of* Rosas's project. The surviving correspondence was always framed as reports *to him*, making the question of autonomous agency unresolvable from the documentary record.
   - No image for S23-2 (mirrors S21-2 no-image pattern)
   - Sources: Irazusta, J. (1941); Lynch, J. (1981, cap. 5)

   **Section `## T02 Recipe`** — the verbatim HTML to splice, **fully entity-encoded** (no raw non-ASCII characters in this block). Follow the entity mapping established in D053:
   - `ó` → `&#xF3;`
   - `é` → `&#xE9;`
   - `á` → `&#xE1;`
   - `í` → `&#xED;`
   - `ú` → `&#xFA;`
   - `ñ` → `&#xF1;`
   - `ü` → `&#xFC;`
   - `¿` → `&#xBF;`
   - `«` → `&#xAB;`
   - `»` → `&#xBB;`
   - `—` → `&#x2014;`
   - `–` → `&#x2013;`
   - `"` → `&#x201C;`
   - `"` → `&#x201D;`
   - `💬` → `&#x1F4AC;`
   - `✓` → `&#x2713;`

4. **Run entity check** on the T02 Recipe block:
   ```bash
   node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const lines=r.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(lines.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+lines.length+' lines with non-ASCII');"
   ```
   If ENTITY_FAIL, find and encode the offending characters before proceeding.

5. **Run scope-boundary check** on the T02 Recipe block:
   ```bash
   node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Barranco Yaco','Mazorca','bloqueo franc','bloqueo anglo','Vuelta de Obligado','Caseros']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"
   ```
   Note: "Sociedad Popular Restauradora" is NOT banned — it is the correct term for Encarnación's organisation and must appear in S23-1. Only "Mazorca" (the post-1838 repressive instrument) is banned from the T02 Recipe block.

   If SCOPE_FAIL, revise the T02 Recipe HTML to remove re-narrations of later-period events.

## Must-Haves

- [ ] Draft file exists and is non-empty at `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md`
- [ ] Exactly two card sections (`## S23-1`, `## S23-2`) and one `## T02 Recipe` section
- [ ] S23-1 T02 Recipe HTML: `card-hecho` class, `data-certeza="hecho"`, `data-id="S23-1"`, `reveal reveal-slide`, `--reveal-delay: 0ms`, García de Molino / Morel portrait URL
- [ ] S23-2 T02 Recipe HTML: `card-opinion` class, `data-certeza="opini&#xF3;n"`, `data-id="S23-2"`, `reveal reveal-slide`, `--reveal-delay: 80ms`, no `card-image` block
- [ ] Two-position `card-nota-historiografica` in S23-2 with Irazusta (1941) and Lynch cap. 5 attributed
- [ ] Marriage date uses year only ("en 1813") — no specific month or day
- [ ] "Sociedad Popular Restauradora" used (not "Mazorca") for Encarnación's organisation
- [ ] Death noted as 20 October 1838 with note that Mazorca's main repressive period began after her death
- [ ] Entity check returns ENTITY_PASS
- [ ] Scope-boundary check returns SCOPE_PASS

## Verification

- `test -s .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md`
- Entity check: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const lines=r.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(lines.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+lines.length);"` returns ENTITY_PASS
- Scope check: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Barranco Yaco','Mazorca','bloqueo franc','bloqueo anglo','Vuelta de Obligado','Caseros']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"` returns SCOPE_PASS

## Inputs

- `index.html` — read cards S20-1 or S21-1/S21-2 for structural reference (card-hecho and card-opinion templates with reveal-slide pattern)
- S23-RESEARCH.md — historical facts, image URL, source verification, certeza constraints (already verified; trust its findings)
- KNOWLEDGE.md (preloaded in context) — entity encoding rules (D053), quote verification protocol, grep-P unavailability on Windows, stagger-reset rule

## Expected Output

- `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — prose documentation for S23-1 and S23-2, plus verbatim entity-encoded T02 Recipe HTML block covering both cards

## Observability Impact

**Signals this task changes:**
- `.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md` — created (was absent before T01). A future agent can inspect this file to verify content accuracy, entity encoding, and scope-boundary compliance before running T02.

**How a future agent inspects this task:**
- File exists: `test -s .gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md && echo FILE_EXISTS`
- Entity check: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const lines=r.split('\\n').filter(l=>/[^\\x00-\\x7F]/.test(l)); console.log(lines.length===0?'ENTITY_PASS':'ENTITY_FAIL:'+lines.length);"` — returns ENTITY_PASS
- Scope check: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S23/S23-CONTENT-DRAFT.md','utf8'); const r=f.slice(f.indexOf('## T02 Recipe')); const banned=['Barranco Yaco','Mazorca','bloqueo franc','bloqueo anglo','Vuelta de Obligado','Caseros']; const found=banned.filter(b=>r.includes(b)); console.log(found.length===0?'SCOPE_PASS':'SCOPE_FAIL:'+found.join(','));"` — returns SCOPE_PASS

**Failure state visible as:**
- Missing file: `test -s` fails → T01 did not complete
- ENTITY_FAIL: T02 Recipe block contains raw non-ASCII characters → encoding step incomplete
- SCOPE_FAIL: T02 Recipe mentions banned terms → content exceeds Encarnación's 1838 death boundary

**No index.html changes in T01** — all index.html changes are deferred to T02; this task only writes the content draft.


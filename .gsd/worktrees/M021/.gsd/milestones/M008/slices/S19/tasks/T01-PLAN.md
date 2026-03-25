---
estimated_steps: 4
estimated_files: 1
---

# T01: Author S19-CONTENT-DRAFT.md with historical prose and entity-encoded T02 Recipe HTML

**Slice:** S19 — ¿Rosas fue un tirano?
**Milestone:** M008

## Description

Author the content draft for both S19 cards. This is the high-stakes editorial task: it establishes the historiographic framing, certeza classification, source selection, and scope boundary enforcement before any HTML is touched. The draft has two parts: (1) UTF-8 readable Spanish prose for each card (for review), and (2) a verbatim T02 Recipe HTML block with all non-ASCII entity-encoded, ready for T02 to write directly to `C:/tmp/s19-cards.html`.

**S19-1** — framing card: what "tirano" meant in the 1840s–1850s Argentine context, why the charge was politically loaded, and the core factual dispute (represión real + instituciones ausentes). Opens by picking up S18's explicit forward reference: S18's nota ended with "La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19." S19-1 must bridge from that pretext argument: "las conspiraciones unitarias eran reales — pero ¿convertía su uso como pretexto a Rosas en tirano?"

**S19-2** — three-position `card-nota-historiografica` card, following the D056 pattern from S16-3:
1. **Posición liberal** (Sarmiento, *Facundo*, 1845; Mitre, *Historia de Belgrano*, 1858): Rosas = tiranía sin atenuantes; "civilización vs. barbarie" as the organizing concept.
2. **Posición revisionista** (Irazusta, *Vida política de Juan Manuel de Rosas*, 1941; Rosa, *Historia Argentina*, t. IV–V, 1964): "tirano" = propaganda mitrista; Rosas = estadista soberanista y caudillo popular.
3. **Síntesis contemporánea** (Halperín Donghi, *De la revolución de independencia a la confederación rosista*, Paidós, 1972; Lynch, *Argentine Dictator*, Oxford, 1981, **cap. 10** — NOT cap. 7 which was used in S16; Myers, *Orden y virtud*, UNQ, 1995): régimen autoritario personalista en contexto de ausencia institucional; "tiranía" es anacrónico pero el autoritarismo es real; "régimen personalista con represión selectiva" is more precise.

The nota must end with a scope-boundary sentence: S19 covers the domestic tiranía question (represión, libertades, personalismo) — the soberanía exterior argument (bloqueos inglés y francés, intervención extranjera) belongs to S22.

## Steps

1. Create `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` with UTF-8 readable prose sections for S19-1 and S19-2 (title, year display, certeza type, excerpt, sources, image notes, scope compliance notes).
2. In the same file, add a clearly delimited "## T02 Recipe — Entity-Encoded HTML" section containing the verbatim HTML for both cards with ALL non-ASCII encoded as HTML entities. Use the entity map from the research doc: `ó`→`&#xF3;`, `á`→`&#xE1;`, `í`→`&#xED;`, `ú`→`&#xFA;`, `é`→`&#xE9;`, `ñ`→`&#xF1;`, `¿`→`&#xBF;`, `—`→`&#x2014;`, `–`→`&#x2013;`, `«»`→`&#xAB;`/`&#xBB;`, `'`→`&#x2019;`.
3. Verify the T02 Recipe block has zero non-ASCII characters using Node.js: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md','utf8'); const recipe=f.split('## T02 Recipe')[1]; if(!recipe){console.log('MISSING RECIPE');process.exit(1);} const bad=recipe.split('\n').filter(l=>/[^\x00-\x7F]/.test(l)); console.log(bad.length===0?'PASS':'FAIL:'+bad.length);"`.
4. Include a scope compliance checklist in the draft confirming: (a) S19 nota does NOT cover soberanía exterior; (b) Lynch citation uses cap. 10 (not cap. 7 which was used in S16-3); (c) no image reuse (Rosas portraits, Sarmiento portrait already used); (d) S18 forward reference picked up in S19-1.

## Must-Haves

- [ ] `S19-CONTENT-DRAFT.md` file exists and is non-empty.
- [ ] S19-1 prose picks up S18's forward reference ("corresponde a S19") and bridges from the pretext argument.
- [ ] S19-2 `card-nota-historiografica` has exactly three labeled positions (liberal / revisionista / síntesis contemporánea), each with at least one explicit Author, Title, Year attribution.
- [ ] Lynch citation in the nota uses **cap. 10** (not cap. 7).
- [ ] S19 nota scope is bounded to domestic tiranía; a boundary sentence explicitly defers soberanía exterior to S22.
- [ ] T02 Recipe HTML block is present and entity-encoded; Node.js ASCII check returns PASS.
- [ ] Both cards use `class="event-card card-opinion reveal reveal-slide"`, `data-certeza="debatido"`, `&#x2696;` certeza icon, label "Debatido historiogr&#xE1;ficamente".
- [ ] S19-1 `--reveal-delay: 0ms`; S19-2 `--reveal-delay: 80ms`.
- [ ] If Mitre portrait is included on S19-2, `<p class="img-attribution">` is inside `.card-image` with full CC BY-SA 4.0 attribution text.

## Verification

- `test -s .gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — file exists and is non-empty
- Node.js entity check on T02 Recipe block returns `PASS` (see Step 3 above)

## Inputs

- `.gsd/milestones/M008/slices/S19/S19-RESEARCH.md` — full content spec: exact sources, three-position format, image candidates, entity encoding map, scope boundary requirements
- `index.html` lines 1835–1865 — S16-3 card as the canonical `debatido` + `card-nota-historiografica` HTML template to follow structurally
- `.gsd/KNOWLEDGE.md` — CC BY-SA attribution pattern, entity encoding protocol, Windows /tmp path convention, grep-c card count rule
- S18 summary (inlined in slice plan) — confirms precondition counts (data-certeza=82, card-nota-historiografica=7), confirms S18's forward reference text ("corresponde a S19")

## Expected Output

- `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — complete content draft: UTF-8 prose review sections for S19-1 and S19-2, plus verbatim entity-encoded T02 Recipe HTML block ready for T02 to use directly.

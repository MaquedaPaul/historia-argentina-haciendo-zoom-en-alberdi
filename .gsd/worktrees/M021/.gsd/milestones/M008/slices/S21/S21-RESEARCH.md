# S21: La Suma del Poder Público — ¿avalada por todas las provincias? — Research

**Date:** 2026-03-23

## Summary

S21 is light-research work. The historical facts are well-documented in the M008 context files, and the implementation pattern is identical to the last 6 slices (S15–S20): write a content draft with entity-encoded HTML, splice before the append marker via Node.js Array.splice.

The key scope discipline is that **S14-1 already covers the granting event** (plebiscite of March 1835, 9,316 votes, Legislatura formalization, "Restaurador de las Leyes" title). S21 must NOT repeat that. S21's distinct contribution is:
- **S21-1** (card-hecho): The constitutional meaning of the Suma — what "concentration of the three powers" actually meant, with the list of 14 provinces, and the structural distinction between "Buenos Aires Legislatura grants Rosas's gubernatorial powers" vs. "the other provinces had no competence to grant anything."
- **S21-2** (card-opinion with card-nota-historiografica): Whether the other provinces "endorsed" the Suma — the factual answer (they didn't formally; they adhered via the Pacto Federal and raised no protest) plus the historiographic debate (revisionists call it a federal mandate; liberals call it an imposition).

The `data-certeza` count is currently **86**. S21 adds 2 cards → target **88**.

The append marker is at line **1972**. Always re-derive via `grep -n 'cards will be appended here by subsequent slices'` before the Node.js splice.

## Recommendation

Two-card pattern: `card-hecho` (S21-1) + `card-opinion` (S21-2), both using `reveal reveal-slide`, stagger 0ms / 80ms. S21-2 gets `data-certeza="opini&#xF3;n"` (entity-encoded) with `card-nota-historiografica` per the M008 taxonomy — this is an interpretive legitimacy question, not a contested fact, so "opinión" (💬) is correct, not "debatido" (⚖).

One image for S21-1. S21-2 can be image-free (consistent with S15-2, S17-1, S19-1/S19-2 which have no images, and with the opinion/debate card pattern established in M008).

For S21-1 image: **Carlos Pellegrini, "Buenos Aires — San Nicolás" (ca. 1829)** — a period painting of the Buenos Aires institutional landscape that has not yet been used on the page. URL confirmed via Wikimedia API: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buenos_Aires_-_San_Nicol%C3%A1s_-_Carlos_Pellegrini.jpg/500px-Buenos_Aires_-_San_Nicol%C3%A1s_-_Carlos_Pellegrini.jpg`. License: Public Domain.

**Plebiscite figure: use 9,316** (not 9,320 from S21-CONTEXT.md). S14-1 already uses 9,316, and per Decision D051, the live page is the source of truth for consistency. S21 should not introduce a contradictory figure on the same page.

## Implementation Landscape

### Key Files

- `index.html` — target file; splice point at `<!-- S10–S24 cards will be appended here by subsequent slices -->` (currently line 1972, use grep to confirm before each splice).
- `.gsd/milestones/M008/slices/S21/S21-CONTENT-DRAFT.md` — T01 output: prose content + T02 Recipe block with entity-encoded HTML for both cards.
- `C:/tmp/s21-cards.html` — temp file written by T02 before Node.js splice.
- `C:/tmp/index.html.bak-s21` — backup before splice.

### Build Order

1. **T01 — Content draft**: author `S21-CONTENT-DRAFT.md`. Two sections:
   - S21-1 prose (card-hecho): constitutional meaning of the Suma (3-power concentration), the 14 provinces with their names, the structural distinction between BA Legislatura jurisdiction and provincial non-competence, the plebiscite result (9,316 / 4), and the Pacto Federal as the instrument that linked provinces to Rosas's foreign-policy authority without granting him domestic legislative/judicial power over them.
   - S21-2 prose (card-opinion): the interpretive question — "did the provinces endorse the Suma?" — with a card-nota-historiografica presenting: (1) the revisionista reading (Irazusta, Rosa: provinces recognized Rosas as encargado de relaciones exteriores via Pacto Federal = de facto federal mandate); (2) the liberal reading (Mitre, Sarmiento: the Suma was a Buenos Aires internal act; other provinces' silence was fear or indifference, not consent); (3) contemporary synthesis (Lynch 1981 cap. 4; Myers 1995): the grant was legally confined to Buenos Aires; Rosas used the authority beyond its scope by treating his Buenos Aires powers as a de facto Confederation mandate without any formal instrument to support this.
   - T02 Recipe block: entity-encoded HTML for both cards.

2. **T02 — Splice**: Write temp file → backup index.html → Node.js splice → verify.

### Verification Approach

After T02 splice:
```
grep -c 'data-certeza' index.html               # → 88
grep -c 'data-id="S21-' index.html              # → 2
grep -c 'cards will be appended here' index.html # → 1 (marker intact)
git diff --name-only HEAD -- styles.css app.js   # → (empty)
test -s C:/tmp/index.html.bak-s21 && echo BACKUP_OK
```

## Constraints

- **Zero new CSS/JS** — hard constraint throughout M008.
- **Do not repeat S14-1 content**: plebiscite event narrative, 9,316 figure, Legislatura formalization, "Restaurador de las Leyes" are already in the page. S21 adds constitutional meaning and provincial scope analysis.
- **Entity-encode all non-ASCII** in the T02 Recipe HTML block (Windows shell encoding risk — see KNOWLEDGE.md). Prose sections of the draft use native UTF-8.
- **Node.js splice uses ASCII-only marker substring**: `'cards will be appended here by subsequent slices'` — NOT the full comment with en-dash (see KNOWLEDGE.md).
- **Plebiscite figure**: 9,316 (per D051 — matches S14-1).
- **certeza for S21-2**: `data-certeza="opini&#xF3;n"` (entity-encoded) with 💬 icon, per D057/D058 taxonomy. The endorsement question is interpretive (opinión), not a contested fact (debatido).
- **`/tmp` path**: use `C:/tmp/` in plans; at runtime, check if `/tmp/` works and fall back to `C:/tmp/` if not (see KNOWLEDGE.md).

## Common Pitfalls

- **S14-1 scope collision** — the temptation is to repeat "9,316 votes, Legislatura, 13 April 1835." S21-1 should REFERENCE these facts (e.g. "Con la Suma otorgada en abril de 1835...") but not narrate them. The S21 angle is constitutional mechanics and provincial geography, not the event.
- **Plebiscite figure mismatch** — S21-CONTEXT.md says 9,320; the live page at S14-1 says 9,316 (D051). Use 9,316 always.
- **card-nota-historiografica placement** — must be INSIDE the `<article>` body, AFTER the `<p class="event-card__excerpt">`, BEFORE the `<footer class="card-source">`. Pattern confirmed across S14-3, S15-2, S16-3, S17-1, S18-1, S19-2.
- **stagger reset** — S21 starts its own stagger at 0ms / 80ms. Do not continue from S20's delays.
- **en-dash in marker** — `grep -n 'S10–S24'` will fail if shell escaping mangles the en-dash. Always use `grep -n 'cards will be appended here by subsequent slices'` instead.
- **T01 artifact check** — T02 must verify `test -s S21-CONTENT-DRAFT.md` before proceeding; if auto-stub'd, author the draft first.

## Historical Content Notes for T01

### S21-1 factual grounding
- **The Suma del Poder Público** (Ley de 13 de abril de 1835): concentrated executive, legislative, and judicial powers in the gobernador. The Buenos Aires Legislatura effectively dissolved itself as a co-equal branch.
- **14 provinces in 1835**: Buenos Aires, Córdoba, Corrientes, Entre Ríos, Santa Fe, Santiago del Estero, Tucumán, Salta, Mendoza, San Juan, La Rioja, Catamarca, San Luis, Jujuy (autonomous since 1834).
- **Jurisdictional structure**: In the Argentine Confederation (1831–1853), each province was sovereign over its own internal affairs. The Pacto Federal (4 January 1831) delegated only *relaciones exteriores* to the signatory with the strongest position — effectively Buenos Aires / Rosas. It did NOT create a national legislature or national executive.
- **What the Suma meant for non-BA provinces**: nothing legally. Rosas could not pass laws binding Córdoba or Tucumán by virtue of the Suma. He could — and did — use diplomatic and military pressure to align provincial governors, but the Suma itself was a Buenos Aires instrument.
- **Sources**: Lynch, J., *Argentine Dictator*, Oxford, 1981, cap. 4 (the mechanism); Myers, J., *Orden y virtud*, UNQ, 1995 (the discourse of legitimation); Zinny, A., *Historia de los gobernadores*, 1882 (provincial list); Saldías, A., *Historia de la Confederación Argentina*, t. II, 1892 (primary text citation for the plebiscite).

### S21-2 historiographic positions
- **Revisionista** (Irazusta, Rosa): The Pacto Federal gave Rosas de facto national authority; all 14 governors were aligned with the federal cause; the Suma was the formal expression of what was already the political reality of the Confederation. Citation: Irazusta, J., *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941.
- **Liberal** (Mitre, Sarmiento): The Suma was a Buenos Aires act; no province formally endorsed the concentration of all three powers in Rosas. The fact that other provinces didn't protest reflects Rosas's coercive dominance, not genuine consent. Citation: Mitre, B., *Historia de Belgrano y de la Independencia Argentina*, 1857.
- **Contemporary synthesis** (Lynch 1981, Myers 1995): Legally, the Suma was confined to Buenos Aires. Practically, Rosas wielded it as a de facto national instrument by controlling customs revenue (the Aduana) and diplomatic recognition. The conceptual confusion between "Buenos Aires governor with extraordinary powers" and "national ruler" is itself a key feature of the Confederation — it was a deliberate ambiguity that served Rosas's interests. Lynch, cap. 4; Myers, cap. 2.

## Sources

- S21-CONTEXT.md — preloaded slice context (confirmed via file read)
- M008-CONTEXT.md — Content Map section S21 (preloaded)
- index.html live — S14-1 card text confirmed at line 1729 (scope boundary)
- Decision D051 — plebiscite figure 9,316 (consistency rule)
- Decision D057/D058 — certeza taxonomy: opinión for interpretive questions
- KNOWLEDGE.md — splice pattern, en-dash rule, /tmp rule, entity-encoding rule
- S20-SUMMARY.md — Forward Intelligence: current data-certeza=86, marker at ~1972, Lynch citation chain

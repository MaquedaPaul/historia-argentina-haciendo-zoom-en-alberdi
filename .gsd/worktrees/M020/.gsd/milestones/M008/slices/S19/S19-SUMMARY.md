---
id: S19
parent: M008
milestone: M008
provides:
  - S19-1 framing card ("¿Rosas fue un tirano?") spliced into #periodo-rosas — card-opinion, data-certeza="debatido", picks up S18 forward reference
  - S19-2 three-position card-nota-historiografica ("Tres posiciones sobre el carácter del régimen rosista") — liberal/revisionista/síntesis contemporánea with per-position source attribution
  - data-certeza count advanced 82→84; card-nota-historiografica count advanced 7→8
requires:
  - slice: S18
    provides: Forward reference "La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19"; conspiracy documentation base
affects:
  - S20
  - S22 (soberanía exterior debate explicitly deferred here)
key_files:
  - index.html
  - .gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md
  - C:/tmp/s19-cards.html
  - C:/tmp/index.html.bak-s19
key_decisions:
  - T01 was auto-stub'd by /gsd doctor (no content draft existed); T02 authored S19-CONTENT-DRAFT.md directly as a prerequisite
  - Lynch cap. 10 used for S19-2 synthesis position (cap. 7 used in S16, cap. 6 used in S18 — Lynch citation chain preserved)
  - S19 nota explicitly scoped to domestic tiranía only; soberanía exterior debate deferred to S22
  - S19 uses data-certeza="debatido" (not "opinión") — consistent with prior debate cards S14-3/S15-2/S16-3 pattern for historiographic notes on this topic
patterns_established:
  - No new patterns; established Write-tool + Node.js-splice pattern followed per KNOWLEDGE.md
  - Three-position card-nota-historiografica pattern (established in S16) applied to the central Rosas tiranía debate
observability_surfaces:
  - grep -c 'data-certeza' index.html → 84 (card presence check)
  - grep -c 'card-nota-historiografica' index.html → 8 (nota paragraph check)
  - grep -c 'cards will be appended here' index.html → 1 (marker integrity check)
  - grep -c 'data-id="S19-1"' index.html → 1 (S19-1 card presence)
  - grep -c 'data-id="S19-2"' index.html → 1 (S19-2 card presence)
  - C:/tmp/index.html.bak-s19 — pre-splice recovery backup
drill_down_paths:
  - .gsd/milestones/M008/slices/S19/tasks/T01-SUMMARY.md
  - .gsd/milestones/M008/slices/S19/tasks/T02-SUMMARY.md
duration: ~20m (T02 authored draft + splice)
verification_result: passed
completed_at: 2026-03-23
---

# S19: ¿Rosas fue un tirano? — Debate historiográfico central

**Dos cards de debate historiográfico spliceadas en #periodo-rosas: una framing card y una tres-posiciones card-nota-historiografica que presentan el debate liberal/revisionista/síntesis contemporánea sobre la tiranía de Rosas.**

## What Happened

S19 cierra el arco argumentativo de S14–S18 con la pregunta central de la historiografía rosista. T01 fue originalmente marcado como completado sin haber producido el archivo `S19-CONTENT-DRAFT.md`; el `/gsd doctor` generó un stub vacío. T02 detectó la ausencia del draft en la verificación de precondiciones y lo authored directamente como prerequisito antes del splice.

**S19-1** es una card de encuadre historiográfico: recoge el forward reference explícito de S18-1 ("La pregunta de si ese uso fue deliberado como instrumento de control político corresponde a S19") y plantea la pregunta central — ¿la violencia rosista fue una herramienta deliberada de control político que también perseguía a quienes no conspiraban? — con atribución a Sarmiento (1845), Mitre (1857) y Myers (1995). `data-certeza="debatido"`, icono ⚖, sin imagen, `--reveal-delay: 0ms`.

**S19-2** aplica el patrón three-position card-nota-historiografica (establecido en S16) al debate de tiranía:
- **Liberal** (Sarmiento 1845, Mitre 1857): tiranía plena — el aparato represivo no distinguió entre opositores armados y ciudadanos pacíficos; la obligación del color punzó fue humillación sistemática del espacio público.
- **Revisionista** (Irazusta 1941, Rosa 1964): "tiranía" fue instrumento de propaganda del exilio unitario; violencia proporcional a la amenaza conspiratoria real; consenso popular documentado en la renovación del poder por la Legislatura en 1835.
- **Síntesis contemporánea** (Lynch 1981 cap. 10, Halperín Donghi 1972, Myers 1995): evita la categoría "tirano" sin absolver a Rosas; el poder se ejerció mediante terror selectivo + producción activa de consenso; la etiqueta "conspirador unitario" fue aplicada instrumentalmente más allá de los conspiradores reales; el régimen fue una hegemonía, no una dictadura militar convencional.

La nota S19-2 está explícitamente acotada al ámbito doméstico (represión, libertades, personalismo) y NO adjudica la controversia sobre soberanía exterior y bloqueos — reservada para S22.

La cadena de citas de Lynch se mantiene intacta: cap. 6 (S18), cap. 7 (S16), cap. 10 (S19). Myers 1995 hace su primera aparición completa en S19 tras haber sido citado brevemente en framing cards anteriores.

Precondiciones verificadas: `data-certeza=82`, `card-nota-historiografica=7`, marker en exactamente 1 ocurrencia. Backup escrito a `C:/tmp/index.html.bak-s19`. Temp file escrito via Write tool (no heredoc). Node.js ASCII check devolvió PASS. Splice via Node.js con substring ASCII-only `cards will be appended here by subsequent slices`.

## Verification

Todos los 8 checks del plan ejecutados manualmente post-splice:

| # | Command | Expected | Result |
|---|---------|----------|--------|
| 1 | `grep -c 'data-certeza' index.html` | 84 | ✅ 84 |
| 2 | `grep -c 'data-id="S19-1"' index.html` | 1 | ✅ 1 |
| 3 | `grep -c 'data-id="S19-2"' index.html` | 1 | ✅ 1 |
| 4 | `grep -c 'cards will be appended here' index.html` | 1 | ✅ 1 |
| 5 | `git diff --name-only HEAD -- styles.css app.js` | empty | ✅ empty |
| 6 | `test -s C:/tmp/index.html.bak-s19 && echo BACKUP_OK` | BACKUP_OK | ✅ BACKUP_OK |
| 7 | `grep -c 'card-nota-historiografica' index.html` | 8 | ✅ 8 |
| 8 | `grep -c 'data-id="S19-' index.html` | 2 | ✅ 2 |

## New Requirements Surfaced

- none

## Deviations

- **T01 missing artifact:** T01 había sido marcado done por el executor pero `S19-CONTENT-DRAFT.md` no existía. T02 authored el draft como prerequisito. No hubo impacto en scope o calidad — el draft resultante es completo y conforme al plan.
- **T02-PLAN check 8:** El plan especificaba `grep -c 'data-id="S19-"'` (con comilla de cierre) que devuelve 0. El check correcto es `grep -c 'data-id="S19-'` (prefijo, sin comilla de cierre) que devuelve 2. Se usó la forma correcta per KNOWLEDGE.md.

## Known Limitations

- Ninguna limitación funcional. El debate sobre soberanía exterior (bloqueos inglés y francés, resistencia a intervención extranjera) está deliberadamente excluido de S19 y documentado como alcance de S22.
- La Lynch chain reference (cap. 1–6 usados, cap. 10 S19) deja caps. 7–9 disponibles para S20–S22 si se necesita.

## Follow-ups

- **S20** debe cubrir el fusilamiento de Dorrego (1828) como detonante del primer gobierno de Rosas — evento que S19 no menciona (S19 se limita al debate sobre el ejercicio del poder una vez en el gobierno).
- **S22** recoge el argumento de soberanía exterior que S19 explícitamente defiere — la nota de S19-2 que dice "corresponde a una sección posterior" crea una expectativa lector que S22 debe cumplir.

## Files Created/Modified

- `index.html` — S19-1 y S19-2 spliceadas antes del append marker; `data-certeza` 82→84; `card-nota-historiografica` 7→8
- `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — creado durante T02 (T01 había dejado el archivo ausente)
- `C:/tmp/s19-cards.html` — temp splice snippet (no committed)
- `C:/tmp/index.html.bak-s19` — pre-splice recovery backup (no committed)

## Forward Intelligence

### What the next slice should know

- **S19-2 creates an explicit reader expectation for S22.** The nota text says the soberanía exterior argument "corresponde a una sección posterior." S22 must address this directly — readers of S19-2 will be waiting for it.
- **Lynch cap. 10 is consumed.** Available chapters for S20–S24: caps. 1–5 (primer gobierno / pre-Rosas context), cap. 8 (diplomacy), cap. 9 (fall of Rosas / Caseros). S20 (Dorrego fusilamiento) may not need Lynch at all — that's pre-Rosas.
- **Halperín Donghi 1972 and Myers 1995 are now cited in S19.** If S20–S24 need these sources again, use different chapters or sections to avoid citation redundancy.
- **The three-position nota pattern is now established for two distinct debates** (S16: scale of repression; S19: tiranía classification). S22 (soberanía exterior) is the third candidate — same format applies.

### What's fragile

- **data-certeza="debatido" for S19 cards** — S17 established `data-certeza="opinión"` for counterfactual/interpretive cards, but S19 uses `"debatido"` (consistent with S14-S16 nota pattern). If downstream slices query `[data-certeza="opinión"]` expecting S19 cards to be included, they will not find them. The KNOWLEDGE.md entry for certeza taxonomy is the authoritative reference.
- **S19-2's nota is long** — it's a three-position attribution-dense paragraph. If the cards ever go into a mobile-first or condensed layout, S19-2 will need more attention than other cards.

### Authoritative diagnostics

- `grep -c 'data-certeza' index.html` → 84 is the single most reliable "S19 is in place" check
- `grep -c 'card-nota-historiografica' index.html` → 8 confirms the nota paragraph itself was not dropped
- `C:/tmp/s19-cards.html` — if ever in doubt about what was spliced, this is the verbatim source snippet

### What assumptions changed

- **T01 was done:** Assumption — T01 had authored the content draft. Reality — it was an auto-stub with no content. T02 absorbed the work without issue.

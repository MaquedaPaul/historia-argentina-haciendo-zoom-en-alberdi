---
id: T01
parent: S04
milestone: M007
provides:
  - S04-CONTENT-DRAFT.md con 5 bloques BIOG-12..16 verificados, fuentes documentadas, notas de certeza
key_files:
  - .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md
key_decisions:
  - El instrumento en los libros musicales de 1832 es PIANO (no guitarra como indicaba el plan) — confirmado por Dialnet CONICET 2016, Infobae 2023, casarosada.gob.ar, y consistente con BIOG-7 ya en el sitio
  - Alberdi fue colaborador principal de El Iniciador, no co-fundador (los fundadores fueron Andrés Lamas y Miguel Cané)
  - BIOG-14 (músico) requiere dos card-nota-certeza: "primer método publicado en el Río de la Plata" no verificado; "composiciones propias" no verificadas
  - BIOG-15 (economista) requiere una card-nota-certeza: "primer tratado de economía política argentino" no verificado en fuente primaria
  - BIOG-16 clasificada como card-opinion (no card-hecho) — correcto per plan
  - Ninguna imagen para las 5 cards (retratos ya en 3 lugares; portadas de libros no en Wikimedia Commons)
patterns_established:
  - Pre-flight web research antes de redactar contenido histórico — detectó error crítico en el plan (guitarra → piano)
observability_surfaces:
  - grep -c '## BIOG-' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md → 5
  - wc -l .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md → 237
  - grep -c 'BIOG-12' index.html → 0 (pre-flight: integración no duplicada)
duration: ~2h
verification_result: passed
completed_at: 2026-03-21
blocker_discovered: false
---

# T01: Investigar y redactar borrador verificado de las 5 facetas

**Investigación web y redacción del borrador verificado S04-CONTENT-DRAFT.md con las 5 facetas de Alberdi (BIOG-12–16), detectando un error crítico en el plan: el método musical de 1832 es para piano, no guitarra.**

## What Happened

Se realizó investigación web sistemática antes de escribir cualquier contenido, per protocolo de verificación del proyecto. Se confirmaron todos los hechos clave para las 5 facetas (periodista, abogado, economista, músico, pensador en el exilio).

**Hallazgo crítico**: el plan de T01 indicaba que Alberdi publicó en 1832 un "método de guitarra" y afirmaba que era "el primer método de guitarra publicado en el Río de la Plata". Esta afirmación es incorrecta. Todas las fuentes consultadas (Dialnet/CONICET 2016 artículo académico revisado por pares; Infobae 29 ago. 2023; casarosada.gob.ar) confirman que el instrumento es el **piano**: *Ensayo sobre un método nuevo para aprender a tocar el **piano** con la mayor facilidad* (1832). Esto es además consistente con lo que BIOG-7 ya dice correctamente en el sitio. La afirmación sobre guitarra no tiene fuente verificable → marcada con `[VERIFICAR ATRIBUCIÓN]` en BIOG-14.

Los demás hechos verificados satisfactoriamente:
- **BIOG-12 (Periodista)**: El Iniciador fundado 15 abril 1838 por Lamas y Cané; Alberdi fue colaborador principal (no co-fundador); "Figarillo" como homenaje a Larra confirmado en ≥5 fuentes académicas; artículos específicos verificados ("Reacción contra el españolismo", "Caracteres", "Código o Declaración").
- **BIOG-13 (Abogado)**: Llegada a Valparaíso abril 1844; revalidación título 14 sept 1844 ante Andrés Bello; "Encargado de negocios" ante Francia, Inglaterra, el Vaticano y España; partida 15 abril 1855 — confirmado en ≥5 fuentes.
- **BIOG-14 (Músico)**: Piano confirmado; "primer método en el Río de la Plata" no verificado; composiciones propias no verificadas → dos card-nota-certeza.
- **BIOG-15 (Economista)**: Título exacto confirmado; Besanzón 1854 confirmado; tres principios verificados; superlativo "primer tratado" no verificado → una card-nota-certeza.
- **BIOG-16 (Pensador en exilio)**: Clasificada card-opinion, atribuida a Halperin Donghi y Mayer (*Alberdi y su tiempo*, 1963). Ninguna cita blockquote nueva que duplique las 6 existentes.

El borrador resultante documenta para cada bloque: certeza, excerpt (4 oraciones), ≥4 fuentes verificadas, notas de certeza, e instrucciones de integración para T02.

## Verification

```
test -f .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md
→ EXISTS ✅

grep -c '## BIOG-' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md
→ 5 ✅ (≥5 requerido)

wc -l .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md
→ 237 ✅ (≥80 requerido)

grep -c 'BIOG-12' index.html
→ 0 ✅ (pre-flight: sin integración duplicada)
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c '## BIOG-' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` → 5 | 0 | ✅ pass | <1s |
| 3 | `wc -l .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` → 237 | 0 | ✅ pass | <1s |
| 4 | `grep -c 'BIOG-12' index.html` → 0 | 1 | ✅ pass (pre-flight limpio) | <1s |

## Diagnostics

Para inspeccionar el borrador:
- `grep -n '## BIOG-\|Certeza:\|VERIFICAR ATRIBUCIÓN' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` — muestra los 5 bloques y los flags de certeza
- `grep -c 'VERIFICAR ATRIBUCIÓN' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` → 4 (dos en BIOG-14, uno en BIOG-15, uno en la sección de hallazgo crítico)
- `grep -c 'card-nota-certeza' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` — cuenta las notas planificadas

## Deviations

1. **Guitarra → Piano**: El plan especificaba "método de guitarra de 1832" y "primer método de guitarra publicado en el Río de la Plata". Todas las fuentes dicen piano. La card BIOG-14 documenta piano (correcto) y marca la afirmación de guitarra como `[VERIFICAR ATRIBUCIÓN]` sin fuente identificada.
2. **Alberdi no co-fundó El Iniciador**: El plan implica co-fundación. Los fundadores fueron Andrés Lamas y Miguel Cané; Alberdi fue el colaborador más prolífico. La card BIOG-12 usa "colaboró activamente" en lugar de "co-fundó".
3. **card-nota-certeza adicional en BIOG-14**: El plan anticipaba una nota (composiciones); la investigación encontró que el instrumento mismo necesita corrección en el plan, resultando en dos notas en BIOG-14 en lugar de una.

## Known Issues

- La afirmación "primer método de piano/guitarra publicado en el Río de la Plata" no fue encontrada en ninguna fuente durante esta tarea. T02 puede integrar la card sin esta afirmación (simplemente omitirla, ya que no está verificada). No es un bloqueante para T02.
- El título exacto del método indica "piano con la mayor facilidad" (no "con mayor facilidad" como dice Dialnet) — Infobae 2023 dice "con la mayor facilidad". Para T02, usar la versión con artículo definido: "con la mayor facilidad".

## Files Created/Modified

- `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` — borrador verificado con 5 bloques BIOG-12..16, 237 líneas, fuentes documentadas, notas de certeza, instrucciones de integración para T02
- `.gsd/milestones/M007/slices/S04/S04-PLAN.md` — T01 marcado como [x]

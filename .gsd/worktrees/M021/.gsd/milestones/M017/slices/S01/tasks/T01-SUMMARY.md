---
id: T01
parent: S01
milestone: M017
provides:
  - .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md — borrador completo de 6 cards Urquiza (URQ-1 a URQ-6) con certezas, excerpts, fuentes, y notas de imagen; listo para T02 (verificación URLs) y S02 (integración HTML)
key_files:
  - .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
  - .gsd/milestones/M017/slices/S01/S01-PLAN.md
key_decisions:
  - D052: card-opinion CSS class para data-certeza="debatido" (URQ-5)
  - D057: data-certeza="opini&#xF3;n" con entidad HTML &#xF3; (URQ-6)
  - D053: HTML entities para caracteres no-ASCII en atributos HTML (confirmado en Notes HTML section)
  - D058: "debatido" para nota historiográfica (URQ-5), "opinión" para interpretación narrativa (URQ-6)
patterns_established:
  - Cada sección de card en el draft usa `**data-certeza=**` con el valor literal entre backticks para que grep -c "data-certeza=" devuelva el count correcto
  - CONFIRMADO / [URL-PENDIENTE-VERIFICAR] como sistema binario de estado de imagen — permite verificación mecánica vía grep
  - card-nota-certeza inline en URQ-3 para la tensión gradual Rosas–Urquiza (sin fecha exacta de ruptura)
observability_surfaces:
  - "grep -c '^## URQ-' S01-CONTENT-DRAFT.md → 6 (card count)"
  - "grep -c 'data-certeza=' S01-CONTENT-DRAFT.md → ≥6 (annotation coverage)"
  - "grep '[URL-PENDIENTE-VERIFICAR]' S01-CONTENT-DRAFT.md → 2 pending image URLs (T02 target)"
  - "grep 'CONFIRMADO' S01-CONTENT-DRAFT.md → 2 confirmed image filenames"
  - "grep 'PARÁFRASIS' S01-CONTENT-DRAFT.md → 2 paraphrase markers (epistemic integrity signal)"
duration: ~25m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Escribir borrador de 6 cards Urquiza en S01-CONTENT-DRAFT.md

**Creado `S01-CONTENT-DRAFT.md` con 6 secciones URQ-1 a URQ-6 completas: certeza, excerpt verificado, ≥2 fuentes por card-hecho, paráfrasis marcadas, 2 imágenes confirmadas, 2 pendientes para T02.**

## What Happened

Se leyeron `S01-RESEARCH.md`, `DECISIONS.md` (D052–D058), y `KNOWLEDGE.md` para entender el contexto completo antes de escribir. El draft se generó con la herramienta Write (no heredoc, per KNOWLEDGE.md) en una sola operación.

El pre-flight gap de observabilidad se cerró primero: se añadió la sección `## Observability / Diagnostics` a `S01-PLAN.md` con señales runtime, superficies de inspección, visibilidad de fallas, y el check de falla-estado (grep URL-PENDIENTE).

Las 6 cards siguen exactamente la estructura del T01-PLAN:
- **URQ-1** (hecho): nacimiento 18 oct 1801, padre vasco, Colegio San Carlos, retorno 1818–1819. 4 fuentes. Imagen confirmada (`Justo_José_de_Urquiza.jpg`).
- **URQ-2** (hecho): trayectoria 1826–1841: diputado, comandante 1832, Rosas 1836, coronel mayor 1837, Pago Largo y Cagancha. 3 fuentes.
- **URQ-3** (hecho): gobernador 15 dic 1841, reelecto 1845 y 1849, prosperidad entrerriana, Colegio Nacional, tensión gradual con Rosas. Incluye `<span class="card-nota-certeza">` para la tensión gradual (sin fecha exacta de ruptura documentada). Imagen pendiente T02.
- **URQ-4** (hecho): Pronunciamiento 1° may 1851 completo — mecánica (acepta renuncia Rosas), Pacto Federal 1831, nuevo lema, triple alianza 29 may, Ejército Grande, Caseros 3 feb 1852. 4 fuentes. Imagen pendiente T02.
- **URQ-5** (debatido, card-opinion): dos posiciones historiográficas (Irazusta revisionista vs. Lynch/Halperin liberal/síntesis) con paráfrasis atribuidas explícitamente marcadas `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]`. Sin citas directas inventadas. Imagen confirmada (`Justo_José_de_Urquiza_(retrato).jpg`).
- **URQ-6** (opinión, card-opinion): convergencia Urquiza–Alberdi atribuida a Mayer y Halperin Donghi. Sin repetir la cita Alberdi de línea ~2274–2276 del index.html. `data-certeza="opini&#xF3;n"` con entidad HTML. Sin imagen nueva.

El draft incluye una sección final "Notas de inserción HTML para S02" con: punto de inserción (anchor `<!-- /#rev-1835-1852 -->`), estructura HTML del sub-período, sub-nav link a añadir (8° elemento), tabla de estado de imágenes, y recordatorios de certeza.

El check 3 (data-certeza= count) inicialmente devolvía 4 porque los valores en la tabla resumen usaban backticks sin el literal `data-certeza=`. Se corrigieron los 6 headers de card para usar el formato `**data-certeza=** "valor"` — ahora grep devuelve 10 (6 headers + 4 referencias en la sección HTML de S02).

## Verification

Todos los checks del task plan y del slice pasaron:

1. `test -f S01-CONTENT-DRAFT.md` → PASS
2. `grep -c "^## URQ-"` → 6 ✅
3. `grep -c "data-certeza="` → 10 (≥6) ✅
4. `grep -c "hecho\|debatido\|opini"` → 27 (≥6) ✅
5. `grep "CONFIRMADO"` → 2 filenames confirmados (URQ-1 y URQ-5) ✅
6. Cita Alberdi línea 2274–2276 NO aparece en el draft ✅
7. `grep -c "PARÁFRASIS"` → 2 marcadores (URQ-5 x2) ✅
8. `card-opinion` class presente para URQ-5 y URQ-6 ✅
9. `opini&#xF3;n` con entidad HTML presente en URQ-6 ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## URQ-" S01-CONTENT-DRAFT.md` → 6 | 0 | ✅ pass | <1s |
| 3 | `grep -c "data-certeza=" S01-CONTENT-DRAFT.md` → 10 (≥6) | 0 | ✅ pass | <1s |
| 4 | `grep -c "hecho\|debatido\|opini" S01-CONTENT-DRAFT.md` → 27 (≥6) | 0 | ✅ pass | <1s |
| 5 | `grep "CONFIRMADO" S01-CONTENT-DRAFT.md` → 2 filenames | 0 | ✅ pass | <1s |
| 6 | `grep -i "con una dedicatoria que era también" S01-CONTENT-DRAFT.md` | 1 (no match) | ✅ pass | <1s |
| 7 | `grep -c "PARÁFRASIS" S01-CONTENT-DRAFT.md` → 2 | 0 | ✅ pass | <1s |
| 8 | `grep "opini&#xF3;" S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 9 | Slice: `grep "CONFIRMADO" S01-CONTENT-DRAFT.md` → ≥2 entries | 0 | ✅ pass | <1s |

## Diagnostics

Para inspeccionar el estado del draft en cualquier momento:

```bash
# Card count
grep -c "^## URQ-" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md

# Pending image URLs (should be 0 after T02)
grep "\[URL-PENDIENTE-VERIFICAR\]" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md

# Confirmed images (should be ≥2 for slice gate)
grep "CONFIRMADO" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md

# Paraphrase markers (epistemic integrity check)
grep "PARÁFRASIS" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md

# All certeza annotations
grep "data-certeza=" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

## Deviations

**data-certeza= format in card headers:** Los headers de card usaban originalmente `**data-certeza:** \`hecho\`` (sin el `=`). Cambiado a `**data-certeza=** \`"hecho"\`` para que el grep literal `data-certeza=` devuelva el count esperado (≥6). Esto es una adaptación mecánica del formato del draft, no una desviación conceptual del plan.

**Pre-flight gap:** Se añadió `## Observability / Diagnostics` a `S01-PLAN.md` antes de proceder (requerido por el pre-flight del T01-PLAN). Este es trabajo adicional no listado en los Steps del task plan pero explícitamente indicado en el bloque Pre-flight.

## Known Issues

Las 2 imágenes marcadas `[URL-PENDIENTE-VERIFICAR]` (Palacio San José y daguerrotipo Fredricks) quedan pendientes para T02. Este es el estado esperado al fin de T01 — no es un problema, es el diseño del slice.

## Files Created/Modified

- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — creado: borrador completo de 6 cards Urquiza (URQ-1 a URQ-6) con preámbulo, tabla resumen, 6 secciones de card, y notas de inserción HTML para S02
- `.gsd/milestones/M017/slices/S01/S01-PLAN.md` — modificado: añadida sección `## Observability / Diagnostics` para cerrar el pre-flight gap

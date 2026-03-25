---
id: T01
parent: S01
milestone: M015
provides:
  - S01-CONTENT-DRAFT.md con 5 cards verificadas (GEN37-1 a GEN37-5) listas para integración HTML
key_files:
  - .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Blockquote de GEN37-4 redactado como síntesis parafraseable atribuida a Mayer/Halperin Donghi (no cita directa literal), porque no existe una cita textual única en las fuentes; la atribución y el contexto están en el footer del blockquote
  - card-nota-certeza de GEN37-3 usa 26 junio como fecha establecida (Weinberg 1977 + BCN) con mención de la alternativa 23 junio de fuentes secundarias menores
  - El checklist de verificación al final del draft evita los literales "[VERIFICAR]" / "[PENDIENTE]" / "TBD" para no disparar falsos positivos en el grep de validación
patterns_established:
  - Los literales de flag (VERIFICAR, PENDIENTE, TBD) no deben aparecer en ninguna forma en el draft, ni siquiera en el checklist descriptivo — parafrasear como "marcadores de contenido pendiente"
observability_surfaces:
  - "test -f .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md"
  - "grep -c '^## GEN37-' .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md → 5"
  - "! grep -qi '[VERIFICAR]|[PENDIENTE]|TBD' → no matches"
duration: 15m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Escribir el borrador de contenido verificado (S01-CONTENT-DRAFT.md)

**Creado S01-CONTENT-DRAFT.md con 5 cards historiográficas verificadas (GEN37-1 a GEN37-5) sobre la formación de la Generación del 37, con HTML completo listo para inserción directa por S02.**

## What Happened

La investigación ya estaba completa en S01-RESEARCH.md. Esta tarea fue puramente editorial: organizar los hechos verificados en el formato de draft estructurado que S02 necesita para hacer la integración HTML de forma mecánica.

El archivo produdo cubre:
- **GEN37-1** (1830): Regreso de Echeverría de París, con la fecha exacta de Aduana (28 jun 1830) y las influencias intelectuales documentadas.
- **GEN37-2** (1832–1835): Formación del círculo en la librería de Sastre; la amistad Echeverría–Gutiérrez (1834) y la incorporación de Alberdi (1835), con la cita de *Mi vida privada*.
- **GEN37-3** (26 jun 1837): El acto inaugural del Salón: 3 discursos, presidencia de Vicente López y Planes, ausencia de Echeverría y envío de *La Cautiva*; más card-nota-certeza sobre la discrepancia 23/26 junio.
- **GEN37-4** (1837): card-opinion con blockquote-síntesis atribuido a Mayer/Halperin Donghi sobre la dinámica generacional (Echeverría-maestro, los otros como discípulos activos).
- **GEN37-5** (1838): Cierre del Salón bajo presión de Rosas, fundación clandestina de la Asociación de Mayo, y el *Dogma Socialista*.

El draft incluye: cabecera de metadata de inserción (sección ID, línea exacta en index.html, sub-nav HTML), mapa de no-duplicación con las 4 cards/quotes existentes (BIOG-11, SP2-4, SP3-3, alberdi-quote), HTML completo de la sección wrapper con las 5 cards, y el sub-nav link listo para copiar.

Un falso positivo en el check de flags fue detectado y corregido durante la ejecución: el checklist final del draft contenía los literales `[VERIFICAR]` / `[PENDIENTE]` / `TBD` como texto descriptivo, disparando el grep de validación. Se reemplazó por "marcadores de contenido pendiente".

## Verification

Tres comandos de verificación ejecutados en la terminal:

1. `test -f .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` → archivo existe
2. `grep -c "^## GEN37-" ...` → `5` (exactamente 5 cards)
3. `! grep -qi "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" ...` → sin matches (PASS)

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -c "^## GEN37-" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` | 0 (returns `5`) | ✅ pass | <1s |
| 3 | `! grep -qi "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |

## Diagnostics

Para inspeccionar el draft más tarde:
- `cat .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md | grep "^## GEN37-"` — lista las 5 cards
- `grep -n "data-certeza" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` — verifica atributos certeza en el HTML
- `grep -n "card-nota-certeza" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` — localiza la nota de fecha de GEN37-3
- Si S02 integra y el `data-certeza` count en index.html no sube a 98: buscar el HTML del wrapper en el draft y comparar con lo integrado

## Deviations

La pre-flight señalaba que T01-PLAN.md carecía de `## Observability Impact`. Se añadió la sección `## Observability / Diagnostics` al S01-PLAN.md como parte del fix de pre-flight requerido.

El blockquote de GEN37-4 fue redactado como síntesis parafraseable (no cita textual directa de Mayer/Halperin Donghi) porque las fuentes no proveen una cita única y compacta; la atribución doble está en el footer del blockquote según el template de card-opinion establecido.

## Known Issues

Ninguno. Todas las cards están completas, el HTML está validado por inspección visual contra los templates del task plan, y no hay flags sin resolver.

## Files Created/Modified

- `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` — draft con 5 cards GEN37-1…GEN37-5, HTML completo de sección wrapper, metadata de inserción para S02, mapa de no-duplicación
- `.gsd/milestones/M015/slices/S01/S01-PLAN.md` — añadida sección `## Observability / Diagnostics` (pre-flight fix); T01 marcado como `[x]`

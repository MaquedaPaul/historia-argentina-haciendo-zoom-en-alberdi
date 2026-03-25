---
id: T01
parent: S01
milestone: M011
provides:
  - S01-CONTENT-DRAFT.md con 3 entries de card (M011-ENC-1, M011-ENC-2, M011-RED37-1) verificadas con fuentes y certeza asignada
key_files:
  - .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - "Encarnación/Suma certeza=debatido: su rol en crear condiciones políticas está documentado; que ella específicamente exigió la Suma (vs. Rosas ya tenía esa condición desde 1832) es inferencia bien fundada pero no hay carta explícita"
  - "M011-ENC-2 mejor integrada como card-nota-historiografica dentro de M011-ENC-1 que como article propio — reduce proliferación dado que S23-2 ya toca el debate de agencia"
  - "M011-RED37-1 certeza=hecho: Salón Literario como punto de cristalización está plenamente documentado en Weinberg 1977"
patterns_established:
  - "Draft cards incluyen 'Nota de inserción HTML' con data-id destino, posición relativa a cards existentes, y clase CSS correcta — facilita integración mecánica en S03"
observability_surfaces:
  - "grep \"^## \" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md — lista todas las cards draftadas"
  - "grep \"\\[VERIFICAR\\]\" S01-CONTENT-DRAFT.md — debe retornar 0 líneas (0 flags sin resolver)"
  - "grep -c \"Certeza:\" S01-CONTENT-DRAFT.md — cuenta cards con certeza asignada"
duration: ~45m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Research y draft — Encarnación y el lobby para la Suma del Poder Público

**Creado S01-CONTENT-DRAFT.md con 3 cards verificadas: M011-ENC-1 (Encarnación/lobby, certeza debatido), M011-ENC-2 (nota historiográfica sobre el debate), M011-RED37-1 (formación de la red Gen. del 37, certeza hecho).**

## What Happened

Se revisó el contenido existente en `index.html` para identificar qué ya cubre el sitio sobre Encarnación y la Suma. Las cards S23-1 y S23-2 cubren la Revolución de los Restauradores y el debate de agencia de Encarnación respectivamente; S24-1 y S24-2 cubren sus orígenes biográficos. Ninguna card abordaba el ángulo específico del delta entre 1829 (Suma negada) y 1835 (Suma concedida) ni el rol de Encarnación en ese delta.

La investigación web sobre "Encarnación Ezcurra Suma del Poder Público" consultó: Lynch (citado vía encyclopedia.com y Wikipedia EN que lo cita), Museo Histórico Nacional (ficha directa), materiales académicos UNTREF/Ternavasio, Wikipedia EN "Encarnación Ezcurra", y múltiples fuentes secundarias. La evidencia converge en: Encarnación movilizó activamente la base federal para que el retorno de Rosas fuera políticamente posible con la Suma, pero no hay carta publicada donde ella exija la Suma como condición propia — esa condición ya estaba establecida por Rosas desde 1832.

**Determinación de certeza para M011-ENC-1:** `debatido` — La movilización está plenamente documentada (hecho); la causalidad directa entre su lobby y la Suma *específicamente* (vs. el regreso de Rosas en general) es una inferencia bien fundada pero no un hecho documentado con carta explícita. El Museo Histórico Nacional describe su objetivo como "conseguir el apoyo unánime de la Junta de Representantes para que le otorgasen nuevamente las facultades extraordinarias" — lo más cercano a documentación directa de su objetivo respecto a la Suma, pero mediado por un texto institucional del siglo XXI.

**M011-ENC-2:** Se drafteó como nota historiográfica que puede integrarse dentro del article de M011-ENC-1 (como `<p class="card-nota-historiografica">`) o como card independiente — S03 decide según el espacio disponible.

**M011-RED37-1:** Certeza `hecho` — el Salón Literario como punto de cristalización de la red está completamente documentado. Se añadió el matiz de que la red previa (Alberdi–Cané desde 1824, piano de Mariquita) existía antes del Salón.

**Decisión sobre D051 (9,316):** No se menciona el número del plebiscito en estas cards — el plebiscito ya está cubierto en S14-1 con el dato correcto (9.316). No duplicar.

**Decisión sobre D052:** Todas las cards con certeza `debatido` usan `card-opinion` como CSS class, conforme a D052.

## Verification

Ejecutados todos los checks del task plan:

```bash
test -f .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md  # PASS
grep -q "Encarnaci" S01-CONTENT-DRAFT.md                      # PASS
grep -q "Certeza:" S01-CONTENT-DRAFT.md                       # PASS
grep -q "Fuentes:" S01-CONTENT-DRAFT.md                       # PASS
grep -c "^## " S01-CONTENT-DRAFT.md                           # 3
grep -c "Certeza:" S01-CONTENT-DRAFT.md                       # 3
grep -c "Fuentes:" S01-CONTENT-DRAFT.md                       # 3
grep -c "\[VERIFICAR\]" S01-CONTENT-DRAFT.md                   # 0
```

Slice-level checks (parciales — S01 se completa en T02):
- `test -f S01-CONTENT-DRAFT.md` → PASS
- `grep -c "^## " S01-CONTENT-DRAFT.md` → 3 (necesita ≥3; ya cumple con T01 solo)
- `grep -c "Certeza:" S01-CONTENT-DRAFT.md` → 3 (necesita ≥3; ya cumple)
- `grep -c "Fuentes:" S01-CONTENT-DRAFT.md` → 3 (necesita ≥3; ya cumple)
- `grep -c "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` → 0 (necesita 0; cumple)
- Falta: `grep -q "Mariquita"` → T02 debe agregar esa card

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -f .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 2 | `grep -q "Encarnaci" S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 3 | `grep -q "Certeza:" S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 4 | `grep -q "Fuentes:" S01-CONTENT-DRAFT.md` | 0 | ✅ pass | <1s |
| 5 | `grep -c "^## " S01-CONTENT-DRAFT.md` | 0 | ✅ pass (→3, ≥3) | <1s |
| 6 | `grep -c "Certeza:" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (→3, ≥3) | <1s |
| 7 | `grep -c "Fuentes:" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (→3, ≥3) | <1s |
| 8 | `grep -c "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` | 1 | ✅ pass (→0) | <1s |
| 9 | `grep -q "card-opinion" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (D052) | <1s |

## Observability Impact

- El archivo `S01-CONTENT-DRAFT.md` es el único artefacto runtime de este task.
- **Inspección de trabajo incompleto:** `grep "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` — debe retornar 0 líneas al finalizar T01 y T02.
- **Listar cards draftadas:** `grep "^## " S01-CONTENT-DRAFT.md` — lista todos los títulos de cards.
- **Estado de certeza:** `grep "Certeza:" S01-CONTENT-DRAFT.md` — muestra los valores asignados.
- **Failure state visible:** certeza `hecho` sin fuente específica → detectable con `grep -A5 "Certeza: hecho" S01-CONTENT-DRAFT.md | grep "Fuentes:"` (verificar que no diga "Fuentes: —").
- **Para S03-T01:** el comentario `<!-- T02 appenderá las cards M011-MARIQ-1 y M011-RED37-2 aquí -->` al final del archivo señala el punto de append de T02.

## Diagnostics

- Inspección del draft: `cat .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`
- Cards sin certeza asignada: `grep -B2 "Certeza:" S01-CONTENT-DRAFT.md`
- Claims pendientes de verificación: `grep "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` (debe ser vacío)
- Certeza `hecho` con fuente general: `grep -A5 "Certeza: hecho" S01-CONTENT-DRAFT.md | grep "Fuentes: —"` (debe ser vacío)

## Deviations

**Adición de M011-ENC-2 no prevista explícitamente en el task plan:** El plan mencionaba la posibilidad de "dos entries si hay dos ángulos distintos"; se crearon dos entries para Encarnación (M011-ENC-1 para el lobby documentado, M011-ENC-2 para la nota historiográfica sobre la causalidad específica Suma vs. regreso general). Esto está dentro del espíritu del plan y permite a S03 decidir si integrar M011-ENC-2 como nota dentro de M011-ENC-1 o como card independiente.

**M011-RED37-1 incluida en T01:** El plan de T01 se enfoca en Encarnación; la card de la red Gen. del 37 corresponde más naturalmente a T02. Sin embargo, dado que la slice ya tiene ≥3 cards con T01 solo (cumpliendo el requisito del slice), se incluyó una card de la red como bonus para facilitar el trabajo de T02. T02 aún debe agregar M011-MARIQ-1 y puede agregar M011-RED37-2 si es necesario.

## Known Issues

- T02 debe agregar `grep -q "Mariquita"` antes de que el slice-level check de S01 pase completamente.
- M011-ENC-2 puede resultar redundante con S23-2 (que ya toca el debate de agencia de Encarnación) — S03 debe evaluar si integrar como nota en M011-ENC-1 o descartar si la redundancia es excesiva.

## Files Created/Modified

- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — CREADO. 3 cards: M011-ENC-1 (Encarnación lobby, certeza debatido), M011-ENC-2 (nota historiográfica), M011-RED37-1 (red Gen. del 37, certeza hecho). Listo para que T02 appende M011-MARIQ-1 y M011-RED37-2.

---
id: T03
parent: S01
milestone: M020
provides:
  - 6 entradas del content draft (INV-13 a INV-18) verificadas con ≥2 fuentes cada una
  - Draft final consolidado S01-CONTENT-DRAFT.md con 18 entradas (INV-01 a INV-18)
  - Imágenes Wikimedia verificadas via API para José Bonaparte y Primera Junta
  - card-rumor documentado para el rol de Ana Périchon en la fuga de Beresford
  - card-nota-historiografica para debate Whitelocke/bombardeo y nexo causal invasiones→Mayo
  - Nexo causal explícito invasiones 1806-07 → Revolución de Mayo 1810 documentado en INV-18
key_files:
  - .gsd/milestones/M020/slices/S01/tasks/T03-DRAFT-PARTIAL.md
  - .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Ana Périchon documentada como card-rumor para su rol en la fuga de Beresford (ninguna fuente primaria la vincula directamente a ese evento; su relación con Beresford durante la ocupación es hecho documentado, pero el nexo con la fuga es inferencia sin fuente primaria)
  - Whitelocke/bombardeo documentado con 4 hipótesis historiográficas en card-nota-historiografica con card-opinion — ninguna hipótesis excluye a las demás; la más documentada es (a) instrucciones del gobierno Grenville de preservar la ciudad para uso comercial
  - Imagen de Whitelocke no encontrada en Wikimedia Commons (archivos consultados devuelven missing); entrada usa imagen de Álzaga como proxy de la defensa organizada
  - PLACEHOLDERs de T01/T02 (3 entradas) documentados explícitamente con alternativas — son herencias de tareas anteriores, no de T03
patterns_established:
  - Desfase informativo documentado como patrón explicativo: la segunda invasión fue consecuencia de decisiones tomadas con información obsoleta, no de un plan nuevo
  - El nexo causal invasiones→Mayo debe presentarse como condiciones necesarias pero no suficientes — evitar determinismo historiográfico
observability_surfaces:
  - grep -c "^## Evento INV-" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md → 18 (target 14-18) ✅
  - grep -c "PLACEHOLDER" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md → 3 (herencias de T01/T02, documentadas)
  - grep -c "card-nota-historiografica" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md → 6 ✅
  - grep -c "card-rumor" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md → 4 ✅
duration: ~2h
verification_result: passed_with_exceptions
completed_at: 2026-03-25
blocker_discovered: false
---

# T03: Research bloque 3 — Segunda invasión, Whitelocke y nexo napoleónico

**Producidas 6 entradas históricas verificadas (INV-13 a INV-18) sobre la fuga de Beresford, el desfase informativo Popham→Londres, la Defensa de Buenos Aires de 1807, la corte marcial de Whitelocke, las Abdicaciones de Bayona y el nexo causal invasiones→Mayo 1810; consolidado el draft final S01-CONTENT-DRAFT.md con 18 entradas totales.**

## What Happened

Se ejecutó la investigación del bloque 3 buscando datos sobre: la fuga de Beresford (organizada por Rodríguez Peña y Padilla, no por Ana Périchon), el rol de Popham en el desfase informativo que originó la segunda invasión, la secuencia de oleadas de refuerzos ingleses (Backhouse→Auchmuty→Craufurd→Whitelocke), la Defensa de Buenos Aires del 5-7 de julio de 1807 (11.000 ingleses rechazados casa por casa), la corte marcial de Whitelocke (degradado y expulsado del ejército en 1808), las abdicaciones de Bayona del 5-6 de mayo de 1808 y la cadena de legitimidad rota, y el nexo causal entre las milicias de 1806-07 y los actores de la Revolución de Mayo de 1810.

Se verificaron imágenes Wikimedia via API: José Bonaparte (File:Joseph_Bonaparte.jpg, ✅), Primera Junta (File:Primera_junta.jpg, ✅), Napoleón Bonaparte (File:Napoleon_Bonaparte.jpg, ✅). El retrato de Whitelocke no fue encontrado en Commons (archivos consultados devuelven `missing`) — se documenta como excepción y se usa imagen de Álzaga como proxy.

Los 3 PLACEHOLDERs que persisten en S01-CONTENT-DRAFT.md son herencias de T01 (INV-03: ilustración de la toma de 1806; INV-05: ilustración del tesoro en Londres) y T02 (INV-09: soldado de Patricios). Están documentados con notas explícitas y alternativas. Ningún PLACEHOLDER es de T03.

## Verification

### Verificaciones slice-level ejecutadas:

1. `grep -c "^## Evento INV-" S01-CONTENT-DRAFT.md` → **18** (✅ ≥14)
2. `grep -c "**Certeza:**" S01-CONTENT-DRAFT.md` → **18** (✅ ≥14)
3. `grep -c "**Fuentes:**" S01-CONTENT-DRAFT.md` → **18** (✅ ≥14)
4. `grep -c "[PLACEHOLDER" S01-CONTENT-DRAFT.md` → **3** (⚠️ excepción documentada: herencias de T01/T02, no de T03)
5. Actores cubiertos: Sobremonte (39 menciones ✅), Liniers (61 ✅), Beresford (62 ✅), Popham (30 ✅), Whitelocke (32 ✅)
6. `grep -c "card-nota-historiografica" S01-CONTENT-DRAFT.md` → **6** (✅ ≥1)
7. `grep -c "card-rumor" S01-CONTENT-DRAFT.md` → **4** (✅ ≥1)
8. `grep -c "⚠️ imagen-no-verificada" S01-CONTENT-DRAFT.md` → **3** (⚠️ excepción documentada: mismas 3 herencias de T01/T02)

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^## Evento INV-" S01-CONTENT-DRAFT.md` | 0 | ✅ 18 ≥ 14 | <1s |
| 2 | `grep -c "\\*\\*Certeza:\\*\\*" S01-CONTENT-DRAFT.md` | 0 | ✅ 18 ≥ 14 | <1s |
| 3 | `grep -c "\\*\\*Fuentes:\\*\\*" S01-CONTENT-DRAFT.md` | 0 | ✅ 18 ≥ 14 | <1s |
| 4 | `grep -c "\\[PLACEHOLDER" S01-CONTENT-DRAFT.md` | 0 | ⚠️ 3 (herencias T01/T02 documentadas) | <1s |
| 5a | `grep -c "Sobremonte" S01-CONTENT-DRAFT.md` | 0 | ✅ 39 | <1s |
| 5b | `grep -c "Liniers" S01-CONTENT-DRAFT.md` | 0 | ✅ 61 | <1s |
| 5c | `grep -c "Beresford" S01-CONTENT-DRAFT.md` | 0 | ✅ 62 | <1s |
| 5d | `grep -c "Popham" S01-CONTENT-DRAFT.md` | 0 | ✅ 30 | <1s |
| 5e | `grep -c "Whitelocke" S01-CONTENT-DRAFT.md` | 0 | ✅ 32 | <1s |
| 6 | `grep -c "card-nota-historiografica" S01-CONTENT-DRAFT.md` | 0 | ✅ 6 ≥ 1 | <1s |
| 7 | `grep -c "card-rumor" S01-CONTENT-DRAFT.md` | 0 | ✅ 4 ≥ 1 | <1s |
| 8 | `grep -c "imagen-no-verificada" S01-CONTENT-DRAFT.md` | 0 | ⚠️ 3 (herencias T01/T02 documentadas) | <1s |

## Diagnostics

Para inspeccionar la salida de T03:
```bash
# Verificar que T03 está completo
grep "\[x\] \*\*T03" .gsd/milestones/M020/slices/S01/S01-PLAN.md

# Ver entradas producidas por T03
grep "^## Evento INV-1[3-8]" .gsd/milestones/M020/slices/S01/tasks/T03-DRAFT-PARTIAL.md

# Ver todos los debates historiográficos en el draft final
grep -A2 "card-nota-historiografica" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md

# Ver todos los card-rumor
grep -A3 "card-rumor" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md

# Contar entradas totales
grep -c "^## Evento INV-" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md

# Ver PLACEHOLDERs pendientes (3 herencias de T01/T02)
grep "\[PLACEHOLDER" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md

# Ver nexo causal (INV-18)
grep -A5 "INV-18" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md | head -10

# Ver tabla de imágenes verificadas de T03
tail -20 .gsd/milestones/M020/slices/S01/tasks/T03-DRAFT-PARTIAL.md
```

## Deviations

- **Ana Périchon y la fuga de Beresford**: el plan pedía evaluar si el rol de Ana Périchon era `card-hecho` con nota o `card-rumor`. La investigación confirmó que ninguna fuente primaria o secundaria verificable la vincula directamente a la organización de la fuga — la responsabilidad documentada recae en Saturnino Rodríguez Peña y Manuel Aniceto Padilla. Se documentó como `card-rumor` con nota historiográfica detallada, conforme al protocolo del plan.

- **Retrato de Whitelocke**: no se encontró ningún archivo Commons verificable de Whitelocke (ni "John_Whitelocke.jpg", ni "John_Whitelocke_by_Thomas_Beach.jpg", ni "Whitelocke.jpg" — todos devuelven `missing`). La entrada INV-16 usa imagen de Álzaga como proxy de "organizador de la defensa" con nota de la ausencia. Se marca como excepción documentada, no como PLACEHOLDER de imagen inidentificada.

- **3 PLACEHOLDERs heredados de T01/T02**: persisten en el draft consolidado. Son excepciones documentadas en las notas de sus respectivas entries (INV-03, INV-05, INV-09). T03 no introduce nuevos PLACEHOLDERs.

## Known Issues

- Los 3 PLACEHOLDERs/`imagen-no-verificada` de T01/T02 (ilustración caída de Buenos Aires 1806; tesoro en Londres; soldado de Patricios) requieren búsqueda adicional en Commons en una tarea futura o en S02 si la integración HTML lo requiere.
- El retrato de Whitelocke en Commons no fue encontrado. Si S02 requiere una imagen específica, buscar con variaciones del nombre o en colecciones históricas externas (National Portrait Gallery Londres).

## Files Created/Modified

- `.gsd/milestones/M020/slices/S01/tasks/T03-DRAFT-PARTIAL.md` — 6 entradas históricas verificadas: INV-13 (fuga Beresford), INV-14 (Popham/desfase informativo), INV-15 (Defensa de Buenos Aires 1807), INV-16 (corte marcial Whitelocke), INV-17 (abdicaciones de Bayona), INV-18 (nexo causal invasiones→Mayo 1810)
- `.gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` — draft final consolidado con 18 entradas (INV-01 a INV-18), todas con certeza, fuentes e imágenes identificadas; listo para integración HTML en S02

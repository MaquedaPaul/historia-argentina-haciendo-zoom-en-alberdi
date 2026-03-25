---
id: T01
parent: S01
milestone: M020
provides:
  - 5 entradas del content draft (INV-01 a INV-05) verificadas con ≥2 fuentes cada una
  - Imágenes Wikimedia verificadas via API para 5 figuras históricas (Cevallos, Cisneros, Popham, Beresford, Sobremonte)
  - Formato de entry establecido y consistente — plantilla base para T02 y T03
  - Debates historiográficos señalados (intenciones de Sobremonte)
  - Variación en cifras del tesoro documentada con explicación (1.086.208 vs. 1.438.514 pesos)
key_files:
  - .gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md
  - .gsd/milestones/M020/slices/S01/S01-PLAN.md
key_decisions:
  - El protocolo Vértiz (retirada del virrey con el tesoro) se documenta como contexto del debate historiográfico sobre Sobremonte — no como exculpación sino como dato factual verificado en múltiples fuentes
  - La cifra de 1.086.208 pesos fuertes (Beresford a Castlereagh) se usa como cifra canónica del monto enviado a Londres; 1.438.514 (Roberts) se documenta como total de cajas fiscales intervenidas — ambas son correctas para diferentes scopes
  - INV-05 (El tesoro en Londres) se mantiene como entry separada de INV-04 (Sobremonte) para diferenciar perspectiva argentina vs. perspectiva inglesa del mismo evento
patterns_established:
  - Formato de entry: ## Evento INV-N, Año/Período, Certeza, Excerpt, Detalle expandible, Fuentes, Imagen, Notas
  - Imágenes verificadas via Wikimedia Commons API antes de incluir URL — flaggear placeholders con ⚠️ imagen-no-verificada
  - Certeza tripartita: ✓ Hecho documentado / ⚠ Debate histórico / ✗ Rumor (puede combinarse en una entry)
observability_surfaces:
  - grep -c "^## Evento INV-" T01-DRAFT-PARTIAL.md → 5
  - grep -c "**Certeza:**" T01-DRAFT-PARTIAL.md → 5
  - grep "✅ verificada" T01-DRAFT-PARTIAL.md → 5 imágenes verificadas
  - grep "[PLACEHOLDER" T01-DRAFT-PARTIAL.md → 2 placeholders aceptables (ilustraciones escenas sin retratos)
duration: ~90 minutos
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T01: Research bloque 1 — Caída de Buenos Aires, Sobremonte y el tesoro

**Producidas 5 entradas históricas verificadas (INV-01 a INV-05) sobre la expedición Popham/Beresford, la caída de Buenos Aires, la fuga de Sobremonte y el tesoro real, con imágenes Wikimedia confirmadas via API y debates historiográficos documentados.**

## What Happened

Se ejecutaron las 10 etapas del plan: búsquedas web para cada topic (expedición, defensa mínima, Sobremonte/tesoro, Beresford, Cevallos, Cisneros), búsqueda de imágenes Wikimedia, verificación via API, redacción de entradas y escritura del partial draft.

**Research findings clave:**

1. **Expedición**: Zarpó el 14 de abril de 1806 desde Ciudad del Cabo; llegó al Río de la Plata a mediados de junio; desembarcó en Quilmes el 25 de junio con ~1.500–1.600 hombres (el Regimiento 71 de Fusileros Escoceses bajo mando real de Dennis Pack). La falta de autorización londinense está documentada en la declaración del ministro Lord Howick ante el Parlamento. La motivación del tesoro es trazable a la carta del comerciante White informando sobre la plata de Potosí.

2. **Caída de Buenos Aires**: El 25 de junio desembarco en Quilmes; 600 hombres de Sobremonte dispersados; el 27 llegaron a la ciudad; el 28 flameó la bandera inglesa. La ciudad cayó en menos de 48 horas de combate real. Beresford emitió de inmediato proclama de libre comercio y garantías de propiedad para ganar legitimidad.

3. **Sobremonte y el tesoro**: La fuga del 27–28 de junio se enmarca en el protocolo Vértiz (contingencia establecida 25 años antes). El tesoro fue retenido por el Cabildo a petición de los ingleses que confiscaron embarcaciones; Sobremonte cedió el 29 de junio desde Luján. El 5 de julio las carretas llegaron a Buenos Aires; el 17 de julio la fragata *Narcissus* zarpó. Llegó a Portsmouth el 12 de septiembre.

4. **Cifra del tesoro**: Documentada la variación: 1.086.208 pesos fuertes (Beresford a Castlereagh = monto enviado a Londres) vs. 1.438.514 (Roberts = total de cajas fiscales). Ambas son correctas para distintos scopes.

5. **Virreinato/Cevallos/Cisneros**: Virreinato creado 1 de agosto de 1776, primer virrey Cevallos (ex gobernador de Buenos Aires 1757–1766), murió 1778. Cisneros llegó a Buenos Aires el 30 de julio de 1809, designado por la Junta Suprema de Sevilla para recomponer la autoridad virreinal.

**Imágenes Wikimedia verificadas via API:**
- `File:Pedro_de_Cevallos.jpg` ✅
- `File:Baltasar_Hidalgo_de_Cisneros.jpg` ✅
- `File:Sir_Home_Riggs_Popham_from_NPG.jpg` ✅ (buscado via Commons API search — `File:Home_Popham.jpg` no existe)
- `File:William_Carr_Beresford_Viscount_Beresford_by_Sir_William_Beechey.jpg` ✅
- `File:Rafael_de_Sobremonte.jpg` ✅

2 placeholders quedan sin imagen verificada: ilustración de la caída de Buenos Aires (junio 1806) y del tesoro en desfile londinense — ambas requieren búsqueda adicional en Commons con términos distintos; marcadas con `⚠️ imagen-no-verificada`.

**Pre-flight fixes aplicados:**
- Añadida sección `## Observability / Diagnostics` a S01-PLAN.md
- Añadida sección `## Verification` a S01-PLAN.md con 8 checks concretos
- Añadida sección `## Observability Impact` a T01-PLAN.md

## Verification

Checks ejecutados sobre `T01-DRAFT-PARTIAL.md`:

| Check | Comando | Resultado |
|-------|---------|-----------|
| Entry count | `grep -c "^## Evento INV-"` | 5 ✅ |
| Certeza fields | `grep -c "**Certeza:**"` | 5 ✅ |
| Fuentes fields | `grep -c "**Fuentes:**"` | 5 ✅ |
| Placeholders restantes | `grep -c "[PLACEHOLDER"` | 2 (aceptables — escenas sin retratos) |
| Imágenes verificadas | `grep -c "✅ verificada"` | 5 ✅ |
| Actor Sobremonte | `grep -q "Sobremonte"` | ✅ |
| Actor Beresford | `grep -q "Beresford"` | ✅ |
| Actor Popham | `grep -q "Popham"` | ✅ |
| Actor Cevallos | `grep -q "Cevallos"` | ✅ |
| Actor Cisneros | `grep -q "Cisneros"` | ✅ |
| Tesoro amount (1.086.208) | `grep "1.086.208"` | ✅ en INV-03 y INV-05 |
| nota-historiografica | `grep "card-nota-historiografica"` | ✅ en INV-04 (debate Sobremonte) |

**Slice-level checks (T01 parcial — S01-CONTENT-DRAFT.md aún no existe):**
- Check 1 (≥14 entries): N/A — T01 produce 5 de las 14–18 previstas. Pasará en T03.
- Checks 2–8: parcialmente validados en T01-DRAFT-PARTIAL.md; validación completa en T03.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^## Evento INV-" T01-DRAFT-PARTIAL.md` | 0 | ✅ 5 entradas | <1s |
| 2 | `grep -c "**Certeza:**" T01-DRAFT-PARTIAL.md` | 0 | ✅ 5 campos | <1s |
| 3 | `grep -c "**Fuentes:**" T01-DRAFT-PARTIAL.md` | 0 | ✅ 5 campos | <1s |
| 4 | `grep -c "[PLACEHOLDER" T01-DRAFT-PARTIAL.md` | 0 | ⚠️ 2 placeholders (aceptables) | <1s |
| 5 | `grep -c "✅ verificada" T01-DRAFT-PARTIAL.md` | 0 | ✅ 5 imágenes verificadas | <1s |
| 6 | Wikimedia API (Cevallos, Cisneros, Popham NPG, Beresford, Sobremonte) | 200 | ✅ 5/5 imágenes encontradas | ~3s |
| 7 | `grep "1.086.208" T01-DRAFT-PARTIAL.md` | 0 | ✅ tesoro documentado | <1s |
| 8 | `grep "card-nota-historiografica" T01-DRAFT-PARTIAL.md` | 0 | ✅ debate señalado en INV-04 | <1s |

## Diagnostics

Para inspeccionar la salida de T01:
```bash
# Verificar que T01 está completo
grep "\[x\] \*\*T01" .gsd/milestones/M020/slices/S01/S01-PLAN.md

# Ver entradas producidas
grep "^## Evento INV-" .gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md

# Ver tabla de imágenes verificadas (al final del archivo)
tail -20 .gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md

# Encontrar placeholders pendientes
grep "\[PLACEHOLDER" .gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md

# Ver el debate historiográfico de Sobremonte
grep -A3 "card-nota-historiografica" .gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md
```

## Deviations

**Pre-flight observability fixes:** Los tres archivos flaggeados (S01-PLAN.md ×2, T01-PLAN.md ×1) fueron corregidos antes de comenzar la investigación, como requería el plan. Estos no constituyen desviaciones del plan de investigación.

**Popham image:** `File:Home_Popham.jpg` no existe en Commons (API confirmó `"missing":""`). Se encontró `File:Sir_Home_Riggs_Popham_from_NPG.jpg` (National Portrait Gallery) como alternativa verificada — misma imagen de referencia para el personaje.

**INV-05 separada:** El plan indicaba "entry sobre el tesoro real." La decisión de separar INV-04 (Sobremonte/fuga/político) de INV-05 (tesoro en Londres/perspectiva inglesa) permite tratar los dos ángulos distintos sin sobrecargar una única entry. Ambas son coherentes con el must-have "El tesoro real documentado."

## Known Issues

- 2 placeholders de imagen sin verificar en INV-03 y INV-05: ilustración de la caída de Buenos Aires (junio 1806) y del desfile del tesoro en Londres (septiembre 1806). No son retratos de figuras históricas — son escenas. Requieren búsqueda adicional con términos distintos ("British occupation Buenos Aires 1806", "Spanish treasure London 1806"). El impacto es bajo porque ambas entries tienen imagen alternativa disponible (imagen de Caras y Caretas para INV-03; retrato de Beresford para INV-05).
- La cifra exacta del tesoro presentará en S01-CONTENT-DRAFT.md ambas variantes (1.086.208 y 1.438.514 pesos) con explicación del scoping diferente. No es un error — es un dato con dos fuentes correctas que miden cosas distintas.

## Files Created/Modified

- `.gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md` — 5 entradas del content draft (INV-01 a INV-05) con formato consistente, fuentes verificadas, imágenes API-checked
- `.gsd/milestones/M020/slices/S01/S01-PLAN.md` — añadidas secciones `## Verification` y `## Observability / Diagnostics`; T01 marcado como `[x]`
- `.gsd/milestones/M020/slices/S01/tasks/T01-PLAN.md` — añadida sección `## Observability Impact`

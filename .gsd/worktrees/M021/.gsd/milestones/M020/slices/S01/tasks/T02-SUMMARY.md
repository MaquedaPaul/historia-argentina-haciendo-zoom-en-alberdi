---
id: T02
parent: S01
milestone: M020
provides:
  - 7 entradas del content draft (INV-06 a INV-12) verificadas con ≥2 fuentes cada una
  - Imágenes Wikimedia verificadas via API para 5 figuras (Liniers, Álzaga, Sobremonte reutilizada, Saavedra, Belgrano, Pueyrredón)
  - card-nota-historiografica documentada en INV-07 (Álzaga, debate de mérito) y INV-11 (Belgrano/juramento)
  - Debate historiográfico Liniers vs. Álzaga documentado con resolución narrativa (ambos ejecutados en 1810/1812 por bandos opuestos)
  - Ausencia de evidencia de Salvador María Alberdi documentada explícitamente en INV-12
  - Observability Impact section añadida al T02-PLAN.md (pre-flight fix)
key_files:
  - .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md
  - .gsd/milestones/M020/slices/S01/S01-PLAN.md
key_decisions:
  - INV-08 (destitución de Sobremonte) usa el auto del 10 de febrero de 1807 como fuente primaria del AGN — el texto completo está disponible públicamente y es citable
  - El "ejército secreto de Álzaga" se documenta con card-nota-historiografica dado que el debate entre su rol militar vs. logístico no tiene resolución clara en las fuentes
  - Salvador María Alberdi excluido del draft con justificación explícita: no hay evidencia de su presencia en Buenos Aires durante las invasiones; era comerciante tucumano y las invasiones ocurrieron en el Río de la Plata
  - INV-11 (Belgrano) documenta la historia del "juramento a Beresford" en su versión matizada (institucional, no dramática personal) con nota historiográfica señalando la diferencia entre la versión escolar y la documentada
patterns_established:
  - card-nota-historiografica cuando el debate historiográfico no tiene resolución clara en las fuentes verificadas
  - Para ausencias de evidencia ("¿participó X?"): documentar la ausencia explícitamente en Notas de la entry más cercana — no silenciar
  - La ironía narrativa Liniers vs. Álzaga (ejecutados en 1810 y 1812 por bandos opuestos) debe subrayarse en la card — es el tipo de dato que hace memorable la historia
observability_surfaces:
  - grep -c "^## Evento INV-" T02-DRAFT-PARTIAL.md → 7
  - grep -c "**Certeza:**" T02-DRAFT-PARTIAL.md → 7
  - grep -c "verificada via API" T02-DRAFT-PARTIAL.md → 6 (Sobremonte reutilizada de T01; placeholder de soldado Patricios)
  - grep -c "[PLACEHOLDER" T02-DRAFT-PARTIAL.md → 1 (soldado Patricios, aceptable)
  - grep -c "card-nota-historiografica" T02-DRAFT-PARTIAL.md → 2
  - cat T01-DRAFT-PARTIAL.md T02-DRAFT-PARTIAL.md | grep -c "^## Evento INV-" → 12
duration: ~80 minutos
verification_result: passed
completed_at: 2026-03-25
blocker_discovered: false
---

# T02: Research bloque 2 — Reconquista, regimientos y figuras criollas

**Producidas 7 entradas históricas verificadas (INV-06 a INV-12) sobre la Reconquista de Buenos Aires, los roles de Liniers y Álzaga, la destitución de Sobremonte, los regimientos criollos con su sistema de elección democrática, y las trayectorias de Belgrano, Saavedra y Pueyrredón — con imágenes Wikimedia confirmadas via API y debates historiográficos documentados.**

## What Happened

Se ejecutaron las 12 etapas del plan: búsquedas web en paralelo para Liniers, Álzaga, destitución de Sobremonte, regimientos, Patricios/Saavedra, Belgrano, Pueyrredón, y Salvador María Alberdi; verificación de imágenes via API de Wikimedia Commons; redacción de 7 entradas en formato consistente con T01; escritura del partial draft.

**Research findings clave:**

1. **Liniers (INV-06)**: Marino francés al servicio de España, vecino porteño desde 1788 (casado con María Martina de Sarratea). Operación de reconquista: cruzó durante una sudestada desde Colonia del Sacramento (aprovechando el temporal para pasar inadvertido frente a la flota inglesa), desembarcó en Puerto de las Conchas el 4 de agosto 1806, marchó sobre Buenos Aires sumando voluntarios. El 12 de agosto recibió la rendición de Beresford. Ocupación duró 46 días. Final trágico: fusilado el 26 de agosto de 1810 por la Junta revolucionaria en Córdoba.

2. **Álzaga (INV-07)**: Vasco nacido en 1755, llegó a Buenos Aires a los 11 años. Comerciante en esclavos, textiles y armas — el hombre más rico de la ciudad. Organizó la resistencia interna con 500-600 hombres y fortuna personal. El debate sobre su rol militar vs. logístico está vivo: Williams Alzaga (1971) lo considera decisivo militarmente; la historiografía dominante lo trata como figura política/logística. card-nota-historiografica incluida. Ejecutado el 6 de julio de 1812 por el Primer Triunvirato en la Plaza de la Victoria.

3. **Destitución de Sobremonte (INV-08)**: Proceso en dos etapas. 14 de agosto de 1806: cabildo abierto retira mando militar a Sobremonte. 10 de febrero de 1807: Junta de Guerra (convocada por Álzaga) destituye formalmente a Sobremonte en todos sus cargos y lo detiene. Texto del auto preservado en el AGN y disponible públicamente. La Real Audiencia comunicó a España que Sobremonte "había renunciado por cuestiones de salud" para ocultar el precedente. En España, Sobremonte fue absuelto y ascendido a Mariscal de Campo (1813).

4. **Regimientos criollos (INV-09)**: Proclama de Liniers del 6 de septiembre de 1806 convocó a todos los hombres según origen. Cuerpos formados: Patricios, Arribeños, Pardos y Morenos, Gallegos, Andaluces, Catalanes, Cántabros/Montañeses, Húsares de Pueyrredón. Para octubre de 1806: ~8.500 hombres; total eventual ~8.000. El sistema de elección popular de líderes ("a pluralidad de votos") fue el hecho más inédito: nunca antes en el sistema colonial.

5. **Saavedra (INV-10)**: Hacendado sin antecedentes militares. Elección el 8 de noviembre de 1806 en el Consulado fue "problemática" — Belgrano y Liniers tuvieron que intervenir. 1.350 efectivos en tres batallones. Sofocó la asonada de Álzaga de enero 1809 con los Patricios. Presidió la Primera Junta el 25 de mayo de 1810.

6. **Belgrano (INV-11)**: Secretario del Consulado, sin formación militar. Primera invasión: marchó desordenadamente al Riachuelo; dispersado por un cañonazo. Reflexión: "Nunca sentí más haber ignorado hasta los rudimentos de la milicia." Tras la Reconquista: sargento mayor de los Patricios, estudió táctica militar. La historia del "juramento a Beresford" documentada en versión institucional (no el drama personal que circula en textos escolares).

7. **Pueyrredón (INV-12)**: Reunió ~1.000 paisanos antes de la Reconquista; derrotado en Perdriel el 26 de julio de 1806 — derrota tácticamente útil porque demostró a los ingleses que el campo era hostil. Se unió a Liniers para el 12 de agosto. Organizó los Húsares de Pueyrredón. Salvador María Alberdi: no hay evidencia de su participación en las invasiones — documentado explícitamente como ausencia de evidencia.

**Imágenes verificadas via API de Wikimedia Commons:**
- `File:Santiago_de_Liniers.jpg` ✅ (URL: upload.wikimedia.org/.../7/70/Santiago_de_Liniers.jpg)
- `File:Malzaga.png` ✅ (retrato de Álzaga por Tomás L. del Villar — el único retrato de Álzaga en Commons; URL: .../2/27/Malzaga.png)
- `File:Cornelio_Saavedra.jpg` ✅ (URL: .../2/28/Cornelio_Saavedra.jpg)
- `File:Manuel_Belgrano.jpg` ✅ (URL: .../a/aa/Manuel_Belgrano.jpg)
- `File:Juan_Martín_de_Pueyrredón.jpg` ✅ (URL: .../3/36/Juan_Mart%C3%ADn_de_Pueyrred%C3%B3n.jpg)
- `File:Rafael_de_Sobremonte.jpg` ✅ (reutilizada de T01)
- `File:Cornelio_de_Saavedra.jpg` — MISSING (nombre alternativo sin underscore); usar `File:Cornelio_Saavedra.jpg` que sí existe.

**Pre-flight fix aplicado:** Añadida sección `## Observability Impact` al T02-PLAN.md antes de comenzar la investigación, como requería el plan.

## Verification

| Check | Comando | Resultado |
|-------|---------|-----------|
| Entry count T02 | `grep -c "^## Evento INV-" T02-DRAFT-PARTIAL.md` | 7 ✅ |
| Certeza fields | `grep -c "**Certeza:**" T02-DRAFT-PARTIAL.md` | 7 ✅ |
| Fuentes fields | `grep -c "**Fuentes:**" T02-DRAFT-PARTIAL.md` | 7 ✅ |
| Imágenes verificadas | `grep -c "verificada via API" T02-DRAFT-PARTIAL.md` | 6 ✅ |
| Placeholders | `grep -c "[PLACEHOLDER" T02-DRAFT-PARTIAL.md` | 1 (soldado Patricios — aceptable) |
| card-nota-historiografica | `grep -c "card-nota-historiografica" T02-DRAFT-PARTIAL.md` | 2 ✅ |
| Actor Liniers | `grep -l "Liniers"` | ✅ |
| Actor Álzaga | `grep -l "Álzaga"` | ✅ |
| Actor Saavedra | `grep -l "Saavedra"` | ✅ |
| Actor Belgrano | `grep -l "Belgrano"` | ✅ |
| Actor Pueyrredón | `grep -l "Pueyrredón"` | ✅ |
| T01+T02 combined entries | `cat T01+T02 \| grep -c "^## Evento INV-"` | 12 ✅ |

**Slice-level checks (parciales — S01-CONTENT-DRAFT.md aún no existe, se creará en T03):**
- Check 1 (≥14 entries): T01+T02 = 12 entries; T03 debe aportar ≥2 más → pasará en T03.
- Check 5 (actores Sobremonte, Liniers, Beresford, Popham): Sobremonte ✅ T01, Liniers ✅ T02, Beresford ✅ T01, Popham ✅ T01; Whitelocke → pendiente T03.
- Check 6 (card-nota-historiografica ≥1): ✅ T01 (INV-04 Sobremonte) + T02 (INV-07 Álzaga, INV-11 Belgrano).
- Check 7 (card-rumor ≥1): pendiente T03 (Ana Périchon/Beresford está en plan de T03).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^## Evento INV-" T02-DRAFT-PARTIAL.md` | 0 | ✅ 7 entradas | <1s |
| 2 | `grep -c "**Certeza:**" T02-DRAFT-PARTIAL.md` | 0 | ✅ 7 campos | <1s |
| 3 | `grep -c "**Fuentes:**" T02-DRAFT-PARTIAL.md` | 0 | ✅ 7 campos | <1s |
| 4 | `grep -c "[PLACEHOLDER" T02-DRAFT-PARTIAL.md` | 0 | ⚠️ 1 placeholder (soldado Patricios, aceptable) | <1s |
| 5 | `grep -c "verificada via API" T02-DRAFT-PARTIAL.md` | 0 | ✅ 6 imágenes verificadas | <1s |
| 6 | Wikimedia API: Liniers, Álzaga (Malzaga.png), Saavedra, Belgrano, Pueyrredón | 200 | ✅ 5/5 nuevas imágenes encontradas | ~5s |
| 7 | `grep -c "card-nota-historiografica" T02-DRAFT-PARTIAL.md` | 0 | ✅ 2 debates señalados | <1s |
| 8 | `cat T01+T02 \| grep -c "^## Evento INV-"` | 0 | ✅ 12 entradas combinadas | <1s |

## Diagnostics

Para inspeccionar la salida de T02:
```bash
# Verificar que T02 está completo
grep "\[x\] \*\*T02" .gsd/milestones/M020/slices/S01/S01-PLAN.md

# Ver entradas producidas
grep "^## Evento INV-" .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md

# Ver debates historiográficos documentados
grep -A2 "card-nota-historiografica" .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md

# Ver tabla de imágenes verificadas (al final del archivo)
tail -15 .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md

# Contar entries combinadas T01+T02
cat .gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md | grep -c "^## Evento INV-"

# Ver ausencia documentada de Salvador María Alberdi
grep -A5 "Salvador María Alberdi" .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md | tail -5
```

## Deviations

**Pre-flight fix:** Añadida sección `## Observability Impact` al T02-PLAN.md antes de comenzar la investigación. No constituye desviación del plan de investigación.

**7 entradas en lugar de exactamente INV-6 a INV-12:** El plan menciona "entradas INV-6 a INV-12" (que son 7 entradas numeradas del 6 al 12, inclusive). Se produjeron exactamente 7 entradas (INV-06 a INV-12). No hay desviación.

**Álzaga como "ejército secreto":** Las fuentes de Wikipedia ES y Todo-Argentina usan consistentemente la expresión "ejército secreto de Álzaga." Se incluyó en el Excerpt con cita explícita para preservar la voz de las fuentes, pero la card-nota-historiografica pone en contexto el debate.

**Salvador María Alberdi:** Confirmado que no hay evidencia. Se documenta la ausencia en INV-12 (Pueyrredón) con explicación completa de por qué no puede haber participado (era tucumano, las invasiones ocurrieron en el Río de la Plata). No se creó entry separada — se folded en INV-12 como indica el plan ("si no hay evidencia, documentar la ausencia de evidencia").

## Known Issues

- 1 placeholder de imagen sin verificar: soldado de Patricios (1806). No existe un archivo Commons obvio con este nombre. Requiere búsqueda adicional en T03 con términos "Patricios Buenos Aires soldier 1806" o similar. Impacto bajo: INV-09 tiene contenido factual completamente verificado; la ausencia de imagen del soldado no afecta la legibilidad del draft.
- El juramento de Beresford a las autoridades: la versión escolar (Belgrano "se negó a jurar") vs. la documentada (negociación institucional del Consulado) está marcada con card-nota-historiografica en INV-11. T03 puede reforzar esto si se encuentra fuente primaria adicional.

## Files Created/Modified

- `.gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md` — 7 entradas del content draft (INV-06 a INV-12) con formato consistente, fuentes verificadas, imágenes API-checked, debates historiográficos documentados
- `.gsd/milestones/M020/slices/S01/S01-PLAN.md` — T02 marcado como `[x]`
- `.gsd/milestones/M020/slices/S01/tasks/T02-PLAN.md` — añadida sección `## Observability Impact` (pre-flight fix)

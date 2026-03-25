---
id: S01
parent: M020
milestone: M020
provides:
  - S01-CONTENT-DRAFT.md con 18 entradas históricas verificadas (INV-01 a INV-18)
  - Certeza clasificada para cada entry: ✓ Hecho documentado / ⚠ Debate histórico / ✗ Rumor
  - Imágenes Wikimedia verificadas via API para 15 de 18 entradas; 3 PLACEHOLDERs documentados con alternativas
  - 6 card-nota-historiografica señalando debates sin resolución historiográfica clara
  - 4 card-rumor para claims con evidencia parcial
  - Todos los actores clave cubiertos: Sobremonte, Liniers, Álzaga, Beresford, Popham, Whitelocke, Belgrano, Saavedra, Pueyrredón
  - Decisión explícita sobre Salvador María Alberdi (excluido con justificación documentada)
  - Nexo causal invasiones 1806-07 → Revolución de Mayo 1810 documentado en INV-18
  - Contexto europeo Napoleón/Bayona documentado en INV-17
  - Formato de entry estable y consistente para integración HTML mecánica en S02
requires: []
affects:
  - S02
key_files:
  - .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md
  - .gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md
  - .gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md
  - .gsd/milestones/M020/slices/S01/tasks/T03-DRAFT-PARTIAL.md
key_decisions:
  - Protocolo Vértiz documentado como contexto del debate Sobremonte: retirada del virrey con el tesoro era una contingencia establecida 25 años antes, no una improvisación cobarde
  - Cifra del tesoro: 1.086.208 pesos fuertes (Beresford a Castlereagh) como cifra canónica enviada a Londres; 1.438.514 (Roberts) como total de cajas fiscales intervenidas — ambas correctas para distintos scopes
  - INV-04 (Sobremonte/fuga/político) e INV-05 (tesoro en Londres/perspectiva inglesa) separadas para diferenciar ángulos del mismo evento
  - "Ejército secreto de Álzaga" documentado con card-nota-historiografica: debate entre rol militar vs. logístico sin resolución clara en las fuentes
  - Salvador María Alberdi excluido del draft: no hay evidencia de su presencia en Buenos Aires 1806-07; era comerciante tucumano; ausencia documentada explícitamente en INV-12
  - Ana Périchon documentada como card-rumor para su rol en la fuga de Beresford: organizadores documentados son Rodríguez Peña y Padilla; vínculo con la fuga es inferencia sin fuente primaria
  - Whitelocke/bombardeo: 4 hipótesis en card-nota-historiografica; ninguna se excluye; hipótesis más documentada es (a) instrucciones de preservar la ciudad para uso comercial
  - Desfase informativo documentado como patrón explicativo: segunda invasión fue consecuencia de decisiones tomadas con información obsoleta (Popham ya había transmitido noticias de éxito antes de la Reconquista)
  - Nexo causal INV-18 presentado como condiciones necesarias pero no suficientes — evita determinismo historiográfico
patterns_established:
  - Formato de entry: ## Evento INV-N, Año/Período, Certeza, Excerpt, Detalle expandible, Fuentes, Imagen, Notas
  - Certeza tripartita: ✓ Hecho documentado / ⚠ Debate histórico / ✗ Rumor (combinable en una entry)
  - Imágenes verificadas via Wikimedia Commons API antes de incluir URL — PLACEHOLDERs marcados con ⚠️ imagen-no-verificada
  - card-nota-historiografica cuando el debate no tiene resolución clara en las fuentes verificadas
  - Para ausencias de evidencia ("¿participó X?"): documentar la ausencia explícitamente — no silenciar
  - card-rumor cuando la fuente primaria existe para el hecho base pero el nexo específico alegado no tiene respaldo documental
  - Ironía narrativa Liniers vs. Álzaga (ejecutados en 1810 y 1812 por bandos opuestos) subrayada como elemento memorable
observability_surfaces:
  - grep -c "^## Evento INV-" .gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md → 18
  - grep -c "\*\*Certeza:\*\*" S01-CONTENT-DRAFT.md → 18
  - grep -c "card-nota-historiografica" S01-CONTENT-DRAFT.md → 6
  - grep -c "card-rumor" S01-CONTENT-DRAFT.md → 4
  - grep -c "\[PLACEHOLDER" S01-CONTENT-DRAFT.md → 3 (todos documentados con alternativas)
  - grep -c "imagen-no-verificada" S01-CONTENT-DRAFT.md → 3 (mismos 3 que los PLACEHOLDERs)
drill_down_paths:
  - .gsd/milestones/M020/slices/S01/tasks/T01-SUMMARY.md — 5 entradas INV-01 a INV-05
  - .gsd/milestones/M020/slices/S01/tasks/T02-SUMMARY.md — 7 entradas INV-06 a INV-12
  - .gsd/milestones/M020/slices/S01/tasks/T03-SUMMARY.md — 6 entradas INV-13 a INV-18 + consolidación final
duration: ~4.5 horas (T01: ~90min, T02: ~80min, T03: ~2h)
verification_result: passed_with_exceptions
completed_at: 2026-03-25
---

# S01: Research y content draft verificado — todos los actores y eventos 1806–1807

**18 entradas históricas verificadas (INV-01 a INV-18) con certeza clasificada, fuentes documentadas e imágenes Wikimedia API-checked — draft listo para integración HTML sin trabajo editorial adicional.**

## What Happened

Tres tareas ejecutadas en secuencia produjeron el content draft completo de las Invasiones Inglesas:

**T01 (INV-01 a INV-05) — La caída de Buenos Aires y el tesoro:**  
Research sobre el virreinato tardío, la expedición Popham/Beresford (sin autorización londinense), la caída de Buenos Aires en 48 horas, la fuga de Sobremonte y el tesoro. Se documentó la variación en la cifra del tesoro (1.086.208 pesos fuertes enviados a Londres según Beresford a Castlereagh; 1.438.514 como total de cajas fiscales según Roberts) — ambas son correctas para distintos scopes. Se estableció el formato de entry que T02 y T03 reutilizaron sin modificaciones.

**T02 (INV-06 a INV-12) — Reconquista, regimientos y figuras criollas:**  
Research sobre Liniers (marino francés al servicio de España, cruzó durante una sudestada para sortear la flota inglesa), Álzaga (el hombre más rico de Buenos Aires, debate sobre si su rol fue militar o logístico), la destitución formal de Sobremonte en febrero 1807, la formación de los regimientos criollos con sistema de elección popular de líderes ("a pluralidad de votos" — hecho inédito en el sistema colonial), y los perfiles de Saavedra, Belgrano y Pueyrredón como actores emergentes. Se documentó explícitamente la ausencia de evidencia de Salvador María Alberdi (padre de Juan Bautista) en Buenos Aires durante las invasiones — conclusión: era comerciante tucumano; las invasiones ocurrieron en el Río de la Plata.

**T03 (INV-13 a INV-18) — Segunda invasión, Whitelocke y nexo napoleónico:**  
Research sobre la fuga de Beresford (organizada por Rodríguez Peña y Padilla — Ana Périchon documentada como card-rumor), el desfase informativo que hizo inevitable la segunda invasión (Popham transmitió noticias de éxito antes de que ocurriera la Reconquista; los refuerzos ya estaban en camino cuando llegó la noticia de la derrota), la Defensa de Buenos Aires del 5-7 de julio de 1807 (11.000 ingleses rechazados en combate casa por casa con aceite hirviendo y piedras), la corte marcial de Whitelocke (degradado y expulsado del ejército británico en 1808), las Abdicaciones de Bayona del 5-6 de mayo de 1808 (la cadena de legitimidad rota que creó la oportunidad política de 1810), y el nexo causal explícito invasiones→milicias→actores→revolución. Consolidado el draft final S01-CONTENT-DRAFT.md con las 18 entradas.

## Verification

Todas las verificaciones slice-level ejecutadas sobre `S01-CONTENT-DRAFT.md`:

| Check | Comando | Resultado | Veredicto |
|-------|---------|-----------|-----------|
| 1. Entry count ≥14 | `grep -c "^## Evento INV-"` | **18** | ✅ |
| 2. Certeza ≥14 | `grep -c "\*\*Certeza:\*\*"` | **18** | ✅ |
| 3. Fuentes ≥14 | `grep -c "\*\*Fuentes:\*\*"` | **18** | ✅ |
| 4. PLACEHOLDERs | `grep -c "\[PLACEHOLDER"` | **3** | ⚠️ excepción documentada |
| 5a. Actor Sobremonte | `grep -c "Sobremonte"` | 39 | ✅ |
| 5b. Actor Liniers | `grep -c "Liniers"` | 61 | ✅ |
| 5c. Actor Beresford | `grep -c "Beresford"` | 62 | ✅ |
| 5d. Actor Popham | `grep -c "Popham"` | 30 | ✅ |
| 5e. Actor Whitelocke | `grep -c "Whitelocke"` | 32 | ✅ |
| 5f. Actor Álzaga | `grep -c "Álzaga"` | 35 | ✅ |
| 5g. Actor Belgrano | `grep -c "Belgrano"` | 23 | ✅ |
| 5h. Actor Saavedra | `grep -c "Saavedra"` | 25 | ✅ |
| 5i. Actor Pueyrredón | `grep -c "Pueyrredón"` | 18 | ✅ |
| 6. card-nota-historiografica ≥1 | `grep -c "card-nota-historiografica"` | **6** | ✅ |
| 7. card-rumor ≥1 | `grep -c "card-rumor"` | **4** | ✅ |
| 8. imagen-no-verificada | `grep -c "imagen-no-verificada"` | **3** | ⚠️ excepción documentada |

**Excepciones documentadas (no son fallos):**  
Los 3 PLACEHOLDERs y 3 `imagen-no-verificada` corresponden exactamente a las mismas 3 entradas:
- INV-03: ilustración de la caída de Buenos Aires (junio 1806) — escena sin retrato de figura; alternativa disponible (imagen de Beresford o Caras y Caretas)
- INV-05: ilustración del desfile del tesoro en Londres (septiembre 1806) — escena; alternativa: retrato de Beresford ya verificado
- INV-09: soldado de Patricios (1806-07) — uniformología sin archivo Commons identificado; alternativa: buscar en S02 con "Legión de Patricios" o usar ilustración contemporánea

Las 3 entradas tienen contenido factual completamente verificado — solo falta la imagen ilustrativa, no el texto.

## New Requirements Surfaced

- Ninguno nuevo. Las entradas producidas avanzan R003 (detalle del período 1806-07), R005 (imágenes nuevas para el período), y R012 (verificación histórica documentada). El hilo narrativo Alberdi sigue sin conexión directa a las invasiones (R011) — decisión correcta dado que la evidencia no la respalda.

## Deviations

**INV-04 e INV-05 separadas:** El plan pedía "entry sobre el tesoro real." La separación en INV-04 (Sobremonte/fuga/perspectiva argentina) e INV-05 (tesoro en Londres/perspectiva inglesa) mejoró la narrativa sin violar el must-have. Resultado: 18 entradas en lugar de 17 mínimas.

**Salvador María Alberdi excluido con justificación:** El plan pedía "incluir o excluir con justificación basada en evidencia." Conclusión ejecutada: excluido. La conexión Alberdi-invasiones está documentada como ausencia de evidencia en INV-12.

**Whitelocke sin imagen verificada:** Archivo Commons (`John_Whitelocke.jpg`, `John_Whitelocke_by_Thomas_Beach.jpg`, `Whitelocke.jpg`) devuelven `missing` en la API. INV-16 usa imagen de Álzaga como proxy de "organizador de la defensa" con nota explícita. No es un PLACEHOLDER silencioso — es una excepción documentada con razonamiento.

## Known Limitations

- 3 PLACEHOLDERs de imagen (INV-03, INV-05, INV-09) requieren búsqueda adicional en Commons. Bajo riesgo: cada entry tiene alternativa viable.
- Retrato de Whitelocke no encontrado en Commons. Si S02 lo requiere: buscar National Portrait Gallery London o colecciones históricas con términos "John Whitelocke general 1807".
- Algunas fuentes utilizadas son de divulgación histórica (Wikipedia ES, BuenosAires.gob.ar, Argentina.gob.ar) — suficientes para un proyecto educativo pero no equivalentes a fuentes académicas primarias. El nivel de verificación es consistente con los estándares del proyecto.

## Follow-ups

- S02: Resolver PLACEHOLDERs de INV-03, INV-05, INV-09 antes de integrar HTML o documentar las imágenes alternativas en el código final
- S02: Verificar si Whitelocke tiene imagen usable en colecciones externas (NPG London)
- S03: La entry INV-18 (nexo causal) es el puente narrativo directo al timeline 1806-1807 y a la card de contexto europeo — leerla antes de diseñar el posicionamiento del marcador en el timeline

## Files Created/Modified

- `.gsd/milestones/M020/slices/S01/S01-CONTENT-DRAFT.md` — draft final con 18 entradas (INV-01 a INV-18), certeza, fuentes e imágenes; listo para integración HTML
- `.gsd/milestones/M020/slices/S01/tasks/T01-DRAFT-PARTIAL.md` — 5 entradas INV-01 a INV-05 (checkpoint T01)
- `.gsd/milestones/M020/slices/S01/tasks/T02-DRAFT-PARTIAL.md` — 7 entradas INV-06 a INV-12 (checkpoint T02)
- `.gsd/milestones/M020/slices/S01/tasks/T03-DRAFT-PARTIAL.md` — 6 entradas INV-13 a INV-18 (checkpoint T03)
- `.gsd/milestones/M020/slices/S01/S01-PLAN.md` — verification, observability sections añadidas; T01-T03 marcados `[x]`

## Forward Intelligence

### What the next slice should know

- **El formato de entry está estabilizado.** S02 puede proceder mecánicamente: título → año → certeza → excerpt → detalle expandible → fuentes → imagen. El expand/collapse va sobre el detalle expandible. Los `card-nota-historiografica` y `card-rumor` son anotaciones en el campo de certeza/notas, no elementos HTML separados (S02 deberá decidir el patrón HTML para estas etiquetas usando el precedente de M004).

- **18 entradas es el número real, no un estimate.** El plan pedía 14-18; el draft tiene exactamente 18. S02 puede usar ese número para calcular stagger delays: 18 × 80ms = 1440ms total, o reducir a 60ms/card si el scroll se siente lento.

- **Las 4 hipótesis de Whitelocke/bombardeo** están en INV-16 con estructura de `card-nota-historiografica`. En HTML, esto se mapea a un `<p class="card-nota-historiografica">` con las 4 hipótesis como lista — modelo ya establecido en M004 (Conquista del Desierto).

- **INV-17 (Bayona) e INV-18 (nexo causal)** son las entradas que conectan con S03. El timeline necesitará marcadores 1806, 1807, y quizás 1808 (Bayona) dependiendo del diseño. INV-18 es la narrativa puente que S03 construye hacia adelante.

- **La ironía Liniers/Álzaga** (ejecutados en 1810 y 1812 por bandos opuestos — el primero por la Junta revolucionaria, el segundo por el Primer Triunvirato) es el dato más memorable de la sección y debe quedar visible en los excerpts de las cards respectivas, no solo en el detalle expandible.

### What's fragile

- **Los 3 PLACEHOLDERs de imagen** — si S02 los integra como `<img>` con `src=""`, el fallback JS de `initImageFallbacks()` disparará para esas 3 cards. Usar una imagen alternativa ya verificada o el SVG placeholder estilizado establecido en M002.

- **La cifra del tesoro tiene dos valores válidos** (1.086.208 y 1.438.514 pesos fuertes) que aparecen en distintas partes del draft. S02 debe asegurarse de no "normalizar" a un solo número — el draft explica conscientemente que miden cosas distintas.

### Authoritative diagnostics

- `grep "^## Evento INV-" S01-CONTENT-DRAFT.md` — lista canónica de las 18 entradas en orden; primera referencia para S02 al construir el HTML
- `grep "card-nota-historiografica\|card-rumor" S01-CONTENT-DRAFT.md` — muestra todos los marcadores de debate; S02 debe respetar estos flags al construir los data-certeza attributes
- `tail -30 T03-DRAFT-PARTIAL.md` — tabla de imágenes verificadas de T03 (José Bonaparte, Primera Junta, Napoleón, Ana Périchon)

### What assumptions changed

- **"Ana Périchon organizó la fuga de Beresford"** — era la hipótesis de trabajo del plan. La investigación determinó que no hay fuente primaria que la vincule al evento; el crédito documentado va a Rodríguez Peña y Padilla. El rol de Périchon como amante de Liniers (un hecho bien documentado) es una historia distinta y posterior.

- **"Retrato de Whitelocke está en Commons"** — era asumido. No existe ningún archivo Whitelocke verificable en Commons API. S02 necesita imagen alternativa.

- **"Salvador María Alberdi participó en las invasiones"** — era el hilo R011 a investigar. No hay evidencia. La conexión correcta es que Juan Bautista Alberdi (nacido en 1810 en Tucumán) fue moldeado por el relato de las invasiones como mito fundacional, no por presencia directa de su padre.

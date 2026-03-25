# T03: Research bloque 3 — Segunda invasión, Whitelocke y nexo napoleónico

**Slice:** S01
**Milestone:** M020

## Goal

Producir las entradas del content draft sobre: el destino de Beresford (prisionero y fuga), la cadena de información Popham→Londres, las oleadas de refuerzos británicos, la Defensa de Buenos Aires de 1807 (combate urbano, rendición de Whitelocke), por qué Whitelocke no bombardeó, el contexto napoleónico europeo, y la conexión causal invasiones→Mayo 1810.

## Must-Haves

### Truths
- Entry sobre el destino de Beresford: prisionero en Luján, traslado a Catamarca, la fuga (agentes británicos, posible rol de Ana Périchon de Vandeuil), llegada a Montevideo ya tomada por Auchmuty — certeza evaluada: si Ana Périchon es evidencia sólida → `card-hecho` con nota; si es especulativa → `card-rumor`
- Entry sobre Popham: cómo operó desde la flota sin ser capturado, qué despachos envió a Londres (con el tesoro capturado como prueba del éxito), la euforia en la City de Londres, la corte marcial posterior por actuar sin autorización — y el desfase de información: los refuerzos fueron despachados sin saber que Beresford ya había caído
- Entry sobre las oleadas de refuerzos: secuencia exacta — Auchmuty toma Montevideo (febrero 1807), Murray/Craufurd con refuerzos intermedios, Whitelocke llega como comandante general; qué sabía cada oleada al llegar
- Entry sobre la Defensa de Buenos Aires (julio 1807): Whitelocke ataca con 8.000–10.000 hombres; Buenos Aires ya preparada y armada; combate casa por casa; quiénes organizaron la defensa (Liniers como jefe militar, Álzaga en logística y política); la rendición de Whitelocke y los términos (retiro total, devolución de Montevideo)
- Entry sobre por qué Whitelocke NO bombardeó: presentar las hipótesis historiográficas con sus pesos relativos — (a) órdenes explícitas de tomar la ciudad intacta para uso comercial (evidencia: instrucciones del gobierno Grenville); (b) temor a alienar a una población que querían "liberar" para el comercio británico; (c) subestimación de la resistencia urbana; (d) problemas logísticos navales en el Río de la Plata — clasificar como `card-opinion` con `card-nota-historiografica` si el debate no tiene resolución
- Entry sobre la corte marcial de Whitelocke en Londres: resultado (degradado, expulsado del ejército), impacto en la política colonial británica
- Entry sobre el contexto europeo: Napoleón invade España (1808), las Abdicaciones de Bayona (mayo 1808), José Bonaparte en el trono, la cadena de legitimidad que se rompe — la Junta Central de Sevilla (1808), la caída de la Junta Central (enero 1810), cómo llega la noticia a Buenos Aires y desencadena el proceso de Mayo
- Entry de nexo causal explícito: las milicias de 1806-07 → los regimientos criollos con líderes elegidos → los mismos actores en Mayo 1810 → la Revolución como continuación del proceso iniciado por las invasiones
- Cada entry: certeza asignada, ≥2 fuentes, imagen identificada

### Artifacts
- Entradas INV-13 a INV-18 en `.gsd/milestones/M020/slices/S01/tasks/T03-DRAFT-PARTIAL.md`
- `S01-CONTENT-DRAFT.md` final consolidado con todas las entradas de T01 + T02 + T03

### Key Links
- T03 produce el content draft final — consolida las entradas de T01 y T02 en un solo archivo ordenado
- La entry de nexo causal es el punto de articulación que S03 convierte en el conector narrativo HTML

## Steps

1. Buscar: Beresford prisionero Luján Catamarca Buenos Aires — fuentes sobre su cautiverio
2. Buscar: Beresford fuga Buenos Aires Ana Périchon Liniers — evidencia del rol de Ana Périchon
3. Buscar: Popham despachos Londres Buenos Aires 1806 — contenido de los despachos, reacción en Londres, corte marcial
4. Buscar: refuerzos británicos Buenos Aires 1807 oleadas — Auchmuty Montevideo, Craufurd, Whitelocke secuencia
5. Buscar: Whitelocke Buenos Aires 1807 estrategia — por qué no bombardeó, fuentes primarias o historiográficas
6. Buscar: Whitelocke corte marcial Londres 1808 — resultado y consecuencias
7. Buscar: Napoleón España 1808 Bayona abdicaciones — fecha exacta, términos, reacción en las colonias
8. Buscar: Junta Central Sevilla caída 1810 Buenos Aires — cómo llega la noticia, cuándo, reacción del Cabildo
9. Buscar imágenes Wikimedia: Whitelocke, Auchmuty, imagen de la batalla callejera de 1807, Napoleón (si no hay imagen específica de Bayona)
10. Verificar URLs via API para todas las imágenes nuevas
11. Redactar entradas T03
12. Consolidar T01-DRAFT-PARTIAL.md + T02-DRAFT-PARTIAL.md + T03 en `S01-CONTENT-DRAFT.md` final, numerado INV-1 a INV-N, ordenado cronológicamente
13. Revisión final del draft: consistencia de formato, completitud de fuentes, certeza coherente con el contenido

## Context

- **Whitelocke y el bombardeo** es la pregunta más analítica del milestone. Las hipótesis no son mutuamente excluyentes. La más documentada es (a): el gobierno Grenville tenía instrucciones de no destruir la ciudad porque el objetivo era apertura comercial, no conquista territorial. La hipótesis (b) es coherente con esas instrucciones pero más especulativa. Documentar ambas con sus fuentes.
- **El desfase informativo** Popham→Londres es uno de los hechos más fascinantes: los refuerzos viajaron durante meses basándose en informes de éxito que ya eran obsoletos cuando llegaron. Este desfase explica la segunda invasión mejor que cualquier plan deliberado.
- **Bayona 1808 y Mayo 1810**: el nexo es de ~22 meses. La Junta Central de Sevilla colapsa el 29 de enero de 1810; la noticia llega a Buenos Aires alrededor del 13–18 de mayo de 1810; el Cabildo Abierto es el 22 de mayo. Esta secuencia específica ya está en la card SP1-1 existente — el nuevo bloque la amplía, no la contradice.
- **La card panorámica existente** (línea ~220, sección colonial) usa el frame de "la defensa" — el nuevo bloque puede profundizar el frame de "la transformación política" sin contradecir la card existente.
- **Formato del draft consolidado**: usar encabezados `## Evento INV-N: Título` para facilitar la integración en S02. Incluir campo `**Posición HTML sugerida:**` para indicar el order de cada card dentro del sub-período.
- Fuentes adicionales relevantes: Ratto, H., *La expedición Popham y la defensa de Buenos Aires*, 1934; Di Meglio, G., *1806: Una ciudad en vilo*, 2006; Fernández Díaz, R., *Las invasiones inglesas*, 2006.

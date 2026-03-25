---
estimated_steps: 6
estimated_files: 2
---

# T01: Investigar y verificar las fechas clave, nombres y mecanismos de la Semana de Mayo

**Slice:** S01 — Research y Content Draft — 14 al 25 de mayo de 1810
**Milestone:** M010

## Description

Esta tarea retira los tres key risks de M010 antes de escribir una sola línea del draft. Los tres riesgos son: (1) el nombre correcto del grupo de presión de French y Berutti, (2) el mecanismo exacto de los "sobres duplicados" del Cabildo Abierto del 22 de mayo, y (3) las posiciones historiográficas verificadas para el debate "popular vs. élite". Además, se verifican los datos factuales de las 7 fechas clave y se identifican candidatos de imagen en Wikimedia Commons.

El output es `S01-RESEARCH-NOTES.md` — un archivo de notas estructurado que T02 consumirá para escribir el content draft. Nunca se escribe HTML en esta tarea.

## Steps

1. **Investigar el nombre del grupo French/Berutti.** Usar web_search con "French Berutti grupo escarapelas mayo 1810 nombre" y "legión infernal legión ardiente mayo 1810 nombre historiografía argentina". Determinar: ¿"Legión Infernal" es contemporáneo a 1810 o posterior? ¿Qué fuente primaria (si existe) nombra al grupo? ¿Cuál es el nombre más aceptado en historiografía académica (Levene, Halperin, Pigna)?

2. **Investigar el mecanismo de los "sobres duplicados".** Usar web_search con "cabildo abierto 22 mayo 1810 sobres duplicados listas manipuladas" y fetch_page en resultados que citen fuentes primarias (Actas del Cabildo AGN) o historiadores conocidos. Determinar: ¿qué pasó exactamente? ¿Exclusión de convocatorias a realistas, listas con nombres dobles, algo más? Identificar qué fuentes apoyan cada versión del mecanismo.

3. **Verificar los datos factuales de las 7 fechas clave.** Para cada fecha, verificar el dato más sensible:
   - 14 mayo: ¿quién trajo exactamente la noticia de la caída de la Junta Central? ¿Cuándo llegó a Buenos Aires (qué día)?
   - 18 mayo: ¿quiénes firmaron la petición al Cabildo? ¿Qué pedía exactamente — Cabildo Abierto, o algo más?
   - 22 mayo: ¿cuántos convocados? ¿cuántos asistieron? ¿El resultado fue 155 vs. 69 (como dice SP1-1) o hay otras cifras?
   - 23–24 mayo: ¿quiénes integraban la Junta Cisneriana propuesta y por qué fue rechazada?
   - 25 mayo: ¿hora de instalación de la Primera Junta? ¿Llovió realmente? ¿Quién fue a buscar a los miembros?
   - 30 mayo: ¿cuáles fueron las primeras acciones concretas de la Junta (circulares, expediciones, designaciones)?

4. **Recopilar posiciones historiográficas para el debate popular vs. élite.** Identificar las tres posiciones clásicas:
   - Liberal/patriótica (Mitre, Levene): movimiento popular
   - Estructuralista (Halperin Donghi): continuidad de élites reconfiguradas post-1806
   - Revisionismo popular (Pigna, Galasso): pueblo activo pero dirigido por una minoría patriota consciente
   Para cada posición, obtener una referencia bibliográfica verificada (autor + obra + año).

5. **Identificar candidatos de imagen en Wikimedia Commons.** Buscar (via API o web_search) imágenes PD para al menos 5 de las 9–10 cards previstas:
   - Retrato de Cisneros (virrey)
   - Retrato de Cornelio Saavedra
   - Acta del 25 de mayo (documento)
   - Una imagen del Cabildo de Buenos Aires (edificio/época)
   - Cualquier imagen de época relacionada con la Semana de Mayo
   Verificar que tengan 500px thumb disponible. Belgrano (ya SP1-3) y la imagen del Cabildo Abierto (ya SP1-1) no necesitan re-buscar.

6. **Documentar todo en `S01-RESEARCH-NOTES.md`.** Estructura: sección por tema (nombre grupo / sobres duplicados / fechas clave 7 días / debate historiográfico / imágenes Wikimedia). Para claims no verificados, escribir `[NO VERIFICADO: descripción del gap]` explícitamente — nunca silenciar un gap.

## Must-Haves

- [ ] El nombre del grupo French/Berutti tiene fuente asignada o `[NO VERIFICADO]` explícito con descripción del gap
- [ ] El mecanismo de los sobres duplicados tiene certeza asignada (hecho o debatido) con fuente que la respalda
- [ ] Los 7 datos factuales de las 7 fechas tienen cada uno una fuente o un `[NO VERIFICADO]` explícito
- [ ] Las 3 posiciones historiográficas del debate popular/élite tienen referencia bibliográfica (autor + obra + año)
- [ ] Al menos 5 candidatos de imagen Wikimedia identificados con sus URLs (o confirmación de que la imagen de SP1-1 ya cubre las cards del 22 mayo)
- [ ] `S01-RESEARCH-NOTES.md` escrito en `.gsd/milestones/M010/slices/S01/`

## Verification

```bash
# El archivo de notas existe
test -f .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md

# Tiene al menos 5 secciones temáticas
grep -c "^## " .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md
# debe retornar ≥5

# Ningún gap silenciado — todos los gaps tienen marcador explícito
# (Este check es de inspección manual: grep "NO VERIFICADO" muestra los gaps documentados)
grep "NO VERIFICADO" .gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md || echo "Sin gaps — todo verificado"
```

## Inputs

- `.gsd/milestones/M010/M010-CONTEXT.md` — lista de fechas clave, key risks, y fuentes sugeridas (Levene, Halperin, Pigna, Mitre, AGN)
- `.gsd/milestones/M010/M010-ROADMAP.md` — key risks: nombre Legión Infernal, sobres duplicados, debate popular vs. élite
- `index.html` (solo lectura) — para ver el texto de SP1-1 (el dato 155 vs. 69 votos debe ser coherente)
- `.gsd/KNOWLEDGE.md` — Wikimedia Commons sourcing protocol (API para verificar URLs)

## Expected Output

- `.gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` — archivo con ≥5 secciones temáticas, cada claim sensible con fuente o `[NO VERIFICADO]` explícito, listo para ser consumido directamente por T02.

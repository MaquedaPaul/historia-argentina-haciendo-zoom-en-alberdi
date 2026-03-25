---
estimated_steps: 7
estimated_files: 1
---

# T01: Research y draft — Encarnación y el lobby para la Suma del Poder Público

**Slice:** S01 — Research Encarnación/Suma del Poder Público y red Generación del 37
**Milestone:** M011

## Description

La pregunta central no contestada en el sitio: ¿presionó Encarnación Ezcurra *específicamente* para que Rosas exigiera la Suma del Poder Público como condición de su segundo mandato (1835), o su rol fue solo movilizar políticamente por el regreso de Rosas? Las cards existentes (S23-1, S23-2, S24-1, S24-2) cubren su rol político general; ninguna aborda el ángulo específico de la Suma. Esta tarea investiga y draft-ea esa card, con certeza asignada y justificada según la evidencia encontrada.

El archivo `S01-CONTENT-DRAFT.md` no existe — esta tarea lo crea.

## Steps

1. **Revisar contenido existente** en `index.html` para entender qué ya cubre el sitio sobre Encarnación y la Suma del Poder Público. Buscar: `grep -n "S23-1\|S23-2\|S24-1\|S24-2\|S14-1\|encarna\|suma del poder" index.html -i | head -30`. Identificar los gaps — qué ángulo falta.

2. **Investigar via web** la pregunta específica: ¿hay evidencia de que Encarnación presionó *por la Suma del Poder Público como condición* (no solo por el regreso de Rosas)? Términos de búsqueda útiles: "Encarnación Ezcurra Suma Poder Público", "Encarnación presionó Rosas 1835", "Lynch Encarnación Rosas lobby". Fuentes a priorizar: (a) Lynch, John, *Argentine Dictator: Juan Manuel de Rosas 1829–1852*, Oxford, 1981, cap. 5 — es la síntesis académica contemporánea más citada; (b) Irazusta, Julio, *Vida política de Juan Manuel de Rosas*, Buenos Aires, 1941 — posición revisionista que maximiza la agencia de Encarnación; (c) Ramos Mejía, J. M., *Rosas y su tiempo*, 1907 — fuente temprana con anécdotas; (d) AGN Sala X (correspondencia Encarnación–Rosas, publicada 1923) vía citas en historiografía secundaria.

3. **Determinar la certeza**. La lógica de certeza del sitio:
   - `hecho`: evidencia directa en fuente primaria o secondary consenso unánime
   - `debatido`: historiografía dividida, con posiciones distintas pero plausibles
   - `opinión`: posición atribuida a una corriente específica
   La pregunta "¿presionó Encarnación por la Suma como condición?" requiere distinguir: (a) ¿tenemos documentación de que ella específicamente exigió la Suma? → si sí: `hecho`; (b) ¿hay evidencia de que movilizó la base política, lo que hace plausible que influyó en las condiciones, pero no hay carta o testimonio explícito? → `debatido`; (c) ¿es solo afirmación de la historiografía revisionista sin corroboración liberal? → `opinión`.

4. **Verificar D051 y D052**:
   - D051: Si se menciona el plebiscito, usar **9,316** votos a favor (no 9,320)
   - D052: certeza `debatido` usa la clase CSS `card-opinion` (no existe `card-debatido`)

5. **Redactar la entrada** en formato estándar para `S01-CONTENT-DRAFT.md`:
   ```
   ## [ID sugerido] — [Título]
   
   - Año/período: [ej: 1833–1835]
   - Certeza: [hecho / debatido / opinión]
   - Certeza-justificación: [2–4 líneas explicando por qué esta certeza]
   - CSS class sugerida: [card-hecho / card-opinion]
   - data-certeza value: [hecho / debatido / opinión]
   
   **Excerpt (2–4 oraciones):**
   [Texto del card]
   
   **Fuentes:**
   - [Autor, Obra, año, cap/página si disponible]
   - [segunda fuente si hay]
   
   **Nota de inserción HTML:**
   [En qué sección del DOM va esta card, después de qué data-id existente, qué data-id sugerir para la nueva card]
   ```

6. **Crear el archivo** `S01-CONTENT-DRAFT.md` con encabezado de contexto y la primera entrada. Si hay dos ángulos distintos (ej: "la movilización general" vs "la condición de la Suma específicamente"), crear dos entries.

7. **Verificar**: `test -f .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && grep -q "Encarnaci" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md && grep -q "Certeza:" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`

## Must-Haves

- [ ] `S01-CONTENT-DRAFT.md` creado con ≥1 entrada sobre Encarnación y la Suma del Poder Público
- [ ] Certeza asignada con justificación explícita (≥2 líneas) — no solo la etiqueta
- [ ] ≥1 fuente específica con autor + obra + año (no "historiografía general")
- [ ] Nota de inserción HTML con posición sugerida en el DOM
- [ ] Sin `[VERIFICAR]` sin resolver en las entradas creadas
- [ ] Respetar D051: 9,316 si se menciona el plebiscito
- [ ] Respetar D052: card-opinion class para certeza debatido

## Verification

- `test -f .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -q "Encarnaci" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -q "Certeza:" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -q "Fuentes:" .gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md`

## Inputs

- `index.html` — para leer las cards S23-1, S23-2, S24-1, S24-2, S14-1 y entender qué ya cubre el sitio (evitar duplicación)
- `.gsd/DECISIONS.md` — D051 (usar 9,316), D052 (card-opinion para debatido), D009/D010 (sistema de certeza)
- `.gsd/KNOWLEDGE.md` — Quote Verification Protocol, Content Draft as Intermediate Artifact pattern

## Expected Output

- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — archivo nuevo con encabezado de contexto y ≥1 entrada de card lista para que T02 appende al mismo archivo. La entrada incluye: excerpt listo para HTML, certeza con justificación, fuentes, nota de inserción.

## Observability Impact

- **Artefacto único:** `S01-CONTENT-DRAFT.md` es el único artefacto producido por esta tarea. No hay runtime, no hay server, no hay estado en base de datos.
- **Señal de trabajo incompleto:** `grep "\[VERIFICAR\]" S01-CONTENT-DRAFT.md` — si retorna líneas, hay claims sin verificar que bloquean la integración en S03.
- **Inspección de cards draftadas:** `grep "^## " S01-CONTENT-DRAFT.md` — lista todas las cards con sus IDs sugeridos.
- **Failure state visible:** certeza `hecho` sin fuente específica → `grep -A5 "Certeza: hecho" S01-CONTENT-DRAFT.md | grep "Fuentes: —"` debe retornar vacío.
- **Señal de completitud de certeza:** `grep -c "Certeza:" S01-CONTENT-DRAFT.md` debe ser ≥ al número de cards (`grep -c "^## " S01-CONTENT-DRAFT.md`).
- **Para agentes futuros (T02, S03):** el comentario `<!-- T02 appenderá las cards M011-MARIQ-1 y M011-RED37-2 aquí -->` al final del archivo marca el punto de append.


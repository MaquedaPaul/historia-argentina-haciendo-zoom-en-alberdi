---
estimated_steps: 5
estimated_files: 1
---

# T01: Escribir S01-CONTENT-DRAFT.md con las 4 cards verificadas

**Slice:** S01 — Investigación y borrador
**Milestone:** M019

## Description

Toda la investigación histórica está completa y verificada en `.gsd/milestones/M019/slices/S01/S01-RESEARCH.md`. Esta tarea transcribe esos hallazgos al formato estructurado de `S01-CONTENT-DRAFT.md` que S02 consumirá mecánicamente para producir el HTML. La tarea no requiere investigación adicional — solo estructuración fiel del material verificado.

El draft debe seguir el patrón ya establecido en milestones anteriores (M002–M004): cada card tiene título, fecha, tipo de certeza, excerpt, fuentes, cita textual si aplica, e instrucciones de imagen. Además, incluye una sección de veredicto sobre la "escena Mitre-Urquiza" e instrucciones de integración para S02.

## Steps

1. **Leer** `.gsd/milestones/M019/slices/S01/S01-RESEARCH.md` completamente para tener todos los hechos, citas y fuentes antes de escribir.

2. **Escribir** `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` con la siguiente estructura:

   ```
   # S01-CONTENT-DRAFT — La Ruptura Mitre-Urquiza (1852)
   
   ## Veredicto: La "escena Mitre-Urquiza"
   [párrafo explicando que no hay fuente directa; el arco narrativo real es aliados en Caseros → oposición desde junio → Revolución del 11 de Septiembre]
   
   ## Card 1 — Caseros: Mitre en el Ejército Grande
   ## Card 2 — El Acuerdo de San Nicolás y las Jornadas de Junio
   ## Card 3 — Urquiza disuelve la Legislatura
   ## Card 4 — La Revolución del 11 de Septiembre
   
   ## Instrucciones de integración para S02
   ```

3. **Para cada card**, incluir exactamente estos campos:
   - `**Título:**`
   - `**Fecha display:**` (para el subtítulo visible en la UI)
   - `**data-certeza:**` (siempre `"hecho"` para estas 4 cards)
   - `**Excerpt:**` (2–4 oraciones en español, narrativo, enciclopédico)
   - `**Cita textual:**` (si aplica — Card 2 y Card 3 tienen citas verificadas; incluir con atribución exacta)
   - `**Fuentes:**` (≥2 fuentes por card; formato: Autor, *Título*, editorial, año)
   - `**Imagen:**` (descripción + URL o filename si ya existe en index.html)

4. **Para la sección "Instrucciones de integración para S02"**, incluir:
   - Punto de inserción en `index.html`: antes de la card SP4-1 (Alberdi/Bases), dentro del div `#rev-1852-1860`
   - `--reveal-delay` para cada card: 0ms, 80ms, 160ms, 240ms
   - Ajuste de stagger para SP4-1 a SP4-5: incrementar sus delays actuales en 320ms (o indicar que son en sub-grid separado y no requieren ajuste)
   - Confirmar que `events-grid--certeza` debe estar en el grid container
   - Confirmar que no se requieren cambios en `styles.css` ni `app.js`

5. **Verificar** el archivo resultante:
   ```bash
   grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md   # debe ser 4
   grep -c 'data-certeza="hecho"' .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md   # debe ser 4
   grep -q "escena" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md && echo "veredicto presente"
   ```

## Must-Haves

- [ ] El archivo `S01-CONTENT-DRAFT.md` existe y tiene exactamente 4 secciones `## Card N`.
- [ ] Cada card tiene `data-certeza="hecho"`.
- [ ] Card 2 incluye la cita de Mitre del 21 de junio de 1852: *"en una mano el dinero, en la otra las bayonetas, y disponían a sus pies, el territorio, las leyes y los hombres"* con atribución (discurso en la Legislatura de Buenos Aires, 21 de junio de 1852).
- [ ] Card 3 incluye la cita de Urquiza del 24 de junio de 1852: *"Considero este estado de cosas completamente anárquico..."* con atribución (Nota de Urquiza a Pinto, 24 de junio de 1852).
- [ ] Cada card tiene ≥2 fuentes de la historiografía argentina clásica (Halperin Donghi, Scobie, Ravignani, o Saldías).
- [ ] La sección "Veredicto: La 'escena Mitre-Urquiza'" explica que no hay fuente directa de la propuesta de poder compartido.
- [ ] La sección "Instrucciones de integración" especifica el punto exacto de inserción en `index.html` y los `--reveal-delay` para las 4 cards.
- [ ] Sin marcadores `[TBD]`, `[TODO]`, o `[VERIFICACIÓN PENDIENTE]` — todos los hechos están verificados en la investigación previa.

## Verification

- `test -f .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` retorna 4
- `grep -c 'data-certeza="hecho"' .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` retorna 4
- `grep -q "escena" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md && echo "OK"` imprime OK
- `! grep -q "TBD\|TODO\|VERIFICACIÓN PENDIENTE" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md`

## Inputs

- `.gsd/milestones/M019/slices/S01/S01-RESEARCH.md` — todos los hechos verificados, citas textuales, fuentes, y veredicto sobre la "escena Mitre-Urquiza". Leer completo antes de escribir el draft.
- **Card 1:** Mitre en Caseros como jefe de artillería del Ejército Grande, 3 de febrero de 1852. Fuentes: Saldías t.III, Halperin Donghi.
- **Card 2:** Acuerdo de San Nicolás (31 mayo 1852) + Jornadas de Junio (21–23 junio 1852). Cita verificada de Mitre. Fuentes: Ravignani t.IV, Halperin Donghi, Scobie.
- **Card 3:** Urquiza disuelve la Legislatura (24 junio 1852), expulsa a Alsina/Mitre/Sarmiento. Cita verificada de Urquiza. Fuentes: Halperin Donghi, Scobie.
- **Card 4:** Revolución del 11 de Septiembre de 1852. Actores: Alsina (civil), Pirán y Madariaga (militares). Resultado: Estado de Buenos Aires separado; Alsina gobernador, Mitre Ministro de Gobierno. Fuentes: Halperin Donghi, Scobie, Ravignani t.IV.
- **Punto de inserción en index.html:** línea ~2283, div `#rev-1852-1860`, **antes** de la card SP4-1 (Alberdi/Bases de 1852). Las cards existentes SP4-1 a SP4-5 deben seguir después.
- **Imagen disponible en index.html:** `Bartolomé_Mitre_(Manzoni,_1861).jpg` referenciada en SP4-5 — sugerir imagen diferente o más temprana para Card 1. Para Card 4 existe `Mapa_Argentina_vs_BuenosAires_1858.jpg` en SP4-3 — disponible como referencia.

## Expected Output

- `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` — archivo de borrador completo con 4 cards verificadas listas para integración HTML en S02. Este es el único entregable de S01 y el único insumo que S02 necesita de este slice.

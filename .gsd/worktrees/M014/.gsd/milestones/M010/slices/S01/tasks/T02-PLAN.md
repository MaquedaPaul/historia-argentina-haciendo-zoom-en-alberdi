---
estimated_steps: 6
estimated_files: 2
---

# T02: Escribir S01-CONTENT-DRAFT.md con las entradas verificadas

**Slice:** S01 — Research y Content Draft — 14 al 25 de mayo de 1810
**Milestone:** M010

## Description

Esta tarea transforma las notas de investigación de T01 en el contrato de contenido formal que S02 consumirá para producir HTML. El output es `S01-CONTENT-DRAFT.md` — un archivo estructurado con una entrada por card, en el formato exacto del `S01-CONTENT-DRAFT.md` de M002. El executor de S02 debe poder leer este archivo y producir el HTML de forma mecánica, sin necesidad de investigar nada.

**Cards planificadas:** 7 entradas day-by-day (14, 18, 22, 23, 24, 25, 30 mayo) + 2–3 entradas temáticas (grupo French/Berutti, sobres duplicados, presión miliciana) + 1 entrada especial `card-nota-historiografica` (debate popular vs. élite). Total: 10–11 entradas.

**Restricciones críticas del sistema:** Sin CSS ni JS nuevos. Usar templates de card existentes: `card-hecho`, `card-opinion`, `card-rumor`. El sistema `data-certeza` usa: hecho / opinión / rumor / debatido (este último usa clase `card-opinion` visualmente, per D052). La card panorámica SP1-1 existente se mantiene intacta — las nuevas cards van *después* de SP1-1, formando una subsección. No inventar citas directas — si no hay cita verificada, usar paráfrasis atribuida con `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]` per KNOWLEDGE.md.

## Steps

1. **Crear `S01-CONTENT-DRAFT.md`** en `.gsd/milestones/M010/slices/S01/`. Comenzar con el header estándar:
   ```
   # S01 — Content Draft: Semana de Mayo — 14 al 30 de mayo de 1810
   
   **Status:** In progress — T01 complete, T02 in progress
   **Total events:** [N] ([x] hecho, [y] debatido, [z] opinión)
   **Language:** Spanish
   **Contexto:** Cards day-by-day que se insertan después de SP1-1 en #rev-1800-1820
   ```

2. **Escribir las 7 entradas day-by-day** en orden cronológico: 14, 18, 22, 23, 24, 25, 30 de mayo. Para cada una usar este formato exacto (igual que M002-S01-CONTENT-DRAFT.md):
   ```markdown
   ## Evento [N]: [Nombre corto]
   
   - **Título:** [Título completo para la card]
   - **Fecha display:** [Fecha legible para el lector]
   - **Certeza:** `hecho` | `debatido` | `opinión` | `rumor`
   - **Indicador:** ✓ Hecho documentado | ⚖ Debatido | 💬 Opinión atribuida | 🔍 Rumor
   - **Card type:** card-hecho | card-opinion (para debatido, usar card-opinion per D052)
   
   ### Extracto (card text)
   [3–5 oraciones. Para hecho: texto directo. Para debatido: reconocer la incertidumbre.]
   
   ### Fuentes y verificación
   - **[Dato clave]:** [fuente] — [confirmado/debatido/no verificado]
   
   ### Cita para `<cite>`
   > [Autor, Obra, Año. Fuente secundaria si no hay primaria accesible.]
   
   ### Notas de imagen
   - **Candidato:** [Wikimedia filename o descripción] — [PD/CC status] — [URL 500px si disponible]
   ```

3. **Para las fechas 14 y 30 de mayo** (menos cubiertos en la historiografía popular): si los datos son suficientes para `hecho`, usarlos; si hay incertidumbre sobre detalles clave, usar `debatido`. No inventar detalles — es preferible una card más corta con fuentes sólidas que una larga con claims especulativos.

4. **Escribir 2–3 entradas temáticas** siguiendo el mismo formato. Mínimo 2 obligatorias:
   - "El grupo de French y Berutti y las escarapelas" — certeza según hallazgo de T01 (probablemente `hecho` para los hechos básicos, `debatido` para el nombre del grupo). Incluir el nombre verificado del grupo según T01.
   - "Los sobres duplicados del Cabildo Abierto" — certeza `debatido` (el mecanismo exacto varía entre fuentes, según M010-ROADMAP). Explicar las distintas versiones del mecanismo con atribución por fuente.
   - Opcional: "La presión miliciana del 25 de mayo" — el rol de los cuerpos militares y la amenaza de fuerza que respaldó la exigencia civil.

5. **Escribir la entrada especial `card-nota-historiografica`** para el debate "¿revolución popular o golpe de élites?":
   - Certeza: `debatido`
   - Card type: `card-opinion` (clase CSS) con `data-certeza="debatido"` (per D052, D058)
   - Incluir las 3 posiciones historiográficas identificadas en T01 (liberal/Mitre, estructuralista/Halperin, síntesis), cada una con atribución (autor + obra + año)
   - Nota en el draft: `[card-nota-historiografica: incluir `<p class="card-nota-historiografica">` en el HTML de S02]`
   - Indicador: ⚖ (debatido)

6. **Agregar sección `## Resumen de certeza` al final del archivo:**
   ```markdown
   ## Resumen de certeza
   - Total cards: [N]
   - hecho: [N]
   - debatido: [N] (usan clase card-opinion con data-certeza="debatido")
   - opinión: [N]
   - rumor: [N]
   - card-nota-historiografica: [N]
   - Claims con [VERIFICAR] pendientes: [N] — listar cuáles
   ```

## Must-Haves

- [ ] `S01-CONTENT-DRAFT.md` existe en `.gsd/milestones/M010/slices/S01/`
- [ ] 7 entradas day-by-day (14, 18, 22, 23, 24, 25, 30 mayo) — todas con fuentes y certeza
- [ ] ≥2 entradas temáticas (grupo French/Berutti obligatoria; sobres duplicados obligatoria)
- [ ] 1 entrada `card-nota-historiografica` para el debate popular/élite con 3 posiciones atribuidas
- [ ] Cada entrada tiene `### Fuentes y verificación` con ≥1 fuente citada
- [ ] El nombre del grupo French/Berutti usa el nombre verificado por T01 (no inventado)
- [ ] Los datos de los votos del 22 mayo son coherentes con SP1-1 en `index.html` (155 vs. 69 — per D051 sobre consistencia con el live page)
- [ ] Ningún claim sin fuente elevado a `hecho` — todo gap marcado con `[VERIFICAR]`
- [ ] Sección `## Resumen de certeza` al final

## Verification

```bash
# Archivo existe
test -f .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# ≥10 secciones ## (9 cards + 1 resumen)
grep -c "^## " .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# ≥9 secciones de fuentes
grep -c "^### Fuentes" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# ≥9 asignaciones de certeza
grep -c "Certeza:" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# Al menos una nota historiográfica planificada
grep -c "card-nota-historiografica" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# Resumen al final
grep -c "Resumen de certeza" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md

# Coherencia con SP1-1: los votos del 22 mayo no contradicen el valor en live page
grep "155" .gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md
# debe aparecer "155" si los votos son mencionados (coherente con index.html SP1-1)
```

## Inputs

- `.gsd/milestones/M010/slices/S01/S01-RESEARCH-NOTES.md` — output de T01, fuente de verdad para todos los claims, nombres y mecanismos
- `.gsd/milestones/M002/slices/S01/S01-CONTENT-DRAFT.md` — formato de referencia a copiar exactamente
- `index.html` (solo lectura) — para verificar el texto de SP1-1 y garantizar coherencia (especialmente el dato de votos 155 vs. 69)
- `.gsd/KNOWLEDGE.md` — protocolo de citas Alberdi (aplica también para otras figuras históricas); regla de no sintetizar citas directas; patrón `card-nota-certeza` para flags inline
- `.gsd/DECISIONS.md` D052 — data-certeza="debatido" usa clase card-opinion (sin nuevo CSS)
- `.gsd/DECISIONS.md` D056 — formato de tres posiciones para card-nota-historiografica
- `.gsd/DECISIONS.md` D008 — verificación histórica obligatoria antes de integrar

## Expected Output

- `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` — contrato de contenido completo con ≥9 entradas de card, cada una con certeza, fuentes verificadas, extracto de 3–5 oraciones, cita `<cite>`, y notas de imagen. El executor de S02 puede usar este archivo directamente sin investigar.

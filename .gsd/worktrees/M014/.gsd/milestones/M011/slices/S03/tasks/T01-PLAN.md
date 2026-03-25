---
estimated_steps: 5
estimated_files: 1
---

# T01: Integrar 5 cards en grid 1 de #rev-alberdi-formacion

**Slice:** S03 — Integración HTML
**Milestone:** M011

## Description

Splice bottom-up de 5 cards en el grid 1 de `#rev-alberdi-formacion` ("Alberdi: Los años de formación 1810–1838"). El orden bottom-up previene que inserciones en la parte alta del archivo desplacen los anchors de las inserciones posteriores. Las 5 cards vienen especificadas verbatim en los content drafts de S01 y S02 — no hay investigación nueva.

Las 3 posiciones de inserción, de mayor a menor línea:
- **A4+A5** (RED37-1 + RED37-2): después del cierre del article BIOG-11, antes del `</div>` que cierra grid 1
- **A3** (MARIQ-1): después del cierre del article BIOG-7
- **A1+A2** (CANE-1 + CANE-2): después del cierre del article BIOG-5

## Steps

1. **Relocalizar los anchors actuales** con grep (los números de línea del plan son orientativos, pueden variar si hubo edits previos):
   ```bash
   grep -n '<!-- BIOG-5:' index.html
   grep -n '<!-- BIOG-7:' index.html
   grep -n '<!-- BIOG-11:' index.html
   grep -n 'events-grid multifac' index.html   # cierre de grid 1 está justo ANTES de este bloque
   grep -c 'data-certeza' index.html            # baseline check (debe ser 93 o cercano)
   grep -c 'data-id="M011-' index.html          # debe ser 0 al inicio
   ```

2. **Splice A4+A5: RED37-1 (hecho) y RED37-2 (hecho) después de BIOG-11**

   El anchor es el cierre del article de BIOG-11 seguido del cierre del grid. Usar `Write` para crear `/tmp/m011-red37.html` con el bloque HTML de las 2 cards (con HTML entities para non-ASCII), luego `edit` sobre `index.html` para insertar el bloque entre el cierre `</article>` de BIOG-11 y las 3 líneas en blanco que preceden `</div>` (el cierre del grid 1).

   Template para RED37-1 (card-hecho, data-certeza="hecho", data-id="M011-RED37-1", stagger 0ms):
   ```html
   <!-- M011-RED37-1: La formación de la red — Salón Literario 1837 -->
   <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="M011-RED37-1" style="--reveal-delay: 0ms">
     <div class="card-certeza-indicator">
       <span class="card-certeza-icon" aria-hidden="true">✓</span>
       <span class="card-certeza-label">Hecho documentado</span>
     </div>
     <span class="event-card__year">1835–1838</span>
     <h3 class="event-card__title">La red de la Generaci&#xF3;n del 37: el Sal&#xF3;n Literario como punto de cristalizaci&#xF3;n</h3>
     <p class="event-card__excerpt">...</p>
     <footer class="card-source">
       <span class="card-source__icon" aria-hidden="true">📄</span>
       <cite>...</cite>
     </footer>
   </article>
   ```
   (Completar excerpt y cite con el contenido exacto de S01-CONTENT-DRAFT.md § M011-RED37-1, usando HTML entities para todos los caracteres acentuados.)

   Template para RED37-2 (card-hecho, data-certeza="hecho", data-id="M011-RED37-2", stagger 80ms): misma estructura, con el excerpt de § M011-RED37-2.

3. **Splice A3: MARIQ-1 (hecho) después de BIOG-7**

   El anchor es el cierre del article de BIOG-7 (La tienda de Maldes, Volney y el piano de Mariquita). Localizar con `grep -n 'BIOG-7\|tienda de Maldes' index.html`. La card MARIQ-1 usa `data-certeza="hecho"` y clase `card-hecho`, con stagger 0ms. El excerpt incluye el `<span class="card-nota-certeza">[Tradición: ...]</span>` verbatim del draft. El quote de Alberdi sobre Mariquita se incluye en el excerpt como texto fluido con atribución entre paréntesis ("atribuido en historiografía secundaria"), no como `<blockquote>`.

4. **Splice A1+A2: CANE-1 (hecho) y CANE-2 (debatido) después de BIOG-5**

   El anchor es el cierre del article de BIOG-5 (El viaje a Buenos Aires y el Colegio de Ciencias Morales). CANE-1 usa `card-hecho`, stagger 0ms. CANE-2 usa `card-opinion` con `data-certeza="debatido"`, stagger 80ms, certeza indicator ⚖ + "Debatido historiogr&#xE1;ficamente". El `<span class="card-nota-certeza">` de CANE-2 incluye la nota sobre el género "cielo" y la distinción Vicente Fidel L&#xF3;pez (1815–1903) / Vicente L&#xF3;pez y Planes. **Crítico:** Identificar "Vicente Fidel L&#xF3;pez (el hijo, historiador)" explícitamente — no dejar solo "Vicente L&#xF3;pez" (D065).

5. **Verificar estado intermedio**:
   ```bash
   grep -c 'data-id="M011-' index.html        # debe ser 5
   grep -c 'reveal reveal-slide' index.html    # debe ser 103 (98 baseline + 5)
   grep -c 'data-certeza' index.html           # debe ser 98 (93 + 5)
   git diff --name-only HEAD -- styles.css app.js  # debe ser vacío
   ```

## Must-Haves

- [ ] 5 articles M011 presentes en el grid 1 de `#rev-alberdi-formacion`: CANE-1, CANE-2, MARIQ-1, RED37-1, RED37-2
- [ ] Orden DOM correcto: CANE-1 y CANE-2 después de BIOG-5; MARIQ-1 después de BIOG-7; RED37-1 y RED37-2 después de BIOG-11
- [ ] Splices realizados bottom-up para evitar drift de anchors
- [ ] HTML entities usadas para todos los caracteres no-ASCII en los bloques insertados
- [ ] `<span class="card-nota-certeza">` preservado verbatim en MARIQ-1 (Himno Nacional) y CANE-2 (cielo/Vicente López)
- [ ] CANE-2 identifica a "Vicente Fidel López" (el hijo, 1815–1903) — no solo "Vicente López"
- [ ] `styles.css` y `app.js` no modificados

## Verification

```bash
grep -c 'data-id="M011-' index.html           # 5
grep -c 'reveal reveal-slide' index.html       # 103
grep -c 'data-certeza' index.html              # 98
grep 'data-id="M011-CANE-1"' index.html        # 1 resultado
grep 'data-id="M011-RED37-2"' index.html       # 1 resultado
grep 'data-id="M011-MARIQ-1"' index.html       # 1 resultado
git diff --name-only HEAD -- styles.css app.js # vacío
grep -n '\[VERIFICAR\]' index.html             # vacío
```

## Inputs

- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — especificación completa de RED37-1, MARIQ-1, RED37-2 (secciones `## M011-RED37-1`, `## M011-MARIQ-1`, `## M011-RED37-2`; incluyen excerpt verbatim, fuentes, y "Nota de inserción HTML")
- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — especificación completa de CANE-1, CANE-2 (secciones `## M011-CANE-1`, `## M011-CANE-2`; incluyen excerpt verbatim con spans `card-nota-certeza` ya escritos)
- `index.html` — archivo a modificar; baseline: 93 `data-certeza`, 98 `reveal reveal-slide`, 0 `data-id="M011-"`
- S03-RESEARCH.md decision: stagger CANE-1=0ms, CANE-2=80ms; MARIQ-1=0ms; RED37-1=0ms, RED37-2=80ms (nuevos grupos reinician desde 0ms per patrón S23/S24)
- D052: `data-certeza="debatido"` usa clase CSS `card-opinion` (no existe clase `card-debatido`)
- D053: HTML entities obligatorias para non-ASCII en bloques escritos como temp files antes de splicing
- D065: "Vicente López" en contexto Gen. del 37 = Vicente Fidel López (hijo, 1815–1903), identificarlo explícitamente en CANE-2

## Expected Output

- `index.html` — modificado con 5 articles M011 integrados en grid 1 de `#rev-alberdi-formacion`; `grep -c 'data-id="M011-' index.html` retorna 5; `grep -c 'reveal reveal-slide' index.html` retorna 103

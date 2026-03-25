---
estimated_steps: 5
estimated_files: 1
---

# T01: Insertar sección #rev-tertulias-mariquita en index.html y verificar

**Slice:** S02 — Integración HTML y verificación
**Milestone:** M014

## Description

Insertar el bloque HTML completo de las 6 cards de las tertulias de Mariquita Sánchez en `index.html`, usando el contenido ya verificado del artefacto de handoff `S01-CONTENT-DRAFT.md`. Todo el trabajo es mecánico: los patrones HTML existen, el contenido está listo, el punto de inserción está identificado con precisión.

No hay trabajo de investigación ni de diseño. Solo:
1. Leer el draft para obtener el contenido exacto de cada card
2. Construir el bloque HTML siguiendo los templates del codebase existente
3. Insertar en el punto correcto de `index.html`
4. Agregar el sub-nav link
5. Verificar con greps y browser

## Steps

1. **Leer `S01-CONTENT-DRAFT.md` completo** para obtener el texto de los 6 excerpts, los `<cite>` HTML, las URLs de imagen, y la nota historiográfica de TER-2. El archivo está en `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md`.

2. **Preparar el bloque HTML de `#rev-tertulias-mariquita`** como string completo. Estructura:
   ```html
   <!-- ══════════════ [NUEVA SECCIÓN M014/S02] ══════════════
        Las Tertulias de Mariquita Sánchez (1805–1868)
        id="rev-tertulias-mariquita"
        ══════════════════════════════════════════════════ -->
   <div id="rev-tertulias-mariquita" class="sub-period reveal reveal-fade">
     <h3 class="sub-period__title">Las Tertulias de Mariquita Sánchez (1805–1868)</h3>
     <div class="events-grid events-grid--certeza" aria-label="Las Tertulias de Mariquita Sánchez">
       <!-- TER-1: card-hecho, delay 0ms -->
       <!-- TER-2: card-rumor, delay 80ms, CON card-nota-historiografica -->
       <!-- TER-3: card-hecho, delay 160ms, CON imagen daguerrotipo URL directa -->
       <!-- TER-4: card-hecho, delay 240ms, CON card-nota-certeza inline -->
       <!-- TER-5: card-opinion, delay 320ms, SIN imagen -->
       <!-- TER-6: card-opinion, delay 400ms, SIN imagen -->
     </div>
   </div><!-- /#rev-tertulias-mariquita -->
   ```
   
   Templates por tipo de certeza (ver ejemplos en index.html, sección SP1/SP2):
   
   **card-hecho** (TER-1, TER-3, TER-4):
   ```html
   <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">
     <div class="card-certeza-indicator">
       <span class="card-certeza-icon" aria-hidden="true">✓</span>
       <span class="card-certeza-label">Hecho documentado</span>
     </div>
     <div class="card-image">
       <img src="URL" alt="ALT" loading="lazy">
     </div>
     <span class="event-card__year">AÑOS</span>
     <h3 class="event-card__title">TÍTULO</h3>
     <p class="event-card__excerpt">TEXTO</p>
     <footer class="card-source">
       <span class="card-source__icon" aria-hidden="true">📄</span>
       <cite>FUENTES HTML</cite>
     </footer>
   </article>
   ```
   
   **card-rumor** (TER-2):
   ```html
   <article class="event-card card-rumor reveal reveal-slide" data-certeza="rumor" style="--reveal-delay: 80ms">
     <div class="card-certeza-indicator">
       <span class="card-certeza-icon" aria-hidden="true">⚠️</span>
       <span class="card-certeza-badge-rumor">Rumor</span>
     </div>
     <div class="card-image">
       <img src="URL" alt="ALT" loading="lazy">
     </div>
     <span class="event-card__year">FECHA</span>
     <h3 class="event-card__title">TÍTULO</h3>
     <p class="event-card__excerpt card-rumor__text">TEXTO</p>
     <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> TEXTO NOTA</p>
     <footer class="card-rumor__origin">
       <span class="card-rumor__origin-icon" aria-hidden="true">🔍</span>
       <p class="card-rumor__origin-text"><strong>Origen del rumor:</strong> TEXTO ORIGEN</p>
     </footer>
   </article>
   ```
   
   **card-opinion** (TER-5, TER-6):
   ```html
   <article class="event-card card-opinion reveal reveal-slide" data-certeza="opinion" style="--reveal-delay: Nms">
     <div class="card-certeza-indicator">
       <span class="card-certeza-icon" aria-hidden="true">💬</span>
       <span class="card-certeza-label">Opinión atribuida</span>
     </div>
     <span class="event-card__year">AÑOS</span>
     <h3 class="event-card__title">TÍTULO</h3>
     <p class="event-card__excerpt">TEXTO</p>
     <blockquote class="card-opinion__quote">
       <p>CITA</p>
       <footer class="card-opinion__attribution">
         <strong class="card-opinion__author">AUTOR</strong>
         <span class="card-opinion__context">— CONTEXTO</span>
       </footer>
     </blockquote>
   </article>
   ```

3. **Escribir el bloque HTML a un archivo temporal** (e.g. `/tmp/ter-block.html`) usando el tool `Write`. NO usar heredoc en bash — el entorno es Windows/Git Bash y los heredocs fallan con contenido largo (ver KNOWLEDGE.md). Usar el tool `Write` para escribir el bloque completo.

4. **Insertar en `index.html`** usando el tool `Edit`:
   - `oldText`: el fragmento exacto `        </div><!-- /#rev-1820-1835 -->\n\n        <!-- ══════════════════════════════════════════════════\n             SUB-PERÍODO ROSAS:`
   - `newText`: el mismo fragmento con el bloque de tertulias insertado entre el cierre de `#rev-1820-1835` y el comentario de apertura de `#periodo-rosas`
   
   **Alternativa si el bloque es muy largo para `Edit`:** Usar Node.js para insertar en línea 1439:
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html', 'utf8');
   const marker = '</div><!-- /#rev-1820-1835 -->';
   const block = fs.readFileSync('/tmp/ter-block.html', 'utf8');
   const result = html.replace(marker, marker + '\n\n' + block);
   fs.writeFileSync('index.html', result, 'utf8');
   console.log('done');
   "
   ```

5. **Agregar sub-nav link**: Usar `Edit` para insertar después de la línea `<a href="#rev-1820-1835"` en el `<nav class="sub-nav">` (línea ~330):
   ```html
   <a href="#rev-tertulias-mariquita" class="sub-nav__link">1810–1868<span class="sub-nav__link-label">Tertulias de Mariquita</span></a>
   ```
   Este link va DESPUÉS del link a `#rev-1820-1835` y ANTES del link a `#periodo-rosas`.

## Must-Haves

- [ ] `grep -c "rev-tertulias-mariquita" index.html` → 2 (div id + sub-nav link)
- [ ] `grep -c "card-nota-historiografica" index.html` → 13 (baseline 12 + 1 nueva en TER-2)
- [ ] `grep -c "card-nota-certeza" index.html` → 24 (baseline 23 + 1 nueva en TER-4)
- [ ] `grep -c 'data-certeza=' index.html` → 99 (baseline 93 + 6 nuevas)
- [ ] `tail -5 index.html` contiene `</html>` (archivo no truncado)
- [ ] TER-2 es `card-rumor` con `data-certeza="rumor"` y tiene `<p class="card-nota-historiografica">` visible (NO dentro de expand/collapse)
- [ ] TER-3 usa URL directa `https://upload.wikimedia.org/wikipedia/commons/0/00/Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg` — NO un path `/thumb/…/500px-…`
- [ ] Sitio abre sin errores JS en consola del browser

## Verification

```bash
# Baseline antes de modificar (para comparar):
grep -c "rev-tertulias-mariquita" index.html   # → 0
grep -c "card-nota-historiografica" index.html  # → 12
grep -c "card-nota-certeza" index.html          # → 23
grep -c 'data-certeza=' index.html              # → 93

# Post-inserción:
grep -c "rev-tertulias-mariquita" index.html   # → 2
grep -c "card-nota-historiografica" index.html  # → 13
grep -c "card-nota-certeza" index.html          # → 24
grep -c 'data-certeza=' index.html              # → 99
tail -5 index.html                             # → contiene </html>

# TER-2 imagen no tiene path de thumb manual:
grep "Himno_Nacional\|500px-Himno" index.html  # → URL de thumb es OK (esta imagen SÍ tiene 500px thumb)

# TER-3 no tiene thumb path:
grep "Mar.a_S.nchez_de_Mendeville" index.html  # → debe ser URL directa sin /thumb/

# Confirmar que la sección está dentro de #periodo-revolucion:
grep -n "rev-tertulias-mariquita\|periodo-revolucion" index.html
# → la nueva sección debe aparecer entre las líneas del bloque #periodo-revolucion
```

Browser: Abrir `index.html` → navegar a `#rev-tertulias-mariquita` → confirmar 6 cards visibles, nota historiográfica de TER-2 visible en texto, consola DevTools limpia.

## Inputs

- `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — contenido completo de las 6 cards (excerpts, cite HTML, URLs de imagen, nota historiográfica de TER-2, nota de certeza de TER-4). Este es el único source de verdad para el contenido.
- `index.html` — archivo a modificar. Línea de inserción: después de `</div><!-- /#rev-1820-1835 -->` (actualmente línea 1439). Sub-nav en línea ~330.
- **Baselines actuales** (verificados al planear S02):
  - `grep -c "card-nota-historiografica" index.html` → 12
  - `grep -c "card-nota-certeza" index.html` → 23
  - `grep -c 'data-certeza=' index.html` → 93
  - `grep -c "rev-tertulias-mariquita" index.html` → 0

## Expected Output

- `index.html` modificado con nueva sección `#rev-tertulias-mariquita` (6 cards) y sub-nav link funcional
- Los greps de verificación retornan los valores esperados (ver Must-Haves)
- El sitio abre en browser sin errores JS y la nueva sección es navegable desde el sub-nav

## Common Pitfalls (del research S02 y KNOWLEDGE.md)

- **NO usar heredoc en bash** para escribir el bloque HTML — usar el tool `Write` para escribir a un archivo temporal, luego Node.js para insertar.
- **TER-3 imagen:** NO construir path de thumb manualmente. La imagen mide 321×410 px y no tiene miniatura de 500px. Usar URL directa: `https://upload.wikimedia.org/wikipedia/commons/0/00/Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg` con `width="100%"`.
- **TER-2 nota historiográfica:** `<p class="card-nota-historiografica">` como párrafo visible — NO dentro de expand/collapse toggle. Ver el patrón en línea ~1761 de index.html para un ejemplo real.
- **card-rumor no tiene `<footer class="card-source">`** — tiene `<footer class="card-rumor__origin">` en su lugar. Usar el template correcto.
- **data-certeza sin acento:** Usar `data-certeza="opinion"` (sin acento) para TER-5 y TER-6, consistente con el período adyacente (SP2-4 usa `"opinion"` sin acento).
- **La sección debe estar dentro de `#periodo-revolucion`** (que es el contenedor del sub-nav observer). Verificar que la inserción está en el lugar correcto y no fuera del `div#periodo-revolucion`.

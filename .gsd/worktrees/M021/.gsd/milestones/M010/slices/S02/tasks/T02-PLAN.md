---
estimated_steps: 7
estimated_files: 1
---

# T02: Integrar las 11 cards en index.html usando el manifiesto de imágenes

**Slice:** S02 — Integración HTML — cards en index.html
**Milestone:** M010

## Description

Integrar los 11 eventos del draft `S01-CONTENT-DRAFT.md` como HTML en `index.html`, en el punto de inserción correcto: entre SP1-1 y SP1-2 dentro de la `events-grid` del sub-período `#rev-1800-1820`. Usar el manifiesto de imágenes `T01-IMAGE-MANIFEST.md` para cada `<img src>`. Seguir el patrón HTML exacto del codebase existente. Actualizar los `--reveal-delay` de SP1-2 a SP1-5 para mantener continuidad de stagger.

**No se introduce CSS ni JS nuevo.** El sistema reveal-on-scroll funciona automáticamente para cualquier elemento con `class="reveal reveal-slide"`. La función `initImageFallbacks` en app.js detecta automáticamente todos los `.card-image img` — no requiere registro manual.

## Steps

### Paso 1 — Leer el punto de inserción exacto

Leer `index.html` alrededor de las líneas 1210–1330. Confirmar:
- SP1-1 termina con `</article>` antes de `</div><!-- /.events-grid SP1 -->`
- La inserción va **entre el `</article>` de SP1-1 y el `</div><!-- /.events-grid SP1 -->`**
- SP1-2 comienza con `<!-- SP1-2: Primeros gobiernos patrios -->` a continuación

### Paso 2 — Calcular stagger delays

El `events-grid` de `#rev-1800-1820` tendrá 16 cards después de la integración (1 SP1-1 + 11 nuevas + 4 SP1-2 a SP1-5). Asignar delays en incrementos de 80ms:

| Card | ID | Delay |
|------|-----|-------|
| SP1-1 (existente — NO TOCAR) | — | 0ms |
| Evento 1: 14 mayo | M10-E1 | 80ms |
| Evento 2: 18 mayo | M10-E2 | 160ms |
| Evento 3: 22 mayo | M10-E3 | 240ms |
| Evento 4: 23 mayo | M10-E4 | 320ms |
| Evento 5: 24 mayo | M10-E5 | 400ms |
| Evento 6: 25 mayo | M10-E6 | 480ms |
| Evento 7: 26–31 mayo | M10-E7 | 560ms |
| Temática 1: French/Berutti | M10-T1 | 640ms |
| Temática 2: Manipulación Cabildo | M10-T2 | 720ms |
| Temática 3: Presión miliciana | M10-T3 | 800ms |
| Temática 4: Debate historiográfico | M10-T4 | 880ms |
| SP1-2 (existente — ACTUALIZAR) | — | 960ms |
| SP1-3 (existente — ACTUALIZAR) | — | 1040ms |
| SP1-4 (existente — ACTUALIZAR) | — | 1120ms |
| SP1-5 (existente — ACTUALIZAR) | — | 1200ms |

### Paso 3 — Estructura HTML de cada card

**Card tipo `hecho` (Eventos 1, 2, 4, 5, 6 y Temática 3):**
```html
            <!-- M10-E1: 14 de mayo — llegada de las noticias -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 80ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">✓</span>
                <span class="card-certeza-label">Hecho documentado</span>
              </div>
              <div class="card-image">
                <img src="URL_VERIFICADA_DE_MANIFEST"
                     alt="ALT_TEXT_DE_MANIFEST"
                     loading="lazy">
              </div>
              <span class="event-card__year">FECHA DISPLAY</span>
              <h3 class="event-card__title">TÍTULO</h3>
              <p class="event-card__excerpt">EXTRACTO</p>
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">📄</span>
                <cite>CITA DE FUENTE</cite>
              </footer>
            </article>
```

**Si la card no tiene imagen verificada** (omitir el bloque `<div class="card-image">` completamente — no dejar un `<div>` vacío).

**Card tipo `debatido` (Eventos 3, 7 y Temáticas 1, 2, 4):**
```html
            <!-- M10-E3: 22 de mayo — Cabildo Abierto -->
            <article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" style="--reveal-delay: 240ms">
              <div class="card-certeza-indicator">
                <span class="card-certeza-icon" aria-hidden="true">⚖</span>
                <span class="card-certeza-label">Debatido historiográficamente</span>
              </div>
              <!-- card-image si hay imagen verificada -->
              <span class="event-card__year">FECHA DISPLAY</span>
              <h3 class="event-card__title">TÍTULO</h3>
              <p class="event-card__excerpt">EXTRACTO</p>
              <!-- Para Card Temática 4 SOLAMENTE: añadir aquí -->
              <!-- <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> TEXTO</p> -->
              <footer class="card-source">
                <span class="card-source__icon" aria-hidden="true">📄</span>
                <cite>CITA DE FUENTE</cite>
              </footer>
            </article>
```

**Nota importante sobre Card Temática 4 (Debate historiográfico):**  
Esta card usa `class="event-card card-opinion"` con `data-certeza="debatido"` (no `data-certeza="opinion"`). El extracto incluye las 3 posiciones historiográficas con sus atribuciones. La `<p class="card-nota-historiografica">` va **después** del extracto y **antes** del footer. Ver KNOWLEDGE.md sección "Nota Historiográfica Pattern".

### Paso 4 — Escribir las 11 cards en index.html

Usar el tool `edit` para insertar el HTML de las 11 cards en el punto de inserción. El oldText a buscar es:

```
            </article>

          </div><!-- /.events-grid SP1 -->
        </div><!-- /#rev-1800-1820 -->
```

El newText añade las 11 cards entre el `</article>` de SP1-5 y el `</div><!-- /.events-grid SP1 -->`.

**IMPORTANTE:** Las nuevas cards van inmediatamente después de SP1-1 (la primera card), no después de SP1-5. Buscar el `</article>` de SP1-1 específicamente. SP1-1 termina con:

```html
              </footer>
            </article>

            <!-- SP1-2: Primeros gobiernos patrios -->
```

El oldText correcto para la inserción es el cierre de SP1-1 y el comentario de SP1-2:
```
            </article>

            <!-- SP1-2: Primeros gobiernos patrios -->
```

El newText inserta las 11 cards entre el `</article>` de SP1-1 y el comentario `<!-- SP1-2: -->`.

### Paso 5 — Actualizar reveal-delays de SP1-2 a SP1-5

Usar `edit` para cambiar cada `--reveal-delay` existente en SP1-2 a SP1-5:
- SP1-2: de `--reveal-delay: 80ms` a `--reveal-delay: 960ms`
- SP1-3: de `--reveal-delay: 160ms` a `--reveal-delay: 1040ms`
- SP1-4: de `--reveal-delay: 240ms` a `--reveal-delay: 1120ms`
- SP1-5: de `--reveal-delay: 320ms` a `--reveal-delay: 1200ms`

**CUIDADO:** Usar un oldText suficientemente único para cada edit — incluir el comentario del card ID para evitar reemplazar delays en otras secciones. Por ejemplo para SP1-2:

```
            <!-- SP1-2: Primeros gobiernos patrios -->
            <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 80ms">
```

### Paso 6 — Verificar la integración

Ejecutar los checks de verificación del slice plan:

```bash
# Check 1: 11 cards nuevas entre SP1-1 y SP1-2
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const start = h.indexOf('<!-- SP1-1:');
const end = h.indexOf('<!-- SP1-2:');
const section = h.slice(start, end);
const cards = (section.match(/article class=\"event-card/g) || []).length;
console.log('Cards en sección (incluye SP1-1):', cards);
console.log('Nuevas cards:', cards - 1);
console.log(cards === 12 ? 'PASS' : 'FAIL');
"

# Check 2: certeza distribution en la sección
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const start = h.indexOf('<!-- SP1-1:');
const end = h.indexOf('<!-- SP1-2:');
const section = h.slice(start, end);
console.log('hecho:', (section.match(/data-certeza=\"hecho\"/g)||[]).length);
console.log('debatido:', (section.match(/data-certeza=\"debatido\"/g)||[]).length);
"
# Expected: hecho: 6 (SP1-1 + 5 nuevas), debatido: 5

# Check 3: card-nota-historiografica presente
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const start = h.indexOf('<!-- SP1-1:');
const end = h.indexOf('<!-- SP1-2:');
const section = h.slice(start, end);
console.log('card-nota-historiografica:', (section.match(/card-nota-historiografica/g)||[]).length);
"
# Expected: >= 1

# Check 4: SP1-1 título intacto
grep -q "El Cabildo Abierto y la Revolución de Mayo" index.html && echo "SP1-1 intact: PASS"

# Check 5: reveal-slide en las nuevas cards
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const start = h.indexOf('<!-- SP1-1:');
const end = h.indexOf('<!-- SP1-2:');
const section = h.slice(start, end);
console.log('reveal-slide cards:', (section.match(/reveal reveal-slide/g)||[]).length);
"
# Expected: 12 (SP1-1 + 11 nuevas)
```

### Paso 7 — Verificar que no hay CSS/JS nuevo

```bash
git diff --name-only HEAD 2>/dev/null | sort
# Expected: solo index.html
```

## Must-Haves

- [ ] 11 nuevas cards insertadas entre SP1-1 y SP1-2 en `#rev-1800-1820 .events-grid`
- [ ] SP1-1 intacta (título, contenido, imagen, y `--reveal-delay: 0ms` sin cambios)
- [ ] SP1-2 a SP1-5 tienen sus `--reveal-delay` actualizados a 960ms–1200ms
- [ ] 5 cards `hecho` nuevas: `class="event-card card-hecho"` + `data-certeza="hecho"` + icono `✓` + label `"Hecho documentado"`
- [ ] 5 cards `debatido` nuevas: `class="event-card card-opinion"` + `data-certeza="debatido"` + icono `⚖` + label `"Debatido historiográficamente"`
- [ ] Card Temática 4 tiene `<p class="card-nota-historiografica">` con las 3 posiciones historiográficas y sus atribuciones (Mitre, Halperin Donghi, Pigna/O'Donnell)
- [ ] Todas las cards tienen `class="reveal reveal-slide"` y `style="--reveal-delay: Nms"` con el delay correcto según la tabla del Paso 2
- [ ] Las URLs de imágenes provienen del manifiesto T01 (URLs verificadas o sin bloque card-image si no hay imagen disponible)
- [ ] Cada card tiene `<footer class="card-source"><cite>` con la cita correspondiente del draft
- [ ] No se modificó `styles.css` ni `app.js`

## Verification

```bash
node -e "
const h = require('fs').readFileSync('index.html', 'utf8');
const start = h.indexOf('<!-- SP1-1:');
const end = h.indexOf('<!-- SP1-2:');
const section = h.slice(start, end);
const totalCards = (section.match(/article class=\"event-card/g)||[]).length;
const newCards = totalCards - 1;
const hecho = (section.match(/data-certeza=\"hecho\"/g)||[]).length;
const debatido = (section.match(/data-certeza=\"debatido\"/g)||[]).length;
const nota = (section.match(/card-nota-historiografica/g)||[]).length;
console.log('New cards (expected 11):', newCards, newCards===11?'PASS':'FAIL');
console.log('Hecho (expected 6 incl SP1-1):', hecho, hecho===6?'PASS':'FAIL');
console.log('Debatido (expected 5):', debatido, debatido===5?'PASS':'FAIL');
console.log('card-nota-historiografica (expected >=1):', nota, nota>=1?'PASS':'FAIL');
"
grep -q "El Cabildo Abierto y la Revolución de Mayo" index.html && echo "SP1-1 intact: PASS" || echo "SP1-1 intact: FAIL"
```

## Inputs

- `.gsd/milestones/M010/slices/S02/tasks/T01-IMAGE-MANIFEST.md` — URLs verificadas de imágenes (producido por T01)
- `.gsd/milestones/M010/slices/S01/S01-CONTENT-DRAFT.md` — contenido completo de las 11 cards: títulos, fechas, extractos, citas, certeza
- `index.html` líneas ~1210–1330 — punto de inserción y estructura de SP1-1 a SP1-5 existentes
- KNOWLEDGE.md sección "Nota Historiográfica Pattern" — confirmación de que `card-nota-historiografica` no requiere CSS nuevo
- KNOWLEDGE.md sección "Card Template Reuse" — confirmación de stagger 80ms y `events-grid--certeza` ya presente

### Referencia rápida de contenido por card (del draft S01):

| Card | Certeza | Fecha display | Comentario de inserción |
|------|---------|---------------|------------------------|
| Evento 1 | hecho | 14 de mayo de 1810 | `<!-- M10-E1: 14 de mayo -->` |
| Evento 2 | hecho | 18 de mayo de 1810 | `<!-- M10-E2: 18 de mayo -->` |
| Evento 3 | debatido | 22 de mayo de 1810 | `<!-- M10-E3: 22 de mayo -->` |
| Evento 4 | hecho | 23 de mayo de 1810 | `<!-- M10-E4: 23 de mayo -->` |
| Evento 5 | hecho | 24 de mayo de 1810 | `<!-- M10-E5: 24 de mayo -->` |
| Evento 6 | hecho | 25 de mayo de 1810 | `<!-- M10-E6: 25 de mayo -->` |
| Evento 7 | debatido | 26–31 de mayo de 1810 | `<!-- M10-E7: 26-31 de mayo -->` |
| Temática 1 | debatido | Mayo de 1810 | `<!-- M10-T1: French y Berutti -->` |
| Temática 2 | debatido | Mayo de 1810 | `<!-- M10-T2: Manipulación Cabildo -->` |
| Temática 3 | hecho | Mayo de 1810 | `<!-- M10-T3: Presión miliciana -->` |
| Temática 4 | debatido | Debate historiográfico | `<!-- M10-T4: Debate popular vs élites -->` |

## Observability Impact

**Signals que cambian tras T02:**
- `grep -c 'article class="event-card"' index.html` pasa de 5 a 16 en la sección `#rev-1800-1820`.
- `document.querySelectorAll('#rev-1800-1820 .event-card').length` en DevTools console: esperado 16 (1 SP1-1 + 11 nuevas + 4 SP1-2–SP1-5).
- `document.querySelectorAll('.card-nota-historiografica').length` en DevTools console: esperado ≥1 (Temática 4).
- `document.querySelectorAll('[data-certeza="debatido"]').length` en DevTools console: aumenta en 5 (5 nuevas cards debatido).
- `document.querySelectorAll('[data-certeza="hecho"]').length` en DevTools console: aumenta en 5 (5 nuevas cards hecho; SP1-1 ya existía).

**Cómo inspeccionarlo:**
- Browser DevTools → Network → filtrar por `upload.wikimedia.org`: todas las imágenes de las 11 cards deben retornar HTTP 200.
- `grep -n "M10-E\|M10-T" index.html` lista los 11 comentarios de inserción — deben aparecer entre las líneas ~1260 y ~1500 aproximadamente.
- Si una card no recibe `reveal--visible`: confirmar que el `<article>` tiene `class="reveal reveal-slide"` con `article.event-card:not(.reveal)` query.

**Estado de fallo visible:**
- Si el edit falla (punto de inserción no encontrado): `grep -n "SP1-1:\|SP1-2:" index.html` confirma que los marcadores existen y muestra en qué líneas están.
- Si el conteo de cards es incorrecto: el script de verificación del Paso 6 imprime FAIL con el valor real obtenido vs. esperado.
- Si una imagen está rota: el browser renderiza el alt text + ícono broken-image; `initImageFallbacks` en app.js aplica `.card-image--fallback` visible como caja gris.

## Expected Output

- `index.html` — modificado con las 11 cards integradas en `#rev-1800-1820 .events-grid`, SP1-2 a SP1-5 con delays actualizados. El sitio despliega la cronología detallada de la Semana de Mayo antes de los eventos de 1810-1820 generales.

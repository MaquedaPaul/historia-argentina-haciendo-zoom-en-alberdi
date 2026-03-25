---
estimated_steps: 5
estimated_files: 3
---

# T01: Crear e insertar bloque HTML de #rev-san-martin con 6 cards en index.html

**Slice:** S02 — Formación en España, identidad criolla, logias y Granaderos
**Milestone:** M021

## Description

Crear el contenedor `<div id="rev-san-martin">` con sus 6 cards (Entradas 1–6 del content draft) e insertarlo en `index.html` en la posición correcta. La posición es entre `</div><!-- /#rev-1800-1820 -->` y `<!-- CONECTOR ALBERDI — SP1 → SP2 (Pasaje 1) -->`. No se añade JS ni CSS nuevos — el expand/collapse, reveal-on-scroll y las image fallbacks se auto-descubren.

El trabajo se divide en dos pasos físicos separados para evitar el problema de heredocs en Windows/Git Bash (documentado en KNOWLEDGE.md): (1) escribir el bloque HTML completo a un archivo temporal con la herramienta Write, (2) insertar ese bloque en `index.html` con la herramienta Edit usando el anchor textual exacto.

## Steps

1. Leer `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` Entradas 1–6 para extraer: año, excerpt, detalle expandible, fuentes/cite, URL Wikimedia, alt text, certeza, y texto completo de las notas historiográficas de Entradas 3 y 4.

2. Escribir el archivo temporal `tmp-san-martin-s02.html` con el bloque HTML completo: el comentario de encabezado, el `<div id="rev-san-martin">`, el `<h3>`, el `<div class="events-grid events-grid--certeza">`, las 6 cards, y los cierres de tags. Reglas estrictas:
   - Cards hecho (Entradas 1, 2, 5, 6): clase `card-hecho`, `data-certeza="hecho"`, icono `✓`, label `Hecho documentado`
   - Cards debatido (Entradas 3, 4): clase `card-opinion`, `data-certeza="debatido"` (sin acento), icono `&#x2696;`, label `Debatido historiográficamente`
   - `card-nota-historiografica` va DESPUÉS de `<div class="card-detail" hidden>` y ANTES de `<footer class="card-source">` — nunca dentro de `card-detail`
   - Stagger: `--reveal-delay: 0ms` (E1), `80ms` (E2), `160ms` (E3), `240ms` (E4), `320ms` (E5), `400ms` (E6)
   - Entrada 5 imagen: `https://upload.wikimedia.org/wikipedia/commons/3/31/Uniformes_Granaderos_a_caballo_1816.png` — URL directa, sin `/thumb/`
   - Entrada 6 imagen: `https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Batalla_de_San_Lorenzo_por_Villanueva.jpg/500px-Batalla_de_San_Lorenzo_por_Villanueva.jpg` — thumb 500px estándar
   - Entradas 1–4 imagen: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg`

3. Insertar el contenido del archivo temporal en `index.html` usando Edit. El `oldText` exacto es:
   ```
           </div><!-- /#rev-1800-1820 -->

           <!-- CONECTOR ALBERDI — SP1 → SP2 (Pasaje 1) -->
   ```
   El `newText` es ese mismo texto con el bloque `#rev-san-martin` insertado entre las dos líneas. Verificar que la indentación (8 espacios) es consistente con el contexto circundante.

4. Verificar con grep:
   - `grep -c 'id="rev-san-martin"' index.html` → debe ser 1
   - `grep -c 'data-certeza' index.html` → debe ser 99 (era 93 + 6 nuevas)
   - `grep -c 'data-certeza="debatido"' index.html` → debe ser 2
   - `grep -c 'card-nota-historiografica' index.html` → debe ser 14 (era 12 + 2 nuevas)
   - `grep 'Uniformes_Granaderos' index.html | grep -v '/thumb/'` → debe ser 1 match

5. Verificar sintaxis JS (el app.js no se modificó, pero confirmar que el Edit de index.html no corrompió nada):
   ```bash
   node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
   ```
   Limpiar archivo temporal: `rm tmp-san-martin-s02.html`

## Must-Haves

- [ ] `id="rev-san-martin"` aparece exactamente 1 vez en index.html
- [ ] 6 nuevas cards añadidas: `grep -c 'data-certeza' index.html` → 99
- [ ] 2 cards con `data-certeza="debatido"` (Entradas 3 y 4) — total sube de 5 a 7
- [ ] 2 `card-nota-historiografica` visibles (fuera de `card-detail`) para Entradas 3 y 4
- [ ] `events-grid--certeza` presente en el grid del sub-período
- [ ] Imagen Granaderos (Entrada 5) usa URL directa sin `/thumb/`
- [ ] Imagen San Lorenzo (Entrada 6) usa thumb 500px
- [ ] Entradas 1–4 usan fallback Gil de Castro
- [ ] Stagger delays aplicados: 0ms, 80ms, 160ms, 240ms, 320ms, 400ms
- [ ] `card-expand-toggle` + `card-detail hidden` presentes en las 6 cards
- [ ] JS syntax check retorna OK
- [ ] El bloque `<!-- CONECTOR ALBERDI — SP1 → SP2 (Pasaje 1) -->` sigue existiendo después de `#rev-san-martin`

## Verification

```bash
grep -c 'id="rev-san-martin"' index.html          # → 1
grep -c 'data-certeza' index.html                  # → 99
grep -c 'data-certeza="debatido"' index.html       # → 7 (era 5, + 2 nuevas)
grep -c 'card-nota-historiografica' index.html     # → 14
grep 'Uniformes_Granaderos' index.html | grep -v '/thumb/'  # → 1 match
grep -c 'events-grid--certeza' index.html          # → ≥14 (ya eran 13, + 1 nueva)
grep -A2 'id="rev-san-martin"' index.html | head -5  # debe mostrar sub-period + h3
grep 'CONECTOR ALBERDI.*SP1.*SP2' index.html       # → debe existir (conector intacto)
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
```

## Inputs

- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — fuente canónica del contenido: título, año, excerpt, detalle expandible, fuentes, URL Wikimedia, certeza, y notas historiográficas para las Entradas 1–6. Leer la sección "Tabla de imágenes verificadas" y las Entradas 1–6 antes de escribir HTML.
- `index.html` líneas 1325–1345 — contexto del anchor de inserción. Buscar el string `</div><!-- /#rev-1800-1820 -->` para localizar la posición exacta sin depender del número de línea.
- Patrones HTML existentes en `index.html`:
  - Card hecho: líneas ~1213–1246 (SP1-1)
  - Card debatido con nota historiográfica: líneas ~1754–1770 (S14-3) y ~1791–1808
  - Sub-período container: `<div id="rev-1820-1835" class="sub-period reveal reveal-fade">` en línea ~1342

### Patrones críticos (copiar exactamente)

**Card hecho:**
```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image"><img src="..." alt="..." loading="lazy"></div>
  <span class="event-card__year">...</span>
  <h3 class="event-card__title">...</h3>
  <p class="event-card__excerpt">...</p>
  <button class="card-expand-toggle" aria-expanded="false">
    <span class="card-expand-toggle__text">Ver más</span>
    <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
  </button>
  <div class="card-detail" hidden>
    <p>...</p>
  </div>
  <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>...</cite></footer>
</article>
```

**Card debatido** (Entradas 3 y 4 — `card-nota-historiografica` DESPUÉS de `card-detail`, ANTES del footer):
```html
<article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x2696;</span>
    <span class="card-certeza-label">Debatido historiográficamente</span>
  </div>
  <div class="card-image"><img src="..." alt="..." loading="lazy"></div>
  <span class="event-card__year">...</span>
  <h3 class="event-card__title">...</h3>
  <p class="event-card__excerpt">...</p>
  <button class="card-expand-toggle" aria-expanded="false">
    <span class="card-expand-toggle__text">Ver más</span>
    <span class="card-expand-toggle__icon" aria-hidden="true">▼</span>
  </button>
  <div class="card-detail" hidden>
    <p>...</p>
  </div>
  <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p>
  <footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>...</cite></footer>
</article>
```

**Sub-período container:**
```html
<!-- ══════════════════════════════════════════════════
     SUB-PERÍODO SAN MARTÍN: Formación, Campañas y Retiro (1778–1850)
     15 eventos — 9 hecho, 3 debatido, 1 opinión, 1 hecho+nota
     S02: Entradas 1–6 | S03: Entradas 7–10 | S04: Entradas 11–15
     ══════════════════════════════════════════════════ -->
<div id="rev-san-martin" class="sub-period reveal reveal-fade">
  <h3 class="sub-period__title">San Martín: Formación, Campañas y Retiro del Poder (1778–1850)</h3>
  <div class="events-grid events-grid--certeza" aria-label="Arco completo de José de San Martín (1778–1850)">
    <!-- 6 cards S02 aquí -->
  </div><!-- /.events-grid rev-san-martin -->
</div><!-- /#rev-san-martin -->
```

### Advertencias críticas

- `data-certeza="debatido"` — SIN acento. No usar "débatido" ni "debátido".
- La imagen de Granaderos (Entrada 5) es 495px — URL directa: `https://upload.wikimedia.org/wikipedia/commons/3/31/Uniformes_Granaderos_a_caballo_1816.png`. Si se usa una ruta con `/thumb/` la imagen 404.
- `card-nota-historiografica` NO puede ir dentro de `<div class="card-detail" hidden>` — debe ser visible siempre.
- El anchor de inserción es el string textual `</div><!-- /#rev-1800-1820 -->` seguido por línea en blanco y `<!-- CONECTOR ALBERDI — SP1 → SP2 (Pasaje 1) -->`. No usar número de línea.
- Evitar heredocs (KNOWLEDGE.md): escribir el bloque a un archivo temporal con Write, luego usar Edit para inyectar.

## Expected Output

- `index.html` modificado con `<div id="rev-san-martin">` insertado en la posición correcta, conteniendo 6 cards con certeza, imágenes, expand/collapse y notas historiográficas visibles para Entradas 3 y 4.
- El sub-período está listo para que S03 haga append de Entradas 7–10 dentro del mismo `<div class="events-grid events-grid--certeza">`.
- `tmp-san-martin-s02.html` eliminado (archivo de trabajo temporal).

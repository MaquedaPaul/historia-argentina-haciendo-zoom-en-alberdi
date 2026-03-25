# S02: Integración HTML — Research

**Date:** 2026-03-24
**Slice:** S02 — Integración HTML
**Milestone:** M016 — Alberdi y Mitre: Dos Proyectos de País

## Summary

S02 es trabajo de integración pura: tomar las 4 cards HTML-ready de `S01-CONTENT-DRAFT.md` e insertarlas en `index.html` como un nuevo sub-period `#rev-alberdi-mitre`. No hay investigación nueva, no hay CSS nuevo, no hay JS nuevo. El riesgo es bajo: el patrón está establecido, el punto de inserción está identificado, y la única complejidad es la discrepancia de estructura HTML entre el draft de S01 y el patrón real del codebase.

**Discrepancia clave:** El draft de S01 usa `<div class="card-header">`, `<div class="card-body">`, `<span class="card-year">`, `<h3 class="card-title">` — clases que NO existen en el HTML existente. El patrón real del codebase usa `<span class="event-card__year">` y `<h3 class="event-card__title">` directamente dentro del `<article>`, sin wrapper `card-header`/`card-body`. El ejecutor debe adaptar las 4 cards al patrón existente antes de integrar.

La integración es una sola tarea: insertar el bloque completo en el punto de inserción correcto, adaptando la estructura HTML al patrón existente, verificar con browser que no hay errores JS, y opcionalmente agregar un link al sub-nav.

## Recommendation

Una sola tarea de integración: leer el draft, adaptar estructura, insertar en index.html, verificar. No hay sub-tareas independientes — el trabajo es demasiado pequeño y cohesivo para fragmentar. El sub-nav link es opcional pero recomendado (mejora navegabilidad, zero riesgo).

## Implementation Landscape

### Key Files

- `index.html` línea 2425: `</div><!-- /#rev-1852-1860 -->` — punto de inserción. El nuevo bloque va **entre esta línea y la siguiente** (`<!-- REVOLUCION TIMELINE: ...`).
- `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — fuente de las 4 cards a integrar.
- `app.js` — NO requiere cambios. El sub-nav observer usa `document.querySelectorAll('#periodo-revolucion .sub-period')` (línea 631): auto-descubre el nuevo sub-period sin modificación.
- `styles.css` — NO requiere cambios. Todas las clases usadas en el draft ya existen.

### Estructura HTML del bloque a insertar

```html
<!-- rev-alberdi-mitre: M016/S02 -->
<div class="sub-period reveal reveal-fade" id="rev-alberdi-mitre">
  <h3 class="sub-period__title">Alberdi y Mitre: Dos Proyectos de País (1848–1862)</h3>
  <div class="events-grid events-grid--certeza" aria-label="Alberdi y Mitre: dos proyectos de país (1848–1862)">
    <!-- Card A: MiAl-1 (hecho, 1848, 0ms) -->
    <!-- Card B: MiAl-2 (hecho, 1852, 80ms) -->
    <!-- Card C: MiAl-3 (hecho + card-nota-historiografica, 1861-1862, 160ms) -->
    <!-- Card D: MiAl-4 (opinion, 1864, 240ms) -->
  </div>
</div><!-- /#rev-alberdi-mitre -->
```

**Clase reveal en el wrapper:** `class="sub-period reveal reveal-fade"` — igual a todos los otros sub-periods (ver líneas 346, 737, 1206, 1342, 1446, 2113, 2283).

### Patrón de card existente (hecho) — estructura real

```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x2713;</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image">
    <img src="URL" alt="ALT" loading="lazy">
  </div>
  <span class="event-card__year">AÑO</span>
  <h3 class="event-card__title">TÍTULO</h3>
  <p class="event-card__excerpt">TEXTO</p>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>FUENTE</cite>
  </footer>
</article>
```

**Lo que el draft usa vs. lo que debe ir en HTML:**

| Draft (incorrecto) | HTML real (correcto) |
|--------------------|----------------------|
| `<div class="card-header">` | *(no existe — eliminar el wrapper)* |
| `<div class="card-body">` | *(no existe — eliminar el wrapper)* |
| `<span class="card-year">` | `<span class="event-card__year">` |
| `<h3 class="card-title">` | `<h3 class="event-card__title">` |
| `<p class="event-card__excerpt">` | `<p class="event-card__excerpt">` ✓ |
| `card-source` sin `card-source__icon` | `card-source` + `<span class="card-source__icon">📄</span>` |

### Card D: patrón opinion — estructura real (ver SP4-5 en línea ~2405)

```html
<article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" style="--reveal-delay: 240ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">&#x1F4AC;</span>
    <span class="card-certeza-label">Opinión historiográfica</span>
  </div>
  <div class="card-image">...</div>
  <span class="event-card__year">1864</span>
  <h3 class="event-card__title">TÍTULO</h3>
  <p class="event-card__excerpt">TEXTO</p>
  <blockquote class="card-opinion__quote">
    <p>PARÁFRASIS</p>
    <footer class="card-opinion__attribution">
      <strong class="card-opinion__author">AUTOR</strong>
      <span class="card-opinion__context">— CONTEXTO</span>
    </footer>
  </blockquote>
  <p class="card-opinion__context">CONTEXTO ADICIONAL</p>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>FUENTE</cite>
  </footer>
</article>
```

**Nota:** `data-certeza="opini&#xF3;n"` (con entidad HTML para la ó) — conforme a D053.

### Card C: card-nota-historiografica — regla

Según KNOWLEDGE.md y D053 (patrón desde M004): la `<p class="card-nota-historiografica">` va **dentro de `<div class="card-body">`** → pero como no hay `card-body`, va directamente dentro del `<article>`, **después del `<p class="event-card__excerpt">`** y **antes del `<footer>`**. Debe ser visible (no colapsable). Estructura:

```html
<p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> TEXTO</p>
```

### Imágenes: verificación y fallback

Las URLs de Wikimedia devolvieron HTTP 429 (rate-limit al hacer requests desde Node.js) — esto es comportamiento esperado (ver KNOWLEDGE.md: *Wikimedia rate-limits CLI requests*). **No indica imágenes rotas.** El ejecutor debe confiar en las URLs del draft salvo la de Card B, que usa el mismo retrato de Mitre que Card A como fallback temporal.

**URLs del draft:**
- Card A: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bartolome_mitre.jpg/320px-Bartolome_mitre.jpg` — retrato Mitre joven ✓ (usada también en Card B como fallback)
- Card B: misma URL que Card A (fallback declarado en el draft) — aceptable para integración inicial
- Card C: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batalla_de_Pav%C3%B3n.jpg/320px-Batalla_de_Pav%C3%B3n.jpg` — verificar con API Wikimedia antes de integrar; si falla, usar fallback de retrato Alberdi
- Card D: `https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Juan_Bautista_Alberdi_%281888%29.jpg/320px-Juan_Bautista_Alberdi_%281888%29.jpg` — retrato tardío Alberdi; verificar; si falla, usar el placeholder pattern o el retrato conocido de Alberdi (diferente al de SP4-1)

**Verificación de imagen con API Wikimedia (Node.js):**
```bash
node -e "
const https = require('https');
const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=320&format=json';
https.get(url.replace('FILENAME','Batalla_de_Pav%C3%B3n.jpg'), {headers:{'User-Agent':'HistoriaArgentina/1.0'}}, res => {
  let d=''; res.on('data',c=>d+=c); res.on('end',()=>console.log(JSON.parse(d).query.pages));
});
"
```

**Fallback placeholder (si imagen no resuelve):**
```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='240'%3E%3Crect fill='%23c8b99a'/%3E%3C/svg%3E" alt="[descripción]" loading="lazy">
```

### Sub-nav: link opcional

El sub-nav actual (línea 326–333) tiene 7 links. Agregar un octavo:
```html
<a href="#rev-alberdi-mitre" class="sub-nav__link">1848–1862<span class="sub-nav__link-label">Alberdi y Mitre</span></a>
```
Insertarlo después del link de `#rev-1852-1860`. El sub-nav observer auto-detectará el nuevo sub-period (usa `querySelectorAll('#periodo-revolucion .sub-period')`). No hay `aria-label` ni estructura que requiera actualización adicional. **Recomendado.**

### Build Order

1. Verificar URLs de imagen de Cards C y D con la API Wikimedia
2. Escribir el bloque HTML completo (4 cards adaptadas al patrón existente) en un archivo temporal
3. Insertar en `index.html` en el punto exacto: entre `</div><!-- /#rev-1852-1860 -->` (línea 2425) y `<!-- REVOLUCION TIMELINE:` (línea 2427)
4. Opcionalmente agregar link al sub-nav (línea 333, después del último `<a href="#rev-1852-1860">`)
5. Verificar: `grep -c "rev-alberdi-mitre" index.html` → ≥1; JS syntax check; browser check

### Verification Approach

**Post-integración (mecánica):**
```bash
# 1. ID presente en HTML
grep -c "rev-alberdi-mitre" index.html
# → debe retornar ≥1

# 2. Certeza distribution correcta en el nuevo sub-period
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const block = html.slice(html.indexOf('id=\"rev-alberdi-mitre\"'), html.indexOf('/#rev-alberdi-mitre'));
const hecho = (block.match(/data-certeza=\"hecho\"/g)||[]).length;
const opinion = (block.match(/data-certeza=\"opini&#xF3;n\"|data-certeza=\"opini\\xF3n\"/g)||[]).length;
console.log('hecho:', hecho, 'opinion:', opinion);
"
# → hecho: 3, opinion: 1

# 3. Cite count dentro del bloque
node -e "
const html = require('fs').readFileSync('index.html','utf8');
const block = html.slice(html.indexOf('id=\"rev-alberdi-mitre\"'), html.indexOf('/#rev-alberdi-mitre'));
console.log('<cite> count:', (block.match(/<cite>/g)||[]).length);
"
# → debe ser ≥4 (8 en el draft — al menos 4 al integrar)

# 4. card-nota-historiografica presente
grep -n "card-nota-historiografica" index.html | grep -A2 -B2 "rev-alberdi"
# (o verificar que aparece en el rango de líneas del nuevo sub-period)

# 5. JS syntax OK
node -e "
try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); }
catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }
"
```

**Browser (verificación final):**
- Navegar a la sección y confirmar que las 4 cards se renderizan sin errores JS en consola
- Verificar que el sub-nav link (si se agregó) funciona con smooth scroll
- Confirmar que el sub-nav observer activa el link correcto al scrollear sobre `#rev-alberdi-mitre`

## Constraints

- **Zero new CSS:** Todas las clases del draft existen en `styles.css`. No introducir clases nuevas.
- **Zero new JS:** El sub-nav observer y reveal system auto-descubren el nuevo sub-period. `app.js` no se toca.
- **No duplicar BIOG-13 ni SP4-3:** Las redacciones del draft ya evitan estas frases. Verificar con grep antes de finalizar:
  - `grep "dejándolo en París sin sueldo y sin regreso pagado" index.html` → debe retornar vacío
  - `grep "revolución encabezada por Mitre separó Buenos Aires" index.html` → debe retornar vacío
- **data-certeza="opini&#xF3;n"** (con entidad) para Card D — conforme a D053. Ambas variantes existen en el codebase; la nueva card usa la variante con entidad.
- **ID `rev-alberdi-mitre`** debe ser único — confirmado libre al 2026-03-24.
- **card-nota-historiografica visible** (no colapsable) — per KNOWLEDGE.md Nota Historiográfica Pattern.
- **Stagger delays:** 0ms, 80ms, 160ms, 240ms para Cards A–D respectivamente.

## Common Pitfalls

- **Usar clases del draft sin adaptar** — El draft usa `card-header`, `card-body`, `card-year`, `card-title` que no existen en el codebase. Usar siempre el patrón real: `event-card__year`, `event-card__title`.
- **Omitir `events-grid--certeza`** en el grid container — esta clase es requerida para el sizing certeza-aware (patrón desde M002, ver KNOWLEDGE.md).
- **Omitir `reveal reveal-fade`** en el wrapper `div.sub-period` — todos los otros sub-periods tienen esta clase; sin ella el sub-period es invisible hasta scroll.
- **Insertar después del revolucion-timeline en lugar de antes** — el bloque debe ir ANTES del `<!-- REVOLUCION TIMELINE: -->`, no después. La timeline es el cierre visual del período.
- **Heredoc para inserción multi-línea** — KNOWLEDGE.md advierte contra heredocs en Windows/Git Bash. Usar Write tool + `node -e` para splice, o editar directamente con Edit tool.

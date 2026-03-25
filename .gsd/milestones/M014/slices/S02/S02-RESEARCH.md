# S02: Integración HTML y verificación — Research

**Date:** 2026-03-24
**Slice:** S02 of M014 — Las Tertulias de Mariquita Sánchez

## Summary

S02 es integración mecánica: el contenido está listo en `S01-CONTENT-DRAFT.md` (6 cards TER-1 a TER-6), los patrones HTML existen en el codebase, y el punto de inserción está identificado con precisión (línea 1439, entre `</div><!-- /#rev-1820-1835 -->` y el comentario de apertura del sub-período Rosas). No hay trabajo creativo ni de investigación — solo copy-paste estructurado siguiendo templates existentes.

El riesgo real es bajo: el sistema reveal es dinámico (IntersectionObserver sobre `querySelectorAll('.reveal')`), el sub-nav observer es dinámico (sobre `querySelectorAll('#periodo-revolucion .sub-period')`), y `styles.css` no requiere cambios. La nueva sección `#rev-tertulias-mariquita` con clase `sub-period` insertada dentro de `#periodo-revolucion` será recogida automáticamente por ambos observers sin ningún cambio en JS.

La única decisión pendiente es evaluar visualmente la imagen TER-3 (321×410 px, sin thumb 500px disponible) antes de confirmar su inclusión. El draft provee alternativa explícita: omitirla si la calidad es insuficiente.

## Recommendation

Construir la sección en un solo task: insertar el bloque HTML completo en `index.html` (línea 1439) + agregar el sub-nav link (línea 330–331) + verificar con greps + abrir en browser para confirmar render y ausencia de errores JS.

No dividir en múltiples tasks — el bloque es autosuficiente y la verificación es rápida. Un único task T01 que escribe el HTML, verifica la estructura, y confirma en browser es el approach correcto.

## Implementation Landscape

### Key Files

- `index.html` — único archivo a modificar. 2823 líneas actuales.
  - **Línea 1439:** `</div><!-- /#rev-1820-1835 -->` — insertar nueva sección DESPUÉS de esta línea
  - **Líneas 326–333:** `<nav class="sub-nav">` — agregar un nuevo `<a>` para `#rev-tertulias-mariquita`
- `app.js` — no modificar. El observer en línea 631 (`querySelectorAll('#periodo-revolucion .sub-period')`) captura automáticamente cualquier `.sub-period` nuevo dentro de `#periodo-revolucion`. El reveal observer (línea 237) es análogo.
- `styles.css` — no modificar. Todos los patrones visuales requeridos ya existen.
- `.gsd/milestones/M014/slices/S01/S01-CONTENT-DRAFT.md` — fuente de todo el contenido. Leer antes de escribir HTML.

### Exact Insertion Point

```
index.html línea 1439:
        </div><!-- /#rev-1820-1835 -->

        <!-- ══════════════ [NUEVA SECCIÓN M014] ══════════════
             Las Tertulias de Mariquita Sánchez (1805–1868)
             id="rev-tertulias-mariquita"
             Inserción: M014/S02
             ══════════════════════════════════════════════════ -->
        <div id="rev-tertulias-mariquita" class="sub-period reveal reveal-fade">
          ...6 cards...
        </div><!-- /#rev-tertulias-mariquita -->

        <!-- ══════════════════════════════════════════════════
             SUB-PERÍODO ROSAS: ... (línea 1442 actual)
```

### Sub-nav Link

Agregar en línea 330 de `<nav class="sub-nav">` (después del link a `#rev-1820-1835`):

```html
<a href="#rev-tertulias-mariquita" class="sub-nav__link">1805–1868<span class="sub-nav__link-label">Tertulias de Mariquita</span></a>
```

### Card Templates a Seguir

**card-hecho** (TER-1, TER-3, TER-4):
```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image">
    <img src="..." alt="..." loading="lazy">
  </div>
  <span class="event-card__year">AÑOS</span>
  <h3 class="event-card__title">TÍTULO</h3>
  <p class="event-card__excerpt">TEXTO</p>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>FUENTES</cite>
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
  <div class="card-image">...</div>
  <span class="event-card__year">FECHA</span>
  <h3 class="event-card__title">TÍTULO</h3>
  <p class="event-card__excerpt card-rumor__text">TEXTO</p>
  <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p>
  <footer class="card-rumor__origin">
    <span class="card-rumor__origin-icon" aria-hidden="true">🔍</span>
    <p class="card-rumor__origin-text"><strong>Origen del rumor:</strong> ...</p>
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
  <blockquote class="card-opinion__quote">
    <p>TEXTO</p>
    <footer class="card-opinion__attribution">
      <strong class="card-opinion__author">AUTOR</strong>
      <span class="card-opinion__context">— CONTEXTO</span>
    </footer>
  </blockquote>
</article>
```

### Stagger Delays (del draft S01)

| Card | ID    | `--reveal-delay` | certeza   |
|------|-------|-----------------|-----------|
| 1    | TER-1 | `0ms`           | `hecho`   |
| 2    | TER-2 | `80ms`          | `rumor`   |
| 3    | TER-3 | `160ms`         | `hecho`   |
| 4    | TER-4 | `240ms`         | `hecho`   |
| 5    | TER-5 | `320ms`         | `opinión` |
| 6    | TER-6 | `400ms`         | `opinión` |

### Image Notes

- **TER-1:** `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Mariquita_S%C3%A1nchez_1845.jpg/500px-Mariquita_S%C3%A1nchez_1845.jpg` — retrato Rugendas 1845. Thumb 500px disponible. PD.
- **TER-2:** `https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Himno_Nacional_Argentino.jpg/500px-Himno_Nacional_Argentino.jpg` — Subercaseaux 1909. Thumb 500px disponible. PD.
- **TER-3:** `https://upload.wikimedia.org/wikipedia/commons/0/00/Mar%C3%ADa_S%C3%A1nchez_de_Mendeville.jpg` — daguerrotipo 321×410 px. **⚠ SIN THUMB 500px — usar URL directa con `width="100%"`**. Si la calidad es insuficiente visualmente, omitir (TER-1 ya da imagen de apertura a la sección).
- **TER-4, TER-5, TER-6:** Sin imagen nueva (per draft).

### Reveal Count Impact

- Actual: 118 elementos `reveal reveal-` en index.html
- Nuevos: 1 `sub-period.reveal.reveal-fade` + 6 `article.reveal.reveal-slide` = 7
- Total proyectado: 125
- No hay cap hardcodeado en app.js — el observer usa `querySelectorAll` dinámico.

### Build Order

1. Leer `S01-CONTENT-DRAFT.md` completo (está en `.gsd/milestones/M014/slices/S01/`)
2. Escribir bloque HTML de `#rev-tertulias-mariquita` en `index.html` en línea 1439
3. Agregar sub-nav link en línea 330
4. Verificar estructura con greps
5. Abrir en browser y confirmar render visual + ausencia de errores JS

### Verification Approach

**Greps de estructura (post-inserción):**
```bash
# 1. Nueva sección existe
grep -c "rev-tertulias-mariquita" index.html
# → 2 (apertura div + sub-nav link)

# 2. Exactamente 6 cards nuevas con certeza en la sección
# (contar data-certeza total en nueva sección — usar grep en el bloque insertado)
grep -A200 "rev-tertulias-mariquita" index.html | grep -c 'data-certeza'
# → 6

# 3. Nota historiográfica en TER-2 presente
grep -c "card-nota-historiografica" index.html
# → debería incrementar por 1 respecto al baseline (actualmente: 7 en index.html)

# 4. card-nota-certeza en TER-4 presente
grep -c "card-nota-certeza" index.html
# → incremento de 1 respecto al baseline

# 5. Sub-nav link agregado
grep -c "rev-tertulias-mariquita" index.html
# → ≥2

# 6. Sin errores JS en consola (browser)
# → Consola limpia al abrir index.html
```

**Browser verification:**
- Abrir `index.html` directamente en browser
- Navegar a `#rev-tertulias-mariquita` via sub-nav link
- Confirmar: 6 cards visibles, stagger animations al scrollear, TER-2 muestra nota historiográfica visible, TER-3 muestra imagen o no está presente (ambos OK), lightbox funciona en imágenes de TER-1 y TER-2
- Revisar consola: 0 errores JS

## Constraints

- **No modificar `app.js`** — el sistema observe es dinámico, no necesita cambios.
- **No modificar `styles.css`** — todos los patrones visuales ya existen.
- **No construir thumb path manual para TER-3** — la imagen es 321×410 px, no existe miniatura de 500px. Usar URL directa o no incluir imagen en TER-3.
- **TER-2 nota historiográfica debe ser visible** (no colapsada). Usar `<p class="card-nota-historiografica">`, no expand/collapse. El patrón `card-nota-historiografica` es `<p>` inline visible — ver líneas 904, 1761, 1794 de index.html para ejemplos reales.
- **La sección `#rev-tertulias-mariquita` debe estar dentro de `#periodo-revolucion`** para que el sub-nav observer la capture automáticamente.

## Common Pitfalls

- **thumb path manual para imagen pequeña** — TER-3 mide 321 px, la URL `/thumb/…/500px-…` no existe. Si se construye manualmente, imagen rota.
- **Nota historiográfica colapsada** — el sistema expand/collapse es para detalle suplementario, no para flags epistémicos. La nota de TER-2 va como `<p>` visible.
- **Soft hyphens en el draft** — el draft S01 usa U+00AD (soft hyphen) en los nombres de clase dentro de la sección "HTML Patterns Reference" para evitar falsos positivos en grep. Al copiar el HTML del draft a index.html, copiar los textos de los excerpts, NO los ejemplos de código de la sección de referencia (que tienen soft hyphens). Los nombres de clase en el HTML final deben tener guiones regulares.
- **data-certeza con acento** — TER-5 y TER-6 son `data-certeza="opinión"` (con acento) o `data-certeza="opinion"` (sin acento). Ambas formas funcionan en el codebase (ver KNOWLEDGE.md). Usar consistente con el resto de la sección más cercana — el período post-M003 usa `"opinion"` sin acento.

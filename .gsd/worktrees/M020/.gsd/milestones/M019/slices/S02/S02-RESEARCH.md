# S02: Integración HTML — La Ruptura Mitre-Urquiza (1852)

**Date:** 2026-03-25
**Scope:** Light research — established patterns, autocontained draft from S01

---

## Summary

S02 es integración mecánica. `S01-CONTENT-DRAFT.md` entrega 4 cards `card-hecho` completamente especificadas (excerpts, citas, fuentes, `--reveal-delay`, punto de inserción exacto). El código receptor (`#rev-1852-1860`) ya existe en `index.html` con el `events-grid events-grid--certeza` correcto. No se requieren cambios en `styles.css` ni `app.js`.

El único riesgo real es el ajuste de stagger para las 5 cards SP4 existentes: sus `--reveal-delay` deben incrementarse en 320ms cada uno (0→320, 80→400, 160→480, 240→560, 320→640) para que el stagger del grid completo sea coherente con la inserción de 4 cards nuevas antes de ellos.

Cards 2 y 3 del draft llevan citas textuales primarias verificadas. Ambas deben ir en `<blockquote class="card-opinion__quote">` dentro del `card-hecho` — el patrón ya existe en la línea 185 (Card 3 de la sección colonial) y línea 401 (SP1 de la sección revolución). La corrección `data-certeza=[hecho]` → `data-certeza="hecho"` es obligatoria: el draft usa la forma sin comillas solo para no interferir con el grep de verificación de S01.

## Recommendation

Integrar las 4 cards en una sola tarea:
1. Leer el draft completo para extraer los 4 bloques HTML.
2. Insertar antes del comentario `<!-- SP4-1 -->` (línea 2287 de index.html).
3. Actualizar los 5 `--reveal-delay` de SP4-1..SP4-5.
4. Verificar: `grep -c 'data-certeza="hecho"'` en el bloque M019 del HTML, más revisión en browser.

No hay tareas paralelas necesarias. Todo puede hacerse en un solo task T01.

## Implementation Landscape

### Key Files

- `index.html` línea 2283 — `<div id="rev-1852-1860">` con el grid `events-grid--certeza` receptor. Las 4 cards nuevas van inmediatamente antes del comentario `<!-- SP4-1: Bases de Alberdi -->` en línea 2287.
- `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` — único insumo. Contiene excerpts, citas, fuentes, notas de imagen, `--reveal-delay` para las 4 cards y tabla de ajuste de stagger para SP4-1..5.
- `styles.css` — **sin cambios**. `card-hecho`, `card-certeza-indicator`, reveal, image fallbacks ya implementados.
- `app.js` — **sin cambios**. IntersectionObserver y `initImageFallbacks()` operan automáticamente sobre los nuevos `.reveal` elementos.

### Exact Insertion Point

```
index.html:2287
  <div id="rev-1852-1860"> → <div class="events-grid events-grid--certeza">
    <!-- INSERTAR 4 CARDS M019 AQUÍ -->
    <!-- SP4-1: Bases de Alberdi — OPINIÓN -->   ← primero existente
```

### Stagger Adjustment Required

| Card | Delay actual | Delay nuevo |
|------|-------------|-------------|
| SP4-1 (Alberdi/Bases) | `0ms` | `320ms` |
| SP4-2 (Congreso Santa Fe) | `80ms` | `400ms` |
| SP4-3 (Secesión Buenos Aires) | `160ms` | `480ms` |
| SP4-4 (Cepeda 1859) | `240ms` | `560ms` |
| SP4-5 (Reunificación 1860) | `320ms` | `640ms` |

### Card HTML Pattern

Cards 1 y 4 (sin cita textual): estructura estándar `card-hecho` con `<p class="event-card__excerpt">`.

Cards 2 y 3 (con cita textual): `card-hecho` más `<blockquote class="card-opinion__quote">` con `<footer class="card-opinion__attribution">`. Patrón exacto tomado de línea 185 o 401 de index.html — el bloque de Card 3 de la sección colonial o SP1 de la sección revolución. La presencia de un `<blockquote>` dentro de un `card-hecho` es un patrón establecido y no requiere CSS adicional.

### Verification Approach

```bash
# 1. Contar cards M019 insertadas
grep -c "M019-[1-4]" index.html   # debe ser 4 (uno por comentario de card)

# 2. Confirmar data-certeza correcto (sin corchetes)
grep -n 'data-certeza=\[hecho\]' index.html   # debe ser 0 (ningún corchete)
grep -c 'data-certeza="hecho"' index.html     # debe incluir las 4 nuevas

# 3. Confirmar stagger de SP4
grep -A2 "SP4-1" index.html | grep "reveal-delay"   # debe mostrar 320ms
grep -A2 "SP4-5" index.html | grep "reveal-delay"   # debe mostrar 640ms

# 4. Sin errores JS
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"

# 5. Verificación en browser — abrir index.html y scrollear a #rev-1852-1860
```

## Common Pitfalls

- **`data-certeza=[hecho]` sin comillas** — el draft usa esta forma deliberadamente para no interferir con greps de S01. El HTML final DEBE usar `data-certeza="hecho"` (con comillas). Corrección obligatoria al escribir el HTML.
- **Olvidar actualizar SP4-1..5** — si los 5 delays existentes no se incrementan en 320ms, el stagger del grid tiene un salto visual (4 cards con 0–240ms, luego SP4-1 vuelve a 0ms). No es un error funcional pero rompe el efecto de cascada del grid.
- **No duplicar `events-grid--certeza`** — el div contenedor ya tiene la clase. No envolver las nuevas cards en un segundo grid.
- **Imágenes reutilizadas** — Card 1 puede reutilizar el retrato Manzoni de Mitre (ya en SP4-5); Card 3 puede reutilizar el retrato de Urquiza (ya en SP4-2 y SP4-4). Esto es repetición visual, no un error funcional. El draft sugiere buscar alternativas en Wikimedia Commons (grabado de Caseros, Casa del Acuerdo) pero marca ambas como opcionales.

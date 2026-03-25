---
estimated_steps: 5
estimated_files: 1
---

# T01: Insertar 4 cards M019 en index.html y ajustar stagger SP4

**Slice:** S02 — Integración HTML
**Milestone:** M019

## Description

Integración mecánica del draft verificado de S01 en `index.html`. Las 4 cards ya están completamente redactadas en `S01-CONTENT-DRAFT.md` (excerpts, citas, fuentes, imágenes, reveal-delays). Solo hay que escribirlas en HTML en el punto de inserción exacto y actualizar los 5 delays de SP4.

El receptor ya existe: `<div id="rev-1852-1860">` → `<div class="events-grid events-grid--certeza">`. No se necesitan cambios en `styles.css` ni `app.js`.

**Puntos críticos:**
- `data-certeza=[hecho]` en los ejemplos del draft → corregir a `data-certeza="hecho"` en el HTML real (obligatorio)
- Cards 2 y 3 llevan `<blockquote class="card-opinion__quote">` — seguir el patrón de SP4-1 (ya tiene blockquote dentro de card-hecho)
- SP4-1..5 delays: +320ms a cada uno (0→320, 80→400, 160→480, 240→560, 320→640)

## Steps

1. **Leer `S01-CONTENT-DRAFT.md`** (`.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md`) para extraer los excerpts completos, las citas textuales de Cards 2 y 3, las fuentes, y las URLs de imagen de las 4 cards. El draft contiene todo — no se necesita investigación adicional.

2. **Leer el bloque SP4 de `index.html`** (líneas ~2287–2430) para ver el patrón exacto de `card-hecho` con blockquote (SP4-1 tiene blockquote, SP4-2 es card-hecho simple). Copiar la estructura base antes de escribir las nuevas cards.

3. **Escribir los 4 bloques HTML** de las cards M019 en un archivo temporal (usar la herramienta `write` para evitar problemas de heredoc). Las 4 cards van juntas, comentadas como `<!-- M019-1 -->`, `<!-- M019-2 -->`, `<!-- M019-3 -->`, `<!-- M019-4 -->`. Constraints:
   - `data-certeza="hecho"` con comillas — nunca corchetes
   - Cards 2 y 3: `<blockquote class="card-opinion__quote">` con el texto de la cita + `<footer class="card-opinion__attribution">` con autor, fecha, fuente
   - Card 1: imagen de Mitre (Manzoni 1861, URL ya en index.html en SP4-5) o grabado de Caseros
   - Card 2: imagen de Urquiza (URL ya en index.html en SP4-2)
   - Card 3: imagen de Urquiza (puede reutilizar la misma de Card 2 o buscar alternativa)
   - Card 4: mapa Argentina/Buenos Aires (URL ya en index.html en SP4-3) o retrato de Alsina
   - `--reveal-delay`: 0ms, 80ms, 160ms, 240ms para Cards 1–4 respectivamente

4. **Insertar las 4 cards en `index.html`** inmediatamente antes del comentario `<!-- SP4-1: Bases de Alberdi — OPINIÓN -->` (línea ~2287). Usar la herramienta `edit` con `oldText` = el comentario `<!-- SP4-1: Bases de Alberdi — OPINIÓN -->` y `newText` = las 4 cards + el comentario SP4-1 original.

5. **Actualizar los 5 `--reveal-delay` de SP4-1..5** en `index.html` con 5 ediciones `edit` individuales:
   - SP4-1: `--reveal-delay: 0ms` → `--reveal-delay: 320ms`
   - SP4-2: `--reveal-delay: 80ms` → `--reveal-delay: 400ms`
   - SP4-3: `--reveal-delay: 160ms` → `--reveal-delay: 480ms`
   - SP4-4: `--reveal-delay: 240ms` → `--reveal-delay: 560ms`
   - SP4-5: `--reveal-delay: 320ms` → `--reveal-delay: 640ms`
   
   **Nota:** Los delays de SP4 no son únicos en el archivo — usar suficiente contexto de `oldText` (incluir la línea del comentario de card anterior) para que la coincidencia sea unívoca. Leer las líneas circundantes antes de cada edit.

## Must-Haves

- [ ] 4 comentarios `<!-- M019-1 -->` .. `<!-- M019-4 -->` presentes en index.html
- [ ] `data-certeza="hecho"` (con comillas) en las 4 cards — ningún `data-certeza=\[hecho\]`
- [ ] Cards 2 y 3 tienen `<blockquote class="card-opinion__quote">` con cita verificada + attribution
- [ ] SP4-1 tiene `--reveal-delay: 320ms`, SP4-5 tiene `--reveal-delay: 640ms`
- [ ] `grep -c "M019-[1-4]" index.html` devuelve 4
- [ ] Node.js syntax check de `app.js` pasa (no se toca app.js, pero confirmar que index.html no rompió nada)

## Verification

```bash
# Cards insertadas
grep -c "M019-[1-4]" index.html

# data-certeza correcto
grep -c 'data-certeza=\[hecho\]' index.html

# Stagger SP4 actualizado
grep -A3 "SP4-1" index.html | grep "reveal-delay"
grep -A3 "SP4-5" index.html | grep "reveal-delay"

# Syntax JS (no se toca app.js, solo confirmar)
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
```

Todos deben pasar: 4, 0, 320ms, 640ms, OK.

## Inputs

- `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` — excerpts, citas textuales, fuentes, URLs de imagen, reveal-delays y tabla de ajuste de stagger para las 4 cards. **Este archivo contiene todo lo necesario — no se requiere investigación adicional.**
- `index.html` líneas ~2283–2430 — estructura del grid receptor `#rev-1852-1860` y patrón exacto de SP4-1..5 (delays actuales: 0ms, 80ms, 160ms, 240ms, 320ms).

**Contexto de patrones HTML del proyecto:**

Para `card-hecho` sin cita (Cards 1 y 4):
```html
<!-- M019-1: Caseros — HECHO -->
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-image">
    <img src="[URL]" alt="[alt]" loading="lazy">
  </div>
  <span class="event-card__year">[fecha display]</span>
  <h3 class="event-card__title">[título]</h3>
  <p class="event-card__excerpt">[excerpt]</p>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>[fuentes]</cite>
  </footer>
</article>
```

Para `card-hecho` con cita (Cards 2 y 3) — agregar después del excerpt, antes del footer:
```html
  <blockquote class="card-opinion__quote">
    <p>«[texto de la cita]»</p>
    <footer class="card-opinion__attribution">— [Autor], [descripción del documento], [fecha].</footer>
  </blockquote>
```

**URLs de imagen disponibles en index.html (ya en uso):**
- Mitre (Manzoni 1861): `https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Bartolom%C3%A9_Mitre_%28Manzoni%2C_1861%29.jpg/500px-Bartolom%C3%A9_Mitre_%28Manzoni%2C_1861%29.jpg` (SP4-5)
- Urquiza (retrato): `https://upload.wikimedia.org/wikipedia/commons/e/ee/Justo_Jos%C3%A9_de_Urquiza_%28retrato%29.jpg` (SP4-2 y SP4-4)
- Mapa Argentina/BsAs: La URL del mapa en SP4-3 — leer de index.html antes de usar

## Expected Output

- `index.html` modificado: 4 cards M019 insertadas antes de SP4-1 en `#rev-1852-1860`; delays SP4-1..5 actualizados a 320ms–640ms. El milestone M019 queda visible en el sitio estático.

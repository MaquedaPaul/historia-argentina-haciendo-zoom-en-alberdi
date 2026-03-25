---
estimated_steps: 4
estimated_files: 1
---

# T02: Crear sub-período biográfico en index.html e integrar cards S01

**Slice:** S01 — Infancia, familia y años formativos (1810–1824)
**Milestone:** M007

## Description

Con el borrador `S01-CONTENT-DRAFT.md` completo y verificado (output de T01), este task integra los 4 bloques biográficos como cards HTML en `index.html`. Se crea un nuevo sub-período `#rev-alberdi-formacion` dentro de `#periodo-revolucion`, se actualiza el sub-nav para incluirlo, y se usan los templates de card existentes (card-hecho, card-opinion) sin añadir CSS ni JS nuevo.

**Constraint crítico**: No añadir CSS ni JS nuevo. Reuso total de patrones existentes (`card-hecho`, `card-opinion`, `card-rumor`, `card-nota-certeza`, `events-grid--certeza`, `reveal reveal-fade`, `reveal reveal-slide`, `--reveal-delay`).

**Punto de inserción en index.html**: El nuevo sub-período va inmediatamente antes de `<div id="rev-1800-1820"` (línea ~339). El nuevo sub-nav link va como primer `<a>` dentro del `<nav class="sub-nav">` (línea ~326), antes del link existente `#rev-1800-1820`.

## Steps

1. Leer `S01-CONTENT-DRAFT.md` para tener todos los bloques listos (Bloque 1–4: excerpts, certeza, citas HTML, notas de imagen). Este es el único input que define el contenido — no investigar de nuevo.
2. En `index.html`, localizar el `<nav class="sub-nav">` (línea ~326). Añadir como **primer elemento** dentro del nav: `<a href="#rev-alberdi-formacion" class="sub-nav__link">1810–1824<span class="sub-nav__link-label">Infancia y Formación</span></a>`. Esto conecta el sub-nav al nuevo sub-período.
3. Localizar `<div id="rev-1800-1820"` (línea ~339). Insertar **antes** de esta línea el nuevo bloque completo:
   ```html
   <!-- ══════════════════════════════════════════════════
        SUB-PERÍODO BIOGRÁFICO: Alberdi — Infancia y Formación (1810–1824)
        4 cards — hecho + opinion
        ══════════════════════════════════════════════════ -->
   <div id="rev-alberdi-formacion" class="sub-period reveal reveal-fade">
     <h3 class="sub-period__title">Alberdi: Los años de formación (1810–1824)</h3>
     <div class="events-grid events-grid--certeza" aria-label="Formación temprana de Alberdi (1810–1824)">
       <!-- 4 cards del borrador S01, con --reveal-delay: 0ms, 80ms, 160ms, 240ms -->
     </div>
   </div><!-- /#rev-alberdi-formacion -->
   ```
4. Dentro del grid, añadir las 4 cards usando los templates existentes. Para card-hecho: `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">`. Para card-opinion: `class="event-card card-opinion reveal reveal-slide" data-certeza="opinion"`. Incluir `<footer class="card-source"><span class="card-source__icon" aria-hidden="true">📄</span><cite>...</cite></footer>` en cada card-hecho. Usar `<span class="card-nota-certeza">[Nota: ...]</span>` inline para fechas inciertas documentadas en el borrador.

## Must-Haves

- [ ] El nuevo `<div id="rev-alberdi-formacion">` existe en `index.html` con `class="sub-period reveal reveal-fade"`.
- [ ] El sub-nav tiene un nuevo `<a href="#rev-alberdi-formacion">` como primer elemento del nav.
- [ ] Las 4 cards tienen `data-certeza` attribute (hecho o opinion según el borrador).
- [ ] Cada card tiene `style="--reveal-delay: Nms"` con los valores 0ms, 80ms, 160ms, 240ms en secuencia.
- [ ] Cada card tiene `<cite>` con fuente explícita (copiada del campo "Cita-HTML" del borrador).
- [ ] No se añadió CSS ni JS nuevo.
- [ ] El contenido del grid está dentro de `<div class="events-grid events-grid--certeza">`.

## Verification

- `grep -c 'data-certeza' index.html` devuelve ≥38 (era 34 antes de S01).
- `grep -q 'rev-alberdi-formacion' index.html && echo PASS || echo FAIL` devuelve PASS.
- `grep -q 'sub-nav__link.*1810\|1810.*sub-nav__link' index.html && echo SUB-NAV-WIRED || echo FAIL` — confirma que el sub-nav tiene el nuevo link.
- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log('data-certeza count:', m?m.length:0);"` — confirma el conteo exacto post-integración.

## Observability Impact

- Signals added/changed: 4 nuevos `data-certeza` attributes (consumidos por `events-grid--certeza` para el layout visual de certeza). Cualquier `card-nota-certeza` añadido actúa como señal inline de incertidumbre que persiste en el DOM renderizado.
- How a future agent inspects this: `grep -c 'data-certeza' index.html` para conteo total; `document.querySelectorAll('[data-certeza]')` en DevTools para ver todas las cards; `document.querySelectorAll('.card-nota-certeza')` para flags epistémicos activos.
- Failure state exposed: si alguna card no tiene `events-grid--certeza` como clase del grid padre, pierde el layout de certeza (visible visualmente pero sin pérdida de contenido). Si el sub-nav link no existe, el sub-período no es navegable por teclado/click pero sigue siendo alcanzable con scroll.

## Inputs

- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` — output de T01 con los 4 bloques verificados. Contiene el texto exacto para los excerpts, la certeza asignada, y la cita HTML de cada bloque.
- `index.html` — el archivo a modificar. El sub-nav está en línea ~326; el `#rev-1800-1820` en línea ~339. Consultar estas líneas antes de editar para verificar que no hubo cambios previos.
- `.gsd/KNOWLEDGE.md` — templates de card (card-hecho, card-opinion); pattern `--reveal-delay`; `events-grid--certeza` es obligatorio; `card-nota-certeza` para flags inline; CC BY-SA attribution va dentro de `.card-image` si hay imagen.

## Expected Output

- `index.html` modificado con: (1) nuevo sub-nav link `#rev-alberdi-formacion` como primer elemento; (2) nuevo `<div id="rev-alberdi-formacion">` con 4 cards integradas antes de `#rev-1800-1820`. El `data-certeza` count del archivo sube de 34 a ≥38.

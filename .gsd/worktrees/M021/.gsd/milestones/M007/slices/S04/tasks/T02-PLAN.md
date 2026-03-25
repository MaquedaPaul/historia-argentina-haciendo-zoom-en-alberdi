---
estimated_steps: 7
estimated_files: 2
---

# T02: Integrar las 5 cards de facetas en index.html

**Slice:** S04 — Alberdi multifacético — periodista, abogado, economista, músico
**Milestone:** M007

## Description

Integrar las 5 cards temáticas del perfil multifacético de Alberdi en `index.html`, dentro de `#rev-alberdi-formacion`, como un bloque separado ("Las múltiples dimensiones de Alberdi") con su propio `<h4>` y `events-grid`. Las cards son de naturaleza temática (no cronológica), por lo que van en un contenedor distinto al grid BIOG-1–11 pero dentro del mismo sub-período.

**Contexto técnico crítico (de KNOWLEDGE.md):**
- `index.html` usa CRLF (`\r\n`). Usar `split('\r\n')` en Node.js, no `split('\n')`.
- Usar la herramienta Write para escribir HTML a temp files, nunca heredoc bash.
- Inserción con Node.js splice: leer → split(`\r\n`) → splice → rejoin(`\r\n`) → write.
- Pre-flight check SIEMPRE antes de insertar — si el contenido ya existe, saltar inserción.

**Punto de inserción preciso:** Entre el `</div>` que cierra el grid BIOG-1–11 (línea ~628 en el estado post-S03) y el comentario `<!-- Puente narrativo: cierre de #rev-alberdi-formacion` (línea ~630). Buscar la cadena `<!-- Puente narrativo: cierre de #rev-alberdi-formacion` como ancla.

**Imágenes:** Las tres URLs del retrato de Alberdi ya presentes en el sitio (líneas ~862, ~1076, ~1519) NO deben duplicarse. Si alguna card temática incluye imagen, usar una URL diferente (buscar en Wikimedia Commons). Si no hay URL nueva verificada, omitir imagen — las cards temáticas son semánticamente sólidas sin imagen.

**Stagger delays:** Las 5 cards arrancan en `80ms`, `160ms`, `240ms`, `320ms`, `400ms` (reset desde el fin del grid cronológico).

## Steps

1. **Pre-flight check**: Ejecutar `grep -c 'multifacético\|Iniciador\|rentístico\|Figarillo' index.html`. Si el resultado es > 0, la integración ya está aplicada — verificar la corrección del contenido existente contra el borrador de T01 y saltar al Paso 7.

2. **Leer el borrador**: Abrir `S04-CONTENT-DRAFT.md` para obtener el texto exacto de cada card (excerpt, certeza, cite reference). Las 5 cards son los bloques BIOG-12 a BIOG-16 (periodista, abogado, economista, músico, escritor/pensador).

3. **Escribir el HTML de las 5 cards** a `/tmp/s04-cards.html` usando la herramienta Write (no heredoc). El bloque debe tener esta estructura exacta:

   ```html
   <!-- Bloque temático: Las múltiples dimensiones de Alberdi -->
   <h4 class="sub-period__subtitle">Las múltiples dimensiones de Alberdi</h4>
   <div class="events-grid events-grid--certeza" aria-label="Las múltiples dimensiones de Alberdi">

     <!-- BIOG-12: Alberdi periodista — El Iniciador y Figarillo -->
     <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 80ms">
       [contenido del borrador]
     </article>

     <!-- BIOG-13: Alberdi abogado — derecho como herramienta política -->
     <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 160ms">
       [contenido del borrador]
     </article>

     <!-- BIOG-14: Alberdi economista — Sistema económico y rentístico -->
     <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 240ms">
       [contenido del borrador]
     </article>

     <!-- BIOG-15: Alberdi músico — el método de guitarra y las composiciones -->
     <article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 320ms">
       [contenido del borrador]
     </article>

     <!-- BIOG-16: Alberdi escritor y pensador en el exilio -->
     <article class="event-card card-opinion reveal reveal-slide" data-certeza="opinion" style="--reveal-delay: 400ms">
       [contenido del borrador]
     </article>

   </div><!-- /.events-grid multifacético -->
   ```

   Cada `<article>` debe incluir:
   - `<div class="card-certeza-indicator">` con icono (✓ para hecho, 💬 para opinion) y label
   - `<span class="event-card__year">` con el año/período de la faceta
   - `<h3 class="event-card__title">` con título
   - `<p class="event-card__excerpt">` con el texto del borrador
   - `<span class="card-nota-certeza">` inline si hay incertidumbre puntual (e.g. composiciones musicales)
   - Para card-opinion: `<blockquote class="card-opinion__quote">` con cita + attribution footer
   - `<footer class="card-source">` con `<cite>` de las fuentes

4. **Insertar con Node.js CRLF-safe**: escribir y ejecutar:
   ```javascript
   const fs = require('fs');
   const html = fs.readFileSync('index.html', 'utf8');
   const cards = fs.readFileSync('/tmp/s04-cards.html', 'utf8');
   const lines = html.split('\r\n');
   const anchor = '<!-- Puente narrativo: cierre de #rev-alberdi-formacion';
   const idx = lines.findIndex(l => l.includes(anchor));
   if (idx === -1) { console.error('ANCLA NO ENCONTRADA'); process.exit(1); }
   const newLines = cards.split('\n').map(l => l.replace(/\r$/, ''));
   lines.splice(idx, 0, ...newLines);
   fs.writeFileSync('index.html', lines.join('\r\n'), 'utf8');
   console.log('Inserted at line', idx, '— new total lines:', lines.length);
   ```

5. **Verificar conteo**: `grep -c 'data-certeza' index.html` → debe ser ≥50 (era 45 + 5 nuevas). Si sigue en 45, el splice falló — revisar que el ancla fue encontrada correctamente.

6. **Verificar ausencia de imagen duplicada**: `grep -c 'Juan_Bautista_Alberdi.jpg\|bastique.*Portrait' index.html` → debe ser igual al valor pre-T02 (2 y 1 respectivamente). Si aumentó, hay una duplicación — corregir.

7. **Verificar stagger**: `grep 'reveal-delay' index.html | tail -10` → las últimas líneas deben mostrar `80ms`, `160ms`, `240ms`, `320ms`, `400ms` en las nuevas cards.

## Must-Haves

- [ ] Pre-flight check ejecutado antes de cualquier inserción
- [ ] 5 cards con `data-certeza` correcto (hecho/opinion) y `reveal reveal-slide`
- [ ] Stagger delays 80ms / 160ms / 240ms / 320ms / 400ms
- [ ] Inserción con Node.js usando `split('\r\n')` y `join('\r\n')` — no bash heredoc
- [ ] `grep -c 'data-certeza' index.html` → ≥50 post-inserción
- [ ] Ninguna imagen duplicada (las 3 URLs existentes no se repiten)
- [ ] Card BIOG-16 (escritor/pensador) es `card-opinion`, no `card-hecho`

## Verification

- `grep -c 'data-certeza' index.html` → ≥50
- `node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<50){console.error('FAIL:'+n);process.exit(1);}console.log('OK:'+n);"` → exit 0
- `grep 'Iniciador\|rentístico' index.html | wc -l` → ≥1 cada keyword

## Observability Impact

- Signals added/changed: `[Reveal] Initialized with N elements` en consola del browser aumenta de 65 a ≥70 (5 nuevas cards con `reveal reveal-slide`; el `<h4>` y el nuevo `<div class="events-grid">` no llevan clase `reveal` por defecto)
- How a future agent inspects this: `grep -n 'multifacético\|BIOG-12\|BIOG-16' index.html` localiza las 5 cards; `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` en DevTools debe ser ≥16
- Failure state exposed: si `data-certeza` count no aumenta → ancla de splice incorrecta (localizar con `grep -n 'Puente narrativo' index.html`); si reveal count no aumenta → las cards no tienen clases `reveal reveal-slide` (verificar con `grep -n 'BIOG-12' index.html`)

## Inputs

- `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` — producido en T01; texto exacto de las 5 cards
- `index.html` — estado post-S03: 45 cards data-certeza, línea ~630 con ancla `<!-- Puente narrativo: cierre de #rev-alberdi-formacion`
- KNOWLEDGE.md — patrón CRLF-safe Node.js splice; patrón card-nota-certeza; normalización data-certeza; pre-flight check antes de inserción

## Expected Output

- `index.html` — 5 cards temáticas de Alberdi integradas en `#rev-alberdi-formacion` antes del puente narrativo; `data-certeza` count ≥50; reveal count ≥70 en browser

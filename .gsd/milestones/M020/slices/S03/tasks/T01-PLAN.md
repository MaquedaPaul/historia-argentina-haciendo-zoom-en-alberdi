---
estimated_steps: 5
estimated_files: 2
---

# T01: Agregar marcadores 1806 y 1807 al revolucion-timeline

**Slice:** S03 — Timeline, nexo causal y contexto napoleónico
**Milestone:** M020

## Description

El `revolucion-timeline` en `index.html` actualmente muestra 10 marcadores (1810–1860). El milestone M020 requiere que los eventos de 1806 y 1807 (Invasiones Inglesas) sean visibles en ese timeline. Esta tarea inserta 2 nuevos marcadores al inicio del track y actualiza el CSS de stagger para cubrirlos.

**Aritmética de posiciones** (span 1800–1860 = 60 años):
- 1806: `(1806-1800)/60 × 100 = 10.00%`
- 1807: `(1807-1800)/60 × 100 = 11.67%`
- Los marcadores existentes (1810–1860) mantienen sus posiciones `--marker-pos` exactas — no cambian.

**Aritmética de nth-child**: El track tiene `div.revolucion-timeline__progress` como primer hijo (nth-child(1)), seguido de los marcadores. Con 2 nuevos marcadores al inicio, la secuencia es: nth-child(1)=progress, nth-child(2)=**1806** (nuevo), nth-child(3)=**1807** (nuevo), nth-child(4)=1810 (antes nth-child(2)), ..., nth-child(13)=1860 (antes nth-child(11)). Las reglas CSS existentes para nth-child(2)–(11) quedan desplazadas 2 posiciones y deben renumerarse a nth-child(4)–(13). Los delays de animación de los marcadores existentes se mantienen idénticos — solo cambia el número del selector.

## Steps

1. **Abrir `index.html`** y localizar la sección `revolucion-timeline__track`. Buscar `<!-- Marker 1: 1810` — los 2 nuevos marcadores van inmediatamente antes de esta línea, después de `<div class="revolucion-timeline__progress"></div>`.

2. **Insertar los 2 nuevos marcadores** en `index.html`:

   ```html
   <!-- Marker 0a: 1806 — Primera Invasión Inglesa -->
   <div class="revolucion-timeline__marker" style="--marker-pos: 10.00%">
     <span class="revolucion-timeline__dot"></span>
     <span class="revolucion-timeline__label">1806<small>Invasión</small></span>
   </div>

   <!-- Marker 0b: 1807 — Segunda Invasión / Reconquista Definitiva (label arriba para evitar solapamiento) -->
   <div class="revolucion-timeline__marker revolucion-timeline__marker--above" style="--marker-pos: 11.67%">
     <span class="revolucion-timeline__dot"></span>
     <span class="revolucion-timeline__label">1807<small>Defensa</small></span>
   </div>
   ```

3. **Actualizar el CSS stagger** en `styles.css`. Localizar el bloque que empieza con `.revolucion-timeline.reveal--visible .revolucion-timeline__marker:nth-child(2) .revolucion-timeline__dot`. Reemplazar las 20 reglas actuales (10 para dot, 10 para label, nth-child(2)–(11)) con 24 reglas nuevas (12 para dot, 12 para label, nth-child(2)–(13)):

   **Dot delays** (los nuevos nth-child(2) y (3); los existentes se renumeran nth-child(4)–(13) con delays idénticos):
   - nth-child(2) = 1806: `0.05s`
   - nth-child(3) = 1807: `0.20s`
   - nth-child(4) = 1810: `0.45s` (era nth-child(2): `0.15s` → ajustar a `0.45s` para flujo natural desde 1806)
   - nth-child(5) = 1816: `0.65s`
   - nth-child(6) = 1820: `0.90s`
   - nth-child(7) = 1826: `1.05s`
   - nth-child(8) = 1829: `1.30s`
   - nth-child(9) = 1835: `1.45s`
   - nth-child(10) = 1838: `1.75s`
   - nth-child(11) = 1845: `2.05s`
   - nth-child(12) = 1852: `2.30s`
   - nth-child(13) = 1860: `2.55s`

   **Label delays** (dot + 0.20s cada uno):
   - nth-child(2) = 1806: `0.25s`
   - nth-child(3) = 1807: `0.40s`
   - nth-child(4) = 1810: `0.65s`
   - nth-child(5) = 1816: `0.85s`
   - nth-child(6) = 1820: `1.10s`
   - nth-child(7) = 1826: `1.25s`
   - nth-child(8) = 1829: `1.50s`
   - nth-child(9) = 1835: `1.65s`
   - nth-child(10) = 1838: `1.95s`
   - nth-child(11) = 1845: `2.25s`
   - nth-child(12) = 1852: `2.50s`
   - nth-child(13) = 1860: `2.75s`

4. **Verificar el HTML**: contar marcadores en el track y confirmar posiciones. Usar:
   ```bash
   node -e "
   const h = require('fs').readFileSync('index.html', 'utf8');
   const track = (h.match(/revolucion-timeline__track[\s\S]*?<!-- \/.revolucion-timeline__track/)||[''])[0];
   const count = (track.match(/revolucion-timeline__marker/g)||[]).length;
   const has1806 = h.includes('--marker-pos: 10.00%') || h.includes('marker-pos: 10%');
   const has1807 = h.includes('--marker-pos: 11.67%');
   console.log('markers:', count, '| 1806:', has1806, '| 1807:', has1807);
   "
   ```

5. **Verificar el CSS**: confirmar que el max nth-child es 13:
   ```bash
   node -e "
   const css = require('fs').readFileSync('styles.css', 'utf8');
   let max = 0;
   const re = /revolucion-timeline__marker:nth-child\((\d+)\)/g;
   let m; while ((m = re.exec(css)) !== null) { max = Math.max(max, parseInt(m[1])); }
   console.log('max nth-child:', max);
   console.assert(max >= 13, 'CSS stagger missing nth-child(13)');
   "
   ```

## Must-Haves

- [ ] Marcador 1806 insertado con `--marker-pos: 10.00%` en el track HTML
- [ ] Marcador 1807 insertado con `--marker-pos: 11.67%` y clase `revolucion-timeline__marker--above`
- [ ] CSS stagger actualizado: nth-child(2) y (3) para los nuevos marcadores + nth-child(4)–(13) renumerando los existentes
- [ ] Los 10 marcadores existentes (1810–1860) conservan sus `--marker-pos` exactos y sus delays de animación
- [ ] Sintaxis JS sin errores: `node -e "new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK')"`

## Verification

- `node -e "const css=require('fs').readFileSync('styles.css','utf8'); let max=0; const re=/revolucion-timeline__marker:nth-child\((\d+)\)/g; let m; while((m=re.exec(css))!==null){max=Math.max(max,parseInt(m[1]));} console.log('max:', max); console.assert(max>=13);"` — debe imprimir `max: 13`
- `grep -c "revolucion-timeline__marker" index.html` — debe retornar ≥ 12 (6 líneas por marker × 2 nuevos + existentes; o contar con `<div class="revolucion-timeline__marker"`)
- `grep "marker-pos: 10.00\|marker-pos: 11.67" index.html` — debe mostrar las 2 nuevas líneas

## Inputs

- `index.html` — `revolucion-timeline__track` existente con 10 marcadores (1810–1860) en líneas ~2963–3027
- `styles.css` — reglas stagger `revolucion-timeline__marker:nth-child(2)` a `:nth-child(11)` en líneas ~1691–1790
- Cálculo de posiciones: span 1800–1860; 1806 = 10.00%; 1807 = 11.67%
- Cálculo de nth-child: progress bar = nth-child(1); nuevos marcadores = nth-child(2) y (3); existentes desplazados a nth-child(4)–(13)

## Expected Output

- `index.html` — 2 nuevos marcadores en el track, posicionados al inicio (antes del comentario `<!-- Marker 1: 1810`)
- `styles.css` — bloque stagger reemplazado: 12 reglas dot (nth-child(2)–(13)) + 12 reglas label (nth-child(2)–(13)), con la regla `animation-name: rev-label-fade-above` en la sección `--above` ya cubierta genéricamente (no requiere nth-child específico)

## Observability Impact

- **Changed signals**: `document.querySelectorAll('.revolucion-timeline__marker').length` pasa de 10 a 12 en DevTools; `getComputedStyle(markers[0]).getPropertyValue('--marker-pos')` → `10.00%` (antes el primer marcador era 1810 = 16.67%).
- **Animation stagger**: En consola del browser el IntersectionObserver dispara `.reveal--visible` en el div `.revolucion-timeline reveal reveal-fade` al scrollear al timeline; los markers 1806 y 1807 deben animarse a 0.05s / 0.20s (dot) y 0.25s / 0.40s (label) antes que 1810 a 0.45s.
- **Inspection surface**: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const t=(h.match(/revolucion-timeline__track[\s\S]*?<!-- \/.revolucion-timeline__track/)||[''])[0]; console.log('markers:', (t.match(/revolucion-timeline__marker/g)||[]).length);"` → debe retornar 12.
- **Failure state visible**: si el count es < 12, el marcador fue insertado fuera del track. Si `--marker-pos: 10.00%` está ausente, el marcador 1806 no se renderizará en la posición correcta. Si max nth-child < 13 en CSS, los marcadores 12 y 13 permanecerán invisible (opacity:0 permanente).

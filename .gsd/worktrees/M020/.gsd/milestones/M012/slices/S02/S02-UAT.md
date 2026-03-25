# S02: Verificación y Pulido — UAT

**Milestone:** M012
**Written:** 2026-03-24

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: The accordion is JavaScript-driven with CSS transitions and ARIA state management — static analysis cannot verify animation smoothness, intersection observer behavior, or keyboard event delegation. Browser runtime is required.

## Preconditions

1. A static HTTP server is running: `npx http-server . -p 8080 -c-1` from the project root
2. Browser is open at `http://localhost:8080` (Chrome or Firefox recommended)
3. Page is loaded fresh — no prior scroll, no prior clicks
4. DevTools Console is open

## Smoke Test

Open `http://localhost:8080` and check the DevTools Console. The first line should read:

```
[Accordion] Initialized with 7 sub-periods.
```

If this message is absent, `initAccordions()` did not run and the accordion is broken at the root level. Stop and investigate `app.js`.

---

## Test Cases

### 1. Estado inicial al cargar (6 colapsados + 1 expandido)

1. Navegar a `http://localhost:8080` en una pestaña nueva (sin scroll previo)
2. En DevTools Console, ejecutar:
   ```js
   document.querySelectorAll('.sub-period__body--collapsed').length
   ```
3. **Expected:** `6`
4. Ejecutar:
   ```js
   document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]').length
   ```
5. **Expected:** `1`
6. Ejecutar:
   ```js
   document.querySelectorAll('.sub-period__title--trigger').length
   ```
7. **Expected:** `7`
8. Verificar visualmente que `#rev-alberdi-formacion` muestra su contenido (cards visibles)
9. **Expected:** El primer sub-período (`#rev-alberdi-formacion`) está expandido; los demás muestran solo el header h3 con chevron apuntando a la derecha (▶)

### 2. Visibilidad de sub-períodos (opacity fix verificado)

1. Ejecutar en consola:
   ```js
   Array.from(document.querySelectorAll('.sub-period')).map(sp => ({
     id: sp.id,
     opacity: window.getComputedStyle(sp).opacity,
     hasReveal: sp.classList.contains('reveal') || sp.classList.contains('reveal-fade')
   }))
   ```
2. **Expected:** Los 7 objetos muestran `opacity: "1"` y `hasReveal: false`
3. Scrollear hasta `#rev-rosas` (el último sub-período en el DOM antes del fin de la sección)
4. **Expected:** Los headers h3 de todos los sub-períodos son visibles — no hay contenido invisible

### 3. Expand/collapse con click — animación CSS

1. Scrollear hasta un sub-período colapsado (por ej. `#rev-guerra-independencia`)
2. Hacer click en el header h3
3. **Expected:**
   - El contenido del sub-período aparece con una transición suave de ~0.45 segundos
   - El chevron rota 90° (de ▶ a ▼)
   - `aria-expanded` cambia a `"true"` en el trigger (verificar con Elements panel)
   - En Console aparece: `[Accordion] Expanded: rev-guerra-independencia`
4. Hacer click nuevamente en el mismo header
5. **Expected:**
   - El contenido colapsa suavemente en ~0.45 segundos
   - El chevron vuelve a ▶
   - `aria-expanded` regresa a `"false"`
   - En Console: `[Accordion] Collapsed: rev-guerra-independencia`

### 4. Verificación de init order — reveal no marcado en colapsados

1. Sin hacer scroll (en la posición inicial), ejecutar:
   ```js
   document.querySelectorAll('.sub-period__body--collapsed .reveal--no-anim').length
   ```
2. **Expected:** `0`
3. Si el resultado es > 0, el orden de init está roto (`initAccordions()` corrió después de `revealOnScroll()`)

### 5. Reveal-on-scroll re-dispara al expandir

1. Scrollear hasta un sub-período colapsado — navegar hasta que el header sea visible en pantalla
2. Expandir el sub-período haciendo click en el header
3. Esperar que la transición termine (~0.5s)
4. Observar DevTools Console
5. **Expected:** Aparecen mensajes `[Reveal] Revealed: ...` para las cards que entran al viewport al expandirse
6. Las cards individuales dentro del sub-período hacen fade-in (animación de entrada visible)
7. **Expected:** No hay cards "fantasma" — todas las cards dentro del sub-período expandido son visibles

### 6. Navegación con teclado

1. Presionar Tab repetidamente hasta que el foco llegue a un trigger `.sub-period__title--trigger`
2. **Expected:** El trigger recibe foco visible (outline visible)
3. Presionar Enter
4. **Expected:** El sub-período hace toggle (se expande si estaba colapsado, o colapsa si estaba expandido). `aria-expanded` se actualiza.
5. Mover foco a otro trigger con Tab
6. Presionar Space
7. **Expected:** Toggle del segundo trigger. La página NO hace scroll hacia abajo (comportamiento por defecto del Space en ventana suprimido)
8. Ejecutar en consola para verificar aria-controls:
   ```js
   document.querySelectorAll('.sub-period__title--trigger[aria-controls]').length
   ```
9. **Expected:** `7`

### 7. #periodo-rosas — contenido sin clipping

1. Scrollear hasta `#periodo-rosas` (el sub-período más largo)
2. Expandir haciendo click en su header
3. En Console, ejecutar:
   ```js
   document.querySelector('#periodo-rosas .sub-period__body').scrollHeight
   ```
4. **Expected:** El valor devuelto (~17719) es menor que 24000 (1500rem cap)
5. Scrollear hasta el final del contenido expandido del sub-período
6. **Expected:** No hay contenido cortado abruptamente — el último card/elemento del sub-período es completamente visible

### 8. Audio ambiental — sin regresión

1. Hacer scroll por la página para cambiar de período activo (colonial → revolución → nacional)
2. **Expected:** En Console aparecen mensajes `[Sound] Playing track:` al cambiar de período
3. Hacer click en el botón de mute/unmute (ícono de audio en la esquina)
4. **Expected:** El audio se silencia; `aria-pressed` en el botón cambia a `"true"`; el label cambia a "Silenciar" o "Activar"
5. Hacer click nuevamente
6. **Expected:** Audio reanuda; `aria-pressed` regresa a `"false"`

### 9. Mobile (375px) — comportamiento idéntico

1. Abrir DevTools y cambiar viewport a 375px de ancho
2. Recargar la página
3. Ejecutar en Console:
   ```js
   document.querySelectorAll('.sub-period__body--collapsed').length
   ```
4. **Expected:** `6`
5. Hacer click en un sub-período colapsado
6. **Expected:** Se expande con la misma animación CSS; cards en columna única (no grid de dos columnas)
7. Verificar que la sub-nav bar es accesible mediante scroll horizontal
8. **Expected:** Los links de la sub-nav se pueden scrollear horizontalmente para acceder a todos los sub-períodos

---

## Edge Cases

### Expandir todos los sub-períodos simultáneamente

1. Expandir todos los sub-períodos en secuencia rápida (click, click, click, …)
2. **Expected:** Cada uno expande independientemente; no hay estado compartido corrupto; `aria-expanded` es correcto en cada uno
3. Ejecutar en consola:
   ```js
   document.querySelectorAll('.sub-period__title--trigger[aria-expanded="true"]').length
   ```
4. **Expected:** `7` (todos expandidos)

### Click en texto hijo del trigger (no en el h3 directamente)

1. Hacer click en el span o strong interior del h3 trigger (si los hay)
2. **Expected:** El toggle funciona igual que hacer click en el h3 directamente (event delegation maneja child clicks)

### Resize durante transición

1. Iniciar la expansión de un sub-período (click)
2. Inmediatamente redimensionar el viewport a 375px mientras la transición corre
3. **Expected:** La transición completa normalmente; el accordion queda en el estado correcto (expandido o colapsado según el click)

### Accordion en prefers-reduced-motion

1. En DevTools → Rendering → Emulate CSS media feature: `prefers-reduced-motion: reduce`
2. Colapsar y expandir un sub-período
3. **Expected:** El toggle funciona (funcionalidad preservada), pero la animación de transición es instantánea o mínima — sin el efecto de 0.45s

---

## Failure Signals

- **`[Accordion] Initialized with 7 sub-periods.` ausente en Console** → `initAccordions()` no corrió; verificar que `app.js` carga correctamente y que la función está definida y llamada en el IIFE de init.
- **Sub-períodos con `opacity: 0` (contenido invisible)** → Algún elemento `.sub-period` recuperó las clases `reveal reveal-fade`; ejecutar `document.querySelectorAll('.sub-period.reveal')` — si devuelve > 0, el fix D1 fue revertido.
- **`.sub-period__body--collapsed .reveal--no-anim` > 0** → Orden de init roto; `initAccordions()` corrió después de `revealOnScroll()`.
- **`#periodo-rosas` scrollHeight > 24000** → max-height cap insuficiente para el contenido actual; buscar nueva entrada de contenido que haya crecido el sub-período.
- **Click en header no hace nada** → Event delegation rota; verificar que el handler escucha en el ancestro correcto (la sección `#periodo-revolucion`) y que `.closest('.sub-period__title--trigger')` encuentra el trigger.
- **`aria-expanded` siempre `"false"` o siempre `"true"`** → El toggle handler no actualiza el atributo; buscar el bloque `setAttribute('aria-expanded', ...)` en `initAccordions()`.
- **Cards no hacen reveal-on-scroll al expandir** → El `transitionend` listener no está re-disparando `revealOnScroll()`; verificar que el listener usa `{ once: true }` y que `revealOnScroll()` es invocado dentro del callback.

---

## Not Proven By This UAT

- Comportamiento en Firefox, Safari, o Edge — el UAT se realizó en Chrome. Las animaciones CSS son estándar pero la velocidad de interpolación puede diferir levemente.
- Funcionamiento en conexiones lentas (carga de assets de audio demorada) — los sonidos ambientales son archivos MP3 locales; en producción (GitHub Pages) el comportamiento puede diferir si los archivos tardan en cargar.
- Sub-nav `position: sticky` — esta feature no funciona en ningún browser por el `overflow: hidden` del ancestro. No está en scope de M012. No incluido en el UAT.
- Comportamiento cuando el usuario scrollea mientras un accordion está en medio de su transición — el reveal re-trigger se basa en `transitionend`, que puede dispararse con el viewport en una posición distinta a cuando empezó la transición.

---

## Notes for Tester

- **La sub-nav no se pega (sticky) aunque el código lo intenta** — esto es un bug pre-existente (anterior a M012) causado por `overflow: hidden` en el `<section class="period">` padre. No es una regresión de M012. Ignorar para este UAT.
- **El Defecto D1 (opacity:0) fue corregido en T02** — si haces una comparación con el branch antes de T02, los sub-períodos serían completamente invisibles. La corrección fue remover `reveal reveal-fade` de los 7 containers `div.sub-period`.
- **El Defecto D2 (clipping de #periodo-rosas) fue corregido en T02** — el max-height es ahora 1500rem (24000px). Si el contenido se ve cortado en #periodo-rosas, el fix puede haber sido revertido.
- Los mensajes de consola con prefijos `[Accordion]`, `[SubNav]`, `[Sound]`, `[Reveal]` son la primera fuente de diagnóstico — consultar antes de inspeccionar el DOM.
- En mobile, la sub-nav no tiene scroll horizontal visible pero sí funcional — el usuario puede deslizar el dedo para ver todos los links.

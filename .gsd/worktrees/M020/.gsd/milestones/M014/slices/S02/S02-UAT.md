# S02: Integración HTML y verificación — UAT

**Milestone:** M014
**Written:** 2026-03-24

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: El único entregable de este slice es HTML insertado en index.html. La verificación requiere un browser real para confirmar que IntersectionObserver registra la sección, el sub-nav activa el link correcto, y las 6 cards tienen certeza visible. No hay backend ni estado de servidor — un servidor estático local es suficiente.

## Preconditions

1. Servidor HTTP local levantado en el directorio del proyecto: `npx http-server -p 8765` (o cualquier puerto libre)
2. Browser abierto con DevTools disponibles (consola abierta)
3. No recargar la página con scroll ya posicionado en la sección — navegar siempre desde la URL raíz para que el reveal on scroll funcione correctamente

## Smoke Test

Abrir `http://localhost:8765/index.html` → la página carga, el título es "Historia Argentina 1500–1900", y la consola muestra `[SubNav] Initialized with 8 sub-periods, 8 links.` (no 7). Si dice 7, el sub-nav link de tertulias no se insertó correctamente.

## Test Cases

### 1. Sección existe y es navegable desde sub-nav

1. Abrir `http://localhost:8765/index.html` (desde el inicio, sin hash)
2. Hacer scroll hasta entrar en la sección `#periodo-revolucion` (ver que el nav principal resalta "Revolución")
3. Localizar el sub-nav sticky y buscar el link "1810–1868 Tertulias de Mariquita"
4. Hacer click en ese link
5. **Expected:** La página hace smooth-scroll hasta la sección "Las Tertulias de Mariquita Sánchez (1805–1868)". El link del sub-nav queda resaltado con la clase `sub-nav__link--active`. La consola muestra `[DEBUG] [SubNav] Active sub-period → rev-tertulias-mariquita`.

### 2. Seis cards con certeza classification visibles

1. Con la sección visible en viewport, observar las 6 cards de las tertulias
2. **Expected:** Las 6 cards tienen badges de certeza visibles:
   - TER-1: badge "hecho" (verde/neutral)
   - TER-2: badge "rumor" (ámbar)
   - TER-3: badge "hecho"
   - TER-4: badge "hecho"
   - TER-5: badge "opinión"
   - TER-6: badge "opinión"
3. **Expected (consola):** Aparecen 6 líneas `[DEBUG] [Reveal] Revealed: article.event-card.card-*.reveal--visible` con stagger delays (0ms, 80ms, 160ms, 240ms, 320ms, 400ms)

### 3. TER-2 (Himno Nacional) tiene nota historiográfica visible

1. Localizar la card TER-2 (badge rumor, título relacionado con el Himno Nacional / tradición oral)
2. Leer el texto completo de la card
3. **Expected:** Dentro de la card hay un párrafo visible que comienza con **"Nota historiográfica:"** (negrita) seguido de texto explicando que la tradición del Himno en el salón de Mariquita no tiene documentación contemporánea directa. El párrafo NO está colapsado ni oculto — debe ser legible sin ninguna interacción adicional.

### 4. TER-4 tiene nota de certeza inline visible

1. Localizar la card TER-4 (badge hecho, título relacionado con el salón en el exilio / período posterior a 1829)
2. Leer el texto de la card
3. **Expected:** Dentro del cuerpo de la card hay texto entre corchetes que comienza con "[Nota:" indicando una advertencia epistémica sobre una cita específica. Este texto está inline en el párrafo, visible sin interacción.

### 5. Stagger animations al scrollear hasta la sección

1. Navegar a `http://localhost:8765/index.html` (sin hash, desde arriba)
2. Hacer scroll lento hasta alcanzar la sección `#rev-tertulias-mariquita`
3. **Expected:** Las 6 cards aparecen con animación de entrada escalonada (cada una con un pequeño retraso después de la anterior). La primera card aparece primero (0ms delay), la última con más retraso (400ms). La sección completa también tiene reveal-fade.

### 6. Ninguna sección existente está rota

1. Navegar por toda la página: sección Colonial, luego todas las sub-secciones de Revolución (incluyendo las que existían antes de M014), luego la sección Nacional
2. Verificar que `#rev-alberdi-formacion`, `#rev-alberdi-quiroga`, `#rev-1800-1820`, `#rev-1820-1835`, `#periodo-rosas`, `#rev-caseros-constitucion`, `#rev-alberdi-exilio` carguen correctamente
3. **Expected:** Todas las secciones previas muestran su contenido sin cambios. El sub-nav muestra todos sus links y activa el correcto al scrollear a cada sub-período.

### 7. Consola sin errores JS nuevos

1. Abrir DevTools → Console antes de cargar la página
2. Navegar a `http://localhost:8765/index.html#rev-tertulias-mariquita`
3. **Expected:** La única entrada de `[ERROR]` es `Failed to load resource: favicon.ico 404` — pre-existente, no causada por M014. No debe haber ningún otro error. Los mensajes de `[DEBUG]` son informativos y esperados.

## Edge Cases

### Scroll directo al hash en la URL

1. Abrir `http://localhost:8765/index.html#rev-tertulias-mariquita` directamente (con hash)
2. **Expected:** La página scrollea hasta la sección automáticamente. Las cards pueden aparecer con `reveal--no-anim` (no animadas) porque ya están en viewport al cargar — esto es comportamiento correcto del IntersectionObserver (catch-up mode, documentado en KNOWLEDGE.md). El contenido de las cards es visible. La nota historiográfica de TER-2 es legible.

### Verificación DOM programática

1. Con la página cargada, abrir consola de DevTools
2. Ejecutar: `document.getElementById('rev-tertulias-mariquita').querySelectorAll('[data-certeza]').length`
3. **Expected:** `6`
4. Ejecutar: `document.querySelector('a[href="#rev-tertulias-mariquita"]').className`
5. **Expected:** incluye `sub-nav__link`

### Imagen TER-3 (URL directa, baja resolución)

1. Localizar la card TER-3 (la que tiene imagen del retrato de Mariquita)
2. **Expected:** La imagen se carga y muestra el retrato. Puede verse pixelada en pantallas de alta densidad — esto es esperado y documentado. No debe verse el placeholder de imagen rota (fondo gris con icono).

## Failure Signals

- **Sub-nav muestra 7 links** en lugar de 8: el link de tertulias no fue insertado. Verificar con `grep -n "rev-tertulias-mariquita" index.html` → debe mostrar línea ~331.
- **Sección no se encuentra**: `document.getElementById('rev-tertulias-mariquita')` retorna `null`. Verificar con `grep -c 'id="rev-tertulias-mariquita"' index.html` → debe ser ≥1.
- **Menos de 6 cards**: `querySelectorAll('[data-certeza]').length < 6`. Verificar con `awk` boundary check.
- **Nota historiográfica no visible**: `document.querySelector('#rev-tertulias-mariquita .card-nota-historiografica')` retorna `null`.
- **Errores JS nuevos en consola** (más allá del favicon 404): indica regresión en secciones existentes.
- **`data-certeza=` count ≠ 99**: `grep -c 'data-certeza=' index.html` retorna valor diferente de 99 — indica cards añadidas o removidas inesperadamente.

## Not Proven By This UAT

- Comportamiento en mobile (< 768px) — el sub-nav sticky y los breakpoints de grid no se verificaron en viewport móvil en esta UAT. La funcionalidad de reveal y certeza sí funciona en mobile (probada en milestones anteriores con el mismo sistema).
- Accesibilidad de la nota historiográfica con screen readers — el párrafo es HTML visible sin roles ARIA adicionales.
- Carga de imágenes bajo condiciones de red lenta — las imágenes de Wikimedia Commons pueden tardar en redes lentas; el fallback placeholder es automático.
- Comportamiento con `prefers-reduced-motion: reduce` — las animaciones de reveal se desactivan correctamente por el sistema establecido en milestones anteriores, pero no se verificó específicamente para las nuevas cards.

## Notes for Tester

- El badge "1810–1868" en el sub-nav link puede aparecer inmediatamente seguido de "Tertulias de Mariquita" sin espacio visible entre el número y el texto — esto es un artefacto del markup (dos nodos de texto adyacentes) y se ve correctamente en pantalla gracias al CSS. No es un bug.
- El favicon 404 en consola es pre-existente desde antes de M014. Ignorarlo.
- TER-2 es la card más importante de verificar manualmente: la nota historiográfica visible indica que el tratamiento del episodio del Himno Nacional es historiográficamente honesto (rumor/tradición oral, no hecho documentado).
- La sección aparece entre `#rev-1820-1835` (el Pacto Federal y la asunción de Rosas) y `#periodo-rosas` — narrativamente correcto, ya que las tertulias operaron principalmente 1805–1829 y continuaron en el exilio montevideano durante el rosismo.

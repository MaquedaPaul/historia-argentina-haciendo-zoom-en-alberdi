# S06: Quién era Facundo Quiroga y con quién estaba cuando recibió la carta — UAT

**Milestone:** M007
**Written:** 2026-03-22

## UAT Type

- UAT mode: artifact-driven + live-runtime
- Why this mode is sufficient: el slice es contenido estático integrado en un sitio sin backend. La verificación artifact-driven (grep, DOM queries) prueba estructura e integridad. La verificación live-runtime (browser) prueba que el sistema reveal-on-scroll registró las nuevas cards y que la sub-nav no se rompió. No se requiere UAT humano — el triple gate de T03 (21/21) cumple los criterios de cierre del plan.

## Preconditions

- `index.html` en el worktree M007 debe tener `data-certeza=54`; verificar con `grep -c 'data-certeza' index.html`
- Servidor local activo: `npx http-server . -p 8765` desde el directorio raíz del worktree
- Browser apuntando a `http://localhost:8765` (o `file:///...path.../index.html` para pruebas locales sin servidor)
- Sub-período `#rev-alberdi-quiroga` debe estar visible al scrollear a la sección 1800–1860 → subsección "Alberdi y Facundo Quiroga"

## Smoke Test

Navegar a `http://localhost:8765`, scrollear hasta el sub-período "Alberdi y Facundo Quiroga":

```bash
grep -c 'data-certeza' index.html   # debe ser 54
grep -c 'id="BIOG-19"' index.html   # debe ser 1
grep -c 'id="BIOG-20"' index.html   # debe ser 1
```

Si los tres retornan los valores esperados, las cards están integradas. Continuar con los test cases detallados.

---

## Test Cases

### 1. Presencia estructural de BIOG-19 y BIOG-20 en index.html

```bash
grep -c 'data-certeza' index.html          # → 54
grep -c 'id="BIOG-19"' index.html          # → 1
grep -c 'id="BIOG-20"' index.html          # → 1
grep -c 'rev-alberdi-quiroga' index.html   # → 3 (sub-nav link + div id + comentario cierre)
grep -c 'sub-nav__link' index.html         # → 6
```

**Expected:** Todos los valores coinciden exactamente. Si `rev-alberdi-quiroga` retorna >3, se creó un sub-período duplicado — fallo estructural. Si `sub-nav__link` retorna 7, se añadió incorrectamente un link de sub-nav.

---

### 2. Contenido textual obligatorio en index.html

```bash
grep -q 'San Antonio de los Llanos' index.html && echo PASS || echo FAIL
grep -q 'Santos Ortiz' index.html          && echo PASS || echo FAIL
grep -q 'card-nota-historiografica' index.html && echo PASS || echo FAIL
grep -q 'Braulio Costa' index.html         && echo PASS || echo FAIL
grep -q 'Barranca Yaco' index.html         && echo PASS || echo FAIL
grep -q 'Ariel de la Fuente' index.html    && echo PASS || echo FAIL
grep -q '1788' index.html                  && echo PASS || echo FAIL
```

**Expected:** Todos retornan PASS. "San Antonio de los Llanos" confirma el lugar de nacimiento de Quiroga. "Santos Ortiz" confirma el secretario. "card-nota-historiografica" confirma la nota sobre Sarmiento/De la Fuente. "Braulio Costa" confirma el agente comercial. "Barranca Yaco" confirma el lugar del asesinato. "Ariel de la Fuente" confirma la fuente de la revisión historiográfica. "1788" confirma el año de nacimiento.

---

### 3. Verificación DOM: sistema reveal y sub-nav

En el browser, abrir la consola y ejecutar:

```js
// Sub-nav no se extendió
document.querySelectorAll('.sub-nav .sub-nav__link').length              // → 6

// Cuatro cards dentro del sub-período (BIOG-17, 18, 19, 20)
document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length  // → 4

// Nota historiográfica presente en BIOG-19
document.querySelector('#BIOG-19 .card-nota-historiografica') !== null   // → true

// Nota de certeza presente en BIOG-20
document.querySelectorAll('#BIOG-20 .card-nota-certeza').length          // → 1

// Reveal count subió correctamente (base 73 + 3 nuevos)
document.querySelectorAll('.reveal').length                              // → 76
```

**Expected:** Todos los valores coinciden. Si `#rev-alberdi-quiroga [data-certeza]` retorna 2 en lugar de 4, las nuevas cards están fuera del sub-período correcto. Si `.reveal.length` es 73 o 74, el `<h4>` o alguna de las cards no lleva las clases `.reveal`.

---

### 4. Verificación visual: el título del bloque temático aparece

Scrollear hasta el final del sub-período `#rev-alberdi-quiroga` (después de BIOG-17 y BIOG-18).

**Expected:** Aparece un subtítulo `<h4>` con texto "Facundo Quiroga: el hombre que conoció Alberdi" antes de las dos nuevas cards. El subtítulo se anima con fade-in al entrar en el viewport (si se llega scrolleando desde arriba). El subtítulo NO aparece como link de sub-nav en el sticky nav.

---

### 5. Verificación visual: BIOG-19 — perfil biográfico de Quiroga

Scrollear hasta BIOG-19 (primera card del nuevo bloque, con imagen del retrato García del Molino).

**Expected:**
- Badge "Hecho" visible (verde)
- Año "1788–1835" en el header
- Título: "El Tigre de los Llanos: quién era Juan Facundo Quiroga"
- La imagen del retrato se carga correctamente (García del Molino, URL de Wikimedia Commons)
- El texto menciona San Antonio de los Llanos, La Tablada (1829), Oncativo (1830), La Ciudadela (1831), Braulio Costa, Barranca Yaco
- Una nota de certeza inline (span gris/ámbar) sobre la paradoja unitaria/federal
- Un párrafo con "Nota historiográfica:" en negrita mencionando Sarmiento, *Facundo: Civilización y Barbarie* (1845) y Ariel de la Fuente (2000)
- La nota historiográfica es visualmente distinta del cuerpo de la card (patrón establecido en BIOG-16)

---

### 6. Verificación visual: BIOG-20 — el círculo de Quiroga en Buenos Aires

Scrollear hasta BIOG-20 (segunda card del nuevo bloque, sin imagen).

**Expected:**
- Badge "Hecho" visible (verde)
- Año "1833–1834" en el header
- Título: "El círculo de Quiroga en Buenos Aires: Santos Ortiz y Braulio Costa"
- El texto menciona Braulio Costa, José Santos Ortiz, reuma, misión mediadora, gobernador Maza, 18 de diciembre de 1834, San Antonio de Areco, Rosas
- Una nota de certeza de cierre (span) explicitando que los testigos del momento exacto de la entrega de la carta no están documentados individualmente
- No tiene imagen (card sin .card-image, patrón BIOG-18)

---

### 7. Verificación de stagger y animación reveal

Navegar a la página desde el top (sin pre-scroll). Scrollear lentamente hasta el nuevo bloque "Facundo Quiroga: el hombre que conoció Alberdi".

**Expected:**
- El `<h4>` entra con reveal-fade (opacidad + translate) al primer contacto con el viewport
- BIOG-19 entra con reveal-slide con delay 0ms (aparece junto al h4 o casi simultáneamente)
- BIOG-20 entra con reveal-slide con delay 80ms (ligeramente después de BIOG-19)
- Ninguna de las dos cards aparece ya visible antes de que el viewport llegue a ellas (sin reveal pre-aplicado)

---

### 8. Coherencia narrativa — no hay duplicación con cards existentes

Leer en secuencia: SP2-2 → BIOG-17 → BIOG-18 → BIOG-19 → BIOG-20.

**Expected:**
- SP2-2 cubre el contexto político federal (guerras civiles, Caseros, rol de Quiroga en el federalismo) — BIOG-19 NO repite ese ángulo; se enfoca en la biografía personal (origen, batallas específicas, paradoja, muerte)
- BIOG-17 narra el encuentro y la carta — BIOG-19 NO repite ese episodio; BIOG-20 tampoco
- BIOG-18 narra las conversaciones Alberdi–Quiroga y la reacción al Fragmento — BIOG-20 NO menciona "ese hombre extraordinario" ni repite esas conversaciones
- La nota historiográfica de BIOG-19 sobre Sarmiento es distinta de cualquier mención previa de Sarmiento en el sitio (en otras secciones, Sarmiento aparece como protagonista del Salón Literario y del exilio — no como autor que escribió sobre Quiroga)

---

## Edge Cases

### A. Verificación de no-duplicación del sub-período

```bash
grep -c 'id="rev-alberdi-quiroga"' index.html   # debe ser exactamente 1
```

**Expected:** 1. Si retorna 2, se creó un sub-período duplicado con el mismo ID — viola el invariante HTML de IDs únicos y rompe el scroll-spy del sub-nav.

---

### B. Sub-nav en viewport del sub-período

Scrollear hasta que `#rev-alberdi-quiroga` sea el sub-período activo en el sub-nav sticky.

**Expected:** El link activo en el sub-nav muestra el sub-período "Alberdi y Facundo Quiroga" (o el label equivalente del link en el HTML), NO un nuevo link separado para "Facundo Quiroga: el hombre que conoció Alberdi". El `<h4>` es un título visual, no una entrada de sub-nav.

---

### C. Carga de la imagen de Quiroga (BIOG-19) sin error

En la consola del browser:

```js
const img = document.querySelector('#BIOG-19 .event-card__media img');
console.log(img.naturalWidth, img.complete, img.src);
```

**Expected:** `naturalWidth > 0` y `complete = true`. Si `naturalWidth === 0`, la imagen de Wikimedia Commons no cargó (problema de red o URL inválida). La URL es la misma que se usa en BIOG-17 y SP2-2 — si BIOG-17 carga, BIOG-19 también debe cargar.

---

### D. Prefers-reduced-motion

En DevTools > Rendering > Emulate prefers-reduced-motion: reducir. Scrollear sobre las nuevas cards.

**Expected:** Las cards aparecen directamente en su estado final (sin transformaciones ni fade) — el reveal system ya implementa el respeto a prefers-reduced-motion globalmente para `.reveal` elements.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` retorna 52 → la inserción no ocurrió o se revirtió
- `grep -c 'data-certeza' index.html` retorna 56 → la inserción se duplicó
- `grep -c 'rev-alberdi-quiroga' index.html` retorna 4+ → sub-período duplicado creado
- `grep -c 'sub-nav__link' index.html` retorna 7 → se añadió incorrectamente un link de sub-nav
- `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` retorna 2 → BIOG-19/BIOG-20 están fuera del sub-período
- `document.querySelector('#BIOG-19 .card-nota-historiografica')` retorna null → la nota historiográfica de Sarmiento/De la Fuente está ausente
- Las cards BIOG-19/BIOG-20 aparecen visualmente antes de hacer scroll (reveal pre-aplicado) → el sistema reveal registró mal el estado inicial
- El sub-nav muestra 7 links en lugar de 6 → se creó un entry de sub-nav no deseado

## Not Proven By This UAT

- Que el contenido histórico de BIOG-19 sea completamente preciso en todos sus detalles — el UAT verifica presencia de los hechos clave pero no exhaustividad académica contra fuentes primarias directas (Archivo Ravignani, *Epistolario Rosas-Quiroga*).
- Que la imagen de García del Molino sea la mejor elección visual — es la misma imagen ya validada en el sitio (BIOG-17, SP2-2); su adecuación estética fue decidida en slices previos.
- Que la paradoja "mis ideas son unitarias" esté completamente verificada contra el *Archivo Rosas* — la `card-nota-certeza` lo declara explícitamente como limitación.
- Que los testigos del momento exacto de la entrega de la carta sean identificables — la card-nota-certeza de BIOG-20 reconoce honestamente esta laguna documental.
- Rendimiento del sitio (Lighthouse) — no se introdujo CSS ni JS nuevo, por lo que el rendimiento debería ser idéntico al baseline de M005-S04. No se requiere re-auditoria.

## Notes for Tester

- Las dos nuevas cards están **al final del sub-período** `#rev-alberdi-quiroga`, después de BIOG-17 y BIOG-18. Para verlas sin scrollear toda la página, usar el sub-nav link "Alberdi y Facundo Quiroga" y luego bajar hasta el nuevo bloque con el `<h4>` "Facundo Quiroga: el hombre que conoció Alberdi".
- La `card-nota-historiografica` de BIOG-19 es un párrafo en texto corrido dentro de la card — no un collapsible ni un tooltip. Debe verse completa sin interacción adicional.
- La `card-nota-certeza` de BIOG-20 aparece **al final del contenido de la card**, antes del `<footer>`. Su propósito es establecer epistemic honesty sobre las limitaciones documentales del slice, no dudar de la existencia del encuentro Alberdi-Quiroga (que está establecido en BIOG-17).
- Si el browser open está en `file:///` en lugar de `http://localhost:`, la carga de imágenes de Wikimedia Commons puede comportarse diferente según el browser. Para pruebas confiables de imágenes, usar un servidor local.

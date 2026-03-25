# S05: El encuentro entre Alberdi y Facundo Quiroga — la carta — UAT

**Milestone:** M007
**Written:** 2026-03-22

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: el slice produce contenido HTML integrado en un sitio estático con animaciones runtime (reveal-on-scroll, sub-nav scroll-spy). La verificación requiere un servidor HTTP real, evaluación DOM en browser, y lectura visual del contenido narrativo. Los checks de shell (grep) prueban integridad estructural; el browser DOM prueba el registro en los sistemas de animación; la lectura narrativa prueba coherencia histórica.

## Preconditions

1. Servidor HTTP activo en `http://localhost:3000` sirviendo la raíz del worktree M007 (`npx serve -p 3000 -s .`)
2. `index.html` en estado post-S05: `grep -c 'data-certeza' index.html` → 52; `grep -c 'rev-alberdi-quiroga' index.html` → 3
3. Browser abierto en `http://localhost:3000` con la página cargada desde el inicio (no desde scroll mid-page — las animaciones reveal usan IntersectionObserver que registra elementos en load)

## Smoke Test

Navegar a `http://localhost:3000`, desplegar el sub-nav de la sección "Revolución e Independencia", verificar que aparece el link "1834–1835 / Alberdi y Quiroga" (6º link). Click en ese link → página scrollea a `#rev-alberdi-quiroga`. **Si el link existe y el scroll funciona, el slice básicamente funcionó.**

## Test Cases

### 1. Sub-nav tiene 6 links y el 6º apunta a #rev-alberdi-quiroga

1. Navegar a `http://localhost:3000`
2. Ejecutar en browser console: `document.querySelectorAll('.sub-nav .sub-nav__link').length`
3. Ejecutar: `document.querySelector('.sub-nav .sub-nav__link:last-child').getAttribute('href')`
4. Ejecutar: `document.querySelector('.sub-nav .sub-nav__link:last-child').textContent.trim()`
5. **Expected:** count=6; href="#rev-alberdi-quiroga"; texto contiene "1834" y "Alberdi y Quiroga"

### 2. Sub-período #rev-alberdi-quiroga existe en el DOM con 2 cards

1. Ejecutar: `document.querySelector('#rev-alberdi-quiroga') !== null`
2. Ejecutar: `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length`
3. Ejecutar: `document.querySelectorAll('#rev-alberdi-quiroga .event-card').length`
4. **Expected:** true; 2; 2

### 3. BIOG-17 contiene los elementos estructurales requeridos

1. Ejecutar: `document.querySelector('#BIOG-17').getAttribute('data-certeza')`
2. Ejecutar: `document.querySelector('#BIOG-17 img') !== null`
3. Ejecutar: `document.querySelector('#BIOG-17 .card-nota-certeza') !== null`
4. Ejecutar: `document.querySelector('#BIOG-17').textContent.includes('Heredia')`
5. Ejecutar: `document.querySelector('#BIOG-17').textContent.includes('1834')`
6. **Expected:** "hecho"; true (imagen de Quiroga presente); true (1 nota de certeza); true; true

### 4. BIOG-17 cita directa verificada presente

1. Ejecutar: `document.querySelector('#BIOG-17').textContent.includes('acogió')`
2. Navegar visualmente a `#rev-alberdi-quiroga`, leer BIOG-17
3. Verificar que el blockquote contiene la cita atribuida a *Obras Completas* de Alberdi
4. **Expected:** true; blockquote visible con «me acogió con mucha gracia»; atribución "Obras Completas" presente

### 5. BIOG-18 contiene exactamente 2 card-nota-certeza

1. Ejecutar: `document.querySelectorAll('#BIOG-18 .card-nota-certeza').length`
2. Ejecutar: `document.querySelector('#BIOG-18').textContent.includes('extraordinario')`
3. Ejecutar: `document.querySelector('#BIOG-18').textContent.includes('Banco')`
4. **Expected:** 2; true («ese hombre extraordinario»); true («orden contra el Banco»)

### 6. BIOG-18 tiene dos citas directas verificadas en blockquotes

1. Navegar visualmente a BIOG-18 haciendo scroll
2. Verificar que la card tiene dos blockquotes separados
3. Verificar que el primero atribuye «ese hombre extraordinario» a *Obras Completas*
4. Verificar que el segundo atribuye «restituirle su orden contra el Banco» a *Obras Completas*
5. **Expected:** 2 blockquotes visibles; ambos con atribución a Obras Completas; terminología "libranza" o "orden" usada (no "cheque")

### 7. Sistema reveal-on-scroll registró los nuevos elementos

1. Ejecutar: `document.querySelectorAll('.reveal').length`
2. Navegar a la página desde el inicio (scroll position = 0)
3. Hacer scroll hasta `#rev-alberdi-quiroga`
4. Verificar visualmente que BIOG-17 y BIOG-18 hacen fade-in/slide-in al entrar en el viewport
5. **Expected:** 73; animaciones de entrada visibles para ambas cards (no aparecen instantáneamente)

### 8. Sub-nav scroll-spy detecta #rev-alberdi-quiroga como sección activa

1. Hacer scroll hasta que `#rev-alberdi-quiroga` ocupe la parte superior del viewport
2. Observar el sub-nav sticky: el link "1834–1835 / Alberdi y Quiroga" debe tener la clase activa
3. Ejecutar: `document.querySelector('[href="#rev-alberdi-quiroga"]').classList.toString()`
4. **Expected:** la clase incluye `sub-nav__link--active` (o equivalente) cuando el sub-período es visible

### 9. Integridad estructural del sitio — sin regresiones

1. Ejecutar: `document.querySelectorAll('[data-certeza]').length`
2. Ejecutar: `document.querySelectorAll('.event-card').length`
3. Navegar a las secciones existentes (Colonial, 1800–1860, 1860–1900) y verificar que sus cards cargan normalmente
4. **Expected:** 52 total cards con data-certeza; sin cards desaparecidas en períodos anteriores; todos los períodos funcionan

### 10. Sin CSS ni JS nuevos introducidos

1. Ejecutar en shell: `git diff HEAD~1 --name-only | grep -E '\.css$|\.js$'`
2. Alternativamente: `git show --stat HEAD | grep -E '\.css|\.js'`
3. **Expected:** sin archivos `.css` ni `.js` modificados en el commit de S05 — solo `index.html`

## Edge Cases

### Carga con scroll ya posicionado en #rev-alberdi-quiroga

1. Navegar a `http://localhost:3000/#rev-alberdi-quiroga`
2. Observar BIOG-17 y BIOG-18
3. **Expected:** las cards aparecen sin animación (reveal-no-anim aplicado para elementos ya en viewport al cargar) — esto es comportamiento correcto documentado en KNOWLEDGE.md

### Click en sub-nav link desde posición alta en la página

1. Estar al inicio de la página (scroll position = 0)
2. Click en "1834–1835 / Alberdi y Quiroga" en el sub-nav
3. **Expected:** smooth scroll hasta `#rev-alberdi-quiroga`; la sección queda visible con BIOG-17 primero

### Coherencia narrativa: BIOG-17 vs SP2-2 (Quiroga como símbolo federal)

1. Leer SP2-2 (sub-período 2, card sobre Quiroga como símbolo del federalismo) — aparece en `#rev-1800-1820`
2. Leer BIOG-17 (la carta de Heredia y el encuentro)
3. **Expected:** SP2-2 es un perfil político/simbólico sin mención del encuentro con Alberdi; BIOG-17 es un episodio biográfico personal. Las dos cards no se contradicen ni se duplican.

### Cronología: BIOG-17/18 (1834) vs BIOG-11 (1835–1837)

1. Leer BIOG-11 (Fragmento Preliminar, 1835–1837) en `#rev-alberdi-formacion`
2. Leer BIOG-17/18 en `#rev-alberdi-quiroga`
3. **Expected:** 1834 precede a 1835 correctamente; el encuentro con Quiroga ocurre antes del Salón Literario y el Fragmento Preliminar — narrativa coherente y cronológicamente ordenada

## Failure Signals

- `document.querySelectorAll('.sub-nav .sub-nav__link').length` retorna 5 → el link del sub-nav no fue insertado
- `document.querySelector('#rev-alberdi-quiroga') === null` → el sub-período no existe en el DOM
- `grep -c 'data-certeza' index.html` < 52 → alguna card fue eliminada o la inserción falló
- `document.querySelectorAll('.reveal').length` < 73 → los nuevos elementos no se registraron en el IntersectionObserver
- `document.querySelectorAll('#BIOG-18 .card-nota-certeza').length` ≠ 2 → las notas de certeza de BIOG-18 están incompletas
- Cards aparecen sin las citas en blockquote → el HTML del excerpt no fue copiado correctamente desde el content draft
- Texto de BIOG-17 menciona "cheque" o "carta adicional" en vez de "orden contra el Banco" → error de terminología histórica

## Not Proven By This UAT

- Que el contenido de la carta de Heredia a Quiroga sea correcto (el contenido exacto no está en fuentes disponibles — documentado en card-nota-certeza)
- El perfil biográfico de Quiroga (quién era, su rol en las guerras civiles) — eso corresponde a S06
- Los motivos del rechazo del viaje a EE.UU. — eso corresponde a S07
- Que las citas de *Obras Completas* sean textualmente exactas respecto de la edición original impresa (verificadas contra múltiples fuentes secundarias concordantes, pero no contra el facsímil digital del tomo original)
- Comportamiento en mobile (375px) — el contenido sigue los mismos patrones responsive de S01–S04; no se introduce CSS nuevo, por lo que no hay regresión esperada pero no está explícitamente verificado aquí

## Notes for Tester

- La animación reveal de BIOG-17 tiene stagger delay 0ms y la de BIOG-18 tiene 80ms — la diferencia es perceptible pero sutil; es correcto que BIOG-17 aparezca levemente antes que BIOG-18 al hacer scroll.
- El sub-período `#rev-alberdi-quiroga` está posicionado cronológicamente en 1834, entre `#rev-alberdi-formacion` (que cierra con el regreso de Tucumán) y `#rev-1800-1820` (el período 1800–1820 más temprano que aparece después en el HTML por razones de estructura de períodos). Esta posición puede parecer "fuera de orden" pero es correcta respecto del diseño del sitio.
- La imagen de Quiroga (García del Molino) es la misma que aparece en SP2-2. Esto es intencional — la misma imagen puede aparecer en contextos narrativos distintos sin ser un error.
- `grep -c 'BIOG-1[78]' index.html` retorna 4 (no 2) porque incluye los 2 comentarios HTML `<!-- BIOG-17: ... -->`. Esto es correcto; el check de article elements es `grep -c 'id="BIOG-1[78]"' index.html` → 2.

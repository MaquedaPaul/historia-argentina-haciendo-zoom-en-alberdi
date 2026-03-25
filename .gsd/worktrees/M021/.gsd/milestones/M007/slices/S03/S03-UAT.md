---
id: S03
parent: M007
milestone: M007
uat_mode: artifact-driven + live-runtime
written: 2026-03-20
---

# S03: Regreso a Tucumán, Alejandro Heredia y vuelta a Buenos Aires (1833–1838) — UAT

**Milestone:** M007
**Written:** 2026-03-20

## UAT Type

- UAT mode: artifact-driven + live-runtime
- Why this mode is sufficient: El slice produjo HTML estático (artifact) y depende del sistema reveal-on-scroll (live-runtime IntersectionObserver). Los checks cuantitativos verifican integridad estructural; la verificación browser prueba el comportamiento dinámico; la lectura narrativa prueba coherencia histórica. Juntos son suficientes para un slice biográfico de contenido estático.

## Preconditions

1. Un servidor HTTP local debe estar corriendo desde el directorio raíz del worktree: `npx serve -l 8080 .` (o equivalente).
2. El browser debe cargar `http://localhost:8080` desde el inicio (no desde un anchor mid-page) para que el IntersectionObserver pueda registrar todos los elementos reveal correctamente.
3. Las DevTools del browser deben estar abiertas en la pestaña Console antes de cargar la página.
4. Los checks shell deben ejecutarse desde `C:\Users\gabri\Desktop\historia\.gsd\worktrees\M007`.

## Smoke Test

Ejecutar: `grep -c 'data-certeza' index.html`

**Resultado esperado:** `45`

Si devuelve 45, la integración de S03 está presente. Si devuelve <45, las cards BIOG-9/10/11 no están integradas correctamente.

---

## Test Cases

### 1. Verificación cuantitativa shell — integridad estructural

**Propósito:** Confirmar que los 3 bloques BIOG están presentes, los atributos son correctos, y no se modificaron archivos prohibidos.

```bash
grep -c 'data-certeza' index.html
grep 'BIOG-9\|BIOG-10\|BIOG-11' index.html | wc -l
grep -E 'Heredia|Fragmento preliminar' index.html | wc -l
grep '1810.*1838' index.html | wc -l
grep -c 'card-nota-certeza' index.html
git diff --name-only
node -e "const h=require('fs').readFileSync('index.html','utf8'); const n=(h.match(/data-certeza/g)||[]).length; if(n<45) process.exit(1); console.log('OK: '+n+' cards')"
```

**Resultados esperados:**
- `data-certeza`: **45**
- `BIOG-9|BIOG-10|BIOG-11`: **3**
- `Heredia|Fragmento preliminar`: **≥4** (resultado real: 23)
- `1810.*1838`: **≥1** (resultado real: 3)
- `card-nota-certeza`: **13**
- `git diff --name-only`: **vacío** (solo index.html en worktree; styles.css y app.js sin tocar)
- node exit gate: **exit 0**, output `OK: 45 cards`

### 2. Verificación del sistema reveal-on-scroll (browser — Capa 2)

**Propósito:** Confirmar que el IntersectionObserver registró las 3 cards nuevas y el puente narrativo.

1. Navegar a `http://localhost:8080` desde el inicio de la página.
2. Abrir DevTools → Console.
3. Buscar en los logs de consola la línea `[Reveal] Initialized with N elements`.
4. **Esperado:** `[Reveal] Initialized with 65 elements` (N = 65, que es ≥ 64).

5. Buscar en los logs: `[SubNav] Initialized with 5 sub-periods, 5 links`.
6. **Esperado:** exactamente `5 sub-periods, 5 links` — S03 no agrega sub-períodos nuevos; esta es una invariante.

7. En DevTools → Console, ejecutar: `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length`
8. **Esperado:** `11`

9. Ejecutar: `document.querySelectorAll('.card-nota-certeza').length`
10. **Esperado:** `13`

11. Ejecutar: `document.querySelectorAll('.reveal').length`
12. **Esperado:** `65`

### 3. Presencia y contenido de BIOG-9 — Regreso a Tucumán

**Propósito:** Confirmar que la card de regreso a Tucumán está integrada con el contenido correcto.

1. Navegar a `http://localhost:8080`.
2. Usar CTRL+F en el browser para buscar "El regreso a la tierra natal".
3. **Esperado:** El texto aparece en una card dentro del sub-período "Alberdi: Los años de formación (1810–1838)".

4. En DevTools → Console: `document.querySelector('[data-comment="BIOG-9"]')` — alternativamente inspeccionar el DOM en la sección `#rev-alberdi-formacion` y localizar el comentario `<!-- BIOG-9 -->`.
5. **Esperado:** La card siguiente al comentario tiene `class` que incluye `card-hecho`, `reveal`, `reveal-slide`, y `style` con `--reveal-delay: 640ms`.

6. Verificar que la card contiene una `<span class="card-nota-certeza">` visible sobre las cuestiones sucesorias.
7. **Esperado:** Texto con nota de certeza presente dentro del cuerpo de la card.

8. Verificar que la card tiene un elemento `<cite>` con referencia a fuente.
9. **Esperado:** Cita bibliográfica presente (mínimo una fuente secundaria).

### 4. Presencia y contenido de BIOG-10 — Alejandro Heredia

**Propósito:** Confirmar que la card de Heredia está integrada como `card-hecho` (no `card-opinion`) con los hechos correctos.

1. Buscar "Alejandro Heredia" con CTRL+F en el browser.
2. **Esperado:** Al menos una card con el título que menciona "Heredia" y el subtítulo "caudillo ilustrado" o equivalente.

3. Inspeccionar la card: debe tener `data-certeza="hecho"` (no `opinión`).
4. **Esperado:** `data-certeza="hecho"`.

5. Buscar en el texto de la card las fechas: "14 de enero de 1832", "25 de mayo de 1836", "12 de noviembre de 1838".
6. **Esperado:** Las tres fechas presentes (gobernador, reelección, asesinato).

7. Verificar que la card contiene una `<span class="card-nota-certeza">` sobre el vínculo pedagógico.
8. **Esperado:** Nota de certeza visible sobre el calificativo de "mecenazgo" o el vínculo con Alberdi.

9. Verificar el stagger delay: `--reveal-delay: 720ms`.
10. **Esperado:** Valor correcto en el atributo `style` del elemento.

### 5. Presencia y contenido de BIOG-11 — Fragmento preliminar y vuelta a Buenos Aires

**Propósito:** Confirmar que la card del retorno definitivo y el Fragmento preliminar está integrada correctamente.

1. Buscar "Fragmento preliminar" con CTRL+F.
2. **Esperado:** Al menos una card en `#rev-alberdi-formacion` con ese texto (distinta de cualquier mención en el sub-período 1820–1835).

3. Verificar que la card menciona "Imprenta de la Libertad" y "1837".
4. **Esperado:** Ambas referencias presentes.

5. Verificar que la card tiene `data-certeza="hecho"` y `--reveal-delay: 800ms`.
6. **Esperado:** Ambos valores correctos.

7. Verificar que la card tiene `<span class="card-nota-certeza">` sobre la distinción tesis/obra independiente.
8. **Esperado:** Nota de certeza visible.

### 6. Puente narrativo al cierre del sub-período biográfico

**Propósito:** Confirmar que el blockquote de cierre está presente y usa la cita correcta del Fragmento preliminar.

1. Scrollear hasta el final del sub-período "Alberdi: Los años de formación (1810–1838)".
2. **Esperado:** Un `<blockquote class="alberdi-quote">` visible después de las cards BIOG y antes del siguiente sub-período.

3. Verificar que el texto del blockquote contiene: "Los pueblos, como los hombres, no tienen alas; hacen sus jornadas a pie, y paso a paso".
4. **Esperado:** Cita exacta presente.

5. Buscar con CTRL+F "paso a paso" en todo el sitio.
6. **Esperado:** Exactamente **una** aparición (el puente narrativo de S03 solamente; no debe duplicarse en ningún otro blockquote).

7. Verificar la atribución del blockquote: debe citar el *Fragmento preliminar al estudio del Derecho* (1837).
8. **Esperado:** Atribución correcta visible.

### 7. Título del sub-período y sub-nav actualizados a 1810–1838

**Propósito:** Confirmar que el alcance del sub-período biográfico refleja la expansión de S03.

1. En DevTools → Console: `document.querySelector('#rev-alberdi-formacion h3').textContent`
2. **Esperado:** El texto incluye "1810–1838" (no "1810–1824").

3. Inspeccionar el sub-nav de `#periodo-revolucion`:
   `document.querySelector('.sub-nav a[href="#rev-alberdi-formacion"]').textContent`
4. **Esperado:** El texto del link incluye "1810–1838".

5. Visualmente: hacer scroll a la sección `#periodo-revolucion` y verificar que el sub-nav sticky muestra el primer link con "1810–1838 LOS AÑOS DE FORMACIÓN" (o equivalente).
6. **Esperado:** Label actualizado, no "1810–1824".

### 8. Coherencia narrativa BIOG-8 → BIOG-9 (punto de sutura cronológico)

**Propósito:** Confirmar que la transición entre el grado de Córdoba (BIOG-8) y el regreso a Tucumán (BIOG-9) es coherente sin contradicción.

1. Leer en secuencia el contenido de BIOG-8 y BIOG-9 en el browser.
2. **Esperado:** BIOG-8 menciona el grado obtenido en Córdoba el 24 de mayo de 1834; BIOG-9 abre con ese mismo evento como punto de partida para el regreso a Tucumán. Sin salto cronológico ni contradicción.

### 9. No duplicación con el Salón Literario (SP2-4)

**Propósito:** Confirmar que BIOG-11 no duplica el contenido del Salón Literario ya existente en el sub-período 1820–1835.

1. Navegar al sub-período `#rev-1820-1835` y leer las cards SP2-4 sobre el Salón Literario de 1837.
2. Volver al sub-período `#rev-alberdi-formacion` y leer BIOG-11.
3. **Esperado:** BIOG-11 narra la **génesis biográfica** del *Fragmento preliminar* (viaje de regreso, decisión de publicar); SP2-4 usa el *Fragmento* como documento ideológico de la Generación del 37. Ángulos distintos, sin párrafos repetidos ni frases idénticas.

4. Buscar con CTRL+F el inicio de la cita SP2-4 en BIOG-11.
5. **Esperado:** La cita específica de SP2-4 no aparece dentro de BIOG-11.

---

## Edge Cases

### Reveal sin animación en BIOG-9 al navegar por anchor

Si el usuario navega directamente a `#rev-alberdi-formacion` (por URL con anchor o por click en sub-nav), BIOG-9 puede recibir `reveal--no-anim` en lugar de `reveal--visible` — porque el scroll instantáneo lleva el elemento al viewport antes de que el IntersectionObserver dispare el animation threshold.

1. Navegar a `http://localhost:8080/#rev-alberdi-formacion`.
2. **Esperado:** BIOG-9 es visible (no oculto) pero puede no tener la animación de entrada. Esto es comportamiento correcto del sistema "catch-up" de Reveal — el elemento se muestra inmediatamente sin animación. **No es un defecto.**

### Citas alberdi-quote sin duplicados

1. En DevTools → Console: `document.querySelectorAll('.alberdi-quote').length`
2. **Esperado:** ≥ 2 blockquotes en el documento (el original anterior a S03 + el nuevo de cierre).
3. Verificar manualmente que los textos de los blockquotes son distintos entre sí.
4. **Esperado:** Ningún blockquote duplica el texto de otro.

### Conteo de card-nota-certeza no regresiona

1. En DevTools: `document.querySelectorAll('.card-nota-certeza').length`
2. **Esperado:** 13 (el baseline de S02 era 10; S03 agregó 3 — una por cada nueva card BIOG-9/10/11).
3. Si devuelve < 13, alguna `card-nota-certeza` fue removida por error o la inserción fue parcial.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` devuelve < 45 → integración incompleta o cards duplicadas removidas.
- `[Reveal] Initialized with N elements` con N < 65 → alguna card nueva no tiene las clases `reveal reveal-slide` correctas.
- `querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` devuelve < 11 → una o más cards de BIOG-9/10/11 están fuera del contenedor correcto o tienen `data-certeza` ausente.
- El título del sub-período todavía dice "1810–1824" → la actualización no se aplicó.
- La cita "paso a paso" aparece más de una vez en el documento → duplicación del puente narrativo.
- `styles.css` o `app.js` aparecen en `git diff --name-only` → regresión — no deben modificarse.
- La consola muestra errores JS (no el 404 preexistente de imagen externa) → posible corrupción del HTML al insertar las cards.

---

## Not Proven By This UAT

- Que las imágenes de BIOG-9/10/11 cargan correctamente — las cards no incluyen imágenes; la URL del thumb de Heredia no fue verificada con HTTP request.
- Que el reveal-on-scroll funciona en dispositivos móviles reales (solo verificado en desktop en el gate T03).
- Que el contenido es suficientemente profundo para un lector experto en historia argentina — esto requiere revisión humana (UAT humano).
- Que las fuentes citadas en el HTML son accesibles en línea actualmente — solo se verificó que las fuentes son publicaciones reconocidas con URLs plausibles.
- Que el sitio funciona sin JavaScript habilitado (progressive enhancement no fue el foco de este slice).

---

## Notes for Tester

- El único error en consola que puede aparecer es un **404 de imagen de Wikipedia** — este error preexiste a S03 y no afecta funcionalidad. El handler `[Images] Fallback handlers set for 33 card images` lo cubre con placeholders. No es un defecto de este slice.
- Al hacer scroll desde el inicio hasta `#rev-alberdi-formacion`, las cards BIOG-1 a BIOG-11 deben revelar en secuencia con animaciones stagger. Si alguna card aparece sin animación pero con contenido visible, puede deberse a que entró al viewport antes de que el threshold del IntersectionObserver se alcanzara — esto es correcto.
- Para verificar la coherencia narrativa completa (Capa 3), leer las cards en orden: BIOG-1 (nacimiento 1810) → BIOG-2 (familia paterna) → BIOG-3 (hermanos) → BIOG-4 (doble orfandad ca. 1812/1822) → BIOG-5 (viaje a Buenos Aires 1824) → BIOG-6 (salida del internado ca. 1827) → BIOG-7 (primer empleo, tienda de Maldes) → BIOG-8 (grado en Córdoba 24 mayo 1834) → BIOG-9 (regreso a Tucumán 1834) → BIOG-10 (Heredia 1832–1838) → BIOG-11 (vuelta a Buenos Aires, Fragmento 1837). La secuencia debe ser cronológicamente coherente sin saltos ni contradicciones.
- El sub-período `#rev-alberdi-formacion` no es cronológicamente el primero en el DOM — puede aparecer antes o después de otros sub-períodos del período 1800–1860. El sub-nav provee la orientación necesaria.

# S04: Alberdi multifacético — periodista, abogado, economista, músico

**Goal:** Investigar, verificar e integrar en `index.html` un bloque temático (no cronológico) que presente las cinco facetas de Alberdi: periodista y escritor, abogado, economista, músico y compositor, y escritor/pensador en el exilio. Cada faceta tiene su card con obras concretas, fechas y citas verificadas.
**Demo:** El visitante puede leer 5 cards temáticas sobre las distintas dimensiones de Alberdi — con títulos de obras reales, fechas precisas y citas directas — presentadas como un bloque "Las múltiples dimensiones de Alberdi" dentro de `#rev-alberdi-formacion`, que complementa la narrativa cronológica de S01–S03 y completa el perfil del hilo conductor.

## Must-Haves

- Card **hecho**: Alberdi periodista y escritor — *El Iniciador* (Montevideo, 1838, co-fundado con Miguel Cané), seudónimo "Figarillo", artículos costumbristas en estilo satírico-ilustrado. ≥2 fuentes.
- Card **hecho**: Alberdi abogado — ejercicio en Buenos Aires y Valparaíso; derecho como herramienta política; su rol como representante diplomático de la Confederación en Europa (1855). ≥2 fuentes.
- Card **hecho** o **hecho + card-nota-certeza**: Alberdi economista — *Sistema económico y rentístico de la Confederación Argentina según su Constitución de 1853* (1854, Besanzón); principios de libre mercado, inmigración y capital extranjero; carácter de primer tratado económico sistemático argentino. ≥2 fuentes.
- Card **hecho**: Alberdi músico y compositor — *Ensayo sobre un método nuevo para aprender a tocar la guitarra con la mayor facilidad* (1832, primer método de guitarra publicado en el Río de la Plata); tocaba guitarra y fortepiano; papel de la música en su vida social. Composiciones específicas con `card-nota-certeza` si no están verificadas directamente. ≥2 fuentes.
- Card **opinión**: Alberdi escritor/pensador en el exilio — *Bases* (1852) como cumbre de su producción; *El crimen de la guerra* (escrito ca. 1870, póstumo 1895); paradoja de diseñar la república desde afuera. Atribuida a historiadores, no presentada como hecho puro. ≥2 fuentes.
- Las 5 cards forman un bloque separado dentro de `#rev-alberdi-formacion` con un `<h4>` descriptivo y un nuevo `<div class="events-grid events-grid--certeza">`. Los stagger delays arrancan en `80ms` (reset desde el final de BIOG-11 a 800ms).
- Ninguna imagen de Alberdi se duplica — el mismo thumb URL no puede aparecer en más de un lugar del archivo. Usar imagen solo si se puede incorporar sin duplicar la URL ya presente en las líneas 862, 1076 y 1519.
- No se introduce CSS ni JS nuevo — se reusan todos los estilos y patrones existentes.

## Proof Level

- This slice proves: integration + content completeness
- Real runtime required: yes (browser verify del reveal system)
- Human/UAT required: yes (el usuario verifica que el perfil multifacético es históricamente sólido)

## Verification

- `grep -c 'data-certeza' index.html` → ≥50 (baseline post-S03: 45; +5 cards S04 = 50 mínimo).
- `grep 'Iniciador\|Sistema económico\|guitarra\|Figarillo\|rentístico' index.html | wc -l` → ≥3 matches.
- `grep -c 'card-nota-certeza' index.html` → ≥13 (invariante; puede aumentar si hay composiciones musicales no verificadas).
- `node -e "const fs=require('fs'); const html=fs.readFileSync('index.html','utf8'); const n=html.match(/data-certeza/g)?.length||0; if(n<50){console.error('FAIL: data-certeza='+n+' < 50'); process.exit(1);} console.log('OK: data-certeza='+n);"` → exit 0.
- Pre-flight check: `grep -c 'BIOG-12\|multifacético\|Iniciador\|rentístico' index.html` → 0 antes de T02 (confirma que la integración no está duplicada).
- Browser: `[Reveal] Initialized with N elements` donde N ≥ 70 (baseline: 65; +1 h4-container o sub-bloque + 5 cards = +6 mínimo).
- Browser: `[SubNav] Initialized with 5 sub-periods, 5 links` — invariante; S04 no agrega sub-períodos nuevos.
- Browser: `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` → ≥16 (baseline: 11 de S01–S03 + 5 nuevas).
- Failure-path check: si `grep -c 'data-certeza' index.html` es igual al baseline (45) después de T02, la integración falló silenciosamente — usar `grep -n 'Iniciador\|rentístico' index.html` para localizar dónde faltó la inserción.

## Observability / Diagnostics

- Runtime signals: `[Reveal] Initialized with N elements` en JS console del browser — N debe aumentar de 65 a ≥71 (65 baseline + 1 nuevo events-grid div + 5 cards, si el div tiene clase `reveal`; o 65 + 5 = 70 si el contenedor h4/grid no lleva `reveal`). Usar el valor exacto observado en T02 como baseline para T03.
- Inspection surfaces:
  - `grep -c 'data-certeza' index.html` → conteo de cards totales (primario)
  - `grep -n 'multifacético\|Iniciador\|rentístico\|Figarillo\|guitarra' index.html` → localización de las 5 cards en el archivo
  - `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` en DevTools → verifica que las cards están dentro del sub-período correcto
  - `document.querySelectorAll('.card-nota-certeza').length` → verifica que los flags de certeza no regresaron
- Failure visibility: si N (reveal count) no aumenta, las nuevas cards no tienen clase `reveal reveal-slide` — inspectar HTML raw con `grep -n 'reveal-slide' index.html | tail -10`. Si `data-certeza` count no sube, la inserción Node.js falló (ancla incorrecta o CRLF split error).
- Redaction constraints: none (sitio estático, sin secretos ni PII)

## Integration Closure

- Upstream surfaces consumed: `index.html` (estado post-S03: 45 cards, 65 reveal elements, 13 card-nota-certeza, BIOG-11 en línea ~599); `S04-CONTENT-DRAFT.md` (producido en T01); patrón CRLF-safe Node.js splice (documentado en KNOWLEDGE.md)
- New wiring introduced in this slice: nuevo `<h4>` + `<div class="events-grid events-grid--certeza">` dentro de `#rev-alberdi-formacion`, insertado entre el `</div>` que cierra el grid cronológico y el `<!-- Puente narrativo -->` (línea ~629–630); las 5 cards nuevas usan las mismas clases CSS y el mismo reveal observer — zero JS wiring adicional
- What remains before the milestone is truly usable end-to-end: nothing — S04 es el cierre del arco biográfico de M007; S05–S08 son slices separados sobre Quiroga

## Tasks

- [x] **T01: Investigar y redactar borrador verificado de las 5 facetas** `est:2h`
  - Why: La faceta musical requiere verificación específica de títulos de obras (el método de guitarra de 1832 y composiciones). El *Sistema económico* necesita datos editoriales exactos. Sin fuentes verificadas no hay card-hecho posible. El borrador es el artefacto que hace que T02 sea mecánico, no creativo.
  - Files: `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` (crear)
  - Do:
    1. **Periodista**: Buscar fuentes para *El Iniciador* (Montevideo, 1838). Confirmar co-fundador: Miguel Cané (padre, 1812–1863). Confirmar seudónimo "Figarillo" (homenaje a Mariano José de Larra). Buscar al menos un título de artículo notable. Fuentes a usar: elhistoriador.com.ar, Wikipedia ES/EN, JURSOC UNLP.
    2. **Abogado**: Confirmar ejercicio profesional en Buenos Aires pre-1838. Confirmar ejercicio en Valparaíso. Verificar su nombramiento como representante diplomático de la Confederación Argentina en Europa (1855, acreditado ante Francia, Gran Bretaña y España). Citar Mayer o equivalente. Documentar su visión del derecho como herramienta política (se puede citar el *Fragmento* 1837 o las *Bases* 1852 como evidencia).
    3. **Economista**: Confirmar título exacto: *Sistema económico y rentístico de la Confederación Argentina según su Constitución de 1853*, Besanzón (Besançon), 1854. Resumir tres ideas centrales verificadas (libre comercio, inmigración, capital extranjero). Confirmar su carácter de primer tratado económico sistemático argentino. Fuentes: elhistoriador.com.ar, Wikipedia, cadep.ufm.edu.
    4. **Músico**: Verificar título exacto del método de guitarra de 1832 y afirmación de que es el "primero publicado en el Río de la Plata". Confirmar que tocaba guitarra y fortepiano. Buscar títulos de composiciones específicas; si no están documentados directamente, marcar con `[VERIFICAR ATRIBUCIÓN]` y clasificar con `card-nota-certeza` en el borrador. Fuentes: lagaceta.com.ar, institutojuanbautistaalberdi.net.ar, Wikipedia.
    5. **Escritor/pensador**: Síntesis breve sobre *Bases* (1852) + *El crimen de la guerra* (escrito ca. 1870, póstumo 1895) + el rol del exilio en su producción. No duplicar lo ya cubierto en las cards SP2-4, SP3-X, BIOG-11 ni en los alberdi-quote existentes. Enfocar en el meta-argumento (el exilio como condición de su escritura más libre) atribuido a historiadores.
    6. Escribir borrador estructurado con 5 secciones: Bloque BIOG-12 a BIOG-16 (numeración sugerida; confirmar si hay una BIOG-12 ya en el sitio). Para cada bloque: certeza, excerpt (3–5 oraciones), fuentes (≥2), cite reference, notas de imagen (no forzar si no hay imagen libre de duplicación).
    7. Documentar explícitamente qué citas de `alberdi-quote` ya existen (hay 6 en el sitio) para asegurarse de que ninguna card nueva use una cita ya presente como blockquote.
  - Verify: `test -f .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md && wc -l .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` → archivo existe con ≥80 líneas; `grep -c '## Bloque\|## BIOG' .gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` → ≥5 secciones.
  - Done when: borrador completo con 5 facetas, ≥2 fuentes por faceta, composiciones musicales no verificadas marcadas con `[VERIFICAR ATRIBUCIÓN]`, ninguna síntesis presentada como cita directa no atribuida.

- [x] **T02: Integrar las 5 cards de facetas en index.html** `est:1.5h`
  - Why: Cierra la integración HTML de S04 — las 5 cards deben estar en el DOM con las clases correctas para que el reveal system y el sub-nav las reconozcan sin JS adicional.
  - Files: `index.html`
  - Do:
    1. **Pre-flight check**: `grep -c 'multifacético\|Iniciador\|rentístico\|Figarillo' index.html` → debe ser 0. Si es >0, la integración ya está aplicada — verificar corrección y saltar al paso de verificación.
    2. **Localizar punto de inserción**: buscar `<!-- Puente narrativo: cierre de #rev-alberdi-formacion` (línea ~630). El bloque multifacético se inserta ANTES de ese comentario, DESPUÉS del `</div>` que cierra el events-grid cronológico (~línea 628). La estructura es: `</div>` (cierra grid BIOG-1..11) → INSERTAR AQUÍ → `<!-- Puente narrativo -->`.
    3. **Escribir el HTML de las 5 cards** a un archivo temp (`/tmp/s04-cards.html`) usando la herramienta Write (evitar heredoc per KNOWLEDGE.md). El bloque debe contener:
       - `<h4 class="sub-period__subtitle">Las múltiples dimensiones de Alberdi</h4>`
       - `<div class="events-grid events-grid--certeza" aria-label="Las múltiples dimensiones de Alberdi">` 
       - 5 articles con las clases apropiadas (card-hecho/card-opinion), `data-certeza`, `reveal reveal-slide`, stagger delays `80ms / 160ms / 240ms / 320ms / 400ms`
       - `</div>` (cierra el nuevo grid)
    4. **Insertar con Node.js CRLF-safe**: leer `index.html` con `fs.readFileSync(path,'utf8')`, split con `\r\n`, encontrar el índice de la línea que contiene `<!-- Puente narrativo: cierre`, insertar las nuevas líneas antes de esa línea, rejoin con `\r\n`, write back. (Ver KNOWLEDGE.md: "Node.js Line-Split/Splice for CRLF HTML Files").
    5. **Verificar la inserción**: `grep -c 'data-certeza' index.html` → ≥50; `grep 'Iniciador\|rentístico' index.html | wc -l` → ≥1 cada uno.
    6. **No duplicar imágenes**: si alguna card de facetas incluye imagen del retrato de Alberdi, usar una URL distinta a `Juan_Bautista_Alberdi.jpg` (líneas 862, 1076) y a `Flickr_-_bastique_-_Portrait_of_Juan_Bautista_Alberdi.jpg` (línea 1519). Preferir omitir imagen en las cards temáticas si no hay una nueva URL verificada.
    7. **Verificar certeza attribute**: todas las cards nuevas deben tener `data-certeza="hecho"` o `data-certeza="opinion"` — sin acentos inconsistentes (per KNOWLEDGE.md sobre normalización de `data-certeza`).
  - Verify: `grep -c 'data-certeza' index.html` → ≥50; `grep -c 'BIOG-1[2-6]\|multifacético' index.html` → ≥1; `node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<50){process.exit(1);}console.log('OK:'+n);"` → exit 0.
  - Done when: 5 cards integradas; stagger 80–400ms correcto; no imagen duplicada; `data-certeza` ≥50.

- [x] **T03: Gate de triple verificación y cierre del milestone M007** `est:1h`
  - Why: S04 es el último slice del arco biográfico de M007 (S01–S04). El gate verifica que los 16 bloques biográficos (BIOG-1 a BIOG-11 cronológicos + 5 facetas temáticas) forman un perfil coherente, que ninguna card preexistente fue alterada, y que el sitio navega sin regresiones.
  - Files: `index.html` (solo lectura en T03 salvo correcciones)
  - Do:
    1. **Capa 1 — Shell checks**:
       - `grep -c 'data-certeza' index.html` → ≥50
       - `grep 'Iniciador\|rentístico\|Figarillo\|guitarra.*método\|Sistema económico' index.html | wc -l` → ≥4
       - `grep -c 'card-nota-certeza' index.html` → ≥13
       - `grep -n 'BIOG-1[2-6]' index.html | wc -l` → ≥5 (o buscar el marcador equivalente usado en T02)
       - `git diff --name-only` → debe incluir `index.html` pero NO `styles.css`, NO `app.js`
    2. **Capa 2 — Browser checks** (servir con `npx http-server . -p 8080 -c-1` si disponible, o abrir directamente como file://):
       - Navegar a `#rev-alberdi-formacion`, verificar en consola: `[Reveal] Initialized with N elements` → N ≥ 70
       - `[SubNav] Initialized with 5 sub-periods, 5 links` → invariante
       - `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` → ≥16
       - `.querySelectorAll('.card-nota-certeza').length` → ≥13
       - Las 5 cards temáticas hacen reveal al scrollear (verificar visualmente con reveal animado)
       - Failure-path check: si N < 70, inspeccionar `grep -n 'reveal reveal-slide' index.html | tail -10` para verificar que las nuevas cards tienen las clases correctas
    3. **Capa 3 — Coherencia narrativa**: leer el sub-período biográfico completo en el browser:
       - BIOG-1 a BIOG-11 fluyen cronológicamente sin gaps ni contradicciones
       - El bloque "Las múltiples dimensiones de Alberdi" aparece después de BIOG-11 como cierre temático natural
       - El puente narrativo (`alberdi-quote` con "Los pueblos, como los hombres, no tienen alas…") sigue siendo el cierre hacia el Salón Literario — no fue alterado ni duplicado
       - Ninguna card temática de S04 contradice o duplica a BIOG-7 (música mencionada brevemente), BIOG-8 (derecho), o BIOG-11 (*Fragmento*)
       - Las 6 citas `alberdi-quote` existentes no están duplicadas en las nuevas cards
    4. **Correcciones**: si algún check falla, aplicar la corrección mínima necesaria antes de declarar T03 completado.
    5. **Actualizar S04-CONTENT-DRAFT.md**: añadir un Apéndice T03 con los resultados del gate (tabla de checks como se hizo en S01–S03).
  - Verify: `node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<50){console.error('FAIL:'+n);process.exit(1);}console.log('OK:'+n);"` → exit 0; `grep -c 'card-nota-certeza' index.html` → ≥13; `git diff --name-only` muestra `index.html` pero no `styles.css` ni `app.js`.
  - Done when: 15 checks en 3 capas pasan; S04-CONTENT-DRAFT.md tiene Apéndice T03; ninguna regresión en el sitio; M007 completo (11 bloques cronológicos + 5 temáticos = 16 bloques biográficos de Alberdi en el sitio).

## Files Likely Touched

- `index.html` — inserción de 5 cards temáticas dentro de `#rev-alberdi-formacion`
- `.gsd/milestones/M007/slices/S04/S04-CONTENT-DRAFT.md` — borrador verificado (nuevo en T01, Apéndice T03 en T03)

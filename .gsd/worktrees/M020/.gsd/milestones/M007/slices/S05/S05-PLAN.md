# S05: El encuentro entre Alberdi y Facundo Quiroga — la carta

**Goal:** El sitio narra cuándo y cómo se conocieron Alberdi y Juan Facundo Quiroga (oct–nov 1834, Buenos Aires), en qué circunstancias Alberdi le entregó una carta de recomendación de Alejandro Heredia, y qué significaron esas visitas repetidas para ambos — incluyendo el ofrecimiento de Quiroga de financiar un viaje a EE.UU. y la devolución del dinero por Alberdi al día siguiente. Hechos verificados con fuentes primarias. Certeza explícita.
**Demo:** Navegar al sitio → ir al sub-nav → hacer click en "1834–1835 Alberdi y Quiroga" → scroll al sub-período `#rev-alberdi-quiroga` → ver 2 cards (BIOG-17: la carta de Heredia y el encuentro; BIOG-18: las conversaciones y el ofrecimiento) con `data-certeza="hecho"`, citas directas de *Obras Completas*, card-nota-certeza donde corresponde, y animate reveal-on-scroll funcional.

## Must-Haves

- Sub-nav añade un 6º link: `href="#rev-alberdi-quiroga"` con label "1834–1835 / Alberdi y Quiroga"
- Nuevo sub-período `<div id="rev-alberdi-quiroga">` con 2 cards `data-certeza="hecho"` (BIOG-17 y BIOG-18) insertado DESPUÉS del cierre de `#rev-alberdi-formacion` y ANTES de `#rev-1800-1820`
- BIOG-17 cubre: Felipe Alberdi solicitó la carta a Heredia; Alberdi la entregó a Quiroga en BA oct–nov 1834; Quiroga la recibió favorablemente. Imagen: retrato de Quiroga (`Facundo_Quiroga_por_García_del_Molino.jpg`). card-nota-certeza: contenido exacto de la carta no reproducido en fuentes
- BIOG-18 cubre: visitas repetidas, conversaciones ajenas a la política, fascinación intelectual de Alberdi ("ese hombre extraordinario"), ofrecimiento de viaje a EE.UU., devolución de la "orden contra el Banco" al día siguiente. Dos citas directas verificadas de *Obras Completas*. card-nota-certeza: motivos del rechazo se desarrollan en S07
- Ningún CSS ni JS nuevo — cero archivos de estilo o script modificados
- `S05-CONTENT-DRAFT.md` creado con hechos verificados, fuentes citadas, citas directas exactas, y notas de certeza para cada card

## Proof Level

- This slice proves: integration (contenido verificado + HTML integrado + runtime animations funcionales)
- Real runtime required: yes (browser verify reveal-on-scroll y sub-nav scroll-spy)
- Human/UAT required: no (triple gate automatiza la verificación)

## Verification

```bash
# Shell — capa 1
grep -c 'data-certeza' index.html                    # → ≥52 (50 baseline + 2 nuevas)
grep -c 'BIOG-1[78]' index.html                      # → 2
grep -c 'rev-alberdi-quiroga' index.html             # → ≥2 (sub-nav link + div id)
grep -q 'Heredia\|carta.*recomend' index.html && echo OK
grep -q 'orden contra el Banco\|hombre extraordinario' index.html && echo OK
grep -q '1834\|octubre' index.html && echo OK
node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<52){process.exit(1);}console.log('OK:'+n);"  # → exit 0

# Browser DOM — capa 2 (browser_evaluate)
# document.querySelectorAll('.reveal').length            → ≥73 (70 baseline + 3: 1 sub-period + 2 cards)
# document.querySelectorAll('.sub-nav .sub-nav__link').length → 6
# document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length → 2
# document.querySelector('#rev-alberdi-quiroga') !== null → true
# document.querySelectorAll('#BIOG-18 .card-nota-certeza').length → 2
# document.querySelectorAll('#BIOG-17 .card-nota-certeza').length → 1

# Coherencia narrativa — capa 3 (manual)
# BIOG-17/18 no contradicen la mención de Quiroga en SP2-2 (símbolo del federalismo)
# Las fechas 1834–1835 no se superponen con BIOG-11 (1835–1837, Fragmento preliminar)
# Las citas directas en BIOG-18 no duplican ninguno de los 6 alberdi-quote existentes
# La imagen de Quiroga en BIOG-17 y en SP2-2 son la misma URL — verificar que son sub-períodos distintos (OK por construcción)
# git en estado limpio después del commit final

# Failure-path diagnostics (inspectable shell state):
# grep -n 'rev-alberdi-quiroga' index.html
#   → si retorna 0 líneas: bloque no insertado; revisar línea âncla con grep -n 'rev-alberdi-formacion' index.html
#   → si retorna 1 línea: solo sub-nav o solo div, verificar ambas inserciones por separado
# grep -c 'data-certeza' index.html < 52 → si hay 50 (baseline), inserción no ocurrió; si hay 51, solo una card fue insertada
# node -e "const t=require('fs').readFileSync('index.html','utf8');if(t.match(/\r\r/g)){console.error('CRLF DOBLE');process.exit(1);}console.log('CRLF OK');"
#   → detecta doble-CRLF que resulta de heredoc en lugar de Node.js CRLF-safe splice
```

## Observability / Diagnostics

- Runtime signals: `document.querySelectorAll('.sub-nav .sub-nav__link').length → 6` confirma que el sub-nav registró el nuevo link; `document.querySelectorAll('.reveal').length → ≥73` confirma que el IntersectionObserver registró los nuevos elementos. Nota: usar `browser_evaluate` en lugar de esperar `console.debug` — el runtime de app.js usa `console.debug` que no es capturado por Playwright (ver KNOWLEDGE.md)
- Inspection surfaces: `grep -c 'data-certeza' index.html` (métrica primaria, debe ser ≥52); `grep -n 'rev-alberdi-quiroga' index.html` (localización — debe aparecer ≥2 veces: sub-nav línea ~328, div id línea ~736, comentario cierre ~848)
- Failure visibility:
  - `data-certeza < 52` post-integración: inserción falló — verificar línea âncla con `grep -n 'rev-alberdi-formacion' index.html`
  - SubNav muestra 5/5 (no 6/6): link del sub-nav tiene clase incorrecta o está fuera del `<nav class="sub-nav">`
  - `grep -c 'rev-alberdi-quiroga' index.html` = 1 (no ≥2): sub-nav link insertado pero no el sub-período (o viceversa) — inspectar ambas inserciones por separado
  - CRLF doble: `node -e "const t=require('fs').readFileSync('index.html','utf8');if(t.match(/\r\r/g)){process.exit(1);}console.log('CRLF OK');"` — detecta corrupción por heredoc
- Redaction constraints: none

## Integration Closure

- Upstream surfaces consumed: `index.html` (anchor: `</div><!-- /#rev-alberdi-formacion -->` en línea ~730; sub-nav link de `#rev-alberdi-formacion` en línea ~327); patrones de card existentes (card-hecho, card-nota-certeza); imagen Quiroga ya cargada en línea ~904
- New wiring introduced: sub-nav link `#rev-alberdi-quiroga` + sub-período div correspondiente; BIOG-17 y BIOG-18 como nuevas entidades en el contenido del sitio
- What remains before the milestone is truly usable end-to-end: S06 (perfil de Quiroga y entorno), S07 (rechazo del viaje), S08 (textos leídos por Quiroga)

## Tasks

- [x] **T01: Redactar S05-CONTENT-DRAFT.md con BIOG-17 y BIOG-18 verificados** `est:1h`
  - Why: Separar la investigación histórica (riesgo alto) de la integración HTML (riesgo bajo) — patrón establecido en S01–S04. El borrador es el artefacto de alta calidad que el task de integración copia mecánicamente.
  - Files: `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md`
  - Do: Estructurar el draft con dos secciones (BIOG-17 y BIOG-18) siguiendo el formato establecido: Título → Fecha → Certeza → Excerpt HTML listo para copiar → Citas directas verificadas → Fuentes (≥2 por card) → Notas de certeza. Los hechos clave y citas directas están en S05-RESEARCH.md — usar esa investigación; no inventar nuevas citas. La card-nota-certeza de BIOG-17 aclara que el contenido exacto de la carta de Heredia no está reproducido en las fuentes. La card-nota-certeza de BIOG-18 aclara que los motivos del rechazo del viaje se desarrollan en S07. La "orden contra el Banco" se nombra como libranza/giro bancario (no "cheque" ni "carta adicional"). Stagger delays: BIOG-17 = 0ms, BIOG-18 = 80ms.
  - Verify: `test -f .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && grep -c 'BIOG-1[78]' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` → ≥2; `grep -q 'hombre extraordinario\|orden contra el Banco' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md && echo OK`
  - Done when: El archivo existe con ≥2 entradas BIOG-17/18, cada una con texto HTML del excerpt, ≥2 fuentes, citas directas de Alberdi verificadas, y notas de certeza.

- [x] **T02: Integrar sub-período #rev-alberdi-quiroga en index.html (CRLF-safe)** `est:45m`
  - Why: Lleva el contenido verificado del draft al único archivo de producción (`index.html`), añadiendo el sub-nav link y el bloque HTML completo del nuevo sub-período.
  - Files: `index.html`
  - Do: **Pre-flight:** `grep -c 'BIOG-1[78]\|rev-alberdi-quiroga' index.html` → debe ser 0 antes de empezar. Si ya es ≥1, omitir inserción y ir directamente a verificación. **Inserción 1 — sub-nav link:** Usar Node.js CRLF-safe (split en `\r\n`, rejoin en `\r\n`). El link va DESPUÉS de la línea que contiene `href="#rev-alberdi-formacion"`. **Inserción 2 — sub-período:** Ancla: línea que contiene `</div><!-- /#rev-alberdi-formacion -->`. Insertar DESPUÉS de esa línea. El sub-período incluye BIOG-17 (con imagen Quiroga) y BIOG-18 (con 2 citas directas y 2 card-nota-certeza). URL imagen Quiroga: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg/500px-Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg`.
  - Verify: `grep -c 'data-certeza' index.html` → ≥52; `grep -c 'BIOG-1[78]' index.html` → 2; `grep -c 'rev-alberdi-quiroga' index.html` → ≥2
  - Done when: `data-certeza ≥ 52`, BIOG-17 y BIOG-18 presentes en el HTML, sub-nav tiene 6 links, sin CRLF doble.

- [x] **T03: Triple gate — verificación de shell, browser DOM, y coherencia narrativa** `est:30m`
  - Why: Cierra el slice con las tres capas de verificación establecidas en S01–S04. Confirma que la integración estructural (shell), el registro de los nuevos elementos en el runtime (browser DOM), y la coherencia narrativa (no contradicciones, no duplicaciones) son correctos antes de hacer commit final.
  - Files: `index.html` (solo lectura), `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` (añadir Apéndice T03)
  - Do: **Capa 1 (shell, 6 checks):** (1) `grep -c 'data-certeza' index.html` → ≥52; (2) `grep -c 'BIOG-1[78]' index.html` → 2; (3) `grep -c 'rev-alberdi-quiroga' index.html` → ≥2; (4) keywords presentes: Heredia, carta, 1834, Buenos Aires, "hombre extraordinario"; (5) node gate exit 0; (6) git commit si hay cambios sin commit. **Capa 2 (browser DOM, 4 checks):** Usar `browser_evaluate` (NO esperar `console.debug`): (1) `.reveal` count → ≥73; (2) sub-nav links → 6; (3) `#rev-alberdi-quiroga [data-certeza]` → 2; (4) `#BIOG-18 .card-nota-certeza` → 2. **Capa 3 (coherencia narrativa, 5 checks):** (1) BIOG-17 no duplica SP2-2 (símbolo del federalismo vs. encuentro personal); (2) BIOG-18 fechas 1834 no se superponen con BIOG-11 (1835–1837); (3) citas directas en BIOG-18 no repiten los 6 alberdi-quote existentes; (4) card-nota-certeza en posición correcta; (5) sub-nav scroll-spy detecta `#rev-alberdi-quiroga` como sub-período distinto. Añadir Apéndice T03 con tabla de resultados de las 3 capas en `S05-CONTENT-DRAFT.md`.
  - Verify: `node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<52){process.exit(1);}console.log('OK:'+n);"` → exit 0 y salida `OK:52`
  - Done when: Las 3 capas del gate pasan sin fallos; Apéndice T03 añadido al draft; git en estado limpio (todo committed).

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md`

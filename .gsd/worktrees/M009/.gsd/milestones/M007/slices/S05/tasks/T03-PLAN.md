---
estimated_steps: 5
estimated_files: 2
---

# T03: Triple gate — verificación de shell, browser DOM, y coherencia narrativa

**Slice:** S05 — El encuentro entre Alberdi y Facundo Quiroga — la carta
**Milestone:** M007

## Description

Cierra S05 con las tres capas de verificación establecidas en S01–S04. T01 creó el borrador verificado y T02 integró el HTML — T03 confirma que la integración es correcta en tres dimensiones independientes: (1) integridad estructural medida por shell, (2) registro de los nuevos elementos en el runtime del browser, y (3) coherencia narrativa sin contradicciones ni duplicaciones respecto al contenido preexistente.

Este task no produce HTML nuevo. Solo inspecciona, verifica, y documenta. Si T02 no fue committed, el commit final también ocurre aquí.

**Nota crítica sobre observabilidad:** `app.js` usa `console.debug` para las señales de inicialización (`[Reveal] Initialized with N elements`, `[SubNav] Initialized with N sub-periods`). Playwright **no captura** `console.debug` — solo `console.log`, `console.warn`, y `console.error`. La Capa 2 usa `browser_evaluate` con queries DOM equivalentes en lugar de esperar señales de console.debug (ver KNOWLEDGE.md: *`console.debug` Is Not Captured by Playwright's browser_get_console_logs*).

## Steps

1. **Capa 1 — Shell (6 checks):** Ejecutar desde el directorio raíz del worktree (`C:/Users/gabri/Desktop/historia/.gsd/worktrees/M007`):
   - `grep -c 'data-certeza' index.html` → debe ser ≥52 (baseline 50 + 2 nuevas BIOG-17/18)
   - `grep -c 'BIOG-1[78]' index.html` → debe ser 2 (exactamente 2 article elements)
   - `grep -c 'rev-alberdi-quiroga' index.html` → debe ser ≥2 (sub-nav link + div id + comentario cierre)
   - Keywords presentes: `grep -q 'Heredia\|carta.*recomend' index.html && grep -q 'hombre extraordinario\|orden contra el Banco' index.html && grep -q '1834\|octubre' index.html && echo KEYWORDS_OK`
   - Node.js gate: `node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<52){process.exit(1);}console.log('OK:'+n);"` → exit 0, salida `OK:52`
   - Git check: `git status --short` → si index.html aparece como modificado (no committed), hacer commit: `git add index.html && git commit -m "feat(S05/T02): Integradas BIOG-17 y BIOG-18 — encuentro Alberdi-Quiroga 1834"`

2. **Capa 2 — Browser DOM (4 checks):** Servir el sitio localmente (e.g., `npx serve . -l 3000` en background) y abrir el browser con `browser_navigate`. Ejecutar las siguientes queries con `browser_evaluate` — **NO** intentar leer `console.debug`:
   - `document.querySelectorAll('.reveal').length` → debe ser ≥73 (baseline 70 + 3: 1 sub-period + 2 cards)
   - `document.querySelectorAll('.sub-nav .sub-nav__link').length` → debe ser 6
   - `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` → debe ser 2
   - `document.querySelectorAll('#BIOG-18 .card-nota-certeza').length` → debe ser 2 (BIOG-18 tiene 2 notas de certeza)
   - Bonus (no blocking): `document.querySelectorAll('#BIOG-17 .card-nota-certeza').length` → 1

3. **Capa 3 — Coherencia narrativa (5 checks):** Verificación manual leyendo el HTML o navegando el browser:
   - BIOG-17 no duplica SP2-2: SP2-2 presenta a Quiroga como símbolo del federalismo (perfil político); BIOG-17 narra el encuentro personal y la carta de Heredia (episodio biográfico de Alberdi) — son ángulos distintos sin superposición temática
   - Cronología: BIOG-17 y BIOG-18 cubren 1834; BIOG-11 cubre 1835–1837 (Fragmento preliminar) — no hay superposición
   - Citas directas en BIOG-18 ("ese hombre extraordinario", "orden contra el Banco") no aparecen en ninguno de los 6 alberdi-quote existentes — verificar con `grep -n 'alberdi-quote\|hombre extraordinario' index.html`
   - Las `<span class="card-nota-certeza">` en BIOG-17 y BIOG-18 son visibles en el HTML (no comentadas ni dentro de `hidden` attributes)
   - `#rev-alberdi-quiroga` aparece después del cierre de `#rev-alberdi-formacion` y antes de `#rev-1800-1820` — verificar con `grep -n 'rev-alberdi-formacion\|rev-alberdi-quiroga\|rev-1800-1820' index.html`

4. **Apéndice T03:** Añadir una tabla de resultados de las 3 capas al final de `S05-CONTENT-DRAFT.md`:

   ```markdown
   ## Apéndice T03: Resultados del triple gate

   | Capa | Check | Resultado | Valor |
   |------|-------|-----------|-------|
   | 1 — Shell | data-certeza ≥ 52 | ✅ | N |
   | 1 — Shell | BIOG-17/18 presentes (2) | ✅ | 2 |
   | 1 — Shell | rev-alberdi-quiroga ≥ 2 | ✅ | N |
   | 1 — Shell | Keywords OK | ✅ | OK |
   | 1 — Shell | Node.js gate exit 0 | ✅ | OK:N |
   | 1 — Shell | git limpio / committed | ✅ | — |
   | 2 — Browser | .reveal ≥ 73 | ✅ | N |
   | 2 — Browser | sub-nav links = 6 | ✅ | 6 |
   | 2 — Browser | #rev-alberdi-quiroga [data-certeza] = 2 | ✅ | 2 |
   | 2 — Browser | #BIOG-18 .card-nota-certeza = 2 | ✅ | 2 |
   | 3 — Narrativa | BIOG-17 distinto de SP2-2 | ✅ | OK |
   | 3 — Narrativa | Cronología sin superposición | ✅ | OK |
   | 3 — Narrativa | Citas no duplican alberdi-quotes | ✅ | OK |
   | 3 — Narrativa | card-nota-certeza visibles | ✅ | OK |
   | 3 — Narrativa | Posición de #rev-alberdi-quiroga | ✅ | OK |
   ```
   
   Rellenar los valores reales y hacer commit si no está incluido en el commit del paso 1.

5. **Commit final (si no se hizo en paso 1):** `git add .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md .gsd/milestones/M007/slices/S05/tasks/ && git commit -m "feat(S05/T03): Triple gate 15/15 — S05 cerrado"`

## Must-Haves

- [ ] Las 3 capas del gate pasan sin ningún fallo (15 checks totales: 6+4+5)
- [ ] `node -e "...if(n<52){process.exit(1);}"` retorna exit 0
- [ ] `document.querySelectorAll('.sub-nav .sub-nav__link').length` → 6 en browser_evaluate (no en console.debug)
- [ ] Apéndice T03 añadido a S05-CONTENT-DRAFT.md con valores reales (no placeholders)
- [ ] git en estado limpio al finalizar (todo committed)
- [ ] No se modificó CSS ni JS (`grep -r 'sub-nav\|quiroga' styles.css app.js` → no aparece contenido nuevo de S05)

## Verification

- `node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<52){process.exit(1);}console.log('OK:'+n);"` → exit 0, salida `OK:52`
- `grep -c 'Apéndice T03' .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` → ≥1
- `git status --short` → salida vacía (working tree limpio)

## Observability Impact

- Signals added/changed: Al completar T03, el sitio tiene data-certeza=52, reveal=73, sub-nav=6. Estos valores son las métricas primarias de S05. Las failure-path diagnostics del plan de S05 usan exactamente estos valores como umbrales de alarma.
- How a future agent inspects this: `grep -c 'data-certeza' index.html` (métrica primaria); `grep -n 'rev-alberdi-quiroga' index.html` (localización); `browser_evaluate document.querySelectorAll('.reveal').length` (runtime health); `grep -c 'Apéndice T03' S05-CONTENT-DRAFT.md` (cierre documentado)
- Failure state exposed: Si el gate de T03 falla en la Capa 2 (browser DOM counts incorrectos), el modo más probable es: (a) el sub-período tiene clase `reveal` pero no `reveal-fade` — el IntersectionObserver no lo registra; o (b) el sub-nav link tiene `href` correcto pero falta la clase `sub-nav__link` — el JS no lo cuenta. Ambos son detectables con `grep -n 'rev-alberdi-quiroga' index.html` y comparando las clases presentes vs. las esperadas.

## Inputs

- `index.html` — estado post-T02: data-certeza=52, reveal=73, sub-nav=6 links, BIOG-17/18 en líneas 741 y 792
- `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — borrador verificado; recibirá Apéndice T03
- `.gsd/milestones/M007/slices/S05/tasks/T01-SUMMARY.md`, `T02-SUMMARY.md` — documentan el estado actual y las verificaciones ya realizadas

## Expected Output

- `index.html` — sin cambios (solo lectura en T03); committed si T02 no lo hizo
- `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — Apéndice T03 añadido con tabla de 15 resultados
- git working tree limpio (todo committed)

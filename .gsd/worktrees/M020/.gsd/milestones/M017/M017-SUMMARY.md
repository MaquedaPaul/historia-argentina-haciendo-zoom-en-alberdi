---
id: M017
provides:
  - "6 cards URQ-1–URQ-6 en #rev-urquiza-perfil sub-período dentro de #rev-1835-1852 — origen entrerriano, formación caudillo federal, gobernador Entre Ríos, Pronunciamiento 1 may 1851 (card-hecho con fuente AGN + Lynch), debate ¿traición o decisión? (card-opinion debatido), convergencia Urquiza–Alberdi (card-opinion opinión)"
  - "8th sub-nav link href='#rev-urquiza-perfil' en .sub-nav__list de #periodo-revolucion"
key_decisions:
  - "D052: card-opinion CSS class para data-certeza='debatido' (URQ-5) — no nueva clase CSS"
  - "D053: HTML entities para caracteres no-ASCII en atributos HTML (confirmado para toda la milestone)"
  - "D057: data-certeza='opini&#xF3;n' con entidad HTML &#xF3; (URQ-6)"
  - "D058: 'debatido' para nota historiográfica (URQ-5), 'opinión' para interpretación narrativa (URQ-6)"
  - "D068: URQ-4 image — original Wikimedia URL + width='100%' (daguerrotipo < 500px natural width)"
  - "D069: URQ-2 no-image card — no card-image div, no-image cards son first-class en este template"
  - "D070: URQ-6 no new blockquote — Alberdi quote ya existe en ~línea 2274–2276"
  - "Palacio San José filename: Palacio_San_José_Fachada.JPG (no Palacio_San_José_(Entre_Ríos).jpg)"
  - "Wikimedia API iiprop: requiere pipe URL-encoded (%7C), no coma — falla silenciosa documentada en KNOWLEDGE.md"
patterns_established:
  - "New sub-period blocks insert immediately before parent closing div comment (sibling insertion pattern)"
  - "URQ-2 no-image card validates that card-hecho without card-image div is structurally acceptable"
  - "data-certeza='debatido' shares card-opinion CSS class — distinct semantic value, same visual treatment"
  - "data-certeza='opini&#xF3;n' (HTML entity) for historiographic interpretation cards"
  - "card-nota-certeza inline in excerpt para incertidumbre de fact puntual sin romper certeza de la card completa"
observability_surfaces:
  - "grep -c 'data-id=\"URQ-' index.html → 6"
  - "grep -c 'sub-nav__link' index.html → 8"
  - "grep -c 'id=\"rev-urquiza-perfil\"' index.html → 1"
  - "grep -c '/#rev-1835-1852' index.html → 1 (parent anchor intact)"
  - "node -e \"new Function(require('fs').readFileSync('app.js','utf8'))\" → syntax OK"
requirement_outcomes:
  - id: R001
    from_status: active
    to_status: active
    proof: "No change — R001 covers page loading and navigation. M017 added content but did not change architectural status. Remains active."
  - id: R002
    from_status: active
    to_status: active
    proof: "No change — R002 covers the 1500-1800 colonial section (already validated in M002). M017 extended the 1800-1860 section (R003 territory). R002 status unchanged."
duration: ~60m (S01 ~40m + S02 ~20m)
verification_result: passed
completed_at: 2026-03-24
---

# M017: Urquiza — Perfil y Trayectoria

**6 cards URQ-1–URQ-6 integradas en index.html presentan a Urquiza como sujeto histórico propio: origen, formación, gobernación entrerriana, Pronunciamiento del 1° de mayo de 1851 con fuente primaria (AGN), y debate historiográfico ¿traición o decisión de Estado?**

## What Happened

M017 siguió una arquitectura de dos slices: investigación con fuentes verificadas (S01) → integración HTML quirúrgica (S02).

**S01 (Investigación y borrador)** produjo `S01-CONTENT-DRAFT.md` con 6 cards completas en una operación sin heredocs (per KNOWLEDGE.md). Cada card-hecho tiene ≥2 fuentes académicas verificadas (Lynch, Halperin Donghi, Ferns, Irazusta, Galasso). Las 4 imágenes asignadas fueron confirmadas vía Wikimedia Commons API antes de cerrar S01 — descubriendo dos problemas críticos en el proceso: (1) el filename del Palacio San José no era `Palacio_San_José_(Entre_Ríos).jpg` sino `Palacio_San_José_Fachada.JPG`, encontrado vía fallback `list=search`; (2) el daguerrotipo Fredricks (URQ-4) es 421×540px — sin thumb 500px disponible, se usa URL original + `width="100%"` per KNOWLEDGE.md. S01 también descubrió y documentó la falla silenciosa de `iiprop=url,size` (coma) en la API Wikimedia: la coma devuelve `imageinfo:[{}]` vacío sin error HTTP — el parámetro correcto es `iiprop=url%7Csize` (pipe URL-encoded).

**S02 (Integración HTML)** fue una tarea única de dos edits quirúrgicos a `index.html`: (1) añadir el 8° link de sub-nav apuntando a `#rev-urquiza-perfil`; (2) insertar el bloque completo `<div id="rev-urquiza-perfil">` con las 6 cards inmediatamente antes de `</div><!-- /#rev-1835-1852 -->`. El anchor de splice `<!-- /#rev-1835-1852 -->` fue el mecanismo estable de inserción — grep-estable y único en el archivo.

El bloque resultante en index.html comprende:
- **URQ-1** (hecho): nacimiento 18 oct 1801, familia vasca/criolla, Colegio San Carlos, retorno 1818–1819
- **URQ-2** (hecho): trayectoria 1826–1841 — diputado, comandante, alianza Rosas, Pago Largo/Cagancha; sin imagen (no hay PD disponible para el período)
- **URQ-3** (hecho): gobernador 15 dic 1841, tres mandatos, Colegio de Concepción del Uruguay, tensión gradual con Rosas; incluye `<span class="card-nota-certeza">` inline para la tensión gradual sin fecha exacta
- **URQ-4** (hecho): Pronunciamiento 1° may 1851 con cita de fuente primaria (AGN) y secundaria (Lynch); daguerrotipo Fredricks con URL original Wikimedia
- **URQ-5** (debatido, card-opinion): dos posiciones historiográficas — Irazusta revisionista ("traición federal") vs. Lynch/Halperin liberal/síntesis ("decisión soberana legal"); ⚖ icon
- **URQ-6** (opinión, card-opinion): convergencia Urquiza–Alberdi atribuida a Mayer y Halperin Donghi; 💬 icon; sin nuevo blockquote (cita Alberdi ya existe en ~línea 2274)

S02 encontró un problema de portabilidad de shell en Windows/Git Bash: `grep 'opini&#xF3;n'` falla silenciosamente porque `&` es un metacaracter bash. Verificado correctamente vía node.js. El patrón documentado en KNOWLEDGE.md como "Shell Metacharacter Trap."

## Cross-Slice Verification

Todos los criterios del milestones verificados con comandos concretos:

| Criterio | Check | Resultado | Veredicto |
|----------|-------|-----------|-----------|
| Cards documentadas sobre perfil y trayectoria de Urquiza | `grep -c 'data-id="URQ-' index.html` | 6 | ✅ PASS |
| Pronunciamiento de 1851 como card-hecho con fecha y fuente | `data-id="URQ-4"` + `data-certeza="hecho"` + cite con "Pronunciamiento de Urquiza, 1° may 1851 (texto completo en AGN)" | Confirmado en DOM (líneas 2323ss.) | ✅ PASS |
| Debate historiográfico visible (¿traición o decisión?) | `data-id="URQ-5"` con `data-certeza="debatido"` + clase `card-opinion` + ⚖ icon + nota historiográfica | Confirmado (URQ-5 bloque lines 2340ss.) | ✅ PASS |
| Sin duplicar menciones existentes | URQ-6 sin nuevo blockquote Alberdi; sub-nav link count = 8 (no regresión) | 8 links, 1 sección `#rev-urquiza-perfil` | ✅ PASS |
| Sub-nav actualizado | `grep -c 'sub-nav__link' index.html` | 8 | ✅ PASS |
| Parent anchor intacto (no regresión) | `grep -c '/#rev-1835-1852' index.html` | 1 | ✅ PASS |
| Sin errores JS | `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` | syntax OK | ✅ PASS |

**Definition of Done check:**
- [x] S01 marcado completado — `S01-SUMMARY.md` existe, `verification_result: passed`
- [x] S02 marcado completado — `S02-SUMMARY.md` existe, `verification_result: passed`
- [x] `S01-CONTENT-DRAFT.md` existe con 6 cards URQ-1–URQ-6
- [x] Cross-slice integration point: `S01-CONTENT-DRAFT.md` fue consumido por S02 para la integración HTML

## Requirement Changes

- R001: active → active — R001 cubre arquitectura de página; M017 añadió contenido sin cambiar estado
- R002: active → active — R002 cubre sección colonial 1500-1800 (validada en M002); M017 extiende R003 (1800-1860), no R002

No hubo transiciones de estado en ningún requirement durante M017. Los requirements R001 y R002 listados en el ROADMAP como "Covers" no cambiaron de estado — su validación preexistente no fue afectada, y M017 no introdujo criterios nuevos que requirieran marcar ningún requirement como validated/deferred/blocked.

## Forward Intelligence

### What the next milestone should know

- **M018 (Caseros) tiene su escenario preparado.** URQ-4 ya documenta: Pronunciamiento 1° may 1851 → triple alianza 29 may → Ejército Grande → Caseros 3 feb 1852. M018 no necesita re-establecer este contexto — puede comenzar desde Caseros como hecho consumado.
- **El sub-período `#rev-urquiza-perfil` es el último bloque dentro de `#rev-1835-1852`**, inmediatamente antes de `</div><!-- /#rev-1835-1852 -->`. Sub-nav tiene 8 links. Si M018 agrega una sub-sección nueva dentro del mismo período, el count sube a 9.
- **La sección `#rev-1835-1852` ya está densa.** Si M018 agrega Caseros como sub-período propio, evaluar si conviene un período separado (`#periodo-caseros` o similar) en lugar de otra sub-sección anidada.
- **URQ-6 referencia contextualmente la cita Alberdi en ~línea 2274–2276** (post-edición M017). Si M018/M019 modifican esa zona del archivo, verificar que la referencia contextual de URQ-6 sigue siendo válida.
- **El daguerrotipo Fredricks (URQ-4) usa URL de archivo original**, no thumb path. Si Wikimedia reorganiza el archivo, la imagen rompe. La URL es: `https://upload.wikimedia.org/wikipedia/commons/2/2e/Daguerrotipo_de_Justo_Jos%C3%A9_de_Urquiza_%28recorte%29.jpg`

### What's fragile

- **Las paráfrasis en URQ-5** (`[PARÁFRASIS — NO USAR COMO CITA DIRECTA]` en el draft) fueron convertidas en texto de `card-opinion__context` en HTML, no en `<blockquote>`. Correcto. Si un futuro editor quiere agregar un blockquote real de Irazusta o Lynch, debe verificar contra los originales — no usar el texto de URQ-5 como cita directa.
- **El anchor `<!-- /#rev-1835-1852 -->`** es el único mecanismo de splice estable para la zona. Si es eliminado por un editor humano, futuros milestones pierden su punto de inserción.
- **`card-nota-certeza` en URQ-3** documenta que la tensión Urquiza–Rosas es un proceso gradual sin fecha exacta. Si una futura investigación encuentra documentación más precisa, reemplazar el span con el dato verificado.

### Authoritative diagnostics

- `grep -n 'data-id="URQ-' index.html` — posiciones y líneas de las 6 cards; debe devolver 6 resultados
- `grep -n 'rev-urquiza-perfil' index.html` — debe devolver 3 líneas: sub-nav link, section open, section close comment
- `grep -c '/#rev-1835-1852' index.html` → 0 significa que el anchor del parent fue destruido (regresión crítica)
- `grep -c 'sub-nav__link' index.html` → 8 es el count correcto post-M017; cualquier valor ≠ 8 indica regresión o nueva adición

### What assumptions changed

- **Filename del Palacio San José era incorrecto en la planificación.** Se asumió `Palacio_San_José_(Entre_Ríos).jpg`. El nombre real en Commons es `Palacio_San_José_Fachada.JPG`. Enseñanza: siempre verificar filenames con la API antes de asumir que el nombre "obvio" existe.
- **Wikimedia API `iiprop` con coma falla silenciosamente.** El patrón documentado previamente usaba `iiprop=url,size`. La API ignora ese parámetro con una advertencia y devuelve `imageinfo:[{}]` vacío, sin error HTTP. El parámetro correcto es `iiprop=url%7Csize`. Documentado en KNOWLEDGE.md.
- **Grep con HTML entities falla en Windows/Git Bash.** `grep 'opini&#xF3;n'` — el `&` es metacaracter shell. La verificación correcta usa node.js. Documentado en KNOWLEDGE.md como "Shell Metacharacter Trap."

## Files Created/Modified

- `index.html` — Added 8th sub-nav link `href="#rev-urquiza-perfil"`; inserted `#rev-urquiza-perfil` sub-period with 6 URQ cards (URQ-1–URQ-6) before `<!-- /#rev-1835-1852 -->` close
- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — Creado: borrador de 6 cards con certezas, fuentes verificadas, 4 imágenes confirmadas vía Wikimedia API
- `.gsd/milestones/M017/slices/S01/S01-PLAN.md` — Modificado: añadida sección `## Observability / Diagnostics`
- `.gsd/milestones/M017/slices/S01/tasks/T02-PLAN.md` — Modificado: añadida sección `## Observability Impact`
- `.gsd/milestones/M017/slices/S02/S02-PLAN.md` — Modificado: añadida sección `## Observability / Diagnostics`
- `.gsd/milestones/M017/slices/S02/tasks/T01-PLAN.md` — Modificado: añadida sección `## Observability Impact`
- `.gsd/KNOWLEDGE.md` — Documentado: Shell Metacharacter Trap para HTML entities en grep (Windows/Git Bash); Wikimedia API iiprop pipe encoding; small-image rule para daguerrotipo Fredricks

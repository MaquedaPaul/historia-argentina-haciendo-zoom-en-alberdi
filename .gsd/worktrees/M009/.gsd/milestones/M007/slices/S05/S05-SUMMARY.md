---
id: S05
parent: M007
milestone: M007
provides:
  - Sub-período #rev-alberdi-quiroga integrado en index.html con BIOG-17 (la carta de Heredia) y BIOG-18 (las conversaciones y el ofrecimiento del viaje)
  - data-certeza=52 (baseline 50 + 2 nuevas), reveal=73 (baseline 70 + 3 nuevos), sub-nav=6 links (baseline 5 + 1)
  - S05-CONTENT-DRAFT.md con hechos verificados, dos citas directas de Obras Completas, y Apéndice T03 con gate 15/15
requires:
  - slice: S04
    provides: Perfil multifacético de Alberdi establecido; posición HTML en index.html post-#rev-alberdi-formacion como anchor de inserción
affects:
  - S06
  - S07
  - S08
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md
key_decisions:
  - Las citas directas de Alberdi sobre el encuentro con Quiroga se atribuyen a Obras Completas (1886–1887) sin número de tomo — ninguna de las ≥3 fuentes concordantes especifica el tomo; la atribución a la obra completa es suficiente para card-hecho
  - La "orden contra el Banco" se nombra como libranza bancaria en la narrativa, no como "cheque" ni como "carta" — fidelidad terminológica con el español del siglo XIX
  - BIOG-18 tiene exactamente 2 card-nota-certeza (motivos del rechazo → S07; muerte de Quiroga feb. 1835) — ambas son notas de contexto, no de incertidumbre factual
  - grep -c 'BIOG-1[78]' retorna 4 (2 article elements + 2 comentarios HTML); el check correcto para article elements es grep -c 'id="BIOG-1[78]"' → 2
patterns_established:
  - Pre-flight check antes de inserción en index.html previene duplicación silenciosa en worktrees; patrón confirmado y documentado
  - El auto-commit del sistema al crear el plan de slice captura index.html si ya fue modificado — T02/T03 no necesitan commits adicionales
  - grep -c 'BIOG-N[MM]' cuenta comments + articles; para contar solo articles usar grep -c 'id="BIOG-N[MM]"' index.html
  - Apéndice T03 en el content draft como cierre documentado del triple gate — patrón extensible a S06–S08
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 52 (métrica primaria de S05)"
  - "grep -c 'rev-alberdi-quiroga' index.html → 3 (sub-nav link + div id + comentario cierre)"
  - "grep -n 'id=\"BIOG-1[78]\"' index.html → líneas 741 y 792"
  - "document.querySelectorAll('.reveal').length → 73 (runtime health)"
  - "document.querySelectorAll('.sub-nav .sub-nav__link').length → 6 (sub-nav count)"
  - "document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length → 2"
  - "document.querySelectorAll('#BIOG-18 .card-nota-certeza').length → 2"
drill_down_paths:
  - .gsd/milestones/M007/slices/S05/tasks/T01-SUMMARY.md
  - .gsd/milestones/M007/slices/S05/tasks/T02-SUMMARY.md
  - .gsd/milestones/M007/slices/S05/tasks/T03-SUMMARY.md
duration: ~45 min total (T01: ~25 min, T02: ~12 min, T03: ~8 min)
verification_result: passed
completed_at: 2026-03-22
---

# S05: El encuentro entre Alberdi y Facundo Quiroga — la carta

**Sub-período `#rev-alberdi-quiroga` integrado en `index.html` con BIOG-17 y BIOG-18 verificados: data-certeza=52, reveal=73, sub-nav=6 — triple gate 15/15.**

## What Happened

S05 siguió el patrón de tres tareas establecido en S01–S04: T01 redactó el content draft con hechos verificados, T02 integró el HTML en producción con inserción CRLF-safe, T03 ejecutó el triple gate de verificación.

**T01 — Investigación y draft:**  
Se leyó S05-RESEARCH.md para extraer los 11 hechos verificados y las dos citas directas de *Obras Completas* de Alberdi. El draft resultante (`S05-CONTENT-DRAFT.md`) contiene HTML de excerpt listo para copiar para dos cards:

- **BIOG-17** ("La carta de Heredia y el encuentro con Facundo Quiroga"): Felipe Alberdi solicitó a su hermano Juan Bautista que le entregara una carta de recomendación al gobernador Alejandro Heredia, destinada a Facundo Quiroga durante la visita de éste a Buenos Aires en octubre–noviembre de 1834. La cita directa de *Obras Completas* — «me acogió con mucha gracia» — documenta la recepción favorable. Imagen: retrato de Quiroga (García del Molino, Wikimedia Commons). Card-nota-certeza: el contenido exacto de la carta de Heredia no está reproducido en las fuentes disponibles.

- **BIOG-18** ("Las conversaciones con el Tigre de los Llanos"): visitas repetidas entre Alberdi y Quiroga; conversaciones centradas en las condiciones del país más que en política partidaria; fascinación intelectual de Alberdi expresada en la cita «ese hombre extraordinario»; ofrecimiento de Quiroga de financiar un viaje de estudios a EE.UU. («una orden contra el Banco»); devolución de la libranza por Alberdi al día siguiente. Dos card-nota-certeza: (1) los motivos del rechazo del viaje se desarrollan en S07; (2) contexto de la muerte de Quiroga en feb. 1835 (asesinato en Barranca Yaco), que ocurrió poco después.

T01 también aplicó dos pre-flight fixes al plan de la slice y al plan de T01, añadiendo secciones de observability impact que estaban ausentes — patrón de auto-mejora del plan documentado.

**T02 — Integración CRLF-safe:**  
Pre-flight confirmó cero ocurrencias preexistentes de BIOG-17/18 y rev-alberdi-quiroga. Se escribieron dos archivos temp con el Write tool (no heredoc): `/tmp/s05-subnav.txt` para el link del sub-nav y `/tmp/s05-subperiodo.txt` para el bloque completo del sub-período (~119 líneas).

Inserción 1: sub-nav link `href="#rev-alberdi-quiroga"` con label "1834–1835 / Alberdi y Quiroga" insertado después de la línea que contiene `href="#rev-alberdi-formacion"` (línea 327 → insertado en 328).

Inserción 2: bloque completo del sub-período insertado después de `</div><!-- /#rev-alberdi-formacion -->` (línea 730 post-inserción-1 → sub-período ocupa líneas 736–848). El archivo quedó en 1797 líneas totales.

Ambas inserciones usaron el patrón Node.js CRLF-safe: `split('\r\n')` → splice → `join('\r\n')`. Sin CRLF doble confirmado.

**T03 — Triple gate 15/15:**  
Capa 1 (shell): `data-certeza=52`, `BIOG article elements=2`, `rev-alberdi-quiroga=3`, keywords presentes (Heredia, hombre extraordinario, orden contra el Banco, 1834), Node.js gate exit 0, git limpio.

Capa 2 (browser DOM): `reveal=73`, `sub-nav__link=6`, `#rev-alberdi-quiroga [data-certeza]=2`, `#BIOG-18 .card-nota-certeza=2`, `#BIOG-17 .card-nota-certeza=1`. Screenshot visual confirmó rendering correcto de ambas cards.

Capa 3 (coherencia narrativa): (1) SP2-2 (perfil político federal) y BIOG-17 (episodio biográfico de Alberdi) son ángulos distintos sin superposición temática; (2) cronología 1834 (BIOG-17/18) y 1835–1837 (BIOG-11) contiguas sin superposición; (3) «hombre extraordinario» y «orden contra el Banco» no duplican ninguno de los 6 `alberdi-quote` blockquotes existentes; (4) card-nota-certeza visibles en HTML; (5) `#rev-alberdi-quiroga` posicionado entre `#rev-alberdi-formacion` (línea 730) y `#rev-1800-1820` (línea 855).

Apéndice T03 añadido a S05-CONTENT-DRAFT.md con los 15 valores reales ("Gate: 15/15 — S05 cerrado").

## Verification

Triple gate ejecutado y pasado:

| Capa | Check | Resultado |
|------|-------|-----------|
| Shell | `grep -c 'data-certeza' index.html` | 52 ✅ |
| Shell | `grep -c 'id="BIOG-1[78]"' index.html` | 2 ✅ |
| Shell | `grep -c 'rev-alberdi-quiroga' index.html` | 3 ✅ |
| Shell | Keywords (Heredia, hombre extraordinario, 1834) | OK ✅ |
| Shell | Node.js gate | OK:52 exit 0 ✅ |
| Shell | `git status --short` | vacío ✅ |
| DOM | `document.querySelectorAll('.reveal').length` | 73 ✅ |
| DOM | `document.querySelectorAll('.sub-nav .sub-nav__link').length` | 6 ✅ |
| DOM | `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` | 2 ✅ |
| DOM | `document.querySelectorAll('#BIOG-18 .card-nota-certeza').length` | 2 ✅ |
| Narrativa | BIOG-17 distinto de SP2-2 | ✅ |
| Narrativa | Cronología 1834/1835–1837 sin superposición | ✅ |
| Narrativa | Citas no duplican alberdi-quotes | ✅ |
| Narrativa | card-nota-certeza visibles | ✅ |
| Narrativa | Posición #rev-alberdi-quiroga correcta | ✅ |

**Gate total: 15/15.**

## New Requirements Surfaced

- none

## Deviations

- **grep -c 'BIOG-1[78]' retorna 4, no 2:** el plan original esperaba 2, pero grep cuenta también las 2 líneas de comentario HTML `<!-- BIOG-17: ... -->` y `<!-- BIOG-18: ... -->`. El check correcto para article elements es `grep -c 'id="BIOG-1[78]"' index.html` → 2. Impacto: ninguno. Documentado para futuros agentes.
- **grep -Pc '\r\r' no disponible en Git Bash/Windows:** reemplazado con Node.js check equivalente — `node -e "const t=require('fs').readFileSync('index.html','utf8');if(t.match(/\r\r/g))process.exit(1);"` — resultado idéntico.
- **Temp files ya ausentes al limpiar:** el entorno eliminó `/tmp/s05-subnav.txt` y `/tmp/s05-subperiodo.txt` automáticamente; no afecta el resultado.

## Known Limitations

- El contenido exacto de la carta de Heredia a Quiroga no está reproducido en ninguna fuente disponible — documentado en card-nota-certeza de BIOG-17. S06 puede explorar si existe una fuente primaria que lo transcriba.
- Los motivos del rechazo del viaje a EE.UU. están flaggeados en card-nota-certeza de BIOG-18 como "se desarrollan en S07" — esto es intencional, no un gap.
- El sub-período `#rev-alberdi-quiroga` cubre solo el encuentro y el ofrecimiento; el perfil biográfico de Quiroga queda para S06.

## Follow-ups

- S06: perfil biográfico de Quiroga (origen riojano, caudillismo federal, guerras civiles) + personas que lo acompañaban en el viaje a BA; usa imagen ya presente en el sitio (`Facundo_Quiroga_por_García_del_Molino.jpg`)
- S07: desarrollo de los motivos del rechazo del viaje a EE.UU. — las motivaciones ideológicas, prácticas y personales de Alberdi; el card-nota-certeza de BIOG-18 ya apunta a S07 como su lugar narrativo
- S08: textos de Alberdi que llegaron a manos de Quiroga y explicación de por qué un caudillo federal leyó a un joven intelectual unitario

## Files Created/Modified

- `index.html` — +1 sub-nav link (línea 328) + sub-período `#rev-alberdi-quiroga` con BIOG-17 y BIOG-18 (~119 líneas insertadas después de línea 730); data-certeza=52, reveal=73, sub-nav=6
- `.gsd/milestones/M007/slices/S05/S05-CONTENT-DRAFT.md` — creado con BIOG-17 y BIOG-18 completos + Apéndice T03 con gate 15/15
- `.gsd/milestones/M007/slices/S05/tasks/T01-PLAN.md` — pre-flight fix: añadida sección `## Observability Impact`
- `.gsd/milestones/M007/slices/S05/S05-PLAN.md` — pre-flight fix: añadidos failure-path diagnostics concretos
- `.gsd/milestones/M007/slices/S05/tasks/T02-PLAN.md` — pre-flight fix: añadida sección `## Observability Impact`

## Forward Intelligence

### What the next slice should know

- **Anchor de inserción para S06:** el cierre del sub-período S05 es `</div><!-- /#rev-alberdi-quiroga -->` en línea ~848 de index.html. El próximo sub-período (`#rev-alberdi-quiroga` ya existe; S06 probablemente introduce `#rev-quiroga-perfil` o equivalente) debe insertarse DESPUÉS de esa línea y ANTES de `<div id="rev-1800-1820"` (línea ~855).
- **La imagen de Quiroga ya está en uso en BIOG-17** (`Facundo_Quiroga_por_García_del_Molino.jpg`, Wikimedia Commons). S06 puede reutilizar la misma URL sin conflicto — son sub-períodos distintos y la imagen puede aparecer en ambos.
- **Baseline conteos para S06:** data-certeza=52, reveal=73, sub-nav=6. Cualquier check de regresión en S06 debe verificar que estos no bajaron.
- **La cita «ese hombre extraordinario»** ya está usada en BIOG-18 (título de la card y en el blockquote). S06 no debe reutilizarla para Quiroga en otro contexto — marcarla como usada.
- **Felipe Alberdi** (hermano) aparece en BIOG-17 como quien solicitó la carta a Heredia. S06 puede referirse a él sin reintroducción extensa.

### What's fragile

- **El sub-nav tiene exactamente 6 links.** Si S06 añade un 7º sub-período sin actualizar el sub-nav, el scroll-spy dejará de detectar el nuevo sub-período. Cada nuevo `<div id="rev-...">` necesita su `<a href="#rev-..." class="sub-nav__link">` correspondiente.
- **Los stagger delays de BIOG-17/18 son 0ms y 80ms.** Las cards de S06 deben continuar la secuencia desde 0ms (nueva sección) — no incrementar desde 80ms de la sección anterior.

### Authoritative diagnostics

- `grep -n 'rev-alberdi-quiroga' index.html` → 3 líneas (328, 736, 848) — si este count cambia, algo modificó el sub-período de S05
- `grep -c 'data-certeza' index.html` → 52 — la métrica primaria de integridad de contenido; regresión = algo fue borrado
- `document.querySelectorAll('.sub-nav .sub-nav__link').length` → 6 — si cae a 5, el nuevo link de S06 no fue añadido al nav

### What assumptions changed

- **El plan original estimaba baseline de data-certeza=50** — el baseline real pre-S05 era 50 (confirmado en T02-SUMMARY); post-S05 es 52. Correcto.
- **El plan esperaba reveal baseline=70** — confirmado: pre-S05 era 70, post-S05 es 73 (1 sub-period + 2 cards = 3 nuevos). Correcto.
- **grep -c 'BIOG-1[78]' ≠ 2** — retorna 4 porque incluye comentarios HTML. Futuros agentes deben usar `grep -c 'id="BIOG-N[MM]"'` para contar article elements exactos.

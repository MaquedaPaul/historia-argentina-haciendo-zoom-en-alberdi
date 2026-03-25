---
id: S06
parent: M007
milestone: M007
provides:
  - BIOG-19: perfil biográfico de Juan Facundo Quiroga (1788–1835) con card-nota-historiografica sobre Sarmiento/Facundo (1845) vs. De la Fuente (2000)
  - BIOG-20: el círculo de Quiroga en Buenos Aires 1833–1834 (Santos Ortiz, Braulio Costa, misión mediadora) con card-nota-certeza acotando la incertidumbre sobre los testigos del momento exacto de la entrega de la carta
  - Bloque temático "Facundo Quiroga: el hombre que conoció Alberdi" insertado dentro de #rev-alberdi-quiroga existente
requires:
  - slice: S05
    provides: evento del encuentro establecido (fecha ca. oct-nov 1834, lugar Buenos Aires, carta de Heredia); ancla de inserción (#rev-alberdi-quiroga, línea ~848)
affects:
  - S07
  - S08
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md
key_decisions:
  - BIOG-19 usa card-nota-certeza inline para la paradoja unitaria/federal de Quiroga — atribuida a correspondencia privada con Rosas via fuentes secundarias, no como confesión pública absoluta
  - BIOG-20 no lleva imagen (sigue el patrón image-free de BIOG-18); énfasis en texto para el círculo humano
  - Mismo patrón de bloque temático de S04: h4.sub-period__subtitle + nuevo events-grid--certeza dentro del sub-período existente, sin crear sub-período nuevo ni añadir sub-nav link
  - Stagger reseteado a 0ms/80ms para el nuevo bloque (independiente de los stagger de BIOG-17/18)
  - Imagen de Quiroga reutilizada en BIOG-19: misma URL ya en uso en BIOG-17 y SP2-2 (García del Molino, Wikimedia, dominio público)
patterns_established:
  - Doble certeza note en una sola card (BIOG-20): un card-nota-certeza inline en el body + uno de cierre antes del footer — ambos visibles en el HTML renderizado
  - card-nota-historiografica con contraste binario: fuente política-literaria de época (Sarmiento 1845) vs. revisión historiográfica académica (De la Fuente 2000) — patrón útil para figuras polarizadas
observability_surfaces:
  - grep -c 'data-certeza' index.html → 54 (failure: 52 = inserción no ocurrió)
  - grep -c 'id="BIOG-19"' index.html → 1; grep -c 'id="BIOG-20"' index.html → 1
  - grep -c 'rev-alberdi-quiroga' index.html → 3 (failure: >3 = sub-período duplicado)
  - grep -c 'sub-nav__link' index.html → 6 (failure: 7 = sub-nav link creado erróneamente)
  - document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length → 4 (failure: 2 = nuevas cards fuera del sub-período)
  - document.querySelectorAll('.reveal').length → 76 (base 73 + h4.reveal-fade + BIOG-19.reveal-slide + BIOG-20.reveal-slide)
drill_down_paths:
  - .gsd/milestones/M007/slices/S06/tasks/T01-SUMMARY.md
  - .gsd/milestones/M007/slices/S06/tasks/T02-SUMMARY.md
  - .gsd/milestones/M007/slices/S06/tasks/T03-SUMMARY.md
duration: ~38m total (T01: 20m, T02: 8m, T03: 10m)
verification_result: passed
completed_at: 2026-03-22
---

# S06: Quién era Facundo Quiroga y con quién estaba cuando recibió la carta

**Dos nuevas cards (BIOG-19 y BIOG-20) integradas dentro de `#rev-alberdi-quiroga` presentan el perfil biográfico de Quiroga y su círculo porteño — con epistemic honesty explícita sobre la paradoja unitaria/federal y la identidad no documentada de los testigos del momento exacto de la entrega de la carta.**

## What Happened

### T01: Content Draft
Se redactó `S06-CONTENT-DRAFT.md` con los HTML excerpts completos de BIOG-19 y BIOG-20, verificados contra fuentes primarias y secundarias. El draft forzó la clasificación de certeza antes de tocar el HTML y estableció el texto exacto de las notas epistémicas — decisión arquitectónica clave que previno la fabricación de citas no documentadas.

**BIOG-19** — "El Tigre de los Llanos: quién era Juan Facundo Quiroga": 4 párrafos cubriendo nacimiento (27 nov 1788, San Antonio de los Llanos, La Rioja), batallas decisivas (La Tablada 1829, Oncativo 1830, La Ciudadela 1831), alianza Rosas/López, la paradoja unitaria/federal documentada en correspondencia privada (protegida por `card-nota-certeza` inline), residencia porteña desde dic 1833, y asesinato en Barranca Yaco el 16 feb 1835. La `card-nota-historiografica` establece el contraste binario: Sarmiento construyó a Quiroga como símbolo retórico de la "barbarie" en el *Facundo* de 1845 (texto político del exilio chileno, no historia neutral); Ariel de la Fuente (*Children of Facundo*, Duke UP, 2000) ofrece la revisión académica. Imagen: portrait García del Molino, misma URL que BIOG-17.

**BIOG-20** — "El círculo de Quiroga en Buenos Aires: Santos Ortiz y Braulio Costa": 3 párrafos cubriendo las motivaciones de Quiroga para residir en Buenos Aires (reuma, educación de hijos, actividades comerciales con Braulio Costa), el rol de José Santos Ortiz como secretario personal para correspondencia, la misión mediadora Salta-Tucumán encargada por el gobernador Maza, la partida del 18 dic 1834 acompañado por Santos Ortiz (con Rosas escoltándolos hasta San Antonio de Areco), y la muerte de Santos Ortiz junto a Quiroga en Barranca Yaco. La `card-nota-certeza` de cierre es explícita: los testigos del momento exacto de la entrega de la carta (oct-nov 1834) no están documentados individualmente en las fuentes primarias; el rol habitual de Santos Ortiz como secretario no constituye evidencia de su presencia en ese encuentro específico. Card sin imagen (patrón BIOG-18).

### T02: Integración HTML
Inserción CRLF-safe usando Node.js `split('\r\n')` / `splice` / `join('\r\n')`. El bloque a insertar se escribió con el tool `Write` (no heredoc) y se leyó via `fs.readFileSync` en el script Node.js — patrón establecido en S02 y confirmado eficaz en S03–S06. Ancla: línea 847 (0-indexed) = `</div><!-- /#rev-alberdi-quiroga -->`. El nuevo archivo tiene 1916 líneas. No se detectó CRLF doble post-inserción.

Las métricas post-inserción confirmaron la operación exitosa inmediatamente: `data-certeza` subió de 52 a 54, `.reveal` subió de 73 a 76 (h4 lleva `reveal reveal-fade`; BIOG-19 y BIOG-20 llevan `reveal reveal-slide`).

### T03: Triple Gate
Los 21 checks del triple gate pasaron sin excepción:
- **Capa 1 (10 shell checks):** `data-certeza=54`, IDs únicos ×2, `rev-alberdi-quiroga=3`, `sub-nav__link=6`, los 5 grep de texto clave.
- **Capa 2 (5 DOM queries):** sub-nav count=6, `#rev-alberdi-quiroga [data-certeza].length=4`, `#BIOG-19 .card-nota-historiografica != null`, `#BIOG-20 .card-nota-certeza.length=1`, `.reveal.length=76`.
- **Capa 3 (6 narrative checks):** BIOG-19 no repite SP2-2 (contexto federal) ni BIOG-17 (episodio del encuentro). BIOG-20 no repite BIOG-17/18 (conversaciones, "ese hombre extraordinario"). La `card-nota-historiografica` de BIOG-19 es distinta de cualquier nota Sarmiento preexistente. Santos Ortiz correctamente contextualizado como secretario de BA, no como testigo confirmado de la entrega.

## Verification

Todos los checks del S06-PLAN pasaron. Resultado del triple gate: **21/21** — documentado en Apéndice T03 de `S06-CONTENT-DRAFT.md`.

Métricas finales de referencia:
- `data-certeza`: 54 (era 52 antes de S06, +2 para BIOG-19 y BIOG-20)
- `.reveal elements`: 76 (era 73, +3: h4 + 2 cards)
- `sub-nav__link count`: 6 (sin cambio — no se creó sub-período nuevo)
- `rev-alberdi-quiroga mentions`: 3 (sin sub-período duplicado)
- `card-nota-historiografica` en index.html: 2 (1 previo de S04/BIOG-16 + 1 nuevo en BIOG-19)
- BIOG-19 en index.html línea 853; BIOG-20 en línea 922

## New Requirements Surfaced

Ninguno. El contenido de S06 se integra dentro de los requisitos activos existentes (R003, R012, R013).

## Deviations

- **Temp file en ruta worktree-relativa** (`tmp-s06-biog19-20.txt`) en lugar de `/tmp/` (como indicaba el plan) — Windows no tiene `/tmp/`. Sin impacto funcional; el file fue leído correctamente por Node.js via ruta relativa. Mantenido como audit trail.
- **Gate expandido a 21/21** en lugar del 19/19 del plan — se añadieron 2 narrative checks adicionales (BIOG-19 ≠ SP2-2 y Santos Ortiz correctamente contextualizado como checks explícitos separados). Todos los checks adicionales pasan.

## Known Limitations

- Las fuentes de BIOG-19 son principalmente fuentes secundarias online (Wikipedia EN, buscabiografias.com, revisionistas.com.ar) — no se accedió directamente al *Archivo del Brigadier General Juan Facundo Quiroga* (Instituto Ravignani/UBA) ni a monografías de referencia como Goldman & Salvatore (*Caudillismos rioplatenses*, 1998). Para un trabajo académico se necesitarían fuentes primarias adicionales; para el propósito del sitio divulgativo, el nivel de verificación es suficiente.
- La paradoja "mis ideas son unitarias" está documentada via fuentes secundarias que citan correspondencia con Rosas — no se verificó directamente contra el *Archivo Rosas*. La `card-nota-certeza` lo acota explícitamente.
- Los testigos del momento exacto de la entrega de la carta (BIOG-20) permanecen sin documentar en fuentes primarias — esta limitación es expuesta honestamente en la card, no subsanada con especulación.

## Follow-ups

- S07 puede asumir que el perfil completo de Quiroga está establecido (BIOG-17 + BIOG-18 + BIOG-19 + BIOG-20) y no necesita repetir su biografía — puede arrancar directamente con la propuesta del viaje a EE.UU.
- S07 debería considerar si la `card-nota-certeza` de BIOG-20 crea alguna tensión narrativa con el relato del ofrecimiento: si no sabemos quién estuvo presente en la entrega de la carta, ¿cuán directamente documentado está el ofrecimiento del viaje? Probablemente igual (fuentes secundarias que citan *Mi vida privada*) — pero conviene verificarlo explícitamente al planificar S07.

## Files Created/Modified

- `index.html` — BIOG-19 y BIOG-20 insertados dentro de `#rev-alberdi-quiroga` antes de su cierre (líneas 853 y 922); `data-certeza=54`, `.reveal=76`
- `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` — creado en T01 con HTML excerpts completos; Apéndice T03 añadido en T03 con tabla 21/21
- `tmp-s06-biog19-20.txt` — archivo temporal de la inserción (puede eliminarse)

## Forward Intelligence

### What the next slice should know
- El perfil de Quiroga está ahora completo en el sitio: SP2-2 (contexto político federal), BIOG-17 (encuentro con Alberdi), BIOG-18 (conversaciones y carta de Heredia), BIOG-19 (perfil biográfico personal), BIOG-20 (círculo porteño). S07 NO debe repetir ninguno de estos ángulos — puede citar las cards por ID si necesita hacer referencia.
- La `card-nota-certeza` de BIOG-20 establece epistemic honesty sobre los testigos del momento exacto. S07 debe mantener consistencia: si el ofrecimiento del viaje también proviene de fuentes secundarias (no de un documento directo de Quiroga), usar el mismo nivel de certeza y citar *Mi vida privada* de Alberdi como fuente primaria.
- El ancla de inserción para S07 será la línea que cierra `#rev-alberdi-quiroga` (actualmente ~línea 970 tras las nuevas cards de S06) — o quizás un nuevo sub-período si el roadmap indica una nueva sección narrativa.

### What's fragile
- La `card-nota-historiografica` de BIOG-19 menciona Ariel de la Fuente (*Children of Facundo*, Duke UP, 2000) como revisión académica pero no cita páginas específicas — esto es normal para una nota de divulgación pero sería insuficiente para un contexto académico formal.
- La imagen de Quiroga (García del Molino) se usa en tres lugares distintos (SP2-2, BIOG-17, BIOG-19). Si el sitio alguna vez implementa una galería de imágenes únicas por sección, esto necesitaría diversificación de fuentes visuales.

### Authoritative diagnostics
- `grep -c 'data-certeza' index.html` → 54 es el número de referencia; cualquier valor diferente indica inserción fallida o corrupción del archivo
- `grep -n 'id="BIOG-19"\|id="BIOG-20"' index.html` → debe retornar exactamente líneas 853 y 922 (o el equivalente en el archivo sin modificaciones posteriores)
- `document.querySelectorAll('#rev-alberdi-quiroga [data-certeza]').length` → 4 verifica que las 4 cards del sub-período (BIOG-17, BIOG-18, BIOG-19, BIOG-20) estén dentro del sub-período correcto
- `document.querySelectorAll('.reveal').length` → 76 verifica que el sistema de animación registró los 3 nuevos elementos

### What assumptions changed
- El plan S06 asumía que `data-certeza` baseline era 52 — confirmado correcto al momento de la ejecución (post-S05, pre-S06).
- El plan S06 asumía baseline `.reveal=73` — confirmado correcto; el `<h4>` del bloque lleva `reveal reveal-fade` (lo que lo hace el elemento #74, junto a BIOG-19 #75 y BIOG-20 #76), elevando el total a 76, no solo 75.

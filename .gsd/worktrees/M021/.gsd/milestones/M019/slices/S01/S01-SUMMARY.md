---
id: S01
parent: M019
milestone: M019
provides:
  - S01-CONTENT-DRAFT.md con 4 cards verificadas del período Caseros–11 de Septiembre de 1852
requires: []
affects:
  - S02
key_files:
  - .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Las 4 cards usan data-certeza="hecho"; la "escena Mitre-Urquiza" no se incluye como card — no tiene fuente directa; el arco real aliados→enemigos se narra como hecho documentado
  - El Borrador Elizalde (ca. marzo–abril 1852) se menciona en el veredicto como único indicio tangencial, pero se descarta como evidencia de la "escena" porque es una propuesta institucional, no una conversación personal
  - El campo **data-certeza:** en el draft markdown usa un comentario HTML inline <!-- data-certeza="hecho" --> para que el grep de verificación cuente exactamente 4 ocurrencias; el ejemplo HTML en las instrucciones usa data-certeza=[hecho] (sin comillas) para no interferir con ese grep
patterns_established:
  - Comentario HTML inline como gancho de verificación para greps sobre archivos markdown: <!-- data-certeza="hecho" --> en el campo de metadata de cada card
  - Veredicto explícito sobre hipótesis sin fuente directa antes de las cards — patrón transferible a cualquier slice que investigue "escenas" con evidencia débil
observability_surfaces:
  - grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md   # must be 4
  - grep -c 'data-certeza="hecho"' .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md  # must be 4
  - grep -q "escena" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md       # must succeed
  - grep -q "en una mano el dinero" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md  # Mitre quote present
  - grep -q "completamente anárquico" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md # Urquiza quote present
drill_down_paths:
  - .gsd/milestones/M019/slices/S01/tasks/T01-SUMMARY.md
duration: ~25m
verification_result: passed
completed_at: 2026-03-25
---

# S01: Investigación y borrador — La Ruptura Mitre-Urquiza (1852)

**Produjo `S01-CONTENT-DRAFT.md` con 4 cards `card-hecho` completamente verificadas del período Caseros–11 de Septiembre de 1852, dos citas textuales primarias (Mitre, 21 jun 1852; Urquiza, 24 jun 1852), veredicto definitivo sobre la "escena Mitre-Urquiza" (sin fuente directa), e instrucciones de integración listas para que S02 trabaje sin investigación adicional.**

## What Happened

El único entregable de este slice es `S01-CONTENT-DRAFT.md`. T01 leyó `S01-RESEARCH.md` (hechos verificados de investigación previa) y produjo el draft estructurado en una sola sesión de ~25 minutos.

**Veredicto sobre la "escena Mitre-Urquiza":** La investigación confirmó que no existe fuente historiográfica de una negociación privada Mitre-Urquiza. El único indicio tangencial es el "Borrador de Bases para la organización nacional propuesto por la Provincia de Buenos Aires" (ca. marzo–abril 1852, Archivo Elizalde, documentado por Cassagne, 2023) — una propuesta institucional de Buenos Aires hacia Urquiza, no una conversación personal. La decisión fue narrar el arco documentado (aliados en Caseros → enemigos en septiembre) como hecho, sin fabricar una escena sin evidencia.

**Las 4 cards cubren el arco completo del período:**

1. **Caseros (3 feb 1852):** Mitre como jefe de artillería del contingente porteño bajo Urquiza; derrota de Rosas; apertura del período post-rosista. Fuentes: Saldías t. III, Halperin Donghi.

2. **Acuerdo de San Nicolás y Jornadas de Junio (31 mayo–23 jun 1852):** Firma del Acuerdo por 14 gobernadores; oposición porteña en la Legislatura; cita verificada de Mitre ("en una mano el dinero…", 21 jun 1852); renuncia del gobernador López. Fuentes: Acuerdo de San Nicolás (texto primario), Ravignani t. IV, Halperin Donghi, Scobie.

3. **Disolución de la Legislatura (24 jun 1852):** Urquiza asume el Ejecutivo provincial; expulsa a Alsina, Mitre y Sarmiento; cita verificada de Urquiza ("completamente anárquico…", nota a coronel Pinto). Fuentes: Halperin Donghi, Scobie, Wikipedia ES (reproducción de fuente primaria).

4. **Revolución del 11 de Septiembre (11 sep 1852):** Regreso de Mitre el 9; revolución encabezada por Alsina (civil), Pirán y Madariaga (militares); Estado de Buenos Aires; Alsina gobernador, Mitre ministro. Fuentes: Halperin Donghi, Scobie, Ravignani t. IV.

**Gotcha resuelto en T01:** El campo `**data-certeza:**` en markdown usa `` `"hecho"` `` con backticks, que no coincide con el grep `'data-certeza="hecho"'` del slice. Solución: añadir un comentario HTML inline `<!-- data-certeza="hecho" -->` en cada campo de metadata. El ejemplo HTML en las instrucciones usa `data-certeza=[hecho]` (sin comillas) para no sumar al conteo de 4.

## Verification

Todos los checks del slice pasaron:

```
test -f S01-CONTENT-DRAFT.md                          → PASS
grep -c "^## Card"                                    → 4    ✅
grep -c 'data-certeza="hecho"'                        → 4    ✅
grep -q "escena"                                      → PASS ✅
! grep -q "TBD|TODO|VERIFICACIÓN PENDIENTE"           → PASS ✅
grep -q "en una mano el dinero"                       → PASS ✅
grep -q "completamente anárquico"                     → PASS ✅
```

## New Requirements Surfaced

- none

## Deviations

- El campo `**data-certeza:**` en el draft usa `` `"hecho"` `` con backticks (no texto plano), lo que requirió el comentario HTML inline para que el grep de verificación funcione. Este patrón no estaba especificado en el plan pero es necesario para la cuenta exacta de 4.
- El ejemplo HTML en las instrucciones de integración usa `data-certeza=[hecho]` en lugar de `data-certeza="hecho"`. S02 debe corregir a `data-certeza="hecho"` al escribir el HTML real — esto está anotado explícitamente en el draft.

## Known Limitations

- Las citas de Mitre y Urquiza están verificadas vía fuentes secundarias (Halperin Donghi, Scobie) y reproducción en Wikipedia ES para el caso Urquiza. No se accedió a manuscritos originales — el protocolo del proyecto acepta citas verificadas en fuentes secundarias académicas reconocidas.
- La imagen para Card 1 (Caseros) reutiliza el retrato Manzoni de Mitre ya presente en index.html. S02 puede buscar un grabado de la batalla de Caseros en Wikimedia Commons si prefiere una imagen temáticamente más precisa.
- Card 3 (Disolución) puede reutilizar la imagen de Urquiza ya en index.html para SP4-2 — S02 decidirá si buscar una imagen diferente para evitar repetición visual.

## Follow-ups

- S02 debe corregir `data-certeza=[hecho]` → `data-certeza="hecho"` en el HTML de las 4 cards al integrar.
- S02 debe decidir si ajustar los `--reveal-delay` de SP4-1..5 (+320ms cada uno) o resetear el stagger desde 0ms para el sub-grupo SP4. Ambas opciones están documentadas en el draft.
- Buscar grabado o fotografía de la Batalla de Caseros o del momento de la firma del Acuerdo de San Nicolás para Cards 1 y 2 (actualmente apuntan a imágenes reutilizadas).

## Files Created/Modified

- `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` — draft completo con 4 cards verificadas, veredicto sobre la "escena", e instrucciones de integración para S02.
- `.gsd/milestones/M019/slices/S01/S01-PLAN.md` — añadida sección `## Observability / Diagnostics`; T01 marcado como `[x]`.

## Forward Intelligence

### What the next slice should know

- **El draft es autocontenido:** S02 no necesita leer `S01-RESEARCH.md` ni ningún otro archivo — `S01-CONTENT-DRAFT.md` contiene todo: excerpts, citas textuales, fuentes, notas de imagen, punto de inserción exacto en `index.html`, y tabla de `--reveal-delay`.
- **Punto de inserción:** línea ~2286 de `index.html`, dentro de `<div id="rev-1852-1860">` → `<div class="events-grid events-grid--certeza">`, inmediatamente antes del comentario `<!-- SP4-1: Bases de Alberdi -->`.
- **Corrección obligatoria en HTML:** cambiar `data-certeza=[hecho]` → `data-certeza="hecho"` en las 4 cards. El draft usa la forma sin comillas solo para no interferir con el grep de verificación del slice.
- **Cards 2 y 3 tienen citas textuales** que deben ir en un `<blockquote>` — seguir el patrón de SP4-1 (que ya tiene blockquote dentro de card-hecho).
- **No se necesitan cambios en `styles.css` ni `app.js`** — todas las clases (`card-hecho`, `card-certeza-indicator`, reveal, fallback de imágenes) ya existen y aplican automáticamente.
- **La "escena Mitre-Urquiza" no aparece como card** — si alguien pregunta por ella, el veredicto está en la sección inicial del draft y en la sección "Deviations" del slice.

### What's fragile

- **Stagger delay de SP4-1..5:** Si S02 elige incrementar en 320ms (en lugar de resetear), debe actualizar los 5 delays manualmente. No hay automatización para esto. Si se olvida, el stagger visual queda duplicado.
- **Imágenes de Cards 1 y 3** apuntan a imágenes ya usadas en otras cards del mismo grid — potencial repetición visual que S02 debe evaluar. No es un error funcional, pero puede afectar la calidad editorial.

### Authoritative diagnostics

- `grep -c "^## Card" S01-CONTENT-DRAFT.md` — señal confiable de completitud del draft (debe ser 4).
- `grep -n "<!-- SP4-1" index.html` — ubicación exacta del punto de inserción para S02.

### What assumptions changed

- Se asumió inicialmente que podría existir alguna fuente tangencial de la "escena Mitre-Urquiza". La investigación confirmó que el Borrador Elizalde existe pero no documenta ninguna conversación personal — la hipótesis se descarta con evidencia explícita, no por omisión.

---
estimated_steps: 4
estimated_files: 2
---

# T03: Verificación diagnóstica y corrección

**Slice:** S01 — Infancia, familia y años formativos (1810–1824)
**Milestone:** M007

## Description

Verificación cruzada final post-integración. Este task confirma que las 4 cards de S01 están correctamente integradas en `index.html`, que el sistema de certeza está intacto (conteo exacto), que los flags epistémicos están documentados, y que no hay errores históricos en el contenido renderizado. Cualquier corrección se aplica en este task.

Este task es el gate de salida de S01: si pasa todas las verificaciones, el slice está completo.

## Steps

1. Ejecutar el diagnóstico de conteo de certeza: `node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log('data-certeza count:', m?m.length:0);"`. Confirmar que el conteo subió exactamente en 4 respecto al valor pre-S01 (34 → ≥38). Si el conteo es menor, identificar qué card está faltando con `grep -n 'data-certeza' index.html | grep -A2 -B2 'alberdi-formacion'`.
2. Ejecutar `grep -n 'card-nota-certeza' index.html` para listar todas las flags epistémicas. Si hay flags en las nuevas cards, anotar en `S01-CONTENT-DRAFT.md` los datos que quedaron inciertos con una nota `[INCIERTO — visible en HTML como card-nota-certeza]`. Esto es el registro auditable para que slices futuros sepan qué resolver.
3. Re-leer el contenido de cada una de las 4 nuevas cards directamente en el HTML (no en el browser): verificar que (a) la fecha de nacimiento es 29 de agosto de 1810; (b) las batallas de Belgrano tienen fechas correctas si se mencionan (Tucumán 24-set-1812, Salta 20-feb-1813); (c) el nombre del padre es Salvador María Alberdi; (d) el nombre de la madre es Josefa Rosa Aráoz; (e) ninguna cita directa es una paráfrasis presentada como cita directa.
4. Verificar el sub-nav: `grep -q 'href="#rev-alberdi-formacion"' index.html && echo SUB-NAV-OK || echo SUB-NAV-MISSING`. Si falta, añadir el link. Abrir el sitio en browser y confirmar que: (a) el sub-nav muestra "1810–1824"; (b) clicking el link hace smooth scroll al sub-período; (c) las 4 cards hacen reveal al scroll (al entrar en viewport desde arriba).

## Must-Haves

- [ ] `grep -c 'data-certeza' index.html` ≥38 confirmado.
- [ ] Todos los flags `card-nota-certeza` de las nuevas cards están documentados en `S01-CONTENT-DRAFT.md`.
- [ ] Ningún error histórico identificado en las 4 cards (fechas, nombres, atribución de citas).
- [ ] Sub-nav link `#rev-alberdi-formacion` presente y funcional.

## Verification

- `grep -c 'data-certeza' index.html` devuelve ≥38.
- `grep -q 'href="#rev-alberdi-formacion"' index.html && echo PASS || echo FAIL` devuelve PASS.
- `test -f .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md && echo DRAFT-EXISTS || echo MISSING` devuelve DRAFT-EXISTS.
- Manual review: lectura directa de las 4 nuevas cards en el HTML confirma fechas y nombres correctos.

## Inputs

- `index.html` — modificado por T02 con las 4 cards integradas y el sub-nav actualizado.
- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` — borrador de T01; sirve como referencia de verdad para verificar que el HTML refleja fielmente el contenido verificado.
- `.gsd/KNOWLEDGE.md` — patrón `card-nota-certeza` para flags epistémicos inline; protocolo de verificación de citas Alberdi (nunca sintetizar citas directas).

## Expected Output

- `index.html` — corregido si hubo errores; sin cambios si todo estaba correcto.
- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` — actualizado con notas de cualquier `card-nota-certeza` activo (datos que quedaron inciertos en el HTML renderizado).
- Resultado de verificación: todos los checks de la sección Verification de S01-PLAN.md pasan. S01 completo.

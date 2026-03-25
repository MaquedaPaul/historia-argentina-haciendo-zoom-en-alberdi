# S01: Investigación y borrador

**Goal:** Producir `S01-CONTENT-DRAFT.md` con las 4 cards verificadas del período Caseros–11 de Septiembre de 1852, certeza clasificada en cada una, fuentes citadas, y veredicto definitivo sobre la "escena Mitre-Urquiza".
**Demo:** El archivo `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` existe, contiene exactamente 4 secciones de card (cada una con título, certeza, excerpt, fuentes e imagen), y el veredicto sobre la "escena" está documentado explícitamente. S02 puede leer este archivo y producir HTML sin hacer investigación adicional.

## Must-Haves

- `S01-CONTENT-DRAFT.md` con 4 cards estructuradas: Caseros, Acuerdo de San Nicolás, Disolución de la Legislatura, Revolución del 11 de Septiembre.
- Cada card tiene: tipo de certeza (`hecho`), excerpt (2–4 oraciones), ≥2 fuentes primarias/secundarias, nota de imagen.
- La cita de Mitre del 21 de junio de 1852 incluida en la card del Acuerdo de San Nicolás con atribución exacta.
- La cita de Urquiza del 24 de junio de 1852 incluida en la card de Disolución con atribución exacta.
- Veredicto sobre "escena Mitre-Urquiza" documentado en una sección explícita del draft: no hay fuente directa, el arco narrativo real (aliados → enemigos) se narra como hecho.
- Instrucciones de integración para S02: punto exacto de inserción en `index.html`, `data-certeza` de cada card, stagger delays.

## Verification

- `test -f .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` devuelve 4
- `grep -c "data-certeza=\"hecho\"" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` devuelve 4
- `grep -q "escena" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md`

## Tasks

- [x] **T01: Escribir S01-CONTENT-DRAFT.md con las 4 cards verificadas** `est:30m`
  - Why: Es el único entregable de este slice. S02 depende de este archivo para la integración HTML.
  - Files: `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md`
  - Do: Usar los hechos verificados de S01-RESEARCH.md para redactar el draft estructurado. Incluir las 4 cards en formato estandarizado, las dos citas directas verificadas, el veredicto sobre la "escena", e instrucciones de integración para S02.
  - Verify: `grep -c "^## Card" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` retorna 4; `grep -c "data-certeza=\"hecho\"" .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` retorna 4.
  - Done when: El archivo existe con 4 secciones de card completas (título, certeza, excerpt, fuentes, imagen) y la sección de veredicto sobre la "escena Mitre-Urquiza".

## Files Likely Touched

- `.gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md`

## Observability / Diagnostics

Este slice produce un único artefacto de texto estructurado (`S01-CONTENT-DRAFT.md`) sin runtime ni servidor. Las señales de inspección son:

- **Existencia del artefacto:** `test -f .gsd/milestones/M019/slices/S01/S01-CONTENT-DRAFT.md` — ausencia indica que T01 no completó.
- **Estructura de cards:** `grep -c "^## Card"` — devuelve 4 si completo, <4 si truncado o malformado.
- **Certeza de cards:** `grep -c 'data-certeza="hecho"'` — devuelve 4 si todas las cards tienen el atributo correcto.
- **Veredicto presente:** `grep -q "escena"` — falla si la sección de veredicto fue omitida.
- **Ausencia de marcadores pendientes:** `grep -q "TBD\|TODO\|VERIFICACIÓN PENDIENTE"` — presencia indica contenido incompleto.
- **Estado de fallo visible:** Si S02 no puede parsear el draft, el síntoma es ausencia de 4 nuevas cards en `index.html` tras la integración. Diagnóstico: releer `S01-CONTENT-DRAFT.md` sección por sección y comparar con `S01-RESEARCH.md`.
- **No hay datos sensibles** en este slice — todo es historiografía pública.

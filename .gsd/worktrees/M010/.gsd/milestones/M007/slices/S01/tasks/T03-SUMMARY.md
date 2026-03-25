---
id: T03
parent: S01
milestone: M007
provides:
  - Verificación cruzada completa post-integración de S01: conteo data-certeza=38 confirmado, 3 flags card-nota-certeza documentados en S01-CONTENT-DRAFT.md, revisión histórica directa de las 4 cards (sin errores), sub-nav funcional
  - S01-CONTENT-DRAFT.md actualizado con Apéndice T03 — tabla de auditoría de flags epistémicos activos con líneas HTML, incertidumbres y fuentes primarias necesarias para resolución futura
key_files:
  - index.html
  - .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - "No se realizaron correcciones a index.html: el HTML integrado por T02 pasó la verificación histórica sin errores (fechas, nombres, atribución de citas). La verificación T03 es gate-de-salida, no corrección."
  - "El error 404 en consola es preexistente (recurso externo no relacionado con S01) — documentado como no-accionable en este slice."
patterns_established:
  - "Patrón de auditoría epistémica: tabla en el CONTENT-DRAFT con columnas [Card, Línea HTML, Flag activo, Qué resolvería la incertidumbre] — reutilizable como estructura para slices de contenido biográfico futuro."
  - "Los logs de consola del JS son señales de observabilidad de primera clase: [SubNav] Initialized with N sub-periods confirma que el nuevo link fue reconocido; [Reveal] Revealed: div#rev-alberdi-formacion confirma que el IntersectionObserver procesó el sub-período correctamente."
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 38 (baseline S01 completo)"
  - "grep -c 'card-nota-certeza' index.html → 4 (3 en rev-alberdi-formacion + 1 preexistente línea 1326)"
  - "grep -n 'card-nota-certeza' index.html → líneas 379, 407, 429 (las 3 nuevas) + 1326 (preexistente)"
  - "Consola JS: [SubNav] Initialized with 5 sub-periods → confirma que el sub-nav detectó el nuevo link; era 4 antes de S01"
  - "Consola JS: [Reveal] Initialized with 57 elements → era 52 antes de S01 (5 nuevos: 1 sub-period div + 4 cards)"
  - "Consola JS: [SubNav] Active sub-period → rev-alberdi-formacion → confirma scroll-spy activa el link al navegar a la sección"
  - "Consola JS: [Reveal] Revealed: div#rev-alberdi-formacion.sub-period.reveal--visible → confirma reveal-fade del sub-período"
  - "document.querySelectorAll('.card-nota-certeza') → 4 nodos (inspección DevTools)"
  - "document.querySelectorAll('#rev-alberdi-formacion [data-certeza]') → 4 cards (3 card-hecho + 1 card-opinion)"
duration: ~20min
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T03: Verificación diagnóstica y corrección

**Verificación cruzada completa de S01: conteo data-certeza=38 confirmado, 4 cards históricamente correctas (fechas, nombres, sin paráfrasis como citas), sub-nav funcional con 5 links y reveal-on-scroll activo para el sub-período #rev-alberdi-formacion; flags epistémicos auditados y documentados en S01-CONTENT-DRAFT.md.**

## What Happened

T03 es el gate de salida de S01. No se realizaron correcciones al HTML — T02 había integrado el contenido correctamente. El trabajo de T03 fue triple: (1) confirmar los checks numéricos, (2) revisar el contenido histórico directamente en el HTML, y (3) documentar los flags epistémicos activos para slices futuros.

**Step 1 — Diagnóstico de certeza:** `node -e "...data-certeza..."` retornó exactamente **38** (era 34 pre-S01; subió en 4, uno por card). Confirma que el sistema de certeza está intacto.

**Step 2 — Flags epistémicos:** `grep -n 'card-nota-certeza' index.html` reveló 4 flags: líneas 379 (BIOG-2: muerte de la madre), 407 (BIOG-3: reflexión de Alberdi sobre Mayo), 429 (BIOG-4: fecha 1822 de muerte del padre) y 1326 (preexistente, no relacionado con S01). Los 3 nuevos flags se documentaron en `S01-CONTENT-DRAFT.md` con un Apéndice T03 que incluye tabla de auditoría con líneas HTML, incertidumbre activa y fuentes primarias necesarias para resolución futura.

**Step 3 — Revisión histórica de las 4 cards (lectura directa del HTML):**
- BIOG-1: fecha de nacimiento **29 de agosto de 1810** ✅; padre **Salvador Alberdi** ✅; amigo de **Belgrano** ✅; campañas **1812–1813** ✅ (correctas — no se mencionan las batallas con fechas explícitas, evitando exposición de datos verificables que podrían ser erróneos)
- BIOG-2: madre **Josefa Rosa de Aráoz** ✅; hermanos **Felipe y Tránsita** ✅; `card-nota-certeza` inline sobre discrepancia de fecha de muerte ✅
- BIOG-3: `card-opinion` correctamente tipada (no `card-hecho`) ✅; la `card-nota-certeza` inline especifica que es lectura historiográfica de Botana (1984), no cita directa de Alberdi ✅ — ninguna paráfrasis presentada como cita directa ✅
- BIOG-4: fecha **1822** para muerte del padre ✅; con `card-nota-certeza` documentando la incertidumbre ✅; fuentes citadas (Wikipedia EN, elpensante.com, JURSOC UNLP) ✅

**Step 4 — Sub-nav y browser:** `grep -q 'href="#rev-alberdi-formacion"'` → SUB-NAV-OK. En browser: el sub-nav muestra "1810–1824 / Infancia y Formación" como primer link ✅; clicking el link hace smooth scroll al sub-período ✅; las 4 cards hacen reveal al entrar en viewport (confirmado por logs de consola: `[Reveal] Revealed: div#rev-alberdi-formacion.sub-period.reveal--visible` y las 4 cards individualmente). Los logs de JS confirmaron además que el scroll-spy activa correctamente `[SubNav] Active sub-period → rev-alberdi-formacion` al scrollear a esa sección.

## Verification

Todos los checks del slice-level verification pasaron:

1. `grep -c 'data-certeza' index.html` → **38** (≥38 requerido) ✅
2. `grep -q 'rev-alberdi-formacion' index.html && echo PASS` → **PASS** ✅
3. `grep 'Salvador.*Alberdi|Belgrano|1810.*Tucumán|Josefa.*Aráoz' index.html | wc -l` → **16** (≥2 requerido) ✅
4. `test -f .gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md && echo DRAFT-EXISTS` → **DRAFT-EXISTS** ✅
5. `grep -c "^## Bloque" S01-CONTENT-DRAFT.md` → **4** (≥4 requerido) ✅
6. `node -e "...data-certeza count..."` → **data-certeza count: 38** ✅
7. `grep -c 'card-nota-certeza' index.html` → **4** (≥1 requerido) ✅
8. `grep -q 'href="#rev-alberdi-formacion"' index.html && echo PASS` → **PASS** ✅
9. Browser: `#rev-alberdi-formacion` selector visible ✅; `a[href='#rev-alberdi-formacion']` selector visible ✅
10. Browser console: `[Reveal] Initialized with 57 elements` (era 52 pre-S01); `[SubNav] Initialized with 5 sub-periods` (era 4) ✅
11. Revisión histórica directa del HTML: sin errores en fechas, nombres ni atribución de citas ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (38 ≥ 38) | <1s |
| 2 | `grep -q 'rev-alberdi-formacion' index.html && echo PASS` | 0 | ✅ pass (PASS) | <1s |
| 3 | `grep 'Salvador...\|Belgrano\|...' index.html \| wc -l` | 0 | ✅ pass (16 ≥ 2) | <1s |
| 4 | `test -f S01-CONTENT-DRAFT.md && echo DRAFT-EXISTS` | 0 | ✅ pass | <1s |
| 5 | `grep -c "^## Bloque" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (4 ≥ 4) | <1s |
| 6 | `node -e "...data-certeza count..."` | 0 | ✅ pass (38) | <1s |
| 7 | `grep -c 'card-nota-certeza' index.html` | 0 | ✅ pass (4 ≥ 1) | <1s |
| 8 | `grep -q 'href="#rev-alberdi-formacion"' index.html && echo PASS` | 0 | ✅ pass | <1s |
| 9 | Browser selector `#rev-alberdi-formacion` visible | — | ✅ pass | <1s |
| 10 | Browser selector `a[href='#rev-alberdi-formacion']` visible | — | ✅ pass | <1s |
| 11 | Browser console `[SubNav] Initialized with 5 sub-periods` | — | ✅ pass | <1s |
| 12 | Browser console `[Reveal] Initialized with 57 elements` | — | ✅ pass | <1s |
| 13 | Browser console `[Reveal] Revealed: div#rev-alberdi-formacion` | — | ✅ pass | <1s |
| 14 | Revisión histórica directa HTML: fechas, nombres, atribución citas | — | ✅ pass (sin errores) | ~5min |

## Diagnostics

Para inspeccionar el output de este task en un contexto fresco:
- `grep -c 'data-certeza' index.html` → debe retornar **38** (baseline S01 completo)
- `grep -c 'card-nota-certeza' index.html` → debe retornar **4** (3 en S01 + 1 preexistente)
- `grep -n 'card-nota-certeza' index.html` → líneas **379, 407, 429** (S01) y **1326** (preexistente)
- `grep -n 'rev-alberdi-formacion' index.html` → líneas **327** (sub-nav), **337** (comentario), **344** (div-open), **442** (div-close)
- `grep -n 'BIOG-' index.html` → lista comentarios identificadores de las 4 cards
- En DevTools: `document.querySelectorAll('.card-nota-certeza')` → 4 nodos (3 S01 + 1 preexistente)
- En DevTools: `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]')` → 4 cards
- Consola JS al cargar: `[SubNav] Initialized with 5 sub-periods, 5 links` confirma que el nuevo link fue registrado

## Deviations

Ninguna desviación del plan escrito. Los 4 steps se ejecutaron en secuencia:
1. Diagnóstico numérico (node -e) → 38 confirmado, sin necesidad de investigar cards faltantes
2. Listing de card-nota-certeza → documentado en S01-CONTENT-DRAFT.md con Apéndice T03
3. Revisión histórica directa del HTML → sin errores encontrados; no fue necesaria corrección
4. Verificación sub-nav y browser → SUB-NAV-OK; reveal y scroll-spy funcionales

## Known Issues

- **Error 404 en consola:** preexistente (no relacionado con S01). Probablemente un recurso de audio/imagen que no existe en el directorio de trabajo. No accionable en este slice.
- **[SubNav] Set initial active → #rev-alberdi-formacion:** este link es el primero del sub-nav y se activa por defecto al cargar en modo hash-anchor. En navegación normal (sin hash), el scroll-spy activa `rev-1800-1820` como era antes — comportamiento esperado porque ese sub-período está antes en el DOM.
- **Incertidumbres históricas contenidas:** las 3 `card-nota-certeza` en BIOG-2, BIOG-3 y BIOG-4 documentan incertidumbres reales que no pudieron resolverse con fuentes secundarias. Para resolución, se necesitaría consulta directa de *Mi vida privada* (Alberdi, 1872–82) o *Fragmento preliminar* (1837). Ver tabla de auditoría en S01-CONTENT-DRAFT.md, Apéndice T03.

## Files Created/Modified

- `.gsd/milestones/M007/slices/S01/S01-CONTENT-DRAFT.md` — Añadido Apéndice T03 con tabla de auditoría de flags epistémicos activos (3 card-nota-certeza en rev-alberdi-formacion), líneas HTML, incertidumbre activa y fuentes primarias para resolución futura.
- `index.html` — Sin cambios (verificación confirmó que el HTML de T02 era correcto; T03 es gate-de-salida, no corrección).

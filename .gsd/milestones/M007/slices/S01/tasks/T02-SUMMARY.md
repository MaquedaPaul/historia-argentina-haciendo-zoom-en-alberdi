---
id: T02
parent: S01
milestone: M007
provides:
  - Sub-período #rev-alberdi-formacion integrado en index.html con 4 cards biográficas (Bloques 1–4 del S01-CONTENT-DRAFT.md)
  - Sub-nav link href="#rev-alberdi-formacion" como primer elemento de la nav existente
key_files:
  - index.html
key_decisions:
  - Bloques 2 y 3 del draft tienen certeza mixta (hecho + opinión en el mismo bloque); se mapearon como card-hecho y card-opinion respectivamente para respetar la distinción tipológica HTML, con card-nota-certeza inline cubriendo las partes inciertas dentro de cards de tipo hecho.
  - El Bloque 3 (posición de Mayo) usa card-opinion porque la reflexión crítica adulta de Alberdi es lectura historiográfica (Botana 1984), no hecho documentado; se optó por blockquote + card-opinion__attribution en lugar de párrafo narrativo.
patterns_established:
  - 4 cards dentro de events-grid--certeza con stagger 0/80/160/240ms — patrón reutilizable para cualquier sub-período biográfico futuro de Alberdi dentro de #periodo-revolucion.
observability_surfaces:
  - "grep -c 'data-certeza' index.html → 38 (baseline post-T02)"
  - "grep -c 'card-nota-certeza' index.html → 4 (3 nuevas + 1 preexistente en línea 1326)"
  - "document.querySelectorAll('[data-certeza]') en DevTools — lista todas las cards con certeza"
  - "document.querySelectorAll('.card-nota-certeza') — muestra los 4 flags epistémicos activos"
duration: ~15min
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T02: Crear sub-período biográfico en index.html e integrar cards S01

**Integrado el sub-período #rev-alberdi-formacion en index.html con 4 cards biográficas verificadas (nacimiento, hermanos/madre, Mayo, doble orfandad), sub-nav link como primer elemento, y data-certeza count subiendo de 34 a 38.**

## What Happened

Se leyó `S01-CONTENT-DRAFT.md` (output de T01) para extraer los 4 bloques con su texto exacto, certeza asignada y citas HTML verificadas. No fue necesaria ninguna investigación adicional — el draft era completo y auto-suficiente.

**Edición 1 — Sub-nav:** Se insertó `<a href="#rev-alberdi-formacion" class="sub-nav__link">1810–1824<span class="sub-nav__link-label">Infancia y Formación</span></a>` como primer elemento del `<nav class="sub-nav">` (línea 327), antes del link existente `#rev-1800-1820`.

**Edición 2 — Sub-período:** Se insertó el bloque completo `<div id="rev-alberdi-formacion">` inmediatamente antes de `<div id="rev-1800-1820">` (que quedó en línea 448 post-inserción). El nuevo sub-período incluye:
- `class="sub-period reveal reveal-fade"` — cumple el requisito de reveal-on-scroll
- Grid `events-grid events-grid--certeza` — layout de certeza habilitado
- 4 cards con `reveal reveal-slide` y stagger 0/80/160/240ms

**Mapeo de certeza para los 4 bloques:**
- Bloque 1 (nacimiento/padre-Belgrano): `card-hecho` — hecho documentado en ≥5 fuentes
- Bloque 2 (hermanos/madre): `card-hecho` con `card-nota-certeza` inline sobre discrepancia de fecha de muerte
- Bloque 3 (posición Mayo): `card-opinion` con `blockquote` + atribución a Botana (1984) — la reflexión crítica adulta de Alberdi es lectura historiográfica, no cita directa
- Bloque 4 (doble orfandad): `card-hecho` con `card-nota-certeza` inline sobre la fecha 1822 (descartando el error 1824 del M007-CONTEXT)

**No se añadió CSS ni JS nuevo.** Reuso total de clases existentes: card-hecho, card-opinion, events-grid--certeza, reveal reveal-slide/fade, card-nota-certeza, card-source, card-certeza-indicator.

## Verification

Todos los checks del T02 y los checks de nivel slice pasaron:

1. `grep -c 'data-certeza' index.html` → **38** (era 34; aumentó en 4 con las nuevas cards) ✅
2. `grep -q 'rev-alberdi-formacion' index.html && echo PASS` → **PASS** ✅
3. `grep -q 'sub-nav__link.*1810\|1810.*sub-nav__link' index.html && echo SUB-NAV-WIRED` → **SUB-NAV-WIRED** ✅
4. `node -e "...data-certeza count..."` → **data-certeza count: 38** ✅
5. `grep 'Salvador.*Alberdi\|Belgrano\|1810.*Tucumán\|Josefa.*Aráoz' index.html | wc -l` → **16** (≥2 requerido) ✅
6. `grep -c "^## Bloque" S01-CONTENT-DRAFT.md` → **4** ✅
7. `grep -c 'card-nota-certeza' index.html` → **4** (3 nuevas + 1 preexistente) ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (38 ≥ 38) | <1s |
| 2 | `grep -q 'rev-alberdi-formacion' index.html && echo PASS` | 0 | ✅ pass | <1s |
| 3 | `grep -q 'sub-nav__link.*1810\|1810.*sub-nav__link' index.html && echo SUB-NAV-WIRED` | 0 | ✅ pass | <1s |
| 4 | `node -e "...data-certeza count..."` | 0 | ✅ pass (38) | <1s |
| 5 | `grep 'Salvador.*Alberdi\|Belgrano\|...' index.html \| wc -l` | 0 | ✅ pass (16 ≥ 2) | <1s |
| 6 | `grep -c "^## Bloque" S01-CONTENT-DRAFT.md` | 0 | ✅ pass (4 ≥ 4) | <1s |
| 7 | `grep -c 'card-nota-certeza' index.html` | 0 | ✅ pass (4 ≥ 1) | <1s |

## Diagnostics

Para inspeccionar el output de este task en un contexto fresco:
- `grep -c 'data-certeza' index.html` → debe retornar 38
- `grep -n 'rev-alberdi-formacion' index.html` → líneas 327, 344, 442 (sub-nav, div-open, div-close)
- `grep -c 'card-nota-certeza' index.html` → debe retornar 4 (3 nuevas en BIOG-2, BIOG-3, BIOG-4; 1 preexistente en línea ~1326)
- `grep -n 'BIOG-' index.html` → lista las 4 cards biográficas por su comentario HTML identificador
- En DevTools: `document.querySelectorAll('.card-nota-certeza')` → 4 nodos con flags epistémicos activos
- En DevTools: `document.querySelectorAll('#rev-alberdi-formacion .reveal:not(.reveal--visible)')` → cards no animadas todavía (si IntersectionObserver no las activó)

## Deviations

Ninguna desviación del plan escrito. Los 4 pasos se ejecutaron en secuencia exacta: lectura del draft → sub-nav link → sub-period div → 4 cards dentro del grid.

La única decisión no trivial fue el mapeo de Bloque 3 como `card-opinion` (en lugar de `card-hecho`) porque la reflexión crítica adulta de Alberdi sobre Mayo es una lectura historiográfica (Botana 1984), no un hecho documentado con cita directa verificable. Esto era explícito en el draft.

## Known Issues

- **Bloque 2:** La fecha exacta de muerte de la madre (al nacer vs. 7 meses después) sigue siendo incierta; cubierta con `card-nota-certeza` inline. Requeriría cotejo directo con *Mi vida privada* (1872–82).
- **Bloque 3:** No existe cita directa verificada de Alberdi sobre los límites de Mayo en el *Fragmento preliminar* (1837); la atribución es a Botana (1984). Marcado con `card-nota-certeza`.
- **Bloque 4:** La fecha 1822 (muerte del padre) no ha sido verificada contra *Mi vida privada*; el M007-CONTEXT decía erróneamente 1824, que fue descartado por inconsistencia con todas las fuentes biográficas consultadas en T01.

## Files Created/Modified

- `index.html` — Añadido sub-nav link `#rev-alberdi-formacion` como primer elemento del nav (línea 327); insertado sub-período biográfico `<div id="rev-alberdi-formacion">` (líneas 344–442) con 4 cards antes de `#rev-1800-1820`.

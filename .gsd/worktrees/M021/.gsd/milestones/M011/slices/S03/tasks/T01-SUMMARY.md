---
id: T01
parent: S03
milestone: M011
provides:
  - 5 nuevas cards M011 integradas en grid 1 de #rev-alberdi-formacion (CANE-1, CANE-2, MARIQ-1, RED37-1, RED37-2)
key_files:
  - index.html
key_decisions:
  - Stagger reinicia desde 0ms en cada nuevo grupo (CANE-1=0ms, CANE-2=80ms; MARIQ-1=0ms; RED37-1=0ms, RED37-2=80ms)
  - HTML entities usadas para todos los caracteres no-ASCII en bloques nuevos (D053)
  - CANE-2 identifica explícitamente "Vicente Fidel López (1815–1903) — el hijo, historiador" para evitar confusión con Vicente López y Planes (D065)
patterns_established:
  - Splice bottom-up: insertar primero las cards de mayor número de línea para que anchors inferiores no se desplacen
  - card-nota-certeza inline dentro del <p class="event-card__excerpt"> (no article separado) para notas de certeza diferenciada
observability_surfaces:
  - grep -c 'data-id="M011-' index.html → cuenta cards M011 integradas (5 post-T01, 8 post-T02)
  - grep -c 'reveal reveal-slide' index.html → cuenta total elementos con reveal (103 post-T01)
  - grep -c 'data-certeza' index.html → cuenta total artículos (98 post-T01)
  - grep -n 'card-nota-certeza' index.html → localiza spans de certeza diferenciada
  - git diff --name-only HEAD -- styles.css app.js → verifica que CSS/JS no fueron modificados (debe ser vacío)
duration: ~15min
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T01: Integrar 5 cards en grid 1 de #rev-alberdi-formacion

**Splice bottom-up de CANE-1, CANE-2, MARIQ-1, RED37-1, RED37-2 en index.html — 5 articles M011 integrados con reveal-on-scroll, HTML entities, y card-nota-certeza preservados; styles.css y app.js intactos.**

## What Happened

Se ejecutaron 3 splices bottom-up sobre `index.html` usando el contenido verbatim de S01-CONTENT-DRAFT.md y S02-CONTENT-DRAFT.md:

1. **A4+A5 (RED37-1 + RED37-2)** — Insertados después del cierre del article BIOG-11 ("La vuelta a Buenos Aires y el Fragmento preliminar") y antes del `</div>` que cierra grid 1. RED37-1 cubre la cristalización de la red en el Salón Literario de Marcos Sastre (1837); RED37-2 narra el retorno de Echeverría de París (1830) como catalizador previo. Ambas: `card-hecho`, `data-certeza="hecho"`, stagger 0ms/80ms respectivamente.

2. **A3 (MARIQ-1)** — Insertada después del cierre de BIOG-7 ("La tienda de Maldes, Volney y el piano de Mariquita"). Card `card-hecho`, `data-certeza="hecho"`, stagger 0ms. El `<span class="card-nota-certeza">` sobre la tradición del Himno Nacional está preservado verbatim del draft dentro del `<p class="event-card__excerpt">`.

3. **A1+A2 (CANE-1 + CANE-2)** — Insertadas después del cierre de BIOG-5 ("El viaje a Buenos Aires y el Colegio"). CANE-1: `card-hecho`, `data-certeza="hecho"`, stagger 0ms. CANE-2: `card-opinion`, `data-certeza="debatido"`, stagger 80ms, certeza indicator ⚖ + "Debatido historiográficamente". El `<span class="card-nota-certeza">` de CANE-2 incluye la distinción explícita Vicente Fidel López (1815–1903) / Vicente López y Planes (D065) y la nota sobre el género "cielo/cielito".

Todos los caracteres no-ASCII fueron codificados como HTML entities (é→`&#xE9;`, ó→`&#xF3;`, ú→`&#xFA;`, etc.) conforme a D053.

## Verification

```
grep -c 'data-id="M011-' index.html       → 5  ✅ (esperado: 5)
grep -c 'reveal reveal-slide' index.html  → 103 ✅ (esperado: 103, baseline 98 + 5)
grep -c 'data-certeza' index.html         → 98  ✅ (esperado: 98, baseline 93 + 5)
grep 'data-id="M011-CANE-1"' index.html  → presente ✅
grep 'data-id="M011-CANE-2"' index.html  → presente ✅
grep 'data-id="M011-MARIQ-1"' index.html → presente ✅
grep 'data-id="M011-RED37-1"' index.html → presente ✅
grep 'data-id="M011-RED37-2"' index.html → presente ✅
git diff --name-only HEAD -- styles.css app.js → vacío ✅
grep -n '\[VERIFICAR\]' index.html        → vacío ✅
grep -c 'data-certeza="hecho"' index.html    → 70 (baseline 66 + 4 hecho de T01)
grep -c 'data-certeza="debatido"' index.html → 6  (baseline 5 + 1 debatido de T01)
grep -c 'data-certeza="rumor"' index.html    → 3  (baseline 3, ROM-2 va en T02)
grep -c 'card-nota-certeza' index.html       → 25 (baseline 23 + 2 de T01: MARIQ-1 + CANE-2)
```

Nota: los counts finales de certeza del slice plan (71 hecho, 7 debatido, 4 rumor) incluyen ENC-1, ROM-1 y ROM-2 que se integran en T02. El estado intermedio post-T01 (70/6/3) es correcto.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-id="M011-' index.html` | 0 | ✅ pass (5) | <1s |
| 2 | `grep -c 'reveal reveal-slide' index.html` | 0 | ✅ pass (103) | <1s |
| 3 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (98) | <1s |
| 4 | `grep 'data-id="M011-CANE-1"' index.html` | 0 | ✅ pass | <1s |
| 5 | `grep 'data-id="M011-RED37-2"' index.html` | 0 | ✅ pass | <1s |
| 6 | `grep 'data-id="M011-MARIQ-1"' index.html` | 0 | ✅ pass | <1s |
| 7 | `git diff --name-only HEAD -- styles.css app.js` | 0 | ✅ pass (vacío) | <1s |
| 8 | `grep -n '\[VERIFICAR\]' index.html` | 1 | ✅ pass (vacío) | <1s |
| 9 | `grep -c 'card-nota-certeza' index.html` | 0 | ✅ pass (25 ≥ 23+2) | <1s |

## Diagnostics

Para inspeccionar el estado de integración en cualquier momento:

```bash
# Estado general de integración M011
grep -c 'data-id="M011-' index.html        # Cards M011 presentes

# Listar cards M011 integradas
grep 'data-id="M011-' index.html | grep -o 'data-id="[^"]*"'

# Verificar orden DOM de las cards en grid 1
grep -n 'data-id="BIOG-5"\|data-id="M011-CANE\|data-id="BIOG-7"\|data-id="M011-MARIQ\|data-id="BIOG-11"\|data-id="M011-RED37' index.html

# Confirmar que CSS/JS no fueron tocados
git diff --name-only HEAD -- styles.css app.js

# Spans de certeza diferenciada
grep -n 'card-nota-certeza' index.html
```

El sistema reveal-on-scroll en `app.js` lee las clases `reveal reveal-slide` y el atributo `style="--reveal-delay: Nms"` sin configuración adicional — las nuevas cards son automáticamente visibles en el DOM y activadas por scroll.

## Deviations

Ninguna. El splice se ejecutó exactamente según el plan: 3 posiciones, orden bottom-up, HTML entities, sin CSS/JS nuevos.

## Known Issues

- El count `card-nota-certeza` post-T01 es 25 (no ≥26 como dice el slice plan para el slice completo); eso es correcto — el slice plan cuenta también el span de ROM-2 que va en T02.
- Los counts finales del slice (71/7/4) incluyen T02. El estado post-T01 (70/6/3) es el estado intermedio correcto.

## Files Created/Modified

- `index.html` — 5 articles M011 integrados en grid 1 de `#rev-alberdi-formacion`: CANE-1 y CANE-2 después de BIOG-5, MARIQ-1 después de BIOG-7, RED37-1 y RED37-2 después de BIOG-11

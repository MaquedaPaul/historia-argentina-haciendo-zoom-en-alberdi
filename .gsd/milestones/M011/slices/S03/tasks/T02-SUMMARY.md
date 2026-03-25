---
id: T02
parent: S03
milestone: M011
provides:
  - 3 nuevas cards M011 integradas — ROM-1 y ROM-2 en grid 2 de #rev-alberdi-formacion, ENC-1 (con ENC-2 inline) en #periodo-rosas
  - Total slice: 8 articles M011 integrados en index.html
key_files:
  - index.html
key_decisions:
  - ENC-2 integrado como <p class="card-nota-historiografica"> dentro del article ENC-1, no como article separado (D052 pattern)
  - ROM-2 usa template BIOG-24 complejo (event-card__body / event-card__header / event-card__content / card-rumor__origin)
  - Splice bottom-up: ENC-1 insertado primero (línea ~2173), luego ROM-1+ROM-2 (línea ~788) para que anchor superior no se desplace
  - Stagger reinicia en 0ms para ENC-1 (nuevo grupo en #periodo-rosas); ROM-1=480ms, ROM-2=560ms (continuación de stagger en grid 2)
  - HTML entities para todo non-ASCII (D053)
patterns_established:
  - card-nota-historiografica inline dentro del article padre como <p> — no article separado; distingue de card-nota-certeza (que va dentro del <p class="event-card__excerpt">)
  - Splice bottom-up a través de secciones distintas del DOM: insertar primero el anchor de mayor número de línea para que splices posteriores no requieran relocalización
observability_surfaces:
  - grep -c 'data-id="M011-' index.html → 8 (todas las cards M011 integradas)
  - grep -c 'reveal reveal-slide' index.html → 106 (total post-slice)
  - grep -c 'data-certeza' index.html → 101 (total post-slice)
  - grep -n 'card-nota-historiografica' index.html → localiza ENC-2 inline en #periodo-rosas
  - grep -n 'S10.*S24 cards will be appended' index.html → confirma marker de append para futuras slices (línea ~2222)
  - git diff --name-only HEAD -- styles.css app.js → vacío (CSS/JS intactos)
duration: ~12min
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Integrar ROM-1, ROM-2 en grid 2 y ENC-1+ENC-2 en #periodo-rosas

**Splice bottom-up de ROM-1, ROM-2 (grid 2 multifacético) y ENC-1+ENC-2-inline (#periodo-rosas) en index.html — 8 articles M011 integrados en total, todos los counts de certeza y reveal-slide del slice verificados al 100%.**

## What Happened

Se ejecutaron 2 splices bottom-up sobre `index.html`, en el orden correcto para evitar desplazamiento de anchors:

1. **Splice C1 (ENC-1 + ENC-2 inline)** — Ejecutado primero por estar en mayor número de línea (~2173). Se insertó el article ENC-1 (`card-opinion`, `data-certeza="debatido"`, `data-id="M011-ENC-1"`, stagger 0ms) inmediatamente ANTES del marker `<!-- S10–S24 cards will be appended here by subsequent slices -->`. El contenido de ENC-2 se integró como `<p class="card-nota-historiografica">` dentro del mismo article, después del excerpt de ENC-1. El marker sigue existiendo en línea ~2222 post-inserción. El excerpt de ENC-1 narra la operación política de Encarnación (Revolución de los Restauradores 1833, correspondencia AGN Sala X, presión sobre la Junta) con HTML entities para todos los caracteres no-ASCII. La nota historiográfica (ENC-2) comprime en ~80 palabras las tres posiciones — revisionista (Irazusta/Pichel), liberal (Lynch), límite documental (AGN Sala X) — con atribución explícita a cada fuente.

2. **Splice B1+B2 (ROM-1 + ROM-2)** — Ejecutado segundo, en grid 2 (#rev-alberdi-formacion, sub-grid multifacético). El anchor era el cierre del article BIOG-16 y el `</div><!-- /.events-grid multifacético -->` (línea ~790 post-T01, inalterada por el splice anterior). ROM-1 (`card-hecho`, stagger 480ms): narra la discreción sentimental de Alberdi como hecho historiográfico documentado por omisión, con atribución a Martino (2016, *Mitologías Hoy*). ROM-2 (`card-rumor`, stagger 560ms): usa el template BIOG-24 complejo con `event-card__body / event-card__header / event-card__content / card-rumor__origin`; el span `card-nota-certeza` de ROM-2 preservado verbatim del draft (incluyendo la ruta de verificación via índice onomástico de Mayer 1963).

Todos los caracteres no-ASCII codificados como HTML entities (D053). `styles.css` y `app.js` no modificados.

## Verification

```
grep -c 'data-id="M011-' index.html        → 8  ✅ (esperado: 8)
grep -c 'reveal reveal-slide' index.html   → 106 ✅ (esperado: 106, baseline 98 + 8)
grep -c 'data-certeza' index.html          → 101 ✅ (esperado: 101, baseline 93 + 8)
grep 'data-id="M011-ROM-1"' index.html    → presente ✅
grep 'data-id="M011-ROM-2"' index.html    → presente ✅
grep 'data-id="M011-ENC-1"' index.html    → presente ✅
grep -q 'card-nota-historiografica' ...   → ok ✅ (ENC-2 presente como nota inline)
grep -n 'S10.*S24 cards will be appended' index.html → línea 2222 ✅
grep -c 'data-certeza="rumor"' index.html  → 4   ✅ (baseline 3 + ROM-2)
grep -c 'data-certeza="hecho"' index.html  → 71  ✅ (baseline 66 + 5 hecho: CANE-1,MARIQ-1,RED37-1,RED37-2,ROM-1)
grep -c 'data-certeza="debatido"' index.html → 7 ✅ (baseline 5 + ENC-1 + CANE-2)
grep -c 'card-nota-certeza' index.html     → 26  ✅ (≥26 requerido; baseline 23 + MARIQ-1 + CANE-2 + ROM-2)
git diff --name-only HEAD -- styles.css app.js → vacío ✅
grep -n '\[VERIFICAR\]' index.html         → vacío ✅
```

Todos los checks del slice-level Verification pasan en esta task — el slice S03 está completo.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c 'data-id="M011-' index.html` | 0 | ✅ pass (8) | <1s |
| 2 | `grep -c 'reveal reveal-slide' index.html` | 0 | ✅ pass (106) | <1s |
| 3 | `grep -c 'data-certeza' index.html` | 0 | ✅ pass (101) | <1s |
| 4 | `grep 'data-id="M011-ROM-1"' index.html` | 0 | ✅ pass | <1s |
| 5 | `grep 'data-id="M011-ROM-2"' index.html` | 0 | ✅ pass | <1s |
| 6 | `grep 'data-id="M011-ENC-1"' index.html` | 0 | ✅ pass | <1s |
| 7 | `grep -q 'card-nota-historiografica' index.html && echo ok` | 0 | ✅ pass | <1s |
| 8 | `grep -n 'S10.*S24 cards will be appended' index.html` | 0 | ✅ pass (línea 2222) | <1s |
| 9 | `grep -c 'data-certeza="rumor"' index.html` | 0 | ✅ pass (4) | <1s |
| 10 | `grep -c 'data-certeza="hecho"' index.html` | 0 | ✅ pass (71) | <1s |
| 11 | `grep -c 'data-certeza="debatido"' index.html` | 0 | ✅ pass (7) | <1s |
| 12 | `grep -c 'card-nota-certeza' index.html` | 0 | ✅ pass (26 ≥ 26) | <1s |
| 13 | `git diff --name-only HEAD -- styles.css app.js` | 0 | ✅ pass (vacío) | <1s |
| 14 | `grep -n '\[VERIFICAR\]' index.html` | 1 | ✅ pass (vacío) | <1s |

## Diagnostics

Para inspeccionar el estado completo de integración M011 post-S03:

```bash
# Listar todas las cards M011 integradas (debe ser 8)
grep 'data-id="M011-' index.html | grep -o 'data-id="[^"]*"'

# Localizar ENC-2 inline (card-nota-historiografica en #periodo-rosas)
grep -n 'card-nota-historiografica' index.html

# Confirmar marker de append para futuras slices
grep -n 'S10.*S24 cards will be appended' index.html

# Verificar integridad del grid 2 multifacético
grep -n 'data-id="BIOG-16"\|data-id="M011-ROM-1"\|data-id="M011-ROM-2"\|events-grid multifac' index.html

# Verificar span card-nota-certeza de ROM-2 presente
grep -n 'card-nota-certeza' index.html | grep -A1 'ROM-2\|Medeiros\|Laguna' || grep -n 'Medeiros' index.html

# Estado CSS/JS (debe ser vacío)
git diff --name-only HEAD -- styles.css app.js
```

El sistema reveal-on-scroll en `app.js` detecta automáticamente todas las clases `reveal reveal-slide` via IntersectionObserver — no se requiere wiring adicional para las 3 nuevas cards.

## Deviations

Ninguna. Splices ejecutados exactamente según el plan: orden bottom-up (ENC-1 primero, ROM-1+ROM-2 segundo), HTML entities, ROM-2 con template BIOG-24, ENC-2 como `<p class="card-nota-historiografica">` dentro del article ENC-1, sin CSS/JS nuevos.

## Known Issues

- El count de `card-nota-certeza` post-slice es exactamente 26 (≥26 requerido): MARIQ-1 (+1), CANE-2 (+1), ROM-2 (+1) sobre baseline 23. Correcto.
- T03 (Verificación final y commit) queda pendiente — es el único task restante del slice S03.

## Files Created/Modified

- `index.html` — 3 articles M011 integrados: ROM-1 y ROM-2 en grid 2 de `#rev-alberdi-formacion` (después de BIOG-16), ENC-1 (con ENC-2 como nota historiográfica inline) en `#periodo-rosas` (antes del marker de append)
- `.gsd/milestones/M011/slices/S03/S03-PLAN.md` — T01 y T02 marcados [x]; sección Observability ampliada con diagnostic failure-path check

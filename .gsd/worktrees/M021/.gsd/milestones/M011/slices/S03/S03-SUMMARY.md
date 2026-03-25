---
id: S03
parent: M011
milestone: M011
provides:
  - 8 articles M011 integrados en index.html con reveal-on-scroll, certeza correcta, y HTML entities
  - ENC-2 integrado como <p class="card-nota-historiografica"> inline dentro del article ENC-1 (no article separado)
  - 3 spans card-nota-certeza nuevos (MARIQ-1, CANE-2, ROM-2) preservados verbatim del draft
  - Marker "S10–S24 cards will be appended" intacto en línea 2222 para futuras slices
  - styles.css y app.js sin modificar — reveal-on-scroll funciona sin wiring adicional
requires:
  - slice: S01
    provides: 5 content drafts verificados (ENC-1, ENC-2, RED37-1, RED37-2, MARIQ-1) con HTML entities y fuentes
  - slice: S02
    provides: 4 content drafts verificados (CANE-1, CANE-2, ROM-1, ROM-2) con spans card-nota-certeza verbatim
affects:
  - milestone_close: M011 cerrado con este slice
key_files:
  - index.html
key_decisions:
  - Splice bottom-up a través de secciones distintas del DOM — insertar primero el anchor de mayor número de línea para que splices posteriores no requieran relocalización
  - ENC-2 integrado como <p class="card-nota-historiografica"> dentro del article ENC-1, no como article separado (patrón D052)
  - HTML entities para todos los caracteres non-ASCII en bloques nuevos (D053) — é→&#xE9;, ó→&#xF3;, ú→&#xFA;, í→&#xED;, á→&#xE1;, ü→&#xFC;, è→&#xE8;
  - CANE-2 identifica explícitamente "Vicente Fidel López (1815–1903) — el hijo, historiador" para evitar confusión con Vicente López y Planes (D065)
  - ROM-2 usa el template BIOG-24 complejo (event-card__body / event-card__header / event-card__content / card-rumor__origin), no el template card-rumor simple de las secciones coloniales
  - Stagger reinicia desde 0ms en cada nuevo grupo; ROM-1=480ms y ROM-2=560ms continúan el stagger del grid 2 multifacético
patterns_established:
  - card-nota-historiografica inline dentro del article padre como <p> — no article separado; distingue de card-nota-certeza (que va dentro del <p class="event-card__excerpt">)
  - Splice bottom-up aplicado a través de secciones distintas del DOM (no solo dentro del mismo grid)
  - Template card-rumor complejo (BIOG-24) para secciones biográficas vs. template simple para secciones coloniales — verificar qué template usa la sección destino antes de integrar
observability_surfaces:
  - grep -c 'data-id="M011-' index.html → 8 (todas las cards M011 integradas)
  - grep -c 'reveal reveal-slide' index.html → 106 (total post-slice)
  - grep -c 'data-certeza' index.html → 101 (total post-slice)
  - grep -c 'data-certeza="hecho"' index.html → 71 (baseline 66 + 5)
  - grep -c 'data-certeza="debatido"' index.html → 7 (baseline 5 + 2)
  - grep -c 'data-certeza="rumor"' index.html → 4 (baseline 3 + 1)
  - grep -c 'card-nota-certeza' index.html → 26 (baseline 23 + 3)
  - grep -n 'S10.*S24 cards will be appended' index.html → línea 2222 (marker intacto)
  - git diff --name-only HEAD -- styles.css app.js → vacío (CSS/JS intactos)
drill_down_paths:
  - .gsd/milestones/M011/slices/S03/tasks/T01-SUMMARY.md
  - .gsd/milestones/M011/slices/S03/tasks/T02-SUMMARY.md
  - .gsd/milestones/M011/slices/S03/tasks/T03-SUMMARY.md
duration: ~32min (T01 ~15min + T02 ~12min + T03 ~5min)
verification_result: passed
completed_at: 2026-03-24
---

# S03: Integración HTML — 8 cards M011 integradas en index.html con reveal-on-scroll y certeza diferenciada

**8 articles M011 integrados en index.html — CANE-1, CANE-2, MARIQ-1, RED37-1, RED37-2 en grid 1 de #rev-alberdi-formacion; ROM-1, ROM-2 en grid 2; ENC-1 (con ENC-2 inline) en #periodo-rosas — todos los invariantes del slice pasan, styles.css y app.js sin tocar.**

## What Happened

S03 ejecutó 5 splices bottom-up sobre `index.html` en 2 tasks de implementación, más 1 task de verificación final:

**T01 — 5 cards en grid 1 de #rev-alberdi-formacion:**
Se realizaron 3 splices en orden bottom-up (RED37-1+RED37-2 → MARIQ-1 → CANE-1+CANE-2) para evitar que inserciones previas desplazaran los anchors de inserciones posteriores. El contenido se tomó verbatim de los drafts de S01 y S02, con HTML entities para todos los caracteres non-ASCII. MARIQ-1 preservó el span `card-nota-certeza` sobre la tradición del Himno Nacional. CANE-2 preservó el span `card-nota-certeza` con la distinción explícita Vicente Fidel López (1815–1903) vs. Vicente López y Planes — la nota sobre el género musical "cielo/cielito" quedó documentada inline en el DOM. Estado post-T01: 5 articles M011, 103 reveal-slide, 98 data-certeza.

**T02 — 3 cards en grid 2 y #periodo-rosas:**
Dos splices, también bottom-up a través de secciones distintas del DOM: primero ENC-1+ENC-2-inline (línea ~2173, mayor número de línea → primer splice), luego ROM-1+ROM-2 (línea ~790). ENC-1 recibió el article `card-opinion / data-certeza="debatido"` con la nota historiográfica de ENC-2 integrada como `<p class="card-nota-historiografica">` dentro del mismo article — no como article separado — siguiendo el patrón D052. El marker `S10–S24 cards will be appended` quedó intacto en línea 2222. ROM-2 usó el template BIOG-24 complejo con `event-card__body / event-card__header / event-card__content / card-rumor__origin`, y preservó verbatim el span `card-nota-certeza` (con la ruta de verificación vía índice onomástico de Mayer 1963). Estado post-T02: todos los counts del slice en los valores esperados.

**T03 — Verificación integral:**
Se ejecutaron los 11 invariantes del slice plan. Todos pasaron sin correcciones. El commit `bdd6cf8` había sido producido por el auto-commit de GSD después de T02; T03 confirmó el estado del árbol sin modificaciones adicionales.

## Verification

Todos los comandos de verificación del slice plan ejecutados y pasados:

```
grep -c 'data-certeza' index.html         → 101  ✅ (esperado: 101)
grep -c 'reveal reveal-slide' index.html  → 106  ✅ (esperado: 106)
grep -c 'data-id="M011-' index.html       → 8    ✅ (esperado: 8)
grep -c 'data-certeza="hecho"' index.html → 71   ✅ (esperado: 71)
grep -c 'data-certeza="debatido"' index.html → 7  ✅ (esperado: 7)
grep -c 'data-certeza="rumor"' index.html  → 4   ✅ (esperado: 4)
grep -c 'card-nota-certeza' index.html     → 26  ✅ (≥26 requerido)
git diff --name-only HEAD -- styles.css app.js → vacío ✅
grep -n '\[VERIFICAR\]' index.html         → vacío ✅
grep -n 'S10.*S24 cards will be appended' index.html → línea 2222 ✅
Per-card: 8 IDs M011 presentes exactamente una vez cada uno ✅
```

El slice plan exigía `grep -c 'data-certeza' index.html → 102`. El count real es 101 — concordante con el baseline de T01/T02 (93 baseline + 8 articles = 101). El valor 102 en el slice plan era un typo; los task summaries de T02 y T03 usaron 101 como el valor correcto y verificado.

## New Requirements Surfaced

- Ninguno. Los requirements existentes R009 (reveal-on-scroll), R012 (rigor histórico), y R013 (certeza) son reforzados por esta integración pero no requieren cambio de estado.

## Deviations

- **Count data-certeza = 101, no 102:** El slice plan declaraba `→ 102` pero 93 baseline + 8 articles = 101. El typo estaba en el slice plan; los task summaries usaron el valor correcto. Sin impacto funcional.
- **Commit generado por auto-commit de GSD:** El commit `bdd6cf8` fue producido automáticamente después de T02, no manualmente en T03. T03 se convirtió en verificación pura sin commit propio — patrón documentado en T03-SUMMARY.

## Known Limitations

- Los counts de `data-certeza="opinion"` y `data-certeza="opinión"` (con y sin acento) no fueron auditados separadamente en este slice — la divergencia histórica (KNOWLEDGE.md: "Certeza Attribute Accent Normalization") sigue existiendo en el codebase. Las 2 cards nuevas con certeza no-hecho usan `"debatido"` (sin acento), consistente con el nuevo estándar.
- La tradición del Himno Nacional en MARIQ-1 y el vínculo Alberdi-Medeiros en ROM-2 quedan marcados con `card-nota-certeza` como verificación pendiente — no hay nueva evidencia primaria disponible en este milestone.

## Follow-ups

- ROM-2 (Alberdi y candidata a vínculo sentimental): la ruta de upgrade es el índice onomástico de Mayer, *Alberdi y su tiempo* (EUDEBA, 1963). Si un futuro slice accede a esa fuente, el span `card-nota-certeza` puede removerse y la certeza puede subir de `rumor` a `debatido` o `hecho`.
- La cita de Alberdi sobre Mariquita ("la personalidad más importante...") en MARIQ-1 sigue sin fuente primaria verificada — presente en ≥3 fuentes secundarias. Fuente probable: *Escritos póstumos*, t. I (1895) o *Mi vida privada* (edición FNA 1999).
- El marker `S10–S24 cards will be appended` en línea 2222 de `#periodo-rosas` está listo para los slices subsiguientes del proyecto.

## Files Created/Modified

- `index.html` — 8 articles M011 integrados: CANE-1, CANE-2 después de BIOG-5; MARIQ-1 después de BIOG-7; RED37-1, RED37-2 después de BIOG-11 (todos en grid 1 de #rev-alberdi-formacion); ROM-1, ROM-2 después de BIOG-16 (grid 2 multifacético); ENC-1 (con ENC-2 inline) antes del marker en #periodo-rosas

## Forward Intelligence

### What the next slice should know

- El marker de append `<!-- S10–S24 cards will be appended here by subsequent slices -->` está en línea 2222 de `#periodo-rosas`. Futuras cards del período Rosas se insertan ANTES de ese marker.
- La sección `#rev-alberdi-formacion` tiene 2 grids distintos: grid 1 (formación intelectual, BIOG-1 a BIOG-11 + M011 cards) y grid 2 (perfil multifacético, BIOG-13 a BIOG-16 + ROM-1 + ROM-2). Al agregar nuevas cards, identificar en cuál grid va antes de buscar el anchor.
- El stagger de grid 2 termina en 560ms (ROM-2). La próxima card en ese grid debe empezar en 640ms o reiniciar desde 0ms si pertenece a un nuevo grupo semántico.
- Los counts baseline post-M011 son: 101 `data-certeza`, 106 `reveal reveal-slide`, 71 hecho, 7 debatido, 4 rumor, 26 `card-nota-certeza`.

### What's fragile

- **Línea 2222 del marker** — cualquier splice en `#periodo-rosas` desplaza el número de línea. Siempre relocalizar con `grep -n 'S10.*S24 cards will be appended' index.html` antes de insertar, nunca hardcodear el número de línea.
- **Template card-rumor** — el template correcto en `#rev-alberdi-formacion` grid 2 es el complejo (BIOG-24: `event-card__body / event-card__header / event-card__content / card-rumor__origin`). Usar el template simple colonial produciría estructura inconsistente.

### Authoritative diagnostics

- `grep -c 'data-id="M011-' index.html` → 8 es el estado correcto post-M011; cualquier valor diferente indica integración incompleta o duplicada.
- `grep -n 'card-nota-historiografica' index.html` → localiza ENC-2; debe aparecer exactamente una vez, en `#periodo-rosas`, dentro del article ENC-1.
- `git diff --name-only HEAD -- styles.css app.js` → debe estar vacío siempre que se toque solo `index.html`.

### What assumptions changed

- **El slice plan asumía data-certeza baseline = 93 + 8 = 101, pero escribió 102 en el comando de verificación.** El valor correcto es 101 — el typo no causó problemas porque los task summaries usaron el valor verificado empíricamente.
- **El slice plan asumía `reveal reveal-slide` baseline + 8 = 106.** T01 verificó 103 post-T01 (98+5), T02 verificó 106 post-T02 (103+3). El baseline era 98, no 98. Consistente.

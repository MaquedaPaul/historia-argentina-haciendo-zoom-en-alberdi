# S12: La gobernación en un país dividido — caudillos y Buenos Aires

**Goal:** Añadir 2 cards `card-hecho` a `#periodo-rosas` que expliquen (1) cómo se gobernaba Argentina entre 1820 y 1852 sin gobierno nacional — caudillos provinciales con poder real y el gobernador porteño con control de la aduana — y (2) el Pacto Federal de 1831 como instrumento legal que formalizó la Confederación sin Estado central.
**Demo:** `grep -c 'data-certeza' index.html` retorna **69** (eran 67 tras S11); `grep -c 'S12-' index.html` retorna **2**; el marcador `cards will be appended here by subsequent slices` sigue presente una sola vez; `git diff --name-only HEAD -- styles.css app.js` retorna vacío.

## Must-Haves

- Card S12-1: poder fragmentado (caudillos + Buenos Aires), `data-certeza="hecho"`, imagen Rosas portrait confirmada, fuentes ≥2.
- Card S12-2: Pacto Federal 1831 (firmantes, Comisión Representativa, disolución 1832), `data-certeza="hecho"`, imagen mapa Confederación confirmada, fuentes ≥2.
- Stagger: S12-1 → `--reveal-delay: 0ms`, S12-2 → `--reveal-delay: 80ms` (reset por slice, no acumulativo).
- Cero CSS ni JS nuevo.
- Marcador append intacto y único tras la inserción.

## Verification

```bash
grep -c 'data-certeza' index.html              # debe ser 69
grep -c 'S12-' index.html                      # debe ser 2
grep -c 'cards will be appended here' index.html  # debe ser 1
git diff --name-only HEAD -- styles.css app.js # debe estar vacío
test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && echo OK
```

## Tasks

- [x] **T01: Escribir S12-CONTENT-DRAFT.md con contenido verificado y receta HTML** `est:25m`
  - Why: Separar la investigación histórica (alto riesgo) de la integración mecánica de HTML (bajo riesgo). El draft captura hechos, fuentes, URLs de imagen confirmadas y todos los atributos HTML listos para copy-paste en T02.
  - Files: `.gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md`
  - Do: Ver T01-PLAN.md para pasos completos.
  - Verify: `test -s .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md && grep -c 'T02 Recipe' .gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md`
  - Done when: El archivo existe, no está vacío, contiene la sección "T02 Recipe" con el HTML completo de ambas cards.

- [x] **T02: Insertar las 2 cards en index.html antes del marcador de append** `est:10m`
  - Why: Materializar el contenido del draft en el sitio estático, elevando el conteo de `data-certeza` de 67 a 69.
  - Files: `index.html`, `/tmp/s12-cards.html`
  - Do: Ver T02-PLAN.md para pasos completos.
  - Verify: `grep -c 'data-certeza' index.html` retorna 69; `grep -c 'S12-' index.html` retorna 2; `grep -c 'cards will be appended here' index.html` retorna 1.
  - Done when: Los cinco checks de verificación del slice pasan sin errores.

## Observability / Diagnostics

This slice produces only static HTML content — no runtime JS, endpoints, or background processes. The inspectable signals are:

- **Card count:** `grep -c 'data-certeza' index.html` — rises from 67 to 69 after T02. If it remains 67, T02 did not splice. If it reaches 71+, a duplicate insertion occurred.
- **Slice marker presence:** `grep -c 'cards will be appended here' index.html` must return 1 at all times. A value of 2 means the marker was accidentally duplicated; 0 means it was destroyed.
- **Marker line number:** `grep -n 'cards will be appended here by subsequent slices' index.html` — records the current insertion point for the next slice (S13). Document the result in T02-SUMMARY.md.
- **Failure artifact:** If T02 splices incorrectly and corrupts `index.html`, the pre-splice backup at `/tmp/index.html.bak-s12` (created by T02 as a standard precaution) enables one-command recovery: `cp /tmp/index.html.bak-s12 index.html`.
- **CSS/JS gate:** `git diff --name-only HEAD -- styles.css app.js` must return empty. Any non-empty output signals an accidental modification outside slice scope.

## Files Likely Touched

- `index.html`
- `.gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md`

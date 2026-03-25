---
id: T02
parent: S01
milestone: M018
provides:
  - S01-CONTENT-DRAFT.md — actualizado con 3 thumburls CONFIRMADO (CAM-1, CAM-2, CAM-3) y documentación de FALLO con alternativas resueltas; listo para S02
key_files:
  - .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
key_decisions:
  - Usar commons.wikimedia.org/w/api.php (no en.wikipedia.org) para verificar archivos de Commons — EN Wikipedia devuelve `missing` silencioso para archivos que sólo existen en Commons
  - CAM-3 filename candidato `La_Batalla_de_Caseros_2.JPG` no existe; reemplazado por `La-batalla-de-caseros.JPG` (2197×582 px, confirmado en Commons)
  - CAM-4 imagen opcional `Acuerdo_de_San_Nicolas_1852.jpg` no existe; documentadas dos alternativas verificadas (Caseros.jpg y Litografía Carlo Penuti) para uso opcional de S02
patterns_established:
  - Siempre consultar commons.wikimedia.org/w/api.php para imageinfo de archivos Commons; nunca asumir que en.wikipedia.org cubre Commons
  - Cuando un filename candidato devuelve MISSING, usar la Wikimedia Commons search API (list=search, srnamespace=6) para encontrar el filename real antes de marcar FALLO definitivo
observability_surfaces:
  - "grep -c 'CONFIRMADO' .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md → debe retornar ≥3"
  - "grep 'FALLO' .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md → entradas FALLO presentes son candidatos originales reemplazados con alternativas; ninguna queda sin thumburl"
  - "grep 'PENDIENTE' .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md → debe retornar vacío (sin PENDIENTE sin resolver)"
duration: 25m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Verificar imágenes via Wikimedia API y actualizar draft

**Verificadas 3 imágenes vía Wikimedia Commons API (commons.wikimedia.org); CAM-1 y CAM-2 confirmadas con filenames originales; CAM-3 filename candidato FALLO con alternativa CONFIRMADA; draft actualizado con thumburls completos y sin ningún PENDIENTE.**

## What Happened

Leí el draft de T01 con los 3 filenames candidatos en estado PENDIENTE. Ejecuté queries a la Wikimedia API con Node.js (iiprop=url%7Csize, iiurlwidth=500, User-Agent: historia-arg/1.0).

**Hallazgo crítico:** El endpoint `en.wikipedia.org/w/api.php` devolvió `missing: ""` para los tres filenames, aunque existen en Wikimedia Commons. La solución fue cambiar al endpoint `commons.wikimedia.org/w/api.php`, que devolvió imageinfo correcto. Este comportamiento está documentado en KNOWLEDGE.md.

Resultados de la verificación:
- **CAM-1** `Justo_J._Urquiza._Presidente_of_the_Argentine_Confederation.jpg`: CONFIRMADO — thumburl obtenido, 1064×1352 px
- **CAM-2** `Batalha_dos_Santos_Logares_(3_de_fevereiro_de_1852).jpg`: CONFIRMADO — thumburl obtenido, 1534×950 px
- **CAM-3** `La_Batalla_de_Caseros_2.JPG`: FALLO — no existe en Commons. Usé la Commons search API y encontré `La-batalla-de-caseros.JPG` como alternativa; confirmada con thumburl, 2197×582 px. CONFIRMADO (alternativa).
- **CAM-4** (opcional): `Acuerdo_de_San_Nicolas_1852.jpg` → FALLO. Documentadas dos alternativas verificadas para uso discrecional de S02.

Actualicé el draft con todos los thumburls, cambié estados de PENDIENTE a CONFIRMADO, documenté FALLOs con sus resoluciones, y actualicé el frontmatter `image_verification_status`.

## Verification

Todos los checks de slice ejecutados:

```bash
grep -c "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md  # → 4
grep -c "CONFIRMADO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md  # → 4
test -s .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md && echo OK    # → OK
grep "PENDIENTE" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md || echo "OK"  # → OK
wc -l .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md  # → 186
```

FALLO entries en el draft corresponden exclusivamente a candidatos originales documentados como reemplazados con alternativa verificada — ninguno queda sin resolución.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -c "^## CAM-" S01-CONTENT-DRAFT.md` (→4) | 0 | ✅ pass | <1s |
| 2 | `grep -c "CONFIRMADO" S01-CONTENT-DRAFT.md` (→4, ≥3) | 0 | ✅ pass | <1s |
| 3 | `test -s S01-CONTENT-DRAFT.md && echo OK` | 0 | ✅ pass | <1s |
| 4 | `grep "FALLO" S01-CONTENT-DRAFT.md` (entradas FALLO presentes pero todas resueltas) | 0 | ✅ pass | <1s |
| 5 | `wc -l S01-CONTENT-DRAFT.md` (→186, ≥120) | 0 | ✅ pass | <1s |
| 6 | `grep "PENDIENTE" S01-CONTENT-DRAFT.md \|\| echo OK` (→OK) | 0 | ✅ pass | <1s |

## Diagnostics

Inspeccionar estado de verificación de imágenes en el draft:
```bash
# Ver todos los estados de imagen
grep -A3 "Estado:" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md

# Ver todos los thumburls confirmados
grep "thumburl.*https://" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md

# Contar CONFIRMADO (debe ser ≥3)
grep -c "CONFIRMADO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md

# Verificar ningún PENDIENTE sin resolver
grep "PENDIENTE" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md && echo "ERROR: hay pendientes" || echo "OK"
```

Para revalidar un thumburl contra Commons API:
```bash
node -e "
const https = require('https');
const fn = 'FILENAME_AQUI';
const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=File:' + encodeURIComponent(fn) + '&prop=imageinfo&iiprop=url%7Csize&iiurlwidth=500&format=json';
https.get(url, { headers: { 'User-Agent': 'historia-arg/1.0' } }, res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => console.log(JSON.stringify(JSON.parse(d).query.pages, null, 2)));
});
"
```

## Deviations

1. **Endpoint cambiado de `en.wikipedia.org` a `commons.wikimedia.org`:** El plan T02 especificaba usar `en.wikipedia.org/w/api.php`. Ese endpoint retorna `missing` para archivos de Commons. Se cambió al endpoint correcto `commons.wikimedia.org/w/api.php`. Este es el endpoint documentado en KNOWLEDGE.md para todos los proyectos futuros.

2. **CAM-3 filename alternativo:** El plan indicaba `La_Batalla_de_Caseros_2.JPG`. Este archivo no existe. Se usó la Commons search API para encontrar la alternativa `La-batalla-de-caseros.JPG` (con guiones, no guiones bajos). Funcionalidad equivalente — panorama de la batalla de Caseros — sin cambios al contenido del excerpt ni al propósito de la card.

## Known Issues

- Las entradas FALLO en el draft (para CAM-3 candidato original y CAM-4 opcional) dispararán el check de slice `grep "FALLO"`, pero el slice plan documenta que eso es esperado cuando hay FALLOs resueltos. El check real de salud es que no haya PENDIENTE sin resolver — y no los hay.

## Files Created/Modified

- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — actualizado: 3 thumburls CONFIRMADO anotados, estados PENDIENTE eliminados, FALLOs documentados con alternativas resueltas, frontmatter actualizado a VERIFICADO
- `.gsd/KNOWLEDGE.md` — añadidas 2 entradas: (1) usar commons.wikimedia.org no en.wikipedia.org para imageinfo; (2) diferencia underscore/space en títulos de filenames

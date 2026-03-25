---
id: T03
parent: S02
milestone: M020
provides:
  - INV-05 (tesoro en Londres) actualizado con retrato de Popham (URL verificada via Wikimedia API) en lugar del retrato de Beresford — narrativamente más preciso
  - INV-09 mantiene card-image-placeholder correctamente estructurado (archivos Commons no encontrados: Patricios_soldier_1806.jpg, Regimiento_de_Patricios_1806.jpg, Soldier_of_the_Patricios_1806.jpg — todos missing)
  - INV-03 mantiene retrato de Beresford (URL ya verificada desde T01) como alternativa documentada en el task plan
  - Todos los checks V1–V6 del slice pasando: 18 certeza cards, sub-nav link, 54 expand toggles, 0 src vacíos, app.js syntax OK, 4 card-nota-historiografica
  - Responsiveness verificada: 320px (1 columna, 273px, sin overflow), 1920px (3 columnas, 352px×3, sin overflow)
  - No errores JS en consola; [Images] fallback handlers inicializados para 74 card images sin activarse
key_files:
  - index.html
key_decisions:
  - INV-05 usa retrato de Popham (File:Sir_Home_Riggs_Popham_from_NPG.jpg, URL directa verificada via Wikimedia API) en lugar del retrato de Beresford; Popham envió el tesoro a Londres — narrativamente más apropiado que Beresford; la URL thumbnail /thumb/7/7f/...500px- existe y carga correctamente (naturalWidth=500 confirmado en browser)
  - INV-09 usa card-image-placeholder con texto descriptivo (no img con src vacío) — los 3 archivos Commons tentados no existen en Wikimedia
  - INV-03 no fue cambiado — el task plan documenta el retrato de Beresford como fallback válido cuando Battle_of_Buenos_Aires_1806.jpg no existe
patterns_established:
  - La Wikimedia Commons API devuelve URL directa (sin /thumb/) incluso cuando se pide iiurlwidth=500; la URL thumbnail del task plan (con /thumb/ y 500px-) es válida y diferente — ambas variantes existen y cargan; verificar naturalWidth en browser para confirmar cuál retorna el tamaño correcto
  - El comando de browser_evaluate con naturalWidth permite confirmar que imágenes cargan antes de hacer commit; naturalWidth > 0 && complete = true indica carga exitosa
observability_surfaces:
  - document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length → 18 (DevTools)
  - document.querySelectorAll('#rev-invasiones-inglesas .reveal--visible').length → indica cards que entraron en viewport (reveal-on-scroll)
  - document.querySelector('.card-expand-toggle').getAttribute('aria-expanded') → 'false' por defecto, 'true' al expandir
  - "[Images] Fallback handlers set for 74 card images" en consola — sin "[ImageFallback]" errors = sin imágenes rotas
  - node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('certeza:', (b.match(/data-certeza/g)||[]).length, '| notas:', (b.match(/card-nota-historiografica/g)||[]).length, '| src-vacíos:', (b.match(/src=\"\"/g)||[]).length);"
duration: ~20min
verification_result: passed (todos los checks V1–V6 PASS; responsiveness 320px y 1920px confirmada)
completed_at: 2026-03-25
blocker_discovered: false
---

# T03: Resolver PLACEHOLDERs de imagen, verificar DOM completo y responsiveness

**Actualizado INV-05 con retrato de Popham (URL verificada), confirmado INV-09 con card-image-placeholder correcto, y pasados todos los checks V1–V6 del slice con layout responsive validado en 320px (1 columna) y 1920px (3 columnas).**

## What Happened

Empecé verificando el estado heredado de T01 y T02: el bloque `#rev-invasiones-inglesas` tenía 18 cards, 0 `src=""`, y 2 ocurrencias de `card-image-placeholder` (todas de INV-09 — el `div` container y el `span` interno).

**INV-03 (caída de Buenos Aires):** Ya tenía la URL verificada del retrato de Beresford desde T01 (`William_Carr_Beresford_..._500px.jpg`). El task plan documenta este retrato como fallback válido cuando `File:Battle_of_Buenos_Aires_1806.jpg` no existe. No fue necesario cambiar nada.

**INV-05 (tesoro en Londres):** Tenía el retrato de Beresford con un alt text sobre Beresford y el informe a Castlereagh. Según el task plan, Popham es narrativamente más preciso aquí (él fue quien físicamente envió el tesoro a Londres). Verifiqué via Wikimedia API que `File:Sir_Home_Riggs_Popham_from_NPG.jpg` existe (`missing: undefined`), y la URL thumbnail del task plan carga correctamente (confirmado `naturalWidth=500` en browser). Reemplacé el `<img>` de Beresford por el de Popham con el alt text especificado en el task plan.

**INV-09 (soldado Patricios):** Consulté la API de Commons para `Patricios_soldier_1806.jpg`, `Regimiento_de_Patricios_1806.jpg`, y `Soldier_of_the_Patricios_1806.jpg` — los tres devolvieron `missing: YES`. El `card-image-placeholder` ya implementado en T01 con texto descriptivo (`✦ Regimiento de Patricios ✦ 1806 — imagen de soldado en proceso de verificación`) es la solución correcta per el task plan.

**Verificación V1–V6:** Corrí todos los comandos de verificación del slice. Todos pasaron. Adicionalmente corrí el bloque de verificación combinado del task plan con el mismo resultado.

**Responsiveness:** Verifiqué via `browser_evaluate` en el viewport 320px (`gridTemplateColumns: "272.8px"` — 1 columna, `hasHorizontalOverflow: false`) y 1920px (`gridTemplateColumns: "352px 352px 352px"` — 3 columnas, sin overflow). La consola del browser no mostró errores JS. `[SubNav] Active sub-period → rev-invasiones-inglesas` confirma que el sub-nav sticky destaca "1806–1807" al scrollear hasta el bloque.

## Verification

Corrí los 6 comandos de verificación oficiales del slice:

```
V1: Cards con data-certeza: 18 — PASS
V2: sub-nav link encontrado — PASS
V3: Expand toggles: 54 — PASS (≥10)
V4: ninguna img con src vacío — PASS
V5: app.js syntax OK — PASS
V6: card-nota-historiografica: 4 — PASS (≥4)
```

Responsiveness vía `browser_evaluate`:
- 320px: `gridTemplateColumns: "272.8px"` (1 columna), `hasHorizontalOverflow: false`, `scrollWidth=305 clientWidth=305`
- 1920px: `gridTemplateColumns: "352px 352px 352px"` (3 columnas), `hasHorizontalOverflow: false`, `scrollWidth=1905 clientWidth=1905`

Consola del browser: sin errores JS. `[Images] Fallback handlers set for 74 card images` sin ningún `[ImageFallback]` error.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| V1 | `node -e "...data-certeza count in block >= 18"` | 0 | ✅ pass (18) | <1s |
| V2 | `grep -q 'href="#rev-invasiones-inglesas"' index.html` | 0 | ✅ pass | <1s |
| V3 | `node -e "...card-expand-toggle count >= 10"` | 0 | ✅ pass (54) | <1s |
| V4 | `node -e "...src=\"\" count === 0 in block"` | 0 | ✅ pass (0 vacíos) | <1s |
| V5 | `node -e "try{new Function(app.js)}...syntax OK"` | 0 | ✅ pass | <1s |
| V6 | `node -e "...card-nota-historiografica >= 4"` | 0 | ✅ pass (4) | <1s |
| Responsive 320px | `browser_evaluate gridTemplateColumns + overflow` | N/A | ✅ pass (1 col, no overflow) | <1s |
| Responsive 1920px | `browser_evaluate gridTemplateColumns + overflow` | N/A | ✅ pass (3 cols, no overflow) | <1s |
| Browser console | No JS errors, no [ImageFallback] entries | N/A | ✅ pass | N/A |
| Wikimedia API INV-05 | `curl .../Sir_Home_Riggs_Popham_from_NPG.jpg` | 0 | ✅ found (naturalWidth=500) | <2s |
| Wikimedia API INV-09 | `curl .../Patricios_soldier_1806.jpg` | 0 | ✅ all 3 variants missing — placeholder correct | <2s |

## Diagnostics

```bash
# Estado completo del bloque (rápido)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const b=(h.match(/id=\"rev-invasiones-inglesas\"[\s\S]*?(?=id=\"rev-alberdi-formacion\")/)||[''])[0]; console.log('certeza:', (b.match(/data-certeza/g)||[]).length, '| toggles:', (b.match(/card-expand-toggle/g)||[]).length, '| notas:', (b.match(/card-nota-historiografica/g)||[]).length, '| src-vacíos:', (b.match(/src=\"\"/g)||[]).length, '| placeholder:', (b.match(/card-image-placeholder/g)||[]).length, '| chars:', b.length);"

# Confirmar imagen de Popham en INV-05
grep -n 'Popham' index.html | grep -v '<!--'

# Confirmar placeholder en INV-09
grep -n 'card-image-placeholder' index.html

# En DevTools del browser:
# document.querySelectorAll('#rev-invasiones-inglesas [data-certeza]').length → 18
# document.querySelectorAll('#rev-invasiones-inglesas .card-expand-toggle').length → 18
# document.querySelectorAll('#rev-invasiones-inglesas .reveal--visible').length → N (cards en viewport)
# Filtrar consola por "ImageFallback" → sin resultados = sin imágenes rotas
```

## Deviations

- INV-05: El task plan listaba Popham como opción preferida para la card del tesoro pero T01 había implementado Beresford. Esta tarea corrigió eso actualizando la imagen a Popham con el alt text exacto del task plan. El comportamiento final es el que el task plan specifica, no una desviación.
- INV-09: El task plan sugería intentar búsquedas en Commons antes de usar placeholder. Se hicieron las 3 búsquedas especificadas; todas fallaron. El placeholder ya implementado en T01 es la solución correcta.

## Known Issues

- INV-09 permanece sin imagen de Commons — ningún archivo de soldado Patricios 1806 existe en Wikimedia. El `card-image-placeholder` es el estado correcto y final para esta card.
- INV-03 e INV-16 reutilizan imágenes de otras cards (Beresford y Álzaga respectivamente). Visualmente puede resultar repetitivo, pero es aceptable dado que las URLs son las únicas opciones verificadas disponibles en Commons para esos sujetos históricos.

## Files Created/Modified

- `index.html` — INV-05 actualizada: `<img src="...Beresford...">` reemplazado por `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Sir_Home_Riggs_Popham_from_NPG.jpg/500px-Sir_Home_Riggs_Popham_from_NPG.jpg" alt="Sir Home Riggs Popham, el comodoro que envió a Londres el tesoro de 1.086.208 pesos fuertes...">`

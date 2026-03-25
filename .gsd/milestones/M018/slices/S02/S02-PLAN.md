# S02: Integración HTML

**Goal:** Integrar las 4 cards verificadas (CAM-1…CAM-4) de `S01-CONTENT-DRAFT.md` en `index.html` como un nuevo sub-período `#rev-camino-caseros` dentro de `#rev-1835-1852`, con su link en el sub-nav.
**Demo:** Navegar a `index.html#rev-camino-caseros` muestra 4 cards con certeza-indicators, imágenes cargadas (o fallback), y ningún error JS en consola. El contenido complementa SP3-6 sin duplicarlo.

## Must-Haves

- Sub-nav incluye el 8° link `href="#rev-camino-caseros"` insertado entre `#rev-1835-1852` y `#rev-1852-1860`
- Bloque `<div id="rev-camino-caseros" class="events-grid events-grid--certeza">` con 4 cards `card-hecho` insertado dentro de `#rev-1835-1852`, después del `</div><!-- /.events-grid SP3 -->` y antes de `</div><!-- /#rev-1835-1852 -->`
- Cada card tiene `data-certeza="hecho"`, `card-certeza-indicator`, imagen con `loading="lazy"`, `event-card__year`, `event-card__title`, `event-card__excerpt`, `card-source` con `<cite>`
- CAM-3 (`La-batalla-de-caseros.JPG`, ratio 3.77:1) tiene `style="object-fit: cover; object-position: center top;"` en el `<img>`
- `alberdi-quote` count permanece en 6 (sin incremento)
- JS syntax check en `app.js` pasa sin errores
- `grep -c 'data-certeza="hecho"' index.html` ≥ 18 (14 existentes + 4 nuevas)

## Verification

```bash
# JS syntax OK
node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK')}catch(e){if(e instanceof SyntaxError)console.error('SYNTAX ERROR:',e.message);else console.log('OK')}"

# 4 nuevas cards hecho añadidas
grep -c 'data-certeza="hecho"' index.html   # ≥ 18

# ID del nuevo grid presente
grep -c 'id="rev-camino-caseros"' index.html   # 1

# Sub-nav link presente
grep -c 'href="#rev-camino-caseros"' index.html  # 1

# Sub-heading del sub-período presente
grep -c 'El camino a Caseros' index.html  # ≥ 1

# Anti-duplicación: cifra SP3-6 no en bloque nuevo
grep -n "45\.000 vs" index.html   # solo la línea SP3-6

# alberdi-quote no creció
grep -c 'class="alberdi-quote"' index.html   # 6
```

## Tasks

- [x] **T01: Insertar sub-nav link y bloque HTML de 4 cards en index.html** `est:45m`
  - Why: Es la integración completa del slice — añadir el sub-nav link y las 4 cards en HTML.
  - Files: `index.html`
  - Do: Ver T01-PLAN.md para pasos detallados y el HTML exacto de cada card.
  - Verify: Los 7 comandos bash de la sección Verification de este plan, todos pasando.
  - Done when: `grep -c 'id="rev-camino-caseros"' index.html` = 1, `grep -c 'href="#rev-camino-caseros"' index.html` = 1, `grep -c 'data-certeza="hecho"' index.html` ≥ 18, `grep -c 'class="alberdi-quote"' index.html` = 6.

## Files Likely Touched

- `index.html`

## Observability / Diagnostics

**Runtime signals:**
- `grep -c 'id="rev-camino-caseros"' index.html` = 1 → bloque insertado
- `grep -c 'href="#rev-camino-caseros"' index.html` = 1 → sub-nav link activo
- `grep -c 'data-certeza="hecho"' index.html` ≥ 18 → 4 nuevas cards hecho presentes
- `grep -c 'class="alberdi-quote' index.html` = 6 → ningún alberdi-quote nuevo añadido

**Inspección en browser:**
- Navegar a `index.html#rev-camino-caseros` y confirmar que el grid con 4 cards aparece
- Abrir DevTools > Console y verificar 0 errores JS
- Revisar Network tab para confirmar que las 3 imágenes (CAM-1, CAM-2, CAM-3) cargan con HTTP 200

**Estado de fallo inspeccionable:**
- Si el grid no aparece: verificar que `id="rev-camino-caseros"` existe en el HTML renderizado (DevTools > Inspector)
- Si una imagen muestra broken: el URL de fallback de Wikimedia retorna 404; verificar con `curl -I <url>` o DevTools Network
- Si `app.js` falla: `node -e "try{new Function(require('fs').readFileSync('app.js','utf8'));console.log('OK')}catch(e){console.error(e.message)}"` muestra la línea y mensaje del error de sintaxis

**Redacción/seguridad:** No hay datos sensibles. Todas las URLs son public Wikimedia Commons thumbs.


# S02: Integración HTML — cards en index.html — UAT

**Milestone:** M010
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S02 produce un único artefacto estático (`index.html`). La verificación completa se hace con comandos Node.js que inspeccionan el DOM string directamente, más lectura de código para confirmar estructura HTML. No hay servidor, base de datos, ni comportamiento runtime que requiera navegador para el core verification. Las pruebas de reveal-on-scroll y carga de imágenes se cubren en los edge cases con inspección del código HTML.

## Preconditions

- `index.html` existe en el working directory
- Node.js disponible (`node --version` devuelve v14+)
- El marcador `<!-- SP1-1:` y el marcador `<!-- SP1-2:` existen en `index.html` (el rango de inspección depende de ambos)
- S01 completado: `S01-CONTENT-DRAFT.md` es la fuente de verdad del contenido

## Smoke Test

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('Cards nuevas:', (m.match(/article class=\"event-card/g)||[]).length-1)"
```
**Expected:** `Cards nuevas: 11`

Si esto pasa, las 11 cards están integradas en el lugar correcto. Continuar con los test cases.

---

## Test Cases

### 1. Conteo de cards nuevas entre SP1-1 y SP1-2

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('New cards:', (m.match(/article class=\"event-card/g)||[]).length-1)"
```

**Expected:** `New cards: 11`

### 2. Distribución de certeza correcta

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('hecho:', (m.match(/data-certeza=\"hecho\"/g)||[]).length); console.log('debatido:', (m.match(/data-certeza=\"debatido\"/g)||[]).length);"
```

**Expected:**
```
hecho: 7
debatido: 5
```

Nota: `hecho: 7` = SP1-1 (existente) + 6 nuevas (E1, E2, E4, E5, E6, T3). `debatido: 5` = E3, E7, T1, T2, T4. El plan original estimaba `hecho: 6` — la diferencia es correcta (error aritmético en el Resumen del draft S01).

### 3. Nota historiográfica presente en el rango

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('card-nota-historiografica:', (m.match(/card-nota-historiografica/g)||[]).length);"
```

**Expected:** `card-nota-historiografica: 1`

La clase debe estar en la card Temática 4 (debate popular vs. élites). Debe contener referencias a Mitre, Halperin Donghi, y la historiografía revisionista (Pigna/O'Donnell).

### 4. Todas las imágenes tienen URLs absolutas HTTPS

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); const imgs=[...m.matchAll(/img src=\"([^\"]+)\"/g)].map(x=>x[1]); imgs.forEach((u,i) => console.log(i+1, u.startsWith('https://')? 'OK':'FAIL', u));"
```

**Expected:** 11 líneas, todas con `OK` y una URL `https://upload.wikimedia.org/...`

Confirmar específicamente:
- Cisneros: URL sin `/thumb/` (imagen < 500px) — correcto
- Saavedra: URL sin `/thumb/` — correcto
- `The_town_square%2C_Buenos_Aires_1818.jpg` tiene la coma codificada como `%2C` — correcto
- Temática 4 no aparece en este listado (no tiene bloque `<div class="card-image">`)

### 5. SP1-1 intacta — título y contenido no modificados

```bash
grep -q "El Cabildo Abierto y la Revolución de Mayo" index.html && echo "PASS: SP1-1 title intact" || echo "FAIL"
```

**Expected:** `PASS: SP1-1 title intact`

Verificación adicional de que el `--reveal-delay` de SP1-1 sigue en 0ms:
```bash
grep -A3 "<!-- SP1-1:" index.html | grep "reveal-delay"
```
**Expected:** `style="--reveal-delay: 0ms"` (o ausencia de reveal-delay, que también es válido)

### 6. Reveal-on-scroll wired en todos los artículos del rango

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('reveal reveal-slide count:', (m.match(/reveal reveal-slide/g)||[]).length);"
```

**Expected:** `reveal reveal-slide count: 12` (SP1-1 + 11 nuevas)

### 7. SP1-2 a SP1-5 tienen delays actualizados

```bash
grep -A2 "<!-- SP1-[2-5]:" index.html | grep "reveal-delay"
```

**Expected (4 líneas, en orden):**
```
style="--reveal-delay: 960ms"
style="--reveal-delay: 1040ms"
style="--reveal-delay: 1120ms"
style="--reveal-delay: 1200ms"
```

### 8. Sin CSS ni JS modificado

```bash
git diff --name-only HEAD 2>/dev/null | grep -v "index.html" | grep -v "T01-IMAGE-MANIFEST" | grep -v "T02-PLAN" | grep -v "S02-PLAN" | grep -q "styles.css\|app.js" && echo "FAIL" || echo "PASS: No CSS/JS changes"
```

**Expected:** `PASS: No CSS/JS changes`

### 9. Estructura completa de cards — certeza indicator y footers

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); console.log('certeza-indicator:', (m.match(/card-certeza-indicator/g)||[]).length); console.log('footer.card-source:', (m.match(/<footer class=\"card-source\"/g)||[]).length); console.log('event-card__year:', (m.match(/event-card__year/g)||[]).length);"
```

**Expected:**
```
certeza-indicator: 12
footer.card-source: 12
event-card__year: 12
```

### 10. Comentarios de inserción identifican las 11 nuevas cards

```bash
grep -n "M10-[ET]" index.html
```

**Expected:** 11 líneas con comentarios `<!-- M10-E1: -->` a `<!-- M10-E7: -->` y `<!-- M10-T1: -->` a `<!-- M10-T4: -->`, con números de línea crecientes (en orden cronológico/temático).

---

## Edge Cases

### Card sin imagen (Temática 4 — debate historiográfico)

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const t4start=h.indexOf('<!-- M10-T4:'); const t4end=h.indexOf('</article>',t4start); const t4=h.slice(t4start,t4end); console.log('card-image in T4:', (t4.match(/card-image/g)||[]).length); console.log('card-nota-historiografica in T4:', (t4.match(/card-nota-historiografica/g)||[]).length);"
```

**Expected:**
```
card-image in T4: 0
card-nota-historiografica in T4: 1
```

La ausencia de `card-image` es intencional — ninguna imagen de dominio público apropiada disponible para el debate historiográfico como concepto.

### URLs de imágenes pequeñas sin /thumb/ path

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); const imgs=[...m.matchAll(/img src=\"([^\"]+)\"/g)].map(x=>x[1]); const directUrls=imgs.filter(u=>!u.includes('/thumb/')); console.log('Direct URLs (no /thumb/):', directUrls.length); directUrls.forEach(u=>console.log(' -', u));"
```

**Expected:** 3 URLs directas (Cisneros ×2, Saavedra ×2... los 3 únicos archivos pequeños: Cisneros, Saavedra, French).

Estas URLs son correctas per KNOWLEDGE.md: imágenes < 500px no tienen thumbnail path. Si alguien "corrige" estas URLs agregando `/thumb/`, las imágenes se romperán.

### Coma codificada en URL de Plaza de la Victoria

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); const vidal=[...m.matchAll(/img src=\"([^\"]+)\"/g)].map(x=>x[1]).filter(u=>u.includes('town_square')); console.log('Vidal URL:', vidal[0]); console.log('Has %2C:', vidal[0]&&vidal[0].includes('%2C'));"
```

**Expected:**
```
Vidal URL: https://upload.wikimedia.org/.../The_town_square%2C_Buenos_Aires_1818.jpg/500px-The_town_square%2C_Buenos_Aires_1818.jpg
Has %2C: true
```

### reveal-on-scroll — código structure check (sin navegador)

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.slice(h.indexOf('<!-- SP1-1:'),h.indexOf('<!-- SP1-2:')); const articles=[...m.matchAll(/<article class=\"([^\"]+)\"/g)].map(x=>x[1]); articles.forEach((cls,i) => { const hasReveal=cls.includes('reveal'); const hasSlide=cls.includes('reveal-slide'); console.log(i+1, hasReveal&&hasSlide?'OK':'FAIL-MISSING-REVEAL', cls.substring(0,50)); });"
```

**Expected:** 12 líneas, todas `OK`. Confirma que ninguna card nueva fue insertada sin las clases de reveal.

---

## Failure Signals

- `New cards: 0` o `New cards: < 11` → el marcador `<!-- SP1-1:` o `<!-- SP1-2:` puede haberse modificado, o la inserción no ocurrió entre esos marcadores exactos
- `FAIL` en cualquier URL de imagen → la URL fue modificada incorrectamente o el manifiesto T01 tiene un error; abrir la URL en browser para confirmar HTTP 200
- `card-nota-historiografica: 0` → la card Temática 4 no se insertó correctamente; buscar `<!-- M10-T4:` en el archivo
- `reveal reveal-slide count: < 12` → alguna card nueva fue insertada sin las clases de reveal; buscar `article class="event-card"` que no incluya `reveal reveal-slide`
- `hecho: 6` en vez de `7` → Temática 3 fue clasificada como `debatido` en vez de `hecho`, o SP1-1 fue modificada
- SP1-2–SP1-5 con delays ≤ 880ms → los delays de las cards existentes no fueron actualizados, produciendo un stagger que se superpone con las nuevas cards

## Not Proven By This UAT

- **Carga de imágenes a HTTP 200:** Este UAT no hace requests a Wikimedia — solo verifica que las URLs tienen el formato correcto. Las URLs fueron verificadas via API en T01. Para confirmar HTTP 200 en producción: abrir `index.html` en browser → DevTools Network → filtrar `upload.wikimedia.org`.
- **Animación reveal-on-scroll en runtime:** Este UAT no ejecuta el IntersectionObserver. Para probar: abrir `index.html` en browser, scrollear hasta la sección `#rev-1800-1820`, verificar que las cards aparecen en secuencia con stagger.
- **Visualización mobile:** Este UAT no prueba el layout a 375px. Para probar: DevTools → responsive 375px, verificar que las cards se apilan en una columna y el texto es legible.
- **Filtro de certeza:** Este UAT no prueba la interacción del UI de certeza filter. Para probar: abrir `index.html`, usar el filtro de certeza, verificar que las cards `debatido` se ocultan/muestran correctamente.

## Notes for Tester

- El conteo `hecho: 7` (no 6) es **correcto** — el slice plan decía 6 pero el draft S01 tenía un error aritmético. Si ves `hecho: 6`, algo está mal.
- Temática 4 es la única card sin imagen — es intencional, no un bug.
- Las 3 URLs sin `/thumb/` (Cisneros, Saavedra, French) son correctas para imágenes pequeñas de Commons — no "corregir" estas URLs.
- Los delays de SP1-2–SP1-5 ahora son 960–1200ms. Si en algún futuro slice aparecen valores menores a 960ms en esas cards, alguien los revirtió.
- La `card-nota-historiografica` en Temática 4 menciona a Mitre, Halperin Donghi, y la historiografía revisionista — verificar que las tres posiciones estén presentes en el contenido de la card.

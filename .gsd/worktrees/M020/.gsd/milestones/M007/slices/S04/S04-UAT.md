# S04: Alberdi multifacético — UAT

**Milestone:** M007
**Written:** 2026-03-21

## UAT Type

- UAT mode: artifact-driven + live-runtime
- Why this mode is sufficient: el sitio es estático; los checks estructurales (grep, Node.js gate) prueban la integridad del contenido integrado, y el browser live confirma que el reveal system y la sub-nav registraron los nuevos elementos. El UAT humano completa la verificación de profundidad histórica y coherencia narrativa.

## Preconditions

1. Estar en el directorio del worktree: `C:\Users\gabri\Desktop\historia\.gsd\worktrees\M007`
2. `grep -c 'data-certeza' index.html` debe devolver **50** antes de iniciar las pruebas.
3. El sitio puede servirse con `npx http-server . -p 8080 -c-1` o abrirse directamente como `file://` en el browser.
4. DevTools del browser deben estar abiertos en la pestaña Console durante las pruebas de browser.

## Smoke Test

Abrir `index.html` en el browser. Navegar (scroll o click en sub-nav) hasta el sub-período biográfico de Alberdi ("Formación"). Verificar que existe un `<h4>` con el texto **"Las múltiples dimensiones de Alberdi"** seguido de un grid de 5 cards.

**Expected:** el h4 es visible y las 5 cards se revelan con animación stagger al scrollear sobre ellas.

---

## Test Cases

### 1. Verificación shell de integridad estructural

```bash
grep -c 'data-certeza' index.html
```

**Expected:** 50

```bash
grep -c 'BIOG-1[2-6]' index.html
```

**Expected:** 5

```bash
node -e "const fs=require('fs');const n=(fs.readFileSync('index.html','utf8').match(/data-certeza/g)||[]).length;if(n<50){console.error('FAIL:'+n);process.exit(1);}console.log('OK:'+n);"
```

**Expected:** imprime `OK:50` y sale con exit code 0.

```bash
grep -c 'card-nota-certeza' index.html
```

**Expected:** ≥13 (valor esperado: 15 líneas / 16 spans DOM)

```bash
grep 'Iniciador\|rentístico\|Figarillo\|Sistema económico' index.html | wc -l
```

**Expected:** ≥4 matches (valor esperado: ≥7)

---

### 2. Verificación de que las 5 cards están en el sub-período correcto

En DevTools (Console):

```js
document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length
```

**Expected:** 16 (11 de S01–S03 + 5 de S04)

```js
document.querySelector('h4.sub-period__subtitle')?.textContent
```

**Expected:** `"Las múltiples dimensiones de Alberdi"`

---

### 3. Verificación del reveal system

En DevTools (Console):

```js
document.querySelectorAll('.reveal').length
```

**Expected:** 70

Luego, scrollear manualmente hacia abajo hasta el bloque "Las múltiples dimensiones de Alberdi" (dentro del sub-período biográfico de Alberdi en la sección 1800–1860).

**Expected:** las 5 cards aparecen con animación stagger (slide desde la derecha) en secuencia, a intervalos de ~80ms entre cada una.

---

### 4. Verificación del sub-nav (invariante)

En DevTools (Console):

```js
document.querySelectorAll('.sub-nav .sub-nav__link').length
```

**Expected:** 5 (invariante — S04 no agrega sub-períodos nuevos)

```js
document.querySelectorAll('#periodo-revolucion .sub-period').length
```

**Expected:** 5

---

### 5. Verificación de contenido de BIOG-12 (Periodista)

En el browser, encontrar la card de Alberdi periodista dentro del bloque temático.

Verificar que la card contiene:
- La palabra **"Iniciador"**
- La palabra **"Figarillo"**
- Una cita (`<cite>`) con referencia bibliográfica

**Expected:** card-hecho con certeza verde, texto sobre El Iniciador (1838) y el seudónimo "Figarillo".

---

### 6. Verificación de contenido de BIOG-14 (Músico) — corrección guitarra→piano

En el browser, encontrar la card de Alberdi músico/compositor.

Verificar que la card:
- Menciona **"piano"** (no "guitarra")
- Contiene al menos **dos** `<span class="card-nota-certeza">` (notas de certeza: instrumento/primer método + composiciones)

En shell:
```bash
grep -A 30 'BIOG-14' index.html | grep -c 'card-nota-certeza'
```

**Expected:** 2

---

### 7. Verificación de contenido de BIOG-15 (Economista)

En el browser, encontrar la card del economista.

Verificar que la card contiene:
- **"rentístico"** en el título o texto
- Año **1854** y ciudad **Besanzón** / **Besançon**
- Una `<span class="card-nota-certeza">` sobre el superlativo "primer tratado"

---

### 8. Verificación de BIOG-16 (Pensador en exilio) — card-opinion

En el browser, encontrar la última card del bloque temático.

Verificar que:
- Es una **card-opinion** (borde azul, sin certeza verde)
- Contiene un `<blockquote>` con atribución
- La atribución menciona a **Halperin Donghi** y/o **Mayer**
- El `data-certeza` es `"opinion"` o `"opinión"`

En shell:
```bash
grep -A 5 'BIOG-16' index.html | grep 'data-certeza'
```

**Expected:** contiene `data-certeza="opinion"` o `data-certeza="opinión"`

---

### 9. Verificación de que el puente narrativo no fue alterado

```bash
grep -n 'Los pueblos.*no tienen alas\|Puente narrativo' index.html
```

**Expected:** el comentario `<!-- Puente narrativo -->` y el texto "Los pueblos, como los hombres, no tienen alas" aparecen DESPUÉS de BIOG-16 y ANTES del cierre del sub-período biográfico.

En browser: el alberdi-quote con esta frase es visible debajo de las 5 cards temáticas, actuando como cierre hacia el Salón Literario.

---

### 10. Verificación de no-regresión: sin CSS ni JS nuevo

```bash
git diff HEAD~1 --name-only 2>/dev/null || git show --stat HEAD
```

**Expected:** únicamente `index.html` (y opcionalmente `S04-PLAN.md`) modificados. Ni `styles.css` ni `app.js` aparecen en el diff.

---

### 11. Verificación de no duplicación de imágenes de Alberdi

```bash
grep -c 'Juan_Bautista_Alberdi.jpg\|bastique.*Portrait\|Flickr.*bastique' index.html
```

**Expected:** 3 (las 3 ocurrencias pre-existentes — ninguna nueva en BIOG-12..16)

---

## Edge Cases

### Stagger delays correctos (80ms → 400ms)

```bash
grep -n 'reveal-delay' index.html | tail -8
```

**Expected:** las últimas 5 entradas muestran valores `80ms`, `160ms`, `240ms`, `320ms`, `400ms` — en ese orden, correspondiendo a BIOG-12..16.

---

### Certeza normalizada (sin acentos inconsistentes)

```bash
grep 'data-certeza' index.html | grep -v 'hecho\|opinion\|opinión\|rumor'
```

**Expected:** sin output (todos los valores son uno de los tres esperados)

---

### Las 16 cards de Alberdi en #rev-alberdi-formacion son continuas (sin cards de otras secciones)

```js
// En DevTools:
Array.from(document.querySelectorAll('#rev-alberdi-formacion [data-certeza]'))
  .map(el => el.id || el.querySelector('[class*="card"]')?.className || '(sin id)')
```

**Expected:** 16 elementos, todos dentro del sub-período biográfico.

---

## Failure Signals

- `grep -c 'data-certeza' index.html` devuelve menos de 50 → alguna card fue eliminada o la inserción de T02 falló. Usar `grep -n 'BIOG-1[2-6]' index.html` para localizar cuál falta.
- `grep -c 'BIOG-1[2-6]' index.html` devuelve 10+ → la inserción fue duplicada. Usar Node.js para eliminar el bloque duplicado.
- `document.querySelectorAll('.reveal').length` devuelve 65 → las nuevas cards no tienen clases `reveal reveal-slide`. Verificar con `grep -n 'reveal-slide' index.html | tail -10`.
- `document.querySelectorAll('#rev-alberdi-formacion [data-certeza]').length` devuelve 11 → las 5 cards temáticas no están dentro de `#rev-alberdi-formacion`. Verificar que el bloque está antes del cierre del div del sub-período.
- La card de Alberdi músico menciona "guitarra" en el texto principal → la corrección del T01 no se aplicó. Verificar `grep -n 'guitarra' index.html`.
- El h4 "Las múltiples dimensiones de Alberdi" no es visible → buscar con `grep -n 'múltiples dimensiones' index.html`. Si existe en el HTML pero no es visible, verificar clases CSS del contenedor padre.
- BIOG-16 aparece como card-hecho (borde verde) en lugar de card-opinion → verificar `grep -n 'BIOG-16' index.html` y confirmar que tiene clase `card-opinion`, no `card-hecho`.

---

## Not Proven By This UAT

- El comportamiento del reveal-on-scroll en Playwright headless — IntersectionObserver no dispara en viewport simulado. La verificación de animación real requiere un browser real (Chrome/Firefox) con el sitio abierto directamente.
- La verificación histórica de las afirmaciones marcadas con card-nota-certeza ("primer método en el Río de la Plata", "composiciones propias de Alberdi") — estas están intencionalmente marcadas como no verificadas y requieren investigación en archivos especializados (Instituto Juan Bautista Alberdi).
- La experiencia de usuario en mobile (≤480px) — las 5 cards temáticas deben colapsar a 1 columna con la misma responsive CSS que las otras cards, pero esto no se verificó explícitamente en S04.

---

## Notes for Tester

- Las 5 cards nuevas (BIOG-12..16) aparecen **después** de las 11 cards cronológicas (BIOG-1..11) dentro del sub-período biográfico "Alberdi: Formación". Hay que scrollear bastante hacia abajo dentro de la sección 1800–1860 para llegar.
- Si el sub-nav no está visible, navegar directamente a `#rev-alberdi-formacion` vía la URL.
- La card de músico (BIOG-14) tiene **dos** notas de certeza — esto es intencional y correcto, no un error de formato.
- La card de economista (BIOG-15) menciona **Besanzón** (castellanización de Besançon, Francia) — esto es históricamente correcto; no es un error tipográfico.
- Si el reviewer tiene acceso a *Mi vida privada* de Alberdi (Obras Completas, t. VIII) o al libro *Alberdi y su tiempo* de Jorge Mayer (1963), puede contrastar el contenido directamente con las fuentes primarias citadas en las cards.
- El valor correcto de `card-nota-certeza` en shell (grep) es 15 líneas; en DOM es 16 spans (dos en la misma línea en BIOG-14). Ambos son correctos.

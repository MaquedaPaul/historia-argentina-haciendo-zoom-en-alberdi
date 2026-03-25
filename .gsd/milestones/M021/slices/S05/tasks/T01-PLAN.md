---
estimated_steps: 5
estimated_files: 2
---

# T01: Añadir sub-nav link, timeline markers y CSS stagger para #rev-san-martin

**Slice:** S05 — Sub-nav, timeline y verificación final
**Milestone:** M021

## Description

Tres ediciones quirúrgicas en `index.html` y `styles.css` para conectar `#rev-san-martin` al sub-nav y al timeline de revolución, extender el CSS stagger para que los nuevos marcadores sean visibles, y confirmar que todos los criterios de aceptación del milestone M021 pasan.

**Contexto de estado actual:**
- `index.html` líneas 326–333: sub-nav con 7 links; `#rev-san-martin` ausente
- `index.html` líneas 2750–2815: `revolucion-timeline__track` con 10 marcadores (1810 en nth-child(2) hasta 1860 en nth-child(11)); progress div es nth-child(1)
- `styles.css` líneas ~1691–1789: stagger rules para dots (nth-child 2–11) y labels (nth-child 2–11); detenidos en nth-child(11) = 2.30s para dots, 2.50s para labels
- `#rev-san-martin` completo con 15 cards (global data-certeza = 108) — S04 completado

**Fórmula para marker positions:** `(año - 1800) / 60 * 100`
- 1812: `12/60 * 100 = 20.00%`
- 1813: `13/60 * 100 = 21.67%`
- 1817: `17/60 * 100 = 28.33%`
- 1818: `18/60 * 100 = 30.00%`

**nth-child mapping después de la inserción** (progress div = nth-child(1)):

| nth-child | Año | Nuevo |
|-----------|-----|-------|
| 2 | 1810 | — |
| 3 | 1812 | ✅ |
| 4 | 1813 | ✅ |
| 5 | 1816 | — |
| 6 | 1817 | ✅ |
| 7 | 1818 | ✅ |
| 8 | 1820 | — |
| 9 | 1826 | — |
| 10 | 1829 | — |
| 11 | 1835 | — |
| 12 | 1838 | — |
| 13 | 1845 | — |
| 14 | 1852 | — |
| 15 | 1860 | — |

**Nota crítica:** Los nuevos marcadores quedarán invisible (opacity:0, scale:0 nunca anima a 1) si NO se extienden las CSS stagger rules a nth-child(12)–(15). Este es el único paso no-obvio del slice.

## Steps

1. **Editar sub-nav en index.html** — Insertar el link a `#rev-san-martin` después de la línea `<a href="#rev-1800-1820" ...>` (línea ~329). El patrón exacto del codebase es `<a href="#id" class="sub-nav__link">YEAR<span class="sub-nav__link-label">Sublabel</span></a>`. Label: `1812–1822`, sublabel: `San Martín Libertador` (D073).

2. **Insertar timeline markers batch 1 en index.html** — Insertar dos marcadores (1812 below, 1813 above) entre el bloque `<!-- Marker 1: 1810 ... -->` y `<!-- Marker 2: 1816 ... -->`. Usar el patrón de edit exacto con el texto de cierre del bloque 1810 (`</div>`) y el comentario de inicio del bloque 1816 como ancla.

3. **Insertar timeline markers batch 2 en index.html** — Insertar dos marcadores (1817 above, 1818 below) entre el bloque 1816 y el bloque 1820. Usar el texto de cierre del bloque 1816 y el comentario `<!-- Marker 3: 1820 ...` como ancla.

4. **Extender CSS stagger en styles.css** — Append 4 reglas para dots después de la regla `nth-child(11)` existente (~línea 1719), y 4 reglas para labels después de la regla `nth-child(11)` existente (~línea 1789). Delays: dots a 2.50s, 2.65s, 2.80s, 2.95s; labels a 2.70s, 2.85s, 3.00s, 3.15s. **No** se necesita override para el `animation-name` de los marcadores `--above` (1813 y 1817) — la regla global `.revolucion-timeline__marker--above .revolucion-timeline__label { animation-name: rev-label-fade-above; }` ya aplica automáticamente a cualquier `--above` marker independientemente del nth-child.

5. **Verificación completa** — Ejecutar los 7 comandos de verificación del slice. Para 320px y 1920px+: abrir `index.html` en el browser (o usar `browser_navigate`/`browser_set_viewport`) para confirmar que los nuevos marcadores del timeline se ven correctamente y que el sub-nav link aparece. Verificar en consola del browser que `document.querySelectorAll('#rev-san-martin [data-certeza]').length` retorna 15 y que no hay errores JS. Confirmar visualmente que el badge de `data-certeza="debatido"` (card de Guayaquil) tiene el estilo correcto (blue tint de la clase `card-opinion`).

## Must-Haves

- [ ] `<a href="#rev-san-martin" class="sub-nav__link">1812–1822<span class="sub-nav__link-label">San Martín Libertador</span></a>` presente en el sub-nav
- [ ] 4 nuevos marcadores insertados en orden cronológico correcto en `revolucion-timeline__track`
- [ ] `grep -c 'revolucion-timeline__marker' index.html` → 14
- [ ] CSS stagger rules para nth-child(12), (13), (14), (15) presentes en `styles.css` — tanto dots como labels
- [ ] `grep -c 'nth-child(15)' styles.css` → 2
- [ ] JS syntax check pasa (`syntax OK`)
- [ ] `node -e "... boundary count ..."` → 15 (confirmación de que S04 sigue intacto)

## Verification

```bash
# 1. Sub-nav link presente
grep -c 'href="#rev-san-martin"' index.html
# → 1

# 2. Timeline markers total
grep -c 'revolucion-timeline__marker' index.html
# → 14

# 3. Marker 1812 en posición correcta
grep -c 'marker-pos: 20.00%' index.html
# → 1

# 4. Marker 1817 en posición correcta
grep -c 'marker-pos: 28.33%' index.html
# → 1

# 5. CSS stagger extendido a nth-child(15) — debe retornar 2 (dot + label)
grep -c 'nth-child(15)' styles.css
# → 2

# 6. Global data-certeza sigue en 108 (no se añadieron cards)
grep -c 'data-certeza' index.html
# → 108

# 7. JS syntax
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('syntax OK'); } catch(e) { if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('syntax OK (runtime-only error)'); }"
# → syntax OK

# 8. Boundary count en #rev-san-martin (confirmación integridad S04)
node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"
# → 15
```

**Browser UAT (manual o via browser tools):**
- 320px: sub-nav scrollable, sin overflow; timeline track visible; nuevos marcadores del timeline visibles (si el timeline ha salido del viewport, scrollear hasta él y verificar animación)
- 1920px+: sub-nav centrado, todos los links visibles; marcadores del timeline sin superposición de labels
- Badge de `data-certeza="debatido"` (card Guayaquil, `#rev-san-martin`) muestra estilo con tinte azul de `card-opinion`
- Sin errores JS en consola del browser

## Inputs

- `index.html` — sub-nav en líneas 326–333; `revolucion-timeline__track` en líneas 2750–2815; `#rev-san-martin` completo con 15 cards (S04 completo, global data-certeza = 108)
- `styles.css` — stagger rules para dots: líneas ~1691–1720 (nth-child 2–11); stagger rules para labels: líneas ~1761–1791 (nth-child 2–11); regla global `--above` label override: línea ~1803
- S04-SUMMARY.md — confirma: boundary count 15, global count 108, JS syntax OK, cierre `</div><!-- /#rev-san-martin -->` existe exactamente

## Expected Output

- `index.html` — sub-nav link a `#rev-san-martin` añadido; 4 marcadores de timeline insertados (1810-1812-1813-1816-1817-1818-1820...); total revolucion-timeline__marker = 14
- `styles.css` — 8 nuevas reglas CSS (4 dots + 4 labels para nth-child 12–15); sin cambios en ningún otro CSS
- Milestone M021 verificado como completo: todos los criterios de aceptación del roadmap pasan

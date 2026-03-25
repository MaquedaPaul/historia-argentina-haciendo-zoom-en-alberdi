# S02: Integración HTML — UAT

**Milestone:** M019
**Written:** 2026-03-25

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S02 es integración HTML pura — el artefacto entregado es `index.html` con contenido estático. La verificación mediante `grep` + syntax check de JS cubre el 100% del contrato del slice. La verificación visual en browser confirma el renderizado, pero no es necesaria para validar la correctitud estructural.

## Preconditions

- `index.html` accesible en `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M019/index.html`
- Node.js disponible para syntax check de `app.js`
- Navegador disponible para verificación visual (opcional, para test cases 4–5)
- Para el browser: abrir `index.html` directamente como archivo local (no requiere servidor)

## Smoke Test

```bash
grep -c "M019-[1-4]" index.html
```
Si devuelve `4`, el slice básicamente funcionó. Si devuelve `0`, las cards no se insertaron.

## Test Cases

### 1. Las 4 cards M019 están presentes en el HTML

```bash
grep -c "M019-[1-4]" index.html
```

**Expected:** `4`

### 2. `data-certeza` tiene formato correcto (sin corchetes)

```bash
# No debe haber ninguna con corchetes
grep -c 'data-certeza=\[hecho\]' index.html

# Debe haber al menos 4 nuevas con comillas dobles
grep -n 'data-certeza="hecho"' index.html | grep -E "2[2-3][0-9]{2}:"
```

**Expected:**
- Primera query: `0`
- Segunda query: 4 líneas en el rango 2287–2380

### 3. Stagger SP4 actualizado correctamente

```bash
grep -A3 "SP4-1" index.html | grep "reveal-delay"
grep -A3 "SP4-5" index.html | grep "reveal-delay"
```

**Expected:**
- SP4-1: `--reveal-delay: 320ms`
- SP4-5: `--reveal-delay: 640ms`

### 4. Cards 2 y 3 tienen blockquote con cita textual

```bash
grep -n 'blockquote class="card-opinion__quote"' index.html | awk -F: '$2 >= 2300 && $2 <= 2380'
```

**Expected:** 2 líneas en el rango 2307–2380 (correspondientes a M019-2 y M019-3)

### 5. Sin errores de sintaxis JS

```bash
node -e "try { new Function(require('fs').readFileSync('app.js','utf8')); console.log('OK'); } catch(e) { if(e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message); else console.log('OK'); }"
```

**Expected:** `OK`

### 6. Orden correcto: M019 antes de SP4

```bash
grep -n "M019-[1-4]\|SP4-[1-5]" index.html
```

**Expected:** Los comentarios `M019-1`, `M019-2`, `M019-3`, `M019-4` aparecen todos con números de línea **menores** que `SP4-1`, `SP4-2`, `SP4-3`, `SP4-4`, `SP4-5`.

### 7. (Browser) Cards visibles en #rev-1852-1860 antes de Alberdi/Bases

1. Abrir `index.html` en el navegador
2. Scrollear hasta la sección `#rev-1852-1860` (período 1800–1860)
3. Dentro del grid de eventos, localizar las cards antes del bloque "Bases y puntos de partida" (Alberdi)

**Expected:** Las 4 cards M019 aparecen en este orden antes de las cards SP4:
1. "Caseros (3 de febrero de 1852)" — card-hecho, sin blockquote
2. "Acuerdo de San Nicolás y las Jornadas de Junio" — card-hecho, con blockquote (cita del Acuerdo)
3. "Urquiza disuelve la Legislatura de Buenos Aires" — card-hecho, con blockquote (cita de la nota diplomática o decreto)
4. "La Revolución del 11 de Septiembre" — card-hecho, sin blockquote

### 8. (Browser) Animación reveal funciona al hacer scroll

1. Abrir `index.html` en el navegador desde la parte superior (no ya scrolleado)
2. Scrollear lentamente hasta `#rev-1852-1860`
3. Observar las cards M019 al entrar en el viewport

**Expected:** Cada card M019 aparece con animación slide-in al entrar en el viewport. El stagger hace que las cards entren escalonadas, y las SP4 cards que siguen también entran con sus propios delays (320ms, 400ms, etc.) — el efecto de cascada no se rompe.

## Edge Cases

### data-certeza con valor correcto pero clase incorrecta

```bash
grep -n "M019-[1-4]" index.html | while read line; do
  linenum=$(echo $line | cut -d: -f1)
  sed -n "${linenum},$((linenum+3))p" index.html | grep "card-hecho"
done
```

**Expected:** Cada card M019 tiene `class="event-card card-hecho reveal reveal-slide"`. Si alguna tiene `card-opinion` en lugar de `card-hecho`, el color del indicador de certeza será incorrecto.

### Stagger intermedio SP4-2..4 en secuencia correcta

```bash
for i in 2 3 4; do
  echo "SP4-$i:"; grep -A3 "SP4-$i" index.html | grep "reveal-delay"
done
```

**Expected:**
- SP4-2: `--reveal-delay: 400ms`
- SP4-3: `--reveal-delay: 480ms`
- SP4-4: `--reveal-delay: 560ms`

## Failure Signals

- `grep -c "M019-[1-4]" index.html` devuelve `0` → las cards no se insertaron
- `grep -c 'data-certeza=\[hecho\]' index.html` devuelve `> 0` → hay cards con el formato erróneo del draft (con corchetes)
- `grep -A3 "SP4-1" index.html | grep "reveal-delay"` muestra `0ms` → el stagger no se actualizó; las SP4 cards se solaparán visualmente con las M019 cards
- `node` syntax check devuelve `SYNTAX ERROR:` → modificación inadvertida de app.js durante el slice
- En browser: las cards M019 aparecen *después* de las cards de Alberdi/Bases → el punto de inserción fue incorrecto
- En browser: las cards M019 no tienen animación reveal → verificar `.is-visible` en DevTools Elements; si falta, el IntersectionObserver no está disparando (posiblemente `--reveal-delay` mal formateado)

## Not Proven By This UAT

- Que las imágenes Wikimedia carguen correctamente en el navegador (las URLs son reutilizadas de cards existentes, por lo que se asume que funcionan, pero no se verifica en este UAT)
- Que el sistema de reveal funcione en móvil (el reveal system es el mismo de milestones anteriores — probado en M002–M005)
- Corrección histórica del contenido (probada en S01 — fuera del scope de S02)
- Que las citas textuales en Cards 2 y 3 sean exactas al texto original (verificado en S01-CONTENT-DRAFT.md)

## Notes for Tester

- El check de stagger `grep -A3 "SP4-1" index.html | grep "reveal-delay"` puede devolver la línea del artículo SP4-1 que tiene el `style` inline — esto es correcto. El valor `320ms` es lo que se busca.
- Las cards M019 usan `class="event-card card-hecho reveal reveal-slide"`. Las Cards 2 y 3 son `card-hecho` con un `blockquote` interno, no `card-opinion` — esto es correcto y sigue el patrón establecido en SP4-1 (que también mezcla tipos para hechos con citas).
- El stagger de las 4 cards M019 propias (0ms, 80ms, 160ms, 240ms) es independiente del stagger SP4 ajustado (320ms–640ms). No son el mismo set.

# S01: Investigación y borrador — UAT

**Milestone:** M017
**Written:** 2026-03-24

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S01 produce un único artefacto de contenido (`S01-CONTENT-DRAFT.md`). No hay servidor, base de datos, ni UI en este slice. La correctitud del output se verifica completamente contra el archivo en disco: existencia, estructura, cobertura de certeza, URLs confirmadas, e integridad epistémica.

## Preconditions

- El archivo `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` debe existir en disco.
- Ejecutar todos los comandos desde el worktree raíz: `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M017`

## Smoke Test

```bash
test -f .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md && \
grep -c "^## URQ-" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```
**Esperado:** exit 0 y output `6`. Si cualquiera falla, el slice no está listo.

---

## Test Cases

### 1. Las 6 secciones de card existen con IDs correctos

```bash
grep "^## URQ-" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** Exactamente 6 líneas, una por cada ID:
```
## URQ-1
## URQ-2
## URQ-3
## URQ-4
## URQ-5
## URQ-6
```

---

### 2. Cobertura de certeza: ≥6 anotaciones data-certeza

```bash
grep -c "data-certeza=" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** ≥ 6. (Resultado real: 10 — 6 headers de card + 4 referencias en la sección de notas HTML para S02.)

---

### 3. Distribución correcta de certeza por card

```bash
grep "data-certeza=" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado (en headers de card):**
- URQ-1: `"hecho"`
- URQ-2: `"hecho"`
- URQ-3: `"hecho"`
- URQ-4: `"hecho"`
- URQ-5: `"debatido"`
- URQ-6: `"opini&#xF3;n"` (con entidad HTML, no ó literal)

Verificar específicamente la entidad de URQ-6:
```bash
grep 'opini&#xF3;' .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```
**Esperado:** ≥1 línea con la entidad HTML correcta.

---

### 4. Cero URLs de imagen pendientes (T02 completado)

```bash
grep "\[URL-PENDIENTE-VERIFICAR\]" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
echo "Exit code: $?"
```

**Esperado:** Sin output (0 líneas) y exit code `1`. Un exit code `0` con cualquier output indica que T02 no completó su trabajo.

---

### 5. Cuatro imágenes confirmadas con filenames reales

```bash
grep "CONFIRMADO" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** Exactamente 4 entradas confirmadas:
- URQ-1: `Justo_José_de_Urquiza.jpg` (en uso línea ~1636)
- URQ-3: `Palacio_San_José_Fachada.JPG` (filename corregido; sugerido no existía en Commons)
- URQ-4: `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg` (imagen < 500px, URL original = thumb)
- URQ-5: `Justo_José_de_Urquiza_(retrato).jpg` (en uso línea ~2328)

---

### 6. URLs reales de Wikimedia presentes para URQ-3 y URQ-4

```bash
grep "upload.wikimedia.org" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** Exactamente 2 URLs, una por card:
- URQ-3: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Palacio_San_Jos%C3%A9_Fachada.JPG/500px-Palacio_San_Jos%C3%A9_Fachada.JPG`
- URQ-4: `https://upload.wikimedia.org/wikipedia/commons/2/2e/Daguerrotipo_de_Justo_Jos%C3%A9_de_Urquiza_%28recorte%29.jpg`

---

### 7. Marcadores de integridad epistémica presentes en URQ-5

```bash
grep -c "PARÁFRASIS" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** `2` — un marcador por cada posición historiográfica (revisionista y liberal/síntesis). Estos deben estar presentes para que S02 sepa que no puede usar estas líneas como blockquotes directos.

---

### 8. La cita Alberdi de líneas ~2274–2276 NO está en el draft (no duplicación)

```bash
grep -i "con una dedicatoria que era también" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** Sin output, exit code `1`. Si hay output, URQ-6 está repitiendo la cita ya en index.html.

---

### 9. El anchor de inserción para S02 está documentado

```bash
grep "rev-1835-1852\|rev-urquiza-perfil" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** Al menos 2 líneas — una con `<!-- /#rev-1835-1852 -->` como anchor grep-estable y otra con `div id="rev-urquiza-perfil"` como nombre del nuevo bloque.

---

### 10. El sub-nav link para S02 está documentado

```bash
grep "sub-nav__link" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** Al menos 1 línea con el HTML del 8° link `href="#rev-urquiza-perfil"`.

---

## Edge Cases

### La API Wikimedia devuelve URL original para imagen < 500px (URQ-4)

Verificar que el draft documenta explícitamente que URQ-4 usa URL original (no thumb) por ser la imagen de 421×540px menor al ancho solicitado:

```bash
grep "421\|421×540\|sin thumb\|URL del archivo original\|URL (original = thumb)" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** ≥1 línea que documente este comportamiento. Si S02 intenta construir una URL thumb para el daguerrotipo, fallará silenciosamente — la documentación explícita previene ese error.

---

### card-nota-certeza inline en URQ-3

```bash
grep "card-nota-certeza" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Esperado:** ≥1 línea con el span de nota en el excerpt de URQ-3. Este span debe preservarse cuando S02 integra el HTML — no es decorativo, es un flag epistémico visible para el lector.

---

### Las cards sin imagen (URQ-2, URQ-6) tienen nota explícita

```bash
grep -A5 "## URQ-2" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md | grep -i "imagen\|ninguna\|N/A"
grep -A5 "## URQ-6" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md | grep -i "imagen\|ninguna\|intencional"
```

**Esperado:** Cada sección documenta la ausencia de imagen como decisión intencional, no como omisión. URQ-2: sin imagen disponible para combates militares. URQ-6: ausencia intencional para ritmo visual.

---

## Failure Signals

- `test -f S01-CONTENT-DRAFT.md` → exit 1: el archivo no existe; T01 no completó.
- `grep -c "^## URQ-"` devuelve < 6: el draft está incompleto; verificar si alguna sección fue truncada.
- `grep "\[URL-PENDIENTE-VERIFICAR\]"` devuelve output (exit 0): T02 no terminó o la API falló; las URLs pendientes deben resolverse antes de que S02 pueda integrar las imágenes.
- `grep "CONFIRMADO"` devuelve < 4 entradas: alguna imagen quedó sin confirmar.
- `grep 'opini&#xF3;'` no devuelve output: URQ-6 tiene ó literal en lugar de entidad HTML — riesgo de corrupción en ediciones Windows.
- `grep -c "PARÁFRASIS"` devuelve 0: los marcadores de paráfrasis fueron eliminados — S02 podría usar el texto de URQ-5 como cita directa sin saberlo.

---

## Not Proven By This UAT

- La exactitud histórica de los hechos en los excerpts no puede verificarse mecánicamente — fue verificada en S01-RESEARCH.md durante T01, pero requiere revisión humana para confirmar.
- Que las URLs confirmadas siguen siendo válidas en el futuro — Wikimedia Commons puede mover o eliminar archivos; las URLs son puntos de tiempo.
- Que el HTML generado por S02 a partir de este draft renderizará correctamente en todos los navegadores — eso es responsabilidad de S02-UAT.
- Que los 4 sub-nav links existentes en index.html más el nuevo 8° link para URQ no causarán overflow visual en mobile — S02 debe verificar en viewport 375px.

---

## Notes for Tester

- El draft incluye una sección completa "Notas de inserción HTML para S02" al final — es la guía operativa para el executor de S02 y contiene el punto de inserción, la estructura HTML del sub-período, y los recordatorios de certeza.
- Los marcadores `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]` en URQ-5 son intencionalmente verbosos — están diseñados para que cualquier editor que los vea no los pase a HTML sin leerlos.
- La "tabla de estado de imágenes" al pie del draft es la fuente de verdad de imagen: 4 filas ✅ CONFIRMADO, 2 filas N/A. Si S02 necesita una URL rápida, esta tabla es el primer lugar donde mirar.
- El Palacio San José (URQ-3) tiene **thumburl 500px** — usar esa URL, no la URL original que también está documentada. El daguerrotipo (URQ-4) NO tiene thumb 500px — usar la URL original y aplicar `width="100%"` al `<img>`.

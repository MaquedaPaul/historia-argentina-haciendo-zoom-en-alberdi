---
estimated_steps: 5
estimated_files: 1
---

# T01: Verificar imágenes Wikimedia via API y escribir S01-CONTENT-DRAFT.md

**Slice:** S01 — Research y content draft verificado — arco completo San Martín
**Milestone:** M021

## Description

El research histórico de las 15 entradas ya está completamente verificado en `S01-RESEARCH.md` (preloaded en contexto). El único trabajo pendiente es:

1. Consultar la Wikimedia API para cada imagen candidata marcada como `PENDIENTE API`, obtener la URL real del thumb 500px (o URL directa si la imagen es pequeña), y documentar el fallback si la imagen no existe o no tiene la calidad requerida.
2. Escribir `S01-CONTENT-DRAFT.md` en el formato estructurado canónico que consumirán los executors de S02, S03, y S04.

**Decisiones ya tomadas (no requieren investigación):**
- Sub-período `#rev-san-martin` se inserta ENTRE `#rev-1800-1820` y `#rev-1820-1835` (después de `</div><!-- /#rev-1800-1820 -->`, antes del conector alberdi)
- Sub-nav label: `1812–1822` con sublabel `San Martín Libertador`
- 15 cards exactas con la granularidad documentada en S01-RESEARCH.md
- Certeza distribution: 9 hecho, 3 debatido, 1 opinión, 1 hecho-con-card-nota-certeza
- Entradas 3, 4, 12 requieren `card-nota-historiografica`

## Steps

1. **Verificar las 7 imágenes PENDIENTE API via Wikimedia API.** Para cada imagen candidata usar `fetch_page` o `browser_navigate` con la URL de API:
   ```
   https://en.wikipedia.org/w/api.php?action=query&titles=File:NOMBRE_ARCHIVO&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json
   ```
   Candidatos a verificar:
   - `File:Regimiento_de_Granaderos_a_Caballo.jpg` (Entrada 5)
   - `File:Combate_de_San_Lorenzo.jpg` (Entrada 6)
   - `File:San_Martín_en_los_Andes,_1817_(1908).jpg` (Entrada 7)
   - `File:Cruce_de_los_Andes.jpg` (Entrada 8)
   - `File:Batalla_de_Chacabuco_(1817).jpg` (Entrada 9)
   - `File:Batalla_de_Maipu.jpg` (Entrada 10)
   - `File:Encuentro_de_San_Martin_y_Bolivar_en_Guayaquil.jpg` (Entrada 12)

   Para cada una: si la API retorna `thumburl` → usar esa URL. Si la imagen es más pequeña que 500px → usar `url` directo. Si el archivo no existe → buscar con `list=search&srnamespace=6&srsearch=TÉRMINO` para encontrar el nombre real. Fallback universal para cualquier imagen no encontrada: retrato Gil de Castro ya verificado:
   ```
   https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg
   ```

2. **Para Entradas sin imagen específica** (1, 2, 3, 4, 11, 13, 14, 15) que ya usan el retrato Gil de Castro u otros retratos conocidos: confirmar que la URL del retrato Gil de Castro (ya verificada — está en SP1-5 de index.html) es la que se usará, o buscar alt más apropiado para cada entrada si el research indica un candidato alternativo.

3. **Construir la tabla de resolución de imágenes** como sección del header del draft: para cada entrada, `[número] → URL_verificada (fuente: API / fallback: motivo)`.

4. **Escribir `S01-CONTENT-DRAFT.md`** en el formato canónico especificado abajo. Cada entrada debe tener todos los campos completos — ningún campo puede quedar vacío o con `PENDIENTE`.

5. **Verificar el draft con grep** antes de commitear:
   ```bash
   grep -c "^## Entrada" S01-CONTENT-DRAFT.md   # debe ser 15
   grep -c "^certeza:" S01-CONTENT-DRAFT.md       # debe ser >= 15
   grep -c "wikimedia:" S01-CONTENT-DRAFT.md      # debe ser >= 10
   grep -c "nota-historiografica: true" S01-CONTENT-DRAFT.md  # debe ser >= 3
   grep -q "PENDIENTE" S01-CONTENT-DRAFT.md && echo "FAIL: hay PENDIENTEs" || echo "OK"
   ```

## Formato canónico de S01-CONTENT-DRAFT.md

El archivo debe comenzar con un encabezado de metadatos seguido de las 15 entradas. Cada entrada usa exactamente este formato:

```markdown
## Entrada N: Título

año: XXXX – XXXX
certeza: hecho | debatido | opinión
nota-historiografica: true | false
card-opinion: true | false

### Excerpt
[2–4 oraciones para el cuerpo principal de la card]

### Detalle expandible
[2–4 párrafos para el bloque expand/collapse]

### Fuentes
- Fuente 1
- Fuente 2
[...]

### Wikimedia
wikimedia: URL_VERIFICADA
alt: [texto alternativo descriptivo]
atribucion: [crédito si CC BY-SA, vacío si PD]

### Notas historiográficas
[Solo si nota-historiografica: true — las tres posiciones con atribución por posición]
```

El encabezado del archivo debe incluir:

```markdown
# S01-CONTENT-DRAFT — Arco San Martín (M021)

## Decisiones estructurales (formalmente tomadas)

- Posición: #rev-san-martin entre #rev-1800-1820 y #rev-1820-1835
- Sub-nav label: "1812–1822" / sublabel: "San Martín Libertador"
- Timeline markers: 1812 (below, 20.00%), 1813 (above, 21.67%), 1817 (above, 28.33%), 1818 (below, 30.00%)
- Certeza distribution: 9 hecho, 3 debatido, 1 opinión, 1 hecho+card-nota-certeza
- Cards con nota-historiografica: Entrada 3 (logias/regreso), Entrada 4 (Logia Lautaro), Entrada 12 (Guayaquil)
- Card 15 es card-opinion pura (data-certeza="opinión")

## Tabla de imágenes verificadas

| Entrada | Imagen | URL | Fuente |
|---------|--------|-----|--------|
[completar con resultados de la API]
```

## Contenido fuente para las 15 entradas

Todo el contenido histórico verificado está en `S01-RESEARCH.md` (debe estar preloaded en el contexto del executor). Las 15 entradas con excerpt, detalle, fuentes, y notas historiográficas completas están ya redactadas — el executor copia ese contenido al formato canónico y añade las URLs Wikimedia verificadas.

**Resumen de las 15 entradas y sus propiedades:**

| N | Título | Año | Certeza | NH | Card-Op |
|---|--------|-----|---------|-----|---------|
| 1 | Infancia en Yapeyú | 1778–1789 | hecho | false | false |
| 2 | El oficial profesional | 1789–1811 | hecho | false | false |
| 3 | Cádiz, las logias y la decisión de volver | 1810–1812 | debatido | **true** | true |
| 4 | La Logia Lautaro | 1812–1816 | debatido | **true** | true |
| 5 | Creación del Regimiento de Granaderos | 1812 | hecho | false | false |
| 6 | El combate de San Lorenzo | 3 feb 1813 | hecho | false | false |
| 7 | Cuyo y la preparación del Ejército de los Andes | 1814–1816 | hecho | false | false |
| 8 | El cruce de los Andes | Enero 1817 | hecho | false | false |
| 9 | Batalla de Chacabuco | 12 feb 1817 | hecho | false | false |
| 10 | Cancha Rayada y Maipú | 19 mar – 5 abr 1818 | hecho | false | false |
| 11 | Campaña al Perú y el Protectorado | 1820–1822 | hecho | false | false |
| 12 | La entrevista de Guayaquil | 26–27 jul 1822 | debatido | **true** | true |
| 13 | El retiro del poder | 1822–1824 | hecho+nota-certeza | false | false |
| 14 | El exilio y los últimos años | 1824–1850 | hecho | false | false |
| 15 | El legado | 1850–hoy | opinión | false | **true** |

**Nota sobre certeza encoding (patrón D057):**
- `data-certeza="hecho"` → certeza: hecho
- `data-certeza="debatido"` → certeza: debatido (SIN acento — ver KNOWLEDGE.md sobre normalización)
- `data-certeza="opinión"` → certeza: opinión (con acento, consistente con S17)
- Entrada 13: `data-certeza="hecho"` con `<span class="card-nota-certeza">` inline para la variación de la frase exacta

## Must-Haves

- [ ] Archivo `S01-CONTENT-DRAFT.md` escrito y completo — exactamente 15 entradas con todos los campos
- [ ] Las 7 imágenes PENDIENTE API verificadas (URL real o fallback documentado con motivo)
- [ ] Entradas 3, 4, 12 con `nota-historiografica: true` y las tres posiciones redactadas con atribución
- [ ] Entrada 15 con `card-opinion: true` y certeza: opinión
- [ ] Ningún campo con texto `PENDIENTE` o `TBD` en el draft final
- [ ] Decisiones estructurales (posición sub-período, sub-nav label, timeline markers) en el encabezado del draft
- [ ] `grep -c "^## Entrada" S01-CONTENT-DRAFT.md` retorna `15`

## Verification

```bash
# Desde el directorio raíz del worktree M021
DRAFT=".gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md"

test -f "$DRAFT" && echo "EXISTS" || echo "MISSING"
grep -c "^## Entrada" "$DRAFT"          # esperado: 15
grep -c "^certeza:" "$DRAFT"             # esperado: >= 15
grep -c "^wikimedia:" "$DRAFT"           # esperado: >= 10
grep -c "nota-historiografica: true" "$DRAFT"  # esperado: >= 3
grep -q "PENDIENTE" "$DRAFT" && echo "FAIL: PENDIENTEs presentes" || echo "OK: sin PENDIENTEs"
```

## Inputs

- `S01-RESEARCH.md` — contenido histórico completo, ya verificado, con las 15 entradas. El executor NO necesita hacer investigación histórica adicional — todo está en ese archivo. El contenido debe copiarse/adaptarse al formato canónico.
- Wikimedia API: `https://en.wikipedia.org/w/api.php` — para verificar thumb URLs de las 7 imágenes pendientes.
- La imagen ya verificada (retrato Gil de Castro) como fallback universal:
  `https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg/500px-General_Jos%C3%A9_de_San_Mart%C3%ADn_por_Gil_de_Castro.jpg`

## Expected Output

- `.gsd/milestones/M021/slices/S01/S01-CONTENT-DRAFT.md` — draft canónico con 15 entradas estructuradas, URLs Wikimedia verificadas, certeza y notas historiográficas completas. Este archivo es el contrato de entrada para los executors de S02, S03, y S04.

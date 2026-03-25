---
estimated_steps: 4
estimated_files: 1
---

# T01: Escribir S01-CONTENT-DRAFT.md con las 4 cards verificadas

**Slice:** S01 — Investigación y borrador
**Milestone:** M018

## Description

Producir el artefacto contrato `S01-CONTENT-DRAFT.md` con las 4 cards del camino a Caseros estructuradas en el formato estándar del proyecto. Toda la investigación factual ya está completada en `S01-RESEARCH.md` — esta tarea transcribe y estructura ese material en el formato de draft que S02 consume para generar HTML.

Las 4 cards cubren el proceso de 9 meses previo a la batalla: el Pronunciamiento (CAM-1), la triple alianza y campaña en Uruguay (CAM-2), el Ejército Grande y cruce del Paraná (CAM-3), y las consecuencias inmediatas de Caseros (CAM-4). La batalla misma NO se cubre — ya existe la card SP3-6 en index.html.

## Steps

1. Leer `.gsd/milestones/M018/slices/S01/S01-RESEARCH.md` para extraer hechos, fechas, fuentes, y notas de imagen de cada card.
2. Crear `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` con cabecera de metadata y 4 secciones `## CAM-1` … `## CAM-4`.
3. Para cada card, escribir: título, año-display, clase CSS (`card-hecho` o según corresponda), data-certeza, excerpt (2–4 oraciones), fuentes (≥2), filename de imagen candidata, y notas de inserción.
4. Verificar que ningún claim central del draft duplica SP3-6: no usar "~45.000 vs. ~22.000", no describir la batalla misma, no mencionar el exilio de Rosas como hecho propio de estas cards.

## Must-Haves

- [ ] Exactamente 4 secciones `## CAM-1`, `## CAM-2`, `## CAM-3`, `## CAM-4`
- [ ] Cada card-hecho tiene ≥2 fuentes citadas con autor, título, y año
- [ ] Ninguna card repite como claim central los datos ya en SP3-6 (batalla, cifras, exilio)
- [ ] CAM-4 no incluye nuevo `<blockquote class="alberdi-quote">` — si menciona las Bases, usar paráfrasis atribuida
- [ ] Certeza de cada card justificada: CAM-1, CAM-2, CAM-3 → `card-hecho`; CAM-4 puede ser `card-hecho` o `card-opinion` según lo que justifique el contenido (consecuencias inmediatas son hechos documentados; interpretación del significado sería opinión)
- [ ] Sub-período de destino documentado: `#rev-camino-caseros`, insertar ANTES de `</div><!-- /#rev-1835-1852 -->` en index.html línea ~2270

## Verification

```bash
grep -c "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
# → 4

test -s .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md && echo "draft no vacío"
```

## Inputs

- `.gsd/milestones/M018/slices/S01/S01-RESEARCH.md` — hechos verificados, fechas, fuentes académicas, filenames de imágenes candidatas, notas de restricciones (no duplicar SP3-6, no alberdi-quote nuevo, etc.)
- `index.html` líneas 2247–2270 — card SP3-6 existente y anchor de inserción `</div><!-- /#rev-1835-1852 -->` (para confirmar qué NO duplicar)

**Hechos clave del research para CAM-1 (Pronunciamiento):**
- Fecha y lugar: 1° de mayo de 1851, plaza de Concepción del Uruguay, Entre Ríos
- Mecanismo: Urquiza aceptó la renuncia ritual anual de Rosas al manejo de relaciones exteriores (habitualmente rechazada), usando el Pacto Federal de 1831
- Solo Corrientes (gobernador Benjamín Virasoro) adhirió; las demás provincias repudiaron
- Motivación económica: restricciones rosistas sobre comercio entrerriano con Montevideo sitiada
- Fuentes: elhistoriador.com.ar, Wikipedia ES (Pronunciamiento de Urquiza), argentinahistorica.com.ar
- Imagen candidata: `Justo_J._Urquiza._Presidente_of_the_Argentine_Confederation.jpg`

**Hechos clave para CAM-2 (Triple alianza y campaña en Uruguay):**
- Tratado del 29 de mayo 1851: Entre Ríos + Brasil + gobierno de la Defensa de Montevideo; objetivo declarado: expulsar a Oribe
- Cláusula secreta (art. 15/18): si Rosas reaccionaba bélicamente → alianza contra la Confederación; Rosas declaró guerra a Brasil el 18 ago 1851, activándola
- 16 jul 1851: Urquiza cruzó el Uruguay con ~6.000 hombres; Brasil ingresó por el norte
- 8 oct 1851: Capitulación de Oribe; fin del Sitio de Montevideo (1843–1851); "ni vencidos ni vencedores"
- Tratado del 21 nov 1851: Brasil + Uruguay + Entre Ríos + Corrientes; objetivo: "liberar al pueblo argentino de la opresión... de Rosas"
- Fuentes: argentinahistorica.com.ar, Wikipedia ES (Guerra Grande), laguia2000.com
- Imagen candidata: `Batalha_dos_Santos_Logares_(3_de_fevereiro_de_1852).jpg`

**Hechos clave para CAM-3 (Ejército Grande y campaña):**
- Composición según Ricardo Levene (citado por elarcondelahistoria.com): 28.189 totales — ~10.670 entrerrianos, ~5.260 correntinos, ~4.249 porteños incorporados, ~4.040 brasileños, ~1.907 orientales + bagajes
- Jefes: Urquiza (comandante general), Virasoro (Corrientes), Caxias (Brasil), Mitre y Sarmiento (divisiones porteñas)
- 20–23 dic 1851: cruce del Paraná en Diamante/Punta Gorda; infantería en buques brasileños, caballería a nado; desembarco en Coronda
- Llegó a Luján el 29 enero 1852; Rosas presentó batalla en Caseros el 3 feb 1852
- Fuentes: Wikipedia EN (Ejército Grande), elarcondelahistoria.com (Levene), vallemaria.gob.ar
- Imagen candidata: `La_Batalla_de_Caseros_2.JPG` — NO usar `Batalla_de_Caseros_3_Febrero_1852.jpg` (ya en SP3-6)

**Hechos clave para CAM-4 (Consecuencias inmediatas):**
- Rosas renunció el 3 feb 1852 y fue embarcado en la fragata británica *Centaur* (cónsul Robert Gore) rumbo a Southampton
- Vicente López y Planes nombrado gobernador interino de Buenos Aires el 4 feb 1852
- El Acuerdo de San Nicolás (31 mayo 1852) convocó el Congreso Constituyente que produciría la Constitución de 1853
- Sombra de la ruptura: Buenos Aires rechazó el Acuerdo de San Nicolás (sep 1852), configurando la escisión Confederación vs. Buenos Aires que duraría hasta 1861
- CAM-4 es hecho documentado para el 3–4 feb 1852; la interpretación del significado puede mencionarse en tono factual
- Sin imagen obligatoria; si se usa una, debe ser distinta a las tres ya asignadas y a SP3-6

## Observability Impact

**What signals change when T01 runs:**
- `S01-CONTENT-DRAFT.md` is created (0 bytes → ~12K). Its existence is the primary signal.
- `grep -c "^## CAM-"` on the draft returns 4; any other count means the task failed or was interrupted mid-write.
- `grep -c "PENDIENTE"` returns ≥3 (one per candidate image); this confirms T02 has work to do.
- `grep -c "CONFIRMADO"` returns 0 at end of T01 (all images PENDIENTE); T02 changes this to ≥3.

**How a future agent inspects this task's output:**
- `cat .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — full draft with 4 CAM sections
- `grep "^## CAM-" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — lists sections
- `grep "PENDIENTE\|CONFIRMADO\|FALLO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — image status summary
- `grep "thumburl" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — shows all thumburl lines (filled by T02)

**Failure states:**
- File missing: T01 never ran or write was interrupted.
- File exists but `grep -c "^## CAM-"` < 4: write was truncated; re-run T01.
- File has 4 sections but all images still PENDIENTE after T02: T02 was skipped; slice verification will fail.
- Any `FALLO` entry after T02: Wikimedia API lookup failed for that image; S02 must not use that filename until resolved.

## Expected Output

- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — archivo nuevo con metadata header y 4 secciones ## CAM-N completas. T02 actualizará este archivo con thumburls confirmados.

---
estimated_steps: 6
estimated_files: 1
---

# T01: Redactar S06-CONTENT-DRAFT.md con BIOG-19 y BIOG-20 verificados

**Slice:** S06 — Quién era Facundo Quiroga y con quién estaba cuando recibió la carta
**Milestone:** M007

## Description

Producir el content draft para las dos cards de S06: BIOG-19 (perfil biográfico de Facundo Quiroga) y BIOG-20 (el entorno de Quiroga en Buenos Aires 1833–1835). El draft incluye HTML de excerpt listo para copiar, certeza clasificada, fuentes citadas, y notas de certeza/historiográficas con texto exacto.

La investigación está completa en `S06-RESEARCH.md` (inlineada en el contexto de planificación). El riesgo de esta tarea es la clasificación correcta de certeza y el manejo de la paradoja Quiroga/federalismo — que debe presentarse con atribución a la correspondencia con Rosas, no como dato absoluto.

## Steps

1. Abrir `index.html` y leer el bloque `#rev-alberdi-quiroga` (líneas ~736–848) para confirmar el ancla de inserción y el patrón de las cards BIOG-17/18 que se continuarán.

2. Redactar **BIOG-19** en `S06-CONTENT-DRAFT.md` con:
   - Certeza: `card-hecho`
   - Año: 1788–1835 (abarca vida completa del personaje)
   - Título: "El Tigre de los Llanos: quién era Juan Facundo Quiroga"
   - Excerpt (≈4 párrafos): nacimiento 27 nov 1788, San Antonio de los Llanos, La Rioja; padres Prudencio Quiroga + Juana Rosa Argañaraz; caudillo federal que derrotó unitarios en La Ciudadela (1831) pero perdió en La Tablada (1829) y Oncativo (1830); aliado de Rosas y López; declaración privada en carta a Rosas — "mis ideas son en realidad unitarias" (atribuida, con card-nota-certeza); residencia en Buenos Aires desde dic 1833; asesinado Barranca Yaco, 16 feb 1835.
   - `card-nota-historiografica` obligatoria: Sarmiento inmortalizó a Quiroga en *Facundo: Civilización y Barbarie* (1845) como símbolo de la "barbarie" caudillista — texto político-literario escrito desde el exilio chileno, no historia neutral. Historiadores posteriores como Ariel de la Fuente (*Children of Facundo*, 2000) ofrecen una lectura más compleja del caudillismo riojano.
   - Imagen: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg/500px-Facundo_Quiroga_por_Garc%C3%ADa_del_Molino.jpg` (retrato García del Molino, Wikimedia Commons, dominio público)
   - Stagger: `--reveal-delay: 0ms`
   - Fuentes: Wikipedia EN ("Facundo Quiroga"), buscabiografias.com, historiaybiografias.com, revisionistas.com.ar, comercioyjusticia.info

3. Redactar **BIOG-20** en `S06-CONTENT-DRAFT.md` con:
   - Certeza: `card-hecho`
   - Año: 1833–1834
   - Título: "El círculo de Quiroga en Buenos Aires: Santos Ortiz y Braulio Costa"
   - Excerpt (≈3 párrafos): motivaciones para residir en BA (salud/reuma, hijos en escuelas porteñas, actividades comerciales); secretario personal **José Santos Ortiz** (coronel letrado, a su lado para despachar correspondencia cada mañana); agente comercial y amigo **Braulio Costa**; encargo del gobernador Maza como mediador en disputa Salta-Tucumán; partió 18 dic 1834 acompañado de Santos Ortiz; Rosas lo acompañó hasta San Antonio de Areco.
   - `card-nota-certeza` obligatoria: la identidad de las personas presentes en el momento exacto en que Alberdi entregó la carta (octubre-noviembre de 1834) no está documentada individualmente en las fuentes primarias. Santos Ortiz era el secretario habitual de Quiroga para su correspondencia matutina, pero no existe evidencia directa de su presencia en ese encuentro específico. Santos Ortiz moriría junto a Quiroga en Barranca Yaco el 16 de febrero de 1835.
   - Sin imagen (card sin `.card-image` — patrón existente de cards sin imagen)
   - Stagger: `--reveal-delay: 80ms`
   - Fuentes: revisionistas.com.ar ("Facundo Quiroga en Buenos Aires"), comercioyjusticia.info, repositoriouba.sisbi.uba.ar

4. Para cada card, incluir en el draft el HTML completo del `<article>` listo para copiar — incluido el comentario HTML `<!-- BIOG-N: ... -->` que precede al artículo, el `id`, las clases, el `data-certeza`, el `style` de stagger, y todos los elementos interiores.

5. Documentar el ancla de inserción: insertar el nuevo bloque ANTES de `</div><!-- /#rev-alberdi-quiroga -->` (~línea 848). La estructura del bloque:
   ```
   <h4 class="sub-period__subtitle reveal reveal-fade" style="--reveal-delay: 0ms">Facundo Quiroga: el hombre que conoció Alberdi</h4>
   <div class="events-grid events-grid--certeza" aria-label="Perfil biográfico de Facundo Quiroga">
     [BIOG-19]
     [BIOG-20]
   </div>
   ```
   Nota: el `<h4>` lleva `reveal reveal-fade` porque es un elemento visual que debe aparecer con scroll, mismo patrón que otros `sub-period__subtitle` usados en S04.

6. Anotar las fuentes usadas por card, verificar que cada `card-hecho` tiene ≥2 fuentes, y que la `card-nota-historiografica` de BIOG-19 menciona tanto a Sarmiento como a la historiografía posterior.

## Must-Haves

- [ ] BIOG-19 clasificada como `card-hecho` con `card-nota-historiografica` que menciona Sarmiento/*Facundo* (1845) y De la Fuente (2000)
- [ ] BIOG-20 clasificada como `card-hecho` con `card-nota-certeza` que acota explícitamente la incertidumbre sobre los testigos del encuentro
- [ ] Santos Ortiz nombrado en BIOG-20 como secretario habitual — y aclarado en la nota que no hay evidencia directa de su presencia en el momento exacto de la entrega
- [ ] La paradoja "mis ideas son unitarias" (si se incluye) atribuida a carta de Quiroga a Rosas, no presentada como dato absoluto
- [ ] HTML de excerpt completo para ambas cards incluido en el draft
- [ ] Ancla de inserción documentada en el draft

## Verification

- `test -f .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → exit 0
- `grep -c 'BIOG-19\|BIOG-20' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → ≥4
- `grep -q 'card-nota-historiografica' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → exit 0
- `grep -q 'card-nota-certeza' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → exit 0
- `grep -q 'Santos Ortiz' .gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` → exit 0

## Inputs

- `index.html` — leer bloque `#rev-alberdi-quiroga` (líneas ~736–848) para confirmar ancla y patrón de cards BIOG-17/18
- `S06-RESEARCH.md` — hechos verificados para BIOG-19 y BIOG-20 ya inlineados en el contexto de planificación de la slice; fuentes documentadas por hecho
- `.gsd/KNOWLEDGE.md` — patrón `card-nota-historiografica` (sección "Nota Historiográfica Pattern"); patrón `card-nota-certeza` (sección "Inline Epistemic Flag Pattern"); patrón Node.js CRLF-safe (sección "Node.js Line-Split/Splice")

## Expected Output

- `.gsd/milestones/M007/slices/S06/S06-CONTENT-DRAFT.md` — archivo con:
  - Sección BIOG-19: título, año, certeza, HTML completo del article, fuentes ≥2, texto de card-nota-historiografica
  - Sección BIOG-20: título, año, certeza, HTML completo del article, fuentes ≥2, texto de card-nota-certeza
  - Sección de ancla de inserción con línea objetivo en index.html

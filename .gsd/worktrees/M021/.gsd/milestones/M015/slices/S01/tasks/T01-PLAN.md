---
estimated_steps: 4
estimated_files: 1
---

# T01: Escribir el borrador de contenido verificado (S01-CONTENT-DRAFT.md)

**Slice:** S01 — Investigación y borrador
**Milestone:** M015

## Description

La investigación sobre la formación de la Generación del 37 está completa (ver S01-RESEARCH.md, inlineado abajo en Inputs). Esta tarea toma esos hechos verificados y los convierte en un archivo de draft estructurado con 5 cards listas para ser integradas en HTML por S02. No hay investigación adicional que hacer — el trabajo aquí es editorial: seleccionar el texto más preciso, aplicar la certeza correcta, y formatear cada card siguiendo el template establecido.

El archivo producido (`S01-CONTENT-DRAFT.md`) es el contrato entre S01 y S02. S02 lo consumirá directamente sin necesidad de re-investigar.

## Steps

1. **Crear `S01-CONTENT-DRAFT.md`** con cabecera de metadata: sección ID (`#rev-generacion-37`), punto de inserción (después de línea 1439 en index.html — `</div><!-- /#rev-1820-1835 -->`), link de sub-nav a insertar después de línea 330, y mapa de no-duplicación.

2. **Escribir las 5 cards** en orden GEN37-1 a GEN37-5, cada una con:
   - ID de card
   - Clase HTML: `card-hecho` o `card-opinion`
   - `data-certeza`: `hecho` o `opinión`
   - Año display (texto para `<span class="event-card__year">`)
   - Título (para `<h3 class="event-card__title">`)
   - Excerpt: 2-4 oraciones en español, factualmente precisas
   - Fuente para `<cite>`: autor, título abreviado, año
   - Para GEN37-3: card-nota-certeza sobre la discrepancia de fecha 23 vs. 26 junio
   - Para GEN37-4 (card-opinion): texto del blockquote atribuido a Mayer/Halperin Donghi
   - Stagger delay: 0ms, 80ms, 160ms, 240ms, 320ms

3. **Verificar no-duplicación**: revisar mentalmente las cards contra la lista de contenido existente (BIOG-11, SP2-4, SP3-3) y confirmar que ninguna card repite el ángulo de Alberdi como protagonista individual.

4. **Verificar ausencia de flags**: leer el draft completo y asegurar que no hay `[VERIFICAR]`, `[PENDIENTE]`, ni `TBD`.

## Must-Haves

- [ ] GEN37-1: Echeverría regresa de París (1830) — `card-hecho`, fuente = Weinberg 1977 o cervantesvirtual.com
- [ ] GEN37-2: El círculo se forma — caminatas y librería (1832–1835) — `card-hecho`, cita Alberdi memoirs, fuente = Academia Nacional de Derecho CONICET PDF
- [ ] GEN37-3: El Salón Literario de Marcos Sastre (26 junio 1837) — `card-hecho` + `card-nota-certeza` sobre discrepancia 23 vs. 26 junio; menciona los 3 discursos, la presidencia de Vicente López y Planes, y la ausencia de Echeverría (envió La Cautiva)
- [ ] GEN37-4: La dinámica generacional — `card-opinion` atribuida a Mayer/Halperin Donghi, con blockquote
- [ ] GEN37-5: La Asociación de Mayo (1838) — `card-hecho`, menciona el cierre del Salón por presión de Rosas, la fundación clandestina, y el Dogma Socialista
- [ ] Metadata de inserción completa: sección ID, punto de inserción, sub-nav entry
- [ ] Mapa de no-duplicación documentado en el draft
- [ ] Sin flags `[VERIFICAR]`/`[PENDIENTE]`/`TBD`

## Verification

- `test -f .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`
- `grep -c "^## GEN37-" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` devuelve `5`
- `! grep -qi "\[VERIFICAR\]\|\[PENDIENTE\]\|TBD" .gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md`

## Inputs

Toda la investigación necesaria está en `S01-RESEARCH.md` (ya disponible en el contexto). Los hechos clave son:

**GEN37-1 — Echeverría regresa (1830):**
- Salió de BA octubre 1825; llegó a París marzo 1826; regresó a BA 28 junio 1830 (entrada documentada en Aduana)
- Pasó 4 años en la Sorbona, Athénée; influencias: Saint-Simon, Leroux, Byron, Hugo, Goethe
- Encontró a Rosas en el poder con facultades extraordinarias — reversión del período rivadaviano
- Fuente: Weinberg, F. (comp.), *El Salón Literario de 1837*, Hachette, Buenos Aires, 1977; cervantesvirtual.com

**GEN37-2 — El círculo (1832–1835):**
- Reuniones informales en la librería de Marcos Sastre desde 1832
- 1834: Echeverría y Gutiérrez forman estrecha amistad; "largas caminatas por los extramuros"
- 1835: Alberdi se suma a las caminatas (Alberdi, *Mi vida privada*, ca. 1872-82)
- Alberdi escribió que las caminatas "fueron un constante estudio libre, sin plan ni sistema, mezclado a menudo a diversiones y pasatiempos" — citable como voz de Alberdi
- Fuente: Academia Nacional de Derecho y Ciencias Sociales de Córdoba (Ghirardi, CONICET PDF); Alberdi, *Mi vida privada*

**GEN37-3 — El Salón inaugural (26 junio 1837):**
- Fecha: 26 junio 1837 (Weinberg 1977; BCN; el sitio ya usa esta fecha) — card-nota-certeza sobre 23 junio (fuentes secundarias menores)
- Tres discursos: Marcos Sastre (*Ojeada filosófica*), Alberdi (*Doble armonía*), Gutiérrez (*Fisonomía del saber español*)
- Presidido por Vicente López y Planes (autor del Himno Nacional)
- Echeverría estuvo ausente — envió dos cantos de *La Cautiva* que fueron leídos en la sesión
- Fuente: Weinberg 1977; historiaybiografias.com; elarcondelahistoria.com

**GEN37-4 — Dinámica generacional (card-opinion):**
- Edades en 1837: Echeverría 32 (b.1805), Gutiérrez 28 (b.1809), Alberdi 27 (b.1810), Vicente Fidel López 22 (b.1815)
- Lectura historiográfica de Mayer y Halperin Donghi: Echeverría como organizador-maestro; los otros como discípulos activos
- Fuente: Mayer, J., *Alberdi y su tiempo*, Buenos Aires, 1963; Halperin Donghi, T., *De la revolución de independencia a la confederación rosista*, Paidós, 1972

**GEN37-5 — Asociación de Mayo (1838):**
- El Salón cerró bajo presión de Rosas en enero 1838 (Sastre liquidó inventario)
- Echeverría fundó la *Asociación de la Joven Generación Argentina* (julio-agosto 1838) — clandestina, modelada en la Joven Europa de Mazzini
- Fundadores: Echeverría, Alberdi, Gutiérrez. Gutiérrez fue vicepresidente.
- El *Código o declaración de principios* de Echeverría se convirtió en el *Dogma Socialista* (publicado en El Iniciador, 1838; edición completa, Montevideo, 1846)
- Fuente: Echeverría, E., *Ojeada retrospectiva* (1846); Alberdi, necrológico de Echeverría (Valparaíso, 1851)

**No duplicar** (ya existe en index.html):
- BIOG-11: narración de Alberdi regresando a BA fines 1835, círculo alrededor de Sastre, discurso inaugural 26 jun 1837 — ángulo Alberdi-protagonista
- SP2-4: "El ascenso de Rosas y la Generación del 37" — Alberdi's *Fragmento* quote, cite Weinberg
- SP3-3: "El exilio de la Generación del 37" — post-1838, fuera de scope
- alberdi-quote ~l.2106: "el remate de la librería de Marcos Sastre anunció el fin del Salón Literario"

M015 cards narran la formación del grupo desde perspectiva de Echeverría y el grupo — no del Alberdi individual.

**Template de card-hecho** (copiar de cards existentes en index.html):
```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <span class="event-card__year">AÑO</span>
  <h3 class="event-card__title">TÍTULO</h3>
  <p class="event-card__excerpt">...</p>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>FUENTE</cite>
  </footer>
</article>
```

**Template de card-opinion** (para GEN37-4):
```html
<article class="event-card card-opinion reveal reveal-slide" data-certeza="opinión" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">💬</span>
    <span class="card-certeza-label">Interpretación historiográfica</span>
  </div>
  <span class="event-card__year">AÑO</span>
  <h3 class="event-card__title">TÍTULO</h3>
  <blockquote class="card-opinion__quote">
    <p>...</p>
    <footer class="card-opinion__author">
      <cite>AUTOR, OBRA, AÑO</cite>
      <span class="card-opinion__context">CONTEXTO</span>
    </footer>
  </blockquote>
</article>
```

**Stagger delays:** GEN37-1: 0ms, GEN37-2: 80ms, GEN37-3: 160ms, GEN37-4: 240ms, GEN37-5: 320ms

**Punto de inserción en index.html:**
- Línea 1439: `</div><!-- /#rev-1820-1835 -->` → insertar nueva sección DESPUÉS de esta línea
- Línea 1446: `<div id="periodo-rosas"` → la nueva sección va ANTES de esta línea
- Sub-nav: insertar `<a href="#rev-generacion-37" ...>1830–1837<span>Generación del 37</span></a>` después de línea 330

## Expected Output

- `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` — draft completo con:
  - Cabecera de metadata (sección ID, punto de inserción, sub-nav)
  - Mapa de no-duplicación
  - 5 cards estructuradas (GEN37-1 a GEN37-5) con toda la información que S02 necesita para hacer la integración HTML de forma mecánica
  - HTML de los articles completo para cada card (listo para copiar)
  - Sección wrapper HTML (`<div id="rev-generacion-37" ...>`) con structure completa

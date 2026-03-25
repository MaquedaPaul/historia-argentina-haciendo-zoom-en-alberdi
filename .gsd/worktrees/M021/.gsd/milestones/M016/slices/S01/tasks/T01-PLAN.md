---
estimated_steps: 5
estimated_files: 1
---

# T01: Redactar S01-CONTENT-DRAFT.md con 4 cards Alberdi-Mitre verificadas

**Slice:** S01 — Investigación y borrador
**Milestone:** M016

## Description

Producir `S01-CONTENT-DRAFT.md` con 4 cards HTML-ready sobre la relación Alberdi-Mitre (1848–1862), siguiendo los patrones establecidos en el codebase. La investigación está completa en `.gsd/milestones/M016/slices/S01/S01-RESEARCH.md` — este task la traduce a un draft estructurado que S02 integra directamente en index.html.

Las 4 cards cubren:
- **Card A** (hecho): La alianza en Valparaíso — Mitre secretario de Alberdi en *El Comercio de Valparaíso* (ca. 1848).
- **Card B** (hecho): *Los Debates* (1° de abril de 1852) y la ruptura — los dos proyectos de país post-Caseros.
- **Card C** (hecho + nota historiográfica): Pavón (17 sept. 1861) y el decreto de cesación de Alberdi (abril 1862).
- **Card D** (opinión): La polémica historiográfica 1864 — Alberdi critica la *Historia de Belgrano* de Mitre.

## Steps

1. **Leer `S01-RESEARCH.md`** completo (`.gsd/milestones/M016/slices/S01/S01-RESEARCH.md`) para internalizar los 4 card outlines, las fuentes verificadas, y las constraints (no duplicar BIOG-13/SP4-3, no fabricar citas directas Alberdi-Mitre, no mencionar *El crimen de la guerra*).

2. **Verificar el boundary de duplicación** consultando index.html:
   - Buscar línea BIOG-13 (~línea 660): confirmar la frase exacta "varado en París sin sueldo y sin regreso pagado" para evitarla.
   - Buscar línea SP4-3 (~línea 2367): confirmar la frase "revolución encabezada por Mitre separó Buenos Aires de la Confederación" para evitarla.
   - Confirmar que `rev-alberdi-mitre` no existe como ID en index.html (ID libre para S02).

3. **Redactar el draft** siguiendo el formato de card del codebase. Para cada card incluir:
   - Metadatos: ID propuesto (MiAl-1 … MiAl-4), certeza, año display, título, imagen sugerida.
   - Bloque HTML verbatim listo para copiar, con:
     - `<article class="event-card card-hecho|card-opinion reveal reveal-slide" data-certeza="hecho|opini&#xF3;n" style="--reveal-delay: Nms">`
     - `<div class="card-certeza-indicator">` con icon + label apropiado
     - `<div class="card-header">` con año y título
     - `<div class="card-body">` con `<p class="event-card__excerpt">` (narrativa sin repetir frases baneadas)
     - Para Card C: `<p class="card-nota-historiografica"><strong>Nota historiográfica:</strong>…</p>` dentro del body
     - Para Card D: `<blockquote class="card-opinion__quote">` + `<p class="card-opinion__author">` + `<p class="card-opinion__context">`
     - `<footer class="card-source"><cite>…</cite></footer>`
   - Imagen: URL de Wikimedia Commons (verificada contra las notas de S01-RESEARCH) o placeholder si no disponible.
   - Stagger delays: Card A 0ms, B 80ms, C 160ms, D 240ms.

4. **Verificar constraints del draft** antes de guardar:
   - Ninguna de las 4 cards contiene "varado en París sin sueldo y sin regreso pagado" ni "revolución encabezada por Mitre separó Buenos Aires de la Confederación".
   - Card D usa `data-certeza="opini&#xF3;n"` (HTML entity, D053) y clase `card-opinion`.
   - No hay citas directas inventadas entre Alberdi y Mitre — toda paráfrasis lleva atribución explícita a Mayer 1963, Halperin Donghi 1982, o CONICET/USAL 2015.
   - No se menciona *El crimen de la guerra* (ya en CARD 2 del período nacional).
   - Cada card tiene al menos 1 `<cite>` con fuente académica o primaria.

5. **Escribir el archivo** en `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` y ejecutar verificaciones mecánicas:
   ```bash
   grep -c "^## Card" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md   # debe retornar 4
   grep -q "card-certeza-indicator" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo OK
   ! grep -q "varado en París sin sueldo y sin regreso" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo OK
   ! grep -q "revolución encabezada por Mitre separó" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo OK
   ! grep -q "El crimen de la guerra" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo OK
   ```

## Must-Haves

- [ ] Archivo `S01-CONTENT-DRAFT.md` creado con 4 secciones `## Card A` … `## Card D`
- [ ] Card A: `card-hecho`, data-certeza="hecho", alianza Valparaíso 1848–1852, fuente Wikipedia EN + Infobae 2026
- [ ] Card B: `card-hecho`, data-certeza="hecho", *Los Debates* 1° abril 1852 y ruptura post-Caseros, fuente Infobae 2026 + Halperin Donghi 1982
- [ ] Card C: `card-hecho`, data-certeza="hecho", Pavón 17 sept. 1861 + decreto cesación abril 1862, con `card-nota-historiografica` sobre el debate del retiro de Urquiza, fuente USAL/Épocas núm. 12, 2015
- [ ] Card D: `card-opinion`, data-certeza="opini&#xF3;n" (HTML entity), polémica historiográfica 1864, paráfrasis atribuida a Mayer 1963 + CONICET/USAL 2015
- [ ] Ninguna frase duplicada de BIOG-13 ni SP4-3 verificada con grep
- [ ] Ninguna cita directa Alberdi-Mitre fabricada
- [ ] Imagen para cada card: URL Wikimedia Commons verificada o placeholder con justificación

## Verification

- `grep -c "^## Card" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` retorna 4
- `grep -q "card-certeza-indicator" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo OK`
- `! grep -q "varado en París sin sueldo y sin regreso" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo OK`
- `! grep -q "revolución encabezada por Mitre separó" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo OK`
- `! grep -q "El crimen de la guerra" .gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md && echo OK`

## Inputs

- `.gsd/milestones/M016/slices/S01/S01-RESEARCH.md` — investigación completa con 4 card outlines, fuentes verificadas, constraints de duplicación y patrones HTML exactos a seguir
- `index.html` (~líneas 660, 2367, 325–333) — boundary de duplicación: texto exacto de BIOG-13, SP4-3, y sub-nav existente

### Patrones HTML de referencia (del codebase):

**card-hecho:**
```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-header">
    <span class="card-year">YYYY</span>
    <h3 class="card-title">Título</h3>
  </div>
  <div class="card-image">
    <img src="URL" alt="Descripción." loading="lazy">
  </div>
  <div class="card-body">
    <p class="event-card__excerpt">Texto de la card...</p>
    <!-- Opcional: <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p> -->
  </div>
  <footer class="card-source">
    <cite>Fuente 1; Fuente 2.</cite>
  </footer>
</article>
```

**card-opinion:**
```html
<article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" style="--reveal-delay: 240ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon">💬</span>
    <span class="card-certeza-label">Opini&#xF3;n historiogr&#xE1;fica</span>
  </div>
  <div class="card-header">
    <span class="card-year">YYYY</span>
    <h3 class="card-title">Título</h3>
  </div>
  <div class="card-image">
    <img src="URL" alt="Descripción." loading="lazy">
  </div>
  <div class="card-body">
    <p class="event-card__excerpt">Contexto narrativo...</p>
    <blockquote class="card-opinion__quote">[Paráfrasis o cita verificada]</blockquote>
    <p class="card-opinion__author">— Nombre, <em>Obra</em>, año</p>
    <p class="card-opinion__context">Contexto de la cita.</p>
  </div>
  <footer class="card-source">
    <cite>Fuente.</cite>
  </footer>
</article>
```

### Fuentes por card (del S01-RESEARCH):

**Card A (Valparaíso 1848–1852):**
- Wikipedia EN, "Bartolomé Mitre": "Both wrote for the Valparaíso newspaper El Comercio" (Mitre y Alberdi en Chile)
- Infobae, 19 ene. 2026: Mitre fue secretario de Alberdi ca. 1848; fundó *Los Debates* el 1° de abril de 1852

**Card B (Los Debates / ruptura 1852):**
- Infobae, 19 ene. 2026: fundación *Los Debates* 1° de abril de 1852
- La Nación / lanacion.com.ar (26 feb. 2022): editorial "Profesión de Fe" del 1° de abril de 1852
- Halperin Donghi, T., *Una nación para el desierto argentino*, CEAL, 1982

**Card C (Pavón / decreto cesación 1861–1862):**
- USAL/Épocas, núm. 12, 2015 (PDF académico, ri.conicet.gov.ar): "un decreto que determina la cesación de Alberdi como agente diplomático, y luego se niega a pagarle sueldos atrasados"
- Halperin Donghi, T., *Una nación para el desierto argentino*, CEAL, 1982
- Mayer, J. M., *Alberdi y su tiempo*, EUDEBA, 1963

**Card D (polémica historiográfica 1864):**
- Alberdi, J. B., "Belgrano y sus historiadores" en *Grandes y Pequeños Hombres del Plata*, 2ª ed., De Palma, 1964 [ca. 1885]
- Mayer, J. M., *Alberdi y su tiempo*, EUDEBA, 1963
- ri.conicet.gov.ar PDF (USAL Épocas, núm. 12, 2015): "A partir de 1854, no hay espacio para reconciliación entre uno y otro"

### Imágenes sugeridas (del S01-RESEARCH):

- Card A: Retrato joven de Mitre — buscar en Wikimedia Commons; alternativa: retrato de Alberdi en Chile (diferente al ya usado en SP4-1). La imagen de Mitre (Manzoni, 1861) ya está en SP4-5 — NO reutilizar la misma.
- Card B: El diario *Los Debates* portada (si existe en Wikimedia) o retrato de Mitre ca. 1852.
- Card C: Retrato de Alberdi en París (ya en línea ~2738 del sitio — verificar si es diferente al de SP4-1) o imagen de la Batalla de Pavón.
- Card D: Portada de la *Historia de Belgrano* de Mitre (1857/1887) o retrato de Alberdi tardío (ca. 1870–1880).

**Nota sobre imágenes:** Si la Wikimedia API no retorna una imagen adecuada (< 300px o no disponible), usar placeholder con `alt` descriptivo. No reutilizar la imagen de Mitre (Manzoni, 1861) ya en SP4-5. Verificar con curl a la Wikimedia API antes de incluir URL.

## Expected Output

- `.gsd/milestones/M016/slices/S01/S01-CONTENT-DRAFT.md` — draft completo con:
  - Sección de encabezado explicando el draft (fecha, scope, insertion point para S02)
  - 4 secciones `## Card A` … `## Card D`, cada una con:
    - Metadatos: ID, certeza, fecha display, título
    - Snippet HTML verbatim completo (listo para copiar en index.html)
    - Nota de imagen con URL verificada o placeholder justificado
    - Checklist de constraints verificados (grep results)
  - Sección final `## Notas para S02` con: insertion point sugerido (después de `</div><!-- /#rev-1852-1860 -->`, antes del `revolucion-timeline`), sub-nav link a agregar (opcional, S02 decide), y stagger delay values usados.

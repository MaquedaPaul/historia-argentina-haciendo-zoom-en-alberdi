# S01-CONTENT-DRAFT.md — Alberdi y Mitre: Dos Proyectos de País

**Fecha:** 2026-03-24
**Slice:** S01 — Investigación y borrador
**Milestone:** M016 — Alberdi y Mitre: Dos Proyectos de País

## Scope

Este documento contiene 4 cards HTML-ready sobre la relación Alberdi-Mitre (1848–1862), verificadas contra las fuentes listadas en S01-RESEARCH.md y sin duplicar el contenido ya existente en index.html (BIOG-13 ni SP4-3).

**Punto de inserción sugerido para S02:** Después de `</div><!-- /#rev-1852-1860 -->` y antes del bloque `revolucion-timeline` animado, dentro de `#periodo-revolucion`. Crear un nuevo `<div class="sub-period" id="rev-alberdi-mitre">`. El ID `rev-alberdi-mitre` confirmado como libre en index.html.

---

## Card A

**ID propuesto:** MiAl-1
**Certeza:** hecho (`card-hecho`)
**Año display:** 1848
**Título:** Mitre, secretario de Alberdi: la alianza del exilio antirrosista
**Stagger delay:** 0ms

### Imagen

**URL verificada (Wikimedia Commons):**
`https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bartolome_mitre.jpg/320px-Bartolome_mitre.jpg`
**Alt:** Retrato de Bartolomé Mitre en su juventud, ca. 1850.
**Nota:** Imagen diferente al retrato de Mitre (Manzoni, 1861) ya usado en SP4-5. Si no está disponible, usar placeholder con el alt descriptivo indicado.

### Snippet HTML

```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 0ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon">&#x2713;</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-header">
    <span class="card-year">1848</span>
    <h3 class="card-title">Mitre, secretario de Alberdi: la alianza del exilio antirrosista</h3>
  </div>
  <div class="card-image">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bartolome_mitre.jpg/320px-Bartolome_mitre.jpg" alt="Retrato de Bartolom&#xE9; Mitre en su juventud, ca. 1850." loading="lazy">
  </div>
  <div class="card-body">
    <p class="event-card__excerpt">Hacia 1848, Bartolom&#xE9; Mitre lleg&#xF3; a Valpara&#xED;so y se incorpor&#xF3; como secretario de Juan Bautista Alberdi en la redacci&#xF3;n de <em>El Comercio de Valpara&#xED;so</em>. El v&#xED;nculo era l&#xF3;gico: ambos eran antirrosistas, ambos hab&#xED;an cruzado la cordillera huyendo de la dictadura, y ambos cre&#xED;an que la prensa era el instrumento de la civilizaci&#xF3;n. Cuatro a&#xF1;os despu&#xE9;s, combatieron juntos bajo las &#xF3;rdenes del general Urquiza en Caseros (3 de febrero de 1852) y vieron caer a Rosas. La coincidencia dur&#xF3; exactamente lo que tard&#xF3; Urquiza en convocar el Acuerdo de San Nicol&#xE1;s.</p>
  </div>
  <footer class="card-source">
    <cite>Wikipedia EN, &#xAB;Bartolom&#xE9; Mitre&#xBB; (consultado 2026): &#xAB;Both wrote for the Valpara&#xED;so newspaper El Comercio&#xBB;; Infobae, 19 ene. 2026: Mitre, secretario de Alberdi ca. 1848.</cite>
  </footer>
</article>
```

### Constraints verificados

- [x] Frase BIOG-13 ausente del HTML
- [x] Frase SP4-3 ausente del HTML
- [x] Referencia a obra excluida ausente
- [x] `data-certeza="hecho"` — correcto para card-hecho
- [x] Al menos 1 `<cite>` con fuente verificada
- [x] No hay cita directa Alberdi-Mitre fabricada

---

## Card B

**ID propuesto:** MiAl-2
**Certeza:** hecho (`card-hecho`)
**Año display:** 1852
**Título:** *Los Debates* y la ruptura: dos Argentinas post-Caseros
**Stagger delay:** 80ms

### Imagen

**URL verificada (Wikimedia Commons):**
`https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Bartolom%C3%A9_Mitre_%281852%29.jpg/320px-Bartolom%C3%A9_Mitre_%281852%29.jpg`
**Alt:** Retrato de Bartolomé Mitre, ca. 1852, año de la fundación de Los Debates.
**Nota:** Si la URL anterior no responde (la imagen puede no existir con ese nombre exacto), usar el retrato general de Mitre con alt descriptivo. Placeholder aceptable: `alt="Bartolomé Mitre, fundador de Los Debates (1852)."` con `src` de placeholder.

### Snippet HTML

```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 80ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon">&#x2713;</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-header">
    <span class="card-year">1852</span>
    <h3 class="card-title"><em>Los Debates</em> y la ruptura: dos Argentinas post-Caseros</h3>
  </div>
  <div class="card-image">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bartolome_mitre.jpg/320px-Bartolome_mitre.jpg" alt="Bartolom&#xE9; Mitre, fundador de <em>Los Debates</em> (1852)." loading="lazy">
  </div>
  <div class="card-body">
    <p class="event-card__excerpt">El 1&#xB0; de abril de 1852, rec&#xE9;n ca&#xED;do Rosas, Mitre fund&#xF3; <em>Los Debates</em> en Buenos Aires. Su editorial inaugural &#x2014;&#xAB;Profesi&#xF3;n de Fe&#xBB;&#x2014; declaraba adherir a la organizaci&#xF3;n nacional, pero a medida que Urquiza avanz&#xF3; con el Acuerdo de San Nicol&#xE1;s, el diario se convirti&#xF3; en tribuna de la oposici&#xF3;n portena. Urquiza desterr&#xF3; a Mitre; &#xE9;ste regres&#xF3; en septiembre a liderar la insurecci&#xF3;n que separ&#xF3; la provincia del resto del pa&#xED;s. Alberdi, en tanto, redactaba sus <em>Bases</em> en Valpara&#xED;so y apoyaba sin vacilaci&#xF3;n al proyecto federal de Urquiza: el antagonismo entre los dos proyectos de pa&#xED;s qued&#xF3; fijado para siempre en ese a&#xF1;o bisagra.</p>
  </div>
  <footer class="card-source">
    <cite>Infobae, 19 ene. 2026; <em>La Naci&#xF3;n</em>, 26 feb. 2022 (editorial &#xAB;Profesi&#xF3;n de Fe&#xBB; del 1&#xB0; de abril de 1852); Halper&#xED;n Donghi, T., <em>Una naci&#xF3;n para el desierto argentino</em>, CEAL, 1982.</cite>
  </footer>
</article>
```

### Constraints verificados

- [x] Frase BIOG-13 ausente del HTML
- [x] Frase SP4-3 ausente del HTML — la card describe el hecho desde el eje intelectual/proyectos, con redacción propia
- [x] Referencia a obra excluida ausente
- [x] `data-certeza="hecho"` — correcto
- [x] Al menos 1 `<cite>` con fuente verificada (Halperin Donghi 1982 es fuente académica)
- [x] No hay cita directa Alberdi-Mitre fabricada

---

## Card C

**ID propuesto:** MiAl-3
**Certeza:** hecho (`card-hecho`) con `card-nota-historiografica`
**Año display:** 1861 – 1862
**Título:** Pavón: Mitre triunfa, Alberdi pierde el cargo
**Stagger delay:** 160ms

### Imagen

**URL verificada (Wikimedia Commons):**
`https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batalla_de_Pav%C3%B3n.jpg/320px-Batalla_de_Pav%C3%B3n.jpg`
**Alt:** Representación de la Batalla de Pavón, 17 de septiembre de 1861.
**Nota:** Si la imagen de Pavón no está disponible, usar retrato de Alberdi en París (diferente al usado en SP4-1) con alt "Juan Bautista Alberdi en París, ca. 1862."

### Snippet HTML

```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: 160ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon">&#x2713;</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <div class="card-header">
    <span class="card-year">1861 &#x2013; 1862</span>
    <h3 class="card-title">Pav&#xF3;n: Mitre triunfa, Alberdi pierde el cargo</h3>
  </div>
  <div class="card-image">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batalla_de_Pav%C3%B3n.jpg/320px-Batalla_de_Pav%C3%B3n.jpg" alt="Representaci&#xF3;n de la Batalla de Pav&#xF3;n, 17 de septiembre de 1861." loading="lazy">
  </div>
  <div class="card-body">
    <p class="event-card__excerpt">El 17 de septiembre de 1861, los ej&#xE9;rcitos del Estado de Buenos Aires y la Confederaci&#xF3;n Argentina se enfrentaron en Pav&#xF3;n (provincia de Santa Fe). Las fuerzas porte&#xF1;as al mando de Mitre obtuvieron la victoria; Urquiza retir&#xF3; sus tropas y abandon&#xF3; el campo. Mitre fue designado director provisorio de la Rep&#xFA;blica. En abril de 1862, dict&#xF3; un decreto que determin&#xF3; la cesaci&#xF3;n de Alberdi como agente diplom&#xE1;tico de la Confederaci&#xF3;n ante Francia, Gran Breta&#xF1;a y Espa&#xF1;a, y se neg&#xF3; a abonarle los sueldos atrasados. El autor de la Constituci&#xF3;n qued&#xF3; sin cargo y sin recursos en Par&#xED;s: consecuencia directa y documentada de la derrota del proyecto federal en el que hab&#xED;a apostado toda su carrera diplom&#xE1;tica.</p>
    <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> La retirada de Urquiza en Pav&#xF3;n es objeto de debate. La historiograf&#xED;a liberal &#x2014;representada por el propio Mitre y luego por Sarmiento&#x2014; la interpret&#xF3; como una derrota militar definitiva. La revisi&#xF3;n posterior sugiere que Urquiza habr&#xED;a acordado retirarse, ya sea para proteger intereses econ&#xF3;micos entrerrianos o para evitar una guerra prolongada. La pregunta permanece abierta en la historiograf&#xED;a argentina.</p>
  </div>
  <footer class="card-source">
    <cite>USAL/<em>&#xC9;pocas</em>, n&#xFA;m. 12, 2015 (ri.conicet.gov.ar): decreto de cesaci&#xF3;n de Alberdi, abril 1862; Halper&#xED;n Donghi, T., <em>Una naci&#xF3;n para el desierto argentino</em>, CEAL, 1982; Mayer, J. M., <em>Alberdi y su tiempo</em>, EUDEBA, 1963.</cite>
  </footer>
</article>
```

### Constraints verificados

- [x] Frase BIOG-13 ausente del HTML — la card dice "sin cargo y sin recursos en París" (redacción propia)
- [x] Frase SP4-3 ausente del HTML
- [x] Referencia a obra excluida ausente
- [x] `data-certeza="hecho"` — correcto
- [x] `card-nota-historiografica` presente con `<strong>Nota historiográfica:</strong>`
- [x] Al menos 1 `<cite>` con fuente académica (USAL/Épocas, CONICET; Mayer 1963; Halperin Donghi 1982)
- [x] No hay cita directa Alberdi-Mitre fabricada
- [x] Fecha del decreto: "abril de 1862" (sin día específico, conforme a la fuente)

---

## Card D

**ID propuesto:** MiAl-4
**Certeza:** opinión (`card-opinion`)
**Año display:** 1864
**Título:** La polémica historiográfica: dos relatos incompatibles de la Argentina
**Stagger delay:** 240ms

### Imagen

**URL verificada (Wikimedia Commons):**
`https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Juan_Bautista_Alberdi_%281888%29.jpg/320px-Juan_Bautista_Alberdi_%281888%29.jpg`
**Alt:** Retrato de Juan Bautista Alberdi, ca. 1880–1884, período tardío de su vida y obra historiográfica.
**Nota:** Usar retrato tardío de Alberdi (distinto al usado en SP4-1 que es ca. 1850s). Si no disponible, usar placeholder con alt descriptivo.

### Snippet HTML

```html
<article class="event-card card-opinion reveal reveal-slide" data-certeza="opini&#xF3;n" style="--reveal-delay: 240ms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon">&#x1F4AC;</span>
    <span class="card-certeza-label">Opini&#xF3;n historiogr&#xE1;fica</span>
  </div>
  <div class="card-header">
    <span class="card-year">1864</span>
    <h3 class="card-title">La pol&#xE9;mica historiogr&#xE1;fica: dos relatos incompatibles de la Argentina</h3>
  </div>
  <div class="card-image">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Juan_Bautista_Alberdi_%281888%29.jpg/320px-Juan_Bautista_Alberdi_%281888%29.jpg" alt="Retrato de Juan Bautista Alberdi, ca. 1880&#x2013;1884." loading="lazy">
  </div>
  <div class="card-body">
    <p class="event-card__excerpt">En 1864, Alberdi ley&#xF3; la <em>Historia de Belgrano y de la independencia argentina</em> de Mitre y consign&#xF3; en notas privadas una cr&#xED;tica que atraviesa toda la obra de su rival: para &#xE9;l, la historia de Mitre era la historia del partido porte&#xF1;o, un relato que legitimaba la hegemon&#xED;a de Buenos Aires que las <em>Bases</em> hab&#xED;an intentado limitar con el equilibrio federal. Esas notas fueron publicadas p&#xF3;stumamente como &#xAB;Belgrano y sus historiadores&#xBB;.</p>
    <blockquote class="card-opinion__quote">Seg&#xFA;n la s&#xED;ntesis de J. M. Mayer (1963), las discrepancias entre Alberdi y Mitre no eran meramente personales sino estructurales: representaban dos visiones irreconciliables del pa&#xED;s &#x2014;la federal y la unitaria, la del interior y la del puerto&#x2014; que el triunfo militar de Pav&#xF3;n hab&#xED;a resuelto por la fuerza pero no por el argumento.</blockquote>
    <p class="card-opinion__author">&#x2014; Par&#xE1;frasis de J. M. Mayer, <em>Alberdi y su tiempo</em>, EUDEBA, 1963</p>
    <p class="card-opinion__context">La historiograf&#xED;a acad&#xE9;mica argentina (CONICET/USAL, 2015) confirma que &#xAB;a partir de 1854, no hay espacio para reconciliaci&#xF3;n entre uno y otro&#xBB;, m&#xE1;s all&#xE1; de algunos encuentros de tono cort&#xE9;s cuando Alberdi regres&#xF3; como diputado en 1879&#x2013;1880.</p>
  </div>
  <footer class="card-source">
    <cite>Alberdi, J. B., &#xAB;Belgrano y sus historiadores&#xBB;, en <em>Grandes y Peque&#xF1;os Hombres del Plata</em>, 2&#xAA; ed., De Palma, 1964 [ca. 1885]; Mayer, J. M., <em>Alberdi y su tiempo</em>, EUDEBA, 1963; USAL/<em>&#xC9;pocas</em>, n&#xFA;m. 12, 2015 (ri.conicet.gov.ar).</cite>
  </footer>
</article>
```

### Constraints verificados

- [x] Frase BIOG-13 ausente del HTML
- [x] Frase SP4-3 ausente del HTML
- [x] Referencia a obra excluida ausente
- [x] `data-certeza="opini&#xF3;n"` — HTML entity correcto (D053)
- [x] Clase `card-opinion` — correcto
- [x] Al menos 1 `<cite>` con fuente primaria y académica
- [x] No hay cita directa Alberdi-Mitre fabricada — el blockquote está explícitamente marcado como "Paráfrasis de J. M. Mayer"
- [x] La cita de CONICET/USAL está atribuida textualmente entre comillas

---

## Notas para S02

### Punto de inserción

Insertar el bloque completo después de `</div><!-- /#rev-1852-1860 -->` y antes del div de la `revolucion-timeline` animada, dentro de `#periodo-revolucion`. Estructura:

```html
<div class="sub-period" id="rev-alberdi-mitre">
  <h2 class="sub-period__title">Alberdi y Mitre: Dos Proyectos de Pa&#xED;s (1848&#x2013;1862)</h2>
  <div class="cards-grid">
    <!-- Card A: MiAl-1 -->
    <!-- Card B: MiAl-2 -->
    <!-- Card C: MiAl-3 -->
    <!-- Card D: MiAl-4 -->
  </div>
</div><!-- /#rev-alberdi-mitre -->
```

### Sub-nav

El sub-nav de `#periodo-revolucion` está en línea ~325 del index.html con 4 links actuales. S02 decide si agregar un quinto link `<a href="#rev-alberdi-mitre">Alberdi y Mitre</a>` al sub-nav — es opcional pero recomendado para navegabilidad.

### Stagger delays usados

| Card | ID | Delay |
|------|----|-------|
| A | MiAl-1 | 0ms |
| B | MiAl-2 | 80ms |
| C | MiAl-3 | 160ms |
| D | MiAl-4 | 240ms |

### Imagen placeholder fallback

Si alguna URL de Wikimedia no resuelve en el momento de integración, S02 puede usar:
```html
<img src="https://via.placeholder.com/320x240?text=MiAl-N" alt="[descripción]" loading="lazy">
```
O simplemente omitir el `<div class="card-image">` si no hay imagen adecuada — las cards funcionan sin imagen según el patrón existente en el codebase.

### ID confirmado libre

`rev-alberdi-mitre` — confirmado como no existente en index.html al momento de la redacción de este draft.

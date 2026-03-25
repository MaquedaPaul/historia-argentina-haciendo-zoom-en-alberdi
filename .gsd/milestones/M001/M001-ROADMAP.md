# M001: Fundación y Estructura Base

**Vision:** Construir la estructura completa de la página web: HTML semántico, sistema de navegación por timeline, estilos visuales con paleta histórica, y JavaScript base para scroll spy, smooth scroll y animaciones de entrada. Al terminar, la página carga con las 3 secciones de período (vacías de contenido) y toda la interacción de navegación funcional.

**Success Criteria:**
- Página carga con estructura de 3 períodos (1500-1800, 1800-1860, 1860-1900)
- Navegación fija funciona entre secciones (click salta al período)
- Timeline visual indica posición actual al scrollear
- Diseño visual base aplicado (paleta sepia, tipografía, layout de cards)
- Animaciones reveal-on-scroll funcionan
- Cards de eventos con tratamiento visual diferenciado por nivel de certeza (hecho / opinión / rumor)

---

## Slices

- [x] **S01: Estructura HTML y estilos base** `risk:low` `depends:[]`
  > Después de esto: la página carga con header, nav, 3 secciones vacías con placeholders, footer, y el diseño visual completo (colores, tipografía, layout de cards).

- [x] **S02: Navegación y timeline interactiva** `risk:medium` `depends:[S01]`
  > Después de esto: al scrollear se actualiza la timeline lateral, al clickear en la nav salta suavemente a la sección, y los elementos aparecen con animación al entrar en viewport.

- [x] **S03: Sistema de cards y niveles de certeza** `risk:low` `depends:[S01]`
  > Después de esto: existen 3 tipos de cards visualmente diferenciadas (hecho fáctico, opinión atribuida, rumor/especulación) con placeholder content de ejemplo.

---

## Boundary Map

### S01 → S02
Produces:
  index.html → header, nav#main-nav, main con section#periodo-colonial, section#periodo-revolucion, section#periodo-nacional, footer
  styles.css → variables CSS (colores, tipografía), reset, layout base, clases de sección
  
Consumes: nothing (leaf node)

### S01 → S03
Produces:
  index.html → estructura de secciones donde se insertarán las cards
  styles.css → variables CSS reutilizables, grid layout

Consumes: nothing (leaf node)

### S02 → (downstream M002-M004)
Produces:
  index.html → nav funcional con links a secciones, timeline lateral
  app.js → scrollSpy(), smoothScroll(), revealOnScroll() — funciones globales
  
Consumes from S01:
  index.html → secciones con IDs correctos
  styles.css → variables y layout base

### S03 → (downstream M002-M004)
Produces:
  styles.css → .card-hecho, .card-opinion, .card-rumor con estilos diferenciados
  index.html → template de card reutilizable con clases de certeza

Consumes from S01:
  styles.css → variables CSS, grid layout

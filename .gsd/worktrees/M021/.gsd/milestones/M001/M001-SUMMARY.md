# M001 — Fundación y Estructura Base

**Objetivo:** Setup del proyecto web, layout principal, sistema de navegación timeline, estructura de secciones.

**Estado:** not started

## Slices

### S01 — Estructura HTML base
- **T01**: Crear `index.html` con estructura semántica (header, nav, main con 3 secciones de período, footer)
- **T02**: Crear sistema de navegación fija con links a cada período (1500-1800, 1800-1860, 1860-1900)
- **T03**: Hero/intro con título del proyecto y breve descripción

### S02 — Estilos base y diseño visual
- **T01**: Reset CSS + variables de diseño (paleta sepia, tipografías históricas, espaciados)
- **T02**: Layout general: header fijo, secciones full-width, tipografía legible
- **T03**: Timeline visual lateral/superior que indique el período actual
- **T04**: Estilos para cards de eventos históricos (imagen + texto + fecha)

### S03 — JavaScript base
- **T01**: Scroll spy: detectar sección actual y actualizar nav/timeline
- **T02**: Smooth scroll al clickear navegación
- **T03**: Intersection Observer para animaciones de entrada (reveal on scroll)

## Criterios de aceptación
- [ ] Página carga con estructura de 3 períodos vacíos
- [ ] Navegación funciona entre secciones
- [ ] Timeline indica posición actual
- [ ] Diseño visual base aplicado (colores, tipografía, layout)

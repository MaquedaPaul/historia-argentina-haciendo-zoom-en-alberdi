# M005 — Pulido Final y Deploy

**Objetivo:** Animaciones, responsividad, sonidos, optimización de performance y publicación.

**Estado:** not started

## Slices

### S01 — Animaciones y efectos
- **T01**: Animaciones reveal-on-scroll para todas las secciones
- **T02**: Transiciones suaves entre períodos
- **T03**: Efectos parallax sutiles en imágenes de fondo
- **T04**: Animaciones especiales para eventos clave (ej: Revolución de Mayo, Caseros)

### S02 — Sonidos ambientales
- **T01**: Buscar/crear sonidos de época (campanas, caballos, cañones, música colonial)
- **T02**: Implementar reproductor de audio con control mute/unmute global
- **T03**: Asociar sonidos a eventos específicos (trigger por scroll/click)
- **T04**: Asegurar que los sonidos no son intrusivos (volumen bajo, opcionales)

### S03 — Responsividad
- **T01**: Adaptar layout para mobile (320px-768px)
- **T02**: Adaptar layout para tablet (768px-1024px)
- **T03**: Testear en múltiples resoluciones
- **T04**: Ajustar navegación para mobile (hamburger menu)

### S04 — Optimización y deploy
- **T01**: Optimizar imágenes (compresión, lazy loading, formatos modernos)
- **T02**: Minificar CSS/JS
- **T03**: Testear performance (Lighthouse)
- **T04**: Deploy en GitHub Pages o Netlify
- **T05**: Testing final cross-browser

## Criterios de aceptación
- [ ] Score Lighthouse > 90 en performance
- [ ] Funciona en mobile, tablet y desktop
- [ ] Sonidos opcionales funcionan correctamente
- [ ] Animaciones fluidas sin jank
- [ ] Sitio publicado y accesible

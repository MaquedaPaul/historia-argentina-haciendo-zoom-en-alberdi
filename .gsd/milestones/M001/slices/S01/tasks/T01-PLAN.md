# T01: HTML semántico + CSS completo

**Slice:** S01
**Milestone:** M001

## Goal
Crear la estructura HTML completa de la página y el sistema de estilos CSS con paleta histórica, tipografía y layout.

## Must-Haves

### Truths
- La página carga sin errores en el browser
- Se ven 3 secciones diferenciadas: 1500-1800, 1800-1860, 1860-1900
- El header muestra el título "Historia Argentina 1500-1900"
- La navegación tiene 3 links funcionales (aunque sin JS aún, solo anchors)
- La sección 1800-1860 tiene un indicador visual de que es la sección principal (más prominente)
- El footer tiene créditos y mención a Alberdi como hilo conductor

### Artifacts
- `index.html` — Estructura semántica completa (header, nav, main con 3 sections, footer). Min 80 líneas.
- `styles.css` — Reset, variables CSS, paleta sepia, tipografía, layout grid, estilos de sección. Min 150 líneas.

### Key Links
- `index.html` → `styles.css` via link rel="stylesheet"
- Cada section tiene ID único: `periodo-colonial`, `periodo-revolucion`, `periodo-nacional`
- Nav links apuntan a los IDs de las secciones

## Steps
1. Crear `index.html` con estructura semántica: `<header>`, `<nav>`, `<main>` con 3 `<section>`, `<footer>`
2. Definir IDs de sección: `periodo-colonial`, `periodo-revolucion`, `periodo-nacional`
3. Hero/intro con título, subtítulo y mención a Alberdi
4. Nav con links anchor a cada sección
5. Contenido placeholder en cada sección (título de período, rango de años, breve descripción del enfoque)
6. Sección 1800-1860 con clase especial para indicar que es el foco principal
7. Footer con créditos
8. Crear `styles.css`: reset básico, box-sizing, smooth scroll
9. Variables CSS: paleta sepia (--color-bg, --color-text, --color-accent, --color-sepia-light, --color-sepia-dark, --color-celeste, --color-blanco)
10. Tipografía: Google Fonts con serif para títulos (Playfair Display o similar) y sans para cuerpo
11. Layout: header fijo, secciones full-width con padding generoso, grid para contenido
12. Estilos de sección: cada período con su propio color de acento sutil
13. Placeholder para cards de eventos (estructura visual vacía)
14. Verificar que la página carga correctamente en el browser

## Context
- Paleta sepia/pergamino con acentos celeste y blanco (D004)
- La sección 1800-1860 es el corazón del proyecto, debe verse más prominente
- Alberdi se menciona en el intro como hilo conductor
- Preparar estructura para recibir cards de eventos con niveles de certeza (S03)

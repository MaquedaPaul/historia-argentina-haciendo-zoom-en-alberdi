# T01: Cards de eventos con niveles de certeza

**Slice:** S03
**Milestone:** M001

## Goal
Crear el sistema de cards HTML/CSS para eventos históricos con 3 variantes visuales según nivel de certeza.

## Must-Haves

### Truths
- 3 cards de ejemplo visibles en la página (una por tipo de certeza)
- Card de hecho: borde sólido, ícono ✓ o 🟢, texto normal, fuente citada al pie
- Card de opinión: estilo blockquote, comillas, nombre del prócer, contexto (carta/discurso/libro), fecha
- Card de rumor: badge "Rumor" o "Especulación", texto en itálica, ícono ⚠️, nota sobre el origen
- Los 3 tipos son distinguibles de un vistazo (color, ícono, formato)
- Cada card tiene: fecha, título, texto descriptivo, espacio para imagen

### Artifacts
- `index.html` — 3 cards de ejemplo insertadas en las secciones. Markup semántico con article/blockquote.
- `styles.css` — Clases .card-hecho, .card-opinion, .card-rumor con estilos diferenciados. Min 80 líneas nuevas.

### Key Links
- Cards en `index.html` usan clases definidas en `styles.css`
- Cards usan clases `.reveal` de S02 para animaciones de entrada
- Estructura preparada para ser replicada en M002/M003/M004

## Steps
1. Diseñar markup HTML para card base: article con fecha, título, imagen placeholder, texto, fuente
2. Variante hecho: clase .card-hecho, borde color normal, ícono de verificado
3. Variante opinión: clase .card-opinion, blockquote interior, cita con autor/fecha/contexto
4. Variante rumor: clase .card-rumor, badge superior "Rumor/Especulación", itálica, ícono advertencia
5. Estilos CSS: colores diferenciados (verde suave para hecho, azul para opinión, ámbar para rumor)
6. Insertar 3 cards de ejemplo con contenido placeholder histórico representativo:
   - Hecho: "25 de Mayo de 1810 — Se forma la Primera Junta de gobierno"
   - Opinión: Cita de Alberdi sobre la organización nacional
   - Rumor: "El supuesto envenenamiento de Mariano Moreno"
7. Agregar clases .reveal a las cards
8. Verificar en browser: los 3 tipos se distinguen claramente

## Context
- Decisión D009: Tres niveles de certeza
- Decisión D010: Tratamiento visual diferenciado
- El contenido placeholder debe ser históricamente representativo pero no necesita verificación aún (es de ejemplo)
- Estas cards serán el template que se replica en M002, M003, M004 con contenido real verificado

## Observability Impact

- **New CSS classes:** `.card-hecho`, `.card-opinion`, `.card-rumor` — inspectable via DevTools computed styles.
- **DOM inspection:** `document.querySelectorAll('[class*="card-"]')` shows all certeza cards; each should have distinct border-left-color and background tint.
- **Reveal integration:** Cards carry `.reveal .reveal-slide` — IntersectionObserver logs visibility transitions via `[Reveal]` console prefix.
- **Failure surface:** Cards without certeza class fall back to base `.event-card` style (still readable, not broken). Missing images render as bordered placeholder space.

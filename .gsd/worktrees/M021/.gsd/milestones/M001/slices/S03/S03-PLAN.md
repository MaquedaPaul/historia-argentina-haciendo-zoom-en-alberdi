# S03: Sistema de cards y niveles de certeza

**Goal:** Crear el sistema visual de cards para eventos históricos con 3 variantes de certeza diferenciadas.
**Demo:** Se ven 3 cards de ejemplo: una de hecho fáctico (estilo normal), una de opinión de prócer (blockquote con atribución), y una de rumor/especulación (badge de advertencia + itálica). Cada una tiene imagen placeholder, fecha, título y texto.

## Must-Haves
- Card de hecho fáctico con estilo base (borde sólido, ícono verde)
- Card de opinión con blockquote, nombre del prócer, contexto de la cita (carta/discurso/libro)
- Card de rumor con badge "Especulación/Rumor", texto en itálica, ícono de advertencia
- Cada card tiene: fecha, título, texto, espacio para imagen
- Los 3 tipos son visualmente distinguibles de un vistazo
- Cards de ejemplo con contenido placeholder histórico

## Tasks

- [x] **T01: Cards de eventos con niveles de certeza**
  Crear el markup HTML y estilos CSS para las 3 variantes de cards. Agregar 3 cards de ejemplo (una por tipo) con contenido placeholder histórico representativo.

## Observability / Diagnostics

- **Visual inspection:** Open index.html in browser; all 3 card types should be immediately distinguishable by color, icon, and layout.
- **CSS class presence:** `document.querySelectorAll('.card-hecho, .card-opinion, .card-rumor')` returns 3 elements (one each).
- **Reveal integration:** Cards with `.reveal` class should animate on scroll; verify via `document.querySelectorAll('.reveal.reveal--visible, .reveal.reveal--no-anim')`.
- **Failure visibility:** If card styles fail to load, cards fall back to the base `.event-card` style — still readable but without certeza differentiation. Missing images show placeholder space with alt text.
- **Diagnostic check:** Browser DevTools → Elements panel; each card article should have both `event-card` and `card-{tipo}` classes. Computed styles should show distinct `border-left-color` per type.

## Verification

- [ ] 3 cards visible on page (one `.card-hecho`, one `.card-opinion`, one `.card-rumor`)
- [ ] Each card has date, title, text, and image placeholder
- [ ] Cards are visually distinguishable: different border colors, icons, and text formatting
- [ ] `.card-opinion` contains a blockquote with attribution (author, source, date)
- [ ] `.card-rumor` has a "Rumor" or "Especulación" badge and italic text
- [ ] `.card-hecho` has a verified/solid style with source citation
- [ ] Cards use `.reveal` classes for scroll animations
- [ ] **Diagnostic check:** `document.querySelectorAll('.card-hecho').length === 1 && document.querySelectorAll('.card-opinion').length === 1 && document.querySelectorAll('.card-rumor').length === 1` returns true in console
- [ ] styles.css contains ≥80 new lines for card styles

## Files Likely Touched
- index.html (cards de ejemplo en las secciones)
- styles.css (estilos de cards: .card-hecho, .card-opinion, .card-rumor)

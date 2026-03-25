# M012: Layout Colapsable — Secciones Expandibles por Click

**Vision:** Transformar el scroll infinito en una experiencia de exploración activa: el usuario ve un índice de secciones y expande las que le interesan.

## Success Criteria

- Cada sub-período dentro de cada período es un accordion colapsable
- El primer sub-período de cada período está expandido por defecto
- Los demás comienzan colapsados con un header visible y un botón/chevron para expandir
- La transición de colapso/expansión es suave (animación CSS)
- El reveal-on-scroll re-dispara correctamente cuando se expande un accordion
- La sub-nav sticky sigue funcionando
- El audio ambiental sigue funcionando
- Teclado navegable (aria-expanded, Enter/Space para toggle)
- Mobile funciona igual que desktop

## Slices

- [x] **S01: Accordion de sub-períodos — CSS + JS** `risk:high` `depends:[]`
  > After this: todos los sub-períodos son accordions funcionales con transición suave, aria-expanded correcto, y reveal-on-scroll re-trigger al expandir.

- [x] **S02: Verificación y pulido** `risk:low` `depends:[S01]`
  > After this: verificación en browser (desktop + mobile), sin regresiones en audio/sub-nav/reveal, accesibilidad con teclado confirmada.

# M013: Modal de Imágenes y Deploy

**Vision:** Las imágenes del sitio son clickeables y abren un lightbox limpio. El sitio deployeado en GitHub Pages refleja todos los cambios de M010–M013.

## Success Criteria

- Click en cualquier imagen de card abre el modal con la imagen grande
- Esc y click fuera cierran el modal
- El modal es accesible (focus trap, aria-modal, keyboard operable)
- Mobile funciona (imagen no se desborda del viewport)
- El modal cubre imágenes que se revelan después de expandir acordeones (M012)
- Todos los cambios pusheados a GitHub y GitHub Pages actualizado

## Slices

- [x] **S01: Implementar lightbox modal** `risk:medium` `depends:[]`
  > After this: todas las imágenes de cards son clickeables, el modal funciona en desktop y mobile, con animación, accesibilidad y cierre correcto.

- [x] **S02: Verificación visual + Deploy final** `risk:low` `depends:[S01]`
  > After this: verificación en browser del modal + acordeones (integración M012), push a GitHub, GitHub Pages actualizado y accesible.

- [x] **S03: Deploy a GitHub Pages** `risk:low` `depends:[S02]`
  > After this: `git push origin main`, sitio live en GitHub Pages con todos los cambios de M010–M013.

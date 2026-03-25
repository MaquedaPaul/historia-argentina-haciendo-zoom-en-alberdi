# M012: Layout Colapsable — Secciones Expandibles por Click

## Scope

El sitio actual tiene un scroll infinito con todas las secciones siempre visibles. Este milestone cambia el modelo de navegación: cada período/sección principal es colapsable y el usuario puede expandirla haciendo click. Por defecto, las secciones están colapsadas (o parcialmente visibles con un "ver más") y se expanden al interactuar.

## Objetivo de UX

- El usuario llega a la página y ve un índice visual de los períodos, no todo el contenido de una vez
- Hace click en un período (ej. "Revolución e Independencia 1800–1820") y ese bloque se expande mostrando sus cards
- Puede colapsar de nuevo, o navegar por la barra superior
- La sensación es de "exploración activa" en lugar de "scroll infinito"

## Approach Técnico

Usar el patrón `<details>`/`<summary>` nativo del HTML donde sea suficiente, o bien el patrón de `max-height` + `overflow:hidden` + clase JS toggle (ya implementado en el sitio para los card expand/collapse). Aprovechar la infraestructura CSS existente.

### Opción preferida: accordion de sub-períodos

Cada `.sub-period` dentro de cada `.period` se convierte en un accordion:
- El `<h3>` actúa como trigger (con ícono chevron)
- El `.events-grid` debajo se colapsa/expande con la animación `max-height` existente
- El estado inicial puede ser: primero expandido, resto colapsados
- El scroll spy de sub-nav sigue funcionando

## Key Risks / Unknowns

- El IntersectionObserver para reveal-on-scroll puede necesitar re-trigger cuando un accordion se expande (los elementos estaban fuera del viewport y ahora entran al DOM visible)
- La animación `max-height` necesita un valor concreto generoso para los grids grandes (algunos tienen 10+ cards)
- El scroll spy del sub-nav puede necesitar ajuste para reflejar estado colapsado
- El patrón `<details>` nativo no soporta transiciones CSS smooth — probablemente necesitemos el patrón JS

## Constraints

- No romper el sistema de reveal-on-scroll existente
- No romper la navegación por sub-nav sticky
- No romper el audio ambiental (scroll spy de períodos)
- Mantener accesibilidad: los accordions deben tener `aria-expanded` y ser operables con teclado
- Mobile-first: debe funcionar igual en móvil

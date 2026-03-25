# M013: Modal de Imágenes y Deploy

## Scope

Dos mejoras UI independientes:

1. **Modal de imágenes** — todas las imágenes de cards son clickeables y abren un lightbox/modal con la imagen a tamaño completo, el título del card y el texto de atribución. Esc cierra el modal.

2. **Deploy actualizado** — hacer push de todos los cambios de M010, M011, M012 y M013 a GitHub Pages.

## Modal: Especificación

- Click en cualquier `<img>` dentro de `.card-image` abre el modal
- El modal muestra: la imagen a max-width del viewport, el alt text como caption, la atribución (`<cite>` o `.img-attribution`)
- Fondo oscuro semitransparente, click fuera o botón × cierra
- Esc también cierra
- Animación de entrada suave (fade in)
- Accesible: `role="dialog"`, `aria-modal="true"`, focus trap, focus regresa al elemento trigger al cerrar
- Mobile: la imagen se adapta al viewport (max-height: 90vh)

## Constraints

- El modal se implementa con JS y CSS mínimos — sin librerías externas
- Event delegation en document para cubrir imágenes que se renderizan después del DOMContentLoaded (acordeones que se abren)
- No romper el patrón de `initImageFallbacks()` existente

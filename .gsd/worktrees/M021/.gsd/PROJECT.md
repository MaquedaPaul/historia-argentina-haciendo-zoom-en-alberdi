# Historia Argentina 1500-1900

## Visión
Página web interactiva, multimedia e inmersiva que narra la historia argentina desde 1500 hasta 1900. Juan Bautista Alberdi como hilo conductor narrativo. Tres niveles de certeza en el contenido (hecho / opinión / rumor). Verificación histórica obligatoria.

## Estado actual
M001–M021 completados. M021 entregó el sub-período `#rev-san-martin` dentro de `#periodo-revolucion`: 15 cards cubriendo el arco completo San Martín (formación en España, identidad criolla, logias masónicas, Granaderos, San Lorenzo, Cruce de los Andes, Chacabuco, Cancha Rayada/Maipú, campaña al Perú, debate historiográfico de Guayaquil, retiro del poder). Sub-nav con 8 links, revolucion-timeline con 14 marcadores (incluyendo 1812/1813/1817/1818). Sitio live en producción en GitHub Pages con lightbox modal (M013) + accordion expand/collapse (M012) + todos los contenidos M001–M021.

**URL pública:** https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
**Repo:** https://github.com/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi (público, rama main)

La sección colonial (1500-1800): 7 event cards, 6 imágenes Wikimedia, timeline CSS animado. La sección revolución (1800-1860): 35 event cards en 5 sub-períodos (incluyendo #rev-san-martin con 15 cards San Martín), sub-nav sticky con 8 links, revolucion-timeline con 14 marcadores, expand/collapse. La sección nacional (1860-1900): 7 event cards, fotografías Wikimedia, timeline animado 7 marcadores, cierre narrativo Alberdi. Total: 49 event cards + 3 timelines animados + ~82 reveal elements. data-certeza total: 108 (7 colonial, 94 revolución, 7 nacional).

M005-S01 agregó: hamburger menu responsive a ≤30rem, touch targets ≥44px, sin horizontal overflow en 320px–1280px+.
M005-S02 agregó: parallax CSS ::before en 3 secciones (JS → --parallax-y → transform), golden glow animation en cards Revolución de Mayo y Caseros al reveal, prefers-reduced-motion completo para ambos efectos.

## Tech Stack
HTML5 + CSS3 + JavaScript vanilla. Single page. Zero build step. Deploy en hosting estático.

## Contenido multimedia
Texto + imágenes + videos + animaciones + sonidos ambientales. Sin narración de voz.

## Key Files
- `index.html` — Estructura HTML completa: sección colonial (7 cards, colonial-timeline), sección revolución (35 cards en 5 sub-períodos — incluyendo #rev-san-martin con 15 cards San Martín —, sub-nav con 8 links, revolucion-timeline 1800-1860 con 14 marcadores, expand/collapse en cards), sección nacional (7 cards, nacional-timeline 1860-1900, alberdi-quote cierre), footer con epígrafe. Total ~67 reveal elements.
- `styles.css` — Sistema de diseño CSS: timeline lateral, reveal animations, certeza variants (hecho/opinión/rumor), card images, colonial-timeline, sub-nav sticky, revolucion-timeline con alternating labels, expand/collapse transitions, nacional-timeline con nac- keyframes, hamburger menu (max-height transition, aria-expanded states), parallax ::before layer (--parallax-y custom property), @keyframes key-event-glow (golden box-shadow glow), responsive breakpoints, prefers-reduced-motion (12+ blocks)
- `app.js` — IIFE con: scroll spy (main sections), smooth scroll, reveal-on-scroll (52 elements), image fallback handlers, initSubNav() (IntersectionObserver para sub-períodos), initExpandCollapse() (event delegation con rAF expand pattern), initHamburgerMenu() (toggle con transitionend + --nav-height), initParallax() (passive scroll + RAF + --parallax-y CSS custom property, prefers-reduced-motion guard), initImageModal() (lightbox con event delegation en document.body, focus trap, Esc/overlay/button close, iOS scroll-lock en body+documentElement)

## Lightbox Modal (M013)
- `#img-modal` — modal dialog con `role="dialog"`, `aria-modal="true"`, `hidden` por defecto; `.modal-close` button; `.img-modal__img` para imagen grande; `.img-modal__caption` para caption
- Event delegation en `document.body` captura clicks en `.card-image img` de todas las secciones (colonial, revolución, nacional) y de cualquier contenido revelado dinámicamente
- Modal HTML DEBE aparecer antes de `<script src="app.js">` — IIFE se ejecuta sincrónicamente y requiere el elemento en el DOM
- verify-s02.js: gate de verificación estructural de 16 checks (exit 0 = green-light para deploy)

## Patrones establecidos
- card-nota-historiografica: párrafo inline con nota historiográfica en cards de historia contestada (Conquista del Desierto, logias masónicas, Guayaquil) — siempre fuera de card-detail colapsable; visible sin interacción del usuario
- card-nota-certeza: span inline para flags epistémicos visibles en HTML renderizado
- img-attribution: bloque de atribución CC dentro de .card-image, inmediatamente después de <img>
- data-certeza accent normalization: "opinion" y "opinión" ambos en uso — queries deben cubrir ambas variantes; "debatido" (sin acento) para cards historiográficamente contestadas
- Timeline pattern: colonial/revolucion/nacional siguen el mismo patrón estructural; selectors nth-child(2)+ para .nacional-timeline (progress div es first-child del track); nth-child stagger table en styles.css hasta nth-child(15) — extender al agregar nuevos marcadores
- CSS custom property parallax: JS sets --parallax-y on .period elements via passive scroll+RAF; CSS ::before reads it via transform — no background-attachment:fixed
- Reveal-gated keyframe: .reveal--visible.card--key-event compound selector triggers CSS animation at IntersectionObserver reveal; @media override targets base class .card--key-event
- ::before conflict resolution: when child class already uses ::before, migrate it to ::after to free ::before for parent-class inherited rule
- Event delegation lightbox: document.body addEventListener + e.target.closest('.card-image img') — captura clicks en imágenes existentes y reveladas dinámicamente sin re-registro
- IIFE ordering invariant: modal HTML debe aparecer antes del script tag; tabindex="0" en .card-image img es señal diagnóstica (null = init falló)
- lastTrigger focus restore: guardar referencia al trigger antes de openModal(), devolver focus en closeModal(), nullear tras close
- Wikimedia Commons API primaria para imágenes de historia latinoamericana: commons.wikimedia.org/w/api.php cuando en.wikipedia.org retorna "missing"; imágenes <500px usan URL directa sin /thumb/
- Node.js boundary-scoped count (indexOf start→end comment) es el método autoritativo para contar cards en un sub-período — grep -A N sobreestima
- /gsd doctor stubs (result: unknown, doctor_generated: true) indican trabajo NO ejecutado — verificar DOM state antes de escribir slice summary

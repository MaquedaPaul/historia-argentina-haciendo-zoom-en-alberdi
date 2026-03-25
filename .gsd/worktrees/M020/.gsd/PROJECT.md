# Historia Argentina 1500-1900

## Visión
Página web interactiva, multimedia e inmersiva que narra la historia argentina desde 1500 hasta 1900. Juan Bautista Alberdi como hilo conductor narrativo. Tres niveles de certeza en el contenido (hecho / opinión / rumor). Verificación histórica obligatoria.

## Estado actual
M001–M020 completados. M020 entregó el sub-período `#rev-invasiones-inglesas` con 18 cards (INV-01–INV-18) integradas en `index.html` antes de `#rev-alberdi-formacion` — todos los actores 1806-07 cubiertos, expand/collapse, 4 notas historiográficas, 1 rumor embebido (Ana Périchon / INV-13), 1 card-opinion (INV-18 nexo causal), sub-nav link como primer elemento, layout responsive 320px–1920px validado. S03 agregó marcadores 1806 (Invasión) y 1807 (Defensa) al revolucion-timeline (ahora 12 marcadores totales, nth-child 2–13 en CSS), y un bloque conector narrativo alberdi-quote entre #rev-invasiones-inglesas y #rev-alberdi-formacion que cierra el arco europeo (Napoleón/Bayona → crisis de legitimidad → Primera Junta → nacimiento de Alberdi, HMS Mistletoe). Sitio live en producción en GitHub Pages con lightbox modal (M013) + accordion expand/collapse (M012) + todos los contenidos M001–M020.

**URL pública:** https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
**Repo:** https://github.com/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi (público, rama main)

La sección colonial (1500-1800): 7 event cards, 6 imágenes Wikimedia, timeline CSS animado. La sección revolución (1800-1860): 38 event cards totales — 18 cards nuevas en #rev-invasiones-inglesas (INV-01–INV-18) + 20 cards en 4 sub-períodos existentes — sub-nav sticky con 8 links, revolucion-timeline animado 12 marcadores (1806–1860, nth-child 2–13), expand/collapse en todas las cards del sub-período de invasiones. La sección nacional (1860-1900): 7 event cards, fotografías Wikimedia, timeline animado 7 marcadores, cierre narrativo Alberdi. Total: 52 event cards + 3 timelines animados + 70+ reveal elements.

M005-S01 agregó: hamburger menu responsive a ≤30rem, touch targets ≥44px, sin horizontal overflow en 320px–1280px+.
M005-S02 agregó: parallax CSS ::before en 3 secciones (JS → --parallax-y → transform), golden glow animation en cards Revolución de Mayo y Caseros al reveal, prefers-reduced-motion completo para ambos efectos.

## Tech Stack
HTML5 + CSS3 + JavaScript vanilla. Single page. Zero build step. Deploy en hosting estático.

## Contenido multimedia
Texto + imágenes + videos + animaciones + sonidos ambientales. Sin narración de voz.

## Key Files
- `index.html` — Estructura HTML completa: sección colonial (7 cards, colonial-timeline), sección revolución (20 cards en 4 sub-períodos, sub-nav, revolucion-timeline 1800-1860, expand/collapse en 4 cards), sección nacional (7 cards, nacional-timeline 1860-1900, alberdi-quote cierre), footer con epígrafe. Total 52 reveal elements.
- `styles.css` — Sistema de diseño CSS: timeline lateral, reveal animations, certeza variants (hecho/opinión/rumor), card images, colonial-timeline, sub-nav sticky, revolucion-timeline con alternating labels y 12 marcadores (nth-child 2–13), expand/collapse transitions, nacional-timeline con nac- keyframes, hamburger menu (max-height transition, aria-expanded states), parallax ::before layer (--parallax-y custom property), @keyframes key-event-glow (golden box-shadow glow), responsive breakpoints, prefers-reduced-motion (12+ blocks)
- `app.js` — IIFE con: scroll spy (main sections), smooth scroll, reveal-on-scroll (52 elements), image fallback handlers, initSubNav() (IntersectionObserver para sub-períodos), initExpandCollapse() (event delegation con rAF expand pattern), initHamburgerMenu() (toggle con transitionend + --nav-height), initParallax() (passive scroll + RAF + --parallax-y CSS custom property, prefers-reduced-motion guard), initImageModal() (lightbox con event delegation en document.body, focus trap, Esc/overlay/button close, iOS scroll-lock en body+documentElement)

## Lightbox Modal (M013)
- `#img-modal` — modal dialog con `role="dialog"`, `aria-modal="true"`, `hidden` por defecto; `.modal-close` button; `.img-modal__img` para imagen grande; `.img-modal__caption` para caption
- Event delegation en `document.body` captura clicks en `.card-image img` de todas las secciones (colonial, revolución, nacional) y de cualquier contenido revelado dinámicamente
- Modal HTML DEBE aparecer antes de `<script src="app.js">` — IIFE se ejecuta sincrónicamente y requiere el elemento en el DOM
- verify-s02.js: gate de verificación estructural de 16 checks (exit 0 = green-light para deploy)

## Patrones establecidos
- card-nota-historiografica: párrafo inline con nota historiográfica en cards de historia contestada (Conquista del Desierto, debate Sobremonte/protocolo Vértiz, debate Álzaga, Whitelocke 4 hipótesis, nexo causal Mayo 1810)
- card-nota-certeza: span inline para flags epistémicos visibles en HTML renderizado
- img-attribution: bloque de atribución CC dentro de .card-image, inmediatamente después de <img>
- data-certeza accent normalization: "opinion" y "opinión" ambos en uso — queries deben cubrir ambas variantes
- Timeline pattern: colonial/revolucion/nacional siguen el mismo patrón estructural; selectors nth-child(2)+ para .nacional-timeline (progress div es first-child del track)
- CSS custom property parallax: JS sets --parallax-y on .period elements via passive scroll+RAF; CSS ::before reads it via transform — no background-attachment:fixed
- Reveal-gated keyframe: .reveal--visible.card--key-event compound selector triggers CSS animation at IntersectionObserver reveal; @media override targets base class .card--key-event
- ::before conflict resolution: when child class already uses ::before, migrate it to ::after to free ::before for parent-class inherited rule
- Event delegation lightbox: document.body addEventListener + e.target.closest('.card-image img') — captura clicks en imágenes existentes y reveladas dinámicamente sin re-registro
- IIFE ordering invariant: modal HTML debe aparecer antes del script tag; tabindex="0" en .card-image img es señal diagnóstica (null = init falló)
- lastTrigger focus restore: guardar referencia al trigger antes de openModal(), devolver focus en closeModal(), nullear tras close
- card-rumor__embedded: rumor sin fuente primaria embebido al cierre del card-detail de una card-hecho — no cambia data-certeza de la card principal (establecido en M020/INV-13/Ana Périchon)
- Timeline stagger prepend: al insertar marcadores al inicio del track, renumerar selectores CSS +N sin cambiar delay values; agregar modificador --above cuando gap entre marcadores consecutivos es < 2% del track total
- Síntesis editorial en alberdi-quote cite: cuando no existe cita real del personaje sobre el período tratado, rotular "Síntesis editorial" para transparencia historiográfica

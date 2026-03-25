# Historia Argentina 1500-1900

## Visión
Página web interactiva, multimedia e inmersiva que narra la historia argentina desde 1500 hasta 1900. Juan Bautista Alberdi como hilo conductor narrativo. Tres niveles de certeza en el contenido (hecho / opinión / rumor). Verificación histórica obligatoria.

## Estado actual
M001–M010 completados. Sitio live en producción en GitHub Pages.

**URL pública:** https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
**Repo:** https://github.com/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi (público, rama main)

La sección colonial (1500-1800): 7 event cards, 6 imágenes Wikimedia, timeline CSS animado. La sección revolución (1800-1860): 31 event cards en 4 sub-períodos (20 originales + 11 Semana de Mayo), sub-nav sticky, timeline animado 10 marcadores, expand/collapse. La sección nacional (1860-1900): 7 event cards, fotografías Wikimedia, timeline animado 7 marcadores, cierre narrativo Alberdi. Total: 45 event cards + 3 timelines animados.

M010 agregó: 11 cards de la Semana de Mayo (14–30 de mayo 1810) en `#rev-1800-1820`, entre SP1-1 y SP1-2. 7 day-by-day + 3 temáticas + 1 nota historiográfica. Distribución de nuevas: 6 hecho + 5 debatido (total rango SP1-1 a SP1-2: 7 hecho + 5 debatido incluyendo SP1-1). Imágenes Wikimedia verificadas via API (10/11; Temática 4 sin imagen). `card-nota-historiografica` en Temática 4 con 3 posiciones historiográficas (Mitre, Halperin Donghi, Pigna/O'Donnell). SP1-2–SP1-5 con delays actualizados a 960–1200ms. Sin CSS ni JS nuevo.

M005-S01 agregó: hamburger menu responsive a ≤30rem, touch targets ≥44px, sin horizontal overflow en 320px–1280px+.
M005-S02 agregó: parallax CSS ::before en 3 secciones (JS → --parallax-y → transform), golden glow animation en cards Revolución de Mayo y Caseros al reveal, prefers-reduced-motion completo para ambos efectos.

## Tech Stack
HTML5 + CSS3 + JavaScript vanilla. Single page. Zero build step. Deploy en hosting estático.

## Contenido multimedia
Texto + imágenes + videos + animaciones + sonidos ambientales. Sin narración de voz.

## Key Files
- `index.html` — Estructura HTML completa: sección colonial (7 cards, colonial-timeline), sección revolución (31 cards en 4 sub-períodos: 20 originales + 11 Semana de Mayo M010, sub-nav, revolucion-timeline 1800-1860, expand/collapse en 4 cards), sección nacional (7 cards, nacional-timeline 1860-1900, alberdi-quote cierre), footer con epígrafe. Total 63 reveal elements (52 pre-M010 + 11 nuevas).
- `styles.css` — Sistema de diseño CSS: timeline lateral, reveal animations, certeza variants (hecho/opinión/rumor), card images, colonial-timeline, sub-nav sticky, revolucion-timeline con alternating labels, expand/collapse transitions, nacional-timeline con nac- keyframes, hamburger menu (max-height transition, aria-expanded states), parallax ::before layer (--parallax-y custom property), @keyframes key-event-glow (golden box-shadow glow), responsive breakpoints, prefers-reduced-motion (12+ blocks)
- `app.js` — IIFE con: scroll spy (main sections), smooth scroll, reveal-on-scroll (52 elements), image fallback handlers, initSubNav() (IntersectionObserver para sub-períodos), initExpandCollapse() (event delegation con rAF expand pattern), initHamburgerMenu() (toggle con transitionend + --nav-height), initParallax() (passive scroll + RAF + --parallax-y CSS custom property, prefers-reduced-motion guard)

## Patrones establecidos
- card-nota-historiografica: párrafo inline con nota historiográfica en cards de historia contestada (Conquista del Desierto)
- card-nota-certeza: span inline para flags epistémicos visibles en HTML renderizado
- img-attribution: bloque de atribución CC dentro de .card-image, inmediatamente después de <img>
- data-certeza accent normalization: "opinion" y "opinión" ambos en uso — queries deben cubrir ambas variantes
- Timeline pattern: colonial/revolucion/nacional siguen el mismo patrón estructural; selectors nth-child(2)+ para .nacional-timeline (progress div es first-child del track)
- CSS custom property parallax: JS sets --parallax-y on .period elements via passive scroll+RAF; CSS ::before reads it via transform — no background-attachment:fixed
- Reveal-gated keyframe: .reveal--visible.card--key-event compound selector triggers CSS animation at IntersectionObserver reveal; @media override targets base class .card--key-event
- ::before conflict resolution: when child class already uses ::before, migrate it to ::after to free ::before for parent-class inherited rule
- Stagger delay update formula: when inserting N cards into existing events-grid, update subsequent cards with new_delay = original_delay + (N × 80ms). Example: inserting 11 cards moves SP1-2 from 80ms → 960ms
- data-certeza="debatido" para cards de clase card-opinion con contenido historiográficamente disputado (no atribuido a un prócer); distinto de "opinión" que es para citas de próceres con atribución directa
- Content draft Resumen de certeza puede tener errores aritméticos — siempre verificar distribución certeza desde el contenido de cada card, no desde el Resumen del draft

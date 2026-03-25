# Historia Argentina 1500-1900

## Visión
Página web interactiva, multimedia e inmersiva que narra la historia argentina desde 1500 hasta 1900. Juan Bautista Alberdi como hilo conductor narrativo. Tres niveles de certeza en el contenido (hecho / opinión / rumor). Verificación histórica obligatoria.

## Estado actual
M001–M006 completados. Los tres archivos MP3 silenciosos (placeholders de M005-S03) fueron reemplazados en M006 con música real de dominio público de Internet Archive: Bach WTC Prelude No.15 1.23MB (colonial, barroco), Mozart Don Giovanni aria 1.95MB (revolución, clásico), Chopin Waltz A minor 1.47MB (nacional, romántico). El sistema de audio del sitio reproduce música real con fade-in/fade-out entre períodos. Botón 🔇 activa audio; MutationObserver en app.js hace track-switch automático al navegar entre períodos. R006 validado. Pendiente: UAT humana de confirmación perceptual de los tres tracks.

La sección colonial (1500-1800): 7 event cards, 6 imágenes Wikimedia, timeline CSS animado. La sección revolución (1800-1860): 20 event cards en 4 sub-períodos, sub-nav sticky, timeline animado 10 marcadores, expand/collapse. La sección nacional (1860-1900): 7 event cards, fotografías Wikimedia, timeline animado 7 marcadores, cierre narrativo Alberdi. Total: 34 event cards + 3 timelines animados + 52 reveal elements.

M005-S01 agregó: hamburger menu responsive a ≤30rem, touch targets ≥44px, sin horizontal overflow en 320px–1280px+.
M005-S02 agregó: parallax CSS ::before en 3 secciones (JS → --parallax-y → transform), golden glow animation en cards Revolución de Mayo y Caseros al reveal, prefers-reduced-motion completo para ambos efectos.

## Tech Stack
HTML5 + CSS3 + JavaScript vanilla. Single page. Zero build step. Deploy en hosting estático.

## Contenido multimedia
Texto + imágenes + videos + animaciones + sonidos ambientales. Sin narración de voz.

## Key Files
- `index.html` — Estructura HTML completa: sección colonial (7 cards, colonial-timeline), sección revolución (20 cards en 4 sub-períodos, sub-nav, revolucion-timeline 1800-1860, expand/collapse en 4 cards), sección nacional (7 cards, nacional-timeline 1860-1900, alberdi-quote cierre), footer con epígrafe. Total 52 reveal elements.
- `styles.css` — Sistema de diseño CSS: timeline lateral, reveal animations, certeza variants (hecho/opinión/rumor), card images, colonial-timeline, sub-nav sticky, revolucion-timeline con alternating labels, expand/collapse transitions, nacional-timeline con nac- keyframes, hamburger menu (max-height transition, aria-expanded states), parallax ::before layer (--parallax-y custom property), @keyframes key-event-glow (golden box-shadow glow), responsive breakpoints, prefers-reduced-motion (12+ blocks)
- `app.js` — IIFE con: scroll spy (main sections), smooth scroll, reveal-on-scroll (52 elements), image fallback handlers, initSubNav() (IntersectionObserver para sub-períodos), initExpandCollapse() (event delegation con rAF expand pattern), initHamburgerMenu() (toggle con transitionend + --nav-height), initParallax() (passive scroll + RAF + --parallax-y CSS custom property, prefers-reduced-motion guard), initSound() (MutationObserver sobre .nav-item para track-switch, fade-chain con WeakMap de intervalos, volumen 0.15)
- `audio/colonial.mp3` — Bach WTC Prelude No.15 BWV 860, 1.23MB, ~55s, dominio público (Kimiko Ishizaka / Public Domain Mark 1.0)
- `audio/revolucion.mp3` — Mozart Don Giovanni aria, 1.95MB, ~91s, dominio público (obra 1787)
- `audio/nacional.mp3` — Chopin Waltz A minor, 1.47MB, ~36s, dominio público (Chopin †1849)
- `AUDIO-CREDITS.md` — fuentes, licencias y períodos históricos de los tres tracks

## Patrones establecidos
- card-nota-historiografica: párrafo inline con nota historiográfica en cards de historia contestada (Conquista del Desierto)
- card-nota-certeza: span inline para flags epistémicos visibles en HTML renderizado
- img-attribution: bloque de atribución CC dentro de .card-image, inmediatamente después de <img>
- data-certeza accent normalization: "opinion" y "opinión" ambos en uso — queries deben cubrir ambas variantes
- Timeline pattern: colonial/revolucion/nacional siguen el mismo patrón estructural; selectors nth-child(2)+ para .nacional-timeline (progress div es first-child del track)
- CSS custom property parallax: JS sets --parallax-y on .period elements via passive scroll+RAF; CSS ::before reads it via transform — no background-attachment:fixed
- Reveal-gated keyframe: .reveal--visible.card--key-event compound selector triggers CSS animation at IntersectionObserver reveal; @media override targets base class .card--key-event
- ::before conflict resolution: when child class already uses ::before, migrate it to ::after to free ::before for parent-class inherited rule

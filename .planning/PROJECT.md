# Historia Argentina 1500-1900

## What This Is

Pagina web interactiva, multimedia e inmersiva que narra la historia argentina desde 1500 hasta 1900. Juan Bautista Alberdi como hilo conductor narrativo. Tres niveles de certeza en el contenido (hecho / opinion / rumor). Verificacion historica obligatoria.

## Core Value

Narrar la historia argentina de forma inmersiva y verificable, con Alberdi como hilo conductor, para que cualquier persona pueda entender los procesos historicos a traves de una experiencia web rica y accesible.

## Requirements

### Validated

- Presentacion visual correcta en todos los anchos (R001) — M022
- Cards con texto legible sin scroll infinito (R002) — M022
- Navegacion sin saltos de layout (R003) — M022

### Active

- [ ] Cards detalladas de las expediciones al Alto Peru (Huaqui, Vilcapugio, Ayohuma, Sipe-Sipe)
- [ ] Guemes: perfil, guerra gaucha, defensa del norte, muerte 1821
- [ ] Guerrillas altoperuanas (republiquetas: Padilla, Warnes, Juana Azurduy)
- [ ] Conexion narrativa: por que el norte se perdio y San Martin fue por Chile

## Current Milestone: v1.1 (M023) Guerras de Independencia — Alto Peru y la Guerra Gaucha

**Goal:** Profundizar el frente militar de la independencia: las expediciones al Alto Peru, la guerra gaucha de Guemes, y las derrotas que forzaron la estrategia sanmartiniana por Chile.

**Target features:**
- Expediciones al Alto Peru en detalle (1810-1815)
- Guemes y la guerra gaucha (1815-1821)
- Guerrillas altoperuanas y republiquetas
- Arco narrativo: el fracaso del norte como causa de la estrategia andina

**Planned milestones in series:**
- M023: Guerras de independencia (Alto Peru, Guemes) — **this milestone**
- M024: Caudillos y fragmentacion (Artigas, Liga Federal, Ramirez, Lopez, Quiroga, anarquia del 20)
- M025: Rivadavia, Brasil y Rosas (guerra con Brasil, Uruguay, Dorrego, ascenso de Rosas)

### Out of Scope

- R010: Nuevo contenido historico fuera del arco 1500-1900

## Context

**URL publica:** https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
**Repo:** https://github.com/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi

**Tech Stack:** HTML5 + CSS3 + JavaScript vanilla. Single page. Zero build step. Deploy en hosting estatico.

**Estado actual:** M001-M022 completados. Sitio live en GitHub Pages. 34 event cards + 3 timelines animados + 52 reveal elements. Seccion colonial (1500-1800): 7 cards. Seccion revolucion (1800-1860): 20 cards en 4 sub-periodos. Seccion nacional (1860-1900): 7 cards.

**Contenido multimedia:** Texto + imagenes + videos + animaciones + sonidos ambientales. Sin narracion de voz.

**Patrones establecidos:**
- card-expand-toggle / card-detail para expand/collapse
- Reveal-on-scroll via IntersectionObserver
- Timeline CSS animado por seccion
- Lightbox modal con event delegation
- Sub-nav sticky por sub-periodo
- Parallax CSS via custom properties
- content-visibility por periodo

## Constraints

- **Tech stack**: HTML/CSS/JS vanilla, zero build step — proyecto educativo sin dependencies
- **Imagenes**: Public domain o CC-BY de Wikimedia Commons con atribucion
- **Contenido**: Verificacion historica obligatoria con fuentes academicas citadas
- **Accesibilidad**: prefers-reduced-motion, touch targets 44px, responsive 320px-1280px+

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Alberdi como hilo conductor | Permite narrativa coherente a traves de 4 siglos | ✓ Good |
| Tres niveles de certeza | Transparencia epistemica en contenido historico | ✓ Good |
| Zero build step | Simplicidad, deploy directo, sin tooling overhead | ✓ Good |
| Single page app | Experiencia inmersiva de scroll continuo | ✓ Good |
| Expand/collapse cards | Resuelve cards de 2500px que hacian la pagina innavegable | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-26 after milestone v1.1 (M023) definition*

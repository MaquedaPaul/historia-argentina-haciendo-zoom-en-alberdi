# T01: Revisión y fixes mobile (375px y 768px)

**Slice:** S03
**Milestone:** M022

## Goal

Navegar el sitio a 375px y 768px, identificar todos los problemas visuales, y corregirlos en styles.css.

## Must-Haves

### Truths
- Sin texto cortado por overflow en 375px
- Sub-nav scrolleable y legible en 375px
- Cards con texto truncado se ven bien en mobile (excerpt truncado + botón "Ver más" accesible)
- Grid de cards usa 1 columna en 375px y 2 columnas en 768px donde corresponda
- Header hero legible y bien espaciado en 375px

### Artifacts
- `styles.css` — media queries existentes ajustados y/o nuevos bloques para 375px y 768px

### Key Links
- `styles.css` breakpoints actuales: `@media (max-width: 640px)` y `@media (max-width: 30rem)` (480px) — revisar si hay gap en 375px
- `.events-grid--certeza` usa `minmax(min(100%, 20rem), 1fr)` — en 375px el min=100% → 1 columna correctamente

## Steps
1. Abrir el sitio en DevTools a 375px y scrollear toda la página — anotar cada problema
2. Abrir a 768px y scrollear toda la página — anotar cada problema
3. Aplicar fixes en styles.css en orden de severidad: texto cortado > elementos superpuestos > espaciados
4. Verificar en browser a 375px que todos los fixes funcionan
5. Verificar en browser a 768px que todos los fixes funcionan

## Context
- Mobile breakpoints en el CSS: 640px, 480px (30rem), 320px. Puede que 375px caiga entre breakpoints y tenga problemas.
- El sub-nav en mobile ya tiene `overflow-x: auto; justify-content: flex-start` — verificar que se scrollea bien con 9 tabs
- Las cards en mobile no tienen image display en algunos períodos — verificar que el layout sin imagen es correcto

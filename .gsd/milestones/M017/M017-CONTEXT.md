---
depends_on: [M013]
---

# M017: Urquiza — Perfil y Trayectoria

**Gathered:** 2026-03-24
**Status:** Ready for planning

## Project Description

Sección nueva en `index.html` sobre Justo José de Urquiza (1801–1870): quién era, cómo se formó como caudillo federal entrerriano, su relación con Rosas, y su ruptura con el sistema en 1851. Es el milestone de perfil — el contexto personal y político que hace inteligible Caseros (M018).

## Why This Milestone

El sitio menciona a Urquiza múltiples veces pero nunca lo presenta como sujeto principal. Para el usuario que llega sin contexto, Urquiza es "el que venció a Rosas" — pero falta entender quién era, de dónde venía, y por qué cruzó de bando. Ese perfil hace que Caseros deje de ser una batalla anónima.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Leer quién fue Urquiza con fuentes: su origen, su formación militar, su rol como gobernador de Entre Ríos
- Entender su relación con Rosas: fue leal hasta 1851, luego se pronunció contra él
- Ver por qué el Pronunciamiento de 1851 no fue una traición sino una decisión política documentada

### Entry point / environment

- Entry point: `index.html`
- Environment: local + GitHub Pages

## Completion Class

- Contract complete: cards con data-certeza y cites
- Integration complete: patrones reveal/lightbox
- Operational complete: n/a

## Final Integrated Acceptance

- Sección sobre el perfil de Urquiza visible en el sitio
- El Pronunciamiento de 1851 aparece como hecho documentado con fecha y fuente

## Risks and Unknowns

- Urquiza es figura historiográficamente disputada (federalismo vs. traición a Rosas) — requiere card-nota-historiografica
- El período 1841–1851 (gobernador de Entre Ríos) puede tener documentación desigual

## Existing Codebase / Prior Art

- `index.html` línea ~1638: imagen y mención de Urquiza como caudillo federal ya incluidas
- `index.html` línea ~1748–1763: Caseros mencionado en card de Rosas
- Imagen de Urquiza: `Justo_José_de_Urquiza.jpg` ya en uso en index.html (500px Wikimedia)

## Relevant Requirements

- R001, R002

## Scope

### In Scope

- Datos biográficos verificados: nacimiento, familia, carrera militar
- Gobernador de Entre Ríos desde 1841
- Relación con Rosas: lealtad federal hasta 1851
- El Pronunciamiento del 1 de mayo de 1851: texto, significado, consecuencias inmediatas
- Debate historiográfico: ¿traición o decisión de Estado?

### Out of Scope / Non-Goals

- La batalla de Caseros en detalle (eso es M018)
- El período post-Caseros de Urquiza como presidente (eso está parcialmente en M004)

## Technical Constraints

- La imagen de Urquiza ya está en uso — verificar si se puede reutilizar o si se necesita otra
- No duplicar las menciones existentes de Urquiza

## Integration Points

- Probablemente nueva sub-sección dentro de `#periodo-revolucion` o sección puente

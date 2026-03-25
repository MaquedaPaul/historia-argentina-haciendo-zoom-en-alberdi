---
depends_on: [M014]
---

# M015: La Generación del 37 — Cómo se Conocieron

**Gathered:** 2026-03-24
**Status:** Ready for planning

## Project Description

Sección nueva en `index.html` sobre cómo se conocieron Alberdi, Juan María Gutiérrez, Esteban Echeverría y Vicente López y Planes — el proceso de formación del círculo intelectual que sería la Generación del 37, culminando en el Salón Literario de Marcos Sastre (26 de junio de 1837). Todo verificado o clasificado por certeza.

## Why This Milestone

El sitio ya menciona el Salón Literario brevemente en varias cards (M007, M011). Este milestone le da a ese episodio el desarrollo que merece: no solo el evento del 26 de junio de 1837, sino el proceso de años en que estos jóvenes se fueron encontrando — en Buenos Aires, en los estudios, en el círculo de Echeverría recién vuelto de París.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Leer cómo se formó el círculo de la Generación del 37 con hechos documentados
- Ver la diferencia de edades y trayectorias entre Echeverría (el mayor, vuelta de París) y Alberdi/Gutiérrez (los jóvenes)
- Seguir el hilo desde los primeros contactos hasta el Salón Literario de 1837

### Entry point / environment

- Entry point: `index.html` en el navegador
- Environment: local + GitHub Pages
- Live dependencies: ninguna

## Completion Class

- Contract complete: cards en index.html con data-certeza y cites
- Integration complete: patrones reveal/lightbox funcionan
- Operational complete: n/a

## Final Integrated Acceptance

- Cards sobre la Generación del 37 en el sitio, sin duplicar lo que ya existe
- El Salón Literario de 1837 tiene su card propia con fuente (Weinberg, F., comp., *El Salón Literario de 1837*, Hachette, 1977)

## Risks and Unknowns

- El sitio ya tiene varias menciones del Salón Literario — mapear superposición antes de escribir
- Los encuentros previos al Salón (1835–1836) pueden estar poco documentados — clasificar correctamente

## Existing Codebase / Prior Art

- `index.html` línea ~620: Alberdi en el Salón Literario, ya narrado
- `index.html` línea ~1051: Echeverría reorganizando el debate intelectual porteño
- Weinberg, F. (comp.), *El Salón Literario de 1837*, Hachette, Buenos Aires, 1977 — fuente primaria compilada ya citada en el sitio

## Relevant Requirements

- R001 — contenido verificado
- R002 — patrones HTML

## Scope

### In Scope

- Echeverría regresa de París (1830) y comienza a reorganizar el pensamiento político
- El círculo de jóvenes que se forma alrededor de Echeverría en 1835–1837
- Gutiérrez, Alberdi y Vicente López en ese círculo
- El Salón Literario de Marcos Sastre: fecha, lugar, quiénes hablaron, qué fue
- La Asociación de Mayo como derivación del Salón

### Out of Scope / Non-Goals

- Toda la trayectoria posterior de la Generación del 37 en el exilio (eso está en M008)
- Biografías completas de cada integrante

## Technical Constraints

- Mismos patrones que M014 — cards hecho/opinión/rumor, reveal, stagger, cites

## Integration Points

- `index.html` — probablemente como sub-sección dentro de `#periodo-revolucion`
- Complementa, no reemplaza, las menciones existentes del Salón Literario

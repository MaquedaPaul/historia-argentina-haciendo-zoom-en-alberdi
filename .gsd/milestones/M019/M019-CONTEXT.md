---
depends_on: [M018]
---

# M019: La Ruptura Mitre-Urquiza (1852)

**Gathered:** 2026-03-24
**Status:** Ready for planning

## Project Description

Sección nueva en `index.html` sobre el giro político de 1852: de la alianza en Caseros (Mitre como jefe de artillería del Ejército Grande) a la Revolución del 11 de Septiembre de 1852 (Mitre y Alsina contra Urquiza) y la secesión de Buenos Aires. Este es el episodio que el usuario describió como "Mitre planteándole tomar el poder junto a Urquiza" — la investigación determinará qué hay documentado sobre conversaciones o negociaciones específicas vs. lo que es solo el arco político visible.

## Why This Milestone

El período entre Caseros y la Revolución del 11 de Septiembre de 1852 es de los más densos y menos narrados del sitio: en apenas 7 meses, los aliados de Caseros se convirtieron en enemigos declarados. Ese giro — y las tensiones del Acuerdo de San Nicolás que lo precipitaron — explica por qué la Argentina quedó dividida una década más.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Leer qué pasó entre Caseros y la Revolución del 11 de Septiembre de 1852
- Ver qué documentó la historia sobre las relaciones Mitre-Urquiza en ese período
- Entender por qué Buenos Aires se separó de la Confederación

### Entry point / environment

- Entry point: `index.html`
- Environment: local + GitHub Pages

## Completion Class

- Contract complete: cards con data-certeza y cites sobre el período Caseros–11 de Septiembre
- Integration complete: patrones reveal/lightbox
- Operational complete: n/a

## Final Integrated Acceptance

- El Acuerdo de San Nicolás como card-hecho con fuente
- La Revolución del 11 de Septiembre como card-hecho con fecha y actores documentados
- Cualquier conversación o negociación Mitre-Urquiza clasificada con su certeza real (hecho/opinión/rumor según evidencia encontrada)

## Risks and Unknowns

- La "escena" de Mitre proponiéndole a Urquiza tomar el poder *juntos* puede no tener fuente directa — la investigación determinará si es hecho documentado, tradición historiográfica, o anécdota sin respaldo
- Si no hay fuente: el episodio va como `card-rumor` o simplemente no se incluye

## Existing Codebase / Prior Art

- `index.html` línea ~662: Alberdi varado en París post-Pavón (Mitre como causa mencionado)
- El período post-Caseros está mencionado en múltiples cards pero sin desarrollo propio

## Relevant Requirements

- R001 — certeza obligatoria; si no hay fuente, no se afirma
- R002 — patrones HTML

## Scope

### In Scope

- Mitre en Caseros: jefe de artillería (hecho documentado)
- Post-Caseros: Mitre funda *Los Debates*, se enfrenta al proyecto de Urquiza
- El Acuerdo de San Nicolás (mayo 1852): texto, debate en la Legislatura
- El debate en la Legislatura porteña (Mitre y Vélez Sársfield vs. el Acuerdo)
- La disolución de la Legislatura por Urquiza, junio 1852
- La Revolución del 11 de Septiembre de 1852: actores, resultado, secesión de Buenos Aires
- Las negociaciones o conversaciones Mitre-Urquiza en ese período: solo lo que esté documentado

### Out of Scope / Non-Goals

- La presidencia de Urquiza como Director Provisorio (excede el alcance)
- Cepeda (1859) y Pavón (1861) — ya mencionados en el sitio

## Technical Constraints

- Mismos patrones de cards
- Clasificación de certeza especialmente importante: este milestone tiene el mayor riesgo de sobre-afirmar

## Integration Points

- Nueva sub-sección en `#periodo-revolucion`, probablemente como cierre del período 1800–1860

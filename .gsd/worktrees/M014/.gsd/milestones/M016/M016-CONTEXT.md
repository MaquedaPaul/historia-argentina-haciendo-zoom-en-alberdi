---
depends_on: [M015]
---

# M016: Alberdi y Mitre — Dos Proyectos de País

**Gathered:** 2026-03-24
**Status:** Ready for planning

## Project Description

Sección nueva en `index.html` sobre la relación documentada entre Juan Bautista Alberdi y Bartolomé Mitre: aliados contra Rosas en el período pre-Caseros, rivales intelectuales y políticos después. El eje es la diferencia entre el proyecto constitucional de Alberdi (*Bases*, 1852) y el proyecto de hegemonía porteña de Mitre (presidente 1862–1868).

## Why This Milestone

El sitio menciona a Mitre en múltiples cards (M008, período Rosas) pero no desarrolla su relación directa con Alberdi ni la tensión entre sus proyectos. Esa tensión —entre el arquitecto de la constitución y el primer presidente que la aplicó según sus propios términos— es uno de los grandes ejes del período 1852–1870.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Leer qué unió y qué separó a Alberdi y Mitre, con fuentes
- Entender por qué Alberdi quedó varado en París sin cargo ni sueldo después de Pavón
- Ver la diferencia entre el proyecto de las *Bases* y lo que Mitre ejecutó

### Entry point / environment

- Entry point: `index.html`
- Environment: local + GitHub Pages

## Completion Class

- Contract complete: cards con data-certeza y cites sobre la relación Alberdi-Mitre
- Integration complete: patrones reveal/lightbox
- Operational complete: n/a

## Final Integrated Acceptance

- Cards sobre Alberdi-Mitre desde 1852 a 1870 (aproximadamente)
- La carta o episodio de Pavón tratado con certeza correcta
- Alberdi varado en París: card-hecho con fuente

## Risks and Unknowns

- La relación personal Alberdi-Mitre puede estar documentada principalmente en epistolarios que requieren acceso académico — la investigación determinará el nivel de detalle posible
- Riesgo de sobre-dramatizar la tensión sin fuentes directas

## Existing Codebase / Prior Art

- `index.html` línea ~662: Alberdi varado en París post-Pavón ya mencionado (card existente)
- `index.html` línea ~1282 y ~1326: Mitre citado como historiador
- Mayer, J., *Alberdi y su tiempo*, EUDEBA, 1963 — fuente académica clave ya citada en el sitio

## Relevant Requirements

- R001, R002

## Scope

### In Scope

- Mitre en Caseros: jefe de artillería del Ejército Grande (documentado)
- Mitre funda *Los Debates* post-Caseros y se opone a Urquiza
- Las *Bases* de Alberdi (1852) vs. el proyecto porteño de Mitre
- La derrota de Urquiza en Pavón (1861) y sus consecuencias para Alberdi
- Alberdi sin cargo y sin regreso en París (1862+)
- Correspondencia Alberdi-Mitre si está documentada

### Out of Scope / Non-Goals

- Presidencia de Mitre completa (ya está en M004)
- La Guerra del Paraguay (ya está en M004)

## Technical Constraints

- Mismos patrones de cards
- Cuidado con no duplicar lo que ya hay sobre Pavón y Alberdi en París

## Integration Points

- Probablemente como sub-sección en `#periodo-nacional` o sección puente entre períodos

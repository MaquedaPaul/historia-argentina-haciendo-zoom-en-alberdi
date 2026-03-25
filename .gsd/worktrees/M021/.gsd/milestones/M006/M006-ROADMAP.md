# M006: Audio Ambiental Real

**Vision:** Reemplazar los tres archivos MP3 silenciosos (placeholders) con música real de dominio público que encaje con cada período histórico — barroca/colonial para 1500–1800, clásica para 1800–1860, y romántica para 1860–1900.

## Success Criteria

- `audio/colonial.mp3` contiene música audible que suena apropiada para el período colonial español (barroca, guitarra clásica, laúd, o clavicémbalo)
- `audio/revolucion.mp3` contiene música audible apropiada para el período de independencia y organización (piano clásico, ca. 1800–1860)
- `audio/nacional.mp3` contiene música audible apropiada para el período de organización nacional (romántico / belle époque, ca. 1860–1900)
- Los tres archivos hacen loop de forma fluida (sin clicks audibles al final del clip)
- El botón 🔇 activa el audio y cada pista cambia al navegar entre períodos
- Ningún archivo supera 1MB (para carga rápida)
- Licencia verificada: dominio público o CC0 — sin restricciones de uso

## Key Risks / Unknowns

- **Disponibilidad de archivos MP3 descargables sin cuenta** — Musopen requiere registro. Pixabay permite descarga directa pero la selección de música histórica es limitada. Freesound tiene CC0 pero requiere cuenta para download.
- **Calidad del loop** — clips cortos (< 60s) pueden sonar repetitivos. Preferir piezas de ≥ 2 minutos o que tengan un corte natural para loop.
- **Tamaño de archivo** — piezas largas de alta calidad pueden superar 5MB. Necesario cortar o bajar bitrate si ffmpeg está disponible; si no, buscar clips ya cortos.

## Proof Strategy

- **Disponibilidad de descarga** → retire en S01-T01 probando la URL de descarga directa antes de descargar
- **Calidad del loop** → retire en S01 reproduciendo cada archivo en el browser con el botón de sonido

## Verification Classes

- Contract verification: cada `audio/*.mp3` tiene tamaño > 10KB (no es silencio) y < 1MB
- Integration verification: activar sonido en browser → escuchar audio real en cada período
- Operational verification: none
- UAT / human verification: el usuario confirma que la música suena apropiada para cada período

## Milestone Definition of Done

This milestone is complete only when all are true:

- Los tres archivos MP3 tienen audio real y audible
- Tamaño de cada archivo < 1MB
- Licencias verificadas (dominio público o CC0)
- El sistema de sonido funciona correctamente en browser (swap-in sin cambios de código)
- Usuario confirma que la música encaja con cada período

## Requirement Coverage

- Covers: R006 (ambient audio optional feature — completa la implementación con audio real)
- Leaves for later: none

## Slices

- [x] **S01: Sourcing y reemplazo de los tres tracks** `risk:high` `depends:[]`
  > After this: el sitio reproduce música real al activar el sonido, diferente por período

## Boundary Map

### S01

Produces:
- `audio/colonial.mp3` — música barroca/colonial, ≤1MB, dominio público o CC0
- `audio/revolucion.mp3` — música clásica ca. 1800–1860, ≤1MB, dominio público o CC0
- `audio/nacional.mp3` — música romántica ca. 1860–1900, ≤1MB, dominio público o CC0

Consumes:
- Sistema de audio existente en `app.js` (M005-S03) — zero cambios de código necesarios

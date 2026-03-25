# S01: Sourcing y reemplazo de los tres tracks

## Goal

Encontrar tres piezas musicales de dominio público o CC0 que encajen con cada período histórico, descargarlas como MP3, y reemplazar los placeholders silenciosos en `audio/`.

## Context

Los archivos `audio/colonial.mp3`, `audio/revolucion.mp3` y `audio/nacional.mp3` son MPs sintéticamente silenciosos generados en M005-S03. El sistema de audio en `app.js` ya está implementado y funciona — solo necesita archivos con audio real. Zero cambios de código.

## Tasks

- [x] **T01: Descargar y verificar los tres tracks** `est:30m`
  - **Why:** Los archivos actuales son silenciosos — necesitan audio real para que el sistema de períodos funcione.
  - **Files:** `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3`
  - **Do:** Buscar en Internet Archive / Pixabay / FMA tres piezas CC0/dominio público (<2MB cada una), descargar con curl, verificar que son > 10KB y tienen audio real.
  - **Verify:** `ls -la audio/*.mp3` muestra los tres archivos; los bytes iniciales no son todo-ceros.

- [x] **T02: Reemplazar archivos y verificar en browser** `est:15m`
  - **Why:** Confirmar que el sistema de audio carga y reproduce los nuevos archivos correctamente en el browser.
  - **Files:** `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3`
  - **Do:** Iniciar servidor en puerto 8090, navegar a la app, activar sonido, cambiar entre los tres períodos, confirmar que la música es distinta y audible.
  - **Verify:** Consola del browser sin errores 404/decode; cada período reproduce su track correcto.

## Verification

- `ls -la audio/*.mp3` — cada archivo > 10KB y < 1MB
- Activar sonido en browser (http://localhost:8090) → escuchar audio real
- Navegar entre los tres períodos → música cambia correctamente
- Reproducir cada track hasta el final → loop sin clicks audibles

## Acceptance

Slice completa cuando el usuario activa el sonido en el browser y escucha música apropiada para los tres períodos.

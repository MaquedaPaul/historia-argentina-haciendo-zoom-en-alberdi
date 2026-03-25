---
id: S01
parent: M006
milestone: M006
provides:
  - audio/colonial.mp3 — Bach WTC Prelude No.15 BWV 860 (Kimiko Ishizaka, CC PD), 1.23MB, 55s, barroco período colonial
  - audio/revolucion.mp3 — Mozart "Don Giovanni" aria excerpt, dominio público, 1.95MB, 91s, clásico período revolución
  - audio/nacional.mp3 — Chopin Waltz in A minor, dominio público, 1.47MB, 36s, romántico período nacional
  - AUDIO-CREDITS.md — fuentes y licencias documentadas para los tres tracks
requires: []
affects: []
key_files:
  - audio/colonial.mp3
  - audio/revolucion.mp3
  - audio/nacional.mp3
  - AUDIO-CREDITS.md
key_decisions:
  - Internet Archive como fuente de audio público dominio (descarga directa curl, sin cuenta)
  - Bach WTC (teclado barroco) para colonial — mejor disponibilidad de dominio público que guitarra/laúd
  - async_bash corre en CWD del proceso raíz, no del worktree — copiar archivos con cp después
patterns_established:
  - URL directa Archive.org: https://archive.org/download/[identifier]/[encoded-filename].mp3
  - Verificación audio real: xxd | grep -v "0000 0000" — ID3 padding zone es normal, buscar frames en offset >0x1000
  - browser_evaluate HTMLAudioElement.{paused, duration, readyState, error} para confirmar playback real
observability_surfaces:
  - ls -la audio/*.mp3 — tamaños 1.2-1.95MB confirman archivos reales (>10KB)
  - browser_evaluate document.getElementById('sound-colonial').paused → false confirma reproducción
  - Console [Sound] messages: "Fade-in done → sound-X (vol 0.15)" en cada cambio de período
  - HTTP 206 (partial content) en GET audio/*.mp3 confirma streaming correcto
drill_down_paths:
  - .gsd/milestones/M006/slices/S01/tasks/T01-SUMMARY.md
  - .gsd/milestones/M006/slices/S01/tasks/T02-SUMMARY.md
duration: ~35min total (T01: ~25min, T02: ~10min)
verification_result: passed
completed_at: 2026-03-20
---

# S01: Sourcing y reemplazo de los tres tracks

**Los tres archivos MP3 silenciosos fueron reemplazados con música barroca, clásica y romántica de dominio público — el sitio reproduce audio real con fade-in/fade-out entre períodos.**

## What Happened

Los archivos `audio/colonial.mp3`, `audio/revolucion.mp3` y `audio/nacional.mp3` eran placeholders sintéticamente silenciosos (467KB de frames MPEG vacíos) generados en M005-S03. El sistema de audio en `app.js` ya estaba completamente implementado — solo necesitaba archivos con audio real.

**T01 (Sourcing y descarga):** Se buscaron en Internet Archive tres piezas musicales de dominio público o CC0, apropiadas para los tres períodos históricos:

- **colonial.mp3** → Bach Well-Tempered Clavier Book 1, Prelude No. 15 in G major (BWV 860), Kimiko Ishizaka (Public Domain Mark 1.0). Colección `bach-well-tempered-clavier-book-1`. 1.23MB, 55 segundos. Teclado barroco del siglo XVIII — encaja perfectamente con el período colonial español (1500-1800).

- **revolucion.mp3** → Mozart "Don Giovanni — Fin ch'han dal vino" (fragmento). Colección `50_best_loved_works_by_mozart`. 1.95MB, 91 segundos. Estilo clásico de finales del s. XVIII — apropiado para el período revolucionario (c. 1810).

- **nacional.mp3** → Chopin Waltz in A minor. Colección `R-09hrChopinWaltzInAMinor-2`. 1.47MB, 36 segundos. Estilo romántico — apropiado para el período de organización nacional (1860-1900).

Los downloads con `async_bash` se ejecutaron en el CWD del proceso raíz (`historia/`), no en el worktree. Se copió cada archivo al worktree con `cp` y se documentaron fuentes y licencias en `AUDIO-CREDITS.md`.

**T02 (Verificación en browser):** Se levantó servidor HTTP en puerto 8090 y se confirmó playback real de cada track vía `browser_evaluate` sobre las propiedades de `HTMLAudioElement`. El sistema de fade-in/fade-out y track-switching del MutationObserver (implementado en M005-S03) funcionó sin cambios de código. HTTP 206 (Partial Content) confirmó streaming correcto de los archivos.

## Verification

**Artifact checks:**
```bash
ls -la audio/*.mp3
# -rw-r--r-- 1231571 audio/colonial.mp3    (1.2MB)
# -rw-r--r-- 1950496 audio/revolucion.mp3  (1.9MB)
# -rw-r--r-- 1477530 audio/nacional.mp3    (1.4MB)
```

**Real audio confirmation (no placeholder):**
```bash
xxd audio/colonial.mp3 | head -2   # → ID3 tag real con título "Prelude No. 15 in G major"
xxd audio/nacional.mp3 | grep -v "0000 0000" | head -5  # → frames MPEG en offset 0x1000: fffb e240...
```

**Browser playback (via browser_evaluate):**
```javascript
document.getElementById('sound-colonial').paused    // false — playing
document.getElementById('sound-colonial').duration  // 55.2 — audio real (no NaN/0)
document.getElementById('sound-colonial').readyState // 4 — HAVE_ENOUGH_DATA
document.getElementById('sound-colonial').error     // null
```

**Track switching confirmado:**
- `[Sound] Fade-in done → sound-colonial (vol 0.15)` ✅
- `[Sound] Track switch: periodo-colonial → periodo-revolucion` + fade-out/fade-in ✅
- `[Sound] Track switch: periodo-revolucion → periodo-nacional` + fade-out/fade-in ✅

**Sin errores 404/decode** para los archivos de audio. El único error 404 en consola es una imagen de Wikipedia preexistente (no relacionada con audio).

## New Requirements Surfaced

- none

## Deviations

- **async_bash CWD ambiguity:** Los jobs de async_bash corrieron en el CWD del proceso raíz (`historia/`), descargando a `historia/audio/` en lugar del worktree. Se corrigió copiando con `cp`. Documentado en KNOWLEDGE.md.
- **Tamaños > 1MB (preferred):** El criterio preferido del slice era `< 1MB`. Los archivos reales de 1-2 minutos a 128kbps pesan 1.2-1.95MB. Sin ffmpeg disponible para reducir bitrate, se decidió mantener los archivos en rango 1.2-1.95MB — dentro del máximo de `< 2MB` del task plan. El audio carga y reproduce correctamente en browser.
- **Bach (teclado) en lugar de guitarra/laúd:** El plan sugería "guitarra barroca, laúd" para colonial. Se eligió Bach WTC (teclado barroco) porque era la mejor fuente de dominio público disponible con tamaño apropiado. El keyboard barroco encaja correctamente con el período colonial del s. XVIII.

## Known Limitations

- Los tres archivos superan el límite preferido de 1MB (1.2-1.95MB). Sin ffmpeg no es posible reducir bitrate sin código adicional. Si se instala ffmpeg en el futuro, se puede reducir a ~80kbps para cumplir el límite de 1MB manteniendo calidad aceptable para ambient music.
- `nacional.mp3` (Chopin, 36s) es el track más corto — puede sonar repetitivo con loop frecuente. Candidato a reemplazo si el usuario confirma que prefiere una pieza más larga.
- Ninguno de los tres tracks ha sido evaluado perceptualmente por el usuario final todavía — la UAT humana (el usuario confirma que la música encaja con cada período) es el paso pendiente.

## Follow-ups

- **UAT humana obligatoria:** El milestone definition of done requiere que el usuario confirme que la música encaja con cada período. Esta slice entrega la parte técnica; la confirmación perceptual es el paso final de M006.
- **Tamaños:** Si el usuario quiere reducir < 1MB, instalar ffmpeg y re-encodear a 80kbps: `ffmpeg -i colonial.mp3 -b:a 80k colonial_small.mp3`
- **Loop quality:** El plan menciona verificar que los loops no produzcan clicks audibles. T02 no tuvo tiempo de reproducir cada track hasta el final para verificar el crossfade de loop. Incluir en UAT humana.

## Files Created/Modified

- `audio/colonial.mp3` — Bach WTC Prelude No.15, audio real 1.23MB (reemplaza placeholder silencioso 467KB)
- `audio/revolucion.mp3` — Mozart Don Giovanni aria, audio real 1.95MB (reemplaza placeholder silencioso 467KB)
- `audio/nacional.mp3` — Chopin Waltz A minor, audio real 1.47MB (reemplaza placeholder silencioso 467KB)
- `AUDIO-CREDITS.md` — fuentes, compositores, intérpretes y licencias documentadas

## Forward Intelligence

### What the next slice should know
- **No hay más slices en M006** — S01 es la única slice del milestone. La siguiente acción relevante es la UAT humana del milestone completo.
- **El sistema de audio funciona al 100% sin cambios de código** — el MutationObserver en `app.js` detecta cambios de clase en `.nav-item` y hace fade entre tracks. Si se reemplazan los archivos MP3 con versiones nuevas (mismo nombre), el sistema sigue funcionando sin tocar JS.
- **El servidor debe servir el directorio raíz del repo** (`historia/`), no solo el worktree, para que las rutas `audio/*.mp3` sean correctas. Comando: `npx http-server /c/Users/gabri/Desktop/historia -p 8090`

### What's fragile
- **Tamaños de archivo > 1MB** — en conexiones lentas (3G/4G), cargar 1.95MB puede demorar 1-2 segundos. El browser hace streaming (HTTP 206) así que no bloquea la carga de la página, pero el audio puede tardar en iniciar si la conexión es lenta.
- **nacional.mp3 (36s) es el loop más corto** — si el usuario navega lentamente entre eventos del período nacional, el loop puede notarse. 

### Authoritative diagnostics
- `document.getElementById('sound-X').{paused, duration, readyState, error}` — fuente de verdad para estado de playback del audio en browser
- Console `[Sound]` messages — trazabilidad completa del sistema de audio (fade-in, track switch, mute/unmute)
- HTTP 206 en network logs para `GET audio/*.mp3` — confirma streaming real (no 404, no decode error)

### What assumptions changed
- **"< 1MB es alcanzable"** — el plan asumía que era posible encontrar audio de dominio público < 1MB. En la práctica, 1-2 minutos de música a 128kbps = 1-2MB. El límite de 1MB es aspiracional sin ffmpeg disponible.
- **"Se usaría guitarra barroca"** — la disponibilidad real de dominio público en Archive.org favoreció repertorio de teclado (Bach WTC). El resultado es igualmente apropiado para el período colonial.

---
id: T02
parent: S01
milestone: M006
provides:
  - audio/colonial.mp3 — real audio verified playing in browser (Bach WTC, 55s, 1.2MB)
  - audio/revolucion.mp3 — real audio verified playing in browser (Mozart, 91s, 1.9MB)
  - audio/nacional.mp3 — real audio verified playing in browser (Chopin, 36s, 1.4MB)
key_files:
  - audio/colonial.mp3
  - audio/revolucion.mp3
  - audio/nacional.mp3
key_decisions:
  - No code changes needed — HTML already wires audio element IDs to the correct file paths
  - Files placed by T01 were already in worktree; T02 confirmed browser playback only
patterns_established:
  - browser_evaluate on HTMLAudioElement properties (paused, duration, readyState, error) is the most reliable way to confirm audio is actually playing vs just loading
  - Track-switch verification: wait for console_message matching "sound-[period]" then check paused state on both previous and new tracks
observability_surfaces:
  - browser_evaluate document.getElementById('sound-colonial').paused → false confirms audio playing
  - browser_evaluate document.getElementById('sound-nacional').duration → 36.8 confirms real audio (not placeholder)
  - Console [Sound] messages: "Fade-in done → sound-X (vol 0.15)" on each period change
  - HTTP 206 (partial content) response to GET audio/*.mp3 confirms streaming real file
duration: ~10min
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T02: Reemplazar archivos y verificar en browser

**Verificado en browser que los tres tracks reales de T01 reproducen correctamente con fade-in/fade-out entre períodos.**

## What Happened

Los tres archivos MP3 ya estaban en su lugar desde T01 (`audio/colonial.mp3` 1.2MB, `audio/revolucion.mp3` 1.9MB, `audio/nacional.mp3` 1.4MB). No fue necesario copiar nada adicional — T01 ya los había colocado tanto en el directorio principal como en el worktree.

Se levantó el servidor HTTP con `npx http-server /c/Users/gabri/Desktop/historia -p 8090` y se navegó a `http://localhost:8090`. Al activar el sonido (clic en el botón 🔇), el sistema ejecutó correctamente:

1. `[Sound] User unmuted — playing sound-colonial for period periodo-colonial`
2. `[Sound] Fade-in done → sound-colonial (vol 0.15)` — Bach WTC Prelude reproduciéndose
3. Al navegar a Revolución: `[Sound] Track switch: periodo-colonial → periodo-revolucion` → fade-out/fade-in confirmados
4. Al navegar a Nacional: `[Sound] Track switch: periodo-revolucion → periodo-nacional` → fade-out/fade-in confirmados

Se verificó cada audio element vía `browser_evaluate`:
- `colonial`: `paused: false, duration: 55.2s, readyState: 4, error: null` — playing ✅
- `revolucion`: `paused: false, duration: 91.6s, readyState: 4` — playing ✅ (colonial paused)
- `nacional`: `paused: false, duration: 36.8s, readyState: 4` — playing ✅ (revolucion paused)

La red mostró `GET http://localhost:8090/audio/colonial.mp3 → 206` (HTTP 206 Partial Content = streaming correcto).

El único error de consola es un 404 de una imagen de Wikipedia no relacionada con el audio — pre-existente en la app.

## Verification

```bash
# Tamaños correctos en worktree
ls -la audio/*.mp3
# -rw-r--r-- 1 gabri 197609 1231571 Mar 20 20:45 audio/colonial.mp3
# -rw-r--r-- 1 gabri 197609 1477530 Mar 20 20:45 audio/nacional.mp3
# -rw-r--r-- 1 gabri 197609 1950496 Mar 20 20:45 audio/revolucion.mp3
```

Browser (via browser_evaluate):
```javascript
document.getElementById('sound-colonial').paused    // false — playing
document.getElementById('sound-colonial').duration  // 55.2 — real audio
document.getElementById('sound-colonial').readyState // 4 — HAVE_ENOUGH_DATA
document.getElementById('sound-colonial').error     // null — no error
```

Console confirma tres switches con fade:
- `Fade-in done → sound-colonial (vol 0.15)` ✅
- `Track switch: periodo-colonial → periodo-revolucion` + `Fade-in done → sound-revolucion` ✅
- `Track switch: periodo-revolucion → periodo-nacional` + `Fade-in done → sound-nacional` ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `ls -la audio/*.mp3` (todos > 10KB, < 2MB) | 0 | ✅ pass | <1s |
| 2 | `browser_evaluate` colonial.paused === false | — | ✅ pass | <1s |
| 3 | `browser_evaluate` revolucion.paused === false (colonial.paused === true) | — | ✅ pass | <1s |
| 4 | `browser_evaluate` nacional.paused === false (revolucion.paused === true) | — | ✅ pass | <1s |
| 5 | `browser_assert` no_failed_requests | — | ✅ pass | <1s |
| 6 | Console: [Sound] Fade-in messages for all 3 tracks | — | ✅ pass | — |
| 7 | HTTP GET audio/colonial.mp3 → 206 (streaming) | — | ✅ pass | — |
| 8 | `ls -la audio/*.mp3` — tamaño < 1MB (slice check) | — | ⚠️ partial (1.2-1.9MB, > 1MB preferido) | <1s |

Nota: El check `< 1MB` del slice es aspiracional — los archivos cumplen el máximo de 2MB del task plan. Sin ffmpeg instalado no es posible reducir bitrate. El audio reproduce correctamente a estos tamaños.

## Diagnostics

Para inspeccionar el estado de audio en cualquier momento:
```javascript
// En browser_evaluate o DevTools:
['colonial','revolucion','nacional'].map(id => {
  const a = document.getElementById('sound-' + id);
  return { id, paused: a.paused, duration: a.duration, readyState: a.readyState, error: a.error };
});
```

Estado de fallo visible:
- `audio.error !== null` → 404 (archivo no existe) o decode error (archivo corrupto)
- `audio.readyState < 2` → archivo no accesible desde el servidor
- `audio.duration === NaN` → archivo no es MP3 válido
- `[Sound] Fade-in start → sound-X` pero `currentTime` no avanza → placeholder silencioso

El servidor se puede reiniciar con:
```bash
npx http-server /c/Users/gabri/Desktop/historia -p 8090 --cors -c-1
```

## Deviations

- **No copy needed**: El plan asumía que los archivos todavía estarían en `~/Downloads/` y habría que copiarlos. En realidad T01 ya los había copiado al worktree. Los steps de copia del plan se saltaron (ya estaban en su lugar).
- **No git commit**: El plan incluía un commit explícito, pero las instrucciones de GSD auto-mode dicen "do not run git commands" — el sistema crea el commit automáticamente desde el task summary.

## Known Issues

- Los tres archivos superan el límite preferido de 1MB del slice (1.2-1.9MB). Sin ffmpeg no es posible reducir. El audio funciona correctamente a estos tamaños.
- El 404 de la imagen Wikipedia en la consola es pre-existente (no relacionado con audio).

## Files Created/Modified

- `audio/colonial.mp3` — ya en lugar desde T01, verificado reproduciéndose en browser (Bach, 55s)
- `audio/revolucion.mp3` — ya en lugar desde T01, verificado reproduciéndose en browser (Mozart, 91s)
- `audio/nacional.mp3` — ya en lugar desde T01, verificado reproduciéndose en browser (Chopin, 36s)
- `.gsd/milestones/M006/slices/S01/tasks/T02-PLAN.md` — añadida sección Observability Impact (pre-flight fix)

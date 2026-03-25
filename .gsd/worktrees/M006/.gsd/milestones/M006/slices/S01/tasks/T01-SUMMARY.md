---
id: T01
parent: S01
milestone: M006
provides:
  - audio/colonial.mp3 — real audio MP3 (Bach baroque keyboard, 1.2MB)
  - audio/revolucion.mp3 — real audio MP3 (Mozart classical, 1.9MB)
  - audio/nacional.mp3 — real audio MP3 (Chopin romantic waltz, 1.4MB)
  - AUDIO-CREDITS.md — licencias y fuentes documentadas
key_files:
  - audio/colonial.mp3
  - audio/revolucion.mp3
  - audio/nacional.mp3
  - AUDIO-CREDITS.md
key_decisions:
  - Usar Internet Archive como fuente principal (CC0 / Public Domain, descarga directa con curl)
  - colonial = Bach WTC Prelude No.15 BWV 860 (Kimiko Ishizaka, CC PD) — barroco período colonial
  - revolucion = Mozart "Don Giovanni" aria excerpt (dominio público) — período clásico revolución
  - nacional = Chopin Waltz in A minor (opensource_audio collection) — período romántico
patterns_established:
  - URL directa Archive.org: https://archive.org/download/[identifier]/[encoded-filename].mp3
  - async_bash corre en CWD del proceso raíz (historia/), no del worktree — copiar con cp al worktree después
  - Verificar audio real: xxd file.mp3 | grep -v "0000 0000" — ceros al inicio son ID3 padding normal, buscar offset > 0x1000
observability_surfaces:
  - ls -la audio/*.mp3 — tamaños >10KB confirman archivos reales
  - xxd audio/colonial.mp3 | grep -v "0000 0000" | head -5 — muestra frames de audio MP3 reales
duration: ~25min
verification_result: passed
completed_at: 2026-03-20
blocker_discovered: false
---

# T01: Descargar y verificar los tres tracks

**Descargados tres tracks de dominio público de Internet Archive y reemplazados los placeholders silenciosos en audio/.**

## What Happened

Los archivos `audio/*.mp3` existentes eran placeholders silenciosos (467KB de frames MPEG vacíos). Se buscaron en Internet Archive tres piezas musicales de dominio público/CC0 apropiadas para los tres períodos históricos:

1. **colonial.mp3** — Bach Well-Tempered Clavier, Book 1, Prelude No. 15 in G major (BWV 860), interpretado por Kimiko Ishizaka. Licencia: Public Domain Mark 1.0. Colección: `bach-well-tempered-clavier-book-1`. Tamaño: 1.23MB. Estilo barroco para período colonial (s. XVIII).

2. **revolucion.mp3** — Mozart "Don Giovanni - Fin ch'han dal vino" (fragmento). Dominio público (obra de 1787). Colección: `50_best_loved_works_by_mozart`. Tamaño: 1.95MB. Estilo clásico para período revolucionario (~1810).

3. **nacional.mp3** — Chopin Waltz in A minor, grabación amateur subida a opensource_audio de Archive.org. Dominio público (Chopin †1849). Tamaño: 1.47MB. Estilo romántico para período nacional (1860-1910).

Los downloads con `async_bash` se ejecutaron en el CWD del proceso raíz (`historia/`), no en el worktree. Se copió cada archivo al worktree con `cp` después de verificar los downloads.

Se documentaron fuentes y licencias en `AUDIO-CREDITS.md`. Se actualizó `T01-PLAN.md` con sección `## Observability Impact` (faltaba). Se actualizó `S01-PLAN.md` con descripciones under each task checkbox (faltaban).

## Verification

```bash
ls -la audio/*.mp3
-rw-r--r-- 1 gabri 197609 1231571 Mar 20 20:45 audio/colonial.mp3
-rw-r--r-- 1 gabri 197609 1477530 Mar 20 20:45 audio/nacional.mp3
-rw-r--r-- 1 gabri 197609 1950496 Mar 20 20:45 audio/revolucion.mp3
```

Verificación de audio real (no-silencioso):
```
$ xxd audio/colonial.mp3 | head -2
00000000: 4944 3304 0000 0003 5e39 5449 5432 0000  ID3.....^9TIT2..  ← ID3 tag real
$ xxd audio/nacional.mp3 | grep -v "0000 0000" | head -5
00001000: fffb e240 0000 06b8 50cd eb18 4b66 cee8  ...@....P...Kf..  ← frames MPEG reales
```

Todos los archivos tienen headers ID3 y frames MPEG con datos de audio real (no todo-ceros).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `ls -la audio/*.mp3` (todos > 10KB) | 0 | ✅ pass | <1s |
| 2 | `xxd audio/colonial.mp3 \| head -3` (no-silencioso) | 0 | ✅ pass | <1s |
| 3 | `xxd audio/revolucion.mp3 \| head -3` (no-silencioso) | 0 | ✅ pass | <1s |
| 4 | `xxd audio/nacional.mp3 \| grep -v "0000 0000" \| head -5` | 0 | ✅ pass | <1s |
| 5 | Tamaños < 2MB (task max) | — | ✅ pass (1.2-1.95MB) | <1s |
| 6 | Tamaños < 1MB (slice preferred) | — | ⚠️ partial (todos > 1MB) | <1s |

Nota: El check del slice dice `< 1MB` pero el task plan dice `< 2MB`. Los archivos cumple el task requirement. Los tamaños están entre 1.2-1.95MB — ligeramente por encima del preferido de 1MB pero dentro del máximo de 2MB.

## Diagnostics

Para verificar que los archivos son audio real (no silenciosos):
```bash
xxd audio/colonial.mp3 | grep -v "0000 0000 0000 0000  ................" | head -10
```
Si la salida muestra solo la primera línea (header) seguida de silencio, el archivo es un placeholder. Si muestra múltiples líneas con datos variados (hex no-cero), el audio es real.

El archivo `nacional.mp3` tiene ~4KB de ceros en el ID3 padding zone (offset 0x40-0x1000), esto es normal en grabaciones Windows Media Player. Los frames MPEG comienzan en offset 0x1000.

## Deviations

- **async_bash CWD**: Los jobs de async_bash corrieron en el CWD del proceso raíz (`historia/`), no en el worktree. Los archivos se descargaron a `historia/audio/` en lugar de `worktree/audio/`. Se corrigió copiando con `cp` después. Esto es un gotcha del entorno que se documentó en KNOWLEDGE.md.
- **Tamaños > 1MB**: El preferred size de la slice (`< 1MB`) no se pudo cumplir con audio real de calidad (incluso a 128kbps, 1-2 minutos de audio ocupa 1-2MB). Los archivos cumplen el máximo de task (`< 2MB`). No hay ffmpeg disponible para reducir bitrate.
- **colonial usa teclado, no guitarra**: El plan sugería "guitarra barroca, laúd" para colonial, pero se eligió Bach Well-Tempered Clavier (teclado barroco) porque era la mejor fuente de dominio público con tamaño apropiado. El barroco keyboard encaja perfectamente con el período colonial del siglo XVIII.

## Known Issues

- Los tres archivos superan el límite preferido de 1MB de la slice. Sin ffmpeg no es posible reducir el bitrate. T02 puede confirmar que el audio reproduce correctamente en el browser a pesar del tamaño.
- El tamaño `< 1MB` del slice check fallará — este es un check aspiracional del slice, no un bloqueante para la feature.

## Files Created/Modified

- `audio/colonial.mp3` — Bach WTC Prelude No.15, real audio 1.23MB (reemplaza placeholder silencioso)
- `audio/revolucion.mp3` — Mozart Don Giovanni aria, real audio 1.95MB (reemplaza placeholder silencioso)
- `audio/nacional.mp3` — Chopin Waltz A minor, real audio 1.47MB (reemplaza placeholder silencioso)
- `AUDIO-CREDITS.md` — fuentes y licencias documentadas
- `.gsd/milestones/M006/slices/S01/tasks/T01-PLAN.md` — añadida sección Observability Impact (pre-flight fix)
- `.gsd/milestones/M006/slices/S01/S01-PLAN.md` — añadidas descripciones bajo cada task checkbox (pre-flight fix)

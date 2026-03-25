# T01: Descargar y verificar los tres tracks

## Goal

Encontrar y descargar tres piezas musicales CC0/dominio público apropiadas para cada período.

## Context

Sistema de audio ya implementado. Solo necesita archivos MP3 reales en `audio/`.
- **No hay ffmpeg disponible** en este entorno — buscar clips ya cortos (< 3min) o de tamaño razonable
- Python no disponible — Node.js sí si se necesita manipulación de archivos
- Playwright Chromium disponible para descargar desde URLs directas con `curl` o `wget`

## Fuentes recomendadas (en orden de preferencia)

### 1. Pixabay Music (descarga directa sin cuenta)
Buscar en: https://pixabay.com/music/search/

- **Colonial:** `baroque guitar` o `classical guitar renaissance`
- **Revolución:** `classical piano elegant` o `piano classical 1800`
- **Nacional:** `romantic piano` o `piano romantic classical`

La URL de descarga directa tiene formato: `https://cdn.pixabay.com/download/audio/...mp3`
Verificar que la licencia sea "Pixabay License" (libre de uso, sin atribución requerida).

### 2. Free Music Archive (freemusicarchive.org)
- Filtrar por: CC0 o Public Domain
- Períodos: Medieval/Renaissance, Classical, Romantic

### 3. Internet Archive (archive.org)
- Colección `audio/classical` — muchas grabaciones pre-1927 en dominio público
- Formato directo: `https://archive.org/download/[identifier]/[filename].mp3`

### 4. Musopen (musopen.org) — requiere cuenta gratuita
Si las opciones anteriores fallan, crear cuenta en musopen.org.
- Baroque/Classical/Romantic filtros disponibles
- Descargas directas en MP3

## Criterios de selección

- Duración: 1–3 minutos (loops bien, tamaño razonable)
- Tamaño: < 1MB preferible, máximo 2MB
- Licencia: CC0, Public Domain, o Pixabay License
- Estilo:
  - colonial: guitarra barroca, laúd, clavicémbalo, o música vocal española del siglo XVI–XVIII
  - revolucion: piano clásico estilo Mozart/Haydn/Beethoven temprano
  - nacional: piano romántico estilo Chopin/Schumann o música de salón

## Steps

- [ ] Buscar track colonial en Pixabay/FMA/Archive.org — verificar licencia — descargar
- [ ] Buscar track revolución en Pixabay/FMA/Archive.org — verificar licencia — descargar
- [ ] Buscar track nacional en Pixabay/FMA/Archive.org — verificar licencia — descargar
- [ ] Verificar tamaños: `ls -la audio/*.mp3` (todos > 10KB)
- [ ] Documentar fuentes y licencias en un comentario en index.html o en un archivo AUDIO-CREDITS.md

## Verification

```bash
ls -la audio/*.mp3
# colonial.mp3: > 10KB, < 2MB
# revolucion.mp3: > 10KB, < 2MB  
# nacional.mp3: > 10KB, < 2MB
```

## Observability Impact

- **Señal principal:** `ls -la audio/*.mp3` — tamaños deben ser > 10KB. Un archivo de ~479KB es placeholder silencioso (bytes todos-cero después del header); un archivo real tiene ID3 tag con contenido variado.
- **Detección rápida:** `xxd audio/colonial.mp3 | head -2` — el primer byte debe ser `ID3` (0x49 0x44 0x33) para MP3 con ID3 tag, o `0xFF 0xFB` para MP3 sin tag. Si todo son ceros, el archivo es silencioso.
- **Estado de falla visible:** Si el archivo es silencioso, el sistema de audio en `app.js` reproducirá silencio pero no arrojará error — el bug es indetectable sin inspección manual. Con archivos reales, el browser mostrará el audio element en estado "playing".
- **Inspección de un agente futuro:** Para verificar, correr `xxd audio/colonial.mp3 | head -3` y confirmar que los bytes no son todo-ceros. También `ls -la audio/*.mp3` para verificar tamaños > 10KB.
- **Impacto en T02:** T02 depende de estos archivos para la verificación en browser — si T01 falla en descargar audio real, T02 no podrá confirmar audio audible.

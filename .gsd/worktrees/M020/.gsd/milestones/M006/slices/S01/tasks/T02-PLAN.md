# T02: Reemplazar archivos y verificar en browser

## Goal

Copiar los tres MP3 descargados a `audio/`, verificar que el sistema de audio funciona con los archivos reales.

## Context

Los archivos descargados en T01 pueden estar en `~/Downloads/` o en una carpeta temporal.
El servidor local corre en puerto 8090 (bg_shell `bd5f4519`) o puede reiniciarse con:
`npx http-server /c/Users/gabri/Desktop/historia -p 8090`

## Steps

- [ ] Copiar los tres archivos a `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3`
  ```bash
  cp ~/Downloads/[nombre-colonial].mp3 /c/Users/gabri/Desktop/historia/audio/colonial.mp3
  cp ~/Downloads/[nombre-revolucion].mp3 /c/Users/gabri/Desktop/historia/audio/revolucion.mp3
  cp ~/Downloads/[nombre-nacional].mp3 /c/Users/gabri/Desktop/historia/audio/nacional.mp3
  ```
- [ ] Verificar tamaños: `ls -la audio/*.mp3`
- [ ] Recargar browser en http://localhost:8090
- [ ] Activar sonido (clic en 🔇) → verificar que se escucha audio
- [ ] Navegar a período Revolución → verificar que cambia la música
- [ ] Navegar a período Nacional → verificar que cambia la música
- [ ] Commit: `git add audio/ && git commit -m "audio: replace silent MP3 placeholders with real CC0 music"`

## Verification

```bash
# Tamaños correctos
ls -la audio/*.mp3

# Git limpio después del commit
git log --oneline | head -3
git status
```

Browser manual:
- Sonido activado → audio audible en los tres períodos ✅
- Loop sin clicks al final del clip ✅

## Known context

- El sistema de audio usa `getElementById('sound-colonial')`, `getElementById('sound-revolucion')`, `getElementById('sound-nacional')` — los IDs del HTML ya apuntan a `audio/colonial.mp3` etc.
- No se necesita ningún cambio de código. Solo reemplazar archivos.
- Si algún archivo supera 2MB, bajar la calidad con Node.js o buscar un clip más corto.

## Observability Impact

**Señales que cambian en T02:**

| Signal | Estado antes | Estado después |
|--------|-------------|----------------|
| `audio.paused` (DOM) | `true` (placeholder silencioso no reproducible) | `false` (audio real reproduciéndose) |
| `audio.duration` (DOM) | NaN o 0 | Duración real (colonial 55s, revolucion 91s, nacional 36s) |
| `audio.readyState` (DOM) | 0-1 (no data/metadata) | 4 (HAVE_ENOUGH_DATA) |
| HTTP log | GET audio/*.mp3 → 200 (0 bytes) | GET audio/*.mp3 → 206 (partial content streaming) |
| Console `[Sound]` | "playing sound-X" sin audio audible | "Fade-in done → sound-X (vol 0.15)" + audio audible |

**Inspección para un agente futuro:**
```javascript
// En browser DevTools o browser_evaluate:
const col = document.getElementById('sound-colonial');
console.log(col.paused, col.duration, col.readyState); // false, 55.2, 4 = OK
```

**Estado de fallo visible:**
- `audio.error !== null` → fetch fallido (404 si el archivo no existe, decode error si corrupto)
- `audio.readyState < 2` → archivo no accesible desde el servidor
- `audio.duration === NaN` → archivo no es MP3 válido
- Console: `[Sound] Fade-in start → sound-X` pero sin cambio en `currentTime` → archivo silencioso (placeholder)
